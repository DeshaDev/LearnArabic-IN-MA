import React, { useState } from 'react';
import { AudioPlaybackMode, LocaleCode, WordToken } from '../types/learning';
import { LOCALES } from '../data/locales';
import { WORDS } from '../data/curriculum';
import { audioController } from '../utils/audioPlayer';
import { Volume2, Bookmark, ArrowRight, Check, ExternalLink } from 'lucide-react';

interface HeroPreviewProps {
  locale: LocaleCode;
  bookmarkedWordIds: string[];
  onToggleBookmark: (wordId: string) => void;
  onOpenFullLesson: () => void;
}

const PREVIEW_WORD_IDS = ['w-bismi', 'w-allahi', 'w-arrahmani', 'w-arrahimi'];

export const HeroPreview: React.FC<HeroPreviewProps> = ({
  locale,
  bookmarkedWordIds,
  onToggleBookmark,
  onOpenFullLesson,
}) => {
  const dict = LOCALES[locale];
  const previewWords = PREVIEW_WORD_IDS.map(
    (id) => WORDS.find((w) => w.id === id)!
  ).filter(Boolean);

  const [selectedWordId, setSelectedWordId] = useState<string>('w-arrahmani');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<AudioPlaybackMode>('idle');

  const selectedWord: WordToken =
    previewWords.find((w) => w.id === selectedWordId) || previewWords[0];

  const handlePlayPhrase = () => {
    audioController.speakArabic(
      'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
      1.0,
      undefined,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      'lesson-ayah-1',
      'https://everyayah.com/data/Alafasy_128kbps/001001.mp3',
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

  const isBookmarked = bookmarkedWordIds.includes(selectedWord.id);

  return (
    <div className="bg-white rounded-2xl border border-[#1C2724]/12 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#1C2724]/8">
          <div className="text-xs text-[#1C2724]/70 flex items-center gap-2">
            <span className="font-semibold text-[#145A4A]">
              {dict.hero.previewTitle}
            </span>
            <span aria-hidden="true">·</span>
            <span>QS. Al-Fatihah 1:1</span>
          </div>
          <button
            type="button"
            onClick={handlePlayPhrase}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#145A4A] bg-[#DDEBE3] hover:bg-[#cde0d5] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>
              {isPlaying ? dict.common.playingAudio : dict.common.listenAudio}
            </span>
          </button>
        </div>

        <p className="text-xs text-[#1C2724]/70 mt-3 mb-2">
          {dict.hero.previewInstruction}
        </p>

        {audioMode !== 'idle' && (
          <div
            role="status"
            className={`mb-2 px-3 py-2 rounded-xl border text-[11px] leading-relaxed ${
              audioMode === 'verified-recording'
                ? 'bg-[#DDEBE3]/60 border-[#145A4A]/25 text-[#145A4A]'
                : audioMode === 'loading'
                ? 'bg-[#F7F5EF] border-[#1C2724]/15 text-[#1C2724]/75'
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

        {/* Interactive RTL Arabic Word Tokens */}
        <div
          dir="rtl"
          lang="ar"
          className="bg-[#F7F5EF] rounded-xl p-4 sm:p-5 my-3 border border-[#1C2724]/8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {previewWords.map((word) => {
            const isSelected = word.id === selectedWord.id;
            return (
              <button
                key={word.id}
                type="button"
                onClick={() => {
                  setSelectedWordId(word.id);
                  handlePlayWord(word);
                }}
                aria-pressed={isSelected}
                className={`group px-3.5 py-2 rounded-xl transition-all text-center focus-visible:outline-2 focus-visible:outline-[#145A4A] ${
                  isSelected
                    ? 'bg-[#145A4A] text-white shadow-xs'
                    : 'bg-white text-[#1C2724] hover:bg-[#DDEBE3]/60 border border-[#1C2724]/10'
                }`}
              >
                <span className="block font-arabic text-2xl sm:text-3xl leading-relaxed">
                  {word.arabic}
                </span>
                <span
                  dir="ltr"
                  className={`block text-[11px] font-medium mt-0.5 ${
                    isSelected ? 'text-[#DDEBE3]' : 'text-[#1C2724]/60'
                  }`}
                >
                  {word.transliteration}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Word Anchored Inspection Panel */}
        <div className="bg-[#F7F5EF]/70 rounded-xl p-4 border border-[#1C2724]/10 mt-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-[#1C2724]/60">
                <span>{dict.common.wordLabel}</span>
                <span aria-hidden="true"> · </span>
                <span>{selectedWord.transliteration}</span>
                <span aria-hidden="true"> · </span>
                <span>{selectedWord.grammaticalRole[locale]}</span>
              </div>
              <h3 className="text-lg font-bold text-[#1C2724] mt-1">
                “{selectedWord.contextualMeaning[locale]}”
              </h3>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                dir="rtl"
                lang="ar"
                className="font-arabic text-2xl text-[#145A4A] font-bold px-2"
              >
                {selectedWord.arabic}
              </span>
              <button
                type="button"
                onClick={() => onToggleBookmark(selectedWord.id)}
                aria-label={`${dict.common.bookmarkWord} ${selectedWord.transliteration}`}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                  isBookmarked
                    ? 'bg-[#145A4A] text-white border-[#145A4A]'
                    : 'bg-white text-[#1C2724] border-[#1C2724]/15 hover:bg-[#DDEBE3]/50'
                }`}
              >
                {isBookmarked ? (
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

          <p className="text-xs sm:text-sm text-[#1C2724]/80 mt-2.5 leading-relaxed">
            {selectedWord.lexicalNote[locale]}
          </p>

          {selectedWord.rootFamily && (
            <div className="mt-3 pt-3 border-t border-[#1C2724]/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="text-[#1C2724]/75">
                <span className="font-semibold text-[#145A4A]">
                  {dict.common.rootFamily}:
                </span>{' '}
                <span dir="rtl" lang="ar" className="font-arabic text-base font-bold mx-1">
                  {selectedWord.rootFamily.rootArabic}
                </span>{' '}
                <span>({selectedWord.rootFamily.coreConcept[locale]})</span>
              </div>
              <span className="text-[#1C2724]/55 inline-flex items-center gap-1.5">
                <span>{selectedWord.sourceAttribution[locale]}</span>
                <a
                  href={selectedWord.sourceUrl || 'https://quran.com/1/1'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#145A4A] font-semibold hover:underline inline-flex items-center gap-0.5"
                >
                  <span>(Quran.com)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Progress & Action Bar */}
      <div className="mt-4 pt-3 border-t border-[#1C2724]/10 flex items-center justify-between gap-4">
        <div className="text-xs text-[#1C2724]/65 tabular-nums">
          <span>
            {locale === 'id-ID'
              ? 'Langkah 3 dari 7 · Eksplorasi Kata'
              : 'Langkah 3 daripada 7 · Terokai Perkataan'}
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenFullLesson}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#145A4A] hover:underline whitespace-nowrap shrink-0"
        >
          <span>{dict.sampleLesson.openFullExplorer}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
