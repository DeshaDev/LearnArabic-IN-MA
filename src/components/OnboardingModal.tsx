import React, { useState } from 'react';
import {
  DiagnosticAnswers,
  LocaleCode,
  PathwayId,
  PlacementRecommendation,
} from '../types/learning';
import { recommendStartingPoint } from '../utils/learningEngine';
import { X, ArrowRight, CheckCircle2, Compass } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  locale: LocaleCode;
  onLocaleChange: (locale: LocaleCode) => void;
  onClose: () => void;
  onCompleteOnboarding: (
    answers: DiagnosticAnswers,
    recommendation: PlacementRecommendation
  ) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  locale,
  onLocaleChange,
  onClose,
  onCompleteOnboarding,
}) => {
  const [step, setStep] = useState<number>(1);
  const [canReadLetters, setCanReadLetters] = useState<'yes' | 'some' | 'no'>('yes');
  const [canReadWithVowels, setCanReadWithVowels] = useState<'fluent' | 'slow' | 'no'>('fluent');
  const [understandsWords, setUnderstandsWords] = useState<'many' | 'few' | 'none'>('few');
  const [mainGoal, setMainGoal] = useState<PathwayId>('understand-quran');
  const [sessionMinutes, setSessionMinutes] = useState<5 | 10 | 15>(10);
  const [placementAnswer1, setPlacementAnswer1] = useState<number | null>(0);
  const [placementAnswer2, setPlacementAnswer2] = useState<number | null>(0);

  if (!isOpen) return null;

  const placementScore =
    (placementAnswer1 === 0 ? 1 : 0) + (placementAnswer2 === 0 ? 1 : 0);

  const currentAnswers: DiagnosticAnswers = {
    canReadLetters,
    canReadWithVowels,
    understandsWords,
    mainGoal,
    sessionMinutes,
    placementScore,
  };

  const recommendation = recommendStartingPoint(currentAnswers);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-dialog-title"
      className="fixed inset-0 z-50 bg-[#1C2724]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-[#F7F5EF] rounded-2xl max-w-xl w-full border border-[#1C2724]/15 p-6 sm:p-8 shadow-lg my-8">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#1C2724]/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#145A4A]">
            <Compass className="w-4 h-4" />
            <span>
              {locale === 'id-ID'
                ? `Pemetaan Jalur Belajar · Langkah ${step} dari 3`
                : `Saringan Laluan Pembelajaran · Langkah ${step} daripada 3`}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={locale === 'id-ID' ? 'Tutup dialog' : 'Tutup dialog'}
            className="p-1.5 rounded-lg text-[#1C2724]/60 hover:text-[#1C2724] hover:bg-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 1 && (
          <div className="mt-5 space-y-5">
            <div>
              <h2
                id="onboarding-dialog-title"
                className="text-xl font-bold text-[#1C2724]"
              >
                {locale === 'id-ID'
                  ? 'Pilih bahasa pengantar & tujuan utama Anda'
                  : 'Pilih bahasa pengantar & matlamat utama anda'}
              </h2>
              <p className="text-xs sm:text-sm text-[#1C2724]/75 mt-1">
                {locale === 'id-ID'
                  ? 'Kami tidak memaksa setiap pembelajar mengulang dari huruf dasar jika sudah dapat membaca Al-Qur’an.'
                  : 'Kami tidak memaksa setiap pelajar bermula semula daripada huruf asas jika sudah boleh membaca al-Quran.'}
              </p>
            </div>

            {/* Locale Choice */}
            <div>
              <label className="block text-xs font-semibold text-[#1C2724] mb-2">
                {locale === 'id-ID' ? 'Bahasa Pengantar:' : 'Bahasa Pengantar:'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onLocaleChange('id-ID')}
                  className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-colors ${
                    locale === 'id-ID'
                      ? 'bg-[#145A4A] text-white border-[#145A4A]'
                      : 'bg-white text-[#1C2724] border-[#1C2724]/15'
                  }`}
                >
                  Bahasa Indonesia (id-ID)
                </button>
                <button
                  type="button"
                  onClick={() => onLocaleChange('ms-MY')}
                  className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-colors ${
                    locale === 'ms-MY'
                      ? 'bg-[#145A4A] text-white border-[#145A4A]'
                      : 'bg-white text-[#1C2724] border-[#1C2724]/15'
                  }`}
                >
                  Bahasa Melayu Malaysia (ms-MY)
                </button>
              </div>
            </div>

            {/* Main Goal */}
            <div>
              <label className="block text-xs font-semibold text-[#1C2724] mb-2">
                {locale === 'id-ID'
                  ? 'Apa fokus utama Anda saat ini?'
                  : 'Apakah fokus utama anda buat masa ini?'}
              </label>
              <div className="space-y-2.5">
                {[
                  {
                    id: 'understand-quran' as PathwayId,
                    title:
                      locale === 'id-ID'
                        ? 'Memahami kata & kalimat saat membaca Al-Qur’an'
                        : 'Memahami perkataan & struktur ayat ketika membaca al-Quran',
                  },
                  {
                    id: 'prayer-comprehension' as PathwayId,
                    title:
                      locale === 'id-ID'
                        ? 'Memahami arti Surah Al-Fatihah & bacaan salat harian'
                        : 'Memahami makna Surah al-Fatihah & bacaan solat harian',
                  },
                  {
                    id: 'quran-reading' as PathwayId,
                    title:
                      locale === 'id-ID'
                        ? 'Memperbaiki bacaan huruf hijaiyah, harakat, dan tajwid'
                        : 'Memperbaiki bacaan huruf hijaiyah, baris dan tajwid',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMainGoal(item.id)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                      mainGoal === item.id
                        ? 'bg-white border-[#145A4A] text-[#145A4A] font-semibold ring-1 ring-[#145A4A]'
                        : 'bg-white/70 border-[#1C2724]/12 text-[#1C2724]'
                    }`}
                  >
                    <span>{item.title}</span>
                    {mainGoal === item.id && <CheckCircle2 className="w-4 h-4 text-[#145A4A]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Session Time */}
            <div>
              <label className="block text-xs font-semibold text-[#1C2724] mb-2">
                {locale === 'id-ID'
                  ? 'Waktu belajar nyaman per hari:'
                  : 'Masa pembelajaran selesa sehari:'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {([5, 10, 15] as const).map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setSessionMinutes(mins)}
                    className={`p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                      sessionMinutes === mins
                        ? 'bg-[#145A4A] text-white border-[#145A4A]'
                        : 'bg-white text-[#1C2724] border-[#1C2724]/15'
                    }`}
                  >
                    {mins} {locale === 'id-ID' ? 'menit' : 'minit'}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#145A4A] hover:bg-[#10483B] rounded-xl inline-flex items-center gap-2"
              >
                <span>{locale === 'id-ID' ? 'Lanjut ke Pengenalan Bacaan' : 'Teruskan ke Tahap Bacaan'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-5 space-y-5">
            <h2
              id="onboarding-dialog-title"
              className="text-xl font-bold text-[#1C2724]"
            >
              {locale === 'id-ID'
                ? 'Pengalaman membaca teks Arab & aktivitas singkat'
                : 'Pengalaman membaca teks Arab & aktiviti ringkas'}
            </h2>

            <div>
              <label className="block text-xs font-semibold text-[#1C2724] mb-2">
                {locale === 'id-ID'
                  ? '1. Apakah Anda sudah dapat membaca teks Al-Qur’an berharakat?'
                  : '1. Adakah anda sudah boleh membaca teks al-Quran berbaris?'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    val: 'fluent' as const,
                    letters: 'yes' as const,
                    label: locale === 'id-ID' ? 'Ya, sudah lancar' : 'Ya, sudah lancar',
                  },
                  {
                    val: 'slow' as const,
                    letters: 'some' as const,
                    label: locale === 'id-ID' ? 'Bisa, tetapi perlahan' : 'Boleh, secara perlahan',
                  },
                  {
                    val: 'no' as const,
                    letters: 'no' as const,
                    label: locale === 'id-ID' ? 'Belum, ingin mulai dari huruf' : 'Belum, ingin mula dari huruf',
                  },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => {
                      setCanReadWithVowels(opt.val);
                      setCanReadLetters(opt.letters);
                    }}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-colors ${
                      canReadWithVowels === opt.val
                        ? 'bg-[#145A4A] text-white border-[#145A4A]'
                        : 'bg-white text-[#1C2724] border-[#1C2724]/15'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C2724] mb-2">
                {locale === 'id-ID'
                  ? '2. Seberapa sering Anda mengenali arti kata Arab saat membaca Al-Qur’an?'
                  : '2. Sejauh manakah anda mengenali makna perkataan Arab ketika membaca al-Quran?'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    val: 'none' as const,
                    label: locale === 'id-ID' ? 'Membaca tanpa tahu arti per kata' : 'Membaca tanpa tahu makna perkataan',
                  },
                  {
                    val: 'few' as const,
                    label: locale === 'id-ID' ? 'Mengenal beberapa kata umum' : 'Mengenali beberapa perkataan lazim',
                  },
                  {
                    val: 'many' as const,
                    label: locale === 'id-ID' ? 'Sudah mengenal kata dasar & dhamir' : 'Sudah mengenali kata asas & dhamir',
                  },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setUnderstandsWords(opt.val)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-colors ${
                      understandsWords === opt.val
                        ? 'bg-[#145A4A] text-white border-[#145A4A]'
                        : 'bg-white text-[#1C2724] border-[#1C2724]/15'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mini Placement Check */}
            <div className="bg-white p-4 rounded-xl border border-[#1C2724]/12 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#145A4A]">
                  {locale === 'id-ID'
                    ? 'Cek Cepat Kosakata: Apa arti kata berikut dalam Surah Al-Fatihah?'
                    : 'Semakan Pantas Kosa Kata: Apakah makna perkataan berikut dalam Surah al-Fatihah?'}
                </span>
                <span dir="rtl" lang="ar" className="font-arabic text-2xl text-[#145A4A] font-bold">
                  ٱلْحَمْدُ لِلَّهِ
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  locale === 'id-ID' ? 'Segala puji bagi Allah' : 'Segala puji bagi Allah',
                  locale === 'id-ID' ? 'Belum yakin artinya' : 'Belum pasti maknanya',
                ].map((label, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPlacementAnswer1(idx);
                      setPlacementAnswer2(idx);
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-left ${
                      placementAnswer1 === idx
                        ? 'bg-[#DDEBE3] text-[#145A4A] border-[#145A4A] font-semibold'
                        : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/10'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-[#1C2724]/75 hover:text-[#1C2724]"
              >
                {locale === 'id-ID' ? 'Kembali' : 'Kembali'}
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#145A4A] hover:bg-[#10483B] rounded-xl inline-flex items-center gap-2"
              >
                <span>{locale === 'id-ID' ? 'Lihat Rekomendasi Jalur' : 'Lihat Cadangan Laluan'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-5 space-y-5">
            <div>
              <div className="text-xs font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? 'Rekomendasi Titik Awal Anda'
                  : 'Cadangan Titik Permulaan Anda'}
              </div>
              <h2
                id="onboarding-dialog-title"
                className="text-xl font-bold text-[#1C2724] mt-1"
              >
                {recommendation.recommendedPathway === 'understand-quran'
                  ? locale === 'id-ID'
                    ? `Jalur Utama: Pahami Bahasa Arab Al-Qur’an (Tahap ${recommendation.recommendedLevel})`
                    : `Laluan Utama: Fahami Bahasa Arab al-Quran (Peringkat ${recommendation.recommendedLevel})`
                  : recommendation.recommendedPathway === 'prayer-comprehension'
                  ? locale === 'id-ID'
                    ? 'Jalur Praktis: Pahami Bacaan Salat & Al-Fatihah'
                    : 'Laluan Amali: Fahami Bacaan Solat & al-Fatihah'
                  : locale === 'id-ID'
                  ? 'Jalur Bacaan: Huruf, Harakat & Tajwid Terstruktur'
                  : 'Laluan Bacaan: Huruf, Baris & Tajwid Berstruktur'}
              </h2>
            </div>

            <div className="bg-white rounded-xl p-5 border border-[#145A4A]/25">
              <p className="text-sm text-[#1C2724]/85 leading-relaxed">
                {recommendation.rationale[locale]}
              </p>
              <div className="mt-4 pt-3 border-t border-[#1C2724]/10 flex flex-wrap items-center gap-3 text-xs text-[#145A4A] font-semibold">
                <span>
                  {recommendation.skipBasicAlphabet
                    ? locale === 'id-ID'
                      ? '✓ Melewati modul pengenalan huruf dasar'
                      : '✓ Melangkau modul pengenalan huruf asas'
                    : locale === 'id-ID'
                    ? '✓ Dimulai dari fondasi huruf & harakat'
                    : '✓ Bermula daripada asas huruf & baris'}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {sessionMinutes} {locale === 'id-ID' ? 'menit / hari' : 'minit / hari'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-[#1C2724]/75 hover:text-[#1C2724]"
              >
                {locale === 'id-ID' ? 'Ubah Jawaban' : 'Ubah Jawapan'}
              </button>
              <button
                type="button"
                onClick={() => onCompleteOnboarding(currentAnswers, recommendation)}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#145A4A] hover:bg-[#10483B] rounded-xl inline-flex items-center gap-2"
              >
                <span>
                  {locale === 'id-ID'
                    ? 'Mulai Pelajaran Pertama Sekarang'
                    : 'Mulakan Pelajaran Pertama Sekarang'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
