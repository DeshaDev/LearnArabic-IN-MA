import React, { useState } from 'react';
import { AudioPlaybackMode, LocaleCode } from '../../types/learning';
import {
  LOST_MESSAGE_CHAPTERS,
  QURANIC_DISCOVERY_PASSAGES,
  SENTENCE_BRIDGE_CHALLENGES,
  WORD_DETECTIVE_CASES,
} from '../../data/worldData';
import { evaluateSentenceBridge } from '../../utils/worldEngine';
import { audioController } from '../../utils/audioPlayer';
import {
  Volume2,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ExternalLink,
  Search,
  ShieldCheck,
  Star,
  ScrollText,
} from 'lucide-react';

// ============================================================================
// GAME 4: THE SENTENCE BRIDGE
// ============================================================================
interface SentenceBridgeProps {
  locale: LocaleCode;
  showTransliteration: boolean;
  completedLevels: Record<string, { stars: number }>;
  onRecordAttempt: (
    levelNumber: number,
    wordIds: string[],
    mistakesCount: number,
    arabicPrompt: string,
    didPass: boolean,
    diagnosticCategory?: 'word-order',
    feedbackText?: string
  ) => void;
}

export const SentenceBridgeGame: React.FC<SentenceBridgeProps> = ({
  locale,
  showTransliteration,
  completedLevels,
  onRecordAttempt,
}) => {
  const [idx, setIdx] = useState<number>(0);
  const challenge =
    SENTENCE_BRIDGE_CHALLENGES[idx] || SENTENCE_BRIDGE_CHALLENGES[0];

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [evaluation, setEvaluation] = useState<{
    isCorrect: boolean;
    text: string;
  } | null>(null);

  const isBridgeSolved = evaluation?.isCorrect === true;

  const handleSelectChallenge = (newIdx: number) => {
    setIdx(newIdx);
    setSelectedIds([]);
    setMistakes(0);
    setEvaluation(null);
  };

  const handleResetCurrentBridge = () => {
    setSelectedIds([]);
    setMistakes(0);
    setEvaluation(null);
  };

  const handleAddTile = (tileId: string) => {
    if (isBridgeSolved) return;
    if (selectedIds.includes(tileId)) return;
    setEvaluation(null);
    setSelectedIds((prev) => [...prev, tileId]);
  };

  const handleRemoveTile = (tileId: string) => {
    if (isBridgeSolved) return;
    setEvaluation(null);
    setSelectedIds((prev) => prev.filter((id) => id !== tileId));
  };

  const handleCheckBridge = () => {
    if (isBridgeSolved) return;
    const res = evaluateSentenceBridge(challenge, selectedIds);
    setEvaluation({ isCorrect: res.isCorrect, text: res.feedback[locale] });

    if (res.isCorrect) {
      onRecordAttempt(
        challenge.levelNumber,
        challenge.focusWordIds,
        mistakes,
        challenge.availableTiles.map((t) => t.arabic).join(' '),
        true
      );
    } else {
      const nextMistakes = mistakes + 1;
      setMistakes(nextMistakes);
      onRecordAttempt(
        challenge.levelNumber,
        challenge.focusWordIds,
        nextMistakes,
        challenge.availableTiles.map((t) => t.arabic).join(' '),
        false,
        'word-order',
        res.feedback[locale]
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {SENTENCE_BRIDGE_CHALLENGES.map((ch, i) => {
          const done = completedLevels[`sentence-bridge:${ch.levelNumber}`];
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => handleSelectChallenge(i)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                i === idx
                  ? 'bg-[#145A4A] text-white border-[#145A4A]'
                  : done
                  ? 'bg-[#DDEBE3] text-[#145A4A] border-[#145A4A]/25'
                  : 'bg-white text-[#1C2724]/80 border-[#1C2724]/15'
              }`}
            >
              <span>
                {locale === 'id-ID' ? 'Jembatan' : 'Jambatan'} {ch.levelNumber}
              </span>
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

      <div className="bg-white rounded-2xl p-6 border border-[#1C2724]/12 space-y-5">
        <div>
          <span className="text-xs font-semibold text-[#145A4A]">
            {challenge.title[locale]}
          </span>
          <h3 className="text-lg font-bold text-[#1C2724] mt-1">
            {locale === 'id-ID'
              ? 'Susun Kepingan Kata untuk Menyambungkan Jembatan Makna:'
              : 'Susun Kepingan Perkataan untuk Menyambungkan Jambatan Makna:'}{' '}
            <span className="text-[#145A4A]">
              {challenge.targetMeaning[locale]}
            </span>
          </h3>
        </div>

        {/* Visual River & Bridge Planks */}
        <div
          dir="rtl"
          className="min-h-[110px] p-5 rounded-2xl bg-gradient-to-b from-[#E0F2FE] to-[#BAE6FD] border-2 border-[#0284C7]/30 flex flex-wrap items-center justify-center gap-3"
        >
          {selectedIds.length === 0 ? (
            <span dir="ltr" className="text-xs font-semibold text-sky-900">
              {locale === 'id-ID'
                ? 'Klik kepingan kata di bawah dari kanan ke kiri untuk membangun papan jembatan...'
                : 'Klik kepingan perkataan di bawah dari kanan ke kiri untuk membina papan jambatan...'}
            </span>
          ) : (
            selectedIds.map((tId, pos) => {
              const tile = challenge.availableTiles.find((t) => t.id === tId);
              if (!tile) return null;
              return (
                <button
                  key={tId}
                  type="button"
                  disabled={isBridgeSolved}
                  onClick={() => handleRemoveTile(tId)}
                  className={`px-4 py-3 rounded-xl bg-amber-900 text-white border-2 border-amber-700 shadow-sm transition-all text-center ${
                    isBridgeSolved
                      ? 'cursor-default'
                      : 'hover:bg-amber-800 cursor-pointer'
                  }`}
                >
                  <div className="text-[10px] text-amber-200">
                    #{pos + 1}{' '}
                    {!isBridgeSolved &&
                      `(${
                        locale === 'id-ID'
                          ? 'Klik untuk lepas'
                          : 'Klik untuk tanggal'
                      })`}
                  </div>
                  <div
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-2xl font-bold"
                  >
                    {tile.arabic}
                  </div>
                  {showTransliteration && (
                    <div className="text-[11px] text-amber-100">
                      {tile.transliteration}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Available Word Tiles */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1C2724]/75">
              {locale === 'id-ID'
                ? 'Kepingan Kata yang Tersedia:'
                : 'Kepingan Perkataan yang Tersedia:'}
            </span>
            <button
              type="button"
              onClick={handleResetCurrentBridge}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#145A4A] hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{locale === 'id-ID' ? 'Susun Ulang' : 'Susun Semula'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {challenge.availableTiles.map((tile) => {
              const isUsed = selectedIds.includes(tile.id);
              return (
                <button
                  key={tile.id}
                  type="button"
                  disabled={isUsed || isBridgeSolved}
                  onClick={() => handleAddTile(tile.id)}
                  className={`px-4 py-3 rounded-xl border text-center transition-all ${
                    isUsed || isBridgeSolved
                      ? 'bg-slate-100 border-slate-200 opacity-40 cursor-not-allowed'
                      : 'bg-[#F7F5EF] hover:bg-[#DDEBE3] border-[#145A4A]/30 cursor-pointer'
                  }`}
                >
                  <div
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-2xl font-bold text-[#145A4A]"
                  >
                    {tile.arabic}
                  </div>
                  <div className="text-xs font-semibold text-[#1C2724] mt-0.5">
                    {tile.roleHint[locale]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={isBridgeSolved || selectedIds.length === 0}
            onClick={handleCheckBridge}
            className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              isBridgeSolved
                ? 'bg-emerald-700 text-white cursor-default'
                : selectedIds.length === 0
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : 'bg-[#145A4A] text-white hover:bg-[#10483B]'
            }`}
          >
            {isBridgeSolved
              ? locale === 'id-ID'
                ? '✓ Jembatan Kalimat Kokoh'
                : '✓ Jambatan Ayat Kukuh'
              : locale === 'id-ID'
              ? 'Uji Kekuatan Jembatan Kalimat'
              : 'Uji Kekukuhan Jambatan Ayat'}
          </button>

          {isBridgeSolved && (
            <button
              type="button"
              onClick={handleResetCurrentBridge}
              className="px-4 py-3 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/15 text-xs font-semibold text-[#1C2724] hover:bg-[#DDEBE3]/60 inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>
                {locale === 'id-ID' ? 'Ulangi Jembatan' : 'Ulangi Jambatan'}
              </span>
            </button>
          )}
        </div>

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
            {evaluation.isCorrect &&
              idx < SENTENCE_BRIDGE_CHALLENGES.length - 1 && (
                <div className="pt-2 border-t border-emerald-200 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSelectChallenge(idx + 1)}
                    className="px-4 py-2 rounded-xl bg-[#145A4A] text-white text-xs font-semibold hover:bg-[#10483B]"
                  >
                    {locale === 'id-ID'
                      ? `Lanjut ke Jembatan ${challenge.levelNumber + 1} →`
                      : `Teruskan ke Jambatan ${challenge.levelNumber + 1} →`}
                  </button>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// GAME 5: THE LOST MESSAGE (BRANCHING STORY QUEST WITH NARRATIVE MEMORY)
// ============================================================================
interface LostMessageProps {
  locale: LocaleCode;
  showTransliteration: boolean;
  completedLevels: Record<string, { stars: number }>;
  onRecordAttempt: (
    levelNumber: number,
    wordIds: string[],
    mistakesCount: number,
    arabicPrompt: string,
    didPass: boolean,
    diagnosticCategory?: 'comprehension',
    feedbackText?: string
  ) => void;
}

export const LostMessageGame: React.FC<LostMessageProps> = ({
  locale,
  showTransliteration,
  completedLevels,
  onRecordAttempt,
}) => {
  const [chapterIdx, setChapterIdx] = useState<number>(0);
  const chapter =
    LOST_MESSAGE_CHAPTERS[chapterIdx] || LOST_MESSAGE_CHAPTERS[0];

  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState<number>(0);
  const [storyLog, setStoryLog] = useState<
    Record<
      number,
      {
        npcName: string;
        arabicChoice: string;
        consequence: string;
      }
    >
  >({});

  const selectedChoice = chapter.choices.find(
    (c) => c.id === selectedChoiceId
  );
  const isChapterSolved = selectedChoice?.isCorrect === true;

  const handleChoose = (choiceId: string) => {
    if (isChapterSolved) return;
    setSelectedChoiceId(choiceId);
    const ch = chapter.choices.find((c) => c.id === choiceId);
    if (!ch) return;

    if (ch.isCorrect) {
      setStoryLog((prev) => ({
        ...prev,
        [chapter.chapterNumber]: {
          npcName: chapter.npcName[locale],
          arabicChoice: ch.arabicChoice,
          consequence: ch.consequenceStory[locale],
        },
      }));
      onRecordAttempt(
        chapter.chapterNumber,
        chapter.focusWordIds,
        mistakes,
        chapter.arabicDialogue,
        true
      );
    } else {
      const nextMistakes = mistakes + 1;
      setMistakes(nextMistakes);
      onRecordAttempt(
        chapter.chapterNumber,
        chapter.focusWordIds,
        nextMistakes,
        chapter.arabicDialogue,
        false,
        'comprehension',
        ch.consequenceStory[locale]
      );
    }
  };

  const priorClues = Object.entries(storyLog)
    .filter(([chNum]) => Number(chNum) < chapter.chapterNumber)
    .sort(([a], [b]) => Number(a) - Number(b));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {LOST_MESSAGE_CHAPTERS.map((ch, i) => {
          const done = completedLevels[`lost-message:${ch.chapterNumber}`];
          return (
            <button
              key={ch.chapterNumber}
              type="button"
              onClick={() => {
                setChapterIdx(i);
                setSelectedChoiceId(null);
                setMistakes(0);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                i === chapterIdx
                  ? 'bg-[#145A4A] text-white border-[#145A4A]'
                  : done
                  ? 'bg-[#DDEBE3] text-[#145A4A] border-[#145A4A]/25'
                  : 'bg-white text-[#1C2724]/80 border-[#1C2724]/15'
              }`}
            >
              <span>Bab {ch.chapterNumber}</span>
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

      {/* Narrative Continuity Log from Earlier Chapters */}
      {priorClues.length > 0 && (
        <div className="bg-[#F7F5EF] rounded-2xl p-4 border border-[#145A4A]/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#145A4A]">
            <ScrollText className="w-4 h-4" />
            <span>
              {locale === 'id-ID'
                ? 'Jejak Keputusan & Petunjuk Surat Sebelumnya:'
                : 'Jejak Keputusan & Petunjuk Surat Sebelumnya:'}
            </span>
          </div>
          <div className="space-y-1.5">
            {priorClues.map(([chNum, entry]) => (
              <div
                key={chNum}
                className="text-xs text-[#1C2724]/85 bg-white p-2.5 rounded-xl border border-[#1C2724]/8 flex flex-wrap items-center justify-between gap-2"
              >
                <div>
                  <span className="font-semibold text-[#145A4A]">
                    Bab {chNum} ({entry.npcName}):
                  </span>{' '}
                  <span>{entry.consequence}</span>
                </div>
                <span
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-base font-bold text-[#145A4A]"
                >
                  {entry.arabicChoice}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 border border-[#1C2724]/12 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-[#145A4A]">
              {chapter.locationName[locale]}
            </span>
            <h3 className="text-lg font-bold text-[#1C2724] mt-0.5">
              {chapter.npcName[locale]}
            </h3>
          </div>
          <button
            type="button"
            onClick={() =>
              audioController.playVerifiedOrFallback({
                arabicText: chapter.arabicDialogue,
                allowSyntheticFallback: true,
              })
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DDEBE3] text-[#145A4A] text-xs font-semibold"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>
              {locale === 'id-ID'
                ? 'Bantuan Pelafalan Dialog'
                : 'Bantuan Sebutan Dialog'}
            </span>
          </button>
        </div>

        <div className="p-5 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 space-y-2">
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-2xl sm:text-3xl text-[#145A4A] font-bold leading-relaxed text-right"
          >
            {chapter.arabicDialogue}
          </p>
          {showTransliteration && (
            <p className="text-xs text-[#1C2724]/70 italic">
              {chapter.transliterationDialogue}
            </p>
          )}
          <p className="text-xs sm:text-sm text-[#1C2724]/85 pt-2 border-t border-[#1C2724]/10">
            {chapter.dialogueMeaning[locale]}
          </p>
        </div>

        <div className="text-xs text-[#145A4A] bg-[#DDEBE3]/50 p-3.5 rounded-xl border border-[#145A4A]/20">
          <span className="font-bold">
            {locale === 'id-ID' ? 'Petunjuk Bahasa: ' : 'Petunjuk Bahasa: '}
          </span>
          {chapter.clueNote[locale]}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1C2724]">
              {locale === 'id-ID'
                ? 'Pilih Tindakan / Jawaban Bahasa Arab Anda:'
                : 'Pilih Tindakan / Jawapan Bahasa Arab Anda:'}
            </span>
            {isChapterSolved && (
              <button
                type="button"
                onClick={() => {
                  setSelectedChoiceId(null);
                  setMistakes(0);
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#145A4A] hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  {locale === 'id-ID' ? 'Ulangi Bab Ini' : 'Ulangi Bab Ini'}
                </span>
              </button>
            )}
          </div>
          {chapter.choices.map((ch) => (
            <button
              key={ch.id}
              type="button"
              disabled={isChapterSolved}
              onClick={() => handleChoose(ch.id)}
              className={`w-full p-4 rounded-xl border text-left transition-all space-y-1 ${
                selectedChoiceId === ch.id
                  ? ch.isCorrect
                    ? 'bg-emerald-50 border-emerald-500'
                    : 'bg-amber-50 border-amber-500'
                  : isChapterSolved
                  ? 'bg-slate-50 border-slate-200 opacity-60 cursor-default'
                  : 'bg-[#F7F5EF] hover:bg-[#DDEBE3]/60 border-[#1C2724]/15 cursor-pointer'
              }`}
            >
              <div
                dir="rtl"
                lang="ar"
                className="font-arabic text-xl sm:text-2xl font-bold text-[#145A4A] text-right"
              >
                {ch.arabicChoice}
              </div>
              {showTransliteration && (
                <div className="text-xs text-[#1C2724]/70 italic">
                  {ch.transliterationChoice}
                </div>
              )}
              <div className="text-xs text-[#1C2724]/80 font-medium">
                {ch.meaning[locale]}
              </div>
            </button>
          ))}
        </div>

        {selectedChoice && (
          <div
            role="status"
            className={`p-4 rounded-xl border space-y-3 ${
              selectedChoice.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <p className="text-xs sm:text-sm font-medium">
              {selectedChoice.consequenceStory[locale]}
            </p>
            {selectedChoice.isCorrect &&
              chapterIdx < LOST_MESSAGE_CHAPTERS.length - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setChapterIdx((prev) => prev + 1);
                    setSelectedChoiceId(null);
                    setMistakes(0);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#145A4A] text-white text-xs font-semibold hover:bg-[#10483B]"
                >
                  {locale === 'id-ID'
                    ? `Lanjut ke Bab ${chapter.chapterNumber + 1} →`
                    : `Teruskan ke Bab ${chapter.chapterNumber + 1} →`}
                </button>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// GAME 6: THE WORD DETECTIVE (INTERACTIVE SVG ROOT & MORPHOLOGY GRAPH)
// ============================================================================
interface WordDetectiveProps {
  locale: LocaleCode;
  showTransliteration: boolean;
  completedLevels: Record<string, { stars: number }>;
  onRecordAttempt: (
    levelNumber: number,
    wordIds: string[],
    mistakesCount: number,
    arabicPrompt: string,
    didPass: boolean,
    diagnosticCategory?: 'morphology',
    feedbackText?: string
  ) => void;
}

export const WordDetectiveGame: React.FC<WordDetectiveProps> = ({
  locale,
  showTransliteration,
  completedLevels,
  onRecordAttempt,
}) => {
  const [caseIdx, setCaseIdx] = useState<number>(0);
  const currentCase =
    WORD_DETECTIVE_CASES[caseIdx] || WORD_DETECTIVE_CASES[0];

  const [selectedDerivId, setSelectedDerivId] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState<number>(0);

  const chosenDerivative = currentCase.derivatives.find(
    (d) => d.id === selectedDerivId
  );
  const isCorrect =
    selectedDerivId !== null &&
    selectedDerivId === currentCase.targetDerivativeId;

  const handleSelectDerivative = (dId: string) => {
    if (isCorrect) return;
    setSelectedDerivId(dId);
    const hit = dId === currentCase.targetDerivativeId;
    if (hit) {
      onRecordAttempt(
        currentCase.caseNumber,
        currentCase.focusWordIds,
        mistakes,
        currentCase.rootArabic,
        true
      );
    } else {
      const nextMistakes = mistakes + 1;
      setMistakes(nextMistakes);
      onRecordAttempt(
        currentCase.caseNumber,
        currentCase.focusWordIds,
        nextMistakes,
        currentCase.rootArabic,
        false,
        'morphology',
        locale === 'id-ID'
          ? 'Perhatikan perbedaan pola kata kerja (كَتَبَ), pelaku (كَاتِبٌ), dan objek (مَكْتُوبٌ).'
          : 'Perhatikan perbezaan wazan kata kerja (كَتَبَ), pelaku (كَاتِبٌ) dan objek (مَكْتُوبٌ).'
      );
    }
  };

  // Node positions for the 4 derivatives around the central Root Hub in SVG (viewBox 0 0 680 230)
  const branchCoords = [
    { x: 115, y: 55 },
    { x: 565, y: 55 },
    { x: 115, y: 175 },
    { x: 565, y: 175 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {WORD_DETECTIVE_CASES.map((c, i) => {
          const done = completedLevels[`word-detective:${c.caseNumber}`];
          return (
            <button
              key={c.caseNumber}
              type="button"
              onClick={() => {
                setCaseIdx(i);
                setSelectedDerivId(null);
                setMistakes(0);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                i === caseIdx
                  ? 'bg-[#145A4A] text-white border-[#145A4A]'
                  : done
                  ? 'bg-[#DDEBE3] text-[#145A4A] border-[#145A4A]/25'
                  : 'bg-white text-[#1C2724]/80 border-[#1C2724]/15'
              }`}
            >
              <span>
                {locale === 'id-ID' ? 'Kasus Akar' : 'Kes Akar'} {c.caseNumber}{' '}
                ({c.rootArabic})
              </span>
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

      <div className="bg-white rounded-2xl p-6 border border-[#1C2724]/12 space-y-6">
        {/* Interactive SVG Root-to-Pattern Node Diagram */}
        <div className="rounded-2xl bg-[#F7F5EF] border border-[#145A4A]/25 p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#145A4A] font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              <span>
                {locale === 'id-ID'
                  ? 'Peta Jaringan Akar Tiga Huruf (جَذْر) & Pola Turunan (وَزْن)'
                  : 'Peta Rangkaian Akar Tiga Huruf (جَذْر) & Wazan Terbitan (وَزْن)'}
              </span>
            </span>
            <span className="text-[#1C2724]/75">
              {currentCase.coreMeaning[locale]}
            </span>
          </div>

          <svg
            viewBox="0 0 680 230"
            className="w-full h-auto max-h-[250px] select-none"
            role="img"
            aria-label={`Peta Akar Kata ${currentCase.rootArabic}`}
          >
            {/* Connecting lines from center (340, 115) to the 4 derivative nodes */}
            {currentCase.derivatives.map((d, idx) => {
              const pt = branchCoords[idx] || { x: 115, y: 55 };
              const isSelected = selectedDerivId === d.id;
              const isTarget = d.id === currentCase.targetDerivativeId;
              return (
                <line
                  key={`line-${d.id}`}
                  x1={340}
                  y1={115}
                  x2={pt.x}
                  y2={pt.y}
                  stroke={
                    isSelected
                      ? isTarget
                        ? '#10B981'
                        : '#F59E0B'
                      : '#145A4A'
                  }
                  strokeWidth={isSelected ? 3.5 : 2}
                  strokeDasharray={isSelected ? undefined : '6 4'}
                  opacity={isSelected ? 1 : 0.45}
                />
              );
            })}

            {/* Central Root Hub Node */}
            <g transform="translate(340, 115)">
              <circle
                r={52}
                fill="#145A4A"
                stroke="#D8A75B"
                strokeWidth={4}
              />
              <text
                y={-14}
                textAnchor="middle"
                fill="#DDEBE3"
                fontSize="10"
                fontWeight="bold"
              >
                {locale === 'id-ID' ? 'AKAR KATA' : 'AKAR KATA'}
              </text>
              <text
                y={14}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="22"
                fontWeight="bold"
                direction="rtl"
              >
                {currentCase.rootArabic}
              </text>
            </g>

            {/* 4 Clickable Derivative Pattern Nodes */}
            {currentCase.derivatives.map((d, idx) => {
              const pt = branchCoords[idx] || { x: 115, y: 55 };
              const isSelected = selectedDerivId === d.id;
              const isTarget = d.id === currentCase.targetDerivativeId;
              return (
                <g
                  key={`node-${d.id}`}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  onClick={() => handleSelectDerivative(d.id)}
                  className={isCorrect ? 'cursor-default' : 'cursor-pointer'}
                >
                  <rect
                    x={-95}
                    y={-34}
                    width={190}
                    height={68}
                    rx={14}
                    fill={
                      isSelected
                        ? isTarget
                          ? '#ECFDF5'
                          : '#FFFBEB'
                        : '#FFFFFF'
                    }
                    stroke={
                      isSelected
                        ? isTarget
                          ? '#10B981'
                          : '#F59E0B'
                        : '#145A4A'
                    }
                    strokeWidth={isSelected ? 3 : 1.5}
                  />
                  <text
                    y={-6}
                    textAnchor="middle"
                    fill="#145A4A"
                    fontSize="20"
                    fontWeight="bold"
                    direction="rtl"
                  >
                    {d.arabic}
                  </text>
                  <text
                    y={18}
                    textAnchor="middle"
                    fill="#1C2724"
                    fontSize="10"
                    fontWeight="600"
                  >
                    {d.patternLabel[locale]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold text-[#1C2724]">
              {currentCase.questionPrompt[locale]}
            </p>
            {isCorrect && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDerivId(null);
                  setMistakes(0);
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#145A4A] hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  {locale === 'id-ID' ? 'Ulangi Kasus Akar' : 'Ulangi Kes Akar'}
                </span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentCase.derivatives.map((d) => {
              const isSelected = selectedDerivId === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  disabled={isCorrect}
                  onClick={() => handleSelectDerivative(d.id)}
                  className={`p-4 rounded-xl border text-left transition-all space-y-1.5 ${
                    isSelected
                      ? d.id === currentCase.targetDerivativeId
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'bg-amber-50 border-amber-500'
                      : isCorrect
                      ? 'bg-slate-50 border-slate-200 opacity-60 cursor-default'
                      : 'bg-[#F7F5EF] hover:bg-[#DDEBE3]/60 border-[#1C2724]/12 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#145A4A]">
                      {d.patternLabel[locale]}
                    </span>
                    <span
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-2xl font-bold text-[#145A4A]"
                    >
                      {d.arabic}
                    </span>
                  </div>
                  {showTransliteration && (
                    <div className="text-xs text-[#1C2724]/70 italic">
                      {d.transliteration} — {d.meaning[locale]}
                    </div>
                  )}
                  <div
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-sm text-[#1C2724]/80 pt-1 border-t border-[#1C2724]/8"
                  >
                    {d.contextExample}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {chosenDerivative && (
          <div
            role="status"
            className={`p-4 rounded-xl border space-y-3 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <p className="text-xs sm:text-sm font-medium">
              {isCorrect
                ? locale === 'id-ID'
                  ? `Tepat! ${chosenDerivative.arabic} (${chosenDerivative.transliteration}) mengikuti pola ${chosenDerivative.patternLabel['id-ID']} dengan arti "${chosenDerivative.meaning['id-ID']}".`
                  : `Tepat! ${chosenDerivative.arabic} (${chosenDerivative.transliteration}) mengikut wazan ${chosenDerivative.patternLabel['ms-MY']} dengan maksud "${chosenDerivative.meaning['ms-MY']}".`
                : locale === 'id-ID'
                ? `Belum tepat: ${chosenDerivative.arabic} adalah ${chosenDerivative.patternLabel['id-ID']} ("${chosenDerivative.meaning['id-ID']}"). Perhatikan kembali pola yang ditanyakan!`
                : `Belum tepat: ${chosenDerivative.arabic} ialah ${chosenDerivative.patternLabel['ms-MY']} ("${chosenDerivative.meaning['ms-MY']}"). Perhatikan semula wazan yang ditanyakan!`}
            </p>
            {isCorrect && caseIdx < WORD_DETECTIVE_CASES.length - 1 && (
              <button
                type="button"
                onClick={() => {
                  setCaseIdx((prev) => prev + 1);
                  setSelectedDerivId(null);
                  setMistakes(0);
                }}
                className="px-4 py-2 rounded-xl bg-[#145A4A] text-white text-xs font-semibold hover:bg-[#10483B]"
              >
                {locale === 'id-ID'
                  ? `Lanjut ke Kasus Akar ${currentCase.caseNumber + 1} →`
                  : `Teruskan ke Kes Akar ${currentCase.caseNumber + 1} →`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// GAME 7: THE QURANIC DISCOVERY ROOM (CALM, REVERENT EXPLORATION)
// ============================================================================
interface QuranicDiscoveryProps {
  locale: LocaleCode;
  showTransliteration: boolean;
  completedLevels: Record<string, { stars: number }>;
  onRecordAttempt: (
    levelNumber: number,
    wordIds: string[],
    mistakesCount: number,
    arabicPrompt: string,
    didPass: boolean
  ) => void;
  onOpenLessonInExplorer: (lessonId: string) => void;
}

export const QuranicDiscoveryRoom: React.FC<QuranicDiscoveryProps> = ({
  locale,
  showTransliteration,
  completedLevels,
  onRecordAttempt,
  onOpenLessonInExplorer,
}) => {
  const [passageIdx, setPassageIdx] = useState<number>(0);
  const passage =
    QURANIC_DISCOVERY_PASSAGES[passageIdx] || QURANIC_DISCOVERY_PASSAGES[0];

  const [selectedTokenId, setSelectedTokenId] = useState<string>(
    passage.highlightedTokens[0]?.wordId || ''
  );
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(
    null
  );
  const [audioMode, setAudioMode] = useState<AudioPlaybackMode>('idle');

  const activeToken =
    passage.highlightedTokens.find((t) => t.wordId === selectedTokenId) ||
    passage.highlightedTokens[0];

  const isComprehensionSolved =
    selectedAnswerIdx !== null &&
    selectedAnswerIdx === passage.comprehensionCheck.correctIndex;

  const handleSelectPassage = (newIdx: number) => {
    const p =
      QURANIC_DISCOVERY_PASSAGES[newIdx] || QURANIC_DISCOVERY_PASSAGES[0];
    setPassageIdx(newIdx);
    setSelectedTokenId(p.highlightedTokens[0]?.wordId || '');
    setSelectedAnswerIdx(null);
    setAudioMode('idle');
  };

  const handlePlayRecitation = () => {
    // CRITICAL REQUIREMENT: Never fall back to synthetic SpeechSynthesis for Quranic recitation.
    audioController.playQuranicRecitation({
      audioUrl: passage.audioUrl,
      onModeChange: setAudioMode,
    });
  };

  const handleAnswerCheck = (optIdx: number) => {
    if (isComprehensionSolved) return;
    setSelectedAnswerIdx(optIdx);
    const isCorrect = optIdx === passage.comprehensionCheck.correctIndex;
    onRecordAttempt(
      passageIdx + 1,
      passage.highlightedTokens.map((t) => t.wordId),
      isCorrect ? 0 : 1,
      passage.arabicVerse,
      isCorrect
    );
  };

  return (
    <div className="space-y-6">
      {/* Reverent Header Notice */}
      <div className="p-4 rounded-2xl bg-[#DDEBE3]/60 border border-[#145A4A]/20 flex flex-wrap items-center justify-between gap-2 text-xs text-[#1C2724]">
        <div className="flex items-center gap-2 font-semibold text-[#145A4A]">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>
            {locale === 'id-ID'
              ? 'Ruang Tadabbur & Penemuan Al-Qur’an · Bebas Mekanika Arkade · Rujukan Terverifikasi'
              : 'Ruang Tadabbur & Penemuan al-Quran · Bebas Mekanik Arked · Rujukan Disahkan'}
          </span>
        </div>
        <a
          href={passage.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[#145A4A] hover:underline"
        >
          <span>{passage.verseRef} (Quran.com)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Passage Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {QURANIC_DISCOVERY_PASSAGES.map((p, i) => {
          const done = completedLevels[`quranic-discovery:${i + 1}`];
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPassage(i)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                i === passageIdx
                  ? 'bg-[#145A4A] text-white border-[#145A4A]'
                  : done
                  ? 'bg-[#DDEBE3] text-[#145A4A] border-[#145A4A]/25'
                  : 'bg-white text-[#1C2724]/80 border-[#1C2724]/15'
              }`}
            >
              <span>{p.verseRef}</span>
              {done && <span className="text-amber-500 font-bold">✓</span>}
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#1C2724]/12 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-[#145A4A]">
              {passage.verseRef}
            </span>
            <p className="text-xs text-[#1C2724]/70 mt-0.5">
              {passage.translationSource[locale]}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handlePlayRecitation}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#145A4A] text-white text-xs font-semibold hover:bg-[#10483B]"
            >
              <Volume2 className="w-4 h-4" />
              <span>
                {locale === 'id-ID'
                  ? 'Dengarkan Tilawah (Mishary Alafasy)'
                  : 'Dengar Tilawah (Mishary Alafasy)'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLessonInExplorer(passage.connectedLessonId)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#DDEBE3] text-[#145A4A] text-xs font-semibold hover:bg-[#cde0d5]"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                {locale === 'id-ID'
                  ? 'Buka di Ayat Explorer (7 Langkah)'
                  : 'Buka di Ayat Explorer (7 Langkah)'}
              </span>
            </button>
          </div>
        </div>

        {/* Verse Display */}
        <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#1C2724]/10 text-center space-y-3">
          <div
            dir="rtl"
            lang="ar"
            className="font-arabic text-3xl sm:text-4xl text-[#145A4A] font-bold leading-loose"
          >
            {passage.arabicVerse}
          </div>
          {showTransliteration && (
            <div className="text-xs sm:text-sm text-[#1C2724]/70 italic">
              {passage.transliteration}
            </div>
          )}
          <div className="text-sm sm:text-base text-[#1C2724] font-medium max-w-2xl mx-auto pt-2 border-t border-[#1C2724]/10">
            “{passage.verifiedTranslation[locale]}”
          </div>
        </div>

        {/* Strict Recitation Playback Status / Unavailable + Retry Banner */}
        {audioMode !== 'idle' && (
          <div
            role="status"
            data-testid="quran-recitation-status"
            className={`p-3.5 rounded-xl border text-xs flex flex-wrap items-center justify-between gap-3 ${
              audioMode === 'verified-recording'
                ? 'bg-[#DDEBE3]/60 border-[#145A4A]/30 text-[#145A4A]'
                : audioMode === 'loading'
                ? 'bg-[#F7F5EF] border-[#1C2724]/15 text-[#1C2724]/75'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                {audioMode === 'verified-recording' &&
                  (locale === 'id-ID'
                    ? 'Memutar rekaman tilawah terverifikasi (EveryAyah · Syaikh Mishary Rashid Alafasy).'
                    : 'Memainkan rakaman tilawah disahkan (EveryAyah · Syaikh Mishary Rashid Alafasy).')}
                {audioMode === 'loading' &&
                  (locale === 'id-ID'
                    ? 'Memuat rekaman tilawah Al-Qur’an...'
                    : 'Memuatkan rakaman tilawah al-Quran...')}
                {audioMode === 'unavailable' &&
                  (locale === 'id-ID'
                    ? 'Tilawah sementara tidak tersedia. Rekaman qari tidak dapat dimuat dari jaringan ini. Demi menjaga kehormatan bacaan Al-Qur’an, aplikasi tidak mengganti tilawah dengan suara sintetis otomatis.'
                    : 'Tilawah buat masa ini tidak tersedia. Rakaman qari tidak dapat dimuatkan daripada rangkaian ini. Demi menjaga kehormatan bacaan al-Quran, aplikasi tidak menggantikan tilawah dengan suara sintetik automatik.')}
              </span>
            </div>
            {audioMode === 'unavailable' && (
              <button
                type="button"
                onClick={handlePlayRecitation}
                className="px-3 py-1.5 rounded-lg bg-[#145A4A] text-white text-xs font-semibold hover:bg-[#10483B] inline-flex items-center gap-1.5 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  {locale === 'id-ID'
                    ? 'Coba Muat Ulang Tilawah'
                    : 'Cuba Muat Semula Tilawah'}
                </span>
              </button>
            )}
          </div>
        )}

        {/* Bridge Explanation from World of Meaning */}
        <div className="p-4 rounded-xl bg-[#DDEBE3]/40 border border-[#145A4A]/20 text-xs sm:text-sm text-[#1C2724] leading-relaxed">
          <span className="font-bold text-[#145A4A]">
            {locale === 'id-ID'
              ? 'Jembatan Makna dari Dunia Permainan ke Mushaf: '
              : 'Jambatan Makna dari Dunia Permainan ke Mushaf: '}
          </span>
          {passage.worldBridgeNote[locale]}
        </div>

        {/* Highlighted Tokens Explorer */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#1C2724]">
            {locale === 'id-ID'
              ? 'Klik Kata Kunci untuk Melihat Hubungan Maknanya:'
              : 'Klik Kata Kunci untuk Melihat Hubungan Maknanya:'}
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {passage.highlightedTokens.map((tok) => (
              <button
                key={tok.wordId}
                type="button"
                onClick={() => setSelectedTokenId(tok.wordId)}
                className={`px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                  selectedTokenId === tok.wordId
                    ? 'bg-[#145A4A] text-white border-[#145A4A]'
                    : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/15 hover:bg-[#DDEBE3]/60'
                }`}
              >
                <span
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-xl font-bold"
                >
                  {tok.arabic}
                </span>
                <span className="text-xs font-medium">
                  ({tok.meaning[locale]})
                </span>
              </button>
            ))}
          </div>

          {activeToken && (
            <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 text-xs sm:text-sm space-y-1">
              <div className="font-bold text-[#145A4A]">
                {activeToken.arabic} ({activeToken.transliteration}) —{' '}
                {activeToken.meaning[locale]}
              </div>
              <p className="text-[#1C2724]/80">
                {activeToken.worldConnection[locale]}
              </p>
            </div>
          )}
        </div>

        {/* Comprehension Reflection Question */}
        <div className="pt-4 border-t border-[#1C2724]/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm font-bold text-[#1C2724]">
              {passage.comprehensionCheck.question[locale]}
            </h4>
            {isComprehensionSolved && (
              <button
                type="button"
                onClick={() => setSelectedAnswerIdx(null)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#145A4A] hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  {locale === 'id-ID'
                    ? 'Ulangi Pertanyaan'
                    : 'Ulangi Soalan'}
                </span>
              </button>
            )}
          </div>
          <div className="space-y-2">
            {passage.comprehensionCheck.options.map((opt, oIdx) => (
              <button
                key={oIdx}
                type="button"
                disabled={isComprehensionSolved}
                onClick={() => handleAnswerCheck(oIdx)}
                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${
                  selectedAnswerIdx === oIdx
                    ? oIdx === passage.comprehensionCheck.correctIndex
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold'
                      : 'bg-amber-50 border-amber-500 text-amber-950'
                    : isComprehensionSolved
                    ? 'bg-slate-50 border-slate-200 opacity-60 cursor-default'
                    : 'bg-[#F7F5EF] hover:bg-[#DDEBE3]/50 border-[#1C2724]/12 cursor-pointer'
                }`}
              >
                {opt[locale]}
              </button>
            ))}
          </div>

          {selectedAnswerIdx !== null && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950">
              {passage.comprehensionCheck.explanation[locale]}
            </div>
          )}
        </div>

        {/* Explicit Quranic Source, Translation License & Editorial Verification Metadata */}
        <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 text-[11px] sm:text-xs text-[#1C2724]/75 space-y-2">
          <div className="font-bold text-[#145A4A]">
            {locale === 'id-ID'
              ? 'Dokumentasi Sumber Mushaf, Lisensi Terjemahan & Audio:'
              : 'Dokumentasi Sumber Mushaf, Lesen Terjemahan & Audio:'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <strong>
                {locale === 'id-ID' ? 'Sumber Teks Arab:' : 'Sumber Teks Arab:'}
              </strong>{' '}
              {passage.arabicTextSource}
            </div>
            <div>
              <strong>
                {locale === 'id-ID' ? 'Sumber Qari:' : 'Sumber Qari:'}
              </strong>{' '}
              {passage.audioReciterSource}
            </div>
            <div>
              <strong>
                {locale === 'id-ID'
                  ? 'Lisensi Terjemahan:'
                  : 'Lesen Terjemahan:'}
              </strong>{' '}
              {passage.translationLicense[locale]}
            </div>
            <div>
              <strong>
                {locale === 'id-ID' ? 'Lisensi Audio:' : 'Lesen Audio:'}
              </strong>{' '}
              {passage.audioLicense[locale]}
            </div>
          </div>
          <p className="pt-1 border-t border-[#1C2724]/10 text-[#1C2724]/70">
            {passage.editorialVerificationNote[locale]}
          </p>
        </div>
      </div>
    </div>
  );
};
