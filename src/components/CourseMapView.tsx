import React from 'react';
import { LearnerProgress, LocaleCode, PathwayId } from '../types/learning';
import { CURRICULUM_LEVELS, LESSONS } from '../data/curriculum';
import { isLessonUnlocked } from '../utils/learningEngine';
import { CheckCircle2, Lock, PlayCircle, Compass } from 'lucide-react';

interface CourseMapViewProps {
  locale: LocaleCode;
  progress: LearnerProgress;
  onSelectPathway: (pathwayId: PathwayId) => void;
  onStartLesson: (lessonId: string) => void;
  onOpenOnboarding: () => void;
}

export const CourseMapView: React.FC<CourseMapViewProps> = ({
  locale,
  progress,
  onSelectPathway,
  onStartLesson,
  onOpenOnboarding,
}) => {
  const pathways: Array<{ id: PathwayId; label: string; subtitle: string }> = [
    {
      id: 'understand-quran',
      label:
        locale === 'id-ID'
          ? 'Jalur A · Pahami Bahasa Arab Al-Qur’an'
          : 'Laluan A · Fahami Bahasa Arab al-Quran',
      subtitle:
        locale === 'id-ID'
          ? 'Kosakata dalam konteks, pembentuk kalimat, dan keluarga akar kata.'
          : 'Kosa kata mengikut konteks, binaan ayat dan keluarga akar perkataan.',
    },
    {
      id: 'quran-reading',
      label:
        locale === 'id-ID'
          ? 'Jalur B · Bacaan Al-Qur’an & Tajwid'
          : 'Laluan B · Bacaan al-Quran & Tajwid',
      subtitle:
        locale === 'id-ID'
          ? 'Harakat, penyambungan huruf, makhraj, dan kaidah tajwid terapan.'
          : 'Baris bacaan, penyambungan huruf, makhraj dan hukum tajwid amali.',
    },
    {
      id: 'prayer-comprehension',
      label:
        locale === 'id-ID'
          ? 'Jalur C · Pahami Bacaan Salat'
          : 'Laluan C · Fahami Bacaan Solat',
      subtitle:
        locale === 'id-ID'
          ? 'Surah Al-Fatihah dan bacaan salat shahih dengan pemahaman kata ganti.'
          : 'Surah al-Fatihah dan bacaan solat sahih dengan kefahaman kata ganti nama.',
    },
  ];

  const activeLevels = CURRICULUM_LEVELS.filter(
    (lvl) => lvl.pathwayId === progress.activePathway
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#145A4A]">
            {locale === 'id-ID' ? 'Peta Kurikulum Terstruktur' : 'Peta Kurikulum Berstruktur'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-1">
            {locale === 'id-ID'
              ? 'Urutan modul, prasyarat, dan hasil belajar'
              : 'Susunan modul, prasyarat dan hasil pembelajaran'}
          </h1>
        </div>
        <button
          type="button"
          onClick={onOpenOnboarding}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-[#1C2724]/15 text-[#145A4A] hover:bg-[#DDEBE3]/60 self-start sm:self-auto"
        >
          <Compass className="w-4 h-4" />
          <span>
            {locale === 'id-ID'
              ? 'Uji Penempatan untuk Membuka Tahap'
              : 'Ujian Penempatan untuk Membuka Peringkat'}
          </span>
        </button>
      </div>

      {/* Pathway Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pathways.map((p) => {
          const active = progress.activePathway === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPathway(p.id)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                active
                  ? 'bg-[#145A4A] text-white border-[#145A4A] shadow-xs'
                  : 'bg-white text-[#1C2724] border-[#1C2724]/12 hover:bg-[#DDEBE3]/40'
              }`}
            >
              <div className="text-sm font-bold">{p.label}</div>
              <p
                className={`text-xs mt-1.5 leading-relaxed ${
                  active ? 'text-[#DDEBE3]' : 'text-[#1C2724]/70'
                }`}
              >
                {p.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Sequence of Levels & Lessons */}
      <div className="space-y-6">
        {activeLevels.map((lvl) => {
          const levelLessons = lvl.lessonIds
            .map((id) => LESSONS.find((l) => l.id === id)!)
            .filter(Boolean);

          return (
            <div
              key={`${lvl.pathwayId}-${lvl.level}`}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#1C2724]/12"
            >
              <div className="pb-4 border-b border-[#1C2724]/10 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-[#1C2724]">
                    {lvl.title[locale]}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#1C2724]/75 mt-1">
                    {lvl.description[locale]}
                  </p>
                </div>
                <div className="text-xs text-[#145A4A] font-semibold bg-[#F7F5EF] px-3 py-1.5 rounded-lg border border-[#1C2724]/8">
                  {lvl.learningOutcome[locale]}
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {levelLessons.map((lesson) => {
                  const completed = progress.completedLessonIds.includes(
                    lesson.id
                  );
                  const unlocked = isLessonUnlocked(lesson, progress);

                  return (
                    <div
                      key={lesson.id}
                      className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        completed
                          ? 'bg-[#DDEBE3]/35 border-[#145A4A]/30'
                          : unlocked
                          ? 'bg-[#F7F5EF] border-[#1C2724]/12'
                          : 'bg-[#F7F5EF]/50 border-[#1C2724]/10 opacity-85'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#1C2724]/65">
                          <span className="font-semibold text-[#145A4A]">
                            {completed
                              ? locale === 'id-ID'
                                ? '✓ Selesai'
                                : '✓ Selesai'
                              : unlocked
                              ? locale === 'id-ID'
                                ? 'Tersedia'
                                : 'Tersedia'
                              : locale === 'id-ID'
                              ? 'Prasyarat Terkunci'
                              : 'Prasyarat Terkunci'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{lesson.verseRef}</span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {lesson.durationMinutes}{' '}
                            {locale === 'id-ID' ? 'menit' : 'minit'}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#1C2724]">
                          {lesson.title[locale]}
                        </h3>
                        <p className="text-xs text-[#1C2724]/75">
                          {lesson.subtitle[locale]}
                        </p>

                        {!unlocked && lesson.prerequisiteReason && (
                          <p className="text-xs text-amber-900 bg-amber-50/90 px-3 py-1.5 rounded-lg border border-amber-200 mt-2">
                            <strong>
                              {locale === 'id-ID'
                                ? 'Mengapa prasyarat ini penting: '
                                : 'Mengapa prasyarat ini penting: '}
                            </strong>
                            {lesson.prerequisiteReason[locale]}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          dir="rtl"
                          lang="ar"
                          className="font-arabic text-xl text-[#145A4A] hidden md:inline"
                        >
                          {lesson.arabicPhrase}
                        </span>
                        <button
                          type="button"
                          onClick={() => onStartLesson(lesson.id)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap ${
                            completed
                              ? 'bg-white text-[#145A4A] border border-[#145A4A]/30 hover:bg-[#DDEBE3]'
                              : unlocked
                              ? 'bg-[#145A4A] text-white hover:bg-[#10483B]'
                              : 'bg-white text-[#1C2724] border border-[#1C2724]/20 hover:bg-[#DDEBE3]/50'
                          }`}
                        >
                          {completed ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>
                                {locale === 'id-ID' ? 'Ulas Kembali' : 'Ulang Kaji'}
                              </span>
                            </>
                          ) : unlocked ? (
                            <>
                              <PlayCircle className="w-4 h-4" />
                              <span>
                                {locale === 'id-ID' ? 'Mulai Pelajaran' : 'Mulakan Pelajaran'}
                              </span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5" />
                              <span>
                                {locale === 'id-ID'
                                  ? 'Pratinjau Pelajaran'
                                  : 'Pratonton Pelajaran'}
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
