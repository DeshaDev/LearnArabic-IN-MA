import React, { useState, useEffect, useRef } from 'react';
import {
  AuthUser,
  DiagnosticAnswers,
  EditorialArticle,
  InfoPageId,
  LearnerProgress,
  LocaleCode,
  PathwayId,
  PlacementRecommendation,
  TeacherReviewRequest,
  WorldLocationId,
  WorldMistakeEntry,
} from './types/learning';
import { LOCALES } from './data/locales';
import { LESSONS } from './data/curriculum';
import {
  calculateNextReview,
  getDueReviewItems,
} from './utils/learningEngine';
import {
  createDemoWorldProgress,
  createInitialWorldProgress,
  recordGameAttemptInProgress,
} from './utils/worldEngine';
import { Header, AppScreen } from './components/Header';
import { Homepage } from './components/Homepage';
import { OnboardingModal } from './components/OnboardingModal';
import { AyatExplorer } from './components/AyatExplorer';
import { DashboardView } from './components/DashboardView';
import { CourseMapView } from './components/CourseMapView';
import { VocabularyView } from './components/VocabularyView';
import { ReviewCenterView } from './components/ReviewCenterView';
import { ProgressMasteryView } from './components/ProgressMasteryView';
import { ResourcesView } from './components/ResourcesView';
import { SettingsView } from './components/SettingsView';
import { InfoPagesModal, AuthModal } from './components/InfoPagesModal';
import { WorldOfMeaningView } from './components/world/WorldOfMeaningView';

const STORAGE_KEY = 'faham_ayat_learner_progress_v2';

function detectInitialLocale(): LocaleCode {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.startsWith('/my')) {
      return 'ms-MY';
    }
    if (path.startsWith('/id')) {
      return 'id-ID';
    }
  }
  return 'id-ID';
}

export function getDefaultProgress(locale: LocaleCode): LearnerProgress {
  return {
    locale,
    onboardingCompleted: false,
    activePathway: 'understand-quran',
    completedLessonIds: [],
    bookmarkedWordIds: [],
    learnedWordIds: [],
    reviewQueue: {},
    lessonQuizScores: {},
    reflections: {},
    dailyGoalMinutes: 10,
    showTransliteration: true,
    arabicFontScale: 'large',
    remindersEnabled: false,
    ramadanModeEnabled: false,
    reducedMotion: false,
    isDemoMode: false,
    user: null,
    authToken: null,
    lastSyncedAt: null,
    teacherReviewRequests: [],
    analyticsEvents: [],
    worldProgress: createInitialWorldProgress(),
  };
}

export function getDemoProgress(locale: LocaleCode): LearnerProgress {
  const now = Date.now();
  return {
    locale,
    onboardingCompleted: true,
    activePathway: 'understand-quran',
    completedLessonIds: ['lesson-ayah-1'],
    bookmarkedWordIds: ['w-arrahmani', 'w-alhamdu'],
    learnedWordIds: [
      'w-bismi',
      'w-allahi',
      'w-arrahmani',
      'w-arrahimi',
      'w-world-amam',
      'w-world-yamin',
      'w-world-tahta',
    ],
    reviewQueue: {
      'w-bismi': {
        wordId: 'w-bismi',
        intervalDays: 1,
        dueTimestamp: now - 1000,
        correctStreak: 1,
        lastReviewedTimestamp: now - 86_400_000,
        demonstratedMastery: false,
      },
      'w-arrahmani': {
        wordId: 'w-arrahmani',
        intervalDays: 1,
        dueTimestamp: now - 500,
        correctStreak: 1,
        lastReviewedTimestamp: now - 86_400_000,
        demonstratedMastery: false,
      },
    },
    lessonQuizScores: {
      'lesson-ayah-1': { score: 3, total: 3, timestamp: now - 3600_000 },
    },
    reflections: {
      'lesson-ayah-1':
        locale === 'id-ID'
          ? 'Contoh catatan refleksi demo: Mengenali akar kata ر-ح-م membantu saya merenungi keluasan rahmat Allah saat memulai aktivitas.'
          : 'Contoh nota refleksi demo: Mengenali akar perkataan ر-ح-م membantu saya menghayati keluasan rahmat Allah ketika memulakan amalan.',
    },
    dailyGoalMinutes: 10,
    showTransliteration: true,
    arabicFontScale: 'large',
    remindersEnabled: false,
    ramadanModeEnabled: false,
    reducedMotion: false,
    isDemoMode: true,
    user: null,
    authToken: null,
    lastSyncedAt: null,
    teacherReviewRequests: [],
    analyticsEvents: [],
    worldProgress: createDemoWorldProgress(now),
  };
}

export function App() {
  const [progress, setProgress] = useState<LearnerProgress>(() => {
    const initialLocale = detectInitialLocale();
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('demo') === '1') {
          return getDemoProgress(initialLocale);
        }
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as LearnerProgress;
          if (window.location.pathname.startsWith('/my')) {
            parsed.locale = 'ms-MY';
          } else if (window.location.pathname.startsWith('/id')) {
            parsed.locale = 'id-ID';
          }
          return parsed;
        }
      } catch {
        // Fallback to clean default progress
      }
    }
    return getDefaultProgress(initialLocale);
  });

  const [activeScreen, setActiveScreen] = useState<AppScreen>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        return 'lesson';
      }
    }
    return 'home';
  });

  const [activeLessonId, setActiveLessonId] = useState<string>('lesson-ayah-1');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [activeInfoPage, setActiveInfoPage] = useState<InfoPageId | null>(null);
  const [selectedArticle, setSelectedArticle] =
    useState<EditorialArticle | null>(null);

  const isSyncingRef = useRef<boolean>(false);

  // Sync progress to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  // Sync authenticated learner progress to backend /api/progress
  useEffect(() => {
    if (!progress.authToken || !progress.user || isSyncingRef.current) return;
    const timer = setTimeout(async () => {
      try {
        isSyncingRef.current = true;
        const response = await fetch('/api/progress', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${progress.authToken}`,
          },
          body: JSON.stringify({
            progress: {
              locale: progress.locale,
              onboardingCompleted: progress.onboardingCompleted,
              diagnostic: progress.diagnostic,
              recommendation: progress.recommendation,
              activePathway: progress.activePathway,
              completedLessonIds: progress.completedLessonIds,
              bookmarkedWordIds: progress.bookmarkedWordIds,
              learnedWordIds: progress.learnedWordIds,
              reviewQueue: progress.reviewQueue,
              lessonQuizScores: progress.lessonQuizScores,
              reflections: progress.reflections,
              dailyGoalMinutes: progress.dailyGoalMinutes,
              showTransliteration: progress.showTransliteration,
              arabicFontScale: progress.arabicFontScale,
              remindersEnabled: progress.remindersEnabled,
              ramadanModeEnabled: progress.ramadanModeEnabled,
              reducedMotion: progress.reducedMotion,
              teacherReviewRequests: progress.teacherReviewRequests,
              worldProgress: progress.worldProgress,
            },
          }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.ok && data.syncedAt) {
            setProgress((prev) =>
              prev.lastSyncedAt === data.syncedAt
                ? prev
                : { ...prev, lastSyncedAt: data.syncedAt }
            );
          }
        }
      } catch {
        // Do not claim sync succeeded if network/server failed
      } finally {
        isSyncingRef.current = false;
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [
    progress.authToken,
    progress.completedLessonIds,
    progress.bookmarkedWordIds,
    progress.learnedWordIds,
    progress.reviewQueue,
    progress.reflections,
    progress.dailyGoalMinutes,
    progress.activePathway,
    progress.worldProgress,
  ]);

  // Sync document lang, title, meta description, canonical, and locale URL (/id/ or /my/)
  useEffect(() => {
    const dict = LOCALES[progress.locale];
    document.documentElement.lang = progress.locale === 'id-ID' ? 'id' : 'ms';
    document.title = dict.seoTitle;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', dict.seoDescription);
    }
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', dict.urlPrefix);
    }
    try {
      const targetPrefix = dict.urlPrefix;
      if (!window.location.pathname.startsWith(targetPrefix.slice(0, 3))) {
        window.history.replaceState(
          null,
          '',
          `${targetPrefix}${window.location.search}`
        );
      }
    } catch {
      // Ignore history API restrictions in sandboxed iframes
    }
  }, [progress.locale]);

  const recordAnalytics = (
    eventName:
      | 'locale_selected'
      | 'pathway_selected'
      | 'sample_lesson_started'
      | 'sample_lesson_completed'
      | 'onboarding_completed'
      | 'lesson_completed'
      | 'review_session_completed'
      | 'word_bookmarked',
    metadata?: string
  ) => {
    setProgress((prev) => ({
      ...prev,
      analyticsEvents: [
        ...(prev.analyticsEvents || []).slice(-49),
        { eventName, timestamp: Date.now(), metadata },
      ],
    }));
  };

  const handleLocaleChange = (newLocale: LocaleCode) => {
    setProgress((prev) => ({
      ...prev,
      locale: newLocale,
      analyticsEvents: [
        ...(prev.analyticsEvents || []).slice(-49),
        { eventName: 'locale_selected', timestamp: Date.now(), metadata: newLocale },
      ],
    }));
  };

  const handleToggleDemoMode = () => {
    setProgress((prev) => {
      if (prev.isDemoMode) {
        return getDefaultProgress(prev.locale);
      }
      return getDemoProgress(prev.locale);
    });
  };

  const handleToggleBookmark = (wordId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedWordIds.includes(wordId);
      const bookmarkedWordIds = exists
        ? prev.bookmarkedWordIds.filter((id) => id !== wordId)
        : [...prev.bookmarkedWordIds, wordId];
      return {
        ...prev,
        bookmarkedWordIds,
        analyticsEvents: [
          ...(prev.analyticsEvents || []).slice(-49),
          { eventName: 'word_bookmarked', timestamp: Date.now(), metadata: wordId },
        ],
      };
    });
  };

  const handleSelectPathway = (pathwayId: PathwayId) => {
    setProgress((prev) => ({
      ...prev,
      activePathway: pathwayId,
      analyticsEvents: [
        ...(prev.analyticsEvents || []).slice(-49),
        { eventName: 'pathway_selected', timestamp: Date.now(), metadata: pathwayId },
      ],
    }));
    setActiveScreen('course-map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLesson = (lessonId: string) => {
    const targetLesson =
      LESSONS.find((l) => l.id === lessonId) || LESSONS[0];
    setActiveLessonId(targetLesson.id);
    recordAnalytics('sample_lesson_started', targetLesson.id);
    setProgress((prev) => ({
      ...prev,
      activePathway: targetLesson.pathwayId,
    }));
    setActiveScreen('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOnboarding = (
    answers: DiagnosticAnswers,
    recommendation: PlacementRecommendation
  ) => {
    setProgress((prev) => ({
      ...prev,
      onboardingCompleted: true,
      diagnostic: answers,
      recommendation,
      activePathway: recommendation.recommendedPathway,
      dailyGoalMinutes: answers.sessionMinutes,
      analyticsEvents: [
        ...(prev.analyticsEvents || []).slice(-49),
        {
          eventName: 'onboarding_completed',
          timestamp: Date.now(),
          metadata: recommendation.recommendedPathway,
        },
      ],
    }));
    setIsOnboardingOpen(false);
    setActiveLessonId(recommendation.recommendedLessonId);
    setActiveScreen('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteLesson = (
    lessonId: string,
    wordIds: string[],
    quizScore: number,
    quizTotal: number
  ) => {
    const now = Date.now();
    setProgress((prev) => {
      const completedLessonIds = prev.completedLessonIds.includes(lessonId)
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId];
      const learnedWordIds = Array.from(
        new Set([...prev.learnedWordIds, ...wordIds])
      );
      const updatedQueue = { ...prev.reviewQueue };
      wordIds.forEach((wId) => {
        updatedQueue[wId] = calculateNextReview(
          updatedQueue[wId],
          wId,
          true,
          now
        );
      });

      return {
        ...prev,
        completedLessonIds,
        learnedWordIds,
        reviewQueue: updatedQueue,
        lessonQuizScores: {
          ...prev.lessonQuizScores,
          [lessonId]: { score: quizScore, total: quizTotal, timestamp: now },
        },
        analyticsEvents: [
          ...(prev.analyticsEvents || []).slice(-49),
          { eventName: 'lesson_completed', timestamp: now, metadata: lessonId },
        ],
      };
    });
  };

  const handleRecordReviewResult = (wordId: string, isCorrect: boolean) => {
    const now = Date.now();
    setProgress((prev) => ({
      ...prev,
      reviewQueue: {
        ...prev.reviewQueue,
        [wordId]: calculateNextReview(
          prev.reviewQueue[wordId],
          wordId,
          isCorrect,
          now
        ),
      },
      analyticsEvents: [
        ...(prev.analyticsEvents || []).slice(-49),
        {
          eventName: 'review_session_completed',
          timestamp: now,
          metadata: `${wordId}:${isCorrect ? 'pass' : 'retry'}`,
        },
      ],
    }));
  };

  const handleSaveReflection = (lessonId: string, text: string) => {
    setProgress((prev) => ({
      ...prev,
      reflections: {
        ...prev.reflections,
        [lessonId]: text,
      },
    }));
  };

  const handleRequestTeacherReview = (
    lessonId: string,
    focusNote: string,
    focusArea?: TeacherReviewRequest['focusArea'],
    serverTicketId?: string
  ) => {
    setProgress((prev) => ({
      ...prev,
      teacherReviewRequests: [
        ...(prev.teacherReviewRequests || []),
        {
          id: serverTicketId || `TR-${Date.now()}`,
          lessonId,
          focusArea,
          focusNote,
          status: 'received-in-queue',
          submittedAt: Date.now(),
        },
      ],
    }));
  };

  const handleSignInSuccess = (
    user: AuthUser,
    authToken: string,
    serverProgress?: Partial<LearnerProgress> | null,
    syncedAt?: number
  ) => {
    setProgress((prev) => ({
      ...prev,
      ...(serverProgress || {}),
      locale: prev.locale,
      user,
      authToken,
      lastSyncedAt: syncedAt || Date.now(),
    }));
  };

  const handleSignOut = () => {
    const token = progress.authToken;
    if (token) {
      void fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {
        // Local sign-out still takes effect if the server is temporarily unreachable.
      });
    }
    setProgress((prev) => ({
      ...prev,
      user: null,
      authToken: null,
      lastSyncedAt: null,
    }));
  };

  const handleOpenArticle = (article: EditorialArticle) => {
    setSelectedArticle(article);
    setActiveScreen('resources');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRecordGameAttempt = (
    locationId: WorldLocationId,
    levelNumber: number,
    wordIds: string[],
    mistakesCount: number,
    arabicPrompt: string,
    didPass: boolean,
    diagnosticCategory?: WorldMistakeEntry['diagnosticCategory'],
    feedbackText?: string
  ) => {
    const now = Date.now();
    setProgress((prev) =>
      recordGameAttemptInProgress(
        prev,
        {
          locationId,
          levelNumber,
          wordIds,
          mistakesCount,
          ArabicPrompt: arabicPrompt,
          diagnosticCategory,
          mistakeFeedback: feedbackText
            ? { 'id-ID': feedbackText, 'ms-MY': feedbackText }
            : undefined,
        },
        didPass,
        now
      )
    );
  };

  const dueReviewCount = getDueReviewItems(progress.reviewQueue, Date.now()).length;
  const activeLesson =
    LESSONS.find((l) => l.id === activeLessonId) || LESSONS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#1C2724]">
      <Header
        locale={progress.locale}
        onLocaleChange={handleLocaleChange}
        activeScreen={activeScreen}
        onNavigate={(screen) => {
          setActiveScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        userName={progress.user?.name}
        dueReviewCount={dueReviewCount}
        isDemoMode={progress.isDemoMode}
        onToggleDemoMode={handleToggleDemoMode}
      />

      <main className="flex-1">
        {activeScreen === 'home' && (
          <Homepage
            locale={progress.locale}
            onLocaleChange={handleLocaleChange}
            bookmarkedWordIds={progress.bookmarkedWordIds}
            onToggleBookmark={handleToggleBookmark}
            onSelectPathway={handleSelectPathway}
            onStartLesson={handleStartLesson}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            onNavigate={(screen) => {
              setActiveScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            ramadanModeEnabled={progress.ramadanModeEnabled}
            onToggleRamadanMode={() =>
              setProgress((prev) => ({
                ...prev,
                ramadanModeEnabled: !prev.ramadanModeEnabled,
              }))
            }
            onOpenArticle={handleOpenArticle}
            onOpenInfoPage={(page) => setActiveInfoPage(page)}
          />
        )}

        {activeScreen === 'world' && (
          <WorldOfMeaningView
            locale={progress.locale}
            progress={progress}
            onRecordGameAttempt={handleRecordGameAttempt}
            onUpdateSettings={(partial) =>
              setProgress((prev) => ({ ...prev, ...partial }))
            }
            onNavigate={(screen) => {
              setActiveScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartLesson={handleStartLesson}
          />
        )}

        {activeScreen === 'dashboard' && (
          <DashboardView
            locale={progress.locale}
            progress={progress}
            onStartLesson={handleStartLesson}
            onNavigate={setActiveScreen}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            onToggleDemoMode={handleToggleDemoMode}
          />
        )}

        {activeScreen === 'course-map' && (
          <CourseMapView
            locale={progress.locale}
            progress={progress}
            onSelectPathway={(pathwayId) =>
              setProgress((prev) => ({ ...prev, activePathway: pathwayId }))
            }
            onStartLesson={handleStartLesson}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
          />
        )}

        {activeScreen === 'lesson' && (
          <AyatExplorer
            lesson={activeLesson}
            locale={progress.locale}
            progress={progress}
            onSelectLesson={(lessonId) => setActiveLessonId(lessonId)}
            onToggleBookmark={handleToggleBookmark}
            onSaveReflection={handleSaveReflection}
            onRequestTeacherReview={handleRequestTeacherReview}
            onCompleteLesson={handleCompleteLesson}
          />
        )}

        {activeScreen === 'vocabulary' && (
          <VocabularyView
            locale={progress.locale}
            progress={progress}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeScreen === 'review' && (
          <ReviewCenterView
            locale={progress.locale}
            progress={progress}
            onRecordReviewResult={handleRecordReviewResult}
            onStartFirstLesson={() => handleStartLesson('lesson-ayah-1')}
            onEnableDemoMode={handleToggleDemoMode}
          />
        )}

        {activeScreen === 'progress' && (
          <ProgressMasteryView
            locale={progress.locale}
            progress={progress}
          />
        )}

        {activeScreen === 'resources' && (
          <ResourcesView
            locale={progress.locale}
            initialArticle={selectedArticle}
            onSelectPathway={handleSelectPathway}
          />
        )}

        {activeScreen === 'settings' && (
          <SettingsView
            locale={progress.locale}
            progress={progress}
            onLocaleChange={handleLocaleChange}
            onUpdateSettings={(partial) =>
              setProgress((prev) => ({ ...prev, ...partial }))
            }
            onResetProgress={() =>
              setProgress(getDefaultProgress(progress.locale))
            }
            onToggleDemoMode={handleToggleDemoMode}
          />
        )}
      </main>

      <OnboardingModal
        isOpen={isOnboardingOpen}
        locale={progress.locale}
        onLocaleChange={handleLocaleChange}
        onClose={() => setIsOnboardingOpen(false)}
        onCompleteOnboarding={handleCompleteOnboarding}
      />

      <InfoPagesModal
        activePage={activeInfoPage}
        locale={progress.locale}
        onClose={() => setActiveInfoPage(null)}
        onSelectPage={(page) => setActiveInfoPage(page)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        locale={progress.locale}
        currentUser={progress.user}
        lastSyncedAt={progress.lastSyncedAt}
        currentProgress={progress}
        onClose={() => setIsAuthOpen(false)}
        onSignInSuccess={handleSignInSuccess}
        onSignOut={handleSignOut}
      />
    </div>
  );
}

export default App;
