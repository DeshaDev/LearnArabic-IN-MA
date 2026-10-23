import React, { useState } from 'react';
import {
  GameLifecycleState,
  LearnerProgress,
  LocaleCode,
  WorldLocationId,
  WorldMistakeEntry,
} from '../../types/learning';
import { WORLD_LOCATIONS } from '../../data/worldData';
import {
  createInitialWorldProgress,
  isWorldLocationUnlocked,
} from '../../utils/worldEngine';
import { AppScreen } from '../Header';
import { StreetExplorerGame } from './StreetExplorerGame';
import { SceneLabGame } from './SceneLabGame';
import { MarketGame } from './MarketGame';
import {
  LostMessageGame,
  QuranicDiscoveryRoom,
  SentenceBridgeGame,
  WordDetectiveGame,
} from './SupportingWorldGames';
import {
  Compass,
  MapPin,
  Star,
  Sparkles,
  ArrowLeft,
  Pause,
  Play,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Lock,
  Unlock,
} from 'lucide-react';

interface WorldErrorBoundaryState {
  hasError: boolean;
}

class WorldGameErrorBoundary extends React.Component<
  {
    locale: LocaleCode;
    onRecoverToMap: () => void;
    children: React.ReactNode;
  },
  WorldErrorBoundaryState
> {
  constructor(props: {
    locale: LocaleCode;
    onRecoverToMap: () => void;
    children: React.ReactNode;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): WorldErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-2xl bg-amber-50 border border-amber-300 text-center space-y-4">
          <AlertTriangle className="w-8 h-8 text-amber-700 mx-auto" />
          <h3 className="text-lg font-bold text-amber-950">
            {this.props.locale === 'id-ID'
              ? 'Terjadi kendala tampilan pada modul permainan ini'
              : 'Berlaku ralat paparan pada modul permainan ini'}
          </h3>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
              this.props.onRecoverToMap();
            }}
            className="px-4 py-2 rounded-xl bg-[#145A4A] text-white text-xs font-semibold"
          >
            {this.props.locale === 'id-ID'
              ? 'Kembali ke Peta Dunia Makna'
              : 'Kembali ke Peta Dunia Makna'}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

interface WorldOfMeaningViewProps {
  locale: LocaleCode;
  progress: LearnerProgress;
  initialLocationId?: WorldLocationId | null;
  onRecordGameAttempt: (
    locationId: WorldLocationId,
    levelNumber: number,
    wordIds: string[],
    mistakesCount: number,
    arabicPrompt: string,
    didPass: boolean,
    diagnosticCategory?: WorldMistakeEntry['diagnosticCategory'],
    feedbackText?: string
  ) => void;
  onUpdateSettings: (partial: Partial<LearnerProgress>) => void;
  onNavigate: (screen: AppScreen) => void;
  onStartLesson: (lessonId: string) => void;
}

export const WorldOfMeaningView: React.FC<WorldOfMeaningViewProps> = ({
  locale,
  progress,
  initialLocationId = null,
  onRecordGameAttempt,
  onUpdateSettings,
  onNavigate,
  onStartLesson,
}) => {
  const [activeLocation, setActiveLocation] = useState<WorldLocationId | null>(
    initialLocationId
  );
  const [lifecycleState, setLifecycleState] =
    useState<GameLifecycleState>('playing');
  const [freeExploreMode, setFreeExploreMode] = useState<boolean>(false);

  const worldProgress = progress.worldProgress || createInitialWorldProgress();
  const completedLevels = worldProgress.completedLevels;

  const activeLocationMeta = WORLD_LOCATIONS.find(
    (l) => l.id === activeLocation
  );

  const countCompletedForLocation = (locId: WorldLocationId) => {
    return Object.keys(completedLevels).filter((k) =>
      k.startsWith(`${locId}:`)
    ).length;
  };

  const countStarsForLocation = (locId: WorldLocationId) => {
    return Object.entries(completedLevels)
      .filter(([k]) => k.startsWith(`${locId}:`))
      .reduce((acc, [, val]) => acc + val.stars, 0);
  };

  if (activeLocation && activeLocationMeta) {
    const isPaused = lifecycleState === 'paused';

    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Game Shell Top HUD Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#145A4A]/25 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveLocation(null);
                setLifecycleState('playing');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F7F5EF] hover:bg-[#DDEBE3] text-xs font-semibold text-[#145A4A] border border-[#1C2724]/12 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                {locale === 'id-ID' ? 'Peta Dunia Makna' : 'Peta Dunia Makna'}
              </span>
            </button>
            <div>
              <div
                dir="rtl"
                lang="ar"
                className="font-arabic text-base sm:text-lg font-bold text-[#145A4A]"
              >
                {activeLocationMeta.arabicTitle}
              </div>
              <h1 className="text-sm sm:text-base font-bold text-[#1C2724]">
                {activeLocationMeta.title[locale]}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live XP & Stars Readout */}
            <div
              data-testid="world-hud-xp-stars"
              className="px-3 py-1.5 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 text-xs font-bold text-[#1C2724] tabular-nums flex items-center gap-3"
            >
              <span className="text-[#145A4A]">{worldProgress.xp} XP</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-600 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {worldProgress.totalStars}
              </span>
            </div>

            {/* Transliteration Toggle */}
            <button
              type="button"
              onClick={() =>
                onUpdateSettings({
                  showTransliteration: !progress.showTransliteration,
                })
              }
              className="px-3 py-1.5 rounded-xl bg-[#F7F5EF] hover:bg-[#DDEBE3]/60 border border-[#1C2724]/12 text-xs font-semibold text-[#1C2724] inline-flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#145A4A]" />
              <span>
                {progress.showTransliteration
                  ? locale === 'id-ID'
                    ? 'Transliterasi: Aktif'
                    : 'Transliterasi: Aktif'
                  : locale === 'id-ID'
                  ? 'Transliterasi: Nonaktif'
                  : 'Transliterasi: Nyahaktif'}
              </span>
            </button>

            {/* Reduced Motion Toggle */}
            <button
              type="button"
              onClick={() =>
                onUpdateSettings({
                  reducedMotion: !progress.reducedMotion,
                })
              }
              className="px-3 py-1.5 rounded-xl bg-[#F7F5EF] hover:bg-[#DDEBE3]/60 border border-[#1C2724]/12 text-xs font-semibold text-[#1C2724]"
            >
              {progress.reducedMotion
                ? locale === 'id-ID'
                  ? 'Gerak Tenang: Aktif'
                  : 'Gerak Tenang: Aktif'
                : locale === 'id-ID'
                ? 'Gerak Normal'
                : 'Gerak Normal'}
            </button>

            {/* Pause / Resume Button */}
            <button
              type="button"
              onClick={() =>
                setLifecycleState((prev) =>
                  prev === 'paused' ? 'playing' : 'paused'
                )
              }
              className="px-3 py-1.5 rounded-xl bg-[#DDEBE3] text-[#145A4A] hover:bg-[#cde0d5] text-xs font-semibold inline-flex items-center gap-1.5"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>{locale === 'id-ID' ? 'Lanjutkan' : 'Teruskan'}</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>{locale === 'id-ID' ? 'Jeda' : 'Jeda'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Active Game Container (ALWAYS KEPT MOUNTED WHEN PAUSED SO ROUND STATE NEVER RESETS) */}
        <div className="relative">
          {isPaused && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label={
                locale === 'id-ID' ? 'Permainan Dijeda' : 'Permainan Dijeda'
              }
              className="fixed inset-0 z-40 bg-[#1C2724]/55 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl p-8 border border-[#145A4A]/25 text-center space-y-4 max-w-lg w-full shadow-xl">
                <h2 className="text-xl font-bold text-[#1C2724]">
                  {locale === 'id-ID' ? 'Permainan Dijeda' : 'Permainan Dijeda'}
                </h2>
                <p className="text-xs sm:text-sm text-[#1C2724]/75">
                  {locale === 'id-ID'
                    ? 'Posisi karakter, isi keranjang pasar, susunan kalimat, dan kemajuan ronde Anda tetap terjaga di tempatnya.'
                    : 'Kedudukan watak, isi bakul pasar, susunan ayat dan kemajuan pusingan anda kekal terpelihara di tempatnya.'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setLifecycleState('playing')}
                    className="px-5 py-2.5 rounded-xl bg-[#145A4A] text-white text-xs sm:text-sm font-semibold hover:bg-[#10483B]"
                  >
                    {locale === 'id-ID'
                      ? 'Lanjutkan Bermain'
                      : 'Teruskan Bermain'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveLocation(null);
                      setLifecycleState('playing');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/15 text-[#1C2724] text-xs sm:text-sm font-semibold hover:bg-[#DDEBE3]/50"
                  >
                    {locale === 'id-ID'
                      ? 'Kembali ke Peta Dunia'
                      : 'Kembali ke Peta Dunia'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div
            aria-hidden={isPaused}
            className={
              isPaused
                ? 'pointer-events-none select-none opacity-35 transition-opacity'
                : 'transition-opacity'
            }
          >
            <WorldGameErrorBoundary
              locale={locale}
              onRecoverToMap={() => setActiveLocation(null)}
            >
              {activeLocation === 'street-explorer' && (
                <StreetExplorerGame
                  locale={locale}
                  showTransliteration={progress.showTransliteration}
                  reducedMotion={progress.reducedMotion}
                  isPaused={isPaused}
                  completedLevels={completedLevels}
                  onRecordAttempt={(
                    levelNumber,
                    wordIds,
                    mistakesCount,
                    arabicPrompt,
                    didPass,
                    diagCat,
                    feedbackText
                  ) =>
                    onRecordGameAttempt(
                      'street-explorer',
                      levelNumber,
                      wordIds,
                      mistakesCount,
                      arabicPrompt,
                      didPass,
                      diagCat,
                      feedbackText
                    )
                  }
                />
              )}

              {activeLocation === 'scene-lab' && (
                <SceneLabGame
                  locale={locale}
                  showTransliteration={progress.showTransliteration}
                  completedLevels={completedLevels}
                  onRecordAttempt={(
                    levelNumber,
                    wordIds,
                    mistakesCount,
                    arabicPrompt,
                    didPass,
                    diagCat,
                    feedbackText
                  ) =>
                    onRecordGameAttempt(
                      'scene-lab',
                      levelNumber,
                      wordIds,
                      mistakesCount,
                      arabicPrompt,
                      didPass,
                      diagCat,
                      feedbackText
                    )
                  }
                />
              )}

              {activeLocation === 'market' && (
                <MarketGame
                  locale={locale}
                  showTransliteration={progress.showTransliteration}
                  completedLevels={completedLevels}
                  onRecordAttempt={(
                    levelNumber,
                    wordIds,
                    mistakesCount,
                    arabicPrompt,
                    didPass,
                    diagCat,
                    feedbackText
                  ) =>
                    onRecordGameAttempt(
                      'market',
                      levelNumber,
                      wordIds,
                      mistakesCount,
                      arabicPrompt,
                      didPass,
                      diagCat,
                      feedbackText
                    )
                  }
                />
              )}

              {activeLocation === 'sentence-bridge' && (
                <SentenceBridgeGame
                  locale={locale}
                  showTransliteration={progress.showTransliteration}
                  completedLevels={completedLevels}
                  onRecordAttempt={(
                    levelNumber,
                    wordIds,
                    mistakesCount,
                    arabicPrompt,
                    didPass,
                    diagCat,
                    feedbackText
                  ) =>
                    onRecordGameAttempt(
                      'sentence-bridge',
                      levelNumber,
                      wordIds,
                      mistakesCount,
                      arabicPrompt,
                      didPass,
                      diagCat,
                      feedbackText
                    )
                  }
                />
              )}

              {activeLocation === 'lost-message' && (
                <LostMessageGame
                  locale={locale}
                  showTransliteration={progress.showTransliteration}
                  completedLevels={completedLevels}
                  onRecordAttempt={(
                    levelNumber,
                    wordIds,
                    mistakesCount,
                    arabicPrompt,
                    didPass,
                    diagCat,
                    feedbackText
                  ) =>
                    onRecordGameAttempt(
                      'lost-message',
                      levelNumber,
                      wordIds,
                      mistakesCount,
                      arabicPrompt,
                      didPass,
                      diagCat,
                      feedbackText
                    )
                  }
                />
              )}

              {activeLocation === 'word-detective' && (
                <WordDetectiveGame
                  locale={locale}
                  showTransliteration={progress.showTransliteration}
                  completedLevels={completedLevels}
                  onRecordAttempt={(
                    levelNumber,
                    wordIds,
                    mistakesCount,
                    arabicPrompt,
                    didPass,
                    diagCat,
                    feedbackText
                  ) =>
                    onRecordGameAttempt(
                      'word-detective',
                      levelNumber,
                      wordIds,
                      mistakesCount,
                      arabicPrompt,
                      didPass,
                      diagCat,
                      feedbackText
                    )
                  }
                />
              )}

              {activeLocation === 'quranic-discovery' && (
                <QuranicDiscoveryRoom
                  locale={locale}
                  showTransliteration={progress.showTransliteration}
                  completedLevels={completedLevels}
                  onRecordAttempt={(
                    levelNumber,
                    wordIds,
                    mistakesCount,
                    arabicPrompt,
                    didPass
                  ) =>
                    onRecordGameAttempt(
                      'quranic-discovery',
                      levelNumber,
                      wordIds,
                      mistakesCount,
                      arabicPrompt,
                      didPass
                    )
                  }
                  onOpenLessonInExplorer={onStartLesson}
                />
              )}
            </WorldGameErrorBoundary>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // WORLD OF MEANING HUB / INTERACTIVE CONNECTED PATHWAY MAP
  // ============================================================================
  const totalLevelsAvailable = WORLD_LOCATIONS.reduce(
    (sum, l) => sum + l.levelCount,
    0
  );
  const totalLevelsCompleted = Object.keys(completedLevels).length;

  // Coordinates for the 7 connected locations on the visual SVG World Map (viewBox 0 0 920 220)
  const mapNodes: Array<{
    id: WorldLocationId;
    x: number;
    y: number;
    shortLabel: string;
    arabic: string;
  }> = [
    {
      id: 'street-explorer',
      x: 85,
      y: 145,
      shortLabel: locale === 'id-ID' ? '1. Jalan' : '1. Jalan',
      arabic: 'الْحَارَة',
    },
    {
      id: 'scene-lab',
      x: 215,
      y: 75,
      shortLabel: locale === 'id-ID' ? '2. Lab Ruang' : '2. Makmal Ruang',
      arabic: 'الْمَشَاهِد',
    },
    {
      id: 'market',
      x: 345,
      y: 145,
      shortLabel: locale === 'id-ID' ? '3. Pasar' : '3. Pasar',
      arabic: 'السُّوق',
    },
    {
      id: 'sentence-bridge',
      x: 475,
      y: 75,
      shortLabel: locale === 'id-ID' ? '4. Jembatan' : '4. Jambatan',
      arabic: 'الْجِسْر',
    },
    {
      id: 'lost-message',
      x: 605,
      y: 145,
      shortLabel: locale === 'id-ID' ? '5. Surat' : '5. Surat',
      arabic: 'الرِّسَالَة',
    },
    {
      id: 'word-detective',
      x: 735,
      y: 75,
      shortLabel: locale === 'id-ID' ? '6. Akar Kata' : '6. Akar Kata',
      arabic: 'الْجُذُور',
    },
    {
      id: 'quranic-discovery',
      x: 850,
      y: 115,
      shortLabel: locale === 'id-ID' ? '7. Al-Qur’an' : '7. Al-Quran',
      arabic: 'الْقُرْآن',
    },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      {/* Hero Banner for World of Meaning */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#145A4A]/25 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-3">
          <div className="text-xs font-semibold text-[#145A4A] flex items-center gap-2">
            <Compass className="w-4 h-4" />
            <span>
              {locale === 'id-ID'
                ? 'Faham Ayat · Dunia Makna (The World of Meaning)'
                : 'Faham Ayat · Dunia Makna (The World of Meaning)'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C2724] text-balance">
            {locale === 'id-ID'
              ? 'Pelajari Bahasa Arab & Kosakata Al-Qur’an Melalui Tindakan, Ruang, dan Konteks Nyata'
              : 'Pelajari Bahasa Arab & Kosa Kata al-Quran Melalui Tindakan, Ruang dan Konteks Sebenar'}
          </h1>
          <p className="text-sm sm:text-base text-[#1C2724]/80 leading-relaxed max-w-2xl">
            {locale === 'id-ID'
              ? 'Jelajahi 7 lingkungan interaktif yang saling terhubung: mulai dari navigasi jalan (يَمِين / يَسَار / أَمَام / خَلْف), laboratorium adegan visual, transaksi pasar, jembatan susunan kalimat, hingga penemuan ayat Al-Qur’an.'
              : 'Terokai 7 persekitaran interaktif yang saling berhubung: bermula daripada navigasi jalan (يَمِين / يَسَار / أَمَام / خَلْف), makmal adegan visual, urus niaga pasar, jambatan binaan ayat, sehinggalah penemuan ayat al-Quran.'}
          </p>
        </div>

        {/* Summary Metrics Box */}
        <div className="lg:col-span-4 bg-[#F7F5EF] rounded-2xl p-5 border border-[#1C2724]/10 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-white border border-[#1C2724]/8">
              <div className="text-xl font-bold text-[#145A4A] tabular-nums">
                {worldProgress.xp}
              </div>
              <div className="text-[11px] text-[#1C2724]/65">XP Makna</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#1C2724]/8">
              <div className="text-xl font-bold text-amber-600 tabular-nums flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
                <span>{worldProgress.totalStars}</span>
              </div>
              <div className="text-[11px] text-[#1C2724]/65">
                {locale === 'id-ID' ? 'Bintang' : 'Bintang'}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#1C2724]/8">
              <div className="text-xl font-bold text-[#1C2724] tabular-nums">
                {totalLevelsCompleted}/{totalLevelsAvailable}
              </div>
              <div className="text-[11px] text-[#1C2724]/65">
                {locale === 'id-ID' ? 'Level' : 'Tahap'}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1C2724]/10 text-xs">
            <button
              type="button"
              onClick={() => onNavigate('vocabulary')}
              className="font-semibold text-[#145A4A] hover:underline"
            >
              {locale === 'id-ID' ? 'Pustaka Kata →' : 'Pustaka Kosa Kata →'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('progress')}
              className="font-semibold text-[#145A4A] hover:underline"
            >
              {locale === 'id-ID'
                ? '9 Dimensi Kemampuan →'
                : '9 Dimensi Kemahiran →'}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Connected SVG World Pathway Map + Free Explore Toggle */}
      <div className="bg-white rounded-2xl p-6 border border-[#145A4A]/20 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#1C2724]">
              {locale === 'id-ID'
                ? 'Peta Jalur Dunia Makna (7 Lingkungan Terhubung)'
                : 'Peta Laluan Dunia Makna (7 Persekitaran Berhubung)'}
            </h2>
            <p className="text-xs text-[#1C2724]/70">
              {locale === 'id-ID'
                ? 'Lokasi dasar (Jalan, Lab Ruang, Pasar) & Ruang Al-Qur’an terbuka sejak awal. Selesaikan tahap untuk membuka Jembatan Kalimat, Surat yang Hilang, dan Detektif Kata.'
                : 'Lokasi asas (Jalan, Makmal Ruang, Pasar) & Ruang al-Quran dibuka sejak awal. Selesaikan tahap untuk membuka Jambatan Ayat, Surat yang Hilang dan Detektif Perkataan.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFreeExploreMode((prev) => !prev)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
              freeExploreMode
                ? 'bg-[#145A4A] text-white border-[#145A4A]'
                : 'bg-[#F7F5EF] text-[#145A4A] border-[#145A4A]/25 hover:bg-[#DDEBE3]/60'
            }`}
          >
            {freeExploreMode ? (
              <Unlock className="w-3.5 h-3.5" />
            ) : (
              <Lock className="w-3.5 h-3.5" />
            )}
            <span>
              {freeExploreMode
                ? locale === 'id-ID'
                  ? 'Mode Eksplorasi Bebas: Aktif (Semua Terbuka)'
                  : 'Mod Eksplorasi Bebas: Aktif (Semua Terbuka)'
                : locale === 'id-ID'
                ? 'Buka Semua Lokasi (Mode Eksplorasi Bebas)'
                : 'Buka Semua Lokasi (Mod Eksplorasi Bebas)'}
            </span>
          </button>
        </div>

        {/* SVG Pathway Diagram */}
        <div className="rounded-2xl bg-gradient-to-r from-[#F7F5EF] via-[#EEF5F0] to-[#F7F5EF] border border-[#145A4A]/15 p-3 overflow-x-auto">
          <svg
            viewBox="0 0 920 210"
            className="w-full min-w-[680px] h-auto select-none"
            role="img"
            aria-label={
              locale === 'id-ID'
                ? 'Jalur Peta Dunia Makna'
                : 'Laluan Peta Dunia Makna'
            }
          >
            {/* Connecting Road Path */}
            <path
              d="M 85 145 L 215 75 L 345 145 L 475 75 L 605 145 L 735 75 L 850 115"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 85 145 L 215 75 L 345 145 L 475 75 L 605 145 L 735 75 L 850 115"
              fill="none"
              stroke="#145A4A"
              strokeWidth={3}
              strokeDasharray="8 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.65}
            />

            {mapNodes.map((node) => {
              const unlocked = isWorldLocationUnlocked(
                node.id,
                worldProgress,
                freeExploreMode
              );
              const doneCount = countCompletedForLocation(node.id);
              const isQuran = node.id === 'quranic-discovery';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => {
                    if (!unlocked) return;
                    setActiveLocation(node.id);
                    setLifecycleState('playing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={unlocked ? 'cursor-pointer' : 'cursor-not-allowed'}
                >
                  <circle
                    r={isQuran ? 38 : 34}
                    fill={
                      !unlocked
                        ? '#E2E8F0'
                        : doneCount > 0
                        ? '#145A4A'
                        : '#FFFFFF'
                    }
                    stroke={
                      !unlocked
                        ? '#94A3B8'
                        : isQuran
                        ? '#D8A75B'
                        : '#145A4A'
                    }
                    strokeWidth={isQuran ? 4 : 3}
                  />
                  <text
                    y={-2}
                    textAnchor="middle"
                    fill={
                      !unlocked
                        ? '#64748B'
                        : doneCount > 0
                        ? '#FFFFFF'
                        : '#145A4A'
                    }
                    fontSize="13"
                    fontWeight="bold"
                    direction="rtl"
                  >
                    {node.arabic}
                  </text>
                  <text
                    y={14}
                    textAnchor="middle"
                    fill={
                      !unlocked
                        ? '#64748B'
                        : doneCount > 0
                        ? '#DDEBE3'
                        : '#1C2724'
                    }
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {unlocked ? `${doneCount}✓` : '🔒'}
                  </text>
                  <rect
                    x={-52}
                    y={42}
                    width={104}
                    height={20}
                    rx={6}
                    fill="#FFFFFF"
                    stroke="#CBD5E1"
                  />
                  <text
                    y={55}
                    textAnchor="middle"
                    fill="#1C2724"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {node.shortLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Interactive 7-Location World Map Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {WORLD_LOCATIONS.map((loc) => {
          const completedCount = countCompletedForLocation(loc.id);
          const starsEarned = countStarsForLocation(loc.id);
          const isQuranRoom = loc.id === 'quranic-discovery';
          const isUnlocked = isWorldLocationUnlocked(
            loc.id,
            worldProgress,
            freeExploreMode
          );

          return (
            <div
              key={loc.id}
              data-testid={`world-card-${loc.id}`}
              className={`bg-white rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                isQuranRoom
                  ? 'md:col-span-2 lg:col-span-3 border-[#145A4A]/35 bg-gradient-to-r from-white to-[#F7F5EF]'
                  : isUnlocked
                  ? 'border-[#1C2724]/12 hover:border-[#145A4A]/40'
                  : 'border-slate-200 bg-slate-50/70 opacity-85'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs text-[#1C2724]/65">
                  <span className="font-semibold text-[#145A4A] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      {loc.editorialStatus === 'verified-source'
                        ? locale === 'id-ID'
                          ? 'Teks Ayat Terverifikasi (Kemenag RI / JAKIM)'
                          : 'Teks Ayat Disahkan (JAKIM / Kemenag RI)'
                        : locale === 'id-ID'
                        ? 'Materi Latihan Bahasa Arab Kontekstual'
                        : 'Materi Latihan Bahasa Arab Kontekstual'}
                    </span>
                  </span>
                  <span className="tabular-nums font-semibold inline-flex items-center gap-1">
                    <span>
                      {completedCount}/{loc.levelCount}{' '}
                      {locale === 'id-ID' ? 'Selesai' : 'Selesai'} ·
                    </span>
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                    <span>{starsEarned}</span>
                  </span>
                </div>

                <div
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl font-bold text-[#145A4A] bg-[#F7F5EF] py-2 px-3 rounded-xl border border-[#1C2724]/8 text-right"
                >
                  {loc.arabicTitle}
                </div>

                <h2 className="text-lg font-bold text-[#1C2724]">
                  {loc.title[locale]}
                </h2>

                <p className="text-xs sm:text-sm text-[#1C2724]/75 leading-relaxed">
                  {loc.subtitle[locale]}
                </p>

                {!isUnlocked && loc.unlockRequirementLabel && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{loc.unlockRequirementLabel[locale]}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#1C2724]/10 flex items-center justify-between gap-3">
                <span className="text-xs text-[#1C2724]/60">
                  {loc.levelCount}{' '}
                  {locale === 'id-ID' ? 'Tahap Interaktif' : 'Tahap Interaktif'}
                </span>
                {isUnlocked ? (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveLocation(loc.id);
                      setLifecycleState('playing');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#145A4A] hover:bg-[#10483B] text-white text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {completedCount > 0
                        ? locale === 'id-ID'
                          ? 'Lanjutkan Lokasi'
                          : 'Teruskan Lokasi'
                        : locale === 'id-ID'
                        ? 'Masuki Lokasi'
                        : 'Masuki Lokasi'}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setFreeExploreMode(true)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#145A4A]/30 text-[#145A4A] hover:bg-[#DDEBE3]/50 text-xs font-semibold inline-flex items-center gap-1.5"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>
                      {locale === 'id-ID'
                        ? 'Buka via Mode Bebas'
                        : 'Buka melalui Mod Bebas'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Mistake Diagnostic & Spaced Review Bridge */}
      {worldProgress.mistakeHistory.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-[#1C2724]/12 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1C2724]/10">
            <div>
              <h3 className="text-base font-bold text-[#1C2724]">
                {locale === 'id-ID'
                  ? 'Catatan Diagnostik & Penguatan Ulasan (Mistake-Driven Review)'
                  : 'Nota Diagnostik & Pengukuhan Ulang Kaji (Mistake-Driven Review)'}
              </h3>
              <p className="text-xs text-[#1C2724]/65">
                {locale === 'id-ID'
                  ? 'Kata atau konsep yang sempat keliru di dalam permainan otomatis dijadwalkan ke Ruang Ulasan.'
                  : 'Perkataan atau konsep yang tersilap di dalam permainan dijadualkan secara automatik ke Ruang Ulang Kaji.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('review')}
              className="px-4 py-2 rounded-xl bg-[#DDEBE3] text-[#145A4A] text-xs font-semibold hover:bg-[#cde0d5] inline-flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {locale === 'id-ID'
                  ? 'Latih di Ruang Ulasan'
                  : 'Latih di Ruang Ulang Kaji'}
              </span>
            </button>
          </div>

          <div className="space-y-2">
            {worldProgress.mistakeHistory.slice(0, 3).map((m) => (
              <div
                key={m.id}
                className="p-3.5 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-bold text-[#145A4A]">
                    {m.feedback[locale]}
                  </span>
                </div>
                <span
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-lg font-bold text-[#145A4A]"
                >
                  {m.arabicPrompt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
