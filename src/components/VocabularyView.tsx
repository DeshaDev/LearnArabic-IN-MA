import React, { useState } from 'react';
import {
  AudioPlaybackMode,
  GrammaticalCategory,
  LearnerProgress,
  LocaleCode,
  WordToken,
} from '../types/learning';
import { WORDS } from '../data/curriculum';
import { LOCALES } from '../data/locales';
import { filterVocabulary } from '../utils/learningEngine';
import { audioController } from '../utils/audioPlayer';
import { Search, Volume2, Bookmark, Check, ExternalLink } from 'lucide-react';

interface VocabularyViewProps {
  locale: LocaleCode;
  progress: LearnerProgress;
  onToggleBookmark: (wordId: string) => void;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  locale,
  progress,
  onToggleBookmark,
}) => {
  const dict = LOCALES[locale];
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<GrammaticalCategory | 'all'>('all');
  const [stage, setStage] = useState<number | 'all'>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);
  const [selectedWordId, setSelectedWordId] = useState<string>(WORDS[2].id);
  const [audioMode, setAudioMode] = useState<AudioPlaybackMode>('idle');

  const filteredWords = filterVocabulary(WORDS, {
    query,
    locale,
    category,
    stage,
    onlyBookmarked,
    bookmarkedWordIds: progress.bookmarkedWordIds,
  });

  const activeWord: WordToken | undefined =
    filteredWords.find((w) => w.id === selectedWordId) || filteredWords[0];

  const handlePlayWord = (word: WordToken) => {
    audioController.playWordAudio(
      word.id,
      word.arabic,
      1.0,
      undefined,
      undefined,
      word.audioUrl,
      (mode) => setAudioMode(mode)
    );
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
      <div>
        <div className="text-xs font-semibold text-[#145A4A]">
          {locale === 'id-ID'
            ? 'Pustaka Kosakata & Penjelajah Akar Kata'
            : 'Pustaka Kosa Kata & Peneroka Akar Perkataan'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-1">
          {locale === 'id-ID'
            ? 'Telusuri kosakata Al-Qur’an, kategori kata, dan keluarga akarnya'
            : 'Terokai kosa kata al-Quran, kategori nahu dan keluarga akarnya'}
        </h1>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#1C2724]/12 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <label htmlFor="vocab-search-input" className="sr-only">
              {locale === 'id-ID' ? 'Cari kata Arab' : 'Cari perkataan Arab'}
            </label>
            <Search className="w-4 h-4 text-[#1C2724]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="vocab-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                locale === 'id-ID'
                  ? 'Cari kata Arab, transliterasi, arti, atau akar (mis. Pengasih, r-h-m)...'
                  : 'Cari perkataan Arab, transliterasi, makna atau akar (cth. Pemurah, r-h-m)...'
              }
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-[#F7F5EF] border border-[#1C2724]/15 rounded-xl focus:outline-2 focus:outline-[#145A4A]"
            />
          </div>

          <button
            type="button"
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            aria-pressed={onlyBookmarked}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border inline-flex items-center gap-2 whitespace-nowrap shrink-0 ${
              onlyBookmarked
                ? 'bg-[#145A4A] text-white border-[#145A4A]'
                : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/15 hover:bg-[#DDEBE3]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>
              {locale === 'id-ID'
                ? `Hanya Kata Tersimpan (${progress.bookmarkedWordIds.length})`
                : `Hanya Perkataan Disimpan (${progress.bookmarkedWordIds.length})`}
            </span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1C2724]/8">
          {/* Category Filter */}
          <div className="flex items-center gap-1 p-1 bg-[#F7F5EF] rounded-xl overflow-x-auto">
            {[
              { id: 'all' as const, label: locale === 'id-ID' ? 'Semua Kategori' : 'Semua Kategori' },
              { id: 'isim' as const, label: locale === 'id-ID' ? 'Kata Benda (Isim)' : 'Kata Nama (Isim)' },
              { id: 'fiil' as const, label: locale === 'id-ID' ? 'Kata Kerja (Fi’il)' : 'Kata Kerja (Fi’il)' },
              { id: 'harf' as const, label: locale === 'id-ID' ? 'Partikel (Harf)' : 'Partikel (Harf)' },
              { id: 'phrase' as const, label: locale === 'id-ID' ? 'Frasa Gabungan' : 'Frasa Gabungan' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  category === tab.id
                    ? 'bg-white text-[#145A4A] shadow-xs font-semibold'
                    : 'text-[#1C2724]/70 hover:text-[#1C2724]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Stage Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#1C2724]/65">
              {locale === 'id-ID' ? 'Tahap:' : 'Peringkat:'}
            </span>
            {(['all', 1, 2, 3, 4] as const).map((s) => (
              <button
                key={String(s)}
                type="button"
                onClick={() => setStage(s)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${
                  stage === s
                    ? 'bg-[#145A4A] text-white border-[#145A4A]'
                    : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/12'
                }`}
              >
                {s === 'all' ? (locale === 'id-ID' ? 'Semua' : 'Semua') : s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split View: Word List & Morphology Inspector */}
      {filteredWords.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-[#1C2724]/12">
          <p className="text-sm font-semibold text-[#1C2724]">
            {locale === 'id-ID'
              ? 'Tidak ada kata yang cocok dengan filter pencarian Anda.'
              : 'Tiada perkataan yang sepadan dengan tapisan carian anda.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
              setStage('all');
              setOnlyBookmarked(false);
            }}
            className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold bg-[#145A4A] text-white"
          >
            {locale === 'id-ID' ? 'Atur Ulang Filter' : 'Tetapkan Semula Tapisan'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left List (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {filteredWords.map((word) => {
              const selected = activeWord?.id === word.id;
              const isLearned = progress.learnedWordIds.includes(word.id);
              return (
                <button
                  key={word.id}
                  type="button"
                  onClick={() => setSelectedWordId(word.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                    selected
                      ? 'bg-[#145A4A] text-white border-[#145A4A] shadow-xs'
                      : 'bg-white text-[#1C2724] border-[#1C2724]/12 hover:bg-[#DDEBE3]/40'
                  }`}
                >
                  <div>
                    <div
                      className={`text-xs flex items-center gap-1.5 ${
                        selected ? 'text-[#DDEBE3]' : 'text-[#1C2724]/60'
                      }`}
                    >
                      <span>{word.transliteration}</span>
                      <span aria-hidden="true">·</span>
                      <span>{word.verseRef}</span>
                      {isLearned && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>
                            {locale === 'id-ID' ? 'Dipelajari' : 'Dipelajari'}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="text-sm font-bold mt-0.5">
                      {word.contextualMeaning[locale]}
                    </div>
                  </div>
                  <span dir="rtl" lang="ar" className="font-arabic text-2xl sm:text-3xl font-bold">
                    {word.arabic}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Detail & Root Family Inspector (7 cols) */}
          {activeWord && (
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-[#1C2724]/12 space-y-5">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#1C2724]/10">
                <div>
                  <div className="text-xs text-[#1C2724]/60">
                    <span>{activeWord.grammaticalRole[locale]}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{activeWord.verseRef}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1C2724] mt-1">
                    {activeWord.transliteration} — “{activeWord.contextualMeaning[locale]}”
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handlePlayWord(activeWord)}
                    aria-label={`${dict.common.listenAudio} ${activeWord.transliteration}`}
                    className="p-2.5 rounded-xl bg-[#F7F5EF] text-[#145A4A] hover:bg-[#DDEBE3] border border-[#1C2724]/10"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(activeWord.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border inline-flex items-center gap-1.5 ${
                      progress.bookmarkedWordIds.includes(activeWord.id)
                        ? 'bg-[#145A4A] text-white border-[#145A4A]'
                        : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/15 hover:bg-[#DDEBE3]'
                    }`}
                  >
                    {progress.bookmarkedWordIds.includes(activeWord.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{dict.common.bookmarked}</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{dict.common.bookmarkWord}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {audioMode !== 'idle' && (
                <div
                  role="status"
                  className={`px-3.5 py-2.5 rounded-xl border text-xs ${
                    audioMode === 'verified-recording'
                      ? 'bg-[#DDEBE3]/60 border-[#145A4A]/25 text-[#145A4A]'
                      : audioMode === 'loading'
                      ? 'bg-[#F7F5EF] border-[#1C2724]/15 text-[#1C2724]/75'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  {audioMode === 'verified-recording' &&
                    (locale === 'id-ID'
                      ? '✓ Memutar rekaman kata terverifikasi (Quran.com Word-by-Word / EveryAyah).'
                      : '✓ Memainkan rakaman perkataan disahkan (Quran.com Word-by-Word / EveryAyah).')}
                  {audioMode === 'loading' &&
                    (locale === 'id-ID' ? 'Memuat rekaman audio...' : 'Memuatkan rakaman audio...')}
                  {audioMode === 'synthetic-tts-fallback' &&
                    (locale === 'id-ID'
                      ? '⚠ Bantuan Sebutan Sintetis Peramban (TTS): Rekaman kata tidak dapat dimuat di jaringan ini. Suara sintetis bukan rekaman qari.'
                      : '⚠ Bantuan Sebutan Sintetik Pelayar (TTS): Rakaman perkataan tidak dapat dimuatkan. Suara sintetik bukan rakaman qari.')}
                  {audioMode === 'unavailable' &&
                    (locale === 'id-ID'
                      ? '⚠ Audio pelafalan tidak tersedia di lingkungan peramban ini.'
                      : '⚠ Audio sebutan tidak tersedia dalam persekitaran pelayar ini.')}
                </div>
              )}

              <div
                dir="rtl"
                lang="ar"
                className="p-5 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 text-center font-arabic text-4xl text-[#145A4A] font-bold"
              >
                {activeWord.arabic}
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#145A4A]">
                  {locale === 'id-ID'
                    ? 'Penjelasan Kontekstual & Morfologi'
                    : 'Penjelasan Kontekstual & Morfologi'}
                </h3>
                <p className="text-sm text-[#1C2724]/85 mt-1.5 leading-relaxed">
                  {activeWord.lexicalNote[locale]}
                </p>
                <p className="text-xs text-[#1C2724]/70 mt-2 bg-[#F7F5EF] p-3 rounded-xl border border-[#1C2724]/8">
                  {activeWord.advancedGrammarNote[locale]}
                </p>
              </div>

              {activeWord.rootFamily && (
                <div className="pt-4 border-t border-[#1C2724]/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-[#145A4A]">
                      {dict.common.rootFamily}: {activeWord.rootFamily.rootLatin}
                    </h3>
                    <span
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-xl font-bold text-[#145A4A]"
                    >
                      {activeWord.rootFamily.rootArabic}
                    </span>
                  </div>
                  <p className="text-xs text-[#1C2724]/80 mt-1">
                    {activeWord.rootFamily.linguisticNote[locale]}
                  </p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeWord.rootFamily.relatedForms.map((rel, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 flex items-center justify-between gap-2"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#1C2724]">
                            {rel.transliteration} — {rel.meaning[locale]}
                          </div>
                          <div className="text-[11px] text-[#1C2724]/60">
                            {rel.formType[locale]} · {rel.verseRef}
                          </div>
                        </div>
                        <span
                          dir="rtl"
                          lang="ar"
                          className="font-arabic text-xl text-[#145A4A] font-bold"
                        >
                          {rel.arabic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-[#1C2724]/10 text-xs text-[#1C2724]/60 flex flex-wrap items-center justify-between gap-2">
                <span>
                  {dict.common.verifiedSource}: {activeWord.sourceAttribution[locale]}
                </span>
                <a
                  href={activeWord.sourceUrl || 'https://quran.com/1/1'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#145A4A] font-semibold hover:underline"
                >
                  <span>{locale === 'id-ID' ? 'Rujukan Sumber' : 'Rujukan Sumber'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
