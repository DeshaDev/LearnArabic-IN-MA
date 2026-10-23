import React from 'react';
import { LearnerProgress, LocaleCode } from '../types/learning';
import { LESSONS, WORDS } from '../data/curriculum';
import { getDueReviewItems } from '../utils/learningEngine';
import { AppScreen } from './Header';
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Compass,
  Clock,
  Sparkles,
  UserCheck,
} from 'lucide-react';

interface DashboardViewProps {
  locale: LocaleCode;
  progress: LearnerProgress;
  onStartLesson: (lessonId: string) => void;
  onNavigate: (screen: AppScreen) => void;
  onOpenOnboarding: () => void;
  onToggleDemoMode?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  locale,
  progress,
  onStartLesson,
  onNavigate,
  onOpenOnboarding,
  onToggleDemoMode,
}) => {
  const dueItems = getDueReviewItems(progress.reviewQueue, Date.now());
  const recommendedLesson =
    LESSONS.find(
      (l) =>
        l.pathwayId === progress.activePathway &&
        !progress.completedLessonIds.includes(l.id)
    ) || LESSONS[0];

  const learnedWords = WORDS.filter((w) =>
    progress.learnedWordIds.includes(w.id)
  );
  const bookmarkedWords = WORDS.filter((w) =>
    progress.bookmarkedWordIds.includes(w.id)
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      {/* Explicit Demo Mode Banner */}
      {progress.isDemoMode && (
        <div
          role="status"
          className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D8A75B] shrink-0" />
            <span>
              {locale === 'id-ID'
                ? 'Mode Data Demo Aktif: Menampilkan contoh kemajuan belajar, kata tersimpan, dan jadwal ulasan untuk keperluan presentasi.'
                : 'Mod Data Demo Aktif: Memaparkan contoh kemajuan pembelajaran, perkataan disimpan dan jadual ulang kaji untuk tujuan pembentangan.'}
            </span>
          </div>
          {onToggleDemoMode && (
            <button
              type="button"
              onClick={onToggleDemoMode}
              className="px-3 py-1.5 rounded-lg bg-white text-amber-950 font-semibold border border-amber-300 hover:bg-amber-100 text-xs"
            >
              {locale === 'id-ID'
                ? 'Kembali ke Status Awal Kosong'
                : 'Kembali kepada Keadaan Awal Kosong'}
            </button>
          )}
        </div>
      )}

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#145A4A]">
            {locale === 'id-ID' ? 'Ruang Belajar Pribadi' : 'Ruang Pembelajaran Peribadi'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-1">
            {locale === 'id-ID'
              ? 'Lanjutkan perjalanan memahami Al-Qur’an'
              : 'Teruskan perjalanan memahami al-Quran'}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {!progress.isDemoMode && onToggleDemoMode && (
            <button
              type="button"
              onClick={onToggleDemoMode}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#F7F5EF] border border-[#1C2724]/15 text-[#145A4A] hover:bg-[#DDEBE3]"
            >
              <Sparkles className="w-4 h-4 text-[#D8A75B]" />
              <span>
                {locale === 'id-ID' ? 'Muat Data Demo' : 'Muatkan Data Demo'}
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={onOpenOnboarding}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-[#1C2724]/15 text-[#1C2724] hover:bg-[#DDEBE3]/60"
          >
            <Compass className="w-4 h-4 text-[#145A4A]" />
            <span>
              {locale === 'id-ID'
                ? 'Sesuaikan Ulang Jalur & Target'
                : 'Sesuaikan Semula Laluan & Sasaran'}
            </span>
          </button>
        </div>
      </div>

      {/* Top Action Grid: Recommended Next Lesson & Spaced Repetition Review */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Continue Learning Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-[#145A4A]/25 flex flex-col justify-between">
          <div>
            <div className="text-xs text-[#1C2724]/65 flex items-center gap-2">
              <span className="font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? 'Pelajaran Berikutnya yang Disarankan'
                  : 'Pelajaran Seterusnya yang Dicadangkan'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{recommendedLesson.verseRef}</span>
              <span aria-hidden="true">·</span>
              <span>
                {recommendedLesson.durationMinutes}{' '}
                {locale === 'id-ID' ? 'menit' : 'minit'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#1C2724] mt-2">
              {recommendedLesson.title[locale]}
            </h2>
            <p className="text-sm text-[#1C2724]/75 mt-1">
              {recommendedLesson.subtitle[locale]}
            </p>
            <div
              dir="rtl"
              lang="ar"
              className="font-arabic text-2xl sm:text-3xl text-[#145A4A] bg-[#F7F5EF] p-4 rounded-xl my-4 text-center border border-[#1C2724]/8"
            >
              {recommendedLesson.arabicPhrase}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1C2724]/10">
            <span className="text-xs text-[#1C2724]/65">
              {locale === 'id-ID'
                ? `${progress.completedLessonIds.length} dari ${LESSONS.length} modul selesai`
                : `${progress.completedLessonIds.length} daripada ${LESSONS.length} modul selesai`}
            </span>
            <button
              type="button"
              onClick={() => onStartLesson(recommendedLesson.id)}
              className="px-5 py-2.5 rounded-xl bg-[#145A4A] text-white text-xs sm:text-sm font-semibold hover:bg-[#10483B] inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                {locale === 'id-ID'
                  ? 'Mulai Pelajaran Ini'
                  : 'Mulakan Pelajaran Ini'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Spaced Review Queue Card & Gentle Daily Habit (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-[#1C2724]/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? 'Jadwal Ulasan Berjarak (Spaced Review)'
                  : 'Jadual Ulang Kaji Berjarak (Spaced Review)'}
              </span>
              <span className="text-xs text-[#1C2724]/60 tabular-nums flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {progress.dailyGoalMinutes}{' '}
                  {locale === 'id-ID' ? 'mnt/hari' : 'min/hari'}
                </span>
              </span>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10">
              <div className="text-2xl font-bold text-[#1C2724] tabular-nums">
                {dueItems.length}{' '}
                <span className="text-sm font-normal text-[#1C2724]/75">
                  {locale === 'id-ID'
                    ? 'kata siap diulas hari ini'
                    : 'perkataan sedia diulang kaji hari ini'}
                </span>
              </div>
              <p className="text-xs text-[#1C2724]/70 mt-1.5 leading-relaxed">
                {dueItems.length > 0
                  ? locale === 'id-ID'
                    ? 'Luangkan 2 menit untuk menguatkan ingatan kosakata yang telah Anda pelajari.'
                    : 'Luangkan 2 minit untuk mengukuhkan ingatan kosa kata yang telah anda pelajari.'
                  : locale === 'id-ID'
                  ? 'Seluruh jadwal ulasan hari ini telah selesai. Anda tetap dapat berlatih kapan saja.'
                  : 'Semua jadual ulang kaji hari ini telah selesai. Anda boleh berlatih pada bila-bila masa.'}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#1C2724]/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onNavigate('progress')}
              className="text-xs font-semibold text-[#145A4A] hover:underline"
            >
              {locale === 'id-ID' ? 'Lihat Peta Kemampuan' : 'Lihat Peta Kemahiran'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('review')}
              className="px-4 py-2.5 rounded-xl bg-[#DDEBE3] text-[#145A4A] hover:bg-[#cde0d5] text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {locale === 'id-ID' ? 'Buka Ruang Ulasan' : 'Buka Ruang Ulang Kaji'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Learned Words & Saved Bookmarks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recently Learned Words */}
        <div className="bg-white rounded-2xl p-6 border border-[#1C2724]/12">
          <div className="flex items-center justify-between pb-3 border-b border-[#1C2724]/10">
            <h3 className="text-base font-bold text-[#1C2724]">
              {locale === 'id-ID'
                ? `Kata yang Telah Dipelajari (${learnedWords.length})`
                : `Perkataan yang Telah Dipelajari (${learnedWords.length})`}
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('vocabulary')}
              className="text-xs font-semibold text-[#145A4A] hover:underline"
            >
              {locale === 'id-ID' ? 'Buka Pustaka Kata' : 'Buka Pustaka Kosa Kata'}
            </button>
          </div>
          {learnedWords.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#1C2724]/65 space-y-2">
              <p>
                {locale === 'id-ID'
                  ? 'Belum ada kata yang dipelajari. Selesaikan Langkah 7 pada Pelajaran 1 untuk menambahkan kosakata pertama Anda.'
                  : 'Belum ada perkataan yang dipelajari. Selesaikan Langkah 7 dalam Pelajaran 1 untuk menambah kosa kata pertama anda.'}
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-2.5">
              {learnedWords.slice(0, 4).map((w) => (
                <div
                  key={w.id}
                  className="p-3 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/8 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[#1C2724]">
                      {w.transliteration} — {w.contextualMeaning[locale]}
                    </div>
                    <div className="text-[11px] text-[#1C2724]/60">
                      {w.verseRef} · {w.grammaticalRole[locale]}
                    </div>
                  </div>
                  <span
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-2xl text-[#145A4A] font-bold"
                  >
                    {w.arabic}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Bookmarks */}
        <div className="bg-white rounded-2xl p-6 border border-[#1C2724]/12">
          <div className="flex items-center justify-between pb-3 border-b border-[#1C2724]/10">
            <h3 className="text-base font-bold text-[#1C2724] flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#145A4A]" />
              <span>
                {locale === 'id-ID'
                  ? `Kata Tersimpan (${bookmarkedWords.length})`
                  : `Perkataan Disimpan (${bookmarkedWords.length})`}
              </span>
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('vocabulary')}
              className="text-xs font-semibold text-[#145A4A] hover:underline"
            >
              {locale === 'id-ID' ? 'Kelola Simpanan' : 'Urus Simpanan'}
            </button>
          </div>

          {bookmarkedWords.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#1C2724]/65">
              {locale === 'id-ID'
                ? 'Belum ada kata yang disimpan. Klik tombol "Simpan Kata" saat belajar di Ayat Explorer.'
                : 'Belum ada perkataan yang disimpan. Klik butang "Simpan Perkataan" ketika belajar di Ayat Explorer.'}
            </div>
          ) : (
            <div className="mt-4 space-y-2.5">
              {bookmarkedWords.map((w) => (
                <div
                  key={w.id}
                  className="p-3 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/8 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[#1C2724]">
                      {w.transliteration} — {w.contextualMeaning[locale]}
                    </div>
                    <div className="text-[11px] text-[#1C2724]/60">
                      {w.verseRef}
                    </div>
                  </div>
                  <span
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-2xl text-[#145A4A] font-bold"
                  >
                    {w.arabic}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Path B Teacher Review Queue Requests */}
      {progress.teacherReviewRequests && progress.teacherReviewRequests.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-[#1C2724]/12 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#1C2724]/10">
            <h3 className="text-base font-bold text-[#1C2724] flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#145A4A]" />
              <span>
                {locale === 'id-ID'
                  ? `Antrean Permohonan Semakan Bacaan (${progress.teacherReviewRequests.length})`
                  : `Giliran Permohonan Semakan Bacaan (${progress.teacherReviewRequests.length})`}
              </span>
            </h3>
            <span className="text-xs text-[#1C2724]/60">
              {locale === 'id-ID'
                ? 'Tercatat di Server (/api/teacher-reviews)'
                : 'Direkodkan di Pelayan (/api/teacher-reviews)'}
            </span>
          </div>
          <div className="space-y-2">
            {progress.teacherReviewRequests.map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-bold text-[#145A4A]">#{req.id}</span> ·{' '}
                  <span className="font-semibold text-[#1C2724]">{req.focusNote}</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#1C2724]/10 text-[#1C2724]/75 font-medium">
                  {req.status === 'received-in-queue'
                    ? locale === 'id-ID'
                      ? 'Dalam Antrean Permohonan (Belum Dijadwalkan)'
                      : 'Dalam Giliran Permohonan (Belum Dijadualkan)'
                    : req.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
