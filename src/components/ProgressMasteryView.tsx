import React from 'react';
import { LearnerProgress, LocaleCode } from '../types/learning';
import { LESSONS, WORDS } from '../data/curriculum';
import { computeSkillBreakdown } from '../utils/learningEngine';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface ProgressMasteryViewProps {
  locale: LocaleCode;
  progress: LearnerProgress;
}

export const ProgressMasteryView: React.FC<ProgressMasteryViewProps> = ({
  locale,
  progress,
}) => {
  const skills = computeSkillBreakdown(progress, WORDS);
  const reflectionEntries = Object.entries(progress.reflections).filter(
    ([, text]) => text.trim().length > 0
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div>
        <div className="text-xs font-semibold text-[#145A4A]">
          {locale === 'id-ID'
            ? 'Peta Kemampuan & Bukti Pemahaman'
            : 'Peta Kemahiran & Bukti Kefahaman'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-1">
          {locale === 'id-ID'
            ? 'Membedakan pelajaran yang dibuka dan keterampilan yang telah dibuktikan'
            : 'Membezakan pelajaran yang dibuka dengan kemahiran yang telah dibuktikan'}
        </h1>
        <p className="text-sm text-[#1C2724]/75 mt-2 max-w-2xl">
          {locale === 'id-ID'
            ? 'Sesuai prinsip integritas pendidikan kami, kami menampilkan jumlah kata, struktur, dan latihan yang benar-benar telah Anda kerjakan—bukan klaim persentase penguasaan Al-Qur’an yang berlebihan.'
            : 'Selaras dengan prinsip integriti pendidikan kami, kami memaparkan bilangan perkataan, struktur dan latihan yang benar-benar telah anda selesaikan—bukannya dakwaan peratusan penguasaan al-Quran yang melampau.'}
        </p>
      </div>

      {/* Distinction Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#1C2724]/12">
          <div className="text-xs font-semibold text-[#1C2724]/65">
            {locale === 'id-ID' ? 'Modul Pelajaran Diselesaikan' : 'Modul Pelajaran Diselesaikan'}
          </div>
          <div className="text-3xl font-bold text-[#145A4A] mt-2 tabular-nums">
            {progress.completedLessonIds.length} / {LESSONS.length}
          </div>
          <p className="text-xs text-[#1C2724]/70 mt-2">
            {locale === 'id-ID'
              ? 'Pelajaran yang telah Anda ikuti hingga langkah ke-7 di Ayat Explorer.'
              : 'Pelajaran yang telah anda ikuti sehingga langkah ke-7 dalam Ayat Explorer.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#1C2724]/12">
          <div className="text-xs font-semibold text-[#1C2724]/65">
            {locale === 'id-ID' ? 'Kata Arab Terverifikasi' : 'Perkataan Arab Disahkan'}
          </div>
          <div className="text-3xl font-bold text-[#145A4A] mt-2 tabular-nums">
            {progress.learnedWordIds.length} / {WORDS.length}
          </div>
          <p className="text-xs text-[#1C2724]/70 mt-2">
            {locale === 'id-ID'
              ? 'Kosakata Al-Qur’an yang telah dipelajari arti kontekstual dan akarnya.'
              : 'Kosa kata al-Quran yang telah dipelajari makna kontekstual dan akarnya.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#1C2724]/12">
          <div className="text-xs font-semibold text-[#1C2724]/65">
            {locale === 'id-ID' ? 'Kata Teruji dalam Ulasan Aktif' : 'Perkataan Teruji dalam Ulang Kaji Aktif'}
          </div>
          <div className="text-3xl font-bold text-[#145A4A] mt-2 tabular-nums">
            {
              Object.values(progress.reviewQueue).filter(
                (r) => r.correctStreak >= 1
              ).length
            }
          </div>
          <p className="text-xs text-[#1C2724]/70 mt-2">
            {locale === 'id-ID'
              ? 'Kata yang berhasil Anda jawab kembali dengan benar pada sesi ulasan berjarak.'
              : 'Perkataan yang berjaya anda jawab semula dengan betul dalam sesi ulang kaji berjarak.'}
          </p>
        </div>
      </div>

      {/* 5 Skill Dimensions Breakdown */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#1C2724]/12 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#1C2724]/10">
          <h2 className="text-lg font-bold text-[#1C2724]">
            {locale === 'id-ID'
              ? 'Rincian 5 Dimensi Keterampilan Bahasa Arab Al-Qur’an'
              : 'Perincian 5 Dimensi Kemahiran Bahasa Arab al-Quran'}
          </h2>
          <ShieldCheck className="w-5 h-5 text-[#145A4A]" />
        </div>

        <div className="space-y-4">
          {skills.map((skill) => {
            const ratio = Math.min(
              100,
              Math.round((skill.demonstratedCount / skill.targetCount) * 100)
            );
            return (
              <div
                key={skill.id}
                className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#1C2724]">
                      {skill.label[locale]}
                    </h3>
                    <p className="text-xs text-[#1C2724]/70 mt-0.5">
                      {skill.evidenceDescription[locale]}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-[#145A4A] tabular-nums">
                    {skill.demonstratedCount} / {skill.targetCount}{' '}
                    {locale === 'id-ID' ? 'terbukti' : 'dibuktikan'}
                  </div>
                </div>
                <div className="mt-3 w-full h-2 bg-white rounded-full overflow-hidden border border-[#1C2724]/10">
                  <div
                    className="h-full bg-[#145A4A] transition-all"
                    style={{ width: `${ratio}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Reflection Journal History */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#1C2724]/12">
        <h2 className="text-lg font-bold text-[#1C2724]">
          {locale === 'id-ID'
            ? 'Jurnal Catatan Refleksi Pribadi Anda'
            : 'Jurnal Nota Refleksi Peribadi Anda'}
        </h2>
        <p className="text-xs text-[#1C2724]/65 mt-1">
          {locale === 'id-ID'
            ? 'Catatan pribadi yang Anda tulis di Langkah 5 Ayat Explorer (dipisahkan dari ringkasan tafsir resmi).'
            : 'Nota peribadi yang anda tulis pada Langkah 5 Ayat Explorer (diasingkan daripada ringkasan tafsir rasmi).'}
        </p>

        {reflectionEntries.length === 0 ? (
          <div className="mt-4 p-6 rounded-xl bg-[#F7F5EF] text-xs text-[#1C2724]/65 text-center">
            {locale === 'id-ID'
              ? 'Belum ada catatan refleksi pribadi yang disimpan.'
              : 'Belum ada nota refleksi peribadi yang disimpan.'}
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {reflectionEntries.map(([lessonId, text]) => {
              const lesson = LESSONS.find((l) => l.id === lessonId);
              return (
                <div
                  key={lessonId}
                  className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10"
                >
                  <div className="text-xs font-semibold text-[#145A4A] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {lesson ? `${lesson.verseRef} — ${lesson.title[locale]}` : lessonId}
                    </span>
                  </div>
                  <p className="text-sm text-[#1C2724] mt-1.5 leading-relaxed">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
