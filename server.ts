import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { constantTimeHexEqual, createRateLimiter, hashSessionToken, isSessionExpired } from './src/server/security';

const PORT = Number(process.env.PORT) > 0 ? Number(process.env.PORT) : 3000;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'faham_ayat_db.json');

interface StoredUser {
  id: string;
  name: string;
  email: string;
  country: 'ID' | 'MY';
  passwordHash: string;
  salt: string;
  createdAt: number;
}

interface StoredSession {
  userId: string;
  email: string;
  createdAt: number;
  expiresAt: number;
}

interface StoredContactSubmission {
  ticketId: string;
  name: string;
  email: string;
  category: 'editorial' | 'partnership' | 'support';
  message: string;
  locale: 'id-ID' | 'ms-MY';
  receivedAt: number;
  deliveryMode: 'server-recorded';
}

interface StoredTeacherReviewRequest {
  id: string;
  userId?: string;
  lessonId: string;
  verseRef: string;
  focusArea: 'makhraj' | 'mad-waqaf' | 'ghunnah' | 'fluency';
  focusNote: string;
  locale: 'id-ID' | 'ms-MY';
  status: 'received-in-queue';
  submittedAt: number;
}

interface DatabaseSchema {
  users: Record<string, StoredUser>;
  sessions: Record<string, StoredSession>;
  progressByUserId: Record<string, { progress: unknown; updatedAt: number }>;
  contactSubmissions: StoredContactSubmission[];
  teacherReviewRequests: StoredTeacherReviewRequest[];
}

function isRecord(value: unknown): value is Record<string, any> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function createEmptyDb(): DatabaseSchema {
  return { users: {}, sessions: {}, progressByUserId: {}, contactSubmissions: [], teacherReviewRequests: [] };
}

const SYNCABLE_PROGRESS_KEYS = [
  'locale', 'onboardingCompleted', 'diagnostic', 'recommendation', 'activePathway',
  'completedLessonIds', 'bookmarkedWordIds', 'learnedWordIds', 'reviewQueue',
  'lessonQuizScores', 'reflections', 'dailyGoalMinutes', 'showTransliteration',
  'arabicFontScale', 'remindersEnabled', 'reminderTime', 'ramadanModeEnabled',
  'reducedMotion', 'teacherReviewRequests', 'worldProgress',
] as const;

function sanitizeProgress(value: unknown): Record<string, unknown> | null {
  if (!isRecord(value)) return null;
  const sanitized: Record<string, unknown> = {};
  for (const key of SYNCABLE_PROGRESS_KEYS) {
    if (Object.prototype.hasOwnProperty.call(value, key)) sanitized[key] = value[key];
  }
  if (Object.keys(sanitized).length === 0 || JSON.stringify(sanitized).length > 200_000) return null;
  return sanitized;
}

function loadDb(): DatabaseSchema {
  fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o700 });
  if (!fs.existsSync(DB_FILE)) {
    const initial = createEmptyDb();
    saveDb(initial);
    return initial;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch {
    // Never silently replace a corrupt database with an empty one.
    throw new Error('DATABASE_CORRUPT');
  }

  if (!isRecord(parsed) || !isRecord(parsed.users) || !isRecord(parsed.sessions) || !isRecord(parsed.progressByUserId)) {
    throw new Error('DATABASE_SCHEMA_INVALID');
  }

  const contactSubmissions = parsed.contactSubmissions ?? [];
  const teacherReviewRequests = parsed.teacherReviewRequests ?? [];
  if (!Array.isArray(contactSubmissions) || !Array.isArray(teacherReviewRequests)) {
    throw new Error('DATABASE_SCHEMA_INVALID');
  }

  const db: DatabaseSchema = {
    users: parsed.users as Record<string, StoredUser>,
    sessions: {},
    progressByUserId: parsed.progressByUserId as DatabaseSchema['progressByUserId'],
    contactSubmissions: contactSubmissions as StoredContactSubmission[],
    teacherReviewRequests: teacherReviewRequests as StoredTeacherReviewRequest[],
  };

  let needsMigration = !Array.isArray(parsed.contactSubmissions) || !Array.isArray(parsed.teacherReviewRequests);
  for (const [storedKey, rawSession] of Object.entries(parsed.sessions)) {
    if (!isRecord(rawSession) || typeof rawSession.userId !== 'string') {
      needsMigration = true;
      continue;
    }
    const createdAt = Number(rawSession.createdAt);
    const email = typeof rawSession.email === 'string' ? rawSession.email : db.users[rawSession.userId]?.email;
    if (!Number.isFinite(createdAt) || !email || !db.users[rawSession.userId]) {
      needsMigration = true;
      continue;
    }

    const alreadyHashed = /^[a-f0-9]{64}$/i.test(storedKey) && Number.isFinite(rawSession.expiresAt);
    const legacyToken = typeof rawSession.token === 'string' ? rawSession.token : storedKey;
    const tokenHash = alreadyHashed ? storedKey : hashSessionToken(legacyToken);
    const expiresAt = alreadyHashed ? Number(rawSession.expiresAt) : createdAt + SESSION_TTL_MS;
    if (isSessionExpired(expiresAt)) { needsMigration = true; continue; }

    db.sessions[tokenHash] = { userId: rawSession.userId, email, createdAt, expiresAt };
    if (!alreadyHashed || Object.prototype.hasOwnProperty.call(rawSession, 'token')) needsMigration = true;
  }

  if (needsMigration) saveDb(db);
  try { fs.chmodSync(DB_FILE, 0o600); } catch { /* Best effort on unsupported filesystems. */ }
  return db;
}

function saveDb(db: DatabaseSchema): void {
  fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o700 });
  const tempFile = `${DB_FILE}.${process.pid}.${crypto.randomBytes(6).toString('hex')}.tmp`;
  try {
    fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), { encoding: 'utf-8', flag: 'wx', mode: 0o600 });
    // Atomic replacement prevents readers from observing a partial JSON write.
    fs.renameSync(tempFile, DB_FILE);
    try { fs.chmodSync(DB_FILE, 0o600); } catch { /* Best effort on unsupported filesystems. */ }
  } catch (error) {
    try { if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile); } catch { /* Preserve write error. */ }
    throw error;
  }
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function getAuthenticatedUser(req: express.Request, db: DatabaseSchema): StoredUser | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7).trim();
  if (!/^[a-f0-9]{48}$/i.test(token)) return null;
  const tokenHash = hashSessionToken(token);
  const session = db.sessions[tokenHash];
  if (!session) return null;
  if (isSessionExpired(session.expiresAt)) {
    delete db.sessions[tokenHash];
    saveDb(db);
    return null;
  }
  return db.users[session.userId] || null;
}

function injectLocalizedSeoHtml(rawHtml: string, reqPath: string, appUrl: string): string {
  const isMy = reqPath.startsWith('/my');
  const lang = isMy ? 'ms-MY' : 'id-ID';
  const canonicalPath = isMy ? '/my/' : '/id/';
  const baseUrl = appUrl.replace(/\/$/, '');

  const title = isMy
    ? 'Faham Ayat — Fahami al-Quran, Satu Perkataan Demi Satu Perkataan'
    : 'Faham Ayat — Pahami Al-Qur’an, Satu Kata Demi Satu Kata';

  const description = isMy
    ? 'Pelajari kosa kata al-Quran, akar perkataan, binaan ayat dan bacaan solat secara berperingkat dengan rujukan Tafsir Pimpinan Ar-Rahman JAKIM.'
    : 'Pelajari kosakata Al-Qur’an, akar kata, struktur kalimat, dan bacaan salat secara bertahap dengan rujukan Terjemahan Kemenag RI.';

  const ogLocale = isMy ? 'ms_MY' : 'id_ID';

  return rawHtml
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${description}" />\n    <meta property="og:locale" content="${ogLocale}" />\n    <meta property="og:url" content="${baseUrl}${canonicalPath}" />\n    <link rel="canonical" href="${baseUrl}${canonicalPath}" />`
    );
}

async function startServer() {
  const app = express();
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (req.path.startsWith('/api/')) res.setHeader('Cache-Control', 'no-store');
    next();
  });
  app.use(express.json({ limit: '256kb', strict: true }));

  const registerRateLimit = createRateLimiter({ windowMs: 60 * 60 * 1000, max: 5, errorCode: 'TOO_MANY_REGISTRATION_ATTEMPTS' });
  const loginRateLimit = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 10, errorCode: 'TOO_MANY_LOGIN_ATTEMPTS' });
  const contactRateLimit = createRateLimiter({ windowMs: 60 * 60 * 1000, max: 5, errorCode: 'TOO_MANY_CONTACT_SUBMISSIONS' });
  const teacherReviewRateLimit = createRateLimiter({ windowMs: 60 * 60 * 1000, max: 5, errorCode: 'TOO_MANY_TEACHER_REVIEW_REQUESTS' });

  // Never publish account counts or queue sizes on a public health endpoint.
  app.get('/api/status', (_req, res) => res.json({ ok: true }));

  // 1. Register / Sign Up
  app.post('/api/auth/register', registerRateLimit, (req, res) => {
    const { name, email, password, country, progress } = req.body || {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 80) {
      res.status(400).json({ error: 'INVALID_NAME' }); return;
    }
    if (typeof email !== 'string' || email.trim().length > 254 || !emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'INVALID_EMAIL' }); return;
    }
    if (typeof password !== 'string' || password.length < 12 || password.length > 1024) {
      res.status(400).json({ error: 'PASSWORD_TOO_WEAK' }); return;
    }
    if (country !== undefined && country !== 'ID' && country !== 'MY') {
      res.status(400).json({ error: 'INVALID_COUNTRY' }); return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const db = loadDb();
    const existingUser = Object.values(db.users).find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existingUser) { res.status(409).json({ error: 'EMAIL_ALREADY_REGISTERED' }); return; }

    const safeProgress = progress === undefined || progress === null ? null : sanitizeProgress(progress);
    if (progress !== undefined && progress !== null && !safeProgress) {
      res.status(400).json({ error: 'INVALID_PROGRESS_PAYLOAD' }); return;
    }

    const userId = \`usr_\${crypto.randomBytes(8).toString('hex')}\`;
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = hashPassword(password, salt);
    const now = Date.now();
    const newUser: StoredUser = {
      id: userId, name: name.trim(), email: normalizedEmail,
      country: country === 'MY' ? 'MY' : 'ID', passwordHash, salt, createdAt: now,
    };

    const token = crypto.randomBytes(24).toString('hex');
    db.users[userId] = newUser;
    db.sessions[hashSessionToken(token)] = {
      userId, email: normalizedEmail, createdAt: now, expiresAt: now + SESSION_TTL_MS,
    };
    if (safeProgress) db.progressByUserId[userId] = { progress: safeProgress, updatedAt: now };
    saveDb(db);

    res.status(201).json({
      ok: true, token, syncedAt: now,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, country: newUser.country, createdAt: newUser.createdAt },
      progress: db.progressByUserId[userId]?.progress || null,
    });
  });

  // 2. Login
  app.post('/api/auth/login', loginRateLimit, (req, res) => {
    const { email, password } = req.body || {};
    if (typeof email !== 'string' || typeof password !== 'string' || email.trim().length === 0 ||
        email.trim().length > 254 || password.length < 1 || password.length > 1024) {
      res.status(400).json({ error: 'MISSING_CREDENTIALS' }); return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const db = loadDb();
    const user = Object.values(db.users).find((u) => u.email.toLowerCase() === normalizedEmail);
    if (!user) {
      hashPassword(password, 'faham-ayat-login-dummy-salt');
      res.status(401).json({ error: 'INVALID_CREDENTIALS' }); return;
    }

    const computedHash = hashPassword(password, user.salt);
    if (!constantTimeHexEqual(computedHash, user.passwordHash)) {
      res.status(401).json({ error: 'INVALID_CREDENTIALS' }); return;
    }

    const now = Date.now();
    const token = crypto.randomBytes(24).toString('hex');
    db.sessions[hashSessionToken(token)] = {
      userId: user.id, email: user.email, createdAt: now, expiresAt: now + SESSION_TTL_MS,
    };
    saveDb(db);

    res.json({
      ok: true, token, syncedAt: now,
      user: { id: user.id, name: user.name, email: user.email, country: user.country, createdAt: user.createdAt },
      progress: db.progressByUserId[user.id]?.progress || null,
    });
  });

  app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    if (/^[a-f0-9]{48}$/i.test(token)) {
      const db = loadDb();
      const tokenHash = hashSessionToken(token);
      if (db.sessions[tokenHash]) {
        delete db.sessions[tokenHash];
        saveDb(db);
      }
    }
    res.json({ ok: true });
  });

  // 3. Get Synced Progress
  app.get('/api/progress', (req, res) => {
    const db = loadDb();
    const user = getAuthenticatedUser(req, db);
    if (!user) {
      res.status(401).json({ error: 'UNAUTHORIZED' });
      return;
    }
    const record = db.progressByUserId[user.id];
    res.json({
      ok: true,
      syncedAt: record?.updatedAt || Date.now(),
      progress: record?.progress || null,
    });
  });

  // 4. Save / Sync Progress
  app.put('/api/progress', (req, res) => {
    const db = loadDb();
    const user = getAuthenticatedUser(req, db);
    if (!user) {
      res.status(401).json({ error: 'UNAUTHORIZED' });
      return;
    }
    const { progress } = req.body || {};
    const safeProgress = sanitizeProgress(progress);
    if (!safeProgress) { res.status(400).json({ error: 'INVALID_PROGRESS_PAYLOAD' }); return; }
    const now = Date.now();
    db.progressByUserId[user.id] = { progress: safeProgress, updatedAt: now };
    saveDb(db);
    res.json({
      ok: true,
      syncedAt: now,
    });
  });

  // 5. Submit Contact Form (Real Server Persistence)
  app.post('/api/contact', contactRateLimit, (req, res) => {
    const { name, email, message, locale, category } = req.body || {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      res.status(400).json({ error: 'INVALID_NAME' }); return;
    }
    if (typeof email !== 'string' || email.trim().length > 254 || !emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'INVALID_EMAIL' }); return;
    }
    if (typeof message !== 'string' || message.trim().length < 10) {
      res.status(400).json({ error: 'MESSAGE_TOO_SHORT' }); return;
    }
    if (message.trim().length > 5000) {
      res.status(400).json({ error: 'MESSAGE_TOO_LONG' }); return;
    }
    const validCategories = ['editorial', 'partnership', 'support'];
    if (category !== undefined && !validCategories.includes(category)) {
      res.status(400).json({ error: 'INVALID_CATEGORY' }); return;
    }

    const db = loadDb();
    const now = Date.now();
    const ticketId = \`FA-\${now.toString(36).toUpperCase().slice(-6)}-\${crypto.randomBytes(3).toString('hex').toUpperCase()}\`;
    const submission: StoredContactSubmission = {
      ticketId, name: name.trim(), email: email.trim(),
      category: category === 'partnership' || category === 'support' ? category : 'editorial',
      message: message.trim(), locale: locale === 'ms-MY' ? 'ms-MY' : 'id-ID',
      receivedAt: now, deliveryMode: 'server-recorded',
    };
    db.contactSubmissions.push(submission);
    saveDb(db);
    res.status(201).json({ ok: true, ticketId, receivedAt: now, deliveryMode: 'server-recorded' });
  });

  // 6. Teacher Review Request Queue (Path B)
  app.get('/api/teacher-reviews', (req, res) => {
    const db = loadDb();
    const user = getAuthenticatedUser(req, db);
    if (!user) { res.status(401).json({ error: 'UNAUTHORIZED' }); return; }

    const requests = db.teacherReviewRequests
      .filter((request) => request.userId === user.id)
      .slice(-20)
      .reverse()
      .map(({ id, lessonId, verseRef, focusArea, focusNote, locale, status, submittedAt }) => ({
        id, lessonId, verseRef, focusArea, focusNote, locale, status, submittedAt,
      }));
    res.json({ ok: true, requests });
  });

  app.post('/api/teacher-reviews', teacherReviewRateLimit, (req, res) => {
    const { lessonId, verseRef, focusArea, focusNote, locale } = req.body || {};
    if (typeof lessonId !== 'string' || lessonId.trim().length < 1 || lessonId.length > 128) {
      res.status(400).json({ error: 'INVALID_LESSON' }); return;
    }
    if (typeof focusNote !== 'string' || focusNote.trim().length < 5) {
      res.status(400).json({ error: 'NOTE_TOO_SHORT' }); return;
    }
    if (focusNote.trim().length > 1000) {
      res.status(400).json({ error: 'NOTE_TOO_LONG' }); return;
    }
    if (verseRef !== undefined && (typeof verseRef !== 'string' || verseRef.length > 128)) {
      res.status(400).json({ error: 'INVALID_VERSE_REFERENCE' }); return;
    }

    const validFocusAreas = ['makhraj', 'mad-waqaf', 'ghunnah', 'fluency'];
    if (!validFocusAreas.includes(focusArea)) {
      res.status(400).json({ error: 'INVALID_FOCUS_AREA' }); return;
    }

    const db = loadDb();
    const user = getAuthenticatedUser(req, db);
    const now = Date.now();
    const requestId = \`TR-\${now.toString(36).toUpperCase().slice(-6)}-\${crypto.randomBytes(3).toString('hex').toUpperCase()}\`;
    const newRequest: StoredTeacherReviewRequest = {
      id: requestId, userId: user?.id, lessonId: lessonId.trim(),
      verseRef: typeof verseRef === 'string' && verseRef.trim() ? verseRef.trim() : lessonId.trim(),
      focusArea: focusArea as StoredTeacherReviewRequest['focusArea'],
      focusNote: focusNote.trim(), locale: locale === 'ms-MY' ? 'ms-MY' : 'id-ID',
      status: 'received-in-queue', submittedAt: now,
    };
    db.teacherReviewRequests.push(newRequest);
    saveDb(db);
    res.status(201).json({
      ok: true,
      request: {
        id: newRequest.id, lessonId: newRequest.lessonId, verseRef: newRequest.verseRef,
        focusArea: newRequest.focusArea, focusNote: newRequest.focusNote, locale: newRequest.locale,
        status: newRequest.status, submittedAt: newRequest.submittedAt,
      },
    });
  });

  // Unknown API paths must return JSON, never the SPA HTML document.
  app.use('/api', (_req, res) => {
    res.status(404).json({ ok: false, error: 'NOT_FOUND' });
  });

  const isProd = process.env.NODE_ENV === 'production';
  const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const templatePath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const localizedHtml = injectLocalizedSeoHtml(template, req.originalUrl, appUrl);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(localizedHtml);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));

    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        const rawHtml = fs.readFileSync(indexPath, 'utf-8');
        const localizedHtml = injectLocalizedSeoHtml(rawHtml, req.originalUrl, appUrl);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(localizedHtml);
      } else {
        res.status(404).send('Build output not found. Run npm run build first.');
      }
    });
  }

  app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (res.headersSent) { next(err); return; }
    const status = Number.isInteger(err?.status) && err.status >= 400 && err.status < 500 ? err.status : 500;
    const error = err?.type === 'entity.too.large' ? 'REQUEST_BODY_TOO_LARGE'
      : err?.type === 'entity.parse.failed' ? 'INVALID_JSON' : 'INTERNAL_SERVER_ERROR';
    if (status === 500) console.error('Request failed:', err?.message || 'unknown error');
    res.status(status).json({ ok: false, error });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Faham Ayat server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
