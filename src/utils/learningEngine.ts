import {
  DiagnosticAnswers,
  GrammaticalCategory,
  LearnerProgress,
  Lesson,
  LocaleCode,
  PlacementRecommendation,
  ReviewItem,
  SkillMetric,
  WordToken,
} from '../types/learning';

const DAY_MS = 24 * 60 * 60 * 1000;
const SPACED_INTERVALS = [1, 3, 7, 14, 30];

export function recommendStartingPoint(
  answers: DiagnosticAnswers
): PlacementRecommendation {
  // Beginner who cannot read letters or vowel marks starts with Path B (Quran reading & letters)
  if (answers.canReadLetters === 'no' || answers.canReadWithVowels === 'no') {
    return {
      recommendedPathway: 'quran-reading',
      recommendedLevel: 1,
      recommendedLessonId: 'lesson-tajwid-1',
      skipBasicAlphabet: false,
      rationale: {
        'id-ID':
          'Karena Anda ingin memperkuat pengenalan huruf hijaiyah dan harakat, kami menyarankan mulai dari Jalur Bacaan & Tajwid Dasar sebelum masuk ke analisis kosakata.',
        'ms-MY':
          'Memandangkan anda ingin mengukuhkan pengenalan huruf hijaiyah dan baris bacaan, kami mencadangkan bermula daripada Laluan Bacaan & Tajwid Asas sebelum mendalami kosa kata.',
      },
    };
  }

  // Worship-focused learner who can already read starts with Prayer Recitations
  if (answers.mainGoal === 'prayer-comprehension') {
    return {
      recommendedPathway: 'prayer-comprehension',
      recommendedLevel: 1,
      recommendedLessonId: 'lesson-prayer-1',
      skipBasicAlphabet: true,
      rationale: {
        'id-ID':
          'Anda sudah dapat membaca teks Al-Qur’an berharakat. Anda dapat melewati tahap huruf dasar dan langsung memahami makna Surah Al-Fatihah serta bacaan salat.',
        'ms-MY':
          'Anda sudah boleh membaca teks al-Quran berbaris. Anda boleh melangkau tahap huruf asas dan terus memahami makna Surah al-Fatihah serta bacaan solat.',
      },
    };
  }

  // Recitation-focused learner who already reads letters
  if (answers.mainGoal === 'quran-reading') {
    return {
      recommendedPathway: 'quran-reading',
      recommendedLevel: 2,
      recommendedLessonId: 'lesson-tajwid-2',
      skipBasicAlphabet: true,
      rationale: {
        'id-ID':
          'Anda sudah mengenal huruf hijaiyah. Kami menempatkan Anda pada modul penyambungan kata, makhraj, dan hukum tajwid terapan.',
        'ms-MY':
          'Anda sudah mengenal huruf hijaiyah. Kami menempatkan anda pada modul penyambungan perkataan, makhraj dan hukum tajwid amali.',
      },
    };
  }

  // Reader who understands some words and scored well on placement check goes to Level 2 (Sentence structure)
  if (answers.understandsWords === 'many' && answers.placementScore >= 2) {
    return {
      recommendedPathway: 'understand-quran',
      recommendedLevel: 2,
      recommendedLessonId: 'lesson-ayah-2',
      skipBasicAlphabet: true,
      rationale: {
        'id-ID':
          'Anda sudah lancar membaca Al-Qur’an dan mengenali kosakata dasar. Kami membuka Tahap 2 agar Anda langsung mempelajari kata ganti, partikel, dan struktur kalimat Al-Qur’an.',
        'ms-MY':
          'Anda sudah lancar membaca al-Quran dan mengenali kosa kata asas. Kami membuka Tahap 2 supaya anda terus mempelajari kata ganti nama, partikel dan struktur ayat al-Quran.',
      },
    };
  }

  // Default flagship profile: can read Quran, wants to understand words in context (Level 1)
  return {
    recommendedPathway: 'understand-quran',
    recommendedLevel: 1,
    recommendedLessonId: 'lesson-ayah-1',
    skipBasicAlphabet: true,
    rationale: {
      'id-ID':
        'Anda sudah mampu membaca Al-Qur’an tetapi ingin memahami arti kata dan susunannya. Anda melewati modul huruf dasar dan langsung mulai di Tahap 1: Kosakata dalam Konteks Ayat.',
      'ms-MY':
        'Anda sudah mampu membaca al-Quran tetapi ingin memahami makna perkataan dan susunannya. Anda melangkau modul huruf asas dan terus bermula di Tahap 1: Kosa Kata dalam Konteks Ayat.',
    },
  };
}

export function calculateNextReview(
  existing: ReviewItem | undefined,
  wordId: string,
  isCorrect: boolean,
  nowTimestamp: number
): ReviewItem {
  if (!existing) {
    const initialInterval = isCorrect ? SPACED_INTERVALS[0] : 0;
    return {
      wordId,
      intervalDays: initialInterval,
      dueTimestamp: isCorrect ? nowTimestamp + initialInterval * DAY_MS : nowTimestamp,
      correctStreak: isCorrect ? 1 : 0,
      lastReviewedTimestamp: nowTimestamp,
      demonstratedMastery: false,
    };
  }

  if (!isCorrect) {
    return {
      ...existing,
      intervalDays: 1,
      dueTimestamp: nowTimestamp,
      correctStreak: 0,
      lastReviewedTimestamp: nowTimestamp,
      demonstratedMastery: false,
    };
  }

  const nextStreak = existing.correctStreak + 1;
  const intervalIndex = Math.min(nextStreak - 1, SPACED_INTERVALS.length - 1);
  const nextIntervalDays = SPACED_INTERVALS[intervalIndex];

  return {
    wordId,
    intervalDays: nextIntervalDays,
    dueTimestamp: nowTimestamp + nextIntervalDays * DAY_MS,
    correctStreak: nextStreak,
    lastReviewedTimestamp: nowTimestamp,
    demonstratedMastery: nextStreak >= 2,
  };
}

export function getDueReviewItems(
  reviewQueue: Record<string, ReviewItem>,
  nowTimestamp: number
): ReviewItem[] {
  return Object.values(reviewQueue)
    .filter((item) => item.dueTimestamp <= nowTimestamp)
    .sort((a, b) => a.dueTimestamp - b.dueTimestamp);
}

export function isLessonUnlocked(
  lesson: Lesson,
  progress: LearnerProgress
): boolean {
  if (!lesson.prerequisiteLessonId) {
    return true;
  }
  if (progress.completedLessonIds.includes(lesson.prerequisiteLessonId)) {
    return true;
  }
  // If placement recommendation unlocked this level or higher in the same pathway
  if (
    progress.recommendation &&
    progress.recommendation.recommendedPathway === lesson.pathwayId &&
    lesson.level <= progress.recommendation.recommendedLevel
  ) {
    return true;
  }
  return false;
}

export interface VocabularyFilterOptions {
  query: string;
  locale: LocaleCode;
  category: GrammaticalCategory | 'all';
  stage: number | 'all';
  onlyBookmarked: boolean;
  bookmarkedWordIds: string[];
}

export function filterVocabulary(
  words: WordToken[],
  options: VocabularyFilterOptions
): WordToken[] {
  const normalizedQuery = options.query.trim().toLowerCase();

  return words.filter((word) => {
    if (options.onlyBookmarked && !options.bookmarkedWordIds.includes(word.id)) {
      return false;
    }
    if (options.category !== 'all' && word.category !== options.category) {
      return false;
    }
    if (options.stage !== 'all' && word.stage !== options.stage) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }

    const matchesArabic = word.arabic.includes(options.query.trim());
    const matchesTranslit = word.transliteration
      .toLowerCase()
      .includes(normalizedQuery);
    const matchesMeaning = word.contextualMeaning[options.locale]
      .toLowerCase()
      .includes(normalizedQuery);
    const matchesRoot =
      word.rootFamily?.rootLatin.toLowerCase().includes(normalizedQuery) ||
      word.rootFamily?.rootArabic.includes(options.query.trim()) ||
      false;

    return matchesArabic || matchesTranslit || matchesMeaning || matchesRoot;
  });
}

export function computeSkillBreakdown(
  progress: LearnerProgress,
  allWords: WordToken[]
): SkillMetric[] {
  const learnedWords = allWords.filter((w) =>
    progress.learnedWordIds.includes(w.id)
  );
  const retainedWordsCount = Object.values(progress.reviewQueue).filter(
    (item) => item.correctStreak >= 1
  ).length;
  const particleAndPronounCount = learnedWords.filter(
    (w) => w.category === 'harf' || w.category === 'phrase'
  ).length;
  const rootExploredCount = learnedWords.filter((w) => Boolean(w.rootFamily)).length;
  const verifiedQuizzesCount = Object.values(progress.lessonQuizScores).filter(
    (q) => q.score >= Math.ceil(q.total * 0.66)
  ).length;

  return [
    {
      id: 'vocab-context',
      label: {
        'id-ID': 'Kosakata dalam Konteks Ayat',
        'ms-MY': 'Kosa Kata dalam Konteks Ayat',
      },
      demonstratedCount: learnedWords.length,
      targetCount: allWords.length,
      evidenceDescription: {
        'id-ID': 'Kata Arab yang telah dipelajari beserta konteks ayatnya.',
        'ms-MY': 'Perkataan Arab yang telah dipelajari beserta konteks ayatnya.',
      },
    },
    {
      id: 'sentence-blocks',
      label: {
        'id-ID': 'Partikel & Struktur Kalimat',
        'ms-MY': 'Partikel & Struktur Ayat',
      },
      demonstratedCount: particleAndPronounCount,
      targetCount: Math.max(
        1,
        allWords.filter((w) => w.category === 'harf' || w.category === 'phrase')
          .length
      ),
      evidenceDescription: {
        'id-ID': 'Kata depan (harf) dan konstruksi frasa yang dikenali fungsinya.',
        'ms-MY': 'Kata sendi (harf) dan binaan frasa yang dikenali fungsinya.',
      },
    },
    {
      id: 'morphology-roots',
      label: {
        'id-ID': 'Keluarga Kata & Akar Bahasa',
        'ms-MY': 'Keluarga Perkataan & Akar Bahasa',
      },
      demonstratedCount: rootExploredCount,
      targetCount: Math.max(1, allWords.filter((w) => Boolean(w.rootFamily)).length),
      evidenceDescription: {
        'id-ID': 'Kata dengan akar три-huruf (tsulatsi) yang telah ditelusuri.',
        'ms-MY': 'Perkataan dengan akar tiga huruf yang telah diterokai.',
      },
    },
    {
      id: 'active-recall',
      label: {
        'id-ID': 'Retensi Ulasan Berkala',
        'ms-MY': 'Ingatan Ulang Kaji Berkala',
      },
      demonstratedCount: retainedWordsCount,
      targetCount: Math.max(4, learnedWords.length),
      evidenceDescription: {
        'id-ID': 'Kata yang berhasil dijawab benar dalam sesi ulasan aktif.',
        'ms-MY': 'Perkataan yang berjaya dijawab betul dalam sesi ulang kaji aktif.',
      },
    },
    {
      id: 'passage-comprehension',
      label: {
        'id-ID': 'Latihan Pemahaman Terverifikasi',
        'ms-MY': 'Latihan Kefahaman Disahkan',
      },
      demonstratedCount: verifiedQuizzesCount,
      targetCount: 6,
      evidenceDescription: {
        'id-ID': 'Pelajaran dengan evaluasi pemahaman yang diselesaikan dengan baik.',
        'ms-MY': 'Pelajaran dengan penilaian kefahaman yang diselesaikan dengan baik.',
      },
    },
  ];
}
