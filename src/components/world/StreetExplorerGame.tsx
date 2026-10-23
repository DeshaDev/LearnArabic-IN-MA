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
  MapPin,
  Flag,
} from 'lucide-react';

interface StreetExplorerGameProps {
  locale: LocaleCode;
  showTransliteration: boolean;
  reducedMotion?: boolean;
  isPaused?: boolean;
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
  isPaused = false,
  completedLevels,
  onRecordAttempt,
}) => {
  const [activeLevelIdx, setActiveLevelIdx] = useState<number>(0);
  const currentLevel =
    STREET_EXPLORER_LEVELS[activeLevelIdx] || STREET_EXPLORER_LEVELS[0];

  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>(
    currentLevel.startPos
  );
  const [facing, setFacing] = useState<DirectionMove>('up');
  const [visitedCoords, setVisitedCoords] = useState<
    Array<{ x: number; y: number }>
  >([currentLevel.startPos]);
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

  const resetLevel = useCallback((levelIdx: number) => {
    const lvl =
      STREET_EXPLORER_LEVELS[levelIdx] || STREET_EXPLORER_LEVELS[0];
    setPlayerPos(lvl.startPos);
    setFacing('up');
    setVisitedCoords([lvl.startPos]);
    setHasPassedIntermediate(!lvl.requiredIntermediatePos);
    setStepHistory([]);
    setMistakesCount(0);
    setStatusFeedback(null);
    setIsLevelComplete(false);
    setRevealListenText(false);
  }, []);

  useEffect(() => {
    resetLevel(activeLevelIdx);
  }, [activeLevelIdx, resetLevel]);

  const handleMove = useCallback(
    (move: DirectionMove) => {
      if (isLevelComplete || isPaused) return;

      setFacing(move);
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

      if (!outcome.hitObstacle) {
        setVisitedCoords((prev) => {
          const exists = prev.some(
            (c) => c.x === outcome.nextPos.x && c.y === outcome.nextPos.y
          );
          return exists ? prev : [...prev, outcome.nextPos];
        });
      }

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
        const msg =
          outcome.feedback?.[locale] || currentLevel.successExplanation[locale];
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
        const stepSuccessMsg =
          locale === 'id-ID'
            ? `Melangkah ${outcome.arabicDirectionUsed}.${
                outcome.reachedIntermediate &&
                !hasPassedIntermediate &&
                currentLevel.requiredIntermediatePos
                  ? ' Anda telah melewati titik persimpangan! Lanjutkan ke tujuan akhir.'
                  : ''
              }`
            : `Melangkah ${outcome.arabicDirectionUsed}.${
                outcome.reachedIntermediate &&
                !hasPassedIntermediate &&
                currentLevel.requiredIntermediatePos
                  ? ' Anda telah melalui titik persimpangan! Teruskan ke destinasi akhir.'
                  : ''
              }`;
        setStatusFeedback({
          type: 'neutral',
          text: stepSuccessMsg,
        });
      }
    },
    [
      currentLevel,
      hasPassedIntermediate,
      isLevelComplete,
      isPaused,
      locale,
      mistakesCount,
      onRecordAttempt,
      playerPos,
    ]
  );

  // Keyboard navigation listener (Arrow keys + WASD), disabled when paused
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isPaused || isLevelComplete) return;
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
  }, [handleMove, isPaused, isLevelComplete]);

  const handlePlayInstructionAudio = () => {
    audioController.playVerifiedOrFallback({
      arabicText: currentLevel.arabicInstruction,
      allowSyntheticFallback: true,
      onModeChange: setAudioMode,
    });
  };

  const handleTileClick = (x: number, y: number) => {
    if (isPaused || isLevelComplete) return;
    const dx = x - playerPos.x;
    const dy = y - playerPos.y;
    if (Math.abs(dx) + Math.abs(dy) === 1) {
      if (dy === -1) handleMove('up');
      else if (dy === 1) handleMove('down');
      else if (dx === -1) handleMove('left');
      else if (dx === 1) handleMove('right');
    }
  };

  const renderBuildingSvg = (kind: StreetLandmark['kind']) => {
    switch (kind) {
      case 'masjid':
        return (
          <svg viewBox="0 0 36 28" className="w-7 h-6 mx-auto" aria-hidden="true">
            <path d="M8 14 C8 6, 24 6, 24 14 Z" fill="#FDE68A" />
            <rect x="6" y="14" width="20" height="12" rx="2" fill="#065F46" />
            <rect x="27" y="4" width="4" height="22" rx="1" fill="#047857" />
            <polygon points="29,1 26,5 32,5" fill="#FDE68A" />
            <rect x="13" y="18" width="6" height="8" rx="3" fill="#FEF3C7" />
          </svg>
        );
      case 'library':
        return (
          <svg viewBox="0 0 36 28" className="w-7 h-6 mx-auto" aria-hidden="true">
            <polygon points="4,10 18,3 32,10" fill="#B45309" />
            <rect x="6" y="10" width="24" height="16" rx="2" fill="#78350F" />
            <path d="M12 14 L18 16 L24 14 L24 22 L18 24 L12 22 Z" fill="#FEF3C7" />
          </svg>
        );
      case 'market':
        return (
          <svg viewBox="0 0 36 28" className="w-7 h-6 mx-auto" aria-hidden="true">
            <rect x="5" y="12" width="26" height="14" rx="2" fill="#9A3412" />
            <path d="M3 12 L8 5 L28 5 L33 12 Z" fill="#F97316" />
            <rect x="11" y="5" width="5" height="7" fill="#FFEDD5" />
            <rect x="21" y="5" width="5" height="7" fill="#FFEDD5" />
            <rect x="14" y="17" width="8" height="9" rx="1" fill="#FDE68A" />
          </svg>
        );
      case 'house-blue':
      case 'house-red':
      case 'house-green': {
        const roofFill =
          kind === 'house-blue'
            ? '#1D4ED8'
            : kind === 'house-red'
            ? '#BE123C'
            : '#047857';
        const wallFill =
          kind === 'house-blue'
            ? '#DBEAFE'
            : kind === 'house-red'
            ? '#FFE4E6'
            : '#D1FAE5';
        return (
          <svg viewBox="0 0 36 28" className="w-7 h-6 mx-auto" aria-hidden="true">
            <polygon points="5,12 18,3 31,12" fill={roofFill} />
            <rect x="8" y="12" width="20" height="14" rx="2" fill={wallFill} stroke={roofFill} strokeWidth="1.5" />
            <rect x="15" y="17" width="6" height="9" rx="1" fill={roofFill} />
          </svg>
        );
      }
      case 'bridge':
        return (
          <svg viewBox="0 0 36 28" className="w-7 h-6 mx-auto" aria-hidden="true">
            <rect x="2" y="18" width="32" height="8" rx="2" fill="#38BDF8" />
            <path d="M4 18 Q18 6 32 18" stroke="#92400E" strokeWidth="4" fill="none" />
          </svg>
        );
      case 'fountain':
        return (
          <svg viewBox="0 0 36 28" className="w-7 h-6 mx-auto" aria-hidden="true">
            <ellipse cx="18" cy="21" rx="13" ry="5" fill="#0284C7" />
            <path d="M18 20 L18 8 M18 10 Q12 12 11 18 M18 10 Q24 12 25 18" stroke="#BAE6FD" strokeWidth="2.5" fill="none" />
          </svg>
        );
      case 'tree':
        return (
          <svg viewBox="0 0 36 28" className="w-7 h-6 mx-auto" aria-hidden="true">
            <rect x="16" y="16" width="4" height="10" fill="#78350F" />
            <circle cx="18" cy="11" r="8" fill="#15803D" />
            <circle cx="13" cy="14" r="5" fill="#166534" />
            <circle cx="23" cy="14" r="5" fill="#166534" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 36 28" className="w-7 h-6 mx-auto" aria-hidden="true">
            <rect x="6" y="8" width="24" height="16" rx="3" fill="#0F766E" />
            <rect x="14" y="14" width="8" height="10" rx="2" fill="#CCFBF1" />
          </svg>
        );
    }
  };

  const renderLandmarkBadge = (landmark: StreetLandmark) => {
    const colorMap: Record<string, string> = {
      masjid: 'bg-emerald-900 text-white border-emerald-700',
      library: 'bg-amber-900 text-white border-amber-700',
      market: 'bg-orange-800 text-white border-orange-600',
      'house-blue': 'bg-blue-800 text-white border-blue-600',
      'house-red': 'bg-rose-800 text-white border-rose-600',
      'house-green': 'bg-emerald-800 text-white border-emerald-600',
      bridge: 'bg-cyan-800 text-white border-cyan-600',
      fountain: 'bg-sky-800 text-white border-sky-600',
      bench: 'bg-stone-800 text-white border-stone-600',
      tree: 'bg-green-800 text-white border-green-600',
      'rooftop-high': 'bg-indigo-800 text-white border-indigo-600',
      'courtyard-inside': 'bg-teal-800 text-white border-teal-600',
      'courtyard-outside': 'bg-slate-800 text-white border-slate-600',
    };
    return colorMap[landmark.kind] || 'bg-[#145A4A] text-white border-[#145A4A]';
  };

  const renderTravelerAvatar = () => {
    const arrowRotation =
      facing === 'up'
        ? 'rotate(0)'
        : facing === 'right'
        ? 'rotate(90)'
        : facing === 'down'
        ? 'rotate(180)'
        : 'rotate(270)';

    return (
      <div
        data-testid="street-player-avatar"
        data-pos={`${playerPos.x},${playerPos.y}`}
        className={`mt-0.5 px-2 py-0.5 rounded-full bg-[#145A4A] text-white text-[10px] font-bold inline-flex items-center gap-1 shadow-sm border border-[#FDE68A] ${
          reducedMotion ? '' : 'transition-all duration-150'
        }`}
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
          <circle cx="12" cy="7" r="4" fill="#FDE68A" />
          <path d="M6 20 C6 14, 18 14, 18 20 Z" fill="#FFFFFF" />
          <g transform={`translate(12, 12) ${arrowRotation} translate(-12, -12)`}>
            <polygon points="12,1 9,4 15,4" fill="#34D399" />
          </g>
        </svg>
        <span>{locale === 'id-ID' ? 'المُسَافِر' : 'المُسَافِر'}</span>
      </div>
    );
  };

  const targetLandmark = currentLevel.landmarks.find(
    (lm) =>
      lm.x === currentLevel.targetPos.x && lm.y === currentLevel.targetPos.y
  );

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
                    <Star
                      key={sIdx}
                      className="w-3 h-3 fill-amber-500 text-amber-500"
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Split Game Sandbox: Left = Illustrated Interactive Neighborhood, Right = Arabic Command & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Illustrated 2D Neighborhood Map */}
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
            {targetLandmark && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-300 text-xs font-semibold text-amber-950">
                <Flag className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {locale === 'id-ID' ? 'Tujuan:' : 'Destinasi:'}{' '}
                  <strong dir="rtl" lang="ar" className="font-arabic text-sm">
                    {targetLandmark.arabicLabel}
                  </strong>{' '}
                  ({targetLandmark.label[locale]})
                </span>
              </div>
            )}
          </div>

          {/* Compass & Map Legend */}
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

          {/* 5x5 Illustrated Neighborhood Board */}
          <div
            role="grid"
            aria-label="Arabic Street Explorer 2D Map"
            data-testid="street-explorer-grid"
            className="grid grid-cols-5 gap-2 sm:gap-2.5 bg-[#D8E6DF] p-3 sm:p-4 rounded-2xl border-2 border-[#145A4A]/30 shadow-inner"
          >
            {Array.from({ length: 5 }).map((_, y) =>
              Array.from({ length: 5 }).map((__, x) => {
                const isPlayerHere = playerPos.x === x && playerPos.y === y;
                const isStart =
                  currentLevel.startPos.x === x &&
                  currentLevel.startPos.y === y;
                const isTarget =
                  currentLevel.targetPos.x === x &&
                  currentLevel.targetPos.y === y;
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
                const wasVisited = visitedCoords.some(
                  (c) => c.x === x && c.y === y
                );

                return (
                  <button
                    key={`${x}-${y}`}
                    type="button"
                    disabled={isBlocked || isLevelComplete}
                    onClick={() => handleTileClick(x, y)}
                    aria-label={
                      landmark
                        ? `${landmark.arabicLabel} (${landmark.label[locale]})${
                            isTarget ? ' - Destination' : ''
                          }`
                        : isBlocked
                        ? locale === 'id-ID'
                          ? 'Taman & Tembok Pembatas'
                          : 'Taman & Tembok Sempadan'
                        : isAdjacent
                        ? locale === 'id-ID'
                          ? 'Melangkah ke Jalan Ini'
                          : 'Melangkah ke Jalan Ini'
                        : locale === 'id-ID'
                        ? 'Jalur Jalan Lingkungan'
                        : 'Laluan Jalan Kejiranan'
                    }
                    className={`relative min-h-[86px] sm:min-h-[100px] rounded-xl p-1.5 flex flex-col items-center justify-between text-center border transition-all overflow-hidden ${
                      isBlocked
                        ? 'bg-[#BCCBC4] border-[#94A89E] cursor-not-allowed'
                        : isPlayerHere
                        ? 'bg-[#FEF3C7] border-2 border-[#145A4A] shadow-md ring-2 ring-[#145A4A]/35'
                        : isTarget
                        ? 'bg-[#ECFDF5] border-2 border-[#059669] hover:bg-white cursor-pointer'
                        : isAdjacent
                        ? 'bg-[#FBF9F5] border-2 border-[#145A4A]/45 hover:bg-white cursor-pointer'
                        : wasVisited
                        ? 'bg-[#F3EFE6] border-[#145A4A]/25'
                        : 'bg-[#F7F5EF] border-[#1C2724]/12'
                    }`}
                  >
                    {/* Top Status Ribbon (Target / Waypoint / Start — no developer coordinates) */}
                    <div className="w-full flex items-center justify-center min-h-[14px]">
                      {isTarget ? (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white text-[9px] font-bold tracking-tight flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5 shrink-0" />
                          <span>{locale === 'id-ID' ? 'Tujuan' : 'Tujuan'}</span>
                        </span>
                      ) : isIntermediate && !hasPassedIntermediate ? (
                        <span className="px-1.5 py-0.5 rounded bg-[#145A4A] text-white text-[9px] font-bold">
                          {locale === 'id-ID' ? 'Titik Belok' : 'Titik Belok'}
                        </span>
                      ) : isStart && !isPlayerHere ? (
                        <span className="text-[9px] font-semibold text-[#145A4A]/80">
                          {locale === 'id-ID' ? 'Titik Mulai' : 'Titik Mula'}
                        </span>
                      ) : wasVisited && !isPlayerHere && !landmark ? (
                        <span className="text-[9px] font-semibold text-[#145A4A]/65">
                          {locale === 'id-ID' ? 'Jejak' : 'Jejak'}
                        </span>
                      ) : null}
                    </div>

                    {/* Center Visual: Obstacle Wall/Garden, Illustrated Landmark Building, or Connected Street */}
                    {isBlocked ? (
                      <div className="my-auto flex flex-col items-center gap-0.5">
                        <svg
                          viewBox="0 0 36 24"
                          className="w-7 h-5 opacity-80"
                          aria-hidden="true"
                        >
                          <rect
                            x="3"
                            y="10"
                            width="30"
                            height="12"
                            rx="2"
                            fill="#64748B"
                          />
                          <line
                            x1="3"
                            y1="16"
                            x2="33"
                            y2="16"
                            stroke="#CBD5E1"
                            strokeWidth="1.5"
                          />
                          <circle cx="12" cy="8" r="5" fill="#15803D" />
                          <circle cx="24" cy="9" r="4" fill="#166534" />
                        </svg>
                        <span className="text-[9px] font-semibold text-slate-700">
                          {locale === 'id-ID' ? 'Pagar Taman' : 'Pagar Taman'}
                        </span>
                      </div>
                    ) : landmark ? (
                      <div
                        className={`w-full rounded-lg px-1 py-1 border text-center ${renderLandmarkBadge(
                          landmark
                        )}`}
                      >
                        {renderBuildingSvg(landmark.kind)}
                        <div
                          dir="rtl"
                          lang="ar"
                          className="font-arabic text-xs sm:text-sm font-bold leading-tight mt-0.5"
                        >
                          {landmark.arabicLabel}
                        </div>
                        <div className="text-[9px] opacity-95 truncate">
                          {landmark.label[locale]}
                        </div>
                      </div>
                    ) : (
                      <div className="my-auto flex flex-col items-center justify-center">
                        {isAdjacent && !isLevelComplete ? (
                          <span className="px-2 py-0.5 rounded-md bg-[#DDEBE3] text-[#145A4A] text-[10px] font-bold">
                            {locale === 'id-ID' ? 'Melangkah' : 'Melangkah'}
                          </span>
                        ) : wasVisited && !isPlayerHere ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#145A4A]/45" />
                        ) : (
                          <div className="w-6 h-1 rounded-full bg-[#1C2724]/15" />
                        )}
                      </div>
                    )}

                    {/* Traveler Avatar */}
                    {isPlayerHere && renderTravelerAvatar()}
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
                  {locale === 'id-ID'
                    ? 'Bantuan Pelafalan Instruksi'
                    : 'Bantuan Sebutan Arahan'}
                </span>
              </button>
            </div>

            {currentLevel.listenOnlyMode && !revealListenText ? (
              <div className="p-5 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/12 text-center space-y-3">
                <p className="text-xs sm:text-sm text-[#1C2724]/80 font-medium">
                  {locale === 'id-ID'
                    ? 'Mode Dengar & Bertindak: Klik "Bantuan Pelafalan Instruksi" di atas untuk mendengar perintah arah bahasa Arab.'
                    : 'Mod Dengar & Bertindak: Klik "Bantuan Sebutan Arahan" di atas untuk mendengar arahan arah bahasa Arab.'}
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
                    ? 'Status Audio: Bantuan pelafalan sintetis perangkat (TTS Bahasa Arab — bukan rekaman tilawah).'
                    : 'Status Audio: Bantuan sebutan sintetik peranti (TTS Bahasa Arab — bukan rakaman tilawah).'
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
                  ? 'Kendali Langkah (Tombol / Keyboard WASD / Klik Jalan)'
                  : 'Kawalan Langkah (Butang / Papan Kekunci WASD / Klik Jalan)'}
              </span>
              <button
                type="button"
                onClick={() => resetLevel(activeLevelIdx)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#145A4A] hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  {locale === 'id-ID' ? 'Ulangi dari Awal' : 'Ulang dari Mula'}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto">
              <div />
              <button
                type="button"
                disabled={isLevelComplete || isPaused}
                onClick={() => handleMove('up')}
                aria-label="Move Forward Amama"
                className="p-3 rounded-xl bg-[#F7F5EF] hover:bg-[#DDEBE3] disabled:opacity-45 border border-[#1C2724]/15 flex flex-col items-center justify-center gap-0.5 transition-colors"
              >
                <ArrowUp className="w-4 h-4 text-[#145A4A]" />
                <span
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-base font-bold text-[#145A4A]"
                >
                  أَمَامَ
                </span>
                <span className="text-[10px] text-[#1C2724]/70">
                  {locale === 'id-ID' ? 'Depan' : 'Hadapan'}
                </span>
              </button>
              <div />

              <button
                type="button"
                disabled={isLevelComplete || isPaused}
                onClick={() => handleMove('left')}
                aria-label="Move Left Yasaran"
                className="p-3 rounded-xl bg-[#F7F5EF] hover:bg-[#DDEBE3] disabled:opacity-45 border border-[#1C2724]/15 flex flex-col items-center justify-center gap-0.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-[#145A4A]" />
                <span
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-base font-bold text-[#145A4A]"
                >
                  يَسَارًا
                </span>
                <span className="text-[10px] text-[#1C2724]/70">
                  {locale === 'id-ID' ? 'Kiri' : 'Kiri'}
                </span>
              </button>

              <div className="p-2 rounded-xl bg-[#145A4A]/8 border border-[#145A4A]/20 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-semibold text-[#145A4A]">
                  {locale === 'id-ID' ? 'Langkah' : 'Langkah'}
                </span>
                <span
                  data-testid="street-step-count"
                  className="text-sm font-bold text-[#1C2724] tabular-nums"
                >
                  {stepHistory.length}
                </span>
              </div>

              <button
                type="button"
                disabled={isLevelComplete || isPaused}
                onClick={() => handleMove('right')}
                aria-label="Move Right Yaminan"
                className="p-3 rounded-xl bg-[#F7F5EF] hover:bg-[#DDEBE3] disabled:opacity-45 border border-[#1C2724]/15 flex flex-col items-center justify-center gap-0.5 transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-[#145A4A]" />
                <span
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-base font-bold text-[#145A4A]"
                >
                  يَمِينًا
                </span>
                <span className="text-[10px] text-[#1C2724]/70">
                  {locale === 'id-ID' ? 'Kanan' : 'Kanan'}
                </span>
              </button>

              <div />
              <button
                type="button"
                disabled={isLevelComplete || isPaused}
                onClick={() => handleMove('down')}
                aria-label="Move Backward Khalfa"
                className="p-3 rounded-xl bg-[#F7F5EF] hover:bg-[#DDEBE3] disabled:opacity-45 border border-[#1C2724]/15 flex flex-col items-center justify-center gap-0.5 transition-colors"
              >
                <ArrowDown className="w-4 h-4 text-[#145A4A]" />
                <span
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-base font-bold text-[#145A4A]"
                >
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
                  <button
                    type="button"
                    onClick={() => resetLevel(activeLevelIdx)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-950 text-xs font-semibold hover:bg-emerald-100"
                  >
                    {locale === 'id-ID'
                      ? 'Main Ulang Level Ini'
                      : 'Main Semula Tahap Ini'}
                  </button>
                  {activeLevelIdx < STREET_EXPLORER_LEVELS.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveLevelIdx((prev) => prev + 1)}
                      className="px-4 py-2 rounded-xl bg-[#145A4A] text-white text-xs font-semibold hover:bg-[#10483B] inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {locale === 'id-ID'
                          ? `Lanjut ke Level ${currentLevel.levelNumber + 1} →`
                          : `Teruskan ke Tahap ${currentLevel.levelNumber + 1} →`}
                      </span>
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
