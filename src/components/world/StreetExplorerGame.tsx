import React, { useState, useEffect, useCallback } from 'react';
import { AudioPlaybackMode, LocaleCode } from '../../types/learning';
import { STREET_EXPLORER_LEVELS, StreetLandmark } from '../../data/worldData';
import { DirectionMove, stepStreetExplorer } from '../../utils/worldEngine';
import { audioController } from '../../utils/audioPlayer';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Volume2,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  Compass,
  Sparkles,
  Star,
} from 'lucide-react';

interface StreetExplorerGameProps {
  locale: LocaleCode;
  showTransliteration: boolean;
  reducedMotion?: boolean;
  completedLevels: Record<string, { stars: number }>;
  onRecordAttempt: (
    levelNumber: number,
    wordIds: string[],
    mistakesCount: number,
    arabicPrompt: string,
    didPass: boolean,
    diagnosticCategory?: 'direction' | 'spatial',
    feedbackText?: string
  ) => void;
}

export const StreetExplorerGame: React.FC<StreetExplorerGameProps> = ({
  locale,
  showTransliteration,
  reducedMotion,
  completedLevels,
  onRecordAttempt,
}) => {
  const [activeLevelIdx, setActiveLevelIdx] = useState<number>(0);
  const currentLevel =
    STREET_EXPLORER_LEVELS[activeLevelIdx] || STREET_EXPLORER_LEVELS[0];

  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>(
    currentLevel.startPos
  );
  const [hasPassedIntermediate, setHasPassedIntermediate] = useState<boolean>(
    !currentLevel.requiredIntermediatePos
  );
  const [stepHistory, setStepHistory] = useState<string[]>([]);
  const [mistakesCount, setMistakesCount] = useState<number>(0);
  const [statusFeedback, setStatusFeedback] = useState<{
    type: 'neutral' | 'error' | 'success';
    text: string;
  } | null>(null);
  const [isLevelComplete, setIsLevelComplete] = useState<boolean>(false);
  const [revealListenText, setRevealListenText] = useState<boolean>(false);
  const [audioMode, setAudioMode] = useState<AudioPlaybackMode>('idle');

  const resetLevel = useCallback(
    (levelIdx: number) => {
      const lvl =
        STREET_EXPLORER_LEVELS[levelIdx] || STREET_EXPLORER_LEVELS[0];
      setPlayerPos(lvl.startPos);
      setHasPassedIntermediate(!lvl.requiredIntermediatePos);
      setStepHistory([]);
      setMistakesCount(0);
      setStatusFeedback(null);
      setIsLevelComplete(false);
      setRevealListenText(false);
    },
    []
  );

  useEffect(() => {
    resetLevel(activeLevelIdx);
  }, [activeLevelIdx, resetLevel]);

  const handleMove = useCallback(
    (move: DirectionMove) => {
      if (isLevelComplete) return;

      const outcome = stepStreetExplorer(
        currentLevel,
        playerPos,
        move,
        hasPassedIntermediate,
        5
      );

      setPlayerPos(outcome.nextPos);
      setHasPassedIntermediate(outcome.reachedIntermediate);
      setStepHistory((prev) => [...prev.slice(-7), outcome.arabicDirectionUsed]);

      if (outcome.hitObstacle || outcome.wrongLandmarkReached) {
        const nextMistakes = mistakesCount + 1;
        setMistakesCount(nextMistakes);
        const msg =
          outcome.feedback?.[locale] ||
          (locale === 'id-ID'
            ? 'Langkah belum sesuai instruksi.'
            : 'Langkah belum mengikut arahan.');
        setStatusFeedback({ type: 'error', text: msg });
        onRecordAttempt(
          currentLevel.levelNumber,
          currentLevel.focusWordIds,
          nextMistakes,
          currentLevel.arabicInstruction,
          false,
          currentLevel.levelNumber >= 4 ? 'spatial' : 'direction',
          msg
        );
        return;
      }

      if (outcome.reachedTarget) {
        setIsLevelComplete(true);
        const msg = outcome.feedback?.[locale] || currentLevel.successExplanation[locale];
        setStatusFeedback({ type: 'success', text: msg });
        onRecordAttempt(
          currentLevel.levelNumber,
          currentLevel.focusWordIds,
          mistakesCount,
          currentLevel.arabicInstruction,
          true
        );
        return;
      }

      if (outcome.feedback) {
        setStatusFeedback({
          type: 'neutral',
          text: outcome.feedback[locale],
        });
      } else {
        setStatusFeedback(null);
      }
    },
    [
      currentLevel,
      hasPassedIntermediate,
      isLevelComplete,
      locale,
      mistakesCount,
      onRecordAttempt,
      playerPos,
    ]
  );

  // Keyboard navigation listener (Arrow keys + WASD)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)
      ) {
        return;
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        handleMove('up');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleMove('down');
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handleMove('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        handleMove('right');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleMove]);

  const handlePlayInstructionAudio = () => {
    audioController.playVerifiedOrFallback({
      arabicText: currentLevel.arabicInstruction,
      onModeChange: setAudioMode,
    });
  };

  const handleTileClick = (x: number, y: number) => {
    const dx = x - playerPos.x;
    const dy = y - playerPos.y;
    if (Math.abs(dx) + Math.abs(dy) === 1) {
      if (dy === -1) handleMove('up');
      else if (dy === 1) handleMove('down');
      else if (dx === -1) handleMove('left');
      else if (dx === 1) handleMove('right');
    }
  };

  const renderLandmarkBadge = (landmark: StreetLandmark) => {
    const colorMap: Record<string, string> = {
      masjid: 'bg-emerald-900 text-white border-emerald-700',
      library: 'bg-amber-900 text-white border-amber-700',
      market: 'bg-orange-800 text-white border-orange-600',
      'house-blue': 'bg-blue-700 text-white border-blue-500',
      'house-red': 'bg-rose-700 text-white border-rose-500',
      'house-green': 'bg-emerald-700 text-white border-emerald-500',
      bridge: 'bg-cyan-800 text-white border-cyan-600',
      fountain: 'bg-sky-700 text-white border-sky-500',
      bench: 'bg-stone-700 text-white border-stone-500',
      tree: 'bg-green-800 text-white border-green-600',
      'rooftop-high': 'bg-indigo-800 text-white border-indigo-500',
      'courtyard-inside': 'bg-teal-800 text-white border-teal-500',
      'courtyard-outside': 'bg-slate-700 text-white border-slate-500',
    };
    return colorMap[landmark.kind] || 'bg-[#145A4A] text-white border-[#145A4A]';
  };

  return (
    <div className="space-y-6">
      {/* Level Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {STREET_EXPLORER_LEVELS.map((lvl, idx) => {
          const done = completedLevels[`street-explorer:${lvl.levelNumber}`];
          const isCurrent = idx === activeLevelIdx;
          return (
            <button
              key={lvl.levelNumber}
              type="button"
              onClick={() => setActiveLevelIdx(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-[#145A4A] text-white border-[#145A4A]'
                  : done
                  ? 'bg-[#DDEBE3] text-[#145A4A] border-[#145A4A]/25'
                  : 'bg-white text-[#1C2724]/80 border-[#1C2724]/15 hover:bg-[#F7F5EF]'
              }`}
            >
              <span>Level {lvl.levelNumber}</span>
              {done && (
                <span className="inline-flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: done.stars }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-3 h-3 fill-amber-500 text-amber-500" />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Split Game Sandbox: Left = 2D Top-Down Interactive Neighborhood Grid, Right = Arabic Command & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Interactive 2D Neighborhood Grid */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-[#1C2724]/12 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1C2724]/10">
            <div>
              <span className="text-xs font-semibold text-[#145A4A]">
                {currentLevel.stageTitle[locale]}
              </span>
              <p className="text-xs text-[#1C2724]/70 mt-0.5">
                {currentLevel.pedagogicalFocus[locale]}
              </p>
            </div>
            {currentLevel.isUnfamiliarTransferMap && (
              <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-300">
                {locale === 'id-ID'
                  ? 'Peta Lingkungan Baru (Uji Transfer)'
                  : 'Peta Kejiranan Baharu (Ujian Pemindahan)'}
              </span>
            )}
          </div>

          {/* Compass Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#1C2724]/75 bg-[#F7F5EF] px-3.5 py-2 rounded-xl border border-[#1C2724]/10">
            <div className="flex items-center gap-1.5 font-semibold text-[#145A4A]">
              <Compass className="w-4 h-4" />
              <span>
                {locale === 'id-ID' ? 'Kompas Arah Arab:' : 'Kompas Arah Arab:'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-medium">
              <span>↑ أَمَامَ ({locale === 'id-ID' ? 'Depan' : 'Hadapan'})</span>
              <span>↓ خَلْفَ ({locale === 'id-ID' ? 'Belakang' : 'Belakang'})</span>
              <span>→ يَمِين ({locale === 'id-ID' ? 'Kanan' : 'Kanan'})</span>
              <span>← يَسَار ({locale === 'id-ID' ? 'Kiri' : 'Kiri'})</span>
            </div>
          </div>

          {/* 5x5 Interactive Neighborhood Map Grid */}
          <div
            role="grid"
            aria-label="Arabic Street Explorer 2D Map"
            data-testid="street-explorer-grid"
            className="grid grid-cols-5 gap-2 sm:gap-2.5 bg-[#E6EFEA] p-3 sm:p-4 rounded-2xl border-2 border-[#145A4A]/25"
          >
            {Array.from({ length: 5 }).map((_, y) =>
              Array.from({ length: 5 }).map((__, x) => {
                const isPlayerHere = playerPos.x === x && playerPos.y === y;
                const isStart =
                  currentLevel.startPos.x === x &&
                  currentLevel.startPos.y === y;
                const isIntermediate =
                  currentLevel.requiredIntermediatePos?.x === x &&
                  currentLevel.requiredIntermediatePos?.y === y;
                const isBlocked = currentLevel.blockedCoords.some(
                  (b) => b.x === x && b.y === y
                );
                const landmark = currentLevel.landmarks.find(
                  (lm) => lm.x === x && lm.y === y
                );
                const isAdjacent =
                  Math.abs(x - playerPos.x) + Math.abs(y - playerPos.y) === 1 &&
                  !isBlocked;

                return (
                  <button
                    key={`${x}-${y}`}
                    type="button"
                    disabled={isBlocked}
                    onClick={() => handleTileClick(x, y)}
                    aria-label={
                      landmark
                        ? `Tile ${x},${y} ${landmark.arabicLabel} ${landmark.label[locale]}`
                        : isBlocked
                        ? `Tile ${x},${y} Blocked`
                        : `Road Tile ${x},${y}`
                    }
                    className={`relative min-h-[76px] sm:min-h-[92px] rounded-xl p-1.5 flex flex-col items-center justify-between text-center border transition-all ${
                      isBlocked
                        ? 'bg-[#CBD5E1] border-slate-400 cursor-not-allowed opacity-75'
                        : isPlayerHere
                        ? 'bg-[#FEF3C7] border-2 border-[#145A4A] shadow-md ring-2 ring-[#145A4A]/30'
                        : isAdjacent
                        ? 'bg-[#F7F5EF] border-[#145A4A]/40 hover:bg-white cursor-pointer'
                        : 'bg-[#F7F5EF]/90 border-[#1C2724]/12'
                    }`}
                  >
                    {/* Coordinate & Waypoint indicator */}
                    <div className="w-full flex items-center justify-between text-[10px] text-[#1C2724]/55 px-1">
                      <span className="tabular-nums">
                        {x},{y}
                      </span>
                      {isIntermediate && !hasPassedIntermediate && (
                        <span className="text-[#145A4A] font-bold">
                          {locale === 'id-ID' ? 'Persimpangan' : 'Simpang'}
                        </span>
                      )}
                      {isStart && !isPlayerHere && (
                        <span>{locale === 'id-ID' ? 'Mulai' : 'Mula'}</span>
                      )}
                    </div>

                    {/* Landmark or Obstacle or Road */}
                    {isBlocked ? (
                      <div className="my-auto text-[11px] font-semibold text-slate-600">
                        {locale === 'id-ID' ? 'Tembok / Pagar' : 'Tembok / Pagar'}
                      </div>
                    ) : landmark ? (
                      <div
                        className={`w-full rounded-lg px-1.5 py-1 border text-center ${renderLandmarkBadge(
                          landmark
                        )}`}
                      >
                        <div
                          dir="rtl"
                          lang="ar"
                          className="font-arabic text-sm sm:text-base font-bold leading-tight"
                        >
                          {landmark.arabicLabel}
                        </div>
                        <div className="text-[10px] opacity-95 truncate">
                          {landmark.label[locale]}
                        </div>
                      </div>
                    ) : (
                      <div className="my-auto text-[11px] text-[#1C2724]/40 font-medium">
                        {isAdjacent ? (
                          <span className="text-[#145A4A] font-semibold">
                            {locale === 'id-ID' ? 'Klik Jalan' : 'Klik Jalan'}
                          </span>
                        ) : (
                          '•'
                        )}
                      </div>
                    )}

                    {/* Traveler Avatar */}
                    {isPlayerHere && (
                      <div
                        className={`mt-1 px-2 py-0.5 rounded-md bg-[#145A4A] text-white text-[10px] font-bold flex items-center gap-1 ${
                          reducedMotion ? '' : 'transition-transform duration-150'
                        }`}
                      >
                        <span>
                          {locale === 'id-ID' ? 'Anda (المُسَافِر)' : 'Anda (المُسَافِر)'}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right 5 Cols: Arabic Instruction Card, D-Pad Controls & Feedback */}
        <div className="lg:col-span-5 space-y-5">
          {/* Instruction Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#145A4A]/25 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? 'Instruksi Navigasi Bahasa Arab'
                  : 'Arahan Navigasi Bahasa Arab'}
              </span>
              <button
                type="button"
                onClick={handlePlayInstructionAudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DDEBE3] text-[#145A4A] hover:bg-[#cde0d5] text-xs font-semibold transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>
                  {locale === 'id-ID' ? 'Dengarkan Instruksi' : 'Dengar Arahan'}
                </span>
              </button>
            </div>

            {currentLevel.listenOnlyMode && !revealListenText ? (
              <div className="p-5 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/12 text-center space-y-3">
                <p className="text-xs sm:text-sm text-[#1C2724]/80 font-medium">
                  {locale === 'id-ID'
                    ? 'Mode Dengar & Bertindak: Klik "Dengarkan Instruksi" di atas untuk mendengar perintah arah bahasa Arab.'
                    : 'Mod Dengar & Bertindak: Klik "Dengar Arahan" di atas untuk mendengar arahan arah bahasa Arab.'}
                </p>
                <button
                  type="button"
                  onClick={() => setRevealListenText(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#1C2724]/15 text-xs font-semibold text-[#145A4A] hover:bg-[#DDEBE3]/50"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {locale === 'id-ID'
                      ? 'Tampilkan Teks Arab (Bantuan Aksesibilitas)'
                      : 'Paparkan Teks Arab (Bantuan Kebolehcapaian)'}
                  </span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 space-y-2">
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl sm:text-3xl text-[#145A4A] font-bold text-center leading-relaxed"
                >
                  {currentLevel.arabicInstruction}
                </p>
                {showTransliteration && (
                  <p className="text-xs text-[#1C2724]/70 text-center italic">
                    {currentLevel.transliterationInstruction}
                  </p>
                )}
              </div>
            )}

            <div className="text-xs text-[#1C2724]/80 bg-[#F7F5EF]/60 p-3 rounded-xl border border-[#1C2724]/8">
              <span className="font-semibold text-[#145A4A]">
                {locale === 'id-ID' ? 'Panduan Makna: ' : 'Panduan Makna: '}
              </span>
              {currentLevel.translationHint[locale]}
            </div>

            {audioMode !== 'idle' && (
              <div className="text-[11px] text-[#1C2724]/65">
                {audioMode === 'synthetic-tts-fallback'
                  ? locale === 'id-ID'
                    ? 'Status Audio: Bantuan pelafalan sintetis perangkat (TTS Bahasa Arab).'
                    : 'Status Audio: Bantuan sebutan sintetik peranti (TTS Bahasa Arab).'
                  : audioMode === 'unavailable'
                  ? locale === 'id-ID'
                    ? 'Status Audio: Suara perangkat tidak tersedia; gunakan teks berharakat di atas.'
                    : 'Status Audio: Suara peranti tidak tersedia; gunakan teks berbaris di atas.'
                  : null}
              </div>
            )}
          </div>

          {/* Interactive Arabic D-Pad Controller */}
          <div className="bg-white rounded-2xl p-6 border border-[#1C2724]/12 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1C2724]/75">
                {locale === 'id-ID'
                  ? 'Kendali Langkah (Tombol / Keyboard WASD / Klik Peta)'
                  : 'Kawalan Langkah (Butang / Papan Kekunci WASD / Klik Peta)'}
              </span>
              <button
                type="button"
                onClick={() => resetLevel(activeLevelIdx)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#145A4A] hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{locale === 'id-ID' ? 'Ulangi Posisi' : 'Ulang Posisi'}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto">
              <div />
              <button
                type="button"
                onClick={() => handleMove('up')}
                aria-label="Move Forward Amama"
                className="p-3 rounded-xl bg-[#F7F5EF] hover:bg-[#DDEBE3] border border-[#1C2724]/15 flex flex-col items-center justify-center gap-0.5 transition-colors"
              >
                <ArrowUp className="w-4 h-4 text-[#145A4A]" />
                <span dir="rtl" lang="ar" className="font-arabic text-base font-bold text-[#145A4A]">
                  أَمَامَ
                </span>
                <span className="text-[10px] text-[#1C2724]/70">
                  {locale === 'id-ID' ? 'Depan' : 'Hadapan'}
                </span>
              </button>
              <div />

              <button
                type="button"
                onClick={() => handleMove('left')}
                aria-label="Move Left Yasaran"
                className="p-3 rounded-xl bg-[#F7F5EF] hover:bg-[#DDEBE3] border border-[#1C2724]/15 flex flex-col items-center justify-center gap-0.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-[#145A4A]" />
                <span dir="rtl" lang="ar" className="font-arabic text-base font-bold text-[#145A4A]">
                  يَسَارًا
                </span>
                <span className="text-[10px] text-[#1C2724]/70">
                  {locale === 'id-ID' ? 'Kiri' : 'Kiri'}
                </span>
              </button>

              <div className="p-2 rounded-xl bg-[#145A4A]/8 border border-[#145A4A]/20 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-semibold text-[#145A4A]">
                  {locale === 'id-ID' ? 'Posisi' : 'Posisi'}
                </span>
                <span className="text-xs font-bold text-[#1C2724] tabular-nums">
                  ({playerPos.x}, {playerPos.y})
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleMove('right')}
                aria-label="Move Right Yaminan"
                className="p-3 rounded-xl bg-[#F7F5EF] hover:bg-[#DDEBE3] border border-[#1C2724]/15 flex flex-col items-center justify-center gap-0.5 transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-[#145A4A]" />
                <span dir="rtl" lang="ar" className="font-arabic text-base font-bold text-[#145A4A]">
                  يَمِينًا
                </span>
                <span className="text-[10px] text-[#1C2724]/70">
                  {locale === 'id-ID' ? 'Kanan' : 'Kanan'}
                </span>
              </button>

              <div />
              <button
                type="button"
                onClick={() => handleMove('down')}
                aria-label="Move Backward Khalfa"
                className="p-3 rounded-xl bg-[#F7F5EF] hover:bg-[#DDEBE3] border border-[#1C2724]/15 flex flex-col items-center justify-center gap-0.5 transition-colors"
              >
                <ArrowDown className="w-4 h-4 text-[#145A4A]" />
                <span dir="rtl" lang="ar" className="font-arabic text-base font-bold text-[#145A4A]">
                  خَلْفَ
                </span>
                <span className="text-[10px] text-[#1C2724]/70">
                  {locale === 'id-ID' ? 'Belakang' : 'Belakang'}
                </span>
              </button>
              <div />
            </div>

            {stepHistory.length > 0 && (
              <div className="pt-2 border-t border-[#1C2724]/10 text-[11px] text-[#1C2724]/70">
                <span className="font-semibold">
                  {locale === 'id-ID' ? 'Jejak Langkah: ' : 'Jejak Langkah: '}
                </span>
                {stepHistory.join(' → ')}
              </div>
            )}
          </div>

          {/* Live Diagnostic / Completion Feedback Banner */}
          {statusFeedback && (
            <div
              role="status"
              className={`p-4 rounded-2xl border space-y-3 ${
                statusFeedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : statusFeedback.type === 'error'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-white border-[#1C2724]/15 text-[#1C2724]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {statusFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#1E7A57] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                )}
                <div className="text-xs sm:text-sm font-medium leading-relaxed">
                  {statusFeedback.text}
                </div>
              </div>

              {isLevelComplete && (
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-200">
                  <span className="text-xs font-semibold text-[#145A4A] flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {locale === 'id-ID'
                        ? 'Kosakata ruang ditambahkan ke Pustaka Kata & Jadwal Ulasan!'
                        : 'Kosa kata ruang ditambahkan ke Pustaka Kosa Kata & Jadual Ulang Kaji!'}
                    </span>
                  </span>
                  {activeLevelIdx < STREET_EXPLORER_LEVELS.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveLevelIdx((prev) => prev + 1)}
                      className="px-4 py-2 rounded-xl bg-[#145A4A] text-white text-xs font-semibold hover:bg-[#10483B]"
                    >
                      {locale === 'id-ID'
                        ? `Lanjut ke Level ${currentLevel.levelNumber + 1} →`
                        : `Teruskan ke Tahap ${currentLevel.levelNumber + 1} →`}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
