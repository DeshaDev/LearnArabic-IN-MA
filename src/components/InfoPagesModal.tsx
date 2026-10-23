import React, { useState } from 'react';
import { AuthUser, InfoPageId, LocaleCode } from '../types/learning';
import { X, ShieldCheck, CheckCircle2, AlertCircle, UserCheck, Mail } from 'lucide-react';

interface InfoPagesModalProps {
  activePage: InfoPageId | null;
  locale: LocaleCode;
  onClose: () => void;
  onSelectPage: (page: InfoPageId) => void;
}

export const InfoPagesModal: React.FC<InfoPagesModalProps> = ({
  activePage,
  locale,
  onClose,
  onSelectPage,
}) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  if (!activePage) return null;

  const tabs: Array<{ id: InfoPageId; label: string }> = [
    { id: 'about', label: locale === 'id-ID' ? 'Tentang Kami' : 'Mengenai Kami' },
    { id: 'curriculum', label: locale === 'id-ID' ? 'Kurikulum & Metode' : 'Kurikulum & Kaedah' },
    { id: 'sources', label: locale === 'id-ID' ? 'Sumber & Editor' : 'Sumber & Semakan' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: locale === 'id-ID' ? 'Hubungi Kami' : 'Hubungi Kami' },
    { id: 'privacy', label: locale === 'id-ID' ? 'Kebijakan Privasi' : 'Dasar Privasi' },
    { id: 'terms', label: locale === 'id-ID' ? 'Ketentuan Layanan' : 'Terma Perkhidmatan' },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactName.trim() || contactName.trim().length < 2) {
      setContactError(
        locale === 'id-ID'
          ? 'Mohon isi nama lengkap Anda (minimal 2 karakter).'
          : 'Sila masukkan nama penuh anda (sekurang-kurangnya 2 aksara).'
      );
      return;
    }
    if (!emailRegex.test(contactEmail.trim())) {
      setContactError(
        locale === 'id-ID'
          ? 'Format alamat email belum valid.'
          : 'Format alamat e-mel tidak sah.'
      );
      return;
    }
    if (!contactMessage.trim() || contactMessage.trim().length < 10) {
      setContactError(
        locale === 'id-ID'
          ? 'Pesan atau masukan minimal 10 karakter.'
          : 'Mesej atau maklum balas mestilah sekurang-kurangnya 10 aksara.'
      );
      return;
    }
    setContactError('');
    setContactSuccess(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      className="fixed inset-0 z-50 bg-[#1C2724]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-[#F7F5EF] rounded-2xl max-w-3xl w-full border border-[#1C2724]/15 p-6 sm:p-8 shadow-lg my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#1C2724]/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#145A4A]">
            <ShieldCheck className="w-4 h-4" />
            <span>Faham Ayat · Informasi & Transparansi Keilmuan</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-[#1C2724]/60 hover:text-[#1C2724] hover:bg-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Pills */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#1C2724]/10">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setContactError('');
                setContactSuccess(false);
                onSelectPage(t.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 ${
                activePage === t.id
                  ? 'bg-[#145A4A] text-white'
                  : 'bg-white text-[#1C2724]/75 hover:text-[#1C2724]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Page Content */}
        <div className="mt-6 space-y-4 text-sm text-[#1C2724]/85 leading-relaxed">
          {activePage === 'about' && (
            <>
              <h2 id="info-modal-title" className="text-xl font-bold text-[#1C2724]">
                {locale === 'id-ID'
                  ? 'Tentang Faham Ayat — Misi Pendidikan Bahasa Arab Al-Qur’an'
                  : 'Mengenai Faham Ayat — Misi Pendidikan Bahasa Arab al-Quran'}
              </h2>
              <p>
                {locale === 'id-ID'
                  ? 'Faham Ayat dirancang khusus untuk membantu Muslim di Indonesia dan Malaysia berpindah dari sekadar membaca huruf Arab menuju pemahaman bertahap atas kosakata, akar kata, dan struktur kalimat yang mereka baca di dalam Al-Qur’an dan salat.'
                  : 'Faham Ayat direka khusus untuk membantu Muslim di Malaysia dan Indonesia beralih daripada sekadar membaca huruf Arab kepada kefahaman berperingkat terhadap kosa kata, akar perkataan dan struktur ayat yang dibaca di dalam al-Quran serta solat.'}
              </p>
              <p>
                {locale === 'id-ID'
                  ? 'Kami memadukan kejelasan kurikulum bahasa modern (pengingatan aktif dan ulasan berjarak) dengan ketelitian rujukan keislaman yang menghormati otoritas teks mushaf dan tafsir resmi di masing-masing negara.'
                  : 'Kami menggabungkan kejelasan kurikulum bahasa moden (ingatan aktif dan ulang kaji berjarak) dengan ketelitian rujukan keislaman yang menghormati autoriti teks mushaf serta tafsir rasmi di setiap negara.'}
              </p>
            </>
          )}

          {activePage === 'curriculum' && (
            <>
              <h2 id="info-modal-title" className="text-xl font-bold text-[#1C2724]">
                {locale === 'id-ID'
                  ? 'Kurikulum 3 Jalur & Metode 7 Langkah Ayat Explorer'
                  : 'Kurikulum 3 Laluan & Kaedah 7 Langkah Ayat Explorer'}
              </h2>
              <p>
                {locale === 'id-ID'
                  ? 'Kurikulum kami memisahkan secara tegas tiga keterampilan yang berbeda: (1) Memahami Bahasa Arab Al-Qur’an (Tahap 0–5), (2) Memperbaiki Bacaan & Tajwid (7 Modul Terstruktur), dan (3) Memahami Bacaan Salat (Al-Fatihah & Zikir Shahih).'
                  : 'Kurikulum kami memisahkan secara jelas tiga kemahiran yang berbeza: (1) Memahami Bahasa Arab al-Quran (Peringkat 0–5), (2) Memperbaiki Bacaan & Tajwid (7 Modul Berstruktur), dan (3) Memahami Bacaan Solat (al-Fatihah & Zikir Sahih).'}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>
                  <strong>1. Recall:</strong>{' '}
                  {locale === 'id-ID'
                    ? 'Pertanyaan pengingat dari materi sebelumnya.'
                    : 'Soalan imbasan daripada pelajaran sebelumnya.'}
                </li>
                <li>
                  <strong>2. Listen:</strong>{' '}
                  {locale === 'id-ID'
                    ? 'Pemutar audio dengan kontrol jeda, posisi waktu, dan kecepatan.'
                    : 'Pemain audio dengan kawalan jeda, kedudukan masa dan kelajuan.'}
                </li>
                <li>
                  <strong>3. Explore Arabic:</strong>{' '}
                  {locale === 'id-ID'
                    ? 'Eksplorasi kata per kata beserta akar 3 huruf.'
                    : 'Penerokaan perkataan demi perkataan beserta akar 3 huruf.'}
                </li>
                <li>
                  <strong>4. Structure:</strong>{' '}
                  {locale === 'id-ID'
                    ? 'Visualisasi pembentuk kalimat (Isim, Fi’il, Harf).'
                    : 'Visualisasi binaan ayat (Isim, Fi’il, Harf).'}
                </li>
                <li>
                  <strong>5. Context:</strong>{' '}
                  {locale === 'id-ID'
                    ? 'Terjemahan resmi, ringkasan tafsir, dan jurnal refleksi terpisah.'
                    : 'Terjemahan rasmi, ringkasan tafsir dan jurnal refleksi berasingan.'}
                </li>
                <li>
                  <strong>6. Practice:</strong>{' '}
                  {locale === 'id-ID'
                    ? 'Tiga format latihan interaktif dengan umpan balik langsung.'
                    : 'Tiga bentuk latihan interaktif dengan maklum balas serta-merta.'}
                </li>
                <li>
                  <strong>7. Review:</strong>{' '}
                  {locale === 'id-ID'
                    ? 'Penjadwalan ulasan berjarak (1, 3, 7, 14, 30 hari).'
                    : 'Penjadualan ulang kaji berjarak (1, 3, 7, 14, 30 hari).'}
                </li>
              </ul>
            </>
          )}

          {activePage === 'sources' && (
            <>
              <h2 id="info-modal-title" className="text-xl font-bold text-[#1C2724]">
                {locale === 'id-ID'
                  ? 'Kebijakan Sumber, Tinjauan Editor & Kontrak Integrasi'
                  : 'Dasar Sumber, Semakan Editorial & Kontrak Integrasi'}
              </h2>
              <div className="bg-white p-4 rounded-xl border border-[#1C2724]/10 space-y-2 text-xs sm:text-sm">
                <p>
                  <strong>1. Teks & Terjemahan Indonesia:</strong> Lajnah Pentashihan Mushaf Al-Qur’an (LPMQ) Kementerian Agama RI — Edisi Penyempurnaan 2019 & Tafsir Ringkas Kemenag RI.
                </p>
                <p>
                  <strong>2. Teks & Terjemahan Malaysia:</strong> Tafsir Pimpinan Ar-Rahman kepada Pengertian al-Quran (Jabatan Kemajuan Islam Malaysia / JAKIM) & rujukan pendekatan Bahasa Arab al-Quran ILIM.
                </p>
                <p>
                  <strong>3. Rujukan Hadis Bacaan Salat:</strong> Shahih Muslim (Kitab Ash-Shalah No. 395, No. 476, No. 772).
                </p>
                <p>
                  <strong>4. Kontrak Integrasi Teknis:</strong> Modul data memisahkan konten terverifikasi dari komponen UI dan menyediakan titik integrasi terstruktur untuk API Mushaf Kemenag/Quran.com serta peninjauan guru talaqqi manusia pada Jalur B.
                </p>
              </div>
            </>
          )}

          {activePage === 'faq' && (
            <div className="space-y-4">
              <h2 id="info-modal-title" className="text-xl font-bold text-[#1C2724]">
                {locale === 'id-ID'
                  ? 'Pertanyaan yang Sering Diajukan (FAQ)'
                  : 'Soalan Lazim (FAQ)'}
              </h2>
              <div className="bg-white p-4 rounded-xl border border-[#1C2724]/10">
                <h3 className="font-bold text-[#1C2724]">
                  {locale === 'id-ID'
                    ? '1. Apakah saya harus mulai dari belajar huruf hijaiyah jika sudah lancar membaca Al-Qur’an?'
                    : '1. Adakah saya perlu bermula daripada huruf hijaiyah jika sudah lancar membaca al-Quran?'}
                </h3>
                <p className="text-xs sm:text-sm mt-1">
                  {locale === 'id-ID'
                    ? 'Tidak. Melalui Pemetaan Awal (Onboarding), pembaca yang sudah mengenal huruf dan harakat otomatis melewati modul huruf dasar dan langsung masuk ke pemahaman kosakata dan struktur ayat.'
                    : 'Tidak. Melalui Saringan Awal (Onboarding), pembaca yang sudah mengenal huruf dan baris secara automatik melangkau modul huruf asas dan terus memasuki kefahaman kosa kata serta struktur ayat.'}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#1C2724]/10">
                <h3 className="font-bold text-[#1C2724]">
                  {locale === 'id-ID'
                    ? '2. Apakah aplikasi ini menggantikan peran guru mengaji (talaqqi)?'
                    : '2. Adakah aplikasi ini menggantikan peranan guru mengaji (talaqqi)?'}
                </h3>
                <p className="text-xs sm:text-sm mt-1">
                  {locale === 'id-ID'
                    ? 'Tidak. Untuk ketepatan makhraj dan sifat huruf pada Jalur B, koreksi langsung dari guru yang kompeten tetap diperlukan. Kami menyediakan fitur permintaan tinjauan pengajar sebagai pendamping belajar mandiri.'
                    : 'Tidak. Bagi ketepatan makhraj dan sifat huruf dalam Laluan B, teguran langsung daripada guru bertauliah tetap diperlukan. Kami menyediakan fungsi permohonan semakan ustaz/guru sebagai pelengkap pembelajaran kendiri.'}
                </p>
              </div>
            </div>
          )}

          {activePage === 'contact' && (
            <div>
              <h2 id="info-modal-title" className="text-xl font-bold text-[#1C2724]">
                {locale === 'id-ID'
                  ? 'Hubungi Tim Kurikulum & Dukungan Pembelajar'
                  : 'Hubungi Pasukan Kurikulum & Sokongan Pelajar'}
              </h2>
              <p className="text-xs sm:text-sm mt-1 mb-4">
                {locale === 'id-ID'
                  ? 'Sampaikan pertanyaan, koreksi editorial, atau permohonan kerja sama lembaga pendidikan di Indonesia dan Malaysia.'
                  : 'Hantarkan pertanyaan, cadangan semakan editorial atau permohonan kerjasama institusi pendidikan di Malaysia dan Indonesia.'}
              </p>

              {contactSuccess ? (
                <div
                  role="status"
                  className="p-5 rounded-xl bg-[#DDEBE3] border border-[#145A4A] text-[#145A4A] flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">
                      {locale === 'id-ID'
                        ? 'Terima kasih, pesan Anda telah tercatat!'
                        : 'Terima kasih, mesej anda telah diterima!'}
                    </div>
                    <p className="text-xs mt-1">
                      {locale === 'id-ID'
                        ? `Tim kami akan menghubungi ${contactEmail} dalam 1–2 hari kerja.`
                        : `Pasukan kami akan menghubungi ${contactEmail} dalam masa 1–2 hari bekerja.`}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3" noValidate>
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#1C2724] mb-1"
                    >
                      {locale === 'id-ID' ? 'Nama Lengkap' : 'Nama Penuh'}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#1C2724]/15 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#1C2724] mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#1C2724]/15 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[#1C2724] mb-1"
                    >
                      {locale === 'id-ID' ? 'Pesan / Masukan' : 'Mesej / Maklum Balas'}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#1C2724]/15 text-xs sm:text-sm"
                    />
                  </div>
                  {contactError && (
                    <div className="text-xs text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{contactError}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#145A4A] text-white text-xs font-semibold hover:bg-[#10483B] inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>
                      {locale === 'id-ID' ? 'Kirim Pesan' : 'Hantar Mesej'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          )}

          {activePage === 'privacy' && (
            <>
              <h2 id="info-modal-title" className="text-xl font-bold text-[#1C2724]">
                {locale === 'id-ID'
                  ? 'Kebijakan Privasi & Perlindungan Data Pembelajar'
                  : 'Dasar Privasi & Perlindungan Data Pelajar'}
              </h2>
              <p>
                {locale === 'id-ID'
                  ? 'Kami menghormati privasi ibadah dan pembelajaran Anda. Kami tidak melacak data perilaku keagamaan yang sensitif, tidak menjual data kepada pihak ketiga, dan tidak menampilkan profil atau papan peringkat publik.'
                  : 'Kami menghormati privasi ibadah dan pembelajaran anda. Kami tidak menjejaki data tingkah laku keagamaan yang sensitif, tidak menjual data kepada pihak ketiga dan tidak memaparkan papan kedudukan awam.'}
              </p>
              <p>
                {locale === 'id-ID'
                  ? 'Seluruh riwayat pelajaran, kata tersimpan, dan catatan refleksi pribadi dapat dihapus kapan saja melalui halaman Pengaturan.'
                  : 'Semua sejarah pelajaran, perkataan disimpan dan nota refleksi peribadi boleh dipadamkan pada bila-bila masa melalui halaman Tetapan.'}
              </p>
            </>
          )}

          {activePage === 'terms' && (
            <>
              <h2 id="info-modal-title" className="text-xl font-bold text-[#1C2724]">
                {locale === 'id-ID'
                  ? 'Ketentuan Layanan & Batasan Penggunaan Pendidikan'
                  : 'Terma Perkhidmatan & Sempadan Penggunaan Pendidikan'}
              </h2>
              <p>
                {locale === 'id-ID'
                  ? 'Faham Ayat adalah sarana edukasi bahasa Arab Al-Qur’an dan pemahaman bacaan ibadah. Materi di dalam platform ini tidak dimaksudkan sebagai fatwa hukum Islam mandiri.'
                  : 'Faham Ayat ialah platform pendidikan bahasa Arab al-Quran dan kefahaman bacaan ibadah. Kandungan di dalam platform ini tidak bertujuan sebagai fatwa hukum Islam bebas.'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface AuthModalProps {
  isOpen: boolean;
  locale: LocaleCode;
  currentUser?: AuthUser | null;
  onClose: () => void;
  onSignInSuccess: (user: AuthUser) => void;
  onSignOut: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  locale,
  currentUser,
  onClose,
  onSignInSuccess,
  onSignOut,
}) => {
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState<'ID' | 'MY'>(
    locale === 'ms-MY' ? 'MY' : 'ID'
  );
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim() || name.trim().length < 2) {
      setError(
        locale === 'id-ID'
          ? 'Mohon masukkan nama Anda (minimal 2 karakter).'
          : 'Sila masukkan nama anda (sekurang-kurangnya 2 aksara).'
      );
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError(
        locale === 'id-ID'
          ? 'Mohon masukkan alamat email yang valid.'
          : 'Sila masukkan alamat e-mel yang sah.'
      );
      return;
    }
    if (password.length < 6) {
      setError(
        locale === 'id-ID'
          ? 'Kata sandi minimal 6 karakter.'
          : 'Kata laluan mestilah sekurang-kurangnya 6 aksara.'
      );
      return;
    }

    setError('');
    onSignInSuccess({
      name: name.trim(),
      email: email.trim(),
      country,
      createdAt: Date.now(),
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 bg-[#1C2724]/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-[#F7F5EF] rounded-2xl max-w-md w-full border border-[#1C2724]/15 p-6 sm:p-7 shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-[#1C2724]/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#145A4A]">
            <UserCheck className="w-4 h-4" />
            <span>
              {locale === 'id-ID'
                ? 'Akun Pembelajar (Opsional)'
                : 'Akaun Pelajar (Pilihan)'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sign in dialog"
            className="p-1.5 rounded-lg text-[#1C2724]/60 hover:text-[#1C2724]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {currentUser ? (
          <div className="mt-5 space-y-4">
            <h2 id="auth-modal-title" className="text-lg font-bold text-[#1C2724]">
              {locale === 'id-ID'
                ? `Masuk sebagai ${currentUser.name}`
                : `Log masuk sebagai ${currentUser.name}`}
            </h2>
            <p className="text-xs text-[#1C2724]/75">
              {currentUser.email} · {currentUser.country === 'ID' ? 'Indonesia' : 'Malaysia'}
            </p>
            <div className="p-3.5 rounded-xl bg-[#DDEBE3]/60 text-xs text-[#145A4A] font-medium">
              {locale === 'id-ID'
                ? '✓ Kemajuan belajar, kata tersimpan, dan jadwal ulasan Anda tersinkronisasi.'
                : '✓ Kemajuan pembelajaran, perkataan disimpan dan jadual ulang kaji anda telah disegerakkan.'}
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-[#1C2724]/20 text-[#1C2724] hover:bg-white"
              >
                {locale === 'id-ID' ? 'Keluar' : 'Log Keluar'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
            <div>
              <h2 id="auth-modal-title" className="text-lg font-bold text-[#1C2724]">
                {locale === 'id-ID'
                  ? 'Masuk atau Simpan Kemajuan Belajar'
                  : 'Log Masuk atau Simpan Kemajuan Pembelajaran'}
              </h2>
              <p className="text-xs text-[#1C2724]/70 mt-1">
                {locale === 'id-ID'
                  ? 'Anda dapat belajar tanpa akun. Buat akun hanya jika ingin menyimpan profil kemajuan Anda.'
                  : 'Anda boleh belajar tanpa akaun. Cipta akaun hanya jika ingin menyimpan profil kemajuan anda.'}
              </p>
            </div>

            <div>
              <label
                htmlFor="auth-name"
                className="block text-xs font-semibold text-[#1C2724] mb-1"
              >
                {locale === 'id-ID' ? 'Nama Panggilan / Lengkap' : 'Nama Panggilan / Penuh'}
              </label>
              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === 'id-ID' ? 'Mis. Ahmad Fauzi' : 'Cth. Ahmad Fauzi'}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#1C2724]/15 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="auth-email"
                className="block text-xs font-semibold text-[#1C2724] mb-1"
              >
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#1C2724]/15 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="auth-password"
                className="block text-xs font-semibold text-[#1C2724] mb-1"
              >
                {locale === 'id-ID' ? 'Kata Sandi' : 'Kata Laluan'}
              </label>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#1C2724]/15 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C2724] mb-1">
                {locale === 'id-ID' ? 'Negara Domisili' : 'Negara Tempat Tinggal'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCountry('ID')}
                  className={`p-2 rounded-xl border text-xs font-semibold ${
                    country === 'ID'
                      ? 'bg-[#145A4A] text-white border-[#145A4A]'
                      : 'bg-white text-[#1C2724] border-[#1C2724]/15'
                  }`}
                >
                  Indonesia
                </button>
                <button
                  type="button"
                  onClick={() => setCountry('MY')}
                  className={`p-2 rounded-xl border text-xs font-semibold ${
                    country === 'MY'
                      ? 'bg-[#145A4A] text-white border-[#145A4A]'
                      : 'bg-white text-[#1C2724] border-[#1C2724]/15'
                  }`}
                >
                  Malaysia
                </button>
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#145A4A] text-white text-xs sm:text-sm font-semibold hover:bg-[#10483B]"
            >
              {locale === 'id-ID'
                ? 'Masuk & Simpan Kemajuan'
                : 'Log Masuk & Simpan Kemajuan'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
