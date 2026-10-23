import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
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
  token: string;
  userId: string;
  email: string;
  createdAt: number;
}

interface StoredContactSubmission {
  ticketId: string;
  name: string;
  email: string;
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

function loadDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial: DatabaseSchema = {
        users: {},
        sessions: {},
        progressByUserId: {},
        contactSubmissions: [],
        teacherReviewRequests: [],
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as DatabaseSchema;
  } catch {
    return {
      users: {},
      sessions: {},
      progressByUserId: {},
      contactSubmissions: [],
      teacherReviewRequests: [],
    };
  }
}

function saveDb(db: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function getAuthenticatedUser(req: express.Request, db: DatabaseSchema): StoredUser | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7).trim();
  const session = db.sessions[token];
  if (!session) return null;
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
  app.use(express.json({ limit: '1mb' }));

  // Health & integration status endpoint
  app.get('/api/status', (_req, res) => {
    const db = loadDb();
    res.json({
      ok: true,
      backendPersistence: 'operational-json-db',
      audioIntegration: 'everyayah-and-qurancdn-with-explicit-tts-fallback',
      contactEndpoint: 'operational-server-ticket-queue',
      teacherReviewEndpoint: 'operational-server-request-queue',
      totalRegisteredUsers: Object.keys(db.users).length,
      totalContactTickets: db.contactSubmissions.length,
      totalTeacherRequests: db.teacherReviewRequests.length,
    });
  });

  // 1. Register / Sign Up
  app.post('/api/auth/register', (req, res) => {
    const { name, email, password, country, progress } = req.body || {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({ error: 'INVALID_NAME' });
      return;
    }
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'INVALID_EMAIL' });
      return;
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      res.status(400).json({ error: 'INVALID_PASSWORD' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const db = loadDb();
    const existingUser = Object.values(db.users).find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      res.status(409).json({ error: 'EMAIL_ALREADY_REGISTERED' });
      return;
    }

    const userId = `usr_${crypto.randomBytes(8).toString('hex')}`;
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = hashPassword(password, salt);
    const now = Date.now();

    const newUser: StoredUser = {
      id: userId,
      name: name.trim(),
      email: normalizedEmail,
      country: country === 'MY' ? 'MY' : 'ID',
      passwordHash,
      salt,
      createdAt: now,
    };

    const token = crypto.randomBytes(24).toString('hex');
    db.users[userId] = newUser;
    db.sessions[token] = {
      token,
      userId,
      email: normalizedEmail,
      createdAt: now,
    };

    if (progress && typeof progress === 'object') {
      db.progressByUserId[userId] = {
        progress,
        updatedAt: now,
      };
    }

    saveDb(db);

    res.status(201).json({
      ok: true,
      token,
      syncedAt: now,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        country: newUser.country,
        createdAt: newUser.createdAt,
      },
      progress: db.progressByUserId[userId]?.progress || null,
    });
  });

  // 2. Login
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      res.status(400).json({ error: 'MISSING_CREDENTIALS' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const db = loadDb();
    const user = Object.values(db.users).find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (!user) {
      res.status(401).json({ error: 'INVALID_CREDENTIALS' });
      return;
    }

    const computedHash = hashPassword(password, user.salt);
    if (computedHash !== user.passwordHash) {
      res.status(401).json({ error: 'INVALID_CREDENTIALS' });
      return;
    }

    const now = Date.now();
    const token = crypto.randomBytes(24).toString('hex');
    db.sessions[token] = {
      token,
      userId: user.id,
      email: user.email,
      createdAt: now,
    };
    saveDb(db);

    res.json({
      ok: true,
      token,
      syncedAt: now,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        country: user.country,
        createdAt: user.createdAt,
      },
      progress: db.progressByUserId[user.id]?.progress || null,
    });
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
    if (!progress || typeof progress !== 'object') {
      res.status(400).json({ error: 'INVALID_PROGRESS_PAYLOAD' });
      return;
    }
    const now = Date.now();
    db.progressByUserId[user.id] = {
      progress,
      updatedAt: now,
    };
    saveDb(db);
    res.json({
      ok: true,
      syncedAt: now,
    });
  });

  // 5. Submit Contact Form (Real Server Persistence)
  app.post('/api/contact', (req, res) => {
    const { name, email, message, locale } = req.body || {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({ error: 'INVALID_NAME' });
      return;
    }
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'INVALID_EMAIL' });
      return;
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      res.status(400).json({ error: 'MESSAGE_TOO_SHORT' });
      return;
    }

    const db = loadDb();
    const now = Date.now();
    const ticketId = `FA-${now.toString(36).toUpperCase().slice(-6)}`;
    const submission: StoredContactSubmission = {
      ticketId,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      locale: locale === 'ms-MY' ? 'ms-MY' : 'id-ID',
      receivedAt: now,
      deliveryMode: 'server-recorded',
    };

    db.contactSubmissions.push(submission);
    saveDb(db);

    res.status(201).json({
      ok: true,
      ticketId,
      receivedAt: now,
      deliveryMode: 'server-recorded',
    });
  });

  // 6. Teacher Review Request Queue (Path B)
  app.get('/api/teacher-reviews', (_req, res) => {
    const db = loadDb();
    res.json({
      ok: true,
      requests: db.teacherReviewRequests.slice(-20).reverse(),
    });
  });

  app.post('/api/teacher-reviews', (req, res) => {
    const { lessonId, verseRef, focusArea, focusNote, locale } = req.body || {};
    if (!lessonId || typeof lessonId !== 'string') {
      res.status(400).json({ error: 'INVALID_LESSON' });
      return;
    }
    if (!focusNote || typeof focusNote !== 'string' || focusNote.trim().length < 5) {
      res.status(400).json({ error: 'NOTE_TOO_SHORT' });
      return;
    }

    const validFocusAreas = ['makhraj', 'mad-waqaf', 'ghunnah', 'fluency'];
    const normalizedArea = validFocusAreas.includes(focusArea) ? focusArea : 'makhraj';

    const db = loadDb();
    const user = getAuthenticatedUser(req, db);
    const now = Date.now();
    const requestId = `TR-${now.toString(36).toUpperCase().slice(-6)}`;

    const newRequest: StoredTeacherReviewRequest = {
      id: requestId,
      userId: user?.id,
      lessonId,
      verseRef: typeof verseRef === 'string' ? verseRef : lessonId,
      focusArea: normalizedArea,
      focusNote: focusNote.trim(),
      locale: locale === 'ms-MY' ? 'ms-MY' : 'id-ID',
      status: 'received-in-queue',
      submittedAt: now,
    };

    db.teacherReviewRequests.push(newRequest);
    saveDb(db);

    res.status(201).json({
      ok: true,
      request: newRequest,
    });
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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Faham Ayat server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
