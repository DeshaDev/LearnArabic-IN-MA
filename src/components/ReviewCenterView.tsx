import React, { useState } from 'react';
import { LearnerProgress, LocaleCode, WordToken } from '../types/learning';
import { WORDS } from '../data/curriculum';
import { getDueReviewItems } from '../utils/learningEngine';
import { audioController } from '../utils/audioPlayer';
import { CheckCircle2, AlertCircle, Volume2, ArrowRight, RotateCcw } from 'lucide-react';

interface ReviewCenterViewProps {
  locale: LocaleCode;
  progress: LearnerProgress;
  onRecordReviewResult: (wordId: string, isCorrect: boolean) => void;
}

export const ReviewCenterView: React.FC<ReviewCenterViewProps> = ({
  locale,
  progress,
  onRecordReviewResult,
}) => {
  const dueItems = getDueReviewItems(progress.reviewQueue, Date.now());
  const reviewWordIds =
    dueItems.length > 0
      ? dueItems.map((i) => i.wordId)
      : progress.learnedWordIds.length > 0
      ? progress.learnedWordIds
      : ['w-bismi', 'w-arrahmani', 'w-alhamdu', 'w-iyyaka'];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [sessionCompletedCount, setSessionCompletedCount] = useState<number>(0);

  const currentWordId = reviewWordIds[currentIndex % reviewWordIds.length];
  const currentWord: WordToken =
    WORDS.find((w) => w.id === currentWordId) || WORDS[0];

  // Build deterministic plausible distractors
  const distractors = WORDS.filter((w) => w.id !== currentWord.id).slice(0, 2);
  const options = [currentWord, ...distractors];

  const handleSelectOption = (idx: number) => {
    if (selectedChoice !== null) return;
    setSelectedChoice(idx);
    const isCorrect = idx === 0;
    onRecordReviewResult(currentWord.id, isCorrect);
    setSessionCompletedCount((c) => c + 1);
  };

  const handleNextWord = () => {
    setSelectedChoice(null);
    setCurrentIndex((i) => i + 1);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-[#145A4A]">
            {locale === 'id-ID'
              ? 'Pusat Ulasan Berjarak (Spaced Repetition)'
              : 'Pusat Ulang Kaji Berjarak (Spaced Repetition)'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-1">
            {locale === 'id-ID'
              ? 'Pengingatan aktif untuk menjaga daya ingat kosakata'
              : 'Ingatan aktif untuk mengekalkan penguasaan kosa kata'}
          </h1>
        </div>
        <div className="text-xs font-semibold text-[#145A4A] bg-white px-3.5 py-2 rounded-xl border border-[#1C2724]/12 tabular-nums self-start sm:self-auto">
          {locale === 'id-ID'
            ? `Sesi hari ini: ${sessionCompletedCount} kata diulas`
            : `Sesi hari ini: ${sessionCompletedCount} perkataan diulang kaji`}
        </div>
      </div>

      {/* Active Recall Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#1C2724]/12 space-y-6">
        <div className="flex items-center justify-between text-xs text-[#1C2724]/65 pb-4 border-b border-[#1C2724]/10">
          <span>
            {currentWord.verseRef} · {currentWord.grammaticalRole[locale]}
          </span>
          <button
            type="button"
            onClick={() =>
              audioController.speakArabic(
                currentWord.arabic,
                0.85,
                currentWord.audioFreqHz
              )
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DDEBE3] text-[#145A4A] font-semibold"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>
              {locale === 'id-ID' ? 'Dengarkan Kata' : 'Dengar Perkataan'}
            </span>
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#1C2724]/10 text-center">
          <div
            dir="rtl"
            lang="ar"
            className="font-arabic text-4xl sm:text-5xl text-[#145A4A] font-bold"
          >
            {currentWord.arabic}
          </div>
          {progress.showTransliteration && (
            <div className="text-sm font-medium text-[#1C2724]/70 mt-2">
              {currentWord.transliteration}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-[#1C2724] mb-3">
            {locale === 'id-ID'
              ? 'Pilih makna kontekstual yang tepat untuk kata di atas:'
              : 'Pilih makna mengikut konteks yang tepat bagi perkataan di atas:'}
          </p>
          <div className="space-y-2.5">
            {options.map((opt, idx) => {
              const isChosen = selectedChoice === idx;
              const isRight = idx === 0;
              let cls =
                'bg-[#F7F5EF] border-[#1C2724]/12 text-[#1C2724] hover:bg-[#DDEBE3]/50';
              if (selectedChoice !== null) {
                if (isRight) {
                  cls = 'bg-[#DDEBE3] border-[#145A4A] text-[#145A4A] font-semibold';
                } else if (isChosen) {
                  cls = 'bg-amber-50 border-amber-400 text-amber-950';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 transition-colors ${cls}`}
                >
                  <span>{opt.contextualMeaning[locale]}</span>
                  {selectedChoice !== null && isRight && (
                    <CheckCircle2 className="w-4 h-4 text-[#145A4A] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {selectedChoice !== null && (
          <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/12 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#145A4A]">
              {selectedChoice === 0 ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {locale === 'id-ID'
                      ? 'Benar! Jadwal ulasan kata ini diperpanjang ke interval berikutnya.'
                      : 'Betul! Jadual ulang kaji perkataan ini dilanjutkan ke sela masa seterusnya.'}
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span className="text-amber-900">
                    {locale === 'id-ID'
                      ? 'Belum tepat. Kata ini akan ditampilkan kembali agar lebih kuat diingat.'
                      : 'Belum tepat. Perkataan ini akan dijadualkan semula supaya lebih kukuh diingati.'}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#1C2724]/80 leading-relaxed">
              {currentWord.lexicalNote[locale]}
            </p>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleNextWord}
                className="px-4 py-2 rounded-xl bg-[#145A4A] text-white text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <span>
                  {locale === 'id-ID' ? 'Kata Berikutnya' : 'Perkataan Seterusnya'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Review Schedule Table */}
      <div className="bg-white rounded-2xl p-6 border border-[#1C2724]/12">
        <div className="flex items-center justify-between pb-3 border-b border-[#1C2724]/10">
          <h2 className="text-sm font-bold text-[#1C2724]">
            {locale === 'id-ID'
              ? 'Status Retensi Kata di Antrean Anda'
              : 'Status Ingatan Perkataan dalam Giliran Anda'}
          </h2>
          <RotateCcw className="w-4 h-4 text-[#145A4A]" />
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WORDS.slice(0, 6).map((w) => {
            const item = progress.reviewQueue[w.id];
            return (
              <div
                key={w.id}
                className="p-3 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/8 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#1C2724]">
                    {w.transliteration} — {w.contextualMeaning[locale]}
                  </div>
                  <div className="text-[11px] text-[#1C2724]/60 tabular-nums">
                    {item
                      ? locale === 'id-ID'
                        ? `Interval: ${item.intervalDays} hari · Benar beruntun: ${item.correctStreak}x`
                        : `Sela masa: ${item.intervalDays} hari · Betul berturut: ${item.correctStreak}x`
                      : locale === 'id-ID'
                      ? 'Siap dipelajari'
                      : 'Sedia dipelajari'}
                  </div>
                </div>
                <span
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-xl text-[#145A4A] font-bold"
                >
                  {w.arabic}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
