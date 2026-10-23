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

test('all curriculum lessons and editorial articles maintain explicit editorialStatus and clickable sourceUrl', async () => {
  const { LESSONS, WORDS, EDITORIAL_ARTICLES } = await import('../data/curriculum');
  assert.ok(LESSONS.length >= 6);
  for (const lesson of LESSONS) {
    assert.ok(
      lesson.editorialStatus === 'verified-source' ||
        lesson.editorialStatus === 'curriculum-draft-pending-scholar-review',
      `Lesson ${lesson.id} must have valid editorialStatus`
    );
    assert.ok(lesson.sourceUrl && lesson.sourceUrl.startsWith('https://'), `Lesson ${lesson.id} must have https sourceUrl`);
    if (lesson.id === 'lesson-prayer-2') {
      // Hadith dhikr lesson intentionally omits Quran recitation MP3 so it does not misrepresent surah audio
      assert.equal(lesson.audioUrl, undefined);
    } else {
      assert.ok(lesson.audioUrl && lesson.audioUrl.startsWith('https://'), `Lesson ${lesson.id} must have https audioUrl`);
    }
  }
  for (const word of WORDS) {
    assert.ok(word.sourceUrl && word.sourceUrl.startsWith('https://'), `Word ${word.id} must have https sourceUrl`);
  }
  for (const article of EDITORIAL_ARTICLES) {
    assert.ok(article.sourceUrl && article.sourceUrl.startsWith('https://'), `Article ${article.id} must have https sourceUrl`);
  }
});

test('stepStreetExplorer enforces obstacles, intermediate waypoints, and reaches target landmark', async () => {
  const { STREET_EXPLORER_LEVELS } = await import('../data/worldData');
  const { stepStreetExplorer } = await import('./worldEngine');

  const level1 = STREET_EXPLORER_LEVELS[0]; // start (1,4), intermediate (1,2), target (3,2)
  // Step up from (1,4) -> (1,3)
  const step1 = stepStreetExplorer(level1, { x: 1, y: 4 }, 'up', false);
  assert.deepEqual(step1.nextPos, { x: 1, y: 3 });
  assert.equal(step1.hitObstacle, false);
  assert.equal(step1.reachedIntermediate, false);

  // Try stepping right into blocked coord (2,3) -> stays at (1,3)
  const blockedStep = stepStreetExplorer(level1, { x: 1, y: 3 }, 'right', false);
  assert.equal(blockedStep.hitObstacle, true);
  assert.deepEqual(blockedStep.nextPos, { x: 1, y: 3 });

  // Step up to intermediate intersection (1,2)
  const step2 = stepStreetExplorer(level1, { x: 1, y: 3 }, 'up', false);
  assert.deepEqual(step2.nextPos, { x: 1, y: 2 });
  assert.equal(step2.reachedIntermediate, true);

  // Step right twice to target Masjid at (3,2)
  const step3 = stepStreetExplorer(level1, { x: 1, y: 2 }, 'right', true);
  assert.deepEqual(step3.nextPos, { x: 2, y: 2 });
  assert.equal(step3.reachedTarget, false);

  const step4 = stepStreetExplorer(level1, { x: 2, y: 2 }, 'right', true);
  assert.deepEqual(step4.nextPos, { x: 3, y: 2 });
  assert.equal(step4.reachedTarget, true);
});

test('evaluateSceneLabAttempt validates both sentence matching and interactive object placement', async () => {
  const { SCENE_LAB_STAGES } = await import('../data/worldData');
  const { evaluateSceneLabAttempt } = await import('./worldEngine');

  const stage1 = SCENE_LAB_STAGES[0];
  assert.equal(evaluateSceneLabAttempt(stage1, 'opt-1').isCorrect, true);
  assert.equal(evaluateSceneLabAttempt(stage1, 'opt-2').isCorrect, false);

  const stage5 = SCENE_LAB_STAGES[4]; // interactive placement
  assert.equal(evaluateSceneLabAttempt(stage5, 'tahta-table').isCorrect, true);
  assert.equal(evaluateSceneLabAttempt(stage5, 'fawqa-table').isCorrect, false);
});

test('evaluateMarketOrder distinguishes exact dual match, wrong quantity, and wrong color', async () => {
  const { MARKET_MISSIONS } = await import('../data/worldData');
  const { evaluateMarketOrder } = await import('./worldEngine');

  const stage6 = MARKET_MISSIONS[5]; // أَعْطِنِي تُفَّاحَتَيْنِ حَمْرَاوَيْنِ (2 red apples)
  const exact = evaluateMarketOrder(stage6, { 'item-apple-red': 2 });
  assert.equal(exact.isCorrect, true);

  const wrongQty = evaluateMarketOrder(stage6, { 'item-apple-red': 1 });
  assert.equal(wrongQty.isCorrect, false);
  assert.equal(wrongQty.diagnosticCategory, 'quantity-dual');

  const wrongColor = evaluateMarketOrder(stage6, { 'item-apple-green': 2 });
  assert.equal(wrongColor.isCorrect, false);
  assert.equal(wrongColor.diagnosticCategory, 'color-adjective');
});

test('evaluateSentenceBridge accepts multiple valid Arabic word orders (VSO and SVO)', async () => {
  const { SENTENCE_BRIDGE_CHALLENGES } = await import('../data/worldData');
  const { evaluateSentenceBridge } = await import('./worldEngine');

  const bridge1 = SENTENCE_BRIDGE_CHALLENGES[0];
  // VSO: يَقْرَأُ الْوَلَدُ الْكِتَابَ
  const vsoResult = evaluateSentenceBridge(bridge1, [
    't-yaqrau',
    't-alwaladu',
    't-alkitaba',
  ]);
  assert.equal(vsoResult.isCorrect, true);

  // SVO: الْوَلَدُ يَقْرَأُ الْكِتَابَ
  const svoResult = evaluateSentenceBridge(bridge1, [
    't-alwaladu',
    't-yaqrau',
    't-alkitaba',
  ]);
  assert.equal(svoResult.isCorrect, true);

  // Invalid order
  const invalidResult = evaluateSentenceBridge(bridge1, [
    't-alkitaba',
    't-yaqrau',
    't-alwaladu',
  ]);
  assert.equal(invalidResult.isCorrect, false);
});

test('recordGameAttemptInProgress updates shared learnedWordIds, schedules spaced review on mistakes, and updates 9-skill map', async () => {
  const { recordGameAttemptInProgress, computeNineSkillMap } = await import('./worldEngine');
  const { WORDS } = await import('../data/curriculum');

  const now = 1_700_000_000_000;
  const initialProgress: LearnerProgress = {
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

  // Record a mistake first -> schedules word as due immediately in reviewQueue
  const afterMistake = recordGameAttemptInProgress(
    initialProgress,
    {
      locationId: 'street-explorer',
      levelNumber: 1,
      wordIds: ['w-world-amam', 'w-world-yamin'],
      mistakesCount: 1,
      ArabicPrompt: 'اِتَّجِهْ إِلَى الْأَمَامِ',
      diagnosticCategory: 'direction',
    },
    false,
    now
  );
  assert.equal(afterMistake.reviewQueue['w-world-amam'].dueTimestamp, now);
  assert.equal(afterMistake.worldProgress?.mistakeHistory.length, 1);

  // Record level completion -> adds words to learnedWordIds, increments XP/stars, and updates skill demonstrations
  const afterSuccess = recordGameAttemptInProgress(
    afterMistake,
    {
      locationId: 'street-explorer',
      levelNumber: 1,
      wordIds: ['w-world-amam', 'w-world-yamin'],
      mistakesCount: 0,
      ArabicPrompt: 'اِتَّجِهْ إِلَى الْأَمَامِ',
    },
    true,
    now + 1000
  );
  assert.ok(afterSuccess.learnedWordIds.includes('w-world-amam'));
  assert.ok(afterSuccess.learnedWordIds.includes('w-world-yamin'));
  assert.equal(afterSuccess.worldProgress?.totalStars, 3);
  assert.ok((afterSuccess.worldProgress?.xp || 0) > 0);

  const nineSkills = computeNineSkillMap(afterSuccess, WORDS);
  assert.equal(nineSkills.length, 9);
  const spatialSkill = nineSkills.find((s) => s.id === 'spatial-language');
  assert.equal(spatialSkill?.demonstratedCount, 1);

  // CRITICAL: Repeating the exact same solved stage with no improvement must be strictly idempotent (0 XP, 0 stars, 0 skill inflation)
  const xpBeforeRepeat = afterSuccess.worldProgress?.xp || 0;
  const starsBeforeRepeat = afterSuccess.worldProgress?.totalStars || 0;
  const afterRepeatSameScore = recordGameAttemptInProgress(
    afterSuccess,
    {
      locationId: 'street-explorer',
      levelNumber: 1,
      wordIds: ['w-world-amam', 'w-world-yamin'],
      mistakesCount: 0,
      ArabicPrompt: 'اِتَّجِهْ إِلَى الْأَمَامِ',
    },
    true,
    now + 2000
  );
  assert.equal(afterRepeatSameScore.worldProgress?.xp, xpBeforeRepeat);
  assert.equal(afterRepeatSameScore.worldProgress?.totalStars, starsBeforeRepeat);
  assert.equal(
    afterRepeatSameScore.worldProgress?.skillDemonstrations['spatial-language'],
    1
  );
  assert.equal(
    afterRepeatSameScore.worldProgress?.completedLevels['street-explorer:1']?.attempts,
    1
  );
});

test('recordGameAttemptInProgress awards bounded XP and star delta only when replay improves stars', async () => {
  const { recordGameAttemptInProgress } = await import('./worldEngine');
  const now = 1_700_000_000_000;
  const initialProgress: LearnerProgress = {
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

  // First completion with 2 mistakes -> 1 star (40 + 1*10 = 50 XP)
  const firstPass = recordGameAttemptInProgress(
    initialProgress,
    {
      locationId: 'market',
      levelNumber: 1,
      wordIds: ['w-world-tuffaha', 'w-world-ahmar'],
      mistakesCount: 2,
      ArabicPrompt: 'أُرِيدُ تُفَّاحَةً حَمْرَاءَ',
    },
    true,
    now
  );
  assert.equal(firstPass.worldProgress?.totalStars, 1);
  assert.equal(firstPass.worldProgress?.xp, 50);
  assert.equal(
    firstPass.worldProgress?.skillDemonstrations['vocabulary-comprehension'],
    1
  );

  // Replay with 0 mistakes -> improves to 3 stars (+2 stars, +35 XP bounded improvement)
  const improvedPass = recordGameAttemptInProgress(
    firstPass,
    {
      locationId: 'market',
      levelNumber: 1,
      wordIds: ['w-world-tuffaha', 'w-world-ahmar'],
      mistakesCount: 0,
      ArabicPrompt: 'أُرِيدُ تُفَّاحَةً حَمْرَاءَ',
    },
    true,
    now + 5000
  );
  assert.equal(improvedPass.worldProgress?.totalStars, 3);
  assert.equal(improvedPass.worldProgress?.xp, 70);
  // Skill demonstration count must still be 1 for this stage (not inflated by replay)
  assert.equal(
    improvedPass.worldProgress?.skillDemonstrations['vocabulary-comprehension'],
    1
  );
});

test('isWorldLocationUnlocked enforces progressive unlocking and respects freeExploreMode', async () => {
  const {
    createInitialWorldProgress,
    isWorldLocationUnlocked,
    recordGameAttemptInProgress,
  } = await import('./worldEngine');

  const emptyWorld = createInitialWorldProgress();
  assert.equal(isWorldLocationUnlocked('street-explorer', emptyWorld), true);
  assert.equal(isWorldLocationUnlocked('scene-lab', emptyWorld), true);
  assert.equal(isWorldLocationUnlocked('market', emptyWorld), true);
  assert.equal(isWorldLocationUnlocked('quranic-discovery', emptyWorld), true);
  assert.equal(isWorldLocationUnlocked('sentence-bridge', emptyWorld), false);
  assert.equal(isWorldLocationUnlocked('lost-message', emptyWorld), false);
  assert.equal(isWorldLocationUnlocked('word-detective', emptyWorld), false);

  // Free Explore overrides lock
  assert.equal(
    isWorldLocationUnlocked('word-detective', emptyWorld, true),
    true
  );

  // Completing 1 stage unlocks sentence-bridge
  let prog: LearnerProgress = {
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
  prog = recordGameAttemptInProgress(
    prog,
    {
      locationId: 'street-explorer',
      levelNumber: 1,
      wordIds: ['w-world-amam'],
      mistakesCount: 0,
      ArabicPrompt: 'أَمَام',
    },
    true,
    1_700_000_000_000
  );
  assert.equal(
    isWorldLocationUnlocked('sentence-bridge', prog.worldProgress!),
    true
  );
  assert.equal(
    isWorldLocationUnlocked('lost-message', prog.worldProgress!),
    false
  );
});

test('all Quranic Discovery passages include verified text sources, licenses, and editorial notes', async () => {
  const { QURANIC_DISCOVERY_PASSAGES } = await import('../data/worldData');
  assert.ok(QURANIC_DISCOVERY_PASSAGES.length >= 4);
  for (const p of QURANIC_DISCOVERY_PASSAGES) {
    assert.ok(p.sourceUrl.startsWith('https://'));
    assert.ok(p.audioUrl.startsWith('https://'));
    assert.ok(p.arabicTextSource.length > 10);
    assert.ok(p.translationLicense['id-ID'].length > 10);
    assert.ok(p.translationLicense['ms-MY'].length > 10);
    assert.ok(p.audioReciterSource.length > 10);
    assert.ok(p.editorialVerificationNote['id-ID'].length > 10);
    assert.ok(p.editorialVerificationNote['ms-MY'].length > 10);
  }
});



