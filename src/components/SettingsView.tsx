import React, { useState } from 'react';
import { LearnerProgress, LocaleCode } from '../types/learning';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface SettingsViewProps {
  locale: LocaleCode;
  progress: LearnerProgress;
  onLocaleChange: (locale: LocaleCode) => void;
  onUpdateSettings: (partial: Partial<LearnerProgress>) => void;
  onResetProgress: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  locale,
  progress,
  onLocaleChange,
  onUpdateSettings,
  onResetProgress,
}) => {
  const [savedNotice, setSavedNotice] = useState<boolean>(false);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  const triggerSaved = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#145A4A]">
            {locale === 'id-ID'
              ? 'Pengaturan Belajar & Aksesibilitas'
              : 'Tetapan Pembelajaran & Kebolehcapaian'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-1">
            {locale === 'id-ID'
              ? 'Sesuaikan tampilan teks Arab, bahasa, dan privasi data'
              : 'Sesuaikan paparan teks Arab, bahasa dan privasi data'}
          </h1>
        </div>
        {savedNotice && (
          <span
            role="status"
            className="text-xs font-semibold text-[#145A4A] bg-[#DDEBE3] px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {locale === 'id-ID' ? 'Pengaturan disimpan' : 'Tetapan disimpan'}
            </span>
          </span>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#1C2724]/12 space-y-6">
        {/* Locale Preference */}
        <div>
          <label className="block text-sm font-bold text-[#1C2724]">
            {locale === 'id-ID'
              ? 'Bahasa Pengantar & Lokalisasi (URL)'
              : 'Bahasa Pengantar & Penyetempatan (URL)'}
          </label>
          <p className="text-xs text-[#1C2724]/65 mt-0.5">
            {locale === 'id-ID'
              ? 'Pilih antara Bahasa Indonesia (/id/) dan Bahasa Melayu Malaysia (/my/).'
              : 'Pilih antara Bahasa Indonesia (/id/) dan Bahasa Melayu Malaysia (/my/).'}
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                onLocaleChange('id-ID');
                triggerSaved();
              }}
              className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold ${
                locale === 'id-ID'
                  ? 'bg-[#145A4A] text-white border-[#145A4A]'
                  : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/12'
              }`}
            >
              Bahasa Indonesia (id-ID · /id/)
            </button>
            <button
              type="button"
              onClick={() => {
                onLocaleChange('ms-MY');
                triggerSaved();
              }}
              className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold ${
                locale === 'ms-MY'
                  ? 'bg-[#145A4A] text-white border-[#145A4A]'
                  : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/12'
              }`}
            >
              Bahasa Melayu Malaysia (ms-MY · /my/)
            </button>
          </div>
        </div>

        {/* Arabic Font Scale */}
        <div className="pt-5 border-t border-[#1C2724]/10">
          <label className="block text-sm font-bold text-[#1C2724]">
            {locale === 'id-ID'
              ? 'Ukuran Huruf Arab & Harakat'
              : 'Saiz Tulisan Arab & Baris Bacaan'}
          </label>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {(
              [
                { id: 'normal', label: locale === 'id-ID' ? 'Standar' : 'Biasa' },
                { id: 'large', label: locale === 'id-ID' ? 'Besar (Disarankan)' : 'Besar (Disyorkan)' },
                { id: 'xlarge', label: locale === 'id-ID' ? 'Sangat Besar' : 'Sangat Besar' },
              ] as const
            ).map((scale) => (
              <button
                key={scale.id}
                type="button"
                onClick={() => {
                  onUpdateSettings({ arabicFontScale: scale.id });
                  triggerSaved();
                }}
                className={`p-3 rounded-xl border text-xs font-semibold ${
                  progress.arabicFontScale === scale.id
                    ? 'bg-[#145A4A] text-white border-[#145A4A]'
                    : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/12'
                }`}
              >
                {scale.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transliteration Toggle */}
        <div className="pt-5 border-t border-[#1C2724]/10 flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-[#1C2724]">
              {locale === 'id-ID'
                ? 'Tampilkan Transliterasi Latin'
                : 'Paparkan Transliterasi Rumi'}
            </div>
            <p className="text-xs text-[#1C2724]/65 mt-0.5">
              {locale === 'id-ID'
                ? 'Bermanfaat bagi pemula; dapat dimatikan jika Anda ingin fokus penuh pada huruf Arab.'
                : 'Membantu pelajar baharu; boleh dimatikan jika anda ingin fokus sepenuhnya pada huruf Arab.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onUpdateSettings({
                showTransliteration: !progress.showTransliteration,
              });
              triggerSaved();
            }}
            aria-pressed={progress.showTransliteration}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
              progress.showTransliteration
                ? 'bg-[#145A4A] text-white border-[#145A4A]'
                : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/15'
            }`}
          >
            {progress.showTransliteration
              ? locale === 'id-ID'
                ? 'Aktif'
                : 'Aktif'
              : locale === 'id-ID'
              ? 'Nonaktif'
              : 'Tidak Aktif'}
          </button>
        </div>

        {/* Daily Study Target */}
        <div className="pt-5 border-t border-[#1C2724]/10">
          <label className="block text-sm font-bold text-[#1C2724]">
            {locale === 'id-ID'
              ? 'Target Belajar Harian (Tanpa Tekanan)'
              : 'Sasaran Belajar Harian (Tanpa Tekanan)'}
          </label>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {([5, 10, 15] as const).map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => {
                  onUpdateSettings({ dailyGoalMinutes: mins });
                  triggerSaved();
                }}
                className={`p-3 rounded-xl border text-xs font-semibold ${
                  progress.dailyGoalMinutes === mins
                    ? 'bg-[#145A4A] text-white border-[#145A4A]'
                    : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/12'
                }`}
              >
                {mins} {locale === 'id-ID' ? 'menit / hari' : 'minit / hari'}
              </button>
            ))}
          </div>
        </div>

        {/* Data Privacy & Reset */}
        <div className="pt-5 border-t border-[#1C2724]/10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-[#1C2724]">
              {locale === 'id-ID'
                ? 'Privasi & Penyimpanan Kemajuan Lokal'
                : 'Privasi & Simpanan Kemajuan Tempatan'}
            </div>
            <p className="text-xs text-[#1C2724]/65 mt-0.5">
              {locale === 'id-ID'
                ? 'Kemajuan belajar, kata tersimpan, dan catatan refleksi disimpan di perangkat Anda.'
                : 'Kemajuan pembelajaran, perkataan disimpan dan nota refleksi disimpan pada peranti anda.'}
            </p>
          </div>

          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-300 hover:bg-amber-100 inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>
                {locale === 'id-ID'
                  ? 'Atur Ulang Data Belajar'
                  : 'Tetapkan Semula Data Belajar'}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                  triggerSaved();
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-700 text-white"
              >
                {locale === 'id-ID' ? 'Ya, Hapus & Mulai Ulang' : 'Ya, Padam & Mula Semula'}
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#F7F5EF] text-[#1C2724]"
              >
                {locale === 'id-ID' ? 'Batal' : 'Batal'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
