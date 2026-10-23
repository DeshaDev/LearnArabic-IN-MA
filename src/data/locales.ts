import { LocaleCode } from '../types/learning';

export interface LocaleDictionary {
  code: LocaleCode;
  urlPrefix: '/id/' | '/my/';
  countryName: string;
  languageLabel: string;
  seoTitle: string;
  seoDescription: string;
  nav: {
    home: string;
    paths: string;
    method: string;
    resources: string;
    dashboard: string;
    vocabulary: string;
    review: string;
    signIn: string;
    startFree: string;
  };
  hero: {
    kicker: string;
    headline: string;
    supporting: string;
    primaryCta: string;
    secondaryCta: string;
    noAccountNote: string;
    previewTitle: string;
    previewInstruction: string;
  };
  startingPoint: {
    kicker: string;
    headline: string;
    subtitle: string;
    diagnosticCta: string;
    paths: {
      understandQuran: {
        tag: string;
        title: string;
        description: string;
        outcome: string;
        cta: string;
      };
      quranReading: {
        tag: string;
        title: string;
        description: string;
        outcome: string;
        cta: string;
      };
      prayerComprehension: {
        tag: string;
        title: string;
        description: string;
        outcome: string;
        cta: string;
      };
    };
  };
  sampleLesson: {
    kicker: string;
    headline: string;
    subtitle: string;
    step1Label: string;
    step2Label: string;
    step3Label: string;
    openFullExplorer: string;
  };
  howItWorks: {
    kicker: string;
    headline: string;
    subtitle: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      detail: string;
    }>;
  };
  journeyMap: {
    kicker: string;
    headline: string;
    subtitle: string;
    tableHeaders: {
      stage: string;
      focus: string;
      outcome: string;
      prerequisite: string;
    };
    stages: Array<{
      stage: string;
      focus: string;
      outcome: string;
      prerequisite: string;
    }>;
  };
  dailyLife: {
    kicker: string;
    headline: string;
    subtitle: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
    ramadanBanner: {
      tag: string;
      title: string;
      description: string;
      toggleLabel: string;
    };
  };
  trustSection: {
    kicker: string;
    headline: string;
    subtitle: string;
    pillars: Array<{
      title: string;
      body: string;
      sourceNote: string;
    }>;
    boundaryTitle: string;
    whatWeTeach: string[];
    whatWeDoNotClaim: string[];
  };
  footer: {
    tagline: string;
    finalCtaHeadline: string;
    finalCtaSubtitle: string;
    links: {
      about: string;
      curriculum: string;
      sources: string;
      faq: string;
      contact: string;
      privacy: string;
      terms: string;
    };
    copyright: string;
  };
  common: {
    wordLabel: string;
    wordsLabel: string;
    meaningInContext: string;
    grammaticalRole: string;
    rootFamily: string;
    verifiedSource: string;
    bookmarkWord: string;
    bookmarked: string;
    listenAudio: string;
    playingAudio: string;
    transliteration: string;
    nextStep: string;
    prevStep: string;
    completeLesson: string;
    backToHome: string;
    openOnboarding: string;
  };
}

export const LOCALES: Record<LocaleCode, LocaleDictionary> = {
  'id-ID': {
    code: 'id-ID',
    urlPrefix: '/id/',
    countryName: 'Indonesia',
    languageLabel: 'Bahasa Indonesia (ID)',
    seoTitle: 'Faham Ayat — Pahami Al-Qur’an, Satu Kata Demi Satu Kata',
    seoDescription:
      'Pelajari kosakata, struktur kalimat, dan makna ayat Al-Qur’an secara bertahap melalui pelajaran singkat yang mudah diikuti.',
    nav: {
      home: 'Beranda',
      paths: 'Jalur Belajar',
      method: 'Metode',
      resources: 'Materi',
      dashboard: 'Dasbor',
      vocabulary: 'Kosakata',
      review: 'Ulasan',
      signIn: 'Masuk',
      startFree: 'Mulai belajar gratis',
    },
    hero: {
      kicker: 'Pembelajaran Bahasa Arab Al-Qur’an Terstruktur · Indonesia',
      headline: 'Pahami Al-Qur’an, satu kata demi satu kata.',
      supporting:
        'Pelajari kosakata, struktur kalimat, dan makna ayat secara bertahap melalui pelajaran singkat yang mudah diikuti.',
      primaryCta: 'Mulai belajar gratis',
      secondaryCta: 'Lihat pelajaran contoh',
      noAccountNote:
        'Pelajaran pertama dan penentuan tingkat awal dapat dicoba langsung tanpa membuat akun.',
      previewTitle: 'Ruang Belajar Ayat Explorer',
      previewInstruction: 'Klik salah satu kata Arab di bawah untuk melihat makna kontekstual, fungsi kalimat, dan akar katanya.',
    },
    startingPoint: {
      kicker: 'Titik Awal Personal',
      headline: 'Dari mana Anda ingin memulai hari ini?',
      subtitle:
        'Membaca Al-Qur’an dengan tajwid, memahami bahasa Arab Al-Qur’an, dan meresapi bacaan salat adalah kebutuhan yang berbeda. Pilih jalur yang sesuai atau ikuti pemetaan singkat 1 menit.',
      diagnosticCta: 'Tentukan Jalur Saya (1 Menit)',
      paths: {
        understandQuran: {
          tag: 'Jalur Utama · Pahami Al-Qur’an',
          title: 'Pahami Bahasa Arab Al-Qur’an',
          description:
            'Pelajari kosakata Al-Qur’an di dalam konteks ayatnya, kenali kata ganti, kata depan, dan susunan kalimat dasar secara bertahap.',
          outcome: 'Hasil belajar: Mengenali arti kata, akar kata, dan hubungan antarkata saat membaca mushaf.',
          cta: 'Mulai Jalur Pemahaman',
        },
        quranReading: {
          tag: 'Huruf Hijaiyah · Tajwid · Bacaan',
          title: 'Perbaiki Bacaan & Tajwid Al-Qur’an',
          description:
            'Dari pengenalan huruf dan harakat, penyambungan kata, makharijul huruf, hingga hukum tajwid dan tanda waqaf dengan audio terverifikasi.',
          outcome: 'Hasil belajar: Membaca ayat dengan harakat dan kaidah tajwid dasar yang lebih tertib.',
          cta: 'Mulai Jalur Bacaan',
        },
        prayerComprehension: {
          tag: 'Memahami Bacaan Salat',
          title: 'Pahami Apa yang Dibaca dalam Salat',
          description:
            'Jalur praktis untuk memahami setiap kata dalam Surah Al-Fatihah, surat pendek pilihan, serta zikir dan doa salat yang shahih.',
          outcome: 'Hasil belajar: Menghadirkan pemahaman arti kata saat berdiri, rukuk, sujud, dan tasyahud.',
          cta: 'Mulai Jalur Bacaan Salat',
        },
      },
    },
    sampleLesson: {
      kicker: 'Coba Satu Pelajaran Langsung',
      headline: 'Rasakan cara kerja Ayat Explorer tanpa mendaftar',
      subtitle:
        'Pilih kata Arab pada ayat pertama Surah Al-Fatihah di bawah ini, pelajari perannya dalam kalimat, lalu uji pemahaman Anda melalui soal singkat.',
      step1Label: '1. Eksplorasi Kata & Akar Bahasa',
      step2Label: '2. Struktur Frasa & Sumber Tafsir',
      step3Label: '3. Uji Pemahaman Aktif',
      openFullExplorer: 'Buka Pelajaran Lengkap 7 Langkah',
    },
    howItWorks: {
      kicker: 'Metode Pembelajaran 7 Langkah',
      headline: 'Bukan sekadar daftar video atau terjemahan lepas',
      subtitle:
        'Setiap pelajaran berdurasi 5–10 menit dan dirancang berdasarkan prinsip pengingatan aktif (active recall) serta latihan berjarak (spaced practice).',
      steps: [
        {
          number: '01. Kenali & Dengarkan',
          title: 'Dengarkan pelafalan dan pahami kata di dalam ayat',
          description:
            'Setiap kata dipelajari di dalam konteks ayat Al-Qur’an yang utuh, bukan sekadar daftar hafalan kata lepas tanpa kalimat.',
          detail: 'Dilengkapi audio per frasa dan penanda harakat yang jelas.',
        },
        {
          number: '02. Pahami Struktur',
          title: 'Lihat bagaimana kata benda, kata kerja, dan partikel bekerja',
          description:
            'Satu konsep bahasa per pelajaran—seperti fungsi huruf jar (بِ / لِ) atau kata ganti—tanpa membebani pemula dengan istilah nahwu yang rumit.',
          detail: 'Pembelajar tingkat lanjut dapat membuka catatan tata bahasa tambahan.',
        },
        {
          number: '03. Latih Pemahaman',
          title: 'Terapkan lewat latihan makna, pencocokan kata, dan peran kalimat',
          description:
            'Pertanyaan interaktif menguji apakah Anda benar-benar memahami fungsi kata dalam ayat, lengkap dengan umpan balik langsung.',
          detail: 'Tiga format latihan terstruktur di setiap pelajaran.',
        },
        {
          number: '04. Ulas Secara Berkala',
          title: 'Simpan ke jadwal ulasan berjarak agar tidak mudah lupa',
          description:
            'Kata yang sudah dipelajari dijadwalkan ulang secara bertahap (1 hari, 3 hari, 7 hari, 14 hari) untuk memperkuat daya ingat jangka panjang.',
          detail: 'Tanpa papan peringkat publik atau notifikasi yang menyalahkan.',
        },
      ],
    },
    journeyMap: {
      kicker: 'Peta Kurikulum Terukur',
      headline: 'Perjalanan belajar yang menghargai kemampuan awal Anda',
      subtitle:
        'Pembaca yang sudah lancar membaca Al-Qur’an tidak dipaksa mengulang dari huruf alif-ba-ta, sedangkan pemula tidak langsung didorong ke istilah tata bahasa yang berat.',
      tableHeaders: {
        stage: 'Tahap Kurikulum',
        focus: 'Fokus Materi yang Dipelajari',
        outcome: 'Capaian Pembelajaran Terukur',
        prerequisite: 'Prasyarat',
      },
      stages: [
        {
          stage: 'Tahap 0 · Pemetaan Awal',
          focus: 'Identifikasi kemampuan baca huruf, harakat, dan tujuan utama belajar.',
          outcome: 'Rekomendasi jalur dan tingkat awal yang sesuai kebutuhan.',
          prerequisite: 'Terbuka untuk semua pengunjung',
        },
        {
          stage: 'Tahap 1 · Kata & Makna Kontekstual',
          focus: 'Kosakata Al-Qur’an pilihan di dalam ayat beserta pelafalan dan arti kontekstual.',
          outcome: 'Mengenali arti kata kunci saat membaca ayat yang dipelajari.',
          prerequisite: 'Mengenal huruf & harakat dasar',
        },
        {
          stage: 'Tahap 2 · Pembentuk Kalimat',
          focus: 'Kata ganti (dhamir), kata depan (harf jar), kata tunjuk, dan pola kalimat sederhana.',
          outcome: 'Membedakan fungsi partikel, kata benda, dan kata kerja dalam frasa pendek.',
          prerequisite: 'Menyelesaikan Tahap 1 atau lolos pemetaan awal',
        },
        {
          stage: 'Tahap 3 · Keluarga Kata & Akar (Sharaf Dasar)',
          focus: 'Hubungan akar kata tiga huruf (seperti ر-ح-م dan ح-م-د) serta turunan katanya di Al-Qur’an.',
          outcome: 'Menyadari keterkaitan makna antarkata yang berasal dari akar yang sama.',
          prerequisite: 'Menyelesaikan Tahap 2',
        },
        {
          stage: 'Tahap 4 · Pemahaman Ayat & Konteks',
          focus: 'Memadukan kosakata, struktur frasa, terjemahan resmi Kemenag RI, dan ringkasan tafsir.',
          outcome: 'Memahami susunan ayat pendek dengan merujuk pada sumber yang terverifikasi.',
          prerequisite: 'Menyelesaikan Tahap 3',
        },
        {
          stage: 'Tahap 5 · Kemandirian & Ulasan Berkelanjutan',
          focus: 'Latihan pemahaman bacaan bertahap dan jadwal ulasan berjarak.',
          outcome: 'Mempertahankan kosakata yang telah dikuasai dalam bacaan harian.',
          prerequisite: 'Menyelesaikan Tahap 4',
        },
      ],
    },
    dailyLife: {
      kicker: 'Dirancang untuk Keseharian',
      headline: 'Belajar 5–10 menit sehari dengan tenang dan konsisten',
      subtitle:
        'Dirancang untuk orang dewasa, mahasiswa, dan keluarga di Indonesia yang ingin menyisipkan belajar bahasa Arab Al-Qur’an di sela aktivitas harian.',
      cards: [
        {
          title: 'Sesi Singkat Setelah Salat atau Sebelum Beraktivitas',
          description:
            'Setiap pelajaran dibagi menjadi 7 langkah ringkas yang dapat diselesaikan dalam 5 hingga 10 menit di ponsel Anda.',
        },
        {
          title: 'Kembali Belajar Kapan Saja Tanpa Rasa Bersalah',
          description:
            'Tidak ada hitungan beruntun (streak) yang menghukum saat Anda sibuk. Sistem ulasan kami menyesuaikan kembali jadwal kata Anda secara ramah.',
        },
        {
          title: 'Siap untuk Belajar Mandiri Maupun Halaqah Keluarga',
          description:
            'Setiap penjelasan dilengkapi rujukan ayat dan sumber terjemahan yang jelas sehingga mudah didiskusikan bersama keluarga atau guru mengaji.',
        },
      ],
      ramadanBanner: {
        tag: 'Program Musiman Opsional',
        title: 'Seri Kosakata Pilihan Ramadan & Tadabbur Harian',
        description:
          'Aktifkan modul tematik 30 kata kunci dari ayat-ayat puasa, takwa, dan doa malam Lailatul Qadar kapan pun Anda ingin menambah fokus musiman.',
        toggleLabel: 'Pratinjau Modul Tematik Ramadan',
      },
    },
    trustSection: {
      kicker: 'Integritas Konten & Kredibilitas Ilmiah',
      headline: 'Transparansi sumber Al-Qur’an, terjemahan, dan batasan keilmuan',
      subtitle:
        'Faham Ayat memisahkan dengan tegas antara penjelasan bahasa Arab, kutipan tafsir resmi, dan catatan refleksi pribadi pembelajar.',
      pillars: [
        {
          title: 'Teks Al-Qur’an & Terjemahan Resmi',
          body: 'Teks ayat menggunakan Rasm Utsmani terstandar dan merujuk pada Terjemahan Al-Qur’an Kementerian Agama Republik Indonesia (Edisi Penyempurnaan 2019).',
          sourceNote: 'Sumber rujukan: Lajnah Pentashihan Mushaf Al-Qur’an (LPMQ) Kemenag RI.',
        },
        {
          title: 'Ringkasan Konteks Tafsir Teridentifikasi',
          body: 'Konteks makna ayat diringkas dengan menyebutkan rujukan secara eksplisit dari Tafsir Ringkas Kemenag RI dan Tafsir Al-Muyassar.',
          sourceNote: 'Tidak ada tafsir yang dibuat secara otomatis tanpa atribusi sumber.',
        },
        {
          title: 'Data Leksikal & Morfologi Terverifikasi',
          body: 'Setiap akar kata (tsulatsi), kategori kata (isim, fi’il, harf), dan rujukan nomor surah:ayat telah melalui validasi struktur bahasa.',
          sourceNote: 'Merujuk pada pedoman kurikulum Bahasa Arab Madrasah/Kemenag & kamus leksikal Al-Qur’an.',
        },
      ],
      boundaryTitle: 'Apa yang Kami Ajarkan & Apa yang Tidak Kami Klaim',
      whatWeTeach: [
        'Pengenalan kosakata Al-Qur’an di dalam konteks ayat yang terverifikasi.',
        'Pemahaman fungsi kata ganti, kata depan, akar kata, dan struktur kalimat dasar.',
        'Pemahaman makna bacaan Surah Al-Fatihah dan bacaan salat yang berdasar riwayat shahih.',
      ],
      whatWeDoNotClaim: [
        'Kami tidak mengklaim bahwa menyelesaikan sejumlah pelajaran otomatis membuat seseorang mampu menafsirkan Al-Qur’an secara mandiri.',
        'Kami tidak mengklaim bahwa pemutar audio di peramban dapat menggantikan koreksi makhraj dan tajwid langsung (talaqqi) bersama guru bersanad.',
        'Kami tidak menyajikan catatan refleksi pengguna sebagai fatwa atau tafsir otoritatif.',
      ],
    },
    footer: {
      tagline:
        'Platform pembelajaran bahasa Arab Al-Qur’an dan pemahaman bacaan ibadah yang terstruktur untuk Indonesia dan Malaysia.',
      finalCtaHeadline: 'Mulai pahami kata demi kata yang Anda baca setiap hari',
      finalCtaSubtitle:
        'Coba pelajaran pertama secara langsung tanpa biaya dan tanpa kewajiban membuat akun terlebih dahulu.',
      links: {
        about: 'Tentang Faham Ayat',
        curriculum: 'Kurikulum & Metode Mengajar',
        sources: 'Sumber & Tinjauan Editor',
        faq: 'Pertanyaan Umum (FAQ)',
        contact: 'Hubungi Kami',
        privacy: 'Kebijakan Privasi',
        terms: 'Ketentuan Layanan',
      },
      copyright: '© 2026 Faham Ayat. Seluruh rujukan ayat dan terjemahan disebutkan sesuai sumber resminya.',
    },
    common: {
      wordLabel: 'Kata Arab',
      wordsLabel: 'Kata dipelajari',
      meaningInContext: 'Makna dalam Konteks Ayat',
      grammaticalRole: 'Fungsi & Kategori Kata',
      rootFamily: 'Akar & Keluarga Kata',
      verifiedSource: 'Sumber Terverifikasi',
      bookmarkWord: 'Simpan Kata',
      bookmarked: 'Tersimpan',
      listenAudio: 'Dengarkan Pelafalan',
      playingAudio: 'Memutar Audio...',
      transliteration: 'Transliterasi',
      nextStep: 'Langkah Berikutnya',
      prevStep: 'Langkah Sebelumnya',
      completeLesson: 'Selesaikan Pelajaran & Jadwalkan Ulasan',
      backToHome: 'Kembali ke Beranda',
      openOnboarding: 'Sesuaikan Jalur Belajar',
    },
  },
  'ms-MY': {
    code: 'ms-MY',
    urlPrefix: '/my/',
    countryName: 'Malaysia',
    languageLabel: 'Bahasa Melayu (MY)',
    seoTitle: 'Faham Ayat — Fahami al-Quran, Satu Perkataan Demi Satu Perkataan',
    seoDescription:
      'Pelajari kosa kata, struktur ayat dan makna al-Quran secara berperingkat melalui pelajaran ringkas yang mudah diikuti untuk pelajar di Malaysia.',
    nav: {
      home: 'Laman Utama',
      paths: 'Laluan Pembelajaran',
      method: 'Kaedah',
      resources: 'Bahan Pembelajaran',
      dashboard: 'Papan Pemuka',
      vocabulary: 'Kosa Kata',
      review: 'Ulang Kaji',
      signIn: 'Log Masuk',
      startFree: 'Mula belajar secara percuma',
    },
    hero: {
      kicker: 'Pembelajaran Bahasa Arab al-Quran Berstruktur · Malaysia',
      headline: 'Fahami al-Quran, satu perkataan demi satu perkataan.',
      supporting:
        'Pelajari kosa kata, struktur ayat dan makna al-Quran secara berperingkat melalui pelajaran ringkas yang mudah diikuti.',
      primaryCta: 'Mula belajar secara percuma',
      secondaryCta: 'Lihat contoh pelajaran',
      noAccountNote:
        'Pelajaran pertama dan penilaian tahap awal boleh dicuba terus tanpa perlu mendaftar akaun.',
      previewTitle: 'Ruang Pembelajaran Ayat Explorer',
      previewInstruction: 'Pilih mana-mana perkataan Arab di bawah untuk melihat makna mengikut konteks, peranan tatabahasa dan akar perkataannya.',
    },
    startingPoint: {
      kicker: 'Titik Permulaan Peribadi',
      headline: 'Dari manakah anda ingin memulakan pembelajaran?',
      subtitle:
        'Membaca al-Quran dengan tajwid, memahami bahasa Arab al-Quran dan menghayati bacaan solat memerlukan pendekatan yang berbeza. Pilih laluan yang sesuai atau lengkapkan saringan ringkas 1 minit.',
      diagnosticCta: 'Cadangkan Laluan Saya (1 Minit)',
      paths: {
        understandQuran: {
          tag: 'Laluan Utama · Fahami al-Quran',
          title: 'Fahami Bahasa Arab al-Quran',
          description:
            'Pelajari kosa kata al-Quran dalam konteks ayatnya, kenali kata ganti nama, kata sendi dan binaan ayat asas secara berperingkat.',
          outcome: 'Hasil pembelajaran: Mengenali makna perkataan, akar kata dan kaitan antara perkataan ketika membaca mushaf.',
          cta: 'Mulakan Laluan Kefahaman',
        },
        quranReading: {
          tag: 'Huruf Hijaiyah · Tajwid · Bacaan',
          title: 'Perbaiki Bacaan & Tajwid al-Quran',
          description:
            'Daripada pengenalan huruf dan baris bacaan, penyambungan perkataan, makhraj huruf hinggalah hukum tajwid serta tanda waqaf dengan audio disahkan.',
          outcome: 'Hasil pembelajaran: Membaca ayat al-Quran dengan baris dan hukum tajwid asas yang lebih teratur.',
          cta: 'Mulakan Laluan Bacaan',
        },
        prayerComprehension: {
          tag: 'Memahami Bacaan Solat',
          title: 'Fahami Bacaan di Dalam Solat',
          description:
            'Modul amali untuk memahami setiap perkataan dalam Surah al-Fatihah, surah lazim pilihan serta bacaan zikir dan doa solat yang sahih.',
          outcome: 'Hasil pembelajaran: Menghayati makna setiap perkataan ketika berdiri, rukuk, sujud dan tahiyat.',
          cta: 'Mulakan Laluan Bacaan Solat',
        },
      },
    },
    sampleLesson: {
      kicker: 'Cuba Satu Pelajaran Sekarang',
      headline: 'Alami sendiri kaedah Ayat Explorer tanpa pendaftaran',
      subtitle:
        'Pilih perkataan Arab pada ayat pertama Surah al-Fatihah di bawah, teliti peranannya dalam binaan ayat, kemudian uji kefahaman anda melalui latihan ringkas.',
      step1Label: '1. Terokai Perkataan & Akar Bahasa',
      step2Label: '2. Binaan Frasa & Rujukan Tafsir',
      step3Label: '3. Uji Kefahaman Aktif',
      openFullExplorer: 'Buka Pelajaran Penuh 7 Langkah',
    },
    howItWorks: {
      kicker: 'Kaedah Pembelajaran 7 Langkah',
      headline: 'Bukan sekadar senarai video atau terjemahan terpisah',
      subtitle:
        'Setiap pelajaran mengambil masa 5–10 minit dan dibina berasaskan prinsip ingatan aktif (active recall) serta ulang kaji berjarak (spaced practice).',
      steps: [
        {
          number: '01. Kenali & Dengar',
          title: 'Dengar sebutan yang jelas dan fahami perkataan dalam konteks ayat',
          description:
            'Setiap perkataan dipelajari di dalam konteks ayat al-Quran yang sebenar, bukan sekadar menghafal senarai perkataan secara terasing.',
          detail: 'Dilengkapi kawalan audio dan tanda baris bacaan yang jelas.',
        },
        {
          number: '02. Fahami Binaan Ayat',
          title: 'Kenali bagaimana kata nama, kata kerja dan partikel berfungsi',
          description:
            'Satu konsep bahasa bagi setiap pelajaran—seperti fungsi huruf jar (بِ / لِ) atau kata ganti nama—tanpa membebankan pelajar baharu dengan istilah nahu yang sukar.',
          detail: 'Pelajar peringkat pertengahan boleh membuka nota tatabahasa lanjutan.',
        },
        {
          number: '03. Latih Kefahaman',
          title: 'Aplikasikan melalui latihan makna, padanan perkataan dan peranan ayat',
          description:
            'Soalan interaktif menguji sama ada anda benar-benar memahami fungsi perkataan dalam ayat, disertakan maklum balas penjelasan serta-merta.',
          detail: 'Tiga bentuk latihan berstruktur dalam setiap pelajaran.',
        },
        {
          number: '04. Ulang Kaji Berkala',
          title: 'Jadualkan ulang kaji berjarak supaya ilmu kekal diingati',
          description:
            'Perkataan yang telah dikuasai dijadualkan semula secara berperingkat (1 hari, 3 hari, 7 hari, 14 hari) bagi mengukuhkan ingatan jangka panjang.',
          detail: 'Tiada kedudukan awam yang menekan atau peringatan yang menimbulkan rasa bersalah.',
        },
      ],
    },
    journeyMap: {
      kicker: 'Peta Kurikulum Berperingkat',
      headline: 'Perjalanan pembelajaran yang menyesuaikan tahap sedia ada anda',
      subtitle:
        'Pelajar yang sudah lancar membaca al-Quran tidak dipaksa bermula semula daripada huruf alif-ba-ta, manakala pelajar baharu dibimbing langkah demi langkah.',
      tableHeaders: {
        stage: 'Peringkat Kurikulum',
        focus: 'Fokus Kandungan Pembelajaran',
        outcome: 'Hasil Pembelajaran yang Diukur',
        prerequisite: 'Prasyarat',
      },
      stages: [
        {
          stage: 'Peringkat 0 · Saringan Tahap Awal',
          focus: 'Kenal pasti keupayaan membaca huruf, baris dan matlamat utama pembelajaran.',
          outcome: 'Cadangan laluan serta peringkat permulaan yang tepat.',
          prerequisite: 'Terbuka kepada semua pelawat',
        },
        {
          stage: 'Peringkat 1 · Perkataan & Makna Kontekstual',
          focus: 'Kosa kata al-Quran terpilih di dalam ayat beserta sebutan dan makna mengikut konteks.',
          outcome: 'Mengenali makna perkataan utama ketika membaca ayat yang dipelajari.',
          prerequisite: 'Mengenal huruf hijaiyah & baris asas',
        },
        {
          stage: 'Peringkat 2 · Binaan Asas Ayat',
          focus: 'Kata ganti nama (dhamir), kata sendi (harf jar), kata tunjuk dan pola ayat mudah.',
          outcome: 'Membezakan fungsi partikel, kata nama dan kata kerja dalam frasa pendek.',
          prerequisite: 'Menamatkan Peringkat 1 atau lulus saringan awal',
        },
        {
          stage: 'Peringkat 3 · Keluarga Perkataan & Akar Bahasa',
          focus: 'Hubungan akar kata tiga huruf (seperti ر-ح-م dan ح-م-د) serta pecahan perkataannya dalam al-Quran.',
          outcome: 'Menyedari pertalian makna antara perkataan daripada akar yang sama.',
          prerequisite: 'Menamatkan Peringkat 2',
        },
        {
          stage: 'Peringkat 4 · Kefahaman Ayat & Konteks',
          focus: 'Menggabungkan kosa kata, binaan frasa, terjemahan rujukan JAKIM dan ringkasan tafsir.',
          outcome: 'Memahami binaan ayat pendek dengan merujuk kepada sumber berautoriti.',
          prerequisite: 'Menamatkan Peringkat 3',
        },
        {
          stage: 'Peringkat 5 · Pembacaan Kendiri & Ulang Kaji',
          focus: 'Latihan kefahaman bacaan berperingkat dan jadual ulang kaji berjarak.',
          outcome: 'Mengekalkan penguasaan kosa kata dalam pembacaan harian.',
          prerequisite: 'Menamatkan Peringkat 4',
        },
      ],
    },
    dailyLife: {
      kicker: 'Sesuai untuk Rutin Harian',
      headline: 'Belajar 5–10 minit sehari secara tenang dan berterusan',
      subtitle:
        'Direka khusus untuk golongan dewasa, pelajar universiti dan keluarga di Malaysia yang ingin meluangkan masa memahami al-Quran dalam kesibukan harian.',
      cards: [
        {
          title: 'Pelajaran Ringkas Selepas Solat atau Ketika Waktu Rehat',
          description:
            'Setiap pelajaran dibahagikan kepada 7 langkah terfokus yang boleh diselesaikan dalam 5 hingga 10 minit melalui telefon pintar.',
        },
        {
          title: 'Sambung Semula Pembelajaran Tanpa Tekanan',
          description:
            'Tiada amaran "streak" yang menimbulkan rasa bersalah apabila anda tertinggal sehari. Sistem ulang kaji kami menyusun semula jadual anda secara berhemah.',
        },
        {
          title: 'Sesuai untuk Ulang Kaji Kendiri atau Kuliah Keluarga',
          description:
            'Setiap penjelasan disertakan rujukan surah, ayat dan sumber terjemahan yang sahih supaya mudah dirujuk bersama keluarga atau ustaz pembimbing.',
        },
      ],
      ramadanBanner: {
        tag: 'Modul Bermusim Pilihan',
        title: 'Siri Kosa Kata Pilihan Ramadan & Penghayatan Ayat Puasa',
        description:
          'Aktifkan modul tematik 30 perkataan utama daripada ayat-ayat puasa, takwa dan doa malam Lailatulqadar pada bila-bila masa.',
        toggleLabel: 'Pratonton Modul Tematik Ramadan',
      },
    },
    trustSection: {
      kicker: 'Integriti Kandungan & Keselamatan Pendidikan Islam',
      headline: 'Ketelusan sumber al-Quran, terjemahan dan sempadan keilmuan',
      subtitle:
        'Faham Ayat membezakan dengan jelas antara penjelasan bahasa Arab, petikan tafsir berautoriti dan nota refleksi peribadi pelajar.',
      pillars: [
        {
          title: 'Teks al-Quran & Terjemahan Berautoriti',
          body: 'Teks ayat menggunakan Rasm Uthmani standard dan merujuk kepada Tafsir Pimpinan Ar-Rahman kepada Pengertian al-Quran (JAKIM Malaysia).',
          sourceNote: 'Sumber rujukan: Jabatan Kemajuan Islam Malaysia (JAKIM).',
        },
        {
          title: 'Ringkasan Konteks Tafsir yang Jelas Rujukannya',
          body: 'Konteks makna ayat diringkaskan dengan menyatakan rujukan secara jelas daripada Tafsir Pimpinan Ar-Rahman dan Tafsir Al-Muyassar.',
          sourceNote: 'Tiada huraian tafsir direka secara bebas tanpa sandaran sumber.',
        },
        {
          title: 'Rangka Kurikulum Bahasa Arab untuk Kefahaman Ibadah',
          body: 'Selaras dengan pendekatan pengajaran bahasa Arab al-Quran di Malaysia (seperti modul kefahaman bahasa Arab al-Quran ILIM) yang menghubungkan kosa kata, struktur ayat dan penghayatan solat.',
          sourceNote: 'Setiap akar perkataan dan kategori nahu disemak mengikut rujukan leksikal.',
        },
      ],
      boundaryTitle: 'Apa yang Kami Ajar & Apa yang Tidak Kami Dakwa',
      whatWeTeach: [
        'Penguasaan kosa kata al-Quran di dalam konteks ayat yang disahkan.',
        'Kefahaman fungsi kata ganti nama, kata sendi, akar perkataan dan struktur ayat asas.',
        'Kefahaman makna bacaan Surah al-Fatihah serta bacaan solat berasaskan riwayat sahih.',
      ],
      whatWeDoNotClaim: [
        'Kami tidak mendakwa bahawa menamatkan beberapa pelajaran melayakkan seseorang mengeluarkan hukum atau mentafsir al-Quran secara bebas.',
        'Kami tidak mendakwa bahawa audio pelayar web boleh menggantikan semakan makhraj dan tajwid secara talaqqi bersama guru bertauliah.',
        'Kami tidak memaparkan catatan refleksi pelajar sebagai tafsiran rasmi agama.',
      ],
    },
    footer: {
      tagline:
        'Platform pembelajaran bahasa Arab al-Quran dan kefahaman bacaan solat yang berstruktur untuk Malaysia dan Indonesia.',
      finalCtaHeadline: 'Mulakan langkah memahami setiap perkataan yang anda baca hari ini',
      finalCtaSubtitle:
        'Cuba pelajaran pertama secara percuma tanpa perlu mendaftar akaun terlebih dahulu.',
      links: {
        about: 'Mengenai Faham Ayat',
        curriculum: 'Kurikulum & Kaedah Pengajaran',
        sources: 'Sumber & Semakan Editorial',
        faq: 'Soalan Lazim (FAQ)',
        contact: 'Hubungi Kami',
        privacy: 'Dasar Privasi',
        terms: 'Terma Perkhidmatan',
      },
      copyright: '© 2026 Faham Ayat. Semua rujukan ayat dan terjemahan dinyatakan mengikut sumber rasmi.',
    },
    common: {
      wordLabel: 'Perkataan Arab',
      wordsLabel: 'Perkataan dipelajari',
      meaningInContext: 'Makna Mengikut Konteks Ayat',
      grammaticalRole: 'Fungsi & Kategori Perkataan',
      rootFamily: 'Akar & Keluarga Perkataan',
      verifiedSource: 'Sumber Disahkan',
      bookmarkWord: 'Simpan Perkataan',
      bookmarked: 'Disimpan',
      listenAudio: 'Dengar Sebutan',
      playingAudio: 'Memainkan Audio...',
      transliteration: 'Transliterasi',
      nextStep: 'Langkah Seterusnya',
      prevStep: 'Langkah Sebelumnya',
      completeLesson: 'Tamatkan Pelajaran & Jadualkan Ulang Kaji',
      backToHome: 'Kembali ke Laman Utama',
      openOnboarding: 'Sesuaikan Laluan Pembelajaran',
    },
  },
};
