import React, { useState } from 'react';
import { LocaleCode } from '../../types/learning';
import { SCENE_LAB_STAGES, SceneLabStage } from '../../data/worldData';
import { evaluateSceneLabAttempt } from '../../utils/worldEngine';
import { audioController } from '../../utils/audioPlayer';
import {
  CheckCircle2,
  AlertCircle,
  Volume2,
  Sparkles,
  RotateCcw,
  Star,
} from 'lucide-react';

interface SceneLabGameProps {
  locale: LocaleCode;
  showTransliteration: boolean;
  completedLevels: Record<string, { stars: number }>;
  onRecordAttempt: (
    levelNumber: number,
    wordIds: string[],
    mistakesCount: number,
    arabicPrompt: string,
    didPass: boolean,
    diagnosticCategory?: 'spatial' | 'comprehension',
    feedbackText?: string
  ) => void;
}

export const SceneLabGame: React.FC<SceneLabGameProps> = ({
  locale,
  showTransliteration,
  completedLevels,
  onRecordAttempt,
}) => {
  const [stageIdx, setStageIdx] = useState<number>(0);
  const currentStage = SCENE_LAB_STAGES[stageIdx] || SCENE_LAB_STAGES[0];

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mistakesCount, setMistakesCount] = useState<number>(0);
  const [evaluation, setEvaluation] = useState<{
    isCorrect: boolean;
    text: string;
  } | null>(null);

  const handleSelectStage = (idx: number) => {
    setStageIdx(idx);
    setSelectedId(null);
    setMistakesCount(0);
    setEvaluation(null);
  };

  const handleSubmitSelection = (id: string) => {
    setSelectedId(id);
    const res = evaluateSceneLabAttempt(currentStage, id);
    setEvaluation({
      isCorrect: res.isCorrect,
      text: res.feedback[locale],
    });

    if (res.isCorrect) {
      onRecordAttempt(
        currentStage.stageNumber,
        currentStage.focusWordIds,
        mistakesCount,
        currentStage.targetArabicSentence,
        true
      );
    } else {
      const nextMistakes = mistakesCount + 1;
      setMistakesCount(nextMistakes);
      onRecordAttempt(
        currentStage.stageNumber,
        currentStage.focusWordIds,
        nextMistakes,
        currentStage.targetArabicSentence,
        false,
        'spatial',
        res.feedback[locale]
      );
    }
  };

  const renderVisualSceneSvg = (stage: SceneLabStage) => {
    switch (stage.sceneVisualId) {
      case 'book-under-table':
        return (
          <svg
            viewBox="0 0 420 240"
            className="w-full h-56 sm:h-64 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/12"
            role="img"
            aria-label="Visual scene showing a wooden table with a green book underneath it"
          >
            {/* Floor */}
            <rect x="0" y="190" width="420" height="50" fill="#DDEBE3" />
            {/* Wooden Table (الطَّاوِلَة) */}
            <rect x="90" y="95" width="240" height="16" rx="4" fill="#8B5A2B" />
            <rect x="110" y="111" width="14" height="85" fill="#6E4720" />
            <rect x="296" y="111" width="14" height="85" fill="#6E4720" />
            {/* Cup on left of table, label clearly separated on right */}
            <rect x="130" y="70" width="24" height="25" rx="4" fill="#D97706" />
            <text x="235" y="82" textAnchor="middle" fill="#1C2724" fontSize="14" fontWeight="bold">
              الطَّاوِلَةُ (Meja)
            </text>
            {/* Green Book UNDER the table (الْكِتَابُ الْأَخْضَرُ تَحْتَ الطَّاوِلَةِ) */}
            <g transform="translate(170, 158)">
              <rect x="0" y="0" width="80" height="24" rx="4" fill="#15803D" stroke="#052E16" strokeWidth="2" />
              <rect x="6" y="4" width="68" height="5" fill="#DCFCE7" />
              <text x="40" y="-8" textAnchor="middle" fill="#145A4A" fontSize="14" fontWeight="bold">
                الْكِتَابُ الْأَخْضَرُ (تَحْتَ)
              </text>
            </g>
          </svg>
        );

      case 'boy-reading-near-window':
        return (
          <svg
            viewBox="0 0 420 240"
            className="w-full h-56 sm:h-64 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/12"
            role="img"
            aria-label="Visual scene showing a boy reading a book beside a window"
          >
            <rect x="0" y="195" width="420" height="45" fill="#DDEBE3" />
            {/* Window (النَّافِذَة) */}
            <rect x="260" y="35" width="100" height="110" rx="6" fill="#BAE6FD" stroke="#145A4A" strokeWidth="4" />
            <line x1="310" y1="35" x2="310" y2="145" stroke="#145A4A" strokeWidth="3" />
            <line x1="260" y1="90" x2="360" y2="90" stroke="#145A4A" strokeWidth="3" />
            <text x="310" y="25" textAnchor="middle" fill="#145A4A" fontSize="13" fontWeight="bold">
              النَّافِذَةُ (Jendela)
            </text>
            {/* Boy reading book beside the window */}
            <circle cx="155" cy="95" r="22" fill="#D8A75B" />
            <rect x="130" y="120" width="50" height="65" rx="10" fill="#145A4A" />
            {/* Open Book in hands */}
            <path d="M165 125 L205 115 L205 155 L165 165 Z" fill="#FFFFFF" stroke="#1C2724" strokeWidth="2" />
            <path d="M165 125 L125 115 L125 155 L165 165 Z" fill="#F8FAFC" stroke="#1C2724" strokeWidth="2" />
            <text x="165" y="185" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
              يَقْرَأُ الْكِتَابَ
            </text>
            <text x="220" y="175" textAnchor="middle" fill="#145A4A" fontSize="13" fontWeight="bold">
              بِجَانِبِ (Di samping)
            </text>
          </svg>
        );

      case 'two-birds-above-tree':
        return (
          <svg
            viewBox="0 0 420 240"
            className="w-full h-56 sm:h-64 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/12"
            role="img"
            aria-label="Visual scene showing two birds flying above a green tree"
          >
            <rect x="0" y="200" width="420" height="40" fill="#DDEBE3" />
            {/* Tree (الشَّجَرَة) */}
            <rect x="195" y="135" width="30" height="65" fill="#78350F" />
            <circle cx="210" cy="115" r="46" fill="#15803D" />
            <circle cx="178" cy="128" r="32" fill="#166534" />
            <circle cx="242" cy="128" r="32" fill="#166534" />
            <text x="210" y="120" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold">
              الشَّجَرَةُ
            </text>
            {/* Two birds (عُصْفُورَانِ) flying ABOVE (فَوْقَ) the tree */}
            <g transform="translate(155, 38)">
              <ellipse cx="20" cy="12" rx="16" ry="9" fill="#0284C7" />
              <polygon points="36,12 45,8 45,16" fill="#F59E0B" />
              <path d="M12 6 Q20 -8 28 6" stroke="#0369A1" strokeWidth="3" fill="none" />
            </g>
            <g transform="translate(235, 38)">
              <ellipse cx="20" cy="12" rx="16" ry="9" fill="#0284C7" />
              <polygon points="36,12 45,8 45,16" fill="#F59E0B" />
              <path d="M12 6 Q20 -8 28 6" stroke="#0369A1" strokeWidth="3" fill="none" />
            </g>
            <text x="210" y="25" textAnchor="middle" fill="#145A4A" fontSize="14" fontWeight="bold">
              عُصْفُورَانِ (٢) فَوْقَ الشَّجَرَةِ
            </text>
          </svg>
        );

      case 'cat-between-chairs':
        return (
          <svg
            viewBox="0 0 420 240"
            className="w-full h-56 sm:h-64 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/12"
            role="img"
            aria-label="Visual scene showing a cat sitting between two chairs with a lamp hanging above it"
          >
            <rect x="0" y="195" width="420" height="45" fill="#DDEBE3" />
            {/* Hanging Lamp ABOVE (الْمِصْبَاحُ فَوْقَهَا) */}
            <line x1="210" y1="0" x2="210" y2="42" stroke="#1C2724" strokeWidth="3" />
            <polygon points="185,42 235,42 248,66 172,66" fill="#F59E0B" />
            <text x="210" y="84" textAnchor="middle" fill="#B45309" fontSize="13" fontWeight="bold">
              الْمِصْبَاحُ (فَوْقَهَا)
            </text>
            {/* Left Chair */}
            <rect x="70" y="110" width="55" height="85" rx="6" fill="#8B5A2B" />
            <text x="97" y="155" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
              كُرْسِيٌّ ١
            </text>
            {/* Right Chair */}
            <rect x="295" y="110" width="55" height="85" rx="6" fill="#8B5A2B" />
            <text x="322" y="155" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
              كُرْسِيٌّ ٢
            </text>
            {/* Cat BETWEEN the two chairs (الْقِطَّةُ بَيْنَ الْكُرْسِيَّيْنِ) */}
            <circle cx="210" cy="148" r="18" fill="#145A4A" />
            <ellipse cx="210" cy="176" rx="22" ry="18" fill="#145A4A" />
            <text x="210" y="218" textAnchor="middle" fill="#145A4A" fontSize="14" fontWeight="bold">
              الْقِطَّةُ بَيْنَ الْكُرْسِيَّيْنِ
            </text>
          </svg>
        );

      case 'interactive-room-placement':
      default:
        return (
          <svg
            viewBox="0 0 420 240"
            className="w-full h-56 sm:h-64 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/12"
            role="img"
            aria-label="Interactive room with four placement zones: on table, under table beside box, on chair, or inside box"
          >
            <rect x="0" y="195" width="420" height="45" fill="#DDEBE3" />
            {/* Table */}
            <rect x="70" y="95" width="180" height="14" fill="#8B5A2B" />
            <rect x="85" y="109" width="12" height="86" fill="#6E4720" />
            <rect x="225" y="109" width="12" height="86" fill="#6E4720" />
            {/* Zone 1: Above Table */}
            <rect
              x="115"
              y="52"
              width="90"
              height="36"
              rx="6"
              fill={selectedId === 'fawqa-table' ? '#145A4A' : '#FFFFFF'}
              stroke="#145A4A"
              strokeDasharray="4 2"
              strokeWidth="2"
            />
            <text
              x="160"
              y="74"
              textAnchor="middle"
              fill={selectedId === 'fawqa-table' ? '#FFFFFF' : '#145A4A'}
              fontSize="12"
              fontWeight="bold"
            >
              ١. فَوْقَ الطَّاوِلَةِ
            </text>
            {/* Zone 2: Under Table beside Box (TARGET) */}
            <rect
              x="105"
              y="145"
              width="110"
              height="40"
              rx="6"
              fill={selectedId === 'tahta-table' ? '#15803D' : '#FFFFFF'}
              stroke="#15803D"
              strokeDasharray="4 2"
              strokeWidth="2"
            />
            <text
              x="160"
              y="169"
              textAnchor="middle"
              fill={selectedId === 'tahta-table' ? '#FFFFFF' : '#15803D'}
              fontSize="12"
              fontWeight="bold"
            >
              ٢. تَحْتَ الطَّاوِلَةِ
            </text>
            {/* Box beside under-table zone */}
            <rect x="275" y="135" width="95" height="60" rx="6" fill="#B45309" />
            <text x="322" y="168" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
              الصُّنْدُوقُ ( دَاخِلَ )
            </text>
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Stage Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {SCENE_LAB_STAGES.map((stg, idx) => {
          const done = completedLevels[`scene-lab:${stg.stageNumber}`];
          const isCurrent = idx === stageIdx;
          return (
            <button
              key={stg.stageNumber}
              type="button"
              onClick={() => handleSelectStage(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-[#145A4A] text-white border-[#145A4A]'
                  : done
                  ? 'bg-[#DDEBE3] text-[#145A4A] border-[#145A4A]/25'
                  : 'bg-white text-[#1C2724]/80 border-[#1C2724]/15 hover:bg-[#F7F5EF]'
              }`}
            >
              <span>
                {locale === 'id-ID' ? 'Tahap' : 'Tahap'} {stg.stageNumber}
              </span>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 Cols: Visual Scene Canvas */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#1C2724]/12 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1C2724]">
              {currentStage.title[locale]}
            </h3>
            <button
              type="button"
              onClick={() =>
                audioController.playVerifiedOrFallback({
                  arabicText: currentStage.targetArabicSentence,
                })
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DDEBE3] text-[#145A4A] text-xs font-semibold hover:bg-[#cde0d5]"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{locale === 'id-ID' ? 'Dengar Kalimat' : 'Dengar Ayat'}</span>
            </button>
          </div>

          {renderVisualSceneSvg(currentStage)}

          <p className="text-xs sm:text-sm text-[#1C2724]/80 leading-relaxed">
            {currentStage.promptQuestion[locale]}
          </p>
        </div>

        {/* Right 6 Cols: Interactive Sentence Evaluation or Object Placement */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#1C2724]/12 space-y-4">
          {currentStage.mode === 'place-object-in-scene' &&
          currentStage.placementZones ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#145A4A]/20 text-center space-y-1.5">
                <div
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl sm:text-3xl font-bold text-[#145A4A]"
                >
                  {currentStage.targetArabicSentence}
                </div>
                {showTransliteration && (
                  <div className="text-xs text-[#1C2724]/70 italic">
                    {currentStage.targetTransliteration}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentStage.placementZones.map((zone) => (
                  <button
                    key={zone.zoneId}
                    type="button"
                    onClick={() => handleSubmitSelection(zone.zoneId)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedId === zone.zoneId
                        ? zone.isCorrectZone
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-amber-50 border-amber-500 text-amber-950'
                        : 'bg-[#F7F5EF] hover:bg-[#DDEBE3]/60 border-[#1C2724]/15'
                    }`}
                  >
                    <div
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-xl font-bold text-[#145A4A]"
                    >
                      {zone.arabicZoneLabel}
                    </div>
                    <div className="text-xs font-semibold text-[#1C2724] mt-1">
                      {zone.label[locale]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {currentStage.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSubmitSelection(opt.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all space-y-1.5 ${
                    selectedId === opt.id
                      ? opt.isCorrect
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'bg-amber-50 border-amber-500'
                      : 'bg-[#F7F5EF] hover:bg-[#DDEBE3]/50 border-[#1C2724]/12'
                  }`}
                >
                  <div
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-2xl font-bold text-[#145A4A] text-right"
                  >
                    {opt.arabic}
                  </div>
                  {showTransliteration && (
                    <div className="text-xs text-[#1C2724]/70 italic">
                      {opt.transliteration}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {evaluation && (
            <div
              role="status"
              className={`p-4 rounded-xl border space-y-3 ${
                evaluation.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {evaluation.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-[#1E7A57] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                )}
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {evaluation.text}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(null);
                    setEvaluation(null);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C2724]/75 hover:text-[#1C2724]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{locale === 'id-ID' ? 'Coba Lagi' : 'Cuba Lagi'}</span>
                </button>

                {evaluation.isCorrect &&
                  stageIdx < SCENE_LAB_STAGES.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleSelectStage(stageIdx + 1)}
                      className="px-4 py-2 rounded-xl bg-[#145A4A] text-white text-xs font-semibold hover:bg-[#10483B] inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {locale === 'id-ID'
                          ? `Lanjut ke Tahap ${currentStage.stageNumber + 1} →`
                          : `Teruskan ke Tahap ${currentStage.stageNumber + 1} →`}
                      </span>
                    </button>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
