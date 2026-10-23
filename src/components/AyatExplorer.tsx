import React, { useState, useEffect } from 'react';
import {
  AudioPlaybackMode,
  LearnerProgress,
  Lesson,
  LocaleCode,
  TeacherReviewRequest,
  WordToken,
} from '../types/learning';
import { LOCALES } from '../data/locales';
import { LESSONS, WORDS } from '../data/curriculum';
import { audioController } from '../utils/audioPlayer';
import {
  Volume2,
  Pause,
  RotateCcw,
  Bookmark,
  Check,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  UserCheck,
  ExternalLink,
} from 'lucide-react';

interface AyatExplorerProps {
  lesson: Lesson;
  locale: LocaleCode;
  progress: LearnerProgress;
  onSelectLesson: (lessonId: string) => void;
  onToggleBookmark: (wordId: string) => void;
  onSaveReflection: (lessonId: string, text: string) => void;
  onRequestTeacherReview?: (
    lessonId: string,
    focusNote: string,
    focusArea?: TeacherReviewRequest['focusArea'],
    serverTicketId?: string
  ) => void;
  onCompleteLesson: (
    lessonId: string,
    wordIds: string[],
    quizScore: number,
    quizTotal: number
  ) => void;
}

export const AyatExplorer: React.FC<AyatExplorerProps> = ({
  lesson,
  locale,
  progress,
  onSelectLesson,
  onToggleBookmark,
  onSaveReflection,
  onRequestTeacherReview,
  onCompleteLesson,
}) => {
  const dict = LOCALES[locale];
  const lessonWords: WordToken[] = lesson.wordIds
    .map((id) => WORDS.find((w) => w.id === id)!)
    .filter(Boolean);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedWordId, setSelectedWordId] = useState<string>(
    lessonWords[0]?.id || 'w-bismi'
  );
  const [recallChoice, setRecallChoice] = useState<number | null>(null);
  const [audioRate, setAudioRate] = useState<0.75 | 1.0>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioMode, setAudioMode] = useState<AudioPlaybackMode>('idle');
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(0);
  const [showAdvancedGrammar, setShowAdvancedGrammar] = useState<boolean>(false);
  const [reflectionText, setReflectionText] = useState<string>(
    progress.reflections[lesson.id] || ''
  );
  const [reflectionSavedToast, setReflectionSavedToast] = useState<boolean>(false);
  const [teacherNote, setTeacherNote] = useState<string>('');
  const [teacherFocusArea, setTeacherFocusArea] =
    useState<NonNullable<TeacherReviewRequest['focusArea']>>('makhraj');
  const [teacherLoading, setTeacherLoading] = useState<boolean>(false);
  const [teacherError, setTeacherError] = useState<string | null>(null);
  const [teacherSubmittedTicket, setTeacherSubmittedTicket] = useState<string | null>(
    null
  );

  // Practice Step State (3 exercise formats)
  const [mcSelection, setMcSelection] = useState<number | null>(null);
  const [selectedArabicMatchId, setSelectedArabicMatchId] = useState<string | null>(
    null
  );
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [matchErrorToast, setMatchErrorToast] = useState<boolean>(false);
  const [roleSelection, setRoleSelection] = useState<number | null>(null);
  const [lessonCompletedBanner, setLessonCompletedBanner] = useState<boolean>(false);

  useEffect(() => {
    setCurrentStep(1);
    setSelectedWordId(lessonWords[0]?.id || 'w-bismi');
    setRecallChoice(null);
    setMcSelection(null);
    setSelectedArabicMatchId(null);
    setMatchedPairIds([]);
    setRoleSelection(null);
    setLessonCompletedBanner(false);
    setPlaybackSeconds(0);
    setAudioMode('idle');
    setTeacherNote('');
    setTeacherError(null);
    setTeacherSubmittedTicket(null);
    setReflectionText(progress.reflections[lesson.id] || '');
  }, [lesson.id]);

  useEffect(() => {
    if (!isPlaying) return;
    const total = lesson.audioDurationSeconds || 5;
    const interval = setInterval(() => {
      setPlaybackSeconds((prev) => {
        if (prev >= total) {
          return total;
        }
        return Number((prev + 0.25).toFixed(2));
      });
    }, 250);
    return () => clearInterval(interval);
  }, [isPlaying, lesson.audioDurationSeconds]);

  const activeWord =
    lessonWords.find((w) => w.id === selectedWordId) || lessonWords[0];

  const fontSizeClass =
    progress.arabicFontScale === 'xlarge'
      ? 'text-4xl sm:text-5xl'
      : progress.arabicFontScale === 'normal'
      ? 'text-2xl sm:text-3xl'
      : 'text-3xl sm:text-4xl';

  const stepsMeta = [
    { step: 1, label: locale === 'id-ID' ? '1. Ingat' : '1. Imbas' },
    { step: 2, label: locale === 'id-ID' ? '2. Dengar' : '2. Dengar' },
    { step: 3, label: locale === 'id-ID' ? '3. Kata Arab' : '3. Perkataan' },
    { step: 4, label: locale === 'id-ID' ? '4. Struktur' : '4. Struktur' },
    { step: 5, label: locale === 'id-ID' ? '5. Konteks' : '5. Konteks' },
    { step: 6, label: locale === 'id-ID' ? '6. Latihan' : '6. Latihan' },
    { step: 7, label: locale === 'id-ID' ? '7. Ulasan' : '7. Ulang Kaji' },
  ];

  const handlePlayPhrase = () => {
    if (isPlaying) {
      audioController.stop();
      setIsPlaying(false);
      return;
    }
    setPlaybackSeconds(0);
    audioController.speakArabic(
      lesson.arabicPhrase,
      audioRate,
      undefined,
      () => setIsPlaying(true),
      () => {
        setIsPlaying(false);
        setPlaybackSeconds(lesson.audioDurationSeconds || 5);
      },
      lesson.id,
      lesson.audioUrl,
      (mode) => setAudioMode(mode)
    );
  };

  const handlePlayWord = (word: WordToken) => {
    audioController.playWordAudio(
      word.id,
      word.arabic,
      audioRate,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      word.audioUrl,
      (mode) => setAudioMode(mode)
    );
  };

  const handleSubmitTeacherReview = async () => {
    if (!teacherNote.trim() || teacherLoading) return;
    setTeacherLoading(true);
    setTeacherError(null);
    try {
      const response = await fetch('/api/teacher-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: lesson.id,
          verseRef: lesson.verseRef,
          focusArea: teacherFocusArea,
          focusNote: teacherNote.trim(),
          learnerName: progress.user?.name || 'Pembelajar Tamu',
          learnerEmail: progress.user?.email || '',
          locale,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(
          data.error ||
            (locale === 'id-ID'
              ? 'Gagal mengirim permohonan ke server.'
              : 'Gagal menghantar permohonan ke pelayan.')
        );
      }
      onRequestTeacherReview?.(
        lesson.id,
        teacherNote.trim(),
        teacherFocusArea,
        data.request?.id
      );
      setTeacherSubmittedTicket(data.request?.id || 'TR-RECORDED');
      setTeacherNote('');
    } catch (err: any) {
      setTeacherError(
        err?.message ||
          (locale === 'id-ID'
            ? 'Gagal terhubung ke server antrean pengajar. Silakan coba lagi.'
            : 'Gagal menghubungi pelayan giliran guru. Sila cuba lagi.')
      );
    } finally {
      setTeacherLoading(false);
    }
  };

  const handleMatchMeaningClick = (pairId: string) => {
    if (!selectedArabicMatchId) return;
    if (selectedArabicMatchId === pairId) {
      if (!matchedPairIds.includes(pairId)) {
        setMatchedPairIds([...matchedPairIds, pairId]);
      }
      setSelectedArabicMatchId(null);
      setMatchErrorToast(false);
    } else {
      setMatchErrorToast(true);
    }
  };

  const computeQuizScore = () => {
    let score = 0;
    if (mcSelection === lesson.practice.multipleChoice.correctIndex) score += 1;
    if (matchedPairIds.length === lesson.practice.matching.pairs.length) score += 1;
    if (roleSelection === lesson.practice.roleIdentification.correctIndex)
      score += 1;
    return score;
  };

  const handleFinishLesson = () => {
    const score = computeQuizScore();
    onCompleteLesson(lesson.id, lesson.wordIds, score, 3);
    setLessonCompletedBanner(true);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Top Lesson Selector & Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#1C2724]/12 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#1C2724]/10">
          <div>
            <div className="text-xs text-[#1C2724]/65 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#145A4A]">Ayat Explorer</span>
              <span aria-hidden="true">·</span>
              <span>{lesson.verseRef}</span>
              <span aria-hidden="true">·</span>
              <span>
                {lesson.durationMinutes} {locale === 'id-ID' ? 'menit' : 'minit'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="px-2 py-0.5 rounded-md bg-[#F7F5EF] border border-[#1C2724]/10 font-medium text-[#1C2724]/80">
                {lesson.editorialStatus === 'verified-source'
                  ? locale === 'id-ID'
                    ? 'Teks & Terjemahan Rujukan Resmi (Kemenag/JAKIM)'
                    : 'Teks & Terjemahan Rujukan Rasmi (JAKIM/Kemenag)'
                  : locale === 'id-ID'
                  ? 'Draf Kurikulum Internal — Menunggu Tinjauan Ahli'
                  : 'Draf Kurikulum Dalaman — Menunggu Semakan Pakar'}
              </span>
              {lesson.sourceUrl && (
                <>
                  <span aria-hidden="true">·</span>
                  <a
                    href={lesson.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#145A4A] font-semibold hover:underline"
                  >
                    <span>{locale === 'id-ID' ? 'Cek Sumber Ayat' : 'Semak Sumber Ayat'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1C2724] mt-1">
              {lesson.title[locale]}
            </h1>
            <p className="text-xs sm:text-sm text-[#1C2724]/75 mt-1">
              {lesson.subtitle[locale]}
            </p>
          </div>

          {/* Quick Lesson Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto min-w-0">
            <label
              htmlFor="explorer-lesson-select"
              className="text-xs font-semibold text-[#1C2724]/70 whitespace-nowrap shrink-0"
            >
              {locale === 'id-ID' ? 'Pilih Pelajaran:' : 'Pilih Pelajaran:'}
            </label>
            <select
              id="explorer-lesson-select"
              value={lesson.id}
              onChange={(e) => onSelectLesson(e.target.value)}
              className="w-full sm:w-auto max-w-full truncate text-xs sm:text-sm bg-[#F7F5EF] border border-[#1C2724]/15 rounded-xl px-3 py-2 font-medium text-[#1C2724] focus:outline-2 focus:outline-[#145A4A]"
            >
              {LESSONS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.verseRef} — {l.title[locale]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 7-Step Interactive Stepper */}
        <div
          role="tablist"
          aria-label="Lesson Steps"
          className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1"
        >
          {stepsMeta.map((s) => {
            const active = currentStep === s.step;
            const passed = currentStep > s.step;
            return (
              <button
                key={s.step}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setCurrentStep(s.step)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  active
                    ? 'bg-[#145A4A] text-white'
                    : passed
                    ? 'bg-[#DDEBE3] text-[#145A4A]'
                    : 'bg-[#F7F5EF] text-[#1C2724]/70 hover:text-[#1C2724]'
                }`}
              >
                {passed && <Check className="w-3.5 h-3.5" />}
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Workspace */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#1C2724]/12">
        {/* STEP 1: RECALL */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <div className="text-xs font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? 'Langkah 1 dari 7 · Pengingatan Aktif (Recall)'
                  : 'Langkah 1 daripada 7 · Ingatan Aktif (Recall)'}
              </div>
              <h2 className="text-xl font-bold text-[#1C2724] mt-1">
                {locale === 'id-ID'
                  ? 'Segarkan ingatan sebelum masuk ke ayat baru'
                  : 'Segarkan ingatan sebelum memulakan ayat baharu'}
              </h2>
            </div>

            {lesson.recall.arabicPrompt && (
              <div
                dir="rtl"
                lang="ar"
                className="p-5 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 text-center font-arabic text-3xl sm:text-4xl text-[#145A4A]"
              >
                {lesson.recall.arabicPrompt}
              </div>
            )}

            <p className="text-sm sm:text-base font-semibold text-[#1C2724]">
              {lesson.recall.prompt[locale]}
            </p>

            <div className="space-y-3">
              {lesson.recall.options.map((opt, idx) => {
                const isSelected = recallChoice === idx;
                const isRight = idx === lesson.recall.correctIndex;
                let style =
                  'bg-[#F7F5EF] border-[#1C2724]/12 text-[#1C2724] hover:bg-[#DDEBE3]/50';
                if (recallChoice !== null) {
                  if (isRight) {
                    style = 'bg-[#DDEBE3] border-[#145A4A] text-[#145A4A] font-semibold';
                  } else if (isSelected) {
                    style = 'bg-amber-50 border-amber-400 text-amber-950';
                  }
                }
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setRecallChoice(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-colors flex items-center justify-between gap-3 ${style}`}
                  >
                    <span>{opt[locale]}</span>
                    {recallChoice !== null && isRight && (
                      <CheckCircle2 className="w-4 h-4 text-[#145A4A] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {recallChoice !== null && (
              <div className="p-4 rounded-xl bg-[#DDEBE3]/60 border border-[#145A4A]/25 text-xs sm:text-sm text-[#1C2724] leading-relaxed">
                <strong className="text-[#145A4A] block mb-1">
                  {recallChoice === lesson.recall.correctIndex
                    ? locale === 'id-ID'
                      ? 'Tepat Sekali!'
                      : 'Tepat Sekali!'
                    : locale === 'id-ID'
                    ? 'Catatan Pengingat:'
                    : 'Nota Peringatan:'}
                </strong>
                {lesson.recall.explanation[locale]}
              </div>
            )}
          </div>
        )}

        {/* STEP 2: LISTEN */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <div className="text-xs font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? 'Langkah 2 dari 7 · Dengarkan & Perhatikan Harakat'
                  : 'Langkah 2 daripada 7 · Dengar & Perhatikan Baris Bacaan'}
              </div>
              <h2 className="text-xl font-bold text-[#1C2724] mt-1">
                {locale === 'id-ID'
                  ? 'Dengarkan pelafalan ayat secara utuh'
                  : 'Dengar sebutan ayat secara keseluruhan'}
              </h2>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F5EF] border border-[#1C2724]/10 text-center">
              <p
                dir="rtl"
                lang="ar"
                className={`font-arabic ${fontSizeClass} text-[#1C2724] leading-loose`}
              >
                {lesson.arabicPhrase}
              </p>
              {progress.showTransliteration && (
                <p className="text-sm text-[#1C2724]/70 mt-3 font-medium">
                  {lesson.transliterationPhrase}
                </p>
              )}
              <p className="text-sm sm:text-base text-[#145A4A] font-semibold mt-4">
                “{lesson.verifiedTranslation[locale]}”
              </p>
              <p className="text-xs text-[#1C2724]/55 mt-1">
                {lesson.translationSource[locale]}
              </p>
            </div>

            {/* Accessible Audio Player Controls with Playback Position Bar */}
            <div className="p-5 rounded-xl bg-white border border-[#1C2724]/12 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePlayPhrase}
                    className="px-4 py-2.5 rounded-xl bg-[#145A4A] text-white text-xs sm:text-sm font-semibold hover:bg-[#10483B] transition-colors inline-flex items-center gap-2"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                    <span>
                      {isPlaying ? dict.common.playingAudio : dict.common.listenAudio}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      audioController.stop();
                      setIsPlaying(false);
                      setPlaybackSeconds(0);
                      setTimeout(handlePlayPhrase, 60);
                    }}
                    aria-label={locale === 'id-ID' ? 'Ulangi Audio' : 'Ulang Audio'}
                    className="p-2.5 rounded-xl bg-[#F7F5EF] text-[#1C2724] hover:bg-[#DDEBE3] border border-[#1C2724]/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#1C2724]/65">
                    {locale === 'id-ID' ? 'Kecepatan:' : 'Kelajuan:'}
                  </span>
                  {([0.75, 1.0] as const).map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setAudioRate(rate)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                        audioRate === rate
                          ? 'bg-[#145A4A] text-white border-[#145A4A]'
                          : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/10'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Honest Live Audio Mode Indicator */}
              {audioMode !== 'idle' && (
                <div
                  role="status"
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                    audioMode === 'verified-recording'
                      ? 'bg-[#DDEBE3]/60 border-[#145A4A]/30 text-[#145A4A]'
                      : audioMode === 'loading'
                      ? 'bg-[#F7F5EF] border-[#1C2724]/15 text-[#1C2724]/75'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    {audioMode === 'verified-recording' &&
                      (locale === 'id-ID'
                        ? 'Memutar rekaman tilawah terverifikasi (Syaikh Mishary Rashid Alafasy — EveryAyah / Quran.com).'
                        : 'Memainkan rakaman tilawah yang disahkan (Syaikh Mishary Rashid Alafasy — EveryAyah / Quran.com).')}
                    {audioMode === 'loading' &&
                      (locale === 'id-ID'
                        ? 'Memuat berkas rekaman audio tilawah...'
                        : 'Memuatkan fail rakaman audio tilawah...')}
                    {audioMode === 'synthetic-tts-fallback' &&
                      (locale === 'id-ID'
                        ? 'Bantuan Sebutan Sintetis Peramban (TTS Bahasa Arab): Rekaman tilawah qari tidak dapat dimuat di jaringan ini. Suara sintetis peramban hanya untuk bantuan bunyi dasar dan BUKAN tilawah Al-Qur’an.'
                        : 'Bantuan Sebutan Sintetik Pelayar (TTS Bahasa Arab): Rakaman tilawah qari tidak dapat dimuatkan pada rangkaian ini. Suara sintetik pelayar hanyalah bantuan bunyi asas dan BUKAN tilawah al-Quran.')}
                    {audioMode === 'unavailable' &&
                      (locale === 'id-ID'
                        ? 'Audio Tilawah Tidak Tersedia: Berkas rekaman qari tidak dapat dijangkau dari jaringan ini dan peramban tidak memiliki suara Bahasa Arab. Kami tidak memutar nada musik sintetis sebagai pengganti ayat.'
                        : 'Audio Tilawah Tidak Tersedia: Fail rakaman qari tidak dapat dicapai daripada rangkaian ini dan pelayar tidak mempunyai suara Bahasa Arab. Kami tidak memainkan nada muzik sintetik sebagai pengganti ayat.')}
                  </div>
                </div>
              )}

              {/* Playback Position Scrub Bar */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#1C2724]/8">
                <label htmlFor="audio-playback-position" className="sr-only">
                  {locale === 'id-ID' ? 'Posisi Pemutaran Audio' : 'Kedudukan Main Balik Audio'}
                </label>
                <span className="text-xs font-mono text-[#1C2724]/65 tabular-nums">
                  0:0{Math.floor(playbackSeconds)}
                </span>
                <input
                  id="audio-playback-position"
                  type="range"
                  min={0}
                  max={lesson.audioDurationSeconds || 5}
                  step={0.25}
                  value={playbackSeconds}
                  onChange={(e) => setPlaybackSeconds(Number(e.target.value))}
                  className="flex-1 accent-[#145A4A] h-1.5 bg-[#DDEBE3] rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-[#1C2724]/65 tabular-nums">
                  0:0{lesson.audioDurationSeconds || 5}
                </span>
              </div>
            </div>

            <div className="text-xs text-[#1C2724]/65 flex flex-wrap items-center justify-between gap-2 bg-[#F7F5EF] px-3.5 py-2.5 rounded-xl border border-[#1C2724]/10">
              <span>
                <strong>{locale === 'id-ID' ? 'Sumber Audio:' : 'Sumber Audio:'}</strong>{' '}
                {lesson.audioReciter}
              </span>
              <span>
                <strong>{locale === 'id-ID' ? 'Lisensi:' : 'Lesen:'}</strong>{' '}
                {lesson.audioLicense}
              </span>
            </div>

            {/* Path B Human Teacher (Ustaz/Talaqqi) Review Request Queue Workflow */}
            {lesson.pathwayId === 'quran-reading' && (
              <div className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#D8A75B]/50 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#145A4A]">
                    <UserCheck className="w-4 h-4 text-[#D8A75B]" />
                    <span>
                      {locale === 'id-ID'
                        ? 'Antrean Permohonan Semakan Bacaan bersama Pengajar (Talaqqi)'
                        : 'Giliran Permohonan Semakan Bacaan bersama Guru (Talaqqi)'}
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-[#1C2724]/10 text-[#1C2724]/70">
                    {locale === 'id-ID'
                      ? 'Sistem Antrean Permohonan (Belum Dijadwalkan)'
                      : 'Sistem Giliran Permohonan (Belum Dijadualkan)'}
                  </span>
                </div>
                <p className="text-xs text-[#1C2724]/80 leading-relaxed">
                  {locale === 'id-ID'
                    ? 'Aplikasi ini tidak menilai tajwid atau makhraj secara otomatis. Kirim catatan bagian bacaan yang ingin Anda tanyakan ke antrean tinjauan pengajar di server:'
                    : 'Aplikasi ini tidak menilai tajwid atau makhraj secara automatik. Hantar nota bahagian bacaan yang ingin anda tanyakan ke dalam giliran semakan guru di pelayan:'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <select
                    aria-label={locale === 'id-ID' ? 'Area Fokus Tajwid' : 'Fokus Tajwid'}
                    value={teacherFocusArea}
                    onChange={(e) =>
                      setTeacherFocusArea(
                        e.target.value as NonNullable<TeacherReviewRequest['focusArea']>
                      )
                    }
                    className="px-3 py-2 text-xs rounded-xl bg-white border border-[#1C2724]/15 font-medium text-[#1C2724]"
                  >
                    <option value="makhraj">
                      {locale === 'id-ID' ? 'Fokus: Makharijul Huruf' : 'Fokus: Makhraj Huruf'}
                    </option>
                    <option value="mad-waqaf">
                      {locale === 'id-ID' ? 'Fokus: Panjang Mad & Waqaf' : 'Fokus: Kadar Mad & Waqaf'}
                    </option>
                    <option value="ghunnah">
                      {locale === 'id-ID' ? 'Fokus: Tasydid & Dengung' : 'Fokus: Sabdu & Dengung'}
                    </option>
                    <option value="fluency">
                      {locale === 'id-ID' ? 'Fokus: Kelancaran Washal' : 'Fokus: Kelancaran Wasal'}
                    </option>
                  </select>
                  <input
                    type="text"
                    value={teacherNote}
                    onChange={(e) => setTeacherNote(e.target.value)}
                    placeholder={
                      locale === 'id-ID'
                        ? 'Misal: Mohon koreksi bunyi huruf ح dan ع saya...'
                        : 'Cth: Mohon semak sebutan huruf ح dan ع saya...'
                    }
                    className="sm:col-span-2 px-3.5 py-2 text-xs rounded-xl bg-white border border-[#1C2724]/15 focus:outline-2 focus:outline-[#145A4A]"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    disabled={teacherLoading || !teacherNote.trim()}
                    onClick={handleSubmitTeacherReview}
                    className="px-4 py-2 text-xs font-semibold bg-[#145A4A] text-white rounded-xl hover:bg-[#10483B] disabled:opacity-50 whitespace-nowrap shrink-0"
                  >
                    {teacherLoading
                      ? locale === 'id-ID'
                        ? 'Mengirim ke Antrean Server...'
                        : 'Menghantar ke Giliran Pelayan...'
                      : locale === 'id-ID'
                      ? 'Kirim Permohonan ke Antrean'
                      : 'Hantar Permohonan ke Giliran'}
                  </button>

                  {teacherError && (
                    <div className="flex items-center gap-2 text-xs text-red-700">
                      <span>{teacherError}</span>
                      <button
                        type="button"
                        onClick={handleSubmitTeacherReview}
                        className="underline font-semibold"
                      >
                        {locale === 'id-ID' ? 'Coba Lagi' : 'Cuba Lagi'}
                      </button>
                    </div>
                  )}
                </div>

                {teacherSubmittedTicket && (
                  <div
                    role="status"
                    className="p-3 rounded-xl bg-white border border-[#145A4A]/25 text-xs text-[#1C2724] space-y-1"
                  >
                    <div className="font-bold text-[#145A4A]">
                      {locale === 'id-ID'
                        ? `✓ Permohonan Tercatat dalam Antrean Server (ID: #${teacherSubmittedTicket})`
                        : `✓ Permohonan Direkodkan dalam Giliran Pelayan (ID: #${teacherSubmittedTicket})`}
                    </div>
                    <p className="text-[#1C2724]/75">
                      {locale === 'id-ID'
                        ? 'Status: Diterima dalam antrean permohonan (belum berupa jadwal sesi langsung). Permohonan disimpan di basis data server lokal aplikasi ini.'
                        : 'Status: Diterima dalam giliran permohonan (belum merupakan jadual sesi langsung). Permohonan disimpan dalam pangkalan data pelayan aplikasi ini.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: EXPLORE THE ARABIC WORD-BY-WORD */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-[#145A4A]">
                  {locale === 'id-ID'
                    ? 'Langkah 3 dari 7 · Eksplorasi Kata & Keluarga Akar'
                    : 'Langkah 3 daripada 7 · Terokai Perkataan & Keluarga Akar'}
                </div>
                <h2 className="text-xl font-bold text-[#1C2724] mt-1">
                  {locale === 'id-ID'
                    ? 'Klik setiap kata Arab untuk memeriksa arti, peran kalimat, dan akarnya'
                    : 'Pilih setiap perkataan Arab untuk meneliti makna, fungsi ayat dan akarnya'}
                </h2>
              </div>
            </div>

            {/* RTL Selectable Word Tokens */}
            <div
              dir="rtl"
              lang="ar"
              className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#1C2724]/10 flex flex-wrap items-center justify-center gap-4"
            >
              {lessonWords.map((word) => {
                const isSelected = word.id === activeWord.id;
                return (
                  <button
                    key={word.id}
                    type="button"
                    onClick={() => {
                      setSelectedWordId(word.id);
                      handlePlayWord(word);
                    }}
                    aria-pressed={isSelected}
                    className={`px-5 py-3 rounded-xl transition-all text-center ${
                      isSelected
                        ? 'bg-[#145A4A] text-white shadow-xs'
                        : 'bg-white text-[#1C2724] hover:bg-[#DDEBE3]/70 border border-[#1C2724]/12'
                    }`}
                  >
                    <span className={`block font-arabic ${fontSizeClass} leading-relaxed`}>
                      {word.arabic}
                    </span>
                    {progress.showTransliteration && (
                      <span
                        dir="ltr"
                        className={`block text-xs mt-1 font-medium ${
                          isSelected ? 'text-[#DDEBE3]' : 'text-[#1C2724]/65'
                        }`}
                      >
                        {word.transliteration}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Anchored Word Detail Panel */}
            {activeWord && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-[#F7F5EF]/70 rounded-2xl p-6 border border-[#1C2724]/12">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-[#1C2724]/65">
                        <span>{activeWord.grammaticalRole[locale]}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{activeWord.verseRef}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1C2724] mt-1">
                        {activeWord.transliteration} — “{activeWord.contextualMeaning[locale]}”
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePlayWord(activeWord)}
                        aria-label={`${dict.common.listenAudio} ${activeWord.transliteration}`}
                        className="p-2 rounded-lg bg-white border border-[#1C2724]/12 text-[#145A4A] hover:bg-[#DDEBE3]"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleBookmark(activeWord.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                          progress.bookmarkedWordIds.includes(activeWord.id)
                            ? 'bg-[#145A4A] text-white border-[#145A4A]'
                            : 'bg-white text-[#1C2724] border-[#1C2724]/15 hover:bg-[#DDEBE3]'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>
                          {progress.bookmarkedWordIds.includes(activeWord.id)
                            ? dict.common.bookmarked
                            : dict.common.bookmarkWord}
                        </span>
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-[#1C2724]/85 mt-4 leading-relaxed">
                    {activeWord.lexicalNote[locale]}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#1C2724]/10 text-xs text-[#1C2724]/65 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-semibold text-[#145A4A]">
                        {dict.common.verifiedSource}:
                      </span>{' '}
                      {activeWord.sourceAttribution[locale]}
                    </div>
                    {activeWord.sourceUrl && (
                      <a
                        href={activeWord.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#145A4A] font-semibold hover:underline"
                      >
                        <span>{locale === 'id-ID' ? 'Buka Sumber' : 'Buka Sumber'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Root Family Visual Explorer */}
                <div className="lg:col-span-5 bg-[#F7F5EF]/70 rounded-2xl p-6 border border-[#1C2724]/12">
                  {activeWord.rootFamily ? (
                    <div>
                      <div className="text-xs font-semibold text-[#145A4A]">
                        {dict.common.rootFamily}
                      </div>
                      <div className="mt-2 flex items-center justify-between bg-white p-3.5 rounded-xl border border-[#1C2724]/10">
                        <div>
                          <div className="text-xs text-[#1C2724]/60">
                            {locale === 'id-ID' ? 'Akar Tiga Huruf' : 'Akar Tiga Huruf'} (
                            {activeWord.rootFamily.rootLatin})
                          </div>
                          <div className="text-sm font-bold text-[#1C2724]">
                            {activeWord.rootFamily.coreConcept[locale]}
                          </div>
                        </div>
                        <span
                          dir="rtl"
                          lang="ar"
                          className="font-arabic text-2xl font-bold text-[#145A4A]"
                        >
                          {activeWord.rootFamily.rootArabic}
                        </span>
                      </div>

                      <p className="text-xs text-[#1C2724]/75 mt-3 leading-relaxed">
                        {activeWord.rootFamily.linguisticNote[locale]}
                      </p>

                      <div className="mt-3 space-y-2">
                        {activeWord.rootFamily.relatedForms.map((rel, i) => (
                          <div
                            key={i}
                            className="p-3 bg-white rounded-xl border border-[#1C2724]/8 flex items-center justify-between gap-2"
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
                  ) : (
                    <div className="h-full flex flex-col justify-center">
                      <div className="text-xs font-semibold text-[#145A4A]">
                        {locale === 'id-ID'
                          ? 'Partikel & Kata Penghubung (Harf)'
                          : 'Partikel & Kata Penghubung (Harf)'}
                      </div>
                      <p className="text-xs sm:text-sm text-[#1C2724]/80 mt-2 leading-relaxed">
                        {locale === 'id-ID'
                          ? 'Kata ini merupakan partikel/kata ganti struktural yang menghubungkan makna antarkata di dalam kalimat Al-Qur’an.'
                          : 'Perkataan ini merupakan partikel/kata ganti nama struktural yang menghubungkan makna antara perkataan dalam ayat al-Quran.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: UNDERSTAND THE STRUCTURE */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <div className="text-xs font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? 'Langkah 4 dari 7 · Pahami Struktur Kalimat'
                  : 'Langkah 4 daripada 7 · Fahami Binaan Ayat'}
              </div>
              <h2 className="text-xl font-bold text-[#1C2724] mt-1">
                {lesson.grammarConceptTitle[locale]}
              </h2>
              <p className="text-sm text-[#1C2724]/80 mt-2 leading-relaxed max-w-3xl">
                {lesson.structureSummary[locale]}
              </p>
            </div>

            {/* Visual Structure Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lesson.structureSegments.map((seg, idx) => (
                <div
                  key={idx}
                  className="bg-[#F7F5EF] rounded-xl p-4 border border-[#1C2724]/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#1C2724]/8">
                      <span className="text-xs font-bold text-[#145A4A]">
                        {seg.roleLabel[locale]}
                      </span>
                      <span className="text-[11px] text-[#1C2724]/60 uppercase">
                        {seg.category}
                      </span>
                    </div>
                    <div
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-3xl text-[#1C2724] my-3 text-center"
                    >
                      {seg.arabic}
                    </div>
                  </div>
                  <p className="text-xs text-[#1C2724]/80 leading-relaxed">
                    {seg.functionExplanation[locale]}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-[#F7F5EF] rounded-2xl p-6 border border-[#1C2724]/10">
              <h3 className="text-base font-bold text-[#1C2724]">
                {locale === 'id-ID' ? 'Penjelasan Inti' : 'Penjelasan Teras'}
              </h3>
              <p className="text-sm text-[#1C2724]/85 mt-2 leading-relaxed">
                {lesson.grammarConceptBody[locale]}
              </p>

              <div className="mt-4 pt-3 border-t border-[#1C2724]/10">
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
                    ? 'Buka Catatan Nahwu Lanjutan (Untuk Pembelajar Menengah)'
                    : 'Buka Nota Nahu Lanjutan (Untuk Pelajar Pertengahan)'}
                </button>
                {showAdvancedGrammar && (
                  <p className="mt-2 p-3.5 bg-white rounded-xl border border-[#1C2724]/10 text-xs text-[#1C2724]/80 leading-relaxed">
                    {lesson.advancedGrammarBody[locale]}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: CONTEXT & PERSONAL REFLECTION */}
        {currentStep === 5 && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <div className="text-xs font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? 'Langkah 5 dari 7 · Terjemahan Resmi, Konteks Tafsir & Refleksi'
                  : 'Langkah 5 daripada 7 · Terjemahan Rasmi, Konteks Tafsir & Refleksi'}
              </div>
              <h2 className="text-xl font-bold text-[#1C2724] mt-1">
                {locale === 'id-ID'
                  ? 'Memahami makna ayat dengan sumber yang jelas'
                  : 'Memahami makna ayat dengan rujukan yang jelas'}
              </h2>
            </div>

            {/* 1. Verified Translation */}
            <div className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#1C2724]/10">
              <div className="text-xs font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? '1. Terjemahan Resmi Terverifikasi'
                  : '1. Terjemahan Rasmi Disahkan'}
              </div>
              <p
                dir="rtl"
                lang="ar"
                className="font-arabic text-2xl sm:text-3xl text-[#1C2724] my-3"
              >
                {lesson.arabicPhrase}
              </p>
              <p className="text-sm sm:text-base font-semibold text-[#1C2724]">
                “{lesson.verifiedTranslation[locale]}”
              </p>
              <p className="text-xs text-[#1C2724]/60 mt-1">
                {lesson.translationSource[locale]}
              </p>
            </div>

            {/* 2. Verified Tafsir Summary */}
            <div className="p-5 rounded-2xl bg-white border border-[#1C2724]/12">
              <div className="text-xs font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? '2. Ringkasan Konteks dari Rujukan Tafsir'
                  : '2. Ringkasan Konteks daripada Rujukan Tafsir'}
              </div>
              <p className="text-sm text-[#1C2724]/85 mt-2 leading-relaxed">
                {lesson.tafsirContext[locale]}
              </p>
              <p className="text-xs text-[#1C2724]/60 mt-3 pt-2 border-t border-[#1C2724]/8">
                {lesson.tafsirSource[locale]}
              </p>
            </div>

            {/* 3. Clearly Separated Learner Reflection */}
            <div className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#1C2724]/10">
              <label
                htmlFor="learner-reflection-input"
                className="block text-xs font-semibold text-[#1C2724]"
              >
                {lesson.reflectionPrompt[locale]}
              </label>
              <p className="text-[11px] text-[#1C2724]/60 mt-0.5">
                {locale === 'id-ID'
                  ? 'Catatan ini disimpan khusus untuk pengingat belajar pribadi Anda dan bukan merupakan tafsir otoritatif.'
                  : 'Nota ini disimpan khusus sebagai peringatan pembelajaran peribadi anda dan bukannya tafsiran rasmi.'}
              </p>
              <textarea
                id="learner-reflection-input"
                rows={3}
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder={
                  locale === 'id-ID'
                    ? 'Tulis catatan tadabbur atau hal baru yang Anda pelajari hari ini...'
                    : 'Tulis nota penghayatan atau perkara baharu yang anda pelajari hari ini...'
                }
                className="mt-3 w-full rounded-xl bg-white border border-[#1C2724]/15 p-3 text-xs sm:text-sm text-[#1C2724] focus:outline-2 focus:outline-[#145A4A]"
              />
              <div className="mt-2.5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onSaveReflection(lesson.id, reflectionText);
                    setReflectionSavedToast(true);
                    setTimeout(() => setReflectionSavedToast(false), 2500);
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#145A4A] text-white hover:bg-[#10483B] transition-colors"
                >
                  {locale === 'id-ID' ? 'Simpan Catatan Refleksi' : 'Simpan Nota Refleksi'}
                </button>
                {reflectionSavedToast && (
                  <span className="text-xs font-semibold text-[#145A4A]">
                    {locale === 'id-ID' ? '✓ Catatan tersimpan' : '✓ Nota disimpan'}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: PRACTICE (3 EXERCISE FORMATS) */}
        {currentStep === 6 && (
          <div className="space-y-8 max-w-3xl mx-auto">
            <div>
              <div className="text-xs font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? 'Langkah 6 dari 7 · Latihan Pemahaman Terstruktur (3 Format)'
                  : 'Langkah 6 daripada 7 · Latihan Kefahaman Berstruktur (3 Format)'}
              </div>
              <h2 className="text-xl font-bold text-[#1C2724] mt-1">
                {locale === 'id-ID'
                  ? 'Uji pemahaman makna, pasangan kata, dan fungsi kalimat'
                  : 'Uji kefahaman makna, padanan perkataan dan fungsi ayat'}
              </h2>
            </div>

            {/* Format 1: Multiple Choice Meaning/Root */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F7F5EF] border border-[#1C2724]/10">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#145A4A]">
                  {locale === 'id-ID'
                    ? 'Latihan A · Pilih Makna & Akar yang Tepat'
                    : 'Latihan A · Pilih Makna & Akar yang Tepat'}
                </span>
                <span
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl text-[#145A4A] font-bold"
                >
                  {lesson.practice.multipleChoice.arabicFocus}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#1C2724] mb-4">
                {lesson.practice.multipleChoice.question[locale]}
              </p>
              <div className="space-y-2.5">
                {lesson.practice.multipleChoice.options.map((opt, idx) => {
                  const chosen = mcSelection === idx;
                  const right = idx === lesson.practice.multipleChoice.correctIndex;
                  let cls = 'bg-white border-[#1C2724]/12 text-[#1C2724]';
                  if (mcSelection !== null) {
                    if (right) {
                      cls = 'bg-[#DDEBE3] border-[#145A4A] text-[#145A4A] font-semibold';
                    } else if (chosen) {
                      cls = 'bg-amber-50 border-amber-400 text-amber-950';
                    }
                  }
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMcSelection(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${cls}`}
                    >
                      <span>{opt[locale]}</span>
                      {mcSelection !== null && right && (
                        <CheckCircle2 className="w-4 h-4 text-[#145A4A] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              {mcSelection !== null && (
                <p className="mt-3 text-xs text-[#1C2724]/85 bg-white p-3 rounded-xl border border-[#1C2724]/10">
                  {lesson.practice.multipleChoice.feedback[locale]}
                </p>
              )}
            </div>

            {/* Format 2: Match Arabic Words and Meanings */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F7F5EF] border border-[#1C2724]/10">
              <div className="text-xs font-bold text-[#145A4A] mb-1">
                {locale === 'id-ID'
                  ? 'Latihan B · Pasangkan Kata Arab dengan Artinya'
                  : 'Latihan B · Padankan Perkataan Arab dengan Maknanya'}
              </div>
              <p className="text-xs sm:text-sm text-[#1C2724]/80 mb-4">
                {lesson.practice.matching.instruction[locale]}{' '}
                {locale === 'id-ID'
                  ? '(Klik kata Arab di kiri, lalu klik pasangannya di kanan).'
                  : '(Pilih perkataan Arab di kiri, kemudian pilih padanannya di kanan).'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Arabic Column */}
                <div className="space-y-2.5">
                  {lesson.practice.matching.pairs.map((pair) => {
                    const isMatched = matchedPairIds.includes(pair.id);
                    const isSelected = selectedArabicMatchId === pair.id;
                    return (
                      <button
                        key={pair.id}
                        type="button"
                        disabled={isMatched}
                        onClick={() => setSelectedArabicMatchId(pair.id)}
                        className={`w-full p-3 rounded-xl border flex items-center justify-between transition-colors ${
                          isMatched
                            ? 'bg-[#DDEBE3] border-[#145A4A] text-[#145A4A] opacity-80'
                            : isSelected
                            ? 'bg-[#145A4A] text-white border-[#145A4A]'
                            : 'bg-white text-[#1C2724] border-[#1C2724]/12 hover:bg-[#DDEBE3]/40'
                        }`}
                      >
                        <span className="text-xs font-medium">
                          {pair.transliteration}
                        </span>
                        <span dir="rtl" lang="ar" className="font-arabic text-2xl font-bold">
                          {pair.arabic}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Meaning Column */}
                <div className="space-y-2.5">
                  {lesson.practice.matching.pairs
                    .slice()
                    .reverse()
                    .map((pair) => {
                      const isMatched = matchedPairIds.includes(pair.id);
                      return (
                        <button
                          key={pair.id}
                          type="button"
                          disabled={isMatched}
                          onClick={() => handleMatchMeaningClick(pair.id)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between transition-colors ${
                            isMatched
                              ? 'bg-[#DDEBE3] border-[#145A4A] text-[#145A4A] font-semibold'
                              : 'bg-white text-[#1C2724] border-[#1C2724]/12 hover:bg-[#DDEBE3]/40'
                          }`}
                        >
                          <span>{pair.meaning[locale]}</span>
                          {isMatched && <Check className="w-4 h-4 text-[#145A4A]" />}
                        </button>
                      );
                    })}
                </div>
              </div>

              {matchErrorToast && (
                <div className="mt-3 text-xs text-amber-800 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    {locale === 'id-ID'
                      ? 'Pasangan belum tepat, silakan coba pilih arti yang sesuai.'
                      : 'Padanan belum tepat, sila cuba pilih makna yang sesuai.'}
                  </span>
                </div>
              )}
            </div>

            {/* Format 3: Identify Grammatical Role / Sentence Function */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F7F5EF] border border-[#1C2724]/10">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#145A4A]">
                  {locale === 'id-ID'
                    ? 'Latihan C · Identifikasi Peran Kata dalam Ayat'
                    : 'Latihan C · Kenal Pasti Peranan Perkataan dalam Ayat'}
                </span>
                <span
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl text-[#145A4A] font-bold"
                >
                  {lesson.practice.roleIdentification.targetWordArabic}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#1C2724] mb-4">
                {lesson.practice.roleIdentification.question[locale]}
              </p>
              <div className="space-y-2.5">
                {lesson.practice.roleIdentification.options.map((opt, idx) => {
                  const chosen = roleSelection === idx;
                  const right =
                    idx === lesson.practice.roleIdentification.correctIndex;
                  let cls = 'bg-white border-[#1C2724]/12 text-[#1C2724]';
                  if (roleSelection !== null) {
                    if (right) {
                      cls = 'bg-[#DDEBE3] border-[#145A4A] text-[#145A4A] font-semibold';
                    } else if (chosen) {
                      cls = 'bg-amber-50 border-amber-400 text-amber-950';
                    }
                  }
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRoleSelection(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${cls}`}
                    >
                      <span>{opt[locale]}</span>
                      {roleSelection !== null && right && (
                        <CheckCircle2 className="w-4 h-4 text-[#145A4A] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              {roleSelection !== null && (
                <p className="mt-3 text-xs text-[#1C2724]/85 bg-white p-3 rounded-xl border border-[#1C2724]/10">
                  {lesson.practice.roleIdentification.feedback[locale]}
                </p>
              )}
            </div>
          </div>
        )}

        {/* STEP 7: REVIEW & SCHEDULE */}
        {currentStep === 7 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <div className="text-xs font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? 'Langkah 7 dari 7 · Ringkasan & Jadwal Ulasan Berjarak'
                  : 'Langkah 7 daripada 7 · Ringkasan & Jadual Ulang Kaji Berjarak'}
              </div>
              <h2 className="text-xl font-bold text-[#1C2724] mt-1">
                {locale === 'id-ID'
                  ? 'Kosakata yang Anda pelajari di pelajaran ini'
                  : 'Kosa kata yang anda pelajari dalam pelajaran ini'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {lessonWords.map((w) => (
                <div
                  key={w.id}
                  className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-sm font-bold text-[#1C2724]">
                      {w.transliteration} — {w.contextualMeaning[locale]}
                    </div>
                    <div className="text-xs text-[#1C2724]/65 mt-0.5">
                      {w.grammaticalRole[locale]}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-2xl font-bold text-[#145A4A]"
                    >
                      {w.arabic}
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(w.id)}
                      aria-label={`${dict.common.bookmarkWord} ${w.transliteration}`}
                      className={`p-2 rounded-lg border ${
                        progress.bookmarkedWordIds.includes(w.id)
                          ? 'bg-[#145A4A] text-white border-[#145A4A]'
                          : 'bg-white text-[#1C2724] border-[#1C2724]/12'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-[#DDEBE3]/60 border border-[#145A4A]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#145A4A]">
                  {locale === 'id-ID'
                    ? 'Skor Latihan Pemahaman Anda'
                    : 'Skor Latihan Kefahaman Anda'}
                </div>
                <div className="text-sm text-[#1C2724] mt-1 tabular-nums">
                  {computeQuizScore()} / 3{' '}
                  {locale === 'id-ID'
                    ? 'bagian latihan terjawab benar · Kata akan ditambahkan ke antrean Ulasan Berjarak.'
                    : 'bahagian latihan dijawab betul · Perkataan akan dimasukkan ke dalam giliran Ulang Kaji Berjarak.'}
                </div>
              </div>
              <button
                type="button"
                onClick={handleFinishLesson}
                className="px-5 py-3 rounded-xl bg-[#145A4A] text-white text-xs sm:text-sm font-semibold hover:bg-[#10483B] transition-colors whitespace-nowrap shrink-0"
              >
                {dict.common.completeLesson}
              </button>
            </div>

            {lessonCompletedBanner && (
              <div
                role="status"
                className="p-4 rounded-xl bg-[#145A4A] text-white text-xs sm:text-sm flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>
                    {locale === 'id-ID'
                      ? 'Alhamdulillah, pelajaran selesai dan kosakata telah dijadwalkan di Ruang Ulasan!'
                      : 'Alhamdulillah, pelajaran selesai dan kosa kata telah dijadualkan di Ruang Ulang Kaji!'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step Footer Navigation */}
        <div className="mt-8 pt-5 border-t border-[#1C2724]/10 flex items-center justify-between gap-4">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-[#1C2724]/15 text-[#1C2724] disabled:opacity-40 hover:bg-[#F7F5EF]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{dict.common.prevStep}</span>
          </button>

          <span className="text-xs text-[#1C2724]/60 tabular-nums">
            {currentStep} / 7
          </span>

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => Math.min(7, s + 1))}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#145A4A] text-white hover:bg-[#10483B]"
            >
              <span>{dict.common.nextStep}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishLesson}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#145A4A] text-white hover:bg-[#10483B]"
            >
              <BookOpen className="w-4 h-4" />
              <span>{dict.common.completeLesson}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
