import React, { useState } from 'react';
import { AuthUser, InfoPageId, LearnerProgress, LocaleCode } from '../types/learning';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Mail,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

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
  const [contactCategory, setContactCategory] = useState<
    'editorial' | 'partnership' | 'support'
  >('editorial');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactTicket, setContactTicket] = useState<{
    ticketId: string;
    submittedAt: number;
  } | null>(null);

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

  const submitContactRequest = async () => {
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
    setContactLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          category: contactCategory,
          message: contactMessage.trim(),
          locale,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(
          data.error ||
            (locale === 'id-ID'
              ? 'Gagal menyimpan pesan di server.'
              : 'Gagal menyimpan mesej pada pelayan.')
        );
      }
      setContactTicket({
        ticketId: data.ticketId,
        submittedAt: data.receivedAt || data.submittedAt || Date.now(),
      });
    } catch (err: any) {
      setContactError(
        err?.message ||
          (locale === 'id-ID'
            ? 'Gagal terhubung ke server. Silakan klik Coba Lagi.'
            : 'Gagal menghubungi pelayan. Sila klik Cuba Lagi.')
      );
    } finally {
      setContactLoading(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitContactRequest();
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

        {/* Navigation Tabs */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#1C2724]/10">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setContactError('');
                setContactTicket(null);
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
                  ? 'Kurikulum kami memisahkan secara tegas tiga keterampilan yang berbeda: (1) Memahami Bahasa Arab Al-Qur’an (Tahap 0–5), (2) Memperbaiki Bacaan & Tajwid, dan (3) Memahami Bacaan Salat (Al-Fatihah & Zikir Shahih).'
                  : 'Kurikulum kami memisahkan secara jelas tiga kemahiran yang berbeza: (1) Memahami Bahasa Arab al-Quran (Peringkat 0–5), (2) Memperbaiki Bacaan & Tajwid, dan (3) Memahami Bacaan Solat (al-Fatihah & Zikir Sahih).'}
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
                    ? 'Pemutar rekaman murattal terverifikasi (EveryAyah / Quran.com) dengan informasi status audio yang jujur.'
                    : 'Pemain rakaman murattal disahkan (EveryAyah / Quran.com) dengan maklumat status audio yang jujur.'}
                </li>
                <li>
                  <strong>3. Explore Arabic:</strong>{' '}
                  {locale === 'id-ID'
                    ? 'Eksplorasi kata per kata beserta akar 3 huruf dan tautan sumber.'
                    : 'Penerokaan perkataan demi perkataan beserta akar 3 huruf dan pautan sumber.'}
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
                    ? 'Penjadwalan ulasan berjarak (1, 3, 7, 14, 30 hari) berdasarkan tindakan belajar nyata.'
                    : 'Penjadualan ulang kaji berjarak (1, 3, 7, 14, 30 hari) berdasarkan tindakan belajar sebenar.'}
                </li>
              </ul>
            </>
          )}

          {activePage === 'sources' && (
            <>
              <h2 id="info-modal-title" className="text-xl font-bold text-[#1C2724]">
                {locale === 'id-ID'
                  ? 'Kebijakan Sumber, Lisensi Audio & Transparansi Editorial'
                  : 'Dasar Sumber, Lesen Audio & Ketelusan Editorial'}
              </h2>
              <div className="bg-white p-4 rounded-xl border border-[#1C2724]/10 space-y-3 text-xs sm:text-sm">
                <div>
                  <strong>1. Teks & Terjemahan Indonesia:</strong> Lajnah Pentashihan Mushaf Al-Qur’an (LPMQ) Kementerian Agama RI — Edisi Penyempurnaan 2019 & Tafsir Ringkas Kemenag RI.{' '}
                  <a
                    href="https://quran.kemenag.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#145A4A] font-semibold hover:underline"
                  >
                    <span>quran.kemenag.go.id</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <strong>2. Teks & Terjemahan Malaysia:</strong> Tafsir Pimpinan Ar-Rahman kepada Pengertian al-Quran (Jabatan Kemajuan Islam Malaysia / JAKIM).{' '}
                  <a
                    href="https://www.islam.gov.my"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#145A4A] font-semibold hover:underline"
                  >
                    <span>islam.gov.my</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <strong>3. Rekaman Audio Tilawah & Per Kata:</strong> Rekaman murattal ayat oleh Syaikh Mishary Rashid Alafasy melalui arsip terbuka EveryAyah.com dan audio kata per kata melalui Quran.com CDN (penggunaan pendidikan non-komersial). Jika jaringan memblokir CDN eksternal, aplikasi memberi tahu pengguna secara jujur dan tidak pernah menyajikan nada sintetis sebagai tilawah.{' '}
                  <a
                    href="https://everyayah.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#145A4A] font-semibold hover:underline"
                  >
                    <span>everyayah.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <strong>4. Rujukan Hadis Bacaan Salat:</strong> Shahih Muslim (Kitab Ash-Shalah No. 395, No. 476, No. 772).{' '}
                  <a
                    href="https://sunnah.com/muslim:772"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#145A4A] font-semibold hover:underline"
                  >
                    <span>sunnah.com/muslim:772</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#1C2724]/10 text-xs">
                  <strong>Status Tinjauan Editorial:</strong> Teks ayat dan terjemahan merujuk langsung pada sumber resmi Kemenag RI dan JAKIM. Penjelasan pedagogis bahasa (nahwu/sharaf ringkas) dan latihan tajwid berstatus <em>Draf Kurikulum Internal</em> dan wajib melalui pentashihan ulama/ahli qiraat bersanad sebelum rilis kelembagaan publik. Faham Ayat tidak mengklaim pengesahan dewan syariah eksternal yang belum terverifikasi.
                </div>
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
                    ? 'Tidak. Untuk ketepatan makhraj dan sifat huruf pada Jalur B, koreksi langsung dari guru yang kompeten tetap diperlukan. Fitur antrean permohonan di Jalur B mencatat pertanyaan bacaan Anda ke dalam antrean server lokal (bukan sistem penjadwalan panggilan langsung otomatis).'
                    : 'Tidak. Bagi ketepatan makhraj dan sifat huruf dalam Laluan B, teguran langsung daripada guru bertauliah tetap diperlukan. Fungsi giliran permohonan dalam Laluan B merekodkan soalan bacaan anda ke dalam giliran pelayan tempatan (bukannya sistem penjadualan panggilan langsung automatik).'}
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
                  ? 'Sampaikan pertanyaan, koreksi editorial, atau permohonan kerja sama. Pesan Anda disimpan langsung di basis data server aplikasi (/api/contact).'
                  : 'Hantarkan pertanyaan, cadangan semakan editorial atau permohonan kerjasama. Mesej anda disimpan terus di pangkalan data pelayan aplikasi (/api/contact).'}
              </p>

              {contactTicket ? (
                <div
                  role="status"
                  className="p-5 rounded-xl bg-[#DDEBE3] border border-[#145A4A] text-[#145A4A] space-y-2"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">
                        {locale === 'id-ID'
                          ? `Pesan Tercatat di Server (Tiket #${contactTicket.ticketId})`
                          : `Mesej Direkodkan di Pelayan (Tiket #${contactTicket.ticketId})`}
                      </div>
                      <p className="text-xs mt-1 text-[#1C2724]/85">
                        {locale === 'id-ID'
                          ? `Masukan dari ${contactEmail} telah disimpan di basis data server lokal. Catatan transparansi: Server ini menyimpan tiket di basis data aplikasi dan tidak mengirim email SMTP keluar secara otomatis.`
                          : `Maklum balas daripada ${contactEmail} telah disimpan dalam pangkalan data pelayan. Nota ketelusan: Pelayan ini menyimpan tiket dalam pangkalan data aplikasi dan tidak menghantar e-mel SMTP keluar secara automatik.`}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setContactTicket(null);
                      setContactMessage('');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-white text-[#145A4A] text-xs font-semibold border border-[#145A4A]/20"
                  >
                    {locale === 'id-ID' ? 'Kirim Pesan Lain' : 'Hantar Mesej Lain'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        htmlFor="contact-category"
                        className="block text-xs font-semibold text-[#1C2724] mb-1"
                      >
                        {locale === 'id-ID' ? 'Kategori Pesan' : 'Kategori Mesej'}
                      </label>
                      <select
                        id="contact-category"
                        value={contactCategory}
                        onChange={(e) =>
                          setContactCategory(
                            e.target.value as 'editorial' | 'partnership' | 'support'
                          )
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#1C2724]/15 text-xs sm:text-sm"
                      >
                        <option value="editorial">
                          {locale === 'id-ID'
                            ? 'Koreksi Teks / Editorial'
                            : 'Semakan Teks / Editorial'}
                        </option>
                        <option value="support">
                          {locale === 'id-ID'
                            ? 'Bantuan Teknis Pembelajar'
                            : 'Bantuan Teknikal Pelajar'}
                        </option>
                        <option value="partnership">
                          {locale === 'id-ID'
                            ? 'Kerja Sama Lembaga / Pengajar'
                            : 'Kerjasama Institusi / Guru'}
                        </option>
                      </select>
                    </div>
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
                    <div className="text-xs text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{contactError}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => void submitContactRequest()}
                        className="inline-flex items-center gap-1 font-semibold underline shrink-0"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>{locale === 'id-ID' ? 'Coba Lagi' : 'Cuba Lagi'}</span>
                      </button>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="px-5 py-2.5 rounded-xl bg-[#145A4A] text-white text-xs font-semibold hover:bg-[#10483B] disabled:opacity-50 inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>
                      {contactLoading
                        ? locale === 'id-ID'
                          ? 'Menyimpan ke Server...'
                          : 'Menyimpan ke Pelayan...'
                        : locale === 'id-ID'
                        ? 'Kirim Pesan ke Server'
                        : 'Hantar Mesej ke Pelayan'}
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
                  ? 'Kami menghormati privasi ibadah dan pembelajaran Anda. Anda dapat mempelajari pelajaran pertama dan menjelajahi fitur tanpa membuat akun.'
                  : 'Kami menghormati privasi ibadah dan pembelajaran anda. Anda boleh mempelajari pelajaran pertama dan meneroka ciri tanpa mencipta akaun.'}
              </p>
              <p>
                {locale === 'id-ID'
                  ? 'Jika Anda memilih membuat akun, kata sandi di-hash menggunakan scrypt di server dan kemajuan belajar disimpan untuk sinkronisasi lintas sesi. Sesi masuk berakhir otomatis setelah 30 hari; tombol Keluar Akun juga mencabut sesi di server.'
                  : 'Jika anda memilih untuk mencipta akaun, kata laluan di-hash menggunakan scrypt pada pelayan dan kemajuan pembelajaran disimpan untuk penyegerakan merentas sesi. Sesi log masuk tamat secara automatik selepas 30 hari; butang Log Keluar turut membatalkan sesi pada pelayan.'}
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
                  ? 'Faham Ayat adalah sarana edukasi bahasa Arab Al-Qur’an dan pemahaman bacaan ibadah. Materi di dalam platform ini tidak dimaksudkan sebagai fatwa hukum Islam mandiri maupun pengganti talaqqi bersama guru Al-Qur’an yang kompeten.'
                  : 'Faham Ayat ialah platform pendidikan bahasa Arab al-Quran dan kefahaman bacaan ibadah. Kandungan di dalam platform ini tidak bertujuan sebagai fatwa hukum Islam bebas mahupun pengganti talaqqi bersama guru al-Quran yang bertauliah.'}
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
  lastSyncedAt?: number | null;
  currentProgress?: LearnerProgress;
  onClose: () => void;
  onSignInSuccess: (
    user: AuthUser,
    authToken: string,
    serverProgress?: Partial<LearnerProgress> | null,
    syncedAt?: number
  ) => void;
  onSignOut: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  locale,
  currentUser,
  lastSyncedAt,
  currentProgress,
  onClose,
  onSignInSuccess,
  onSignOut,
}) => {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState<'ID' | 'MY'>(
    locale === 'ms-MY' ? 'MY' : 'ID'
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (mode === 'register' && (!name.trim() || name.trim().length < 2)) {
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
    const minimumPasswordLength = mode === 'register' ? 12 : 6;
    if (password.length < minimumPasswordLength) {
      setError(
        mode === 'register'
          ? locale === 'id-ID'
            ? 'Kata sandi pendaftaran minimal 12 karakter.'
            : 'Kata laluan pendaftaran mestilah sekurang-kurangnya 12 aksara.'
          : locale === 'id-ID'
            ? 'Kata sandi minimal 6 karakter.'
            : 'Kata laluan mestilah sekurang-kurangnya 6 aksara.'
      );
      return;
    }

    setError('');
    setLoading(true);
    try {
      const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          country,
          progress: currentProgress,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(
          data.error ||
            (locale === 'id-ID'
              ? 'Gagal memproses autentikasi di server.'
              : 'Gagal memproses pengesahan pada pelayan.')
        );
      }

      onSignInSuccess(
        data.user,
        data.token,
        data.progress || null,
        data.syncedAt || Date.now()
      );
      onClose();
    } catch (err: any) {
      setError(
        err?.message ||
          (locale === 'id-ID'
            ? 'Gagal terhubung ke server autentikasi.'
            : 'Gagal menghubungi pelayan pengesahan.')
      );
    } finally {
      setLoading(false);
    }
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
                ? 'Akun & Sinkronisasi Server (/api/progress)'
                : 'Akaun & Penyegerakan Pelayan (/api/progress)'}
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
            <div className="p-3.5 rounded-xl bg-[#DDEBE3]/60 text-xs text-[#145A4A] font-medium space-y-1">
              <div>
                {lastSyncedAt
                  ? locale === 'id-ID'
                    ? `✓ Tersinkronisasi ke basis data server pada ${new Date(
                        lastSyncedAt
                      ).toLocaleTimeString()}`
                    : `✓ Disegerakkan ke pangkalan data pelayan pada ${new Date(
                        lastSyncedAt
                      ).toLocaleTimeString()}`
                  : locale === 'id-ID'
                  ? 'Menunggu sinkronisasi ke server...'
                  : 'Menunggu penyegerakan ke pelayan...'}
              </div>
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
                {locale === 'id-ID' ? 'Keluar Akun' : 'Log Keluar'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
            <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-[#1C2724]/10">
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                  mode === 'register'
                    ? 'bg-[#145A4A] text-white'
                    : 'text-[#1C2724]/70 hover:text-[#1C2724]'
                }`}
              >
                {locale === 'id-ID' ? 'Daftar Akun Baru' : 'Daftar Akaun Baharu'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                  mode === 'login'
                    ? 'bg-[#145A4A] text-white'
                    : 'text-[#1C2724]/70 hover:text-[#1C2724]'
                }`}
              >
                {locale === 'id-ID' ? 'Masuk Akun' : 'Log Masuk'}
              </button>
            </div>

            <div>
              <h2 id="auth-modal-title" className="text-lg font-bold text-[#1C2724]">
                {mode === 'register'
                  ? locale === 'id-ID'
                    ? 'Buat Akun & Sinkronkan Kemajuan ke Server'
                    : 'Cipta Akaun & Segerakkan Kemajuan ke Pelayan'
                  : locale === 'id-ID'
                  ? 'Masuk untuk Memuat Kemajuan Anda'
                  : 'Log Masuk untuk Memuatkan Kemajuan Anda'}
              </h2>
              <p className="text-xs text-[#1C2724]/70 mt-1">
                {locale === 'id-ID'
                  ? 'Pelajaran pertama terbuka tanpa akun. Buat akun untuk menyimpan kemajuan ke server (/api/progress) dan melanjutkan di perangkat lain.'
                  : 'Pelajaran pertama terbuka tanpa akaun. Cipta akaun untuk menyimpan kemajuan ke pelayan (/api/progress) dan menyambung pada peranti lain.'}
              </p>
            </div>

            {mode === 'register' && (
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
            )}

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

            {mode === 'register' && (
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
            )}

            {error && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#145A4A] text-white text-xs sm:text-sm font-semibold hover:bg-[#10483B] disabled:opacity-50"
            >
              {loading
                ? locale === 'id-ID'
                  ? 'Memproses di Server...'
                  : 'Memproses pada Pelayan...'
                : mode === 'register'
                ? locale === 'id-ID'
                  ? 'Daftar & Sinkronkan Kemajuan'
                  : 'Daftar & Segerakkan Kemajuan'
                : locale === 'id-ID'
                ? 'Masuk & Muat Kemajuan'
                : 'Log Masuk & Muatkan Kemajuan'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
