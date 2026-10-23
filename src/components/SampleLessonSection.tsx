import React, { useState } from 'react';
import { AudioPlaybackMode, LocaleCode, WordToken } from '../types/learning';
import { LOCALES } from '../data/locales';
import { LESSONS, WORDS } from '../data/curriculum';
import { audioController } from '../utils/audioPlayer';
import {
  Volume2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Bookmark,
  ExternalLink,
} from 'lucide-react';

interface SampleLessonSectionProps {
  locale: LocaleCode;
  bookmarkedWordIds: string[];
  onToggleBookmark: (wordId: string) => void;
  onStartLesson: (lessonId: string) => void;
}

export const SampleLessonSection: React.FC<SampleLessonSectionProps> = ({
  locale,
  bookmarkedWordIds,
  onToggleBookmark,
  onStartLesson,
}) => {
  const dict = LOCALES[locale];
  const sampleLesson =
    LESSONS.find((l) => l.id === 'lesson-ayah-2') || LESSONS[0];
  const lessonWords: WordToken[] = sampleLesson.wordIds
    .map((id) => WORDS.find((w) => w.id === id)!)
    .filter(Boolean);

  const [activeWordId, setActiveWordId] = useState<string>(lessonWords[0].id);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAdvancedGrammar, setShowAdvancedGrammar] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioMode, setAudioMode] = useState<AudioPlaybackMode>('idle');

  const activeWord =
    lessonWords.find((w) => w.id === activeWordId) || lessonWords[0];

  const handlePlayPhrase = () => {
    audioController.speakArabic(
      sampleLesson.arabicPhrase,
      1.0,
      undefined,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      sampleLesson.id,
      sampleLesson.audioUrl,
      (mode) => setAudioMode(mode)
    );
  };

  const handlePlayWord = (word: WordToken) => {
    audioController.playWordAudio(
      word.id,
      word.arabic,
      1.0,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      word.audioUrl,
      (mode) => setAudioMode(mode)
    );
  };

  const quiz = sampleLesson.practice.multipleChoice;
  const isCorrect = selectedOption === quiz.correctIndex;

  return (
    <section
      id="pelajaran-contoh"
      aria-labelledby="sample-lesson-heading"
      className="py-16 sm:py-20 border-t border-[#1C2724]/10 bg-white"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-[#145A4A] tracking-wide">
            {dict.sampleLesson.kicker}
          </p>
          <h2
            id="sample-lesson-heading"
            className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-2 text-balance"
          >
            {dict.sampleLesson.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#1C2724]/75 mt-3 leading-relaxed">
            {dict.sampleLesson.subtitle}
          </p>
        </div>

        {/* Interactive Two-Zone Sandbox Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Zone (7 cols): Arabic Phrase Stage & Word Details */}
          <div className="lg:col-span-7 bg-[#F7F5EF] rounded-2xl p-5 sm:p-7 border border-[#1C2724]/10 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1C2724]/10">
                <div className="text-xs text-[#1C2724]/70">
                  <span className="font-semibold text-[#145A4A]">
                    {dict.sampleLesson.step1Label}
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span>{sampleLesson.verseRef}</span>
                </div>
                <button
                  type="button"
                  onClick={handlePlayPhrase}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#145A4A] bg-white hover:bg-[#DDEBE3] rounded-lg border border-[#1C2724]/10 transition-colors whitespace-nowrap shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>
                    {isPlaying ? dict.common.playingAudio : dict.common.listenAudio}
                  </span>
                </button>
              </div>

              {audioMode !== 'idle' && (
                <div
                  role="status"
                  className={`mt-3 px-3 py-2 rounded-xl border text-xs ${
                    audioMode === 'verified-recording'
                      ? 'bg-[#DDEBE3]/60 border-[#145A4A]/25 text-[#145A4A]'
                      : audioMode === 'loading'
                      ? 'bg-white border-[#1C2724]/15 text-[#1C2724]/75'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  {audioMode === 'verified-recording' &&
                    (locale === 'id-ID'
                      ? '✓ Memutar rekaman tilawah terverifikasi (Syaikh Mishary Rashid Alafasy — EveryAyah / Quran.com).'
                      : '✓ Memainkan rakaman tilawah disahkan (Syaikh Mishary Rashid Alafasy — EveryAyah / Quran.com).')}
                  {audioMode === 'loading' &&
                    (locale === 'id-ID' ? 'Memuat rekaman audio...' : 'Memuatkan rakaman audio...')}
                  {audioMode === 'synthetic-tts-fallback' &&
                    (locale === 'id-ID'
                      ? '⚠ Bantuan Sebutan Sintetis Peramban (TTS): Rekaman tilawah qari tidak terjangkau di jaringan ini. Suara sintetis bukan tilawah Al-Qur’an.'
                      : '⚠ Bantuan Sebutan Sintetik Pelayar (TTS): Rakaman tilawah qari tidak dapat dicapai. Suara sintetik bukan tilawah al-Quran.')}
                  {audioMode === 'unavailable' &&
                    (locale === 'id-ID'
                      ? '⚠ Audio tilawah tidak dapat dimuat (jaringan dibatasi / offline) dan suara TTS Arab tidak tersedia di peramban ini.'
                      : '⚠ Audio tilawah tidak dapat dimuatkan (rangkaian dihadkan / luar talian) dan suara TTS Arab tidak tersedia pada pelayar ini.')}
                </div>
              )}

              {/* Selectable Arabic Words */}
              <div
                dir="rtl"
                lang="ar"
                className="my-5 p-5 bg-white rounded-xl border border-[#1C2724]/10 flex flex-wrap items-center justify-center gap-3 sm:gap-5"
              >
                {lessonWords.map((word) => {
                  const selected = word.id === activeWord.id;
                  return (
                    <button
                      key={word.id}
                      type="button"
                      onClick={() => {
                        setActiveWordId(word.id);
                        handlePlayWord(word);
                      }}
                      aria-pressed={selected}
                      className={`px-4 py-2.5 rounded-xl transition-all text-center ${
                        selected
                          ? 'bg-[#145A4A] text-white shadow-xs'
                          : 'bg-[#F7F5EF] text-[#1C2724] hover:bg-[#DDEBE3]/70 border border-[#1C2724]/10'
                      }`}
                    >
                      <span className="block font-arabic text-3xl sm:text-4xl leading-relaxed">
                        {word.arabic}
                      </span>
                      <span
                        dir="ltr"
                        className={`block text-xs mt-1 font-medium ${
                          selected ? 'text-[#DDEBE3]' : 'text-[#1C2724]/65'
                        }`}
                      >
                        {word.transliteration}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Verified Translation & Source */}
              <div className="mb-5 px-4 py-3 bg-white/80 rounded-xl border border-[#1C2724]/8">
                <p className="text-sm font-medium text-[#1C2724]">
                  “{sampleLesson.verifiedTranslation[locale]}”
                </p>
                <p className="text-xs text-[#1C2724]/60 mt-1">
                  {sampleLesson.translationSource[locale]}
                </p>
              </div>

              {/* Active Word Explanation Card */}
              <div className="bg-white rounded-xl p-5 border border-[#1C2724]/10">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-[#1C2724]/60">
                      <span>{activeWord.grammaticalRole[locale]}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{activeWord.verseRef}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1C2724] mt-1">
                      {activeWord.transliteration} — “{activeWord.contextualMeaning[locale]}”
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(activeWord.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                      bookmarkedWordIds.includes(activeWord.id)
                        ? 'bg-[#145A4A] text-white border-[#145A4A]'
                        : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/15 hover:bg-[#DDEBE3]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>
                      {bookmarkedWordIds.includes(activeWord.id)
                        ? dict.common.bookmarked
                        : dict.common.bookmarkWord}
                    </span>
                  </button>
                </div>

                <p className="text-sm text-[#1C2724]/80 mt-2.5 leading-relaxed">
                  {activeWord.lexicalNote[locale]}
                </p>

                {activeWord.rootFamily && (
                  <div className="mt-4 pt-3 border-t border-[#1C2724]/10">
                    <div className="text-xs font-semibold text-[#145A4A]">
                      {dict.common.rootFamily}:{' '}
                      <span dir="rtl" lang="ar" className="font-arabic text-base mx-1">
                        {activeWord.rootFamily.rootArabic}
                      </span>{' '}
                      ({activeWord.rootFamily.coreConcept[locale]})
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeWord.rootFamily.relatedForms.map((rel, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-[#F7F5EF] border border-[#1C2724]/8 flex items-center justify-between gap-2"
                        >
                          <div>
                            <div className="text-xs font-semibold text-[#1C2724]">
                              {rel.transliteration} — {rel.meaning[locale]}
                            </div>
                            <div className="text-[11px] text-[#1C2724]/60">
                              {rel.formType[locale]} · {rel.verseRef}
                            </div>
                          </div>
                          <span dir="rtl" lang="ar" className="font-arabic text-xl text-[#145A4A]">
                            {rel.arabic}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Optional Advanced Grammar Disclosure */}
            <div className="mt-4 pt-3 border-t border-[#1C2724]/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowAdvancedGrammar(!showAdvancedGrammar)}
                aria-expanded={showAdvancedGrammar}
                className="text-xs font-semibold text-[#145A4A] hover:underline"
              >
                {showAdvancedGrammar
                  ? locale === 'id-ID'
                    ? 'Sembunyikan Catatan Nahwu Lanjutan'
                    : 'Sembunyikan Nota Nahu Lanjutan'
                  : locale === 'id-ID'
                  ? 'Tampilkan Catatan Nahwu Lanjutan (Opsional)'
                  : 'Paparkan Nota Nahu Lanjutan (Pilihan)'}
              </button>
              <span className="text-xs text-[#1C2724]/55 inline-flex items-center gap-1.5">
                <span>{activeWord.sourceAttribution[locale]}</span>
                {sampleLesson.sourceUrl && (
                  <a
                    href={sampleLesson.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#145A4A] font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>(Quran.com)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </span>
            </div>

            {showAdvancedGrammar && (
              <div className="mt-2 p-3.5 rounded-xl bg-white border border-[#1C2724]/10 text-xs text-[#1C2724]/80 leading-relaxed">
                {activeWord.advancedGrammarNote[locale]}
              </div>
            )}
          </div>

          {/* Right Zone (5 cols): Grammar Structure & Interactive Active-Recall Question */}
          <div className="lg:col-span-5 bg-[#F7F5EF] rounded-2xl p-5 sm:p-7 border border-[#1C2724]/10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#145A4A] pb-3 border-b border-[#1C2724]/10">
                {dict.sampleLesson.step2Label}
              </div>

              <div className="mt-4 bg-white rounded-xl p-4 border border-[#1C2724]/10">
                <h3 className="text-sm font-bold text-[#1C2724]">
                  {sampleLesson.grammarConceptTitle[locale]}
                </h3>
                <p className="text-xs sm:text-sm text-[#1C2724]/80 mt-2 leading-relaxed">
                  {sampleLesson.grammarConceptBody[locale]}
                </p>
              </div>

              {/* Interactive Quiz Block */}
              <div className="mt-6">
                <div className="text-xs font-semibold text-[#145A4A] mb-2">
                  {dict.sampleLesson.step3Label}
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#1C2724]/10">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs text-[#1C2724]/60">
                      {locale === 'id-ID' ? 'Pertanyaan Pemahaman' : 'Soalan Kefahaman'}
                    </span>
                    <span dir="rtl" lang="ar" className="font-arabic text-2xl text-[#145A4A] font-bold">
                      {quiz.arabicFocus}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#1C2724] mb-4">
                    {quiz.question[locale]}
                  </p>

                  <div className="space-y-2.5">
                    {quiz.options.map((opt, idx) => {
                      const isChosen = selectedOption === idx;
                      const isOptionCorrect = idx === quiz.correctIndex;
                      let btnStyle =
                        'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/12 hover:bg-[#DDEBE3]/50';
                      if (selectedOption !== null) {
                        if (isOptionCorrect) {
                          btnStyle = 'bg-[#DDEBE3] text-[#145A4A] border-[#145A4A] font-semibold';
                        } else if (isChosen) {
                          btnStyle = 'bg-amber-50 text-amber-900 border-amber-500';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedOption(idx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-colors flex items-start justify-between gap-3 ${btnStyle}`}
                        >
                          <span>{opt[locale]}</span>
                          {selectedOption !== null && isOptionCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-[#145A4A] shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption !== null && (
                    <div
                      role="status"
                      className={`mt-4 p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                        isCorrect
                          ? 'bg-[#DDEBE3]/60 border-[#145A4A]/30 text-[#1C2724]'
                          : 'bg-amber-50 border-amber-300 text-amber-950'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-[#145A4A] shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-bold block mb-0.5">
                          {isCorrect
                            ? locale === 'id-ID'
                              ? 'Jawaban Tepat'
                              : 'Jawapan Tepat'
                            : locale === 'id-ID'
                            ? 'Mari Perhatikan Kembali'
                            : 'Mari Teliti Semula'}
                        </span>
                        {quiz.feedback[locale]}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1C2724]/10 flex items-center justify-between gap-3">
              <span className="text-xs text-[#1C2724]/65">
                {locale === 'id-ID'
                  ? 'Ingin mencoba seluruh 7 langkah belajar?'
                  : 'Ingin mencuba kesemua 7 langkah pembelajaran?'}
              </span>
              <button
                type="button"
                onClick={() => onStartLesson(sampleLesson.id)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#145A4A] hover:bg-[#10483B] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>{dict.sampleLesson.openFullExplorer}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
