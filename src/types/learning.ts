export type LocaleCode = 'id-ID' | 'ms-MY';

export type PathwayId = 'understand-quran' | 'quran-reading' | 'prayer-comprehension';

export type GrammaticalCategory = 'isim' | 'fiil' | 'harf' | 'phrase';

export type EditorialStatus =
  | 'verified-source'
  | 'curriculum-draft-pending-scholar-review'
  | 'demo-preview';

export type AudioPlaybackMode =
  | 'idle'
  | 'loading'
  | 'verified-recording'
  | 'synthetic-tts-fallback'
  | 'unavailable';

export type InfoPageId =
  | 'about'
  | 'curriculum'
  | 'sources'
  | 'faq'
  | 'contact'
  | 'privacy'
  | 'terms';

export interface LocalizedText {
  'id-ID': string;
  'ms-MY': string;
}

export interface RootFamilyMember {
  arabic: string;
  transliteration: string;
  meaning: LocalizedText;
  formType: LocalizedText;
  verseRef: string;
}

export interface RootFamily {
  rootArabic: string;
  rootLatin: string;
  coreConcept: LocalizedText;
  linguisticNote: LocalizedText;
  relatedForms: RootFamilyMember[];
}

export interface WordToken {
  id: string;
  arabic: string;
  transliteration: string;
  contextualMeaning: LocalizedText;
  lexicalNote: LocalizedText;
  category: GrammaticalCategory;
  grammaticalRole: LocalizedText;
  advancedGrammarNote: LocalizedText;
  stage: number;
  pathwayId: PathwayId;
  verseRef: string;
  sourceAttribution: LocalizedText;
  sourceUrl?: string;
  audioUrl?: string;
  rootFamily?: RootFamily;
  audioFreqHz?: number[];
}

export interface RecallQuestion {
  prompt: LocalizedText;
  arabicPrompt?: string;
  options: LocalizedText[];
  correctIndex: number;
  explanation: LocalizedText;
}

export interface MatchingPair {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: LocalizedText;
}

export interface StructureSegment {
  wordId: string;
  arabic: string;
  roleLabel: LocalizedText;
  category: GrammaticalCategory;
  functionExplanation: LocalizedText;
}

export interface LessonPractice {
  multipleChoice: {
    question: LocalizedText;
    arabicFocus: string;
    options: LocalizedText[];
    correctIndex: number;
    feedback: LocalizedText;
  };
  matching: {
    instruction: LocalizedText;
    pairs: MatchingPair[];
  };
  roleIdentification: {
    question: LocalizedText;
    sentenceArabic: string;
    targetWordArabic: string;
    options: LocalizedText[];
    correctIndex: number;
    feedback: LocalizedText;
  };
}

export interface Lesson {
  id: string;
  pathwayId: PathwayId;
  level: number;
  order: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  durationMinutes: number;
  prerequisiteLessonId?: string;
  prerequisiteReason?: LocalizedText;
  sourceType: 'quran' | 'hadith-prayer' | 'phonetics-tajwid';
  verseRef: string;
  editorialStatus: EditorialStatus;
  arabicPhrase: string;
  transliterationPhrase: string;
  verifiedTranslation: LocalizedText;
  translationSource: LocalizedText;
  sourceUrl?: string;
  recall: RecallQuestion;
  audioDurationSeconds: number;
  audioReciter: string;
  audioLicense: string;
  audioUrl?: string;
  wordIds: string[];
  structureSummary: LocalizedText;
  grammarConceptTitle: LocalizedText;
  grammarConceptBody: LocalizedText;
  advancedGrammarBody: LocalizedText;
  structureSegments: StructureSegment[];
  tafsirContext: LocalizedText;
  tafsirSource: LocalizedText;
  reflectionPrompt: LocalizedText;
  practice: LessonPractice;
}

export interface CurriculumLevel {
  level: number;
  pathwayId: PathwayId;
  title: LocalizedText;
  description: LocalizedText;
  learningOutcome: LocalizedText;
  lessonIds: string[];
}

export interface DiagnosticAnswers {
  canReadLetters: 'yes' | 'some' | 'no';
  canReadWithVowels: 'fluent' | 'slow' | 'no';
  understandsWords: 'many' | 'few' | 'none';
  mainGoal: PathwayId;
  sessionMinutes: 5 | 10 | 15;
  placementScore: number; // 0 to 2
}

export interface PlacementRecommendation {
  recommendedPathway: PathwayId;
  recommendedLevel: number;
  recommendedLessonId: string;
  skipBasicAlphabet: boolean;
  rationale: LocalizedText;
}

export interface ReviewItem {
  wordId: string;
  intervalDays: number;
  dueTimestamp: number;
  correctStreak: number;
  lastReviewedTimestamp: number;
  demonstratedMastery: boolean;
}

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  country: 'ID' | 'MY';
  createdAt: number;
}

export interface LearningAnalyticsEvent {
  eventName: string;
  timestamp: number;
  metadata?: string;
}

export interface TeacherReviewRequest {
  id: string;
  lessonId: string;
  verseRef?: string;
  focusArea?: 'makhraj' | 'mad-waqaf' | 'ghunnah' | 'fluency';
  focusNote: string;
  status: 'received-in-queue' | 'reviewed';
  submittedAt: number;
}

export type WorldLocationId =
  | 'street-explorer'
  | 'scene-lab'
  | 'market'
  | 'sentence-bridge'
  | 'lost-message'
  | 'word-detective'
  | 'quranic-discovery';

export type GameLifecycleState =
  | 'ready'
  | 'playing'
  | 'paused'
  | 'success'
  | 'retry'
  | 'completed';

export type WorldSkillId =
  | 'word-recognition'
  | 'vocabulary-comprehension'
  | 'spatial-language'
  | 'following-instructions'
  | 'listening-comprehension'
  | 'sentence-comprehension'
  | 'basic-grammar'
  | 'morphology-roots'
  | 'quranic-vocabulary';

export interface WorldLevelResult {
  locationId: WorldLocationId;
  levelNumber: number;
  stars: number; // 1 to 3
  bestScore: number;
  attempts: number;
  mistakesCount: number;
  completedAt: number;
}

export interface WorldMistakeEntry {
  id: string;
  locationId: WorldLocationId;
  levelNumber: number;
  wordId?: string;
  arabicPrompt: string;
  diagnosticCategory: 'direction' | 'spatial' | 'quantity-dual' | 'color-adjective' | 'word-order' | 'morphology' | 'comprehension';
  feedback: LocalizedText;
  timestamp: number;
}

export interface WorldProgressState {
  xp: number;
  totalStars: number;
  unlockedLocations: WorldLocationId[];
  completedLevels: Record<string, WorldLevelResult>; // key: `${locationId}:${levelNumber}`
  skillDemonstrations: Record<WorldSkillId, number>;
  mistakeHistory: WorldMistakeEntry[];
  lastPlayedLocation?: WorldLocationId;
}

export interface LearnerProgress {
  locale: LocaleCode;
  isDemoMode?: boolean;
  user?: AuthUser | null;
  authToken?: string | null;
  lastSyncedAt?: number | null;
  onboardingCompleted: boolean;
  diagnostic?: DiagnosticAnswers;
  recommendation?: PlacementRecommendation;
  activePathway: PathwayId;
  completedLessonIds: string[];
  bookmarkedWordIds: string[];
  learnedWordIds: string[];
  reviewQueue: Record<string, ReviewItem>;
  lessonQuizScores: Record<string, { score: number; total: number; timestamp: number }>;
  reflections: Record<string, string>;
  teacherReviewRequests?: TeacherReviewRequest[];
  analyticsEvents?: LearningAnalyticsEvent[];
  worldProgress?: WorldProgressState;
  reducedMotion?: boolean;
  dailyGoalMinutes: 5 | 10 | 15;
  showTransliteration: boolean;
  arabicFontScale: 'normal' | 'large' | 'xlarge';
  remindersEnabled: boolean;
  reminderTime?: string;
  ramadanModeEnabled: boolean;
}

export interface SkillMetric {
  id: string;
  label: LocalizedText;
  demonstratedCount: number;
  targetCount: number;
  evidenceDescription: LocalizedText;
}

export interface EditorialArticle {
  id: string;
  category: 'vocabulary' | 'grammar' | 'tajwid' | 'prayer' | 'methodology';
  title: LocalizedText;
  summary: LocalizedText;
  readTimeMinutes: number;
  sourceAttribution: LocalizedText;
  sourceUrl?: string;
  arabicExcerpt?: string;
  bodyParagraphs: LocalizedText[];
  relatedPathwayId: PathwayId;
}


