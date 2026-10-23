import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNextReview,
  computeSkillBreakdown,
  filterVocabulary,
  getDueReviewItems,
  isLessonUnlocked,
  recommendStartingPoint,
} from './learningEngine';
import { LearnerProgress, Lesson, WordToken } from '../types/learning';

test('recommendStartingPoint routes beginners without letter knowledge to quran-reading Level 1', () => {
  const rec = recommendStartingPoint({
    canReadLetters: 'no',
    canReadWithVowels: 'no',
    understandsWords: 'none',
    mainGoal: 'understand-quran',
    sessionMinutes: 10,
    placementScore: 0,
  });

  assert.equal(rec.recommendedPathway, 'quran-reading');
  assert.equal(rec.recommendedLevel, 1);
  assert.equal(rec.skipBasicAlphabet, false);
});

test('recommendStartingPoint skips basic alphabet for capable readers wanting Quran comprehension', () => {
  const rec = recommendStartingPoint({
    canReadLetters: 'yes',
    canReadWithVowels: 'fluent',
    understandsWords: 'few',
    mainGoal: 'understand-quran',
    sessionMinutes: 10,
    placementScore: 1,
  });

  assert.equal(rec.recommendedPathway, 'understand-quran');
  assert.equal(rec.recommendedLevel, 1);
  assert.equal(rec.skipBasicAlphabet, true);
});

test('recommendStartingPoint places experienced readers at Level 2 sentence structure', () => {
  const rec = recommendStartingPoint({
    canReadLetters: 'yes',
    canReadWithVowels: 'fluent',
    understandsWords: 'many',
    mainGoal: 'understand-quran',
    sessionMinutes: 15,
    placementScore: 2,
  });

  assert.equal(rec.recommendedPathway, 'understand-quran');
  assert.equal(rec.recommendedLevel, 2);
  assert.equal(rec.recommendedLessonId, 'lesson-ayah-2');
});

test('calculateNextReview schedules increasing intervals on correct answers and resets on mistake', () => {
  const now = 1_700_000_000_000;
  const first = calculateNextReview(undefined, 'word-1', true, now);
  assert.equal(first.intervalDays, 1);
  assert.equal(first.correctStreak, 1);
  assert.equal(first.demonstratedMastery, false);

  const second = calculateNextReview(first, 'word-1', true, now + 86_400_000);
  assert.equal(second.intervalDays, 3);
  assert.equal(second.correctStreak, 2);
  assert.equal(second.demonstratedMastery, true);

  const afterMistake = calculateNextReview(second, 'word-1', false, now + 4 * 86_400_000);
  assert.equal(afterMistake.correctStreak, 0);
  assert.equal(afterMistake.demonstratedMastery, false);
  assert.equal(afterMistake.dueTimestamp, now + 4 * 86_400_000);
});

test('getDueReviewItems filters and sorts due items accurately', () => {
  const now = 1_700_000_000_000;
  const queue = {
    w1: {
      wordId: 'w1',
      intervalDays: 1,
      dueTimestamp: now - 5000,
      correctStreak: 1,
      lastReviewedTimestamp: now - 90000,
      demonstratedMastery: false,
    },
    w2: {
      wordId: 'w2',
      intervalDays: 3,
      dueTimestamp: now + 50000,
      correctStreak: 2,
      lastReviewedTimestamp: now,
      demonstratedMastery: true,
    },
  };

  const due = getDueReviewItems(queue, now);
  assert.equal(due.length, 1);
  assert.equal(due[0].wordId, 'w1');
});

test('filterVocabulary matches localized Indonesian and Malaysian meanings and roots', () => {
  const sampleWords: WordToken[] = [
    {
      id: 'w-rahma',
      arabic: 'ٱلرَّحْمَـٰنِ',
      transliteration: 'Ar-Rahmani',
      contextualMeaning: {
        'id-ID': 'Yang Maha Pengasih',
        'ms-MY': 'Yang Maha Pemurah',
      },
      lexicalNote: { 'id-ID': 'Catatan', 'ms-MY': 'Nota' },
      category: 'isim',
      grammaticalRole: { 'id-ID': 'Kata Benda', 'ms-MY': 'Kata Nama' },
      advancedGrammarNote: { 'id-ID': 'Majrur', 'ms-MY': 'Majrur' },
      stage: 1,
      pathwayId: 'understand-quran',
      verseRef: 'QS. Al-Fatihah 1:1',
      sourceAttribution: { 'id-ID': 'Kemenag RI', 'ms-MY': 'JAKIM' },
      rootFamily: {
        rootArabic: 'ر - ح - م',
        rootLatin: 'r-h-m',
        coreConcept: { 'id-ID': 'Kasih sayang', 'ms-MY': 'Kasih sayang' },
        linguisticNote: { 'id-ID': 'Akar', 'ms-MY': 'Akar' },
        relatedForms: [],
      },
    },
  ];

  const indoMatch = filterVocabulary(sampleWords, {
    query: 'Pengasih',
    locale: 'id-ID',
    category: 'all',
    stage: 'all',
    onlyBookmarked: false,
    bookmarkedWordIds: [],
  });
  assert.equal(indoMatch.length, 1);

  const malayMatch = filterVocabulary(sampleWords, {
    query: 'Pemurah',
    locale: 'ms-MY',
    category: 'all',
    stage: 'all',
    onlyBookmarked: false,
    bookmarkedWordIds: [],
  });
  assert.equal(malayMatch.length, 1);
});

test('isLessonUnlocked respects prerequisite completion and placement level unlock', () => {
  const lockedLesson = {
    id: 'lesson-ayah-2',
    pathwayId: 'understand-quran',
    level: 2,
    prerequisiteLessonId: 'lesson-ayah-1',
  } as Lesson;

  const baseProgress: LearnerProgress = {
    locale: 'id-ID',
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
  };

  assert.equal(isLessonUnlocked(lockedLesson, baseProgress), false);

  const completedPrereqProgress: LearnerProgress = {
    ...baseProgress,
    completedLessonIds: ['lesson-ayah-1'],
  };
  assert.equal(isLessonUnlocked(lockedLesson, completedPrereqProgress), true);

  const diagnosticUnlockedProgress: LearnerProgress = {
    ...baseProgress,
    recommendation: {
      recommendedPathway: 'understand-quran',
      recommendedLevel: 2,
      recommendedLessonId: 'lesson-ayah-2',
      skipBasicAlphabet: true,
      rationale: { 'id-ID': '', 'ms-MY': '' },
    },
  };
  assert.equal(isLessonUnlocked(lockedLesson, diagnosticUnlockedProgress), true);
  const metrics = computeSkillBreakdown(completedPrereqProgress, []);
  assert.equal(metrics.length, 5);
});
