import { CurriculumLevel, Lesson, WordToken } from '../types/learning';

export const EXTRA_WORDS: WordToken[] = [
  {
    id: 'w-maliki',
    arabic: 'مَـٰلِكِ',
    transliteration: 'Maliki',
    contextualMeaning: {
      'id-ID': 'Pemilik / Penguasa',
      'ms-MY': 'Yang Menguasai / Pemilik',
    },
    lexicalNote: {
      'id-ID':
        'Isim fa’il (pelaku) dari akar م-ل-ك yang menunjukkan kepemilikan mutlak dan kekuasaan penuh untuk menetapkan keputusan.',
      'ms-MY':
        'Isim fa’il (pelaku) daripada akar م-ل-ك yang menunjukkan pemilikan mutlak serta kekuasaan penuh.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Kata Sifat / Mudhaf (Sifat bagi Allah)',
      'ms-MY': 'Kata Sifat / Mudhaf (Sifat bagi Allah)',
    },
    advancedGrammarNote: {
      'id-ID': 'Majrur dengan kasrah karena menjadi sifat (na’at) bagi Lafzhul Jalalah pada ayat sebelumnya.',
      'ms-MY': 'Majrur dengan kasrah kerana menjadi sifat (na’at) bagi Lafzul Jalalah pada ayat sebelumnya.',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Fatihah 1:4',
    sourceAttribution: {
      'id-ID': 'Terjemahan & Tafsir Ringkas Kemenag RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM',
    },
    rootFamily: {
      rootArabic: 'م - ل - ك',
      rootLatin: 'm-l-k',
      coreConcept: {
        'id-ID': 'Kepemilikan, kekuasaan, dan kerajaan',
        'ms-MY': 'Pemilikan, kekuasaan dan pemerintahan',
      },
      linguisticNote: {
        'id-ID': 'Melahirkan kata مَالِك (Pemilik), مَلِك (Raja/Penguasa di QS. An-Nas 114:2), dan مَلَكُوت (kekuasaan agung).',
        'ms-MY': 'Melahirkan perkataan مَالِك (Pemilik), مَلِك (Raja/Penguasa dalam QS. an-Nas 114:2) dan مَلَكُوت (kekuasaan agung).',
      },
      relatedForms: [
        {
          arabic: 'مَلِكِ',
          transliteration: 'Maliki',
          meaning: { 'id-ID': 'Raja / Penguasa manusia', 'ms-MY': 'Raja / Penguasa manusia' },
          formType: { 'id-ID': 'Kata Sifat Kepemimpinan', 'ms-MY': 'Kata Sifat Pemerintahan' },
          verseRef: 'QS. An-Nas 114:2',
        },
        {
          arabic: 'ٱلْمُلْكُ',
          transliteration: 'Al-Mulku',
          meaning: { 'id-ID': 'Kerajaan / Kekuasaan', 'ms-MY': 'Kerajaan / Kekuasaan' },
          formType: { 'id-ID': 'Kata Benda (Mashdar)', 'ms-MY': 'Kata Nama (Masdar)' },
          verseRef: 'QS. Al-Mulk 67:1',
        },
      ],
    },
    audioFreqHz: [349.23, 392.0],
  },
  {
    id: 'w-addini',
    arabic: 'ٱلدِّينِ',
    transliteration: 'Ad-Dini',
    contextualMeaning: {
      'id-ID': 'Pembalasan / Perhitungan amal',
      'ms-MY': 'Pembalasan / Perhitungan amal',
    },
    lexicalNote: {
      'id-ID':
        'Kata دِين dalam bahasa Arab memiliki dua makna utama sesuai konteks: (1) Pembalasan dan perhitungan amal (seperti dalam يَوْمِ الدِّينِ), dan (2) Agama/ketaatan (seperti dalamQS. Al-Kafirun 109:6).',
      'ms-MY':
        'Perkataan دِين dalam bahasa Arab mempunyai dua makna utama mengikut konteks: (1) Pembalasan dan perhitungan amal (seperti dalam يَوْمِ الدِّينِ), dan (2) Agama/ketaatan (seperti dalam QS. al-Kafirun 109:6).',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Pelengkap Sandaran (Mudhaf Ilaih)',
      'ms-MY': 'Pelengkap Sandaran (Mudhaf Ilaih)',
    },
    advancedGrammarNote: {
      'id-ID': 'Majrur dengan kasrah sebagai mudhaf ilaih bagi kata يَوْمِ (hari). Menunjukkan pentingnya konteks dalam memahami kata Arab.',
      'ms-MY': 'Majrur dengan kasrah sebagai mudhaf ilaih bagi perkataan يَوْمِ (hari). Menunjukkan kepentingan konteks dalam memahami perkataan Arab.',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Fatihah 1:4',
    sourceAttribution: {
      'id-ID': 'Tafsir Ringkas Kemenag RI & Al-Muyassar',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM & Al-Muyassar',
    },
    rootFamily: {
      rootArabic: 'د - ي - ن',
      rootLatin: 'd-y-n',
      coreConcept: {
        'id-ID': 'Balasan amal, kepatuhan, dan aturan hidup',
        'ms-MY': 'Balasan amal, kepatuhan dan peraturan hidup',
      },
      linguisticNote: {
        'id-ID': 'Satu kata tidak selalu memiliki satu terjemahan tunggal di setiap ayat; konteks kalimat menentukan apakah الدِّين bermakna Hari Pembalasan atau Agama.',
        'ms-MY': 'Satu perkataan tidak semestinya mempunyai satu terjemahan tunggal dalam setiap ayat; konteks ayat menentukan sama ada الدِّين bermaksud Hari Pembalasan atau Agama.',
      },
      relatedForms: [
        {
          arabic: 'دِينُكُمْ',
          transliteration: 'Dinukum',
          meaning: { 'id-ID': 'Agama kalian', 'ms-MY': 'Agama kamu' },
          formType: { 'id-ID': 'Isim + Kata Ganti', 'ms-MY': 'Isim + Kata Ganti Nama' },
          verseRef: 'QS. Al-Kafirun 109:6',
        },
      ],
    },
    audioFreqHz: [392.0, 329.63],
  },
  {
    id: 'w-ahad',
    arabic: 'أَحَدٌ',
    transliteration: 'Ahadun',
    contextualMeaning: {
      'id-ID': 'Yang Maha Esa (Satu-satunya, tiada bandingan)',
      'ms-MY': 'Yang Maha Esa (Tunggal, tiada sekutu)',
    },
    lexicalNote: {
      'id-ID':
        'Menunjukkan keesaan mutlak yang tidak terbagi dan tidak memiliki serupa dalam Dzat, sifat, maupun perbuatan-Nya.',
      'ms-MY':
        'Menunjukkan keesaan mutlak yang tidak terbahagi dan tiada sebarang bandingan pada Zat, sifat mahupun perbuatan-Nya.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Predikat Kalimat (Khabar Kedua / Badal)',
      'ms-MY': 'Predikat Ayat (Khabar Kedua / Badal)',
    },
    advancedGrammarNote: {
      'id-ID': 'Marfu’ dengan tanwin dhammah (-un), menjelaskan keesaan Allah dalam kalimat nominal هُوَ اللَّهُ أَحَدٌ.',
      'ms-MY': 'Marfu’ dengan tanwin dhammah (-un), menjelaskan keesaan Allah dalam ayat namaan هُوَ اللَّهُ أَحَدٌ.',
    },
    stage: 4,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Ikhlas 112:1',
    sourceAttribution: {
      'id-ID': 'Terjemahan & Tafsir Ringkas Kemenag RI',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM',
    },
    rootFamily: {
      rootArabic: 'و - ح - د',
      rootLatin: 'w-h-d',
      coreConcept: {
        'id-ID': 'Keesaan dan ketunggalan',
        'ms-MY': 'Keesaan dan ketunggalan',
      },
      linguisticNote: {
        'id-ID': 'Berhubungan dengan kata وَاحِدٌ (satu) dan tauhid (mengesakan Allah).',
        'ms-MY': 'Berkaitan dengan perkataan وَاحِدٌ (satu) dan tauhid (mengesakan Allah).',
      },
      relatedForms: [
        {
          arabic: 'وَٰحِدٌ',
          transliteration: 'Wahidun',
          meaning: { 'id-ID': 'Yang Maha Esa / Satu', 'ms-MY': 'Yang Maha Esa / Satu' },
          formType: { 'id-ID': 'Kata Sifat (Isim Fa’il)', 'ms-MY': 'Kata Sifat (Isim Fa’il)' },
          verseRef: 'QS. Al-Baqarah 2:163',
        },
      ],
    },
    audioFreqHz: [329.63, 392.0],
  },
  {
    id: 'w-ashshamad',
    arabic: 'ٱلصَّمَدُ',
    transliteration: 'Ash-Shamadu',
    contextualMeaning: {
      'id-ID': 'Tempat meminta segala sesuatu (Tumpuan segala hajat)',
      'ms-MY': 'Yang menjadi tumpuan sekalian makhluk untuk memohon sebarang hajat',
    },
    lexicalNote: {
      'id-ID':
        'Dzat Yang Maha Sempurna yang seluruh makhluk bergantung kepada-Nya, sedangkan Dia tidak membutuhkan siapa pun.',
      'ms-MY':
        'Zat Yang Maha Sempurna yang seluruh makhluk bergantung kepada-Nya, manakala Dia tidak memerlukan sesiapa pun.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Predikat Kalimat (Khabar Marfu’)',
      'ms-MY': 'Predikat Ayat (Khabar Marfu’)',
    },
    advancedGrammarNote: {
      'id-ID': 'Khabar bagi mubtada’ (ٱللَّهُ) pada ayat kedua Surah Al-Ikhlas: ٱللَّهُ ٱلصَّمَدُ.',
      'ms-MY': 'Khabar bagi mubtada’ (ٱللَّهُ) pada ayat kedua Surah al-Ikhlas: ٱللَّهُ ٱلصَّمَدُ.',
    },
    stage: 4,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Ikhlas 112:2',
    sourceAttribution: {
      'id-ID': 'Terjemahan Kemenag RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM',
    },
    audioFreqHz: [349.23, 440.0],
  },
  {
    id: 'w-subhana',
    arabic: 'سُبْحَانَ',
    transliteration: 'Subhana',
    contextualMeaning: {
      'id-ID': 'Maha Suci (menyucikan Allah dari segala kekurangan)',
      'ms-MY': 'Maha Suci (menyucikan Allah daripada sebarang kekurangan)',
    },
    lexicalNote: {
      'id-ID':
        'Kata kunci utama dalam zikir rukuk (سُبْحَانَ رَبِّيَ الْعَظِيمِ) dan sujud (سُبْحَانَ رَبِّيَ الْأَعْلَى) serta banyak ayat Al-Qur’an.',
      'ms-MY':
        'Perkataan utama dalam bacaan rukuk (سُبْحَانَ رَبِّيَ الْعَظِيمِ) dan sujud (سُبْحَانَ رَبِّيَ الْأَعْلَى) serta banyak ayat al-Quran.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Kata Benda Penyucian (Mashdar / Maf’ul Muthlaq)',
      'ms-MY': 'Kata Nama Penyucian (Masdar / Maf’ul Mutlaq)',
    },
    advancedGrammarNote: {
      'id-ID': 'Manshub dengan fathah sebagai maf’ul muthlaq dari kata kerja yang disimpan (أُسَبِّحُ سُبْحَانَ) dan menjadi mudhaf.',
      'ms-MY': 'Mansub dengan fathah sebagai maf’ul mutlaq daripada kata kerja tersembunyi (أُسَبِّحُ سُبْحَانَ) serta menjadi mudhaf.',
    },
    stage: 2,
    pathwayId: 'prayer-comprehension',
    verseRef: 'Hadis Shahih Muslim No. 772 & QS. Al-Isra 17:1',
    sourceAttribution: {
      'id-ID': 'Shahih Muslim No. 772 (Bacaan Rukuk & Sujud)',
      'ms-MY': 'Sahih Muslim No. 772 (Bacaan Rukuk & Sujud)',
    },
    rootFamily: {
      rootArabic: 'س - ب - ح',
      rootLatin: 's-b-h',
      coreConcept: {
        'id-ID': 'Menyucikan, mengagungkan, dan bertasbih',
        'ms-MY': 'Menyucikan, mengagungkan dan bertasbih',
      },
      linguisticNote: {
        'id-ID': 'Melahirkan kata سَبَّحَ ( telah bertasbih), يُسَبِّحُ (sedang bertasbih), dan سَبِّحِ (bertasbihlah di QS. Al-A’la 87:1).',
        'ms-MY': 'Melahirkan perkataan سَبَّحَ (telah bertasbih), يُسَبِّحُ (sedang bertasbih) dan سَبِّحِ (bertasbihlah dalam QS. al-A’la 87:1).',
      },
      relatedForms: [
        {
          arabic: 'سَبِّحِ',
          transliteration: 'Sabbihi',
          meaning: { 'id-ID': 'Sucikanlah / Bertasbihlah', 'ms-MY': 'Sucikanlah / Bertasbihlah' },
          formType: { 'id-ID': 'Kata Kerja Perintah (Fi’il Amr)', 'ms-MY': 'Kata Kerja Perintah (Fi’il Amr)' },
          verseRef: 'QS. Al-A’la 87:1',
        },
      ],
    },
    audioFreqHz: [392.0, 349.23],
  },
  {
    id: 'w-alasr',
    arabic: 'وَٱلْعَصْرِ',
    transliteration: 'Wal-‘Ashri',
    contextualMeaning: {
      'id-ID': 'Demi masa (waktu yang sangat berharga)',
      'ms-MY': 'Demi Masa (waktu kehidupan manusia)',
    },
    lexicalNote: {
      'id-ID':
        'Huruf وَ (wa-) di awal surah ini bukan sekadar "dan", melainkan huruf sumpah (Wawul Qasam) yang berarti "Demi...", sehingga kata setelahnya berharakat akhir kasrah (-i).',
      'ms-MY':
        'Huruf وَ (wa-) pada permulaan surah ini bukan sekadar "dan", sebaliknya huruf sumpah (Wawul Qasam) yang bermaksud "Demi...", menjadikan perkataan selepasnya berbaris kasrah (-i).',
    },
    category: 'phrase',
    grammaticalRole: {
      'id-ID': 'Huruf Sumpah + Kata Benda Majrur (Wawul Qasam)',
      'ms-MY': 'Huruf Sumpah + Kata Nama Majrur (Wawul Qasam)',
    },
    advancedGrammarNote: {
      'id-ID': 'Wawul Qasam termasuk huruf jar yang membuat ٱلْعَصْرِ berstatus majrur dengan tanda kasrah.',
      'ms-MY': 'Wawul Qasam termasuk dalam huruf jar yang menjadikan ٱلْعَصْرِ berstatus majrur dengan tanda kasrah.',
    },
    stage: 5,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-‘Asr 103:1',
    sourceAttribution: {
      'id-ID': 'Terjemahan & Tafsir Ringkas Kemenag RI',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM',
    },
    audioFreqHz: [293.66, 392.0],
  },
];

export const EXTRA_LESSONS: Lesson[] = [
  {
    id: 'lesson-ayah-1b',
    pathwayId: 'understand-quran',
    level: 1,
    order: 2,
    title: {
      'id-ID': 'Konteks Kata & Hari Pembalasan (QS. Al-Fatihah 1:3–4)',
      'ms-MY': 'Konteks Perkataan & Hari Pembalasan (QS. al-Fatihah 1:3–4)',
    },
    subtitle: {
      'id-ID': 'QS. Al-Fatihah 1:3–4 · Mengapa satu kata Arab seperti الدِّين memiliki makna sesuai konteks ayat',
      'ms-MY': 'QS. al-Fatihah 1:3–4 · Mengapa satu perkataan Arab seperti الدِّين mempunyai makna mengikut konteks ayat',
    },
    durationMinutes: 6,
    prerequisiteLessonId: 'lesson-ayah-1',
    prerequisiteReason: {
      'id-ID': 'Melanjutkan pengenalan akar kata ر-ح-م dari Pelajaran 1.',
      'ms-MY': 'Melanjutkan pengenalan akar perkataan ر-ح-م daripada Pelajaran 1.',
    },
    sourceType: 'quran',
    verseRef: 'QS. Al-Fatihah 1:3–4',
    editorialStatus: 'verified-source',
    arabicPhrase: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ۝ مَـٰلِكِ يَوْمِ ٱلدِّينِ',
    transliterationPhrase: 'Ar-Rahmanir-Rahim · Maliki yaumid-din',
    verifiedTranslation: {
      'id-ID': 'Yang Maha Pengasih, Maha Penyayang. Pemilik hari pembalasan.',
      'ms-MY': 'Yang Maha Pemurah, lagi Maha Mengasihani. Yang Menguasai pemerintahan hari Pembalasan (hari Akhirat).',
    },
    translationSource: {
      'id-ID': 'Terjemahan Al-Qur’an Kementerian Agama RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM Malaysia)',
    },
    recall: {
      prompt: {
        'id-ID': 'Dari pelajaran Basmalah: Kedua kata ٱلرَّحْمَـٰنِ dan ٱلرَّحِيمِ berasal dari akar kata...',
        'ms-MY': 'Daripada pelajaran Basmalah: Kedua-dua perkataan ٱلرَّحْمَـٰنِ dan ٱلرَّحِيمِ berasal daripada akar...',
      },
      arabicPrompt: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
      options: [
        { 'id-ID': 'ر - ح - م (Kasih sayang)', 'ms-MY': 'ر - ح - م (Kasih sayang)' },
        { 'id-ID': 'م - ل - ك (Kepemilikan)', 'ms-MY': 'م - ل - ك (Pemilikan)' },
        { 'id-ID': 'د - ي - ن (Pembalasan)', 'ms-MY': 'د - ي - ن (Pembalasan)' },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Benar! Di ayat ke-3 dan ke-4, kasih sayang Allah disandingkan dengan kekuasaan-Nya atas Hari Pembalasan.',
        'ms-MY': 'Betul! Pada ayat ke-3 dan ke-4, rahmat Allah digandingkan dengan kekuasaan-Nya pada Hari Pembalasan.',
      },
    },
    audioDurationSeconds: 6,
    audioReciter: 'Audio Panduan Pelafalan Terverifikasi',
    audioLicense: 'Referensi Pendidikan Terbuka',
    wordIds: ['w-arrahmani', 'w-arrahimi', 'w-maliki', 'w-addini'],
    structureSummary: {
      'id-ID': 'Frasa مَـٰلِكِ يَوْمِ ٱلدِّينِ adalah rangkaian kata sandaran (idhafah): Pemilik → Hari → Pembalasan.',
      'ms-MY': 'Frasa مَـٰلِكِ يَوْمِ ٱلدِّينِ ialah rangkaian kata sandaran (idhafah): Pemilik → Hari → Pembalasan.',
    },
    grammarConceptTitle: {
      'id-ID': 'Satu Gagasan Bahasa: Makna Kata Ditentukan oleh Konteks Kalimat (ٱلدِّينِ)',
      'ms-MY': 'Satu Konsep Bahasa: Makna Perkataan Ditentukan oleh Konteks Ayat (ٱلدِّينِ)',
    },
    grammarConceptBody: {
      'id-ID':
        'Kata الدِّين dalam bahasa Indonesia dan Melayu diserap menjadi kata "agama". Namun, ketika bersanding dengan kata يَوْم (hari) menjadi يَوْمِ ٱلدِّينِ, artinya dalam konteks ayat ini adalah "Hari Pembalasan / Perhitungan Amal".',
      'ms-MY':
        'Perkataan الدِّين sering difahami sebagai "agama". Namun, apabila digabungkan dengan perkataan يَوْم (hari) menjadi يَوْمِ ٱلدِّينِ, maknanya dalam konteks ayat ini ialah "Hari Pembalasan / Perhitungan Amal".',
    },
    advancedGrammarBody: {
      'id-ID': 'Catatan Nahwu: مَـٰلِكِ adalah mudhaf, يَوْمِ adalah mudhaf ilaih sekaligus mudhaf kedua, dan ٱلدِّينِ adalah mudhaf ilaih majrur.',
      'ms-MY': 'Nota Nahu: مَـٰلِكِ ialah mudhaf, يَوْمِ ialah mudhaf ilaih merangkap mudhaf kedua, dan ٱلدِّينِ ialah mudhaf ilaih majrur.',
    },
    structureSegments: [
      {
        wordId: 'w-maliki',
        arabic: 'مَـٰلِكِ',
        roleLabel: { 'id-ID': 'Pemilik / Penguasa', 'ms-MY': 'Pemilik / Penguasa' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Dari akar م-ل-ك yang menunjukkan kepemilikan penuh.',
          'ms-MY': 'Daripada akar م-ل-ك yang menunjukkan pemilikan penuh.',
        },
      },
      {
        wordId: 'w-addini',
        arabic: 'يَوْمِ ٱلدِّينِ',
        roleLabel: { 'id-ID': 'Hari Pembalasan', 'ms-MY': 'Hari Pembalasan' },
        category: 'phrase',
        functionExplanation: {
          'id-ID': 'Kata الدِّين di sini bermakna pembalasan amal secara adil.',
          'ms-MY': 'Perkataan الدِّين di sini bermaksud pembalasan amal secara adil.',
        },
      },
    ],
    tafsirContext: {
      'id-ID': 'Penyebutan sifat Maha Pengasih sebelum Pemilik Hari Pembalasan menumbuhkan keseimbangan antara harapan (raja’) dan kewaspadaan (khauf) dalam diri seorang Muslim.',
      'ms-MY': 'Penyebutan sifat Maha Pemurah sebelum Pemilik Hari Pembalasan membina keseimbangan antara pengharapan (raja’) dengan rasa takut (khauf) dalam jiwa Muslim.',
    },
    tafsirSource: {
      'id-ID': 'Tafsir Ringkas Kementerian Agama RI (QS. Al-Fatihah: 3–4).',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM (QS. al-Fatihah: 3–4).',
    },
    reflectionPrompt: {
      'id-ID': 'Catatan Refleksi Pribadi: Apa yang Anda rasakan saat membaca berdampingan antara kasih sayang Allah dan Hari Perhitungan?',
      'ms-MY': 'Nota Refleksi Peribadi: Apakah yang anda rasai apabila membaca gandingan antara rahmat Allah dengan Hari Perhitungan?',
    },
    practice: {
      multipleChoice: {
        question: {
          'id-ID': 'Apa arti kata ٱلدِّينِ ketika berada di dalam frasa يَوْمِ ٱلدِّينِ (QS. Al-Fatihah 1:4)?',
          'ms-MY': 'Apakah makna perkataan ٱلدِّينِ apabila berada di dalam frasa يَوْمِ ٱلدِّينِ (QS. al-Fatihah 1:4)?',
        },
        arabicFocus: 'يَوْمِ ٱلدِّينِ',
        options: [
          { 'id-ID': 'Pembalasan / Perhitungan amal', 'ms-MY': 'Pembalasan / Perhitungan amal' },
          { 'id-ID': 'Perjalanan jauh', 'ms-MY': 'Perjalanan jauh' },
          { 'id-ID': 'Tempat tinggal', 'ms-MY': 'Tempat kediaman' },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Tepat! Dalam konteks يَوْمِ ٱلدِّينِ, kata الدِّين bermakna pembalasan dan perhitungan amal.',
          'ms-MY': 'Tepat sekali! Dalam konteks يَوْمِ ٱلدِّينِ, perkataan الدِّين bermaksud pembalasan dan perhitungan amal.',
        },
      },
      matching: {
        instruction: {
          'id-ID': 'Pasangkan kata berikut dengan artinya:',
          'ms-MY': 'Padankan perkataan berikut dengan maknanya:',
        },
        pairs: [
          {
            id: 'w-maliki',
            arabic: 'مَـٰلِكِ',
            transliteration: 'Maliki',
            meaning: { 'id-ID': 'Pemilik / Penguasa', 'ms-MY': 'Yang Menguasai / Pemilik' },
          },
          {
            id: 'w-addini',
            arabic: 'ٱلدِّينِ',
            transliteration: 'Ad-Dini',
            meaning: { 'id-ID': 'Pembalasan (konteks hari akhir)', 'ms-MY': 'Pembalasan (konteks hari akhirat)' },
          },
          {
            id: 'w-arrahmani',
            arabic: 'ٱلرَّحْمَـٰنِ',
            transliteration: 'Ar-Rahmani',
            meaning: { 'id-ID': 'Yang Maha Pengasih', 'ms-MY': 'Yang Maha Pemurah' },
          },
        ],
      },
      roleIdentification: {
        question: {
          'id-ID': 'Akar kata م - ل - ك pada مَـٰلِكِ juga membentuk kata مَلِكِ النَّاسِ yang berarti...',
          'ms-MY': 'Akar perkataan م - ل - ك pada مَـٰلِكِ turut membentuk perkataan مَلِكِ النَّاسِ yang bermaksud...',
        },
        sentenceArabic: 'مَـٰلِكِ يَوْمِ ٱلدِّينِ',
        targetWordArabic: 'مَـٰلِكِ',
        options: [
          { 'id-ID': 'Raja / Penguasa manusia (QS. An-Nas 114:2)', 'ms-MY': 'Raja / Penguasa manusia (QS. an-Nas 114:2)' },
          { 'id-ID': 'Pencipta langit', 'ms-MY': 'Pencipta langit' },
          { 'id-ID': 'Pemberi petunjuk', 'ms-MY': 'Pemberi petunjuk' },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Benar! Mengenali akar م-ل-ك menghubungkan pemahaman Anda antara Surah Al-Fatihah dan Surah An-Nas.',
          'ms-MY': 'Betul! Mengenali akar م-ل-ك menghubungkan kefahaman anda antara Surah al-Fatihah dengan Surah an-Nas.',
        },
      },
    },
  },
  {
    id: 'lesson-ayah-4',
    pathwayId: 'understand-quran',
    level: 4,
    order: 4,
    title: {
      'id-ID': 'Memahami Frasa & Kalimat Utuh: Surah Al-Ikhlas (112:1–2)',
      'ms-MY': 'Memahami Frasa & Ayat Penuh: Surah al-Ikhlas (112:1–2)',
    },
    subtitle: {
      'id-ID': 'QS. Al-Ikhlas 112:1–2 · Kata kerja perintah قُلْ, kata ganti هُوَ, dan kalimat nominal tauhid',
      'ms-MY': 'QS. al-Ikhlas 112:1–2 · Kata kerja perintah قُلْ, kata ganti nama هُوَ dan ayat namaan tauhid',
    },
    durationMinutes: 8,
    prerequisiteLessonId: 'lesson-ayah-3',
    prerequisiteReason: {
      'id-ID': 'Memadukan pengenalan kosakata, kata ganti, dan kalimat nominal dari Tahap 1–3.',
      'ms-MY': 'Menggabungkan pengenalan kosa kata, kata ganti nama dan ayat namaan daripada Peringkat 1–3.',
    },
    sourceType: 'quran',
    verseRef: 'QS. Al-Ikhlas 112:1–2',
    editorialStatus: 'verified-source',
    arabicPhrase: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ ۝ ٱللَّهُ ٱلصَّمَدُ',
    transliterationPhrase: 'Qul huwallahu Ahad · Allahush-Shamad',
    verifiedTranslation: {
      'id-ID': 'Katakanlah (Muhammad), "Dialah Allah, Yang Maha Esa. Allah tempat meminta segala sesuatu."',
      'ms-MY': 'Katakanlah (wahai Muhammad): "(Tuhanku) ialah Allah Yang Maha Esa; Allah Yang menjadi tumpuan sekalian makhluk untuk memohon sebarang hajat."',
    },
    translationSource: {
      'id-ID': 'Terjemahan Al-Qur’an Kementerian Agama RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM Malaysia)',
    },
    recall: {
      prompt: {
        'id-ID': 'Pada kalimat nominal bahasa Arab, kata benda yang menjadi subjek dan predikat utama berharakat dasar...',
        'ms-MY': 'Dalam ayat namaan bahasa Arab, kata nama yang menjadi subjek dan predikat utama mempunyai baris asal...',
      },
      arabicPrompt: 'ٱللَّهُ ٱلصَّمَدُ',
      options: [
        { 'id-ID': 'Dhammah (-u / -un) seperti ٱللَّهُ أَحَدٌ', 'ms-MY': 'Dhammah (-u / -un) seperti ٱللَّهُ أَحَدٌ' },
        { 'id-ID': 'Sukun (mati) di seluruh kata', 'ms-MY': 'Sukun (mati) pada semua perkataan' },
        { 'id-ID': 'Kasrah (-i) tanpa sebab', 'ms-MY': 'Kasrah (-i) tanpa sebab' },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Tepat! Kalimat هُوَ ٱللَّهُ أَحَدٌ dan ٱللَّهُ ٱلصَّمَدُ adalah dua kalimat nominal utuh yang menggunakan harakat dhammah.',
        'ms-MY': 'Tepat sekali! Ayat هُوَ ٱللَّهُ أَحَدٌ dan ٱللَّهُ ٱلصَّمَدُ ialah dua ayat namaan lengkap yang menggunakan baris dhammah.',
      },
    },
    audioDurationSeconds: 6,
    audioReciter: 'Audio Panduan Pelafalan Terverifikasi',
    audioLicense: 'Referensi Pendidikan Terbuka',
    wordIds: ['w-allahi', 'w-ahad', 'w-ashshamad'],
    structureSummary: {
      'id-ID': 'Dibuka dengan kata perintah قُلْ (Katakanlah), diikuti kata ganti هُوَ (Dia), lalu dua pernyataan tauhid: ٱللَّهُ أَحَدٌ dan ٱللَّهُ ٱلصَّمَدُ.',
      'ms-MY': 'Dimulakan dengan kata perintah قُلْ (Katakanlah), diikuti kata ganti nama هُوَ (Dia), kemudian dua pernyataan tauhid: ٱللَّهُ أَحَدٌ dan ٱللَّهُ ٱلصَّمَدُ.',
    },
    grammarConceptTitle: {
      'id-ID': 'Satu Gagasan Bahasa: Merangkai Kalimat Nominal Tanpa Kata "Adalah"',
      'ms-MY': 'Satu Konsep Bahasa: Membina Ayat Namaan Tanpa Perkataan "Ialah"',
    },
    grammarConceptBody: {
      'id-ID':
        'Dalam bahasa Arab, menyandingkan subjek ma’rifah (ٱللَّهُ) dengan sifat ber-Alif-Lam (ٱلصَّمَدُ) langsung membentuk kalimat utuh: "Allah (adalah) tempat bergantung segala sesuatu."',
      'ms-MY':
        'Dalam bahasa Arab, menggandingkan subjek ma’rifah (ٱللَّهُ) dengan sifat ber-Alif-Lam (ٱلصَّمَدُ) terus membentuk ayat lengkap: "Allah (ialah) tempat tumpuan segala hajat."',
    },
    advancedGrammarBody: {
      'id-ID': 'Catatan Nahwu: قُلْ adalah fi’il amr dari قَالَ - يَقُولُ. Kalimat هُوَ ٱللَّهُ أَحَدٌ berkedudukan sebagai maqul al-qaul (isi pernyataan).',
      'ms-MY': 'Nota Nahu: قُلْ ialah fi’il amr daripada قَالَ - يَقُولُ. Ayat هُوَ ٱللَّهُ أَحَدٌ berkedudukan sebagai maqul al-qaul (isi pernyataan).',
    },
    structureSegments: [
      {
        wordId: 'w-allahi',
        arabic: 'قُلْ هُوَ ٱللَّهُ',
        roleLabel: { 'id-ID': 'Perintah + Subjek (Katakanlah: Dialah Allah)', 'ms-MY': 'Perintah + Subjek (Katakanlah: Dialah Allah)' },
        category: 'phrase',
        functionExplanation: {
          'id-ID': 'قُلْ (Katakanlah) + هُوَ (Dia) + ٱللَّهُ.',
          'ms-MY': 'قُلْ (Katakanlah) + هُوَ (Dia) + ٱللَّهُ.',
        },
      },
      {
        wordId: 'w-ahad',
        arabic: 'أَحَدٌ',
        roleLabel: { 'id-ID': 'Predikat 1 (Yang Maha Esa)', 'ms-MY': 'Predikat 1 (Yang Maha Esa)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Menyatakan keesaan mutlak yang tiada bandingan.',
          'ms-MY': 'Menyatakan keesaan mutlak yang tiada bandingan.',
        },
      },
      {
        wordId: 'w-ashshamad',
        arabic: 'ٱلصَّمَدُ',
        roleLabel: { 'id-ID': 'Predikat 2 (Tempat Meminta)', 'ms-MY': 'Predikat 2 (Tumpuan Hajat)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Seluruh makhluk bergantung kepada-Nya.',
          'ms-MY': 'Seluruh makhluk bergantung kepada-Nya.',
        },
      },
    ],
    tafsirContext: {
      'id-ID': 'Surah Al-Ikhlas diturunkan sebagai jawaban tegas dan jernih ketika kaum musyrikin bertanya tentang sifat Tuhan yang disembah oleh Rasulullah ﷺ.',
      'ms-MY': 'Surah al-Ikhlas diturunkan sebagai jawapan tegas dan jelas apabila kaum musyrikin bertanya tentang sifat Tuhan yang disembah oleh Rasulullah ﷺ.',
    },
    tafsirSource: {
      'id-ID': 'Tafsir Ringkas Kemenag RI & Tafsir Al-Muyassar (QS. Al-Ikhlas: 1–2).',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM & Tafsir Al-Muyassar (QS. al-Ikhlas: 1–2).',
    },
    reflectionPrompt: {
      'id-ID': 'Catatan Refleksi Pribadi: Bagaimana memahami arti الصَّمَد (Tempat meminta segala hajat) menguatkan hati Anda saat menghadapi kesulitan?',
      'ms-MY': 'Nota Refleksi Peribadi: Bagaimanakah memahami makna الصَّمَد (Tumpuan memohon segala hajat) menguatkan hati anda ketika berhadapan kesukaran?',
    },
    practice: {
      multipleChoice: {
        question: {
          'id-ID': 'Apa makna kata ٱلصَّمَدُ dalam QS. Al-Ikhlas 112:2?',
          'ms-MY': 'Apakah makna perkataan ٱلصَّمَدُ dalam QS. al-Ikhlas 112:2?',
        },
        arabicFocus: 'ٱللَّهُ ٱلصَّمَدُ',
        options: [
          {
            'id-ID': 'Tempat meminta segala sesuatu / Tumpuan seluruh makhluk',
            'ms-MY': 'Yang menjadi tumpuan sekalian makhluk untuk memohon sebarang hajat',
          },
          {
            'id-ID': 'Yang menciptakan waktu pagi',
            'ms-MY': 'Yang menciptakan waktu pagi',
          },
          {
            'id-ID': 'Yang menurunkan hujan dari langit',
            'ms-MY': 'Yang menurunkan hujan dari langit',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Benar! Ash-Shamad berarti Dzat Yang Maha Sempurna tempat seluruh makhluk menggantungkan hajatnya.',
          'ms-MY': 'Betul! Ash-Shamad bermaksud Zat Yang Maha Sempurna tempat seluruh makhluk menggantungkan segala hajat.',
        },
      },
      matching: {
        instruction: {
          'id-ID': 'Pasangkan kata dari Surah Al-Ikhlas dengan artinya:',
          'ms-MY': 'Padankan perkataan daripada Surah al-Ikhlas dengan maknanya:',
        },
        pairs: [
          {
            id: 'w-allahi',
            arabic: 'قُلْ هُوَ',
            transliteration: 'Qul Huwa',
            meaning: { 'id-ID': 'Katakanlah: Dia-lah', 'ms-MY': 'Katakanlah: Dia-lah' },
          },
          {
            id: 'w-ahad',
            arabic: 'أَحَدٌ',
            transliteration: 'Ahadun',
            meaning: { 'id-ID': 'Yang Maha Esa', 'ms-MY': 'Yang Maha Esa' },
          },
          {
            id: 'w-ashshamad',
            arabic: 'ٱلصَّمَدُ',
            transliteration: 'Ash-Shamadu',
            meaning: { 'id-ID': 'Tempat meminta segala sesuatu', 'ms-MY': 'Tumpuan memohon segala hajat' },
          },
        ],
      },
      roleIdentification: {
        question: {
          'id-ID': 'Apa fungsi kata قُلْ di awal Surah Al-Ikhlas, Al-Falaq, dan An-Nas?',
          'ms-MY': 'Apakah fungsi perkataan قُلْ pada permulaan Surah al-Ikhlas, al-Falaq dan an-Nas?',
        },
        sentenceArabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
        targetWordArabic: 'قُلْ',
        options: [
          {
            'id-ID': 'Kata kerja perintah ("Katakanlah / Ucapkanlah dengan yakin")',
            'ms-MY': 'Kata kerja perintah ("Katakanlah / Lafazkanlah dengan yakin")',
          },
          {
            'id-ID': 'Kata depan yang berarti "di dalam"',
            'ms-MY': 'Kata sendi yang bermaksud "di dalam"',
          },
          {
            'id-ID': 'Kata benda jamak',
            'ms-MY': 'Kata nama jamak',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Tepat sekali! قُلْ (Qul) adalah kata kerja perintah (fi’il amr) yang berarti "Katakanlah!".',
          'ms-MY': 'Tepat sekali! قُلْ (Qul) ialah kata kerja perintah (fi’il amr) yang bermaksud "Katakanlah!".',
        },
      },
    },
  },
  {
    id: 'lesson-ayah-5',
    pathwayId: 'understand-quran',
    level: 5,
    order: 5,
    title: {
      'id-ID': 'Evaluasi Pemahaman Bacaan & Revisi: Surah Al-‘Asr (103:1–3)',
      'ms-MY': 'Penilaian Kefahaman Bacaan & Ulang Kaji: Surah al-‘Asr (103:1–3)',
    },
    subtitle: {
      'id-ID': 'QS. Al-‘Asr 103:1–3 · Huruf sumpah وَ, penegas إِنَّ, dan kata pengecualian إِلَّا',
      'ms-MY': 'QS. al-‘Asr 103:1–3 · Huruf sumpah وَ, penegas إِنَّ dan partikel pengecualian إِلَّا',
    },
    durationMinutes: 9,
    prerequisiteLessonId: 'lesson-ayah-4',
    prerequisiteReason: {
      'id-ID': 'Tahap 5 menguji integrasi pemahaman partikel, akar kata, dan kalimat utuh dari Tahap 1–4.',
      'ms-MY': 'Peringkat 5 menguji gabungan kefahaman partikel, akar perkataan dan ayat penuh daripada Peringkat 1–4.',
    },
    sourceType: 'quran',
    verseRef: 'QS. Al-‘Asr 103:1–3',
    editorialStatus: 'verified-source',
    arabicPhrase: 'وَٱلْعَصْرِ ۝ إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ ۝ إِلَّا ٱلَّذِينَ ءَامَنُوا۟',
    transliterationPhrase: 'Wal-‘ashr · Innal-insana lafi khusr · Illal-ladzina amanu',
    verifiedTranslation: {
      'id-ID': 'Demi masa. Sungguh, manusia berada dalam kerugian, kecuali orang-orang yang beriman...',
      'ms-MY': 'Demi Masa! Sesungguhnya manusia itu dalam kerugian — Kecuali orang-orang yang beriman...',
    },
    translationSource: {
      'id-ID': 'Terjemahan Al-Qur’an Kementerian Agama RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM Malaysia)',
    },
    recall: {
      prompt: {
        'id-ID': 'Ketika sebuah kata benda didahului oleh huruf jar (seperti بِ atau huruf sumpah وَ), harakat akhirnya menjadi...',
        'ms-MY': 'Apabila sesuatu kata nama didahului oleh huruf jar (seperti بِ atau huruf sumpah وَ), baris akhirnya menjadi...',
      },
      arabicPrompt: 'وَٱلْعَصْرِ',
      options: [
        { 'id-ID': 'Kasrah (-i): وَٱلْعَصْرِ (Wal-‘ashri)', 'ms-MY': 'Kasrah (-i): وَٱلْعَصْرِ (Wal-‘ashri)' },
        { 'id-ID': 'Fathah (-a)', 'ms-MY': 'Fathah (-a)' },
        { 'id-ID': 'Tanwin dhammah (-un)', 'ms-MY': 'Tanwin dhammah (-un)' },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Tepat! Huruf وَ di awal Surah Al-‘Asr, Adh-Dhuha, dan Al-Lail adalah huruf sumpah yang membuat kata setelahnya berharakat kasrah (-i).',
        'ms-MY': 'Tepat sekali! Huruf وَ pada permulaan Surah al-‘Asr, adh-Dhuha dan al-Lail ialah huruf sumpah yang menjadikan perkataan selepasnya berbaris kasrah (-i).',
      },
    },
    audioDurationSeconds: 7,
    audioReciter: 'Audio Panduan Pelafalan Terverifikasi',
    audioLicense: 'Referensi Pendidikan Terbuka',
    wordIds: ['w-alasr', 'w-alkitabu'],
    structureSummary: {
      'id-ID': 'Tersusun dari tiga bagian logis: (1) Sumpah demi waktu (وَٱلْعَصْرِ), (2) Pernyataan tegas (إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ), dan (3) Pengecualian penyelamat (إِلَّا ٱلَّذِينَ ءَامَنُوا۟...).',
      'ms-MY': 'Dibina daripada tiga bahagian logik: (1) Sumpah demi masa (وَٱلْعَصْرِ), (2) Pernyataan tegas (إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ), dan (3) Pengecualian penyelamat (إِلَّا ٱلَّذِينَ ءَامَنُوا۟...).',
    },
    grammarConceptTitle: {
      'id-ID': 'Satu Gagasan Bahasa: Penegas إِنَّ (Sungguh) & Pengecualian إِلَّا (Kecuali)',
      'ms-MY': 'Satu Konsep Bahasa: Penegas إِنَّ (Sesungguhnya) & Pengecualian إِلَّا (Kecuali)',
    },
    grammarConceptBody: {
      'id-ID':
        'Kata إِنَّ (Inna = Sesungguhnya) mengubah harakat subjek setelahnya menjadi fathah (-a): إِنَّ ٱلْإِنسَـٰنَ. Lalu kata إِلَّا (Illa = Kecuali) membuka jalan keluar bagi orang-orang yang beriman dan beramal saleh.',
      'ms-MY':
        'Perkataan إِنَّ (Inna = Sesungguhnya) menukarkan baris subjek selepasnya menjadi fathah (-a): إِنَّ ٱلْإِنسَـٰنَ. Kemudian perkataan إِلَّا (Illa = Kecuali) membuka jalan keselamatan bagi orang-orang yang beriman dan beramal soleh.',
    },
    advancedGrammarBody: {
      'id-ID': 'Catatan Nahwu: ٱلْإِنسَـٰنَ adalah isim Inna manshub dengan fathah, huruf اللام pada لَفِى adalah Lam al-Muzahlaqah (penegas kedua), dan إِلَّا adalah harf istitsna’ (pengecualian).',
      'ms-MY': 'Nota Nahu: ٱلْإِنسَـٰنَ ialah isim Inna mansub dengan fathah, huruf اللام pada لَفِى ialah Lam al-Muzahlaqah (penegas kedua), dan إِلَّا ialah harf istisna’ (pengecualian).',
    },
    structureSegments: [
      {
        wordId: 'w-alasr',
        arabic: 'وَٱلْعَصْرِ',
        roleLabel: { 'id-ID': 'Sumpah (Demi masa)', 'ms-MY': 'Sumpah (Demi masa)' },
        category: 'phrase',
        functionExplanation: {
          'id-ID': 'Wawul Qasam + kata benda majrur.',
          'ms-MY': 'Wawul Qasam + kata nama majrur.',
        },
      },
      {
        wordId: 'w-alasr',
        arabic: 'إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ',
        roleLabel: { 'id-ID': 'Penegasan (Sungguh manusia dalam rugi)', 'ms-MY': 'Penegasan (Sesungguhnya manusia dalam rugi)' },
        category: 'phrase',
        functionExplanation: {
          'id-ID': 'Penegasan ganda dengan إِنَّ dan لَـ (la-).',
          'ms-MY': 'Penegasan berganda dengan إِنَّ dan لَـ (la-).',
        },
      },
      {
        wordId: 'w-alasr',
        arabic: 'إِلَّا ٱلَّذِينَ ءَامَنُوا۟',
        roleLabel: { 'id-ID': 'Pengecualian (Kecuali orang yang beriman)', 'ms-MY': 'Pengecualian (Kecuali orang yang beriman)' },
        category: 'phrase',
        functionExplanation: {
          'id-ID': 'Kata إِلَّا mengecualikan mereka yang beriman dan beramal saleh.',
          'ms-MY': 'Perkataan إِلَّا mengecualikan mereka yang beriman dan beramal soleh.',
        },
      },
    ],
    tafsirContext: {
      'id-ID': 'Imam Asy-Syafi’i rahimahullah menyatakan bahwa sekiranya manusia merenungkan kandungan Surah Al-‘Asr ini dengan sungguh-sungguh, niscaya surah ini menjadi peringatan yang sangat mencukupi bagi mereka.',
      'ms-MY': 'Imam asy-Syafi’i rahimahullah menyatakan bahawa sekiranya manusia menghayati kandungan Surah al-‘Asr ini dengan sungguh-sungguh, nescaya ia menjadi peringatan yang amat mencukupi bagi mereka.',
    },
    tafsirSource: {
      'id-ID': 'Tafsir Ibnu Katsir & Tafsir Ringkas Kemenag RI (QS. Al-‘Asr: 1–3).',
      'ms-MY': 'Tafsir Ibnu Kathir & Tafsir Pimpinan Ar-Rahman JAKIM (QS. al-‘Asr: 1–3).',
    },
    reflectionPrompt: {
      'id-ID': 'Catatan Refleksi Pribadi: Bagaimana empat syarat di Surah Al-‘Asr (iman, amal saleh, saling menasihati dalam kebenaran dan kesabaran) dapat Anda terapkan minggu ini?',
      'ms-MY': 'Nota Refleksi Peribadi: Bagaimanakah empat syarat dalam Surah al-‘Asr (iman, amal soleh, pesan-memesan kepada kebenaran dan kesabaran) boleh anda amalkan minggu ini?',
    },
    practice: {
      multipleChoice: {
        question: {
          'id-ID': 'Apa fungsi kata إِلَّا (Illa) pada ayat ke-3 Surah Al-‘Asr?',
          'ms-MY': 'Apakah fungsi perkataan إِلَّا (Illa) pada ayat ke-3 Surah al-‘Asr?',
        },
        arabicFocus: 'إِلَّا ٱلَّذِينَ ءَامَنُوا۟',
        options: [
          { 'id-ID': 'Menyatakan pengecualian ("Kecuali")', 'ms-MY': 'Menyatakan pengecualian ("Kecuali")' },
          { 'id-ID': 'Menyatakan pertanyaan ("Apakah")', 'ms-MY': 'Menyatakan soalan ("Adakah")' },
          { 'id-ID': 'Menyatakan tempat ("Di atas")', 'ms-MY': 'Menyatakan tempat ("Di atas")' },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Tepat! Kata إِلَّا berarti "kecuali", mengecualikan orang-orang beriman dari kerugian.',
          'ms-MY': 'Tepat sekali! Perkataan إِلَّا bermaksud "kecuali", mengecualikan orang-orang beriman daripada kerugian.',
        },
      },
      matching: {
        instruction: {
          'id-ID': 'Pasangkan potongan frasa Surah Al-‘Asr dengan maknanya:',
          'ms-MY': 'Padankan potongan frasa Surah al-‘Asr dengan maknanya:',
        },
        pairs: [
          {
            id: 'w-alasr',
            arabic: 'وَٱلْعَصْرِ',
            transliteration: 'Wal-‘Ashri',
            meaning: { 'id-ID': 'Demi masa', 'ms-MY': 'Demi Masa' },
          },
          {
            id: 'w-alkitabu',
            arabic: 'لَفِى خُسْرٍ',
            transliteration: 'Lafi khusrin',
            meaning: { 'id-ID': 'Benar-benar dalam kerugian', 'ms-MY': 'Benar-benar dalam kerugian' },
          },
          {
            id: 'w-ihdina',
            arabic: 'إِلَّا ٱلَّذِينَ',
            transliteration: 'Illal-ladzina',
            meaning: { 'id-ID': 'Kecuali orang-orang yang...', 'ms-MY': 'Kecuali orang-orang yang...' },
          },
        ],
      },
      roleIdentification: {
        question: {
          'id-ID': 'Mengapa kata ٱلْإِنسَـٰنَ pada إِنَّ ٱلْإِنسَـٰنَ berharakat akhir fathah (-a)?',
          'ms-MY': 'Mengapakah perkataan ٱلْإِنسَـٰنَ pada إِنَّ ٱلْإِنسَـٰنَ berbaris akhir fathah (-a)?',
        },
        sentenceArabic: 'إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ',
        targetWordArabic: 'إِنَّ ٱلْإِنسَـٰنَ',
        options: [
          {
            'id-ID': 'Karena didahului oleh partikel penegas إِنَّ (Inna = Sesungguhnya)',
            'ms-MY': 'Kerana didahului oleh partikel penegas إِنَّ (Inna = Sesungguhnya)',
          },
          {
            'id-ID': 'Karena didahului oleh huruf بِ',
            'ms-MY': 'Kerana didahului oleh huruf بِ',
          },
          {
            'id-ID': 'Karena merupakan kata perintah',
            'ms-MY': 'Kerana merupakan kata kerja perintah',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Benar! Partikel إِنَّ mengubah harakat subjek kalimat setelahnya menjadi fathah (manshub).',
          'ms-MY': 'Betul! Partikel إِنَّ menukarkan baris subjek ayat selepasnya menjadi fathah (mansub).',
        },
      },
    },
  },
  {
    id: 'lesson-prayer-2',
    pathwayId: 'prayer-comprehension',
    level: 2,
    order: 2,
    title: {
      'id-ID': 'Bacaan Rukuk, Iktidal & Sujud (Hadis Shahih Muslim)',
      'ms-MY': 'Bacaan Rukuk, Iktidal & Sujud (Hadis Sahih Muslim)',
    },
    subtitle: {
      'id-ID': 'Hadis Riwayat Muslim No. 772 & 476 · Memahami kata سُبْحَانَ, الْعَظِيمِ, dan الْأَعْلَى',
      'ms-MY': 'Hadis Riwayat Muslim No. 772 & 476 · Memahami perkataan سُبْحَانَ, الْعَظِيمِ dan الْأَعْلَى',
    },
    durationMinutes: 7,
    prerequisiteLessonId: 'lesson-prayer-1',
    prerequisiteReason: {
      'id-ID': 'Melanjutkan pemahaman bacaan berdiri (Al-Fatihah) menuju gerakan rukuk dan sujud.',
      'ms-MY': 'Melanjutkan kefahaman bacaan berdiri (al-Fatihah) kepada pergerakan rukuk dan sujud.',
    },
    sourceType: 'hadith-prayer',
    verseRef: 'HR. Muslim No. 772 & No. 476 (Bacaan Salat)',
    editorialStatus: 'verified-source',
    arabicPhrase: 'سُبْحَانَ رَبِّىَ ٱلْعَظِيمِ ۝ سُبْحَانَ رَبِّىَ ٱلْأَعْلَىٰ',
    transliterationPhrase: 'Subhana Rabbiyal-‘Azhim · Subhana Rabbiyal-A‘la',
    verifiedTranslation: {
      'id-ID': 'Maha Suci Tuhanku Yang Maha Agung (Rukuk) · Maha Suci Tuhanku Yang Maha Tinggi (Sujud).',
      'ms-MY': 'Maha Suci Tuhanku Yang Maha Agung (Rukuk) · Maha Suci Tuhanku Yang Maha Tinggi (Sujud).',
    },
    translationSource: {
      'id-ID': 'Jenis Teks: Bacaan Salat dari Hadis Nabawi (Shahih Muslim No. 772 dari Hudzaifah r.a.)',
      'ms-MY': 'Jenis Teks: Bacaan Solat daripada Hadis Nabawi (Sahih Muslim No. 772 daripada Huzaifah r.a.)',
    },
    recall: {
      prompt: {
        'id-ID': 'Dalam Surah Al-Fatihah kita telah mempelajari kata رَبِّ (Tuhan Pemelihara). Apa arti kata رَبِّى (Rabbiya) ketika diberi akhiran huruf ي (-i / -ya)?',
        'ms-MY': 'Dalam Surah al-Fatihah kita telah mempelajari perkataan رَبِّ (Tuhan Pemelihara). Apakah maksud perkataan رَبِّى (Rabbiya) apabila ditambah akhiran huruf ي (-i / -ya)?',
      },
      arabicPrompt: 'رَبِّىَ',
      options: [
        { 'id-ID': 'Tuhan Pemeliharaku (milik/sapaan saya)', 'ms-MY': 'Tuhan Pemeliharaku (rujukan diri saya)' },
        { 'id-ID': 'Tuhan mereka', 'ms-MY': 'Tuhan mereka' },
        { 'id-ID': 'Tuhan kalian', 'ms-MY': 'Tuhan kamu' },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Benar! Akhiran huruf Ya’ (ـي / ـيَ) pada kata benda berarti "-ku" (रَبِّي = Tuhanku).',
        'ms-MY': 'Betul! Akhiran huruf Ya’ (ـي / ـيَ) pada kata nama bermaksud "-ku" (رَبِّي = Tuhanku).',
      },
    },
    audioDurationSeconds: 6,
    audioReciter: 'Audio Panduan Zikir Salat Terverifikasi',
    audioLicense: 'Sumber Hadis: Shahih Muslim No. 772',
    wordIds: ['w-subhana', 'w-rabbi', 'w-alhamdu'],
    structureSummary: {
      'id-ID': 'Kedua zikir ini memiliki pola identik: سُبْحَانَ (Maha Suci) + رَبِّيَ (Tuhanku) + Sifat Kesempurnaan (ٱلْعَظِيمِ saat rukuk, ٱلْأَعْلَىٰ saat sujud).',
      'ms-MY': 'Kedua-dua zikir ini mempunyai pola yang sama: سُبْحَانَ (Maha Suci) + رَبِّيَ (Tuhanku) + Sifat Kesempurnaan (ٱلْعَظِيمِ ketika rukuk, ٱلْأَعْلَىٰ ketika sujud).',
    },
    grammarConceptTitle: {
      'id-ID': 'Satu Gagasan Bahasa: Keserasian Makna Antara Posisi Tubuh dan Sifat Allah',
      'ms-MY': 'Satu Konsep Bahasa: Keserasian Makna Antara Kedudukan Tubuh dengan Sifat Allah',
    },
    grammarConceptBody: {
      'id-ID':
        'Saat rukuk (membungkuk hormat), kita menyebut ٱلْعَظِيمِ (Yang Maha Agung). Saat sujud (meletakkan dahi di titik terendah di atas tanah), kita menyebut ٱلْأَعْلَىٰ (Yang Maha Tinggi). Mengenali arti kedua kata sifat ini membuat gerakan salat terasa hidup.',
      'ms-MY':
        'Ketika rukuk (menunduk hormat), kita menyebut ٱلْعَظِيمِ (Yang Maha Agung). Ketika sujud (meletakkan dahi di tempat paling rendah), kita menyebut ٱلْأَعْلَىٰ (Yang Maha Tinggi). Mengenali makna kedua-dua kata sifat ini menjadikan pergerakan solat lebih bermakna.',
    },
    advancedGrammarBody: {
      'id-ID': 'Catatan Identifikasi Teks: Bacaan ini adalah Hadis Nabawi yang shahih (HR. Muslim no. 772), bukan ayat Al-Qur’an, meskipun kata-katanya berakar sama dengan ayat di QS. Al-Waqi’ah 56:74 dan QS. Al-A’la 87:1.',
      'ms-MY': 'Nota Identifikasi Teks: Bacaan ini ialah Hadis Nabawi yang sahih (HR. Muslim no. 772), bukannya ayat al-Quran, walaupun perkataannya berakar sama dengan ayat dalam QS. al-Waqi’ah 56:74 dan QS. al-A’la 87:1.',
    },
    structureSegments: [
      {
        wordId: 'w-subhana',
        arabic: 'سُبْحَانَ',
        roleLabel: { 'id-ID': 'Penyucian (Maha Suci)', 'ms-MY': 'Penyucian (Maha Suci)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Menyucikan Allah dari segala sifat kekurangan.',
          'ms-MY': 'Menyucikan Allah daripada sebarang sifat kekurangan.',
        },
      },
      {
        wordId: 'w-rabbi',
        arabic: 'رَبِّىَ ٱلْعَظِيمِ',
        roleLabel: { 'id-ID': 'Rukuk (Tuhanku Yang Maha Agung)', 'ms-MY': 'Rukuk (Tuhanku Yang Maha Agung)' },
        category: 'phrase',
        functionExplanation: {
          'id-ID': 'Dibaca ketika membungkuk dalam rukuk.',
          'ms-MY': 'Dibaca ketika menunduk dalam rukuk.',
        },
      },
      {
        wordId: 'w-rabbi',
        arabic: 'رَبِّىَ ٱلْأَعْلَىٰ',
        roleLabel: { 'id-ID': 'Sujud (Tuhanku Yang Maha Tinggi)', 'ms-MY': 'Sujud (Tuhanku Yang Maha Tinggi)' },
        category: 'phrase',
        functionExplanation: {
          'id-ID': 'Dibaca ketika bersujud merendahkan diri.',
          'ms-MY': 'Dibaca ketika bersujud merendahkan diri.',
        },
      },
    ],
    tafsirContext: {
      'id-ID': 'Catatan Kejelasan Sumber: Kami menandai secara eksplisit bahwa bacaan rukuk dan sujud ini bersumber dari Hadis Shahih Muslim (No. 772), sehingga pembelajar dapat membedakan antara teks Al-Qur’an dan bacaan zikir salat dari Sunnah.',
      'ms-MY': 'Nota Kejelasan Sumber: Kami menandakan secara jelas bahawa bacaan rukuk dan sujud ini bersumberkan Hadis Sahih Muslim (No. 772), supaya pelajar dapat membezakan antara teks al-Quran dengan bacaan zikir solat daripada Sunnah.',
    },
    tafsirSource: {
      'id-ID': 'Sumber: Shahih Muslim, Kitab Ash-Shalah, Hadis No. 772.',
      'ms-MY': 'Sumber: Sahih Muslim, Kitab as-Solah, Hadis No. 772.',
    },
    reflectionPrompt: {
      'id-ID': 'Catatan Refleksi Pribadi: Bagaimana mengingat arti "Yang Maha Tinggi" (الْأَعْلَى) saat dahi Anda menyentuh lantai dalam sujud membantu kekhusyukan?',
      'ms-MY': 'Nota Refleksi Peribadi: Bagaimanakah mengingati makna "Yang Maha Tinggi" (الْأَعْلَى) ketika dahi anda mencecah lantai dalam sujud membantu kekhusyukan?',
    },
    practice: {
      multipleChoice: {
        question: {
          'id-ID': 'Apa arti kata ٱلْأَعْلَىٰ yang kita baca ketika sedang sujud?',
          'ms-MY': 'Apakah makna perkataan ٱلْأَعْلَىٰ yang kita baca ketika sedang sujud?',
        },
        arabicFocus: 'سُبْحَانَ رَبِّىَ ٱلْأَعْلَىٰ',
        options: [
          { 'id-ID': 'Yang Maha Tinggi', 'ms-MY': 'Yang Maha Tinggi' },
          { 'id-ID': 'Yang Maha Cepat', 'ms-MY': 'Yang Maha Cepat' },
          { 'id-ID': 'Yang Maha Dekat dengan pintu', 'ms-MY': 'Yang Maha Dekat dengan pintu' },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Tepat! Saat kita berada di posisi paling rendah (sujud), kita memuji Allah sebagai الْأَعْلَى (Yang Maha Tinggi).',
          'ms-MY': 'Tepat sekali! Ketika kita berada pada kedudukan paling rendah (sujud), kita memuji Allah sebagai الْأَعْلَى (Yang Maha Tinggi).',
        },
      },
      matching: {
        instruction: {
          'id-ID': 'Pasangkan kata zikir salat berikut dengan artinya:',
          'ms-MY': 'Padankan perkataan zikir solat berikut dengan maknanya:',
        },
        pairs: [
          {
            id: 'w-subhana',
            arabic: 'سُبْحَانَ',
            transliteration: 'Subhana',
            meaning: { 'id-ID': 'Maha Suci', 'ms-MY': 'Maha Suci' },
          },
          {
            id: 'w-rabbi',
            arabic: 'رَبِّىَ',
            transliteration: 'Rabbiya',
            meaning: { 'id-ID': 'Tuhan Pemeliharaku', 'ms-MY': 'Tuhan Pemeliharaku' },
          },
          {
            id: 'w-alhamdu',
            arabic: 'ٱلْعَظِيمِ',
            transliteration: 'Al-‘Azhimi',
            meaning: { 'id-ID': 'Yang Maha Agung', 'ms-MY': 'Yang Maha Agung' },
          },
        ],
      },
      roleIdentification: {
        question: {
          'id-ID': 'Termasuk kategori sumber apakah bacaan سُبْحَانَ رَبِّىَ ٱلْعَظِيمِ di dalam salat?',
          'ms-MY': 'Termasuk dalam kategori sumber apakah bacaan سُبْحَانَ رَبِّىَ ٱلْعَظِيمِ di dalam solat?',
        },
        sentenceArabic: 'سُبْحَانَ رَبِّىَ ٱلْعَظِيمِ',
        targetWordArabic: 'سُبْحَانَ رَبِّىَ',
        options: [
          {
            'id-ID': 'Bacaan zikir salat dari Hadis Nabawi yang shahih (HR. Muslim)',
            'ms-MY': 'Bacaan zikir solat daripada Hadis Nabawi yang sahih (HR. Muslim)',
          },
          {
            'id-ID': 'Ayat pertama Surah Al-Baqarah',
            'ms-MY': 'Ayat pertama Surah al-Baqarah',
          },
          {
            'id-ID': 'Pepatah Arab biasa',
            'ms-MY': 'Peribahasa Arab biasa',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Benar! Membedakan antara ayat Al-Qur’an dan hadis/zikir salat adalah bagian penting dari ketelitian ilmu.',
          'ms-MY': 'Betul! Membezakan antara ayat al-Quran dengan hadis/zikir solat adalah sebahagian penting daripada ketelitian ilmu.',
        },
      },
    },
  },
];

export const EXTRA_CURRICULUM_LEVELS: CurriculumLevel[] = [
  {
    level: 0,
    pathwayId: 'understand-quran',
    title: {
      'id-ID': 'Tahap 0 · Pemetaan Kemampuan & Orientasi Jalur',
      'ms-MY': 'Peringkat 0 · Saringan Tahap & Orientasi Laluan',
    },
    description: {
      'id-ID': 'Menentukan titik awal belajar berdasarkan kemampuan membaca huruf, harakat, dan tujuan utama Anda.',
      'ms-MY': 'Menentukan titik permulaan belajar berdasarkan keupayaan membaca huruf, baris dan matlamat utama anda.',
    },
    learningOutcome: {
      'id-ID': 'Memperoleh rekomendasi jalur personal dan melewati modul dasar jika sudah mampu membaca mushaf.',
      'ms-MY': 'Memperoleh cadangan laluan peribadi dan melangkau modul asas jika sudah mampu membaca mushaf.',
    },
    lessonIds: ['lesson-ayah-1'],
  },
  {
    level: 4,
    pathwayId: 'understand-quran',
    title: {
      'id-ID': 'Tahap 4 · Memahami Frasa, Kalimat Utuh & Rujukan Tafsir',
      'ms-MY': 'Peringkat 4 · Memahami Frasa, Ayat Penuh & Rujukan Tafsir',
    },
    description: {
      'id-ID': 'Memadukan kosakata dan tata bahasa untuk memahami ayat pendek utuh pada Surah Al-Ikhlas.',
      'ms-MY': 'Menggabungkan kosa kata dan tatabahasa untuk memahami ayat pendek lengkap dalam Surah al-Ikhlas.',
    },
    learningOutcome: {
      'id-ID': 'Memahami konstruksi kalimat nominal tauhid (QS. Al-Ikhlas 112:1–2) dengan rujukan tafsir terverifikasi.',
      'ms-MY': 'Memahami binaan ayat namaan tauhid (QS. al-Ikhlas 112:1–2) dengan rujukan tafsir yang disahkan.',
    },
    lessonIds: ['lesson-ayah-4'],
  },
  {
    level: 5,
    pathwayId: 'understand-quran',
    title: {
      'id-ID': 'Tahap 5 · Pemahaman Bacaan Terpadu & Kemandirian Ulasan',
      'ms-MY': 'Peringkat 5 · Kefahaman Bacaan Bersepadu & Ulang Kaji Kendiri',
    },
    description: {
      'id-ID': 'Latihan evaluasi pemahaman struktur sumpah, penegasan, dan pengecualian pada Surah Al-‘Asr.',
      'ms-MY': 'Latihan penilaian kefahaman struktur sumpah, penegasan dan pengecualian dalam Surah al-‘Asr.',
    },
    learningOutcome: {
      'id-ID': 'Membaca dan menguraikan komponen kalimat QS. Al-‘Asr 103:1–3 secara mandiri.',
      'ms-MY': 'Membaca dan menghuraikan komponen ayat QS. al-‘Asr 103:1–3 secara kendiri.',
    },
    lessonIds: ['lesson-ayah-5'],
  },
  {
    level: 2,
    pathwayId: 'prayer-comprehension',
    title: {
      'id-ID': 'Modul Salat 2 · Bacaan Rukuk, Iktidal & Sujud (Hadis Shahih)',
      'ms-MY': 'Modul Solat 2 · Bacaan Rukuk, Iktidal & Sujud (Hadis Sahih)',
    },
    description: {
      'id-ID': 'Memahami arti kata demi kata zikir rukuk dan sujud berdasarkan riwayat Shahih Muslim.',
      'ms-MY': 'Memahami makna perkataan demi perkataan bacaan rukuk dan sujud berasaskan riwayat Sahih Muslim.',
    },
    learningOutcome: {
      'id-ID': 'Membedakan makna Al-‘Azhim (saat rukuk) dan Al-A‘la (saat sujud) beserta sumber hadisnya.',
      'ms-MY': 'Membezakan makna Al-‘Azhim (ketika rukuk) dan Al-A‘la (ketika sujud) beserta sumber hadisnya.',
    },
    lessonIds: ['lesson-prayer-2'],
  },
];
