import {
  EditorialStatus,
  LocalizedText,
  WordToken,
  WorldLocationId,
  WorldSkillId,
} from '../types/learning';

export interface WorldLocationMeta {
  id: WorldLocationId;
  order: number;
  arabicTitle: string;
  transliterationTitle: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  skillsTrained: WorldSkillId[];
  levelCount: number;
  editorialStatus: EditorialStatus;
  badgeColor: string;
}

export const WORLD_LOCATIONS: WorldLocationMeta[] = [
  {
    id: 'street-explorer',
    order: 1,
    arabicTitle: 'حَيُّ الْعَرَبِيَّةِ · مُسْتَكْشِفُ الشَّوَارِعِ',
    transliterationTitle: 'Hayyul-‘Arabiyyah · Mustaksyifusy-Syawari’',
    title: {
      'id-ID': '1. Lingkungan Arab — Penjelajah Jalan (Arabic Street Explorer)',
      'ms-MY': '1. Kejiranan Arab — Penjelajah Jalan (Arabic Street Explorer)',
    },
    subtitle: {
      'id-ID':
        'Navigasi peta 2D interaktif: arah (يَمِين / يَسَار / أَمَام / خَلْف), belokan (اِنْعَطِفْ), instruksi bertahap, dan kata keterangan ruang (فَوْق / تَحْت / بَيْن / بِجَانِب).',
      'ms-MY':
        'Navigasi peta 2D interaktif: arah (يَمِين / يَسَار / أَمَام / خَلْف), belokan (اِنْعَطِفْ), arahan berperingkat dan kata sendi ruang (فَوْق / تَحْت / بَيْن / بِجَانِب).',
    },
    skillsTrained: [
      'spatial-language',
      'following-instructions',
      'listening-comprehension',
      'word-recognition',
    ],
    levelCount: 6,
    editorialStatus: 'curriculum-draft-pending-scholar-review',
    badgeColor: '#145A4A',
  },
  {
    id: 'scene-lab',
    order: 2,
    arabicTitle: 'مُخْتَبَرُ الْمَشَاهِدِ · الْمَشْهَدُ لَا يَكْذِبُ',
    transliterationTitle: 'Mukhtabarul-Masyahid · Al-Masyhadu La Yakdzibu',
    title: {
      'id-ID': '2. Laboratorium Adegan — "Adegan Tidak Berbohong"',
      'ms-MY': '2. Makmal Adegan — "Adegan Tidak Berbohong"',
    },
    subtitle: {
      'id-ID':
        'Uji pemahaman kalimat dengan mencocokkan dan menyusun objek visual secara langsung (contoh: الْكِتَابُ تَحْتَ الطَّاوِلَةِ).',
      'ms-MY':
        'Uji kefahaman ayat dengan memadankan dan menyusun objek visual secara langsung (contoh: الْكِتَابُ تَحْتَ الطَّاوِلَةِ).',
    },
    skillsTrained: [
      'sentence-comprehension',
      'spatial-language',
      'vocabulary-comprehension',
      'basic-grammar',
    ],
    levelCount: 5,
    editorialStatus: 'curriculum-draft-pending-scholar-review',
    badgeColor: '#1D6B58',
  },
  {
    id: 'market',
    order: 3,
    arabicTitle: 'سُوقُ الْمَدِينَةِ · مَهَامُّ السُّوقِ',
    transliterationTitle: 'Suqul-Madinah · Mahammus-Suq',
    title: {
      'id-ID': '3. Pasar Bahasa Arab — "Misi Pasar" (Market Missions)',
      'ms-MY': '3. Pasar Bahasa Arab — "Misi Pasar" (Market Missions)',
    },
    subtitle: {
      'id-ID':
        'Penuhi pesanan pelanggan dengan jumlah, warna, sifat, dan kesesuaian tunggal/mutsanna/jamak (contoh: أَعْطِنِي تُفَّاحَتَيْنِ حَمْرَاوَيْنِ).',
      'ms-MY':
        'Penuhi pesanan pelanggan dengan bilangan, warna, sifat dan kesesuaian mufrad/mutsanna/jamak (contoh: أَعْطِنِي تُفَّاحَتَيْنِ حَمْرَاوَيْنِ).',
    },
    skillsTrained: [
      'vocabulary-comprehension',
      'basic-grammar',
      'following-instructions',
      'listening-comprehension',
    ],
    levelCount: 6,
    editorialStatus: 'curriculum-draft-pending-scholar-review',
    badgeColor: '#B4782C',
  },
  {
    id: 'sentence-bridge',
    order: 4,
    arabicTitle: 'جِسْرُ الْجُمَلِ',
    transliterationTitle: 'Jisrul-Jumal',
    title: {
      'id-ID': '4. Jembatan Kalimat (The Sentence Bridge)',
      'ms-MY': '4. Jambatan Ayat (The Sentence Bridge)',
    },
    subtitle: {
      'id-ID':
        'Bangun jembatan penyeberangan dengan menyusun kepingan kata menjadi kalimat Arab yang sahih (mendukung variasi urutan kata VSO & SVO).',
      'ms-MY':
        'Bina jambatan lintasan dengan menyusun kepingan perkataan menjadi ayat Arab yang sahih (menyokong variasi susunan perkataan VSO & SVO).',
    },
    skillsTrained: ['sentence-comprehension', 'basic-grammar', 'word-recognition'],
    levelCount: 4,
    editorialStatus: 'curriculum-draft-pending-scholar-review',
    badgeColor: '#2563EB',
  },
  {
    id: 'lost-message',
    order: 5,
    arabicTitle: 'الرِّسَالَةُ الْمَفْقُودَةُ',
    transliterationTitle: 'Ar-Risalatul-Mafqudah',
    title: {
      'id-ID': '5. Pesan yang Hilang (The Lost Message)',
      'ms-MY': '5. Pesanan yang Hilang (The Lost Message)',
    },
    subtitle: {
      'id-ID':
        'Misi cerita bercabang: baca petunjuk warga, pilih dialog bahasa Arab yang tepat, dan antarkan surat ke tujuan yang benar.',
      'ms-MY':
        'Misi cerita bercabang: baca petunjuk penduduk, pilih dialog bahasa Arab yang tepat dan hantarkan surat ke destinasi yang betul.',
    },
    skillsTrained: [
      'sentence-comprehension',
      'following-instructions',
      'vocabulary-comprehension',
    ],
    levelCount: 4,
    editorialStatus: 'curriculum-draft-pending-scholar-review',
    badgeColor: '#7C3AED',
  },
  {
    id: 'word-detective',
    order: 6,
    arabicTitle: 'مُحَقِّقُ الْكَلِمَاتِ وَالْجُذُورِ',
    transliterationTitle: 'Muhaqqiqul-Kalimat wal-Judzur',
    title: {
      'id-ID': '6. Detektif Akar Kata (The Word Detective)',
      'ms-MY': '6. Detektif Akar Perkataan (The Word Detective)',
    },
    subtitle: {
      'id-ID':
        'Telusuri jaringan akar tiga huruf (كَتَبَ / كِتَاب / كَاتِب / مَكْتُوب) dan pahami bagaimana pola kata mengubah makna.',
      'ms-MY':
        'Terokai rangkaian akar tiga huruf (كَتَبَ / كِتَاب / كَاتِب / مَكْتُوب) dan fahami bagaimana wazan perkataan mengubah makna.',
    },
    skillsTrained: ['morphology-roots', 'word-recognition', 'quranic-vocabulary'],
    levelCount: 4,
    editorialStatus: 'curriculum-draft-pending-scholar-review',
    badgeColor: '#0D9488',
  },
  {
    id: 'quranic-discovery',
    order: 7,
    arabicTitle: 'غُرْفَةُ التَّدَبُّرِ الْقُرْآنِيِّ',
    transliterationTitle: 'Ghurfatut-Tadabburil-Qur’ani',
    title: {
      'id-ID': '7. Ruang Penemuan Al-Qur’an (The Quranic Discovery Room)',
      'ms-MY': '7. Ruang Penemuan al-Quran (The Quranic Discovery Room)',
    },
    subtitle: {
      'id-ID':
        'Ruang tenang dan penuh adab untuk melihat bagaimana kosakata, struktur, dan akar kata yang Anda latih hadir di dalam ayat-ayat suci Al-Qur’an.',
      'ms-MY':
        'Ruang tenang dan penuh adab untuk melihat bagaimana kosa kata, struktur dan akar perkataan yang anda latih hadir di dalam ayat-ayat suci al-Quran.',
    },
    skillsTrained: [
      'quranic-vocabulary',
      'morphology-roots',
      'sentence-comprehension',
      'listening-comprehension',
    ],
    levelCount: 4,
    editorialStatus: 'verified-source',
    badgeColor: '#145A4A',
  },
];

// Shared Vocabulary Tokens from the World of Meaning
// Merged into WORDS so they appear in VocabularyView, ReviewCenterView, Dashboard, and ProgressMasteryView
export const WORLD_WORDS: WordToken[] = [
  {
    id: 'w-world-yamin',
    arabic: 'يَمِينٌ',
    transliteration: 'Yaminun',
    contextualMeaning: {
      'id-ID': 'Kanan / Arah kanan',
      'ms-MY': 'Kanan / Arah kanan',
    },
    lexicalNote: {
      'id-ID': 'Digunakan untuk menunjuk arah kanan (يَمِينًا = ke kanan). Dalam Al-Qur’an juga muncul dalam ungkapan أَصْحَابُ الْيَمِينِ (golongan kanan).',
      'ms-MY': 'Digunakan untuk menunjuk arah kanan (يَمِينًا = ke kanan). Dalam al-Quran juga hadir dalam ungkapan أَصْحَابُ الْيَمِينِ (golongan kanan).',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Kata Benda Arah / Keterangan Tempat (Zharf)',
      'ms-MY': 'Kata Nama Arah / Keterangan Tempat (Zharf)',
    },
    advancedGrammarNote: {
      'id-ID': 'Ketika menjadi keterangan arah gerak (اِنْعَطِفْ يَمِينًا), dibaca manshub dengan fathatain (يَمِينًا).',
      'ms-MY': 'Apabila menjadi keterangan arah gerak (اِنْعَطِفْ يَمِينًا), dibaca mansub dengan fathatain (يَمِينًا).',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Al-Waqi’ah 56:27',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat & Leksikon Al-Qur’an',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat & Leksikon al-Quran',
    },
    sourceUrl: 'https://quran.com/56/27',
  },
  {
    id: 'w-world-yasar',
    arabic: 'يَسَارٌ',
    transliteration: 'Yasarun',
    contextualMeaning: {
      'id-ID': 'Kiri / Arah kiri',
      'ms-MY': 'Kiri / Arah kiri',
    },
    lexicalNote: {
      'id-ID': 'Menunjuk arah sebelah kiri (يَسَارًا = ke kiri). Lawan kata dari يَمِين (kanan).',
      'ms-MY': 'Menunjuk arah sebelah kiri (يَسَارًا = ke kiri). Lawan perkataan bagi يَمِين (kanan).',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Kata Benda Arah / Keterangan Tempat (Zharf)',
      'ms-MY': 'Kata Nama Arah / Keterangan Tempat (Zharf)',
    },
    advancedGrammarNote: {
      'id-ID': 'Dalam kalimat perintah arah seperti اِنْعَطِفْ يَسَارًا (beloklah ke kiri), berharakat fathatain.',
      'ms-MY': 'Dalam ayat perintah arah seperti اِنْعَطِفْ يَسَارًا (beloklah ke kiri), berbaris fathatain.',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · Navigasi Lingkungan',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
  },
  {
    id: 'w-world-amam',
    arabic: 'أَمَامَ',
    transliteration: 'Amama',
    contextualMeaning: {
      'id-ID': 'Di depan / Ke depan',
      'ms-MY': 'Di hadapan / Ke hadapan',
    },
    lexicalNote: {
      'id-ID': 'Kata keterangan posisi yang berarti "di hadapan" atau "di depan" (contoh: أَمَامَ الْمَسْجِدِ = di depan masjid).',
      'ms-MY': 'Kata keterangan posisi yang bermaksud "di hadapan" (contoh: أَمَامَ الْمَسْجِدِ = di hadapan masjid).',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Keterangan Tempat (Zharf Makan)',
      'ms-MY': 'Keterangan Tempat (Zharf Makan)',
    },
    advancedGrammarNote: {
      'id-ID': 'Kata benda setelah أَمَامَ berharakat kasrah (mudhaf ilaih majrur), misalnya أَمَامَ الْبَيْتِ.',
      'ms-MY': 'Kata nama selepas أَمَامَ berbaris kasrah (mudhaf ilaih majrur), misalnya أَمَامَ الْبَيْتِ.',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Al-Qiyamah 75:5',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
    sourceUrl: 'https://quran.com/75/5',
  },
  {
    id: 'w-world-khalf',
    arabic: 'خَلْفَ',
    transliteration: 'Khalfa',
    contextualMeaning: {
      'id-ID': 'Di belakang',
      'ms-MY': 'Di belakang',
    },
    lexicalNote: {
      'id-ID': 'Menunjukkan posisi di belakang sesuatu. Sering berpasangan dengan أَمَامَ (di depan) atau بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ di dalam Al-Qur’an.',
      'ms-MY': 'Menunjukkan kedudukan di belakang sesuatu. Sering berpasangan dengan أَمَامَ (di hadapan) atau بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ di dalam al-Quran.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Keterangan Tempat (Zharf Makan)',
      'ms-MY': 'Keterangan Tempat (Zharf Makan)',
    },
    advancedGrammarNote: {
      'id-ID': 'Zharf makan manshub; kata setelahnya menjadi mudhaf ilaih majrur (contoh: خَلْفَ الْمَدْرَسَةِ).',
      'ms-MY': 'Zharf makan mansub; perkataan selepasnya menjadi mudhaf ilaih majrur (contoh: خَلْفَ الْمَدْرَسَةِ).',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Al-Baqarah 2:255',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat & Ayat Kursi',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat & Ayat Kursi',
    },
    sourceUrl: 'https://quran.com/2/255',
  },
  {
    id: 'w-world-fawqa',
    arabic: 'فَوْقَ',
    transliteration: 'Fawqa',
    contextualMeaning: {
      'id-ID': 'Di atas',
      'ms-MY': 'Di atas',
    },
    lexicalNote: {
      'id-ID': 'Menyatakan posisi berada di bagian atas (contoh: الْقِطَّةُ فَوْقَ السَّقْفِ = kucing itu di atas atap).',
      'ms-MY': 'Menyatakan kedudukan berada di bahagian atas (contoh: الْقِطَّةُ فَوْقَ السَّقْفِ = kucing itu di atas bumbung).',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Keterangan Tempat (Zharf Makan)',
      'ms-MY': 'Keterangan Tempat (Zharf Makan)',
    },
    advancedGrammarNote: {
      'id-ID': 'Zharf makan yang diikuti oleh mudhaf ilaih berharakat kasrah (فَوْقَ الطَّاوِلَةِ).',
      'ms-MY': 'Zharf makan yang diikuti oleh mudhaf ilaih berbaris kasrah (فَوْقَ الطَّاوِلَةِ).',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Al-Fath 48:10',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
    sourceUrl: 'https://quran.com/48/10',
  },
  {
    id: 'w-world-tahta',
    arabic: 'تَحْتَ',
    transliteration: 'Tahta',
    contextualMeaning: {
      'id-ID': 'Di bawah',
      'ms-MY': 'Di bawah',
    },
    lexicalNote: {
      'id-ID': 'Menyatakan posisi di bawah sesuatu (contoh: الْكِتَابُ تَحْتَ الطَّاوِلَةِ = buku itu di bawah meja; di Al-Qur’an: تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ).',
      'ms-MY': 'Menyatakan kedudukan di bawah sesuatu (contoh: الْكِتَابُ تَحْتَ الطَّاوِلَةِ = buku itu di bawah meja; dalam al-Quran: تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ).',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Keterangan Tempat (Zharf Makan)',
      'ms-MY': 'Keterangan Tempat (Zharf Makan)',
    },
    advancedGrammarNote: {
      'id-ID': 'Zharf makan manshub yang menyandarkan kata benda sesudahnya dengan harakat kasrah (تَحْتَ الشَّجَرَةِ).',
      'ms-MY': 'Zharf makan mansub yang menyandarkan kata nama selepasnya dengan baris kasrah (تَحْتَ الشَّجَرَةِ).',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Al-Baqarah 2:25',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
    sourceUrl: 'https://quran.com/2/25',
  },
  {
    id: 'w-world-bayna',
    arabic: 'بَيْنَ',
    transliteration: 'Bayna',
    contextualMeaning: {
      'id-ID': 'Di antara',
      'ms-MY': 'Di antara',
    },
    lexicalNote: {
      'id-ID': 'Menunjukkan posisi di tengah-tengah dua objek (contoh: بَيْنَ الْمَسْجِدِ وَالْمَكْتَبَةِ = di antara masjid dan perpustakaan).',
      'ms-MY': 'Menunjukkan kedudukan di tengah-tengah dua objek (contoh: بَيْنَ الْمَسْجِدِ وَالْمَكْتَبَةِ = di antara masjid dan perpustakaan).',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Keterangan Tempat (Zharf Makan)',
      'ms-MY': 'Keterangan Tempat (Zharf Makan)',
    },
    advancedGrammarNote: {
      'id-ID': 'Diikuti oleh mudhaf ilaih berharakat kasrah untuk kedua benda yang mengapitnya.',
      'ms-MY': 'Diikuti oleh mudhaf ilaih berbaris kasrah bagi kedua-dua objek yang mengapitnya.',
    },
    stage: 2,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Al-Baqarah 2:255',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
    sourceUrl: 'https://quran.com/2/255',
  },
  {
    id: 'w-world-bijanibi',
    arabic: 'بِجَانِبِ',
    transliteration: 'Bijanibi',
    contextualMeaning: {
      'id-ID': 'Di samping / Di sebelah',
      'ms-MY': 'Di sebelah / Di sisi',
    },
    lexicalNote: {
      'id-ID': 'Gabungan huruf jar بِ dan kata جَانِب (sisi/samping), berarti "di samping" (contoh: بِجَانِبِ الْبَابِ = di samping pintu).',
      'ms-MY': 'Gabungan huruf jar بِ dan perkataan جَانِب (sisi/sebelah), bermaksud "di sebelah" (contoh: بِجَانِبِ الْبَابِ = di sebelah pintu).',
    },
    category: 'phrase',
    grammaticalRole: {
      'id-ID': 'Frasa Keterangan Tempat (Jar wa Majrur)',
      'ms-MY': 'Frasa Keterangan Tempat (Jar wa Majrur)',
    },
    advancedGrammarNote: {
      'id-ID': 'Kata جَانِبِ berakar dari ج-ن-ب (sisi) dan menjadi mudhaf bagi kata benda sesudahnya.',
      'ms-MY': 'Perkataan جَانِبِ berakar daripada ج-ن-ب (sisi) dan menjadi mudhaf bagi kata nama selepasnya.',
    },
    stage: 2,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Maryam 19:52',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
    sourceUrl: 'https://quran.com/19/52',
  },
  {
    id: 'w-world-dakhila',
    arabic: 'دَاخِلَ',
    transliteration: 'Dakhila',
    contextualMeaning: {
      'id-ID': 'Di dalam',
      'ms-MY': 'Di dalam',
    },
    lexicalNote: {
      'id-ID': 'Menunjukkan posisi di bagian dalam ruangan atau bangunan. Berakar dari د-خ-ل (masuk, seperti dalam kata وَادْخُلِ = dan masuklah).',
      'ms-MY': 'Menunjukkan kedudukan di bahagian dalam ruang atau bangunan. Berakar daripada د-خ-ل (masuk, seperti dalam perkataan وَادْخُلِ = dan masuklah).',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Keterangan Tempat (Zharf Makan)',
      'ms-MY': 'Keterangan Tempat (Zharf Makan)',
    },
    advancedGrammarNote: {
      'id-ID': 'Lawan kata dari خَارِجَ (di luar). Akar kata د-خ-ل sangat sering muncul di Al-Qur’an (ادْخُلُوهَا بِسَلَامٍ).',
      'ms-MY': 'Lawan perkataan bagi خَارِجَ (di luar). Akar perkataan د-خ-ل amat kerap hadir dalam al-Quran (ادْخُلُوهَا بِسَلَامٍ).',
    },
    stage: 2,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Al-Hijr 15:46',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
    sourceUrl: 'https://quran.com/15/46',
  },
  {
    id: 'w-world-kharija',
    arabic: 'خَارِجَ',
    transliteration: 'Kharija',
    contextualMeaning: {
      'id-ID': 'Di luar',
      'ms-MY': 'Di luar',
    },
    lexicalNote: {
      'id-ID': 'Menunjukkan posisi berada di luar bangunan atau wadah. Berakar dari خ-ر-ج (keluar).',
      'ms-MY': 'Menunjukkan kedudukan berada di luar bangunan atau bekas. Berakar daripada خ-ر-ج (keluar).',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Keterangan Tempat (Zharf Makan)',
      'ms-MY': 'Keterangan Tempat (Zharf Makan)',
    },
    advancedGrammarNote: {
      'id-ID': 'Diikuti oleh mudhaf ilaih majrur (contoh: خَارِجَ الْبَيْتِ = di luar rumah).',
      'ms-MY': 'Diikuti oleh mudhaf ilaih majrur (contoh: خَارِجَ الْبَيْتِ = di luar rumah).',
    },
    stage: 2,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · Navigasi Lingkungan',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
  },
  {
    id: 'w-world-qarib',
    arabic: 'قَرِيبٌ',
    transliteration: 'Qaribun',
    contextualMeaning: {
      'id-ID': 'Dekat',
      'ms-MY': 'Dekat',
    },
    lexicalNote: {
      'id-ID': 'Menyatakan jarak yang dekat (قَرِيبٌ مِنْ = dekat dari). Di dalam Al-Qur’an terkenal dalam ayat: فَإِنِّي قَرِيبٌ ("Maka sesungguhnya Aku dekat", QS. Al-Baqarah 2:186).',
      'ms-MY': 'Menyatakan jarak yang dekat (قَرِيبٌ مِنْ = dekat dengan). Dalam al-Quran terkenal pada ayat: فَإِنِّي قَرِيبٌ ("Maka sesungguhnya Aku dekat", QS. al-Baqarah 2:186).',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Kata Sifat (Isim Shifah)',
      'ms-MY': 'Kata Sifat (Isim Sifah)',
    },
    advancedGrammarNote: {
      'id-ID': 'Mengikuti pola فَعِيل dari akar ق-ر-ب (kedekatan). Lawan katanya adalah بَعِيدٌ (jauh).',
      'ms-MY': 'Mengikut wazan فَعِيل daripada akar ق-ر-ب (kedekatan). Lawan perkataannya ialah بَعِيدٌ (jauh).',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Al-Baqarah 2:186',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat & Terjemahan Kemenag RI',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat & Tafsir Pimpinan Ar-Rahman JAKIM',
    },
    sourceUrl: 'https://quran.com/2/186',
  },
  {
    id: 'w-world-baid',
    arabic: 'بَعِيدٌ',
    transliteration: 'Ba’idun',
    contextualMeaning: {
      'id-ID': 'Jauh',
      'ms-MY': 'Jauh',
    },
    lexicalNote: {
      'id-ID': 'Menyatakan jarak yang jauh (بَعِيدٌ عَنْ = jauh dari). Berakar dari ب-ع-د.',
      'ms-MY': 'Menyatakan jarak yang jauh (بَعِيدٌ عَنْ = jauh daripada). Berakar daripada ب-ع-د.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Kata Sifat (Isim Shifah)',
      'ms-MY': 'Kata Sifat (Isim Sifah)',
    },
    advancedGrammarNote: {
      'id-ID': 'Biasanya berpasangan dengan huruf jar عَنْ untuk menyatakan jauh dari sesuatu.',
      'ms-MY': 'Lazimnya berpasangan dengan huruf jar عَنْ untuk menyatakan jauh daripada sesuatu.',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Ibrahim 14:3',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
    sourceUrl: 'https://quran.com/14/3',
  },
  {
    id: 'w-world-inatif',
    arabic: 'اِنْعَطِفْ',
    transliteration: 'In‘athif',
    contextualMeaning: {
      'id-ID': 'Beloklah',
      'ms-MY': 'Beloklah',
    },
    lexicalNote: {
      'id-ID': 'Kata kerja perintah (Fi’il Amr) untuk berbelok arah di persimpangan jalan: اِنْعَطِفْ يَمِينًا (beloklah ke kanan) atau اِنْعَطِفْ يَسَارًا (beloklah ke kiri).',
      'ms-MY': 'Kata kerja perintah (Fi’il Amr) untuk membelok arah di persimpangan jalan: اِنْعَطِفْ يَمِينًا (beloklah ke kanan) atau اِنْعَطِفْ يَسَارًا (beloklah ke kiri).',
    },
    category: 'fiil',
    grammaticalRole: {
      'id-ID': 'Kata Kerja Perintah (Fi’il Amr)',
      'ms-MY': 'Kata Kerja Perintah (Fi’il Amr)',
    },
    advancedGrammarNote: {
      'id-ID': 'Berasal dari pola اِنْفَعَلَ (bab ke-7) dari akar ع-ط-ف yang bermakna berbelok atau condong.',
      'ms-MY': 'Berasal daripada wazan اِنْفَعَلَ (bab ke-7) daripada akar ع-ط-ف yang bermaksud membelok atau cenderung.',
    },
    stage: 2,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · Instruksi Jalan',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
  },
  {
    id: 'w-world-taqaddam',
    arabic: 'تَقَدَّمْ',
    transliteration: 'Taqaddam',
    contextualMeaning: {
      'id-ID': 'Majulah / Melangkahlah ke depan',
      'ms-MY': 'Majulah / Melangkahlah ke hadapan',
    },
    lexicalNote: {
      'id-ID': 'Kata kerja perintah untuk melangkah maju ke depan. Berakar dari ق-د-م.',
      'ms-MY': 'Kata kerja perintah untuk melangkah maju ke hadapan. Berakar daripada ق-د-م.',
    },
    category: 'fiil',
    grammaticalRole: {
      'id-ID': 'Kata Kerja Perintah (Fi’il Amr)',
      'ms-MY': 'Kata Kerja Perintah (Fi’il Amr)',
    },
    advancedGrammarNote: {
      'id-ID': 'Fi’il amr dari wazan تَفَعَّلَ (تَقَدَّمَ - يَتَقَدَّمُ - تَقَدَّمْ).',
      'ms-MY': 'Fi’il amr daripada wazan تَفَعَّلَ (تَقَدَّمَ - يَتَقَدَّمُ - تَقَدَّمْ).',
    },
    stage: 2,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Al-Muddathir 74:37',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
    sourceUrl: 'https://quran.com/74/37',
  },
  {
    id: 'w-world-tuffahatayn',
    arabic: 'تُفَّاحَتَيْنِ',
    transliteration: 'Tuffahatayni',
    contextualMeaning: {
      'id-ID': 'Dua buah apel',
      'ms-MY': 'Dua biji epal',
    },
    lexicalNote: {
      'id-ID': 'Bentuk mutsanna (dua/dual) dari kata تُفَّاحَةٌ (satu apel). Akhiran ـَيْنِ (-ayni) menunjukkan jumlah tepat dua sebagai objek kalimat.',
      'ms-MY': 'Bentuk mutsanna (dua/dual) daripada perkataan تُفَّاحَةٌ (sebiji epal). Akhiran ـَيْنِ (-ayni) menunjukkan bilangan tepat dua sebagai objek ayat.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Kata Benda Dual (Isim Mutsanna Manshub)',
      'ms-MY': 'Kata Nama Dual (Isim Mutsanna Mansub)',
    },
    advancedGrammarNote: {
      'id-ID': 'Dalam kalimat أَعْطِنِي تُفَّاحَتَيْنِ حَمْرَاوَيْنِ ("Berikan kepadaku dua apel merah"), kata sifatnya (حَمْرَاوَيْنِ) juga wajib mengikuti bentuk dual ـَيْنِ.',
      'ms-MY': 'Dalam ayat أَعْطِنِي تُفَّاحَتَيْنِ حَمْرَاوَيْنِ ("Berikan kepadaku dua biji epal merah"), kata sifatnya (حَمْرَاوَيْنِ) juga wajib mengikut bentuk dual ـَيْنِ.',
    },
    stage: 2,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · Misi Pasar',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
  },
  {
    id: 'w-world-yaqrau',
    arabic: 'يَقْرَأُ',
    transliteration: 'Yaqra’u',
    contextualMeaning: {
      'id-ID': 'Dia (laki-laki) sedang membaca',
      'ms-MY': 'Dia (lelaki) sedang membaca',
    },
    lexicalNote: {
      'id-ID': 'Kata kerja masa kini (Fi’il Mudhari’) dari akar ق-ر-أ, akar kata yang sama dengan kata الْقُرْآن (bacaan yang mulia) dan wahyu pertama اقْرَأْ.',
      'ms-MY': 'Kata kerja masa kini (Fi’il Mudhari’) daripada akar ق-ر-أ, akar perkataan yang sama dengan الْقُرْآن (bacaan yang mulia) dan wahyu pertama اقْرَأْ.',
    },
    category: 'fiil',
    grammaticalRole: {
      'id-ID': 'Kata Kerja Masa Kini (Fi’il Mudhari’)',
      'ms-MY': 'Kata Kerja Masa Kini (Fi’il Mudhari’)',
    },
    advancedGrammarNote: {
      'id-ID': 'Dapat diletakkan di awal kalimat kerja (يَقْرَأُ الْوَلَدُ الْكِتَابَ) maupun setelah subjek (الْوَلَدُ يَقْرَأُ الْكِتَابَ).',
      'ms-MY': 'Boleh diletakkan di awal ayat kerja (يَقْرَأُ الْوَلَدُ الْكِتَابَ) mahupun selepas subjek (الْوَلَدُ يَقْرَأُ الْكِتَابَ).',
    },
    stage: 2,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Al-‘Alaq 96:1',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat',
    },
    sourceUrl: 'https://quran.com/96/1',
  },
  {
    id: 'w-world-kataba',
    arabic: 'كَتَبَ',
    transliteration: 'Kataba',
    contextualMeaning: {
      'id-ID': 'Dia telah menulis / menetapkan',
      'ms-MY': 'Dia telah menulis / menetapkan',
    },
    lexicalNote: {
      'id-ID': 'Kata kerja lampau (Fi’il Madhi) tiga huruf dasar dari keluarga ك-ت-ب: melahirkan كِتَابٌ (buku/kitab), كَاتِبٌ (penulis), dan مَكْتُوبٌ (yang tertulis).',
      'ms-MY': 'Kata kerja lampau (Fi’il Madhi) tiga huruf asas daripada keluarga ك-ت-ب: melahirkan كِتَابٌ (buku/kitab), كَاتِبٌ (penulis) dan مَكْتُوبٌ (yang tertulis).',
    },
    category: 'fiil',
    grammaticalRole: {
      'id-ID': 'Kata Kerja Lampau (Fi’il Madhi)',
      'ms-MY': 'Kata Kerja Lampau (Fi’il Madhi)',
    },
    advancedGrammarNote: {
      'id-ID': 'Di dalam Al-Qur’an muncul dalam QS. Al-An’am 6:12: كَتَبَ عَلَىٰ نَفْسِهِ الرَّحْمَةَ ("Dia telah menetapkan atas diri-Nya kasih sayang").',
      'ms-MY': 'Di dalam al-Quran hadir dalam QS. al-An’am 6:12: كَتَبَ عَلَىٰ نَفْسِهِ الرَّحْمَةَ ("Dia telah menetapkan atas diri-Nya kasih sayang").',
    },
    stage: 3,
    pathwayId: 'understand-quran',
    verseRef: 'Dunia Makna · QS. Al-An’am 6:12',
    sourceAttribution: {
      'id-ID': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat & Terjemahan Kemenag RI',
      'ms-MY': 'Draf Kurikulum Bahasa Arab Kontekstual Faham Ayat & Tafsir Pimpinan Ar-Rahman JAKIM',
    },
    sourceUrl: 'https://quran.com/6/12',
    rootFamily: {
      rootArabic: 'ك - ت - ب',
      rootLatin: 'k-t-b',
      coreConcept: {
        'id-ID': 'Menulis, menghimpun, dan menetapkan ketetapan',
        'ms-MY': 'Menulis, menghimpunkan dan menetapkan ketetapan',
      },
      linguisticNote: {
        'id-ID': 'Perhatikan bagaimana perubahan pola (wazan) dari كَتَبَ (menulis) membentuk كَاتِبٌ (pelaku/penulis), كِتَابٌ (kitab/buku), dan مَكْتُوبٌ (objek yang ditulis).',
        'ms-MY': 'Perhatikan bagaimana perubahan wazan daripada كَتَبَ (menulis) membentuk كَاتِبٌ (pelaku/penulis), كِتَابٌ (kitab/buku) dan مَكْتُوبٌ (objek yang ditulis).',
      },
      relatedForms: [
        {
          arabic: 'كِتَابٌ',
          transliteration: 'Kitabun',
          meaning: { 'id-ID': 'Kitab / Buku', 'ms-MY': 'Kitab / Buku' },
          formType: { 'id-ID': 'Kata Benda (Isim)', 'ms-MY': 'Kata Nama (Isim)' },
          verseRef: 'QS. Al-Baqarah 2:2',
        },
        {
          arabic: 'كَاتِبٌ',
          transliteration: 'Katibun',
          meaning: { 'id-ID': 'Penulis / Pencatat', 'ms-MY': 'Penulis / Pencatat' },
          formType: { 'id-ID': 'Kata Benda Pelaku (Isim Fa’il)', 'ms-MY': 'Kata Nama Pelaku (Isim Fa’il)' },
          verseRef: 'QS. Al-Baqarah 2:282',
        },
        {
          arabic: 'مَكْتُوبٌ',
          transliteration: 'Maktubun',
          meaning: { 'id-ID': 'Yang tertulis / Tercatat', 'ms-MY': 'Yang tertulis / Tercatat' },
          formType: { 'id-ID': 'Kata Benda Objek (Isim Maf’ul)', 'ms-MY': 'Kata Nama Objek (Isim Maf’ul)' },
          verseRef: 'QS. Al-A’raf 7:157',
        },
      ],
    },
  },
];

// ============================================================================
// GAME 1: THE NEIGHBORHOOD — ARABIC STREET EXPLORER (6 LEVELS)
// ============================================================================
export type TileKind =
  | 'road'
  | 'park'
  | 'masjid'
  | 'library'
  | 'market'
  | 'house-blue'
  | 'house-red'
  | 'house-green'
  | 'bridge'
  | 'fountain'
  | 'bench'
  | 'tree'
  | 'courtyard-inside'
  | 'courtyard-outside'
  | 'rooftop-high'
  | 'tunnel-under';

export interface StreetLandmark {
  x: number;
  y: number;
  kind: TileKind;
  arabicLabel: string;
  transliteration: string;
  label: LocalizedText;
  spatialTag?: string; // e.g., 'fawqa', 'tahta', 'dakhila', 'kharija', 'bayna', 'bijanibi', 'qarib', 'baid'
}

export interface StreetExplorerLevel {
  levelNumber: number;
  stageTitle: LocalizedText;
  pedagogicalFocus: LocalizedText;
  arabicInstruction: string;
  transliterationInstruction: string;
  translationHint: LocalizedText;
  listenOnlyMode?: boolean;
  isUnfamiliarTransferMap?: boolean;
  startPos: { x: number; y: number };
  targetPos: { x: number; y: number };
  requiredIntermediatePos?: { x: number; y: number };
  focusWordIds: string[];
  landmarks: StreetLandmark[];
  blockedCoords: Array<{ x: number; y: number }>;
  successExplanation: LocalizedText;
}

export const STREET_EXPLORER_LEVELS: StreetExplorerLevel[] = [
  {
    levelNumber: 1,
    stageTitle: {
      'id-ID': 'Level 1 · Arah Dasar (يَمِين / يَسَار / أَمَام / خَلْف)',
      'ms-MY': 'Tahap 1 · Arah Asas (يَمِين / يَسَار / أَمَام / خَلْف)',
    },
    pedagogicalFocus: {
      'id-ID': 'Mengenali kata arah dasar: melangkah ke depan (أَمَام) dan ke kanan (يَمِين) menuju Masjid.',
      'ms-MY': 'Mengenali perkataan arah asas: melangkah ke hadapan (أَمَام) dan ke kanan (يَمِين) menuju Masjid.',
    },
    arabicInstruction: 'اِتَّجِهْ إِلَى الْأَمَامِ، ثُمَّ إِلَى الْيَمِينِ نَحْوَ الْمَسْجِدِ',
    transliterationInstruction: 'Ittajih ilal-amami, tsumma ilal-yamini nahwal-masjidi',
    translationHint: {
      'id-ID': 'Melangkahlah ke depan (utara), lalu ke arah kanan (timur) menuju Masjid (الْمَسْجِد).',
      'ms-MY': 'Melangkahlah ke hadapan (utara), kemudian ke arah kanan (timur) menuju Masjid (الْمَسْجِد).',
    },
    startPos: { x: 1, y: 4 },
    requiredIntermediatePos: { x: 1, y: 2 },
    targetPos: { x: 3, y: 2 },
    focusWordIds: ['w-world-amam', 'w-world-yamin'],
    landmarks: [
      {
        x: 3,
        y: 2,
        kind: 'masjid',
        arabicLabel: 'الْمَسْجِدُ',
        transliteration: 'Al-Masjidu',
        label: { 'id-ID': 'Masjid', 'ms-MY': 'Masjid' },
      },
      {
        x: 1,
        y: 1,
        kind: 'tree',
        arabicLabel: 'شَجَرَةٌ',
        transliteration: 'Syajaratun',
        label: { 'id-ID': 'Pohon Taman', 'ms-MY': 'Pokok Taman' },
      },
      {
        x: 4,
        y: 4,
        kind: 'library',
        arabicLabel: 'الْمَكْتَبَةُ',
        transliteration: 'Al-Maktabatu',
        label: { 'id-ID': 'Perpustakaan', 'ms-MY': 'Perpustakaan' },
      },
    ],
    blockedCoords: [
      { x: 0, y: 0 },
      { x: 2, y: 3 },
      { x: 2, y: 4 },
    ],
    successExplanation: {
      'id-ID': 'Tepat! Anda memahami أَمَامَ (ke depan) dan يَمِين (kanan) untuk tiba di الْمَسْجِدُ.',
      'ms-MY': 'Tepat! Anda memahami أَمَامَ (ke hadapan) dan يَمِين (kanan) untuk tiba di الْمَسْجِدُ.',
    },
  },
  {
    levelNumber: 2,
    stageTitle: {
      'id-ID': 'Level 2 · Belokan & Perintah Gerak (اِنْعَطِفْ يَمِينًا / يَسَارًا)',
      'ms-MY': 'Tahap 2 · Belokan & Arahan Gerak (اِنْعَطِفْ يَمِينًا / يَسَارًا)',
    },
    pedagogicalFocus: {
      'id-ID': 'Membedakan perintah اِنْعَطِفْ يَسَارًا (belok kiri) dari اِنْعَطِفْ يَمِينًا (belok kanan).',
      'ms-MY': 'Membezakan perintah اِنْعَطِفْ يَسَارًا (belok kiri) daripada اِنْعَطِفْ يَمِينًا (belok kanan).',
    },
    arabicInstruction: 'تَقَدَّمْ إِلَى التَّقَاطُعِ، ثُمَّ اِنْعَطِفْ يَسَارًا إِلَى الْمَكْتَبَةِ',
    transliterationInstruction: 'Taqaddam ilat-taqathu’i, tsumma in‘athif yasaran ilal-maktabati',
    translationHint: {
      'id-ID': 'Majulah ke persimpangan, kemudian beloklah ke kiri (يَسَارًا) menuju Perpustakaan (الْمَكْتَبَة).',
      'ms-MY': 'Majulah ke persimpangan, kemudian beloklah ke kiri (يَسَارًا) menuju Perpustakaan (الْمَكْتَبَة).',
    },
    startPos: { x: 3, y: 4 },
    requiredIntermediatePos: { x: 3, y: 2 },
    targetPos: { x: 1, y: 2 },
    focusWordIds: ['w-world-taqaddam', 'w-world-inatif', 'w-world-yasar'],
    landmarks: [
      {
        x: 1,
        y: 2,
        kind: 'library',
        arabicLabel: 'الْمَكْتَبَةُ',
        transliteration: 'Al-Maktabatu',
        label: { 'id-ID': 'Perpustakaan', 'ms-MY': 'Perpustakaan' },
      },
      {
        x: 4,
        y: 2,
        kind: 'market',
        arabicLabel: 'السُّوقُ',
        transliteration: 'As-Suqu',
        label: { 'id-ID': 'Pasar (Kanan)', 'ms-MY': 'Pasar (Kanan)' },
      },
      {
        x: 3,
        y: 0,
        kind: 'fountain',
        arabicLabel: 'النَّافُورَةُ',
        transliteration: 'An-Nafuratu',
        label: { 'id-ID': 'Air Mancur', 'ms-MY': 'Air Pancut' },
      },
    ],
    blockedCoords: [
      { x: 2, y: 3 },
      { x: 2, y: 4 },
      { x: 4, y: 3 },
    ],
    successExplanation: {
      'id-ID': 'Bagus sekali! تَقَدَّمْ (majulah) dan اِنْعَطِفْ يَسَارًا (beloklah ke kiri) membawa Anda tepat ke Perpustakaan.',
      'ms-MY': 'Bagus sekali! تَقَدَّمْ (majulah) dan اِنْعَطِفْ يَسَارًا (beloklah ke kiri) membawa anda tepat ke Perpustakaan.',
    },
  },
  {
    levelNumber: 3,
    stageTitle: {
      'id-ID': 'Level 3 · Rangkaian Instruksi Bertahap & Warna Pintu',
      'ms-MY': 'Tahap 3 · Rangkaian Arahan Berperingkat & Warna Pintu',
    },
    pedagogicalFocus: {
      'id-ID': 'Mengikuti instruksi 3 langkah dengan kata penghubung ثُمَّ (kemudian) dan sifat warna (الْبَابَ الْأَزْرَقَ).',
      'ms-MY': 'Mengikuti arahan 3 langkah dengan kata hubung ثُمَّ (kemudian) dan sifat warna (الْبَابَ الْأَزْرَقَ).',
    },
    arabicInstruction: 'تَقَدَّمْ، ثُمَّ اِنْعَطِفْ يَسَارًا، وَادْخُلِ الْبَابَ الْأَزْرَقَ',
    transliterationInstruction: 'Taqaddam, tsumma in‘athif yasaran, wadkhulil-babal-azraqa',
    translationHint: {
      'id-ID': 'Majulah, kemudian beloklah ke kiri, dan masuklah ke Pintu Biru (الْبَابَ الْأَزْرَقَ).',
      'ms-MY': 'Majulah, kemudian beloklah ke kiri, dan masuklah ke Pintu Biru (الْبَابَ الْأَزْرَقَ).',
    },
    startPos: { x: 2, y: 4 },
    requiredIntermediatePos: { x: 2, y: 2 },
    targetPos: { x: 0, y: 2 },
    focusWordIds: ['w-world-taqaddam', 'w-world-inatif', 'w-world-yasar', 'w-world-dakhila'],
    landmarks: [
      {
        x: 0,
        y: 2,
        kind: 'house-blue',
        arabicLabel: 'الْبَابُ الْأَزْرَقُ',
        transliteration: 'Al-Babul-Azraqu',
        label: { 'id-ID': 'Pintu Biru', 'ms-MY': 'Pintu Biru' },
      },
      {
        x: 4,
        y: 2,
        kind: 'house-red',
        arabicLabel: 'الْبَابُ الْأَحْمَرُ',
        transliteration: 'Al-Babul-Ahmaru',
        label: { 'id-ID': 'Pintu Merah', 'ms-MY': 'Pintu Merah' },
      },
      {
        x: 2,
        y: 0,
        kind: 'house-green',
        arabicLabel: 'الْبَابُ الْأَخْضَرُ',
        transliteration: 'Al-Babul-Akhdharu',
        label: { 'id-ID': 'Pintu Hijau', 'ms-MY': 'Pintu Hijau' },
      },
    ],
    blockedCoords: [
      { x: 1, y: 3 },
      { x: 3, y: 3 },
    ],
    successExplanation: {
      'id-ID': 'Luar biasa! Anda memadukan urutan gerak (تَقَدَّمْ -> اِنْعَطِفْ يَسَارًا) dan mengenali الْبَابَ الْأَزْرَقَ (Pintu Biru).',
      'ms-MY': 'Luar biasa! Anda menggabungkan urutan gerak (تَقَدَّمْ -> اِنْعَطِفْ يَسَارًا) dan mengenali الْبَابَ الْأَزْرَقَ (Pintu Biru).',
    },
  },
  {
    levelNumber: 4,
    stageTitle: {
      'id-ID': 'Level 4 · Keterangan Ruang Lengkap (فَوْق / تَحْت / دَاخِل / خَارِج / بَيْن / بِجَانِب)',
      'ms-MY': 'Tahap 4 · Keterangan Ruang Lengkap (فَوْق / تَحْت / دَاخِل / خَارِج / بَيْن / بِجَانِب)',
    },
    pedagogicalFocus: {
      'id-ID': 'Memahami posisi spasial bertingkat: di atas jembatan (فَوْق), di bawah pohon (تَحْت), di dalam/luar halaman (دَاخِل / خَارِج), dan di antara dua bangunan (بَيْنَ).',
      'ms-MY': 'Memahami kedudukan ruang bertingkat: di atas jambatan (فَوْق), di bawah pokok (تَحْت), di dalam/luar halaman (دَاخِل / خَارِج) dan di antara dua bangunan (بَيْنَ).',
    },
    arabicInstruction: 'قِفْ بَيْنَ الْمَسْجِدِ وَالْمَكْتَبَةِ أَمَامَ النَّافُورَةِ',
    transliterationInstruction: 'Qif baynal-masjidi wal-maktabati amaman-nafurati',
    translationHint: {
      'id-ID': 'Berdirilah DI ANTARA (بَيْنَ) Masjid dan Perpustakaan, tepat DI DEPAN (أَمَامَ) Air Mancur.',
      'ms-MY': 'Berdirilah DI ANTARA (بَيْنَ) Masjid dan Perpustakaan, tepat DI HADAPAN (أَمَامَ) Air Pancut.',
    },
    startPos: { x: 2, y: 4 },
    targetPos: { x: 2, y: 1 },
    focusWordIds: [
      'w-world-bayna',
      'w-world-fawqa',
      'w-world-tahta',
      'w-world-dakhila',
      'w-world-kharija',
      'w-world-bijanibi',
    ],
    landmarks: [
      {
        x: 1,
        y: 1,
        kind: 'masjid',
        arabicLabel: 'الْمَسْجِدُ',
        transliteration: 'Al-Masjidu',
        label: { 'id-ID': 'Masjid (Kiri)', 'ms-MY': 'Masjid (Kiri)' },
      },
      {
        x: 3,
        y: 1,
        kind: 'library',
        arabicLabel: 'الْمَكْتَبَةُ',
        transliteration: 'Al-Maktabatu',
        label: { 'id-ID': 'Perpustakaan (Kanan)', 'ms-MY': 'Perpustakaan (Kanan)' },
      },
      {
        x: 2,
        y: 0,
        kind: 'fountain',
        arabicLabel: 'النَّافُورَةُ',
        transliteration: 'An-Nafuratu',
        label: { 'id-ID': 'Air Mancur (Depan)', 'ms-MY': 'Air Pancut (Hadapan)' },
      },
      {
        x: 0,
        y: 3,
        kind: 'rooftop-high',
        arabicLabel: 'فَوْقَ الْجِسْرِ',
        transliteration: 'Fawqal-Jisri',
        label: { 'id-ID': 'Atas Jembatan (فَوْقَ)', 'ms-MY': 'Atas Jambatan (فَوْقَ)' },
        spatialTag: 'fawqa',
      },
      {
        x: 4,
        y: 3,
        kind: 'tree',
        arabicLabel: 'تَحْتَ الشَّجَرَةِ',
        transliteration: 'Tahtasy-Syajarati',
        label: { 'id-ID': 'Bawah Pohon (تَحْتَ)', 'ms-MY': 'Bawah Pokok (تَحْتَ)' },
        spatialTag: 'tahta',
      },
      {
        x: 0,
        y: 4,
        kind: 'courtyard-inside',
        arabicLabel: 'دَاخِلَ الْفِنَاءِ',
        transliteration: 'Dakhilal-Fina’i',
        label: { 'id-ID': 'Dalam Halaman (دَاخِلَ)', 'ms-MY': 'Dalam Halaman (دَاخِلَ)' },
        spatialTag: 'dakhila',
      },
      {
        x: 4,
        y: 4,
        kind: 'courtyard-outside',
        arabicLabel: 'خَارِجَ السُّورِ',
        transliteration: 'Kharijas-Suri',
        label: { 'id-ID': 'Luar Pagar (خَارِجَ)', 'ms-MY': 'Luar Pagar (خَارِجَ)' },
        spatialTag: 'kharija',
      },
    ],
    blockedCoords: [],
    successExplanation: {
      'id-ID': 'Tepat! Petak (2,1) berada بَيْنَ الْمَسْجِدِ وَالْمَكْتَبَةِ (di antara Masjid dan Perpustakaan) serta أَمَامَ النَّافُورَةِ (di depan Air Mancur).',
      'ms-MY': 'Tepat! Petak (2,1) berada بَيْنَ الْمَسْجِدِ وَالْمَكْتَبَةِ (di antara Masjid dan Perpustakaan) serta أَمَامَ النَّافُورَةِ (di hadapan Air Pancut).',
    },
  },
  {
    levelNumber: 5,
    stageTitle: {
      'id-ID': 'Level 5 · Dengarkan & Bertindak (قَرِيب / بَعِيد / بِجَانِب)',
      'ms-MY': 'Tahap 5 · Dengar & Bertindak (قَرِيب / بَعِيد / بِجَانِب)',
    },
    pedagogicalFocus: {
      'id-ID': 'Melatih pemahaman dengar & jarak spasial: menuju bangku di samping pohon yang dekat dari pasar (بِجَانِبِ الشَّجَرَةِ الْقَرِيبَةِ مِنَ السُّوقِ).',
      'ms-MY': 'Melatih kefahaman mendengar & jarak ruang: menuju bangku di sebelah pokok yang dekat dengan pasar (بِجَانِبِ الشَّجَرَةِ الْقَرِيبَةِ مِنَ السُّوقِ).',
    },
    arabicInstruction: 'اِذْهَبْ إِلَى الْمَقْعَدِ بِجَانِبِ الشَّجَرَةِ الْقَرِيبَةِ مِنَ السُّوقِ',
    transliterationInstruction: 'Idzhab ilal-maq‘adi bijanibisy-syajaratil-qaribati minas-suqi',
    translationHint: {
      'id-ID': 'Pergilah ke bangku (الْمَقْعَد) di samping pohon yang DEKAT (الْقَرِيبَة) dari Pasar, bukan yang jauh (الْبَعِيدَة).',
      'ms-MY': 'Pergilah ke bangku (الْمَقْعَد) di sebelah pokok yang DEKAT (الْقَرِيبَة) dengan Pasar, bukan yang jauh (الْبَعِيدَة).',
    },
    listenOnlyMode: true,
    startPos: { x: 1, y: 4 },
    targetPos: { x: 3, y: 1 },
    focusWordIds: ['w-world-bijanibi', 'w-world-qarib', 'w-world-baid'],
    landmarks: [
      {
        x: 4,
        y: 0,
        kind: 'market',
        arabicLabel: 'السُّوقُ',
        transliteration: 'As-Suqu',
        label: { 'id-ID': 'Pasar Kota', 'ms-MY': 'Pasar Bandar' },
      },
      {
        x: 4,
        y: 1,
        kind: 'tree',
        arabicLabel: 'الشَّجَرَةُ الْقَرِيبَةُ',
        transliteration: 'Asy-Syajaratul-Qaribatu',
        label: { 'id-ID': 'Pohon Dekat Pasar (قَرِيب)', 'ms-MY': 'Pokok Dekat Pasar (قَرِيب)' },
      },
      {
        x: 3,
        y: 1,
        kind: 'bench',
        arabicLabel: 'الْمَقْعَدُ الْقَرِيبُ',
        transliteration: 'Al-Maq‘adul-Qaribu',
        label: { 'id-ID': 'Bangku Samping Pohon Dekat', 'ms-MY': 'Bangku Sebelah Pokok Dekat' },
      },
      {
        x: 0,
        y: 0,
        kind: 'bench',
        arabicLabel: 'الْمَقْعَدُ الْبَعِيدُ',
        transliteration: 'Al-Maq‘adul-Ba‘idu',
        label: { 'id-ID': 'Bangku Jauh (بَعِيدٌ)', 'ms-MY': 'Bangku Jauh (بَعِيدٌ)' },
      },
    ],
    blockedCoords: [{ x: 2, y: 2 }],
    successExplanation: {
      'id-ID': 'Pendengaran dan pemetaan ruang yang tajam! Anda membedakan الْقَرِيب (dekat) dari الْبَعِيد (jauh) dan tiba بِجَانِبِ الشَّجَرَةِ.',
      'ms-MY': 'Pendengaran dan pemetaan ruang yang tajam! Anda membezakan الْقَرِيب (dekat) daripada الْبَعِيد (jauh) dan tiba بِجَانِبِ الشَّجَرَةِ.',
    },
  },
  {
    levelNumber: 6,
    stageTitle: {
      'id-ID': 'Level 6 · Uji Transfer di Lingkungan Baru (Tanpa Hafalan Posisi)',
      'ms-MY': 'Tahap 6 · Ujian Pemindahan di Kejiranan Baharu (Tanpa Hafalan Posisi)',
    },
    pedagogicalFocus: {
      'id-ID': 'Membuktikan pemahaman sejati di tata letak kota baru: ikuti instruksi multi-langkah menuju Jembatan di belakang Perpustakaan.',
      'ms-MY': 'Membuktikan kefahaman sebenar di susun atur bandar baharu: ikuti arahan berbilang langkah menuju Jambatan di belakang Perpustakaan.',
    },
    arabicInstruction: 'اعْبُرْ فَوْقَ الْجِسْرِ خَلْفَ الْمَكْتَبَةِ بِجَانِبِ الْبَابِ الْأَخْضَرِ',
    transliterationInstruction: 'U‘bur fawqal-jisri khalfal-maktabati bijanibil-babil-akhdhari',
    translationHint: {
      'id-ID': 'Menyeberanglah DI ATAS Jembatan (فَوْقَ الْجِسْرِ) yang berada DI BELAKANG Perpustakaan (خَلْفَ الْمَكْتَبَةِ) dan DI SAMPING Pintu Hijau.',
      'ms-MY': 'Melintaslah DI ATAS Jambatan (فَوْقَ الْجِسْرِ) yang berada DI BELAKANG Perpustakaan (خَلْفَ الْمَكْتَبَةِ) dan DI SEBELAH Pintu Hijau.',
    },
    isUnfamiliarTransferMap: true,
    startPos: { x: 0, y: 4 },
    targetPos: { x: 3, y: 0 },
    focusWordIds: ['w-world-fawqa', 'w-world-khalf', 'w-world-bijanibi'],
    landmarks: [
      {
        x: 3,
        y: 1,
        kind: 'library',
        arabicLabel: 'الْمَكْتَبَةُ',
        transliteration: 'Al-Maktabatu',
        label: { 'id-ID': 'Perpustakaan', 'ms-MY': 'Perpustakaan' },
      },
      {
        x: 3,
        y: 0,
        kind: 'bridge',
        arabicLabel: 'الْجِسْرُ (فَوْقَ النَّهْرِ)',
        transliteration: 'Al-Jisru',
        label: { 'id-ID': 'Jembatan (Belakang Perpustakaan)', 'ms-MY': 'Jambatan (Belakang Perpustakaan)' },
      },
      {
        x: 4,
        y: 0,
        kind: 'house-green',
        arabicLabel: 'الْبَابُ الْأَخْضَرُ',
        transliteration: 'Al-Babul-Akhdharu',
        label: { 'id-ID': 'Pintu Hijau', 'ms-MY': 'Pintu Hijau' },
      },
      {
        x: 1,
        y: 0,
        kind: 'bridge',
        arabicLabel: 'جِسْرُ السُّوقِ',
        transliteration: 'Jisrus-Suqi',
        label: { 'id-ID': 'Jembatan Pasar (Pengecoh)', 'ms-MY': 'Jambatan Pasar (Pengeliru)' },
      },
    ],
    blockedCoords: [
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
    successExplanation: {
      'id-ID': 'Selamat! Anda berhasil menerapkan pemahaman kosakata ruang dan arah di lingkungan baru tanpa bergantung pada hafalan posisi.',
      'ms-MY': 'Tahniah! Anda berjaya mengaplikasikan kefahaman kosa kata ruang dan arah di kejiranan baharu tanpa bergantung pada hafalan kedudukan.',
    },
  },
];

// ============================================================================
// GAME 2: THE SCENE LAB — "THE SCENE DOES NOT LIE" (5 STAGES)
// ============================================================================
export interface SceneLabStage {
  stageNumber: number;
  title: LocalizedText;
  mode: 'select-matching-sentence' | 'verify-statement' | 'place-object-in-scene';
  sceneVisualId: 'book-under-table' | 'boy-reading-near-window' | 'two-birds-above-tree' | 'cat-between-chairs' | 'interactive-room-placement';
  promptQuestion: LocalizedText;
  targetArabicSentence: string;
  targetTransliteration: string;
  options: Array<{
    id: string;
    arabic: string;
    transliteration: string;
    meaning: LocalizedText;
    isCorrect: boolean;
    diagnosticFeedback: LocalizedText;
  }>;
  placementZones?: Array<{
    zoneId: 'fawqa-table' | 'tahta-table' | 'bijanibi-chair' | 'dakhila-box';
    arabicZoneLabel: string;
    label: LocalizedText;
    isCorrectZone: boolean;
  }>;
  focusWordIds: string[];
}

export const SCENE_LAB_STAGES: SceneLabStage[] = [
  {
    stageNumber: 1,
    title: {
      'id-ID': 'Tahap 1 · Benda, Warna, dan Posisi Ruang',
      'ms-MY': 'Tahap 1 · Objek, Warna dan Kedudukan Ruang',
    },
    mode: 'select-matching-sentence',
    sceneVisualId: 'book-under-table',
    promptQuestion: {
      'id-ID': 'Amati adegan visual di samping. Kalimat bahasa Arab manakah yang benar-benar sesuai dengan posisi buku hijau tersebut?',
      'ms-MY': 'Perhatikan adegan visual di sebelah. Ayat bahasa Arab manakah yang benar-benar bertepatan dengan kedudukan buku hijau tersebut?',
    },
    targetArabicSentence: 'الْكِتَابُ الْأَخْضَرُ تَحْتَ الطَّاوِلَةِ',
    targetTransliteration: 'Al-kitabul-akhdharu tahtath-thawilati',
    focusWordIds: ['w-world-tahta', 'w-world-fawqa'],
    options: [
      {
        id: 'opt-1',
        arabic: 'الْكِتَابُ الْأَخْضَرُ تَحْتَ الطَّاوِلَةِ',
        transliteration: 'Al-kitabul-akhdharu tahtath-thawilati',
        meaning: {
          'id-ID': 'Buku hijau itu berada di bawah meja.',
          'ms-MY': 'Buku hijau itu berada di bawah meja.',
        },
        isCorrect: true,
        diagnosticFeedback: {
          'id-ID': 'Benar! Pada gambar, buku hijau berada تَحْتَ (di bawah) meja, bukan فَوْقَ (di atas).',
          'ms-MY': 'Betul! Pada gambar, buku hijau berada تَحْتَ (di bawah) meja, bukannya فَوْقَ (di atas).',
        },
      },
      {
        id: 'opt-2',
        arabic: 'الْكِتَابُ الْأَخْضَرُ فَوْقَ الطَّاوِلَةِ',
        transliteration: 'Al-kitabul-akhdharu fawqath-thawilati',
        meaning: {
          'id-ID': 'Buku hijau itu berada di atas meja.',
          'ms-MY': 'Buku hijau itu berada di atas meja.',
        },
        isCorrect: false,
        diagnosticFeedback: {
          'id-ID': 'Kurang tepat: فَوْقَ berarti "di atas". Di dalam gambar, yang berada di atas meja adalah cangkir, sedangkan buku berada تَحْتَ (di bawah) meja.',
          'ms-MY': 'Kurang tepat: فَوْقَ bermaksud "di atas". Dalam gambar, yang berada di atas meja ialah cawan, manakala buku berada تَحْتَ (di bawah) meja.',
        },
      },
      {
        id: 'opt-3',
        arabic: 'الْكِتَابُ الْأَحْمَرُ تَحْتَ الْكُرْسِيِّ',
        transliteration: 'Al-kitabul-ahmaru tahtal-kursiyyi',
        meaning: {
          'id-ID': 'Buku merah itu berada di bawah kursi.',
          'ms-MY': 'Buku merah itu berada di bawah kerusi.',
        },
        isCorrect: false,
        diagnosticFeedback: {
          'id-ID': 'Perhatikan warna dan bendanya: الْأَحْمَرُ berarti merah dan الْكُرْسِيِّ berarti kursi, sedangkan di adegan buku itu berwarna hijau (الْأَخْضَرُ) di bawah meja (الطَّاوِلَةِ).',
          'ms-MY': 'Perhatikan warna dan objeknya: الْأَحْمَرُ bermaksud merah dan الْكُرْسِيِّ bermaksud kerusi, sedangkan dalam adegan buku itu berwarna hijau (الْأَخْضَرُ) di bawah meja (الطَّاوِلَةِ).',
        },
      },
    ],
  },
  {
    stageNumber: 2,
    title: {
      'id-ID': 'Tahap 2 · Tindakan & Kata Kerja (الْأَفْعَال)',
      'ms-MY': 'Tahap 2 · Tindakan & Kata Kerja (الْأَفْعَال)',
    },
    mode: 'select-matching-sentence',
    sceneVisualId: 'boy-reading-near-window',
    promptQuestion: {
      'id-ID': 'Perhatikan apa yang sedang dilakukan anak laki-laki di samping jendela dalam adegan ini:',
      'ms-MY': 'Perhatikan perkara yang sedang dilakukan oleh budak lelaki di sebelah tingkap dalam adegan ini:',
    },
    targetArabicSentence: 'يَقْرَأُ الْوَلَدُ الْكِتَابَ بِجَانِبِ النَّافِذَةِ',
    targetTransliteration: 'Yaqra’ul-waladul-kitaba bijanibin-nafidzati',
    focusWordIds: ['w-world-yaqrau', 'w-world-bijanibi'],
    options: [
      {
        id: 'opt-1',
        arabic: 'يَكْتُبُ الْوَلَدُ الرِّسَالَةَ خَارِجَ الْبَيْتِ',
        transliteration: 'Yaktubul-waladur-risalata kharijal-bayti',
        meaning: {
          'id-ID': 'Anak itu sedang menulis surat di luar rumah.',
          'ms-MY': 'Budak itu sedang menulis surat di luar rumah.',
        },
        isCorrect: false,
        diagnosticFeedback: {
          'id-ID': 'Perhatikan kata kerjanya: يَكْتُبُ berarti menulis di luar rumah (خَارِجَ), padahal anak itu sedang membaca (يَقْرَأُ) di dalam ruangan di samping jendela.',
          'ms-MY': 'Perhatikan kata kerjanya: يَكْتُبُ bermaksud menulis di luar rumah (خَارِجَ), sedangkan budak itu sedang membaca (يَقْرَأُ) di dalam bilik di sebelah tingkap.',
        },
      },
      {
        id: 'opt-2',
        arabic: 'يَقْرَأُ الْوَلَدُ الْكِتَابَ بِجَانِبِ النَّافِذَةِ',
        transliteration: 'Yaqra’ul-waladul-kitaba bijanibin-nafidzati',
        meaning: {
          'id-ID': 'Anak laki-laki itu sedang membaca buku di samping jendela.',
          'ms-MY': 'Budak lelaki itu sedang membaca buku di sebelah tingkap.',
        },
        isCorrect: true,
        diagnosticFeedback: {
          'id-ID': 'Tepat! يَقْرَأُ (sedang membaca), الْكِتَابَ (buku), dan بِجَانِبِ النَّافِذَةِ (di samping jendela) menggambarkan adegan secara akurat.',
          'ms-MY': 'Tepat! يَقْرَأُ (sedang membaca), الْكِتَابَ (buku) dan بِجَانِبِ النَّافِذَةِ (di sebelah tingkap) menggambarkan adegan dengan tepat.',
        },
      },
      {
        id: 'opt-3',
        arabic: 'يَنَامُ الْوَلَدُ تَحْتَ الشَّجَرَةِ',
        transliteration: 'Yanamul-waladu tahtasy-syajarati',
        meaning: {
          'id-ID': 'Anak itu sedang tidur di bawah pohon.',
          'ms-MY': 'Budak itu sedang tidur di bawah pokok.',
        },
        isCorrect: false,
        diagnosticFeedback: {
          'id-ID': 'Kata kerja يَنَامُ berarti tidur. Di dalam gambar, anak tersebut terjaga dan sedang membaca buku (يَقْرَأُ الْكِتَابَ).',
          'ms-MY': 'Kata kerja يَنَامُ bermaksud tidur. Dalam gambar, budak tersebut sedang membuka dan membaca buku (يَقْرَأُ الْكِتَابَ).',
        },
      },
    ],
  },
  {
    stageNumber: 3,
    title: {
      'id-ID': 'Tahap 3 · Kata Ganti & Jumlah (Tunggal vs Dual/Mutsanna)',
      'ms-MY': 'Tahap 3 · Kata Ganti Nama & Bilangan (Mufrad vs Mutsanna)',
    },
    mode: 'select-matching-sentence',
    sceneVisualId: 'two-birds-above-tree',
    promptQuestion: {
      'id-ID': 'Lihat jumlah burung dan posisinya terhadap pohon pada adegan visual:',
      'ms-MY': 'Lihat bilangan burung dan kedudukannya terhadap pokok pada adegan visual:',
    },
    targetArabicSentence: 'عُصْفُورَانِ يَطِيرَانِ فَوْقَ الشَّجَرَةِ',
    targetTransliteration: '‘Ushfurani yathirani fawqasy-syajarati',
    focusWordIds: ['w-world-fawqa', 'w-world-tahta'],
    options: [
      {
        id: 'opt-1',
        arabic: 'عُصْفُورٌ وَاحِدٌ تَحْتَ الشَّجَرَةِ',
        transliteration: '‘Ushfurun wahidun tahtasy-syajarati',
        meaning: {
          'id-ID': 'Seekor burung berada di bawah pohon.',
          'ms-MY': 'Seekor burung berada di bawah pokok.',
        },
        isCorrect: false,
        diagnosticFeedback: {
          'id-ID': 'Di dalam adegan terdapat DUA ekor burung (عُصْفُورَانِ dengan akhiran dual ـَانِ) dan posisinya فَوْقَ (di atas) pohon.',
          'ms-MY': 'Dalam adegan terdapat DUA ekor burung (عُصْفُورَانِ dengan akhiran dual ـَانِ) dan kedudukannya فَوْقَ (di atas) pokok.',
        },
      },
      {
        id: 'opt-2',
        arabic: 'عُصْفُورَانِ يَطِيرَانِ فَوْقَ الشَّجَرَةِ',
        transliteration: '‘Ushfurani yathirani fawqasy-syajarati',
        meaning: {
          'id-ID': 'Dua ekor burung sedang terbang di atas pohon.',
          'ms-MY': 'Dua ekor burung sedang terbang di atas pokok.',
        },
        isCorrect: true,
        diagnosticFeedback: {
          'id-ID': 'Sempurna! Akhiran ـَانِ pada عُصْفُورَانِ dan يَطِيرَانِ menunjukkan subjek berjumlah dua (mutsanna) yang berada فَوْقَ الشَّجَرَةِ.',
          'ms-MY': 'Sempurna! Akhiran ـَانِ pada عُصْفُورَانِ dan يَطِيرَانِ menunjukkan subjek berjumlah dua (mutsanna) yang berada فَوْقَ الشَّجَرَةِ.',
        },
      },
      {
        id: 'opt-3',
        arabic: 'عُصْفُورَانِ دَاخِلَ الْبَيْتِ',
        transliteration: '‘Ushfurani dakhilal-bayti',
        meaning: {
          'id-ID': 'Dua ekor burung berada di dalam rumah.',
          'ms-MY': 'Dua ekor burung berada di dalam rumah.',
        },
        isCorrect: false,
        diagnosticFeedback: {
          'id-ID': 'Jumlahnya sudah benar dua (عُصْفُورَانِ), tetapi keduanya berada فَوْقَ الشَّجَرَةِ (di atas pohon), bukan دَاخِلَ الْبَيْتِ (di dalam rumah).',
          'ms-MY': 'Bilangannya sudah betul dua (عُصْفُورَانِ), tetapi kedua-duanya berada فَوْقَ الشَّجَرَةِ (di atas pokok), bukannya دَاخِلَ الْبَيْتِ (di dalam rumah).',
        },
      },
    ],
  },
  {
    stageNumber: 4,
    title: {
      'id-ID': 'Tahap 4 · Adegan Hubungan Majemuk (Multi-Relationship Scene)',
      'ms-MY': 'Tahap 4 · Adegan Hubungan Majmuk (Multi-Relationship Scene)',
    },
    mode: 'select-matching-sentence',
    sceneVisualId: 'cat-between-chairs',
    promptQuestion: {
      'id-ID': 'Amati posisi kucing putih, dua kursi kayu, dan lampu gantung di dalam ruangan:',
      'ms-MY': 'Perhatikan kedudukan kucing putih, dua kerusi kayu dan lampu gantung di dalam bilik:',
    },
    targetArabicSentence: 'الْقِطَّةُ بَيْنَ الْكُرْسِيَّيْنِ وَالْمِصْبَاحُ فَوْقَهَا',
    targetTransliteration: 'Al-qiththatu baynal-kursiyyayni wal-mishbahu fawqaha',
    focusWordIds: ['w-world-bayna', 'w-world-fawqa'],
    options: [
      {
        id: 'opt-1',
        arabic: 'الْقِطَّةُ بَيْنَ الْكُرْسِيَّيْنِ وَالْمِصْبَاحُ فَوْقَهَا',
        transliteration: 'Al-qiththatu baynal-kursiyyayni wal-mishbahu fawqaha',
        meaning: {
          'id-ID': 'Kucing itu berada di antara dua kursi dan lampu berada di atasnya.',
          'ms-MY': 'Kucing itu berada di antara dua kerusi dan lampu berada di atasnya.',
        },
        isCorrect: true,
        diagnosticFeedback: {
          'id-ID': 'Tepat! Anda memahami dua hubungan ruang sekaligus: بَيْنَ الْكُرْسِيَّيْنِ (di antara dua kursi) dan فَوْقَهَا (di atasnya).',
          'ms-MY': 'Tepat! Anda memahami dua hubungan ruang serentak: بَيْنَ الْكُرْسِيَّيْنِ (di antara dua kerusi) dan فَوْقَهَا (di atasnya).',
        },
      },
      {
        id: 'opt-2',
        arabic: 'الْقِطَّةُ فَوْقَ الْمِصْبَاحِ وَالْكُرْسِيُّ تَحْتَهَا',
        transliteration: 'Al-qiththatu fawqal-mishbahi wal-kursiyyu tahtaha',
        meaning: {
          'id-ID': 'Kucing itu di atas lampu dan kursi berada di bawahnya.',
          'ms-MY': 'Kucing itu di atas lampu dan kerusi berada di bawahnya.',
        },
        isCorrect: false,
        diagnosticFeedback: {
          'id-ID': 'Terbalik: bukan kucing yang berada di atas lampu (فَوْقَ الْمِصْبَاحِ), melainkan lampu yang berada di atas kucing.',
          'ms-MY': 'Terbalik: bukan kucing yang berada di atas lampu (فَوْقَ الْمِصْبَاحِ), sebaliknya lampu yang berada di atas kucing.',
        },
      },
      {
        id: 'opt-3',
        arabic: 'الْقِطَّةُ خَارِجَ الْغُرْفَةِ بَعِيدًا عَنِ الْكُرْسِيِّ',
        transliteration: 'Al-qiththatu kharijal-ghurfati ba‘idan ‘anil-kursiyyi',
        meaning: {
          'id-ID': 'Kucing itu di luar ruangan jauh dari kursi.',
          'ms-MY': 'Kucing itu di luar bilik jauh daripada kerusi.',
        },
        isCorrect: false,
        diagnosticFeedback: {
          'id-ID': 'Kucing berada di dalam ruangan tepat di antara dua kursi (بَيْنَ الْكُرْسِيَّيْنِ), bukan خَارِجَ (di luar).',
          'ms-MY': 'Kucing berada di dalam bilik tepat di antara dua kerusi (بَيْنَ الْكُرْسِيَّيْنِ), bukannya خَارِجَ (di luar).',
        },
      },
    ],
  },
  {
    stageNumber: 5,
    title: {
      'id-ID': 'Tahap 5 · Konstruksi Adegan Interaktif (Letakkan Objek Sesuai Kalimat)',
      'ms-MY': 'Tahap 5 · Pembinaan Adegan Interaktif (Letakkan Objek Mengikut Ayat)',
    },
    mode: 'place-object-in-scene',
    sceneVisualId: 'interactive-room-placement',
    promptQuestion: {
      'id-ID': 'Klik atau pilih zona di dalam adegan untuk meletakkan الْكِتَاب (Buku) agar sesuai dengan instruksi kalimat Arab berikut:',
      'ms-MY': 'Klik atau pilih zon di dalam adegan untuk meletakkan الْكِتَاب (Buku) supaya bertepatan dengan arahan ayat Arab berikut:',
    },
    targetArabicSentence: 'ضَعِ الْكِتَابَ تَحْتَ الطَّاوِلَةِ بِجَانِبِ الصُّنْدُوقِ',
    targetTransliteration: 'Dha‘il-kitaba tahtath-thawilati bijanibish-shunduqi',
    focusWordIds: ['w-world-tahta', 'w-world-bijanibi', 'w-world-fawqa', 'w-world-dakhila'],
    options: [],
    placementZones: [
      {
        zoneId: 'fawqa-table',
        arabicZoneLabel: 'فَوْقَ الطَّاوِلَةِ',
        label: { 'id-ID': 'Di atas meja (فَوْقَ)', 'ms-MY': 'Di atas meja (فَوْقَ)' },
        isCorrectZone: false,
      },
      {
        zoneId: 'tahta-table',
        arabicZoneLabel: 'تَحْتَ الطَّاوِلَةِ',
        label: { 'id-ID': 'Di bawah meja samping kotak (تَحْتَ)', 'ms-MY': 'Di bawah meja sebelah kotak (تَحْتَ)' },
        isCorrectZone: true,
      },
      {
        zoneId: 'bijanibi-chair',
        arabicZoneLabel: 'فَوْقَ الْكُرْسِيِّ',
        label: { 'id-ID': 'Di atas kursi (فَوْقَ الْكُرْسِيِّ)', 'ms-MY': 'Di atas kerusi (فَوْقَ الْكُرْسِيِّ)' },
        isCorrectZone: false,
      },
      {
        zoneId: 'dakhila-box',
        arabicZoneLabel: 'دَاخِلَ الصُّنْدُوقِ',
        label: { 'id-ID': 'Di dalam kotak (دَاخِلَ)', 'ms-MY': 'Di dalam kotak (دَاخِلَ)' },
        isCorrectZone: false,
      },
    ],
  },
];

// ============================================================================
// GAME 3: THE MARKET — "MARKET MISSIONS" (6 STAGES)
// ============================================================================
export interface MarketProductItem {
  id: string;
  productType: 'apple' | 'book' | 'bread' | 'dates' | 'cup';
  color: 'red' | 'green' | 'blue' | 'yellow' | 'brown';
  size: 'small' | 'large';
  arabicSingular: string;
  arabicDual: string;
  arabicPlural: string;
  transliteration: string;
  name: LocalizedText;
  colorLabel: LocalizedText;
}

export const MARKET_INVENTORY: MarketProductItem[] = [
  {
    id: 'item-apple-red',
    productType: 'apple',
    color: 'red',
    size: 'large',
    arabicSingular: 'تُفَّاحَةٌ حَمْرَاءُ',
    arabicDual: 'تُفَّاحَتَيْنِ حَمْرَاوَيْنِ',
    arabicPlural: 'تُفَّاحَاتٌ حُمْرٌ',
    transliteration: 'Tuffahatun Hamra’u',
    name: { 'id-ID': 'Apel Merah', 'ms-MY': 'Epal Merah' },
    colorLabel: { 'id-ID': 'Merah (حَمْرَاء)', 'ms-MY': 'Merah (حَمْرَاء)' },
  },
  {
    id: 'item-apple-green',
    productType: 'apple',
    color: 'green',
    size: 'small',
    arabicSingular: 'تُفَّاحَةٌ خَضْرَاءُ',
    arabicDual: 'تُفَّاحَتَيْنِ خَضْرَاوَيْنِ',
    arabicPlural: 'تُفَّاحَاتٌ خُضْرٌ',
    transliteration: 'Tuffahatun Khadhra’u',
    name: { 'id-ID': 'Apel Hijau', 'ms-MY': 'Epal Hijau' },
    colorLabel: { 'id-ID': 'Hijau (خَضْرَاء)', 'ms-MY': 'Hijau (خَضْرَاء)' },
  },
  {
    id: 'item-book-blue',
    productType: 'book',
    color: 'blue',
    size: 'large',
    arabicSingular: 'كِتَابٌ أَزْرَقُ كَبِيرٌ',
    arabicDual: 'كِتَابَيْنِ أَزْرَقَيْنِ',
    arabicPlural: 'كُتُبٌ زُرْقٌ',
    transliteration: 'Kitabun Azraqu Kabirun',
    name: { 'id-ID': 'Buku Biru Besar', 'ms-MY': 'Buku Biru Besar' },
    colorLabel: { 'id-ID': 'Biru Besar (أَزْرَق كَبِير)', 'ms-MY': 'Biru Besar (أَزْرَق كَبِير)' },
  },
  {
    id: 'item-book-yellow',
    productType: 'book',
    color: 'yellow',
    size: 'small',
    arabicSingular: 'كِتَابٌ أَصْفَرُ صَغِيرٌ',
    arabicDual: 'كِتَابَيْنِ أَصْفَرَيْنِ',
    arabicPlural: 'كُتُبٌ صُفْرٌ',
    transliteration: 'Kitabun Ashfaru Shaghirun',
    name: { 'id-ID': 'Buku Kuning Kecil', 'ms-MY': 'Buku Kuning Kecil' },
    colorLabel: { 'id-ID': 'Kuning Kecil (أَصْفَر صَغِير)', 'ms-MY': 'Kuning Kecil (أَصْفَر صَغِير)' },
  },
  {
    id: 'item-bread-brown',
    productType: 'bread',
    color: 'brown',
    size: 'large',
    arabicSingular: 'خُبْزٌ طَازَجٌ',
    arabicDual: 'رَغِيفَيْنِ مِنَ الْخُبْزِ',
    arabicPlural: 'ثَلَاثَةُ أَرْغِفَةٍ مِنَ الْخُبْزِ',
    transliteration: 'Khubzun Thazajun',
    name: { 'id-ID': 'Roti Hangat', 'ms-MY': 'Roti Segar' },
    colorLabel: { 'id-ID': 'Segar (طَازَج)', 'ms-MY': 'Segar (طَازَج)' },
  },
  {
    id: 'item-dates-brown',
    productType: 'dates',
    color: 'brown',
    size: 'small',
    arabicSingular: 'عُلْبَةُ تَمْرٍ',
    arabicDual: 'عُلْبَتَيْنِ مِنَ التَّمْرِ',
    arabicPlural: 'ثَلَاثُ عُلَبٍ مِنَ التَّمْرِ',
    transliteration: '‘Ulbatu Tamrin',
    name: { 'id-ID': 'Kotak Kurma', 'ms-MY': 'Kotak Kurma' },
    colorLabel: { 'id-ID': 'Manis (حُلْو)', 'ms-MY': 'Manis (حُلْو)' },
  },
];

export interface MarketMissionStage {
  stageNumber: number;
  title: LocalizedText;
  customerName: LocalizedText;
  arabicRequest: string;
  transliterationRequest: string;
  grammarHint: LocalizedText;
  expectedBasket: Record<string, number>; // itemId -> count
  focusWordIds: string[];
}

export const MARKET_MISSIONS: MarketMissionStage[] = [
  {
    stageNumber: 1,
    title: {
      'id-ID': 'Tahap 1 · Mengenali Nama Barang (الْأَسْمَاء)',
      'ms-MY': 'Tahap 1 · Mengenali Nama Barang (الْأَسْمَاء)',
    },
    customerName: {
      'id-ID': 'Ustadz Mahmud (Pelanggan 1)',
      'ms-MY': 'Ustaz Mahmud (Pelanggan 1)',
    },
    arabicRequest: 'أُرِيدُ خُبْزًا طَازَجًا مِنْ فَضْلِكَ',
    transliterationRequest: 'Uridu khubzan thazajan min fadhlika',
    grammarHint: {
      'id-ID': 'خُبْزًا (Khubzan) berarti 1 Roti Hangat.',
      'ms-MY': 'خُبْزًا (Khubzan) bermaksud 1 Roti Segar.',
    },
    expectedBasket: { 'item-bread-brown': 1 },
    focusWordIds: ['w-world-tuffahatayn'],
  },
  {
    stageNumber: 2,
    title: {
      'id-ID': 'Tahap 2 · Barang & Warna (الْأَلْوَان)',
      'ms-MY': 'Tahap 2 · Barang & Warna (الْأَلْوَان)',
    },
    customerName: {
      'id-ID': 'Ibu Aminah (Pelanggan 2)',
      'ms-MY': 'Puan Aminah (Pelanggan 2)',
    },
    arabicRequest: 'أَعْطِنِي تُفَّاحَةً خَضْرَاءَ وَاحِدَةً',
    transliterationRequest: 'A‘thini tuffahatan khadhra’a wahidatan',
    grammarHint: {
      'id-ID': 'تُفَّاحَةً خَضْرَاءَ berarti 1 buah Apel Hijau (خَضْرَاء = hijau, bukan حَمْرَاء = merah).',
      'ms-MY': 'تُفَّاحَةً خَضْرَاءَ bermaksud 1 biji Epal Hijau (خَضْرَاء = hijau, bukannya حَمْرَاء = merah).',
    },
    expectedBasket: { 'item-apple-green': 1 },
    focusWordIds: ['w-world-tuffahatayn'],
  },
  {
    stageNumber: 3,
    title: {
      'id-ID': 'Tahap 3 · Jumlah & Bilangan (الْأَعْدَاد)',
      'ms-MY': 'Tahap 3 · Bilangan & Kuantiti (الْأَعْدَاد)',
    },
    customerName: {
      'id-ID': 'Bapak Tariq (Pelanggan 3)',
      'ms-MY': 'Encik Tariq (Pelanggan 3)',
    },
    arabicRequest: 'أُرِيدُ ثَلَاثَ عُلَبٍ مِنَ التَّمْرِ',
    transliterationRequest: 'Uridu tsalatsa ‘ulabin minat-tamri',
    grammarHint: {
      'id-ID': 'ثَلَاثَ (Tsalatsa) = 3, dan التَّمْرِ (At-Tamri) = Kurma. Masukkan tepat 3 Kotak Kurma.',
      'ms-MY': 'ثَلَاثَ (Tsalatsa) = 3, dan التَّمْرِ (At-Tamri) = Kurma. Masukkan tepat 3 Kotak Kurma.',
    },
    expectedBasket: { 'item-dates-brown': 3 },
    focusWordIds: ['w-world-tuffahatayn'],
  },
  {
    stageNumber: 4,
    title: {
      'id-ID': 'Tahap 4 · Sifat Ukuran & Warna (كَبِير / صَغِير)',
      'ms-MY': 'Tahap 4 · Sifat Saiz & Warna (كَبِير / صَغِير)',
    },
    customerName: {
      'id-ID': 'Fatimah (Pelajar Madrasah)',
      'ms-MY': 'Fatimah (Pelajar Madrasah)',
    },
    arabicRequest: 'أَحْتَاجُ إِلَى كِتَابٍ أَزْرَقَ كَبِيرٍ',
    transliterationRequest: 'Ahtaju ila kitabin azraqa kabirin',
    grammarHint: {
      'id-ID': 'كِتَابٍ أَزْرَقَ كَبِيرٍ = 1 Buku Biru Besar (perhatikan sifat أَزْرَق = biru dan كَبِير = besar).',
      'ms-MY': 'كِتَابٍ أَزْرَقَ كَبِيرٍ = 1 Buku Biru Besar (perhatikan sifat أَزْرَق = biru dan كَبِير = besar).',
    },
    expectedBasket: { 'item-book-blue': 1 },
    focusWordIds: ['w-world-kataba'],
  },
  {
    stageNumber: 5,
    title: {
      'id-ID': 'Tahap 5 · Pesanan Gabungan (وَ = Dan)',
      'ms-MY': 'Tahap 5 · Pesanan Gabungan (وَ = Dan)',
    },
    customerName: {
      'id-ID': 'Keluarga Hasan (Pelanggan 5)',
      'ms-MY': 'Keluarga Hasan (Pelanggan 5)',
    },
    arabicRequest: 'أَعْطِنِي خُبْزًا طَازَجًا وَكِتَابًا أَصْفَرَ صَغِيرًا',
    transliterationRequest: 'A‘thini khubzan thazajan wa kitaban ashfara shaghiran',
    grammarHint: {
      'id-ID': 'Gabungan dua barang: 1 Roti Hangat (خُبْزًا) DAN 1 Buku Kuning Kecil (كِتَابًا أَصْفَرَ صَغِيرًا).',
      'ms-MY': 'Gabungan dua barang: 1 Roti Segar (خُبْزًا) DAN 1 Buku Kuning Kecil (كِتَابًا أَصْفَرَ صَغِيرًا).',
    },
    expectedBasket: {
      'item-bread-brown': 1,
      'item-book-yellow': 1,
    },
    focusWordIds: ['w-world-kataba'],
  },
  {
    stageNumber: 6,
    title: {
      'id-ID': 'Tahap 6 · Kesesuaian Mutsanna (Dual) & Kata Sifat (ـَيْنِ)',
      'ms-MY': 'Tahap 6 · Kesesuaian Mutsanna (Dual) & Kata Sifat (ـَيْنِ)',
    },
    customerName: {
      'id-ID': 'Syekh Zayd (Ujian Akhir Pasar)',
      'ms-MY': 'Syeikh Zayd (Ujian Akhir Pasar)',
    },
    arabicRequest: 'أَعْطِنِي تُفَّاحَتَيْنِ حَمْرَاوَيْنِ مِنْ فَضْلِكَ',
    transliterationRequest: 'A‘thini tuffahatayni hamrawayni min fadhlika',
    grammarHint: {
      'id-ID': 'Akhiran ـَيْنِ (-ayni) pada تُفَّاحَتَيْنِ حَمْرَاوَيْنِ menunjukkan bentuk DUAL (Mutsanna) = tepat 2 buah Apel Merah!',
      'ms-MY': 'Akhiran ـَيْنِ (-ayni) pada تُفَّاحَتَيْنِ حَمْرَاوَيْنِ menunjukkan bentuk DUAL (Mutsanna) = tepat 2 biji Epal Merah!',
    },
    expectedBasket: {
      'item-apple-red': 2,
    },
    focusWordIds: ['w-world-tuffahatayn'],
  },
];

// ============================================================================
// GAME 4: THE SENTENCE BRIDGE (4 CHALLENGES)
// ============================================================================
export interface SentenceBridgeChallenge {
  id: string;
  levelNumber: number;
  title: LocalizedText;
  targetMeaning: LocalizedText;
  availableTiles: Array<{
    id: string;
    arabic: string;
    transliteration: string;
    roleHint: LocalizedText;
  }>;
  validOrders: string[][]; // arrays of tile IDs (supports both VSO and SVO when valid in Arabic)
  grammarExplanation: LocalizedText;
  focusWordIds: string[];
}

export const SENTENCE_BRIDGE_CHALLENGES: SentenceBridgeChallenge[] = [
  {
    id: 'bridge-1',
    levelNumber: 1,
    title: {
      'id-ID': 'Jembatan 1 · Kalimat Kerja & Benda (يَقْرَأُ الْوَلَدُ الْكِتَابَ)',
      'ms-MY': 'Jambatan 1 · Ayat Kerja & Nama (يَقْرَأُ الْوَلَدُ الْكِتَابَ)',
    },
    targetMeaning: {
      'id-ID': '"Anak laki-laki itu sedang membaca buku."',
      'ms-MY': '"Budak lelaki itu sedang membaca buku."',
    },
    availableTiles: [
      {
        id: 't-yaqrau',
        arabic: 'يَقْرَأُ',
        transliteration: 'Yaqra’u',
        roleHint: { 'id-ID': 'Kata Kerja (Fi’il)', 'ms-MY': 'Kata Kerja (Fi’il)' },
      },
      {
        id: 't-alwaladu',
        arabic: 'الْوَلَدُ',
        transliteration: 'Al-Waladu',
        roleHint: { 'id-ID': 'Pelaku / Subjek (Fa’il -u)', 'ms-MY': 'Pelaku / Subjek (Fa’il -u)' },
      },
      {
        id: 't-alkitaba',
        arabic: 'الْكِتَابَ',
        transliteration: 'Al-Kitaba',
        roleHint: { 'id-ID': 'Objek (Maf’ul Bih -a)', 'ms-MY': 'Objek (Maf’ul Bih -a)' },
      },
    ],
    validOrders: [
      ['t-yaqrau', 't-alwaladu', 't-alkitaba'], // VSO (Jumlah Fi'liyyah)
      ['t-alwaladu', 't-yaqrau', 't-alkitaba'], // SVO (Jumlah Ismiyyah)
    ],
    grammarExplanation: {
      'id-ID': 'Dalam bahasa Arab, baik urutan Jumlah Fi’liyyah (يَقْرَأُ الْوَلَدُ الْكِتَابَ) maupun Jumlah Ismiyyah (الْوَلَدُ يَقْرَأُ الْكِتَابَ) sama-sama sahih! Perhatikan harakat akhir: الْوَلَدُ (-u) adalah pelaku, dan الْكِتَابَ (-a) adalah objek.',
      'ms-MY': 'Dalam bahasa Arab, kedua-dua susunan Jumlah Fi’liyyah (يَقْرَأُ الْوَلَدُ الْكِتَابَ) dan Jumlah Ismiyyah (الْوَلَدُ يَقْرَأُ الْكِتَابَ) adalah sahih! Perhatikan baris akhir: الْوَلَدُ (-u) ialah pelaku, manakala الْكِتَابَ (-a) ialah objek.',
    },
    focusWordIds: ['w-world-yaqrau', 'w-world-kataba'],
  },
  {
    id: 'bridge-2',
    levelNumber: 2,
    title: {
      'id-ID': 'Jembatan 2 · Kalimat Posisi Ruang (الْكِتَابُ تَحْتَ الطَّاوِلَةِ)',
      'ms-MY': 'Jambatan 2 · Ayat Kedudukan Ruang (الْكِتَابُ تَحْتَ الطَّاوِلَةِ)',
    },
    targetMeaning: {
      'id-ID': '"Buku itu berada di bawah meja."',
      'ms-MY': '"Buku itu berada di bawah meja."',
    },
    availableTiles: [
      {
        id: 't-alkitabu',
        arabic: 'الْكِتَابُ',
        transliteration: 'Al-Kitabu',
        roleHint: { 'id-ID': 'Pokok Kalimat (Mubtada’ -u)', 'ms-MY': 'Subjek Ayat (Mubtada’ -u)' },
      },
      {
        id: 't-tahta',
        arabic: 'تَحْتَ',
        transliteration: 'Tahta',
        roleHint: { 'id-ID': 'Keterangan Tempat (Zharf)', 'ms-MY': 'Keterangan Tempat (Zharf)' },
      },
      {
        id: 't-aththawilati',
        arabic: 'الطَّاوِلَةِ',
        transliteration: 'Ath-Thawilati',
        roleHint: { 'id-ID': 'Sandaran Tempat (Majrur -i)', 'ms-MY': 'Sandaran Tempat (Majrur -i)' },
      },
    ],
    validOrders: [['t-alkitabu', 't-tahta', 't-aththawilati']],
    grammarExplanation: {
      'id-ID': 'Kalimat dimulai dengan Mubtada’ (الْكِتَابُ) diikuti keterangan tempat تَحْتَ الطَّاوِلَةِ (di bawah meja). Kata setelah تَحْتَ selalu berharakat akhir kasrah (-i).',
      'ms-MY': 'Ayat bermula dengan Mubtada’ (الْكِتَابُ) diikuti keterangan tempat تَحْتَ الطَّاوِلَةِ (di bawah meja). Perkataan selepas تَحْتَ sentiasa berbaris akhir kasrah (-i).',
    },
    focusWordIds: ['w-world-tahta'],
  },
  {
    id: 'bridge-3',
    levelNumber: 3,
    title: {
      'id-ID': 'Jembatan 3 · Instruksi Arah & Pintu Warna',
      'ms-MY': 'Jambatan 3 · Arahan Arah & Pintu Berwarna',
    },
    targetMeaning: {
      'id-ID': '"Beloklah ke kiri dan masuklah ke pintu biru."',
      'ms-MY': '"Beloklah ke kiri dan masuklah ke pintu biru."',
    },
    availableTiles: [
      {
        id: 't-inatif',
        arabic: 'اِنْعَطِفْ',
        transliteration: 'In‘athif',
        roleHint: { 'id-ID': 'Perintah: Beloklah', 'ms-MY': 'Perintah: Beloklah' },
      },
      {
        id: 't-yasaran',
        arabic: 'يَسَارًا',
        transliteration: 'Yasaran',
        roleHint: { 'id-ID': 'Arah: Ke kiri', 'ms-MY': 'Arah: Ke kiri' },
      },
      {
        id: 't-wadkhul',
        arabic: 'وَادْخُلِ',
        transliteration: 'Wadkhuli',
        roleHint: { 'id-ID': 'Perintah: Dan masuklah', 'ms-MY': 'Perintah: Dan masuklah' },
      },
      {
        id: 't-albabalazraqa',
        arabic: 'الْبَابَ الْأَزْرَقَ',
        transliteration: 'Al-Babal-Azraqa',
        roleHint: { 'id-ID': 'Objek + Sifat: Pintu biru', 'ms-MY': 'Objek + Sifat: Pintu biru' },
      },
    ],
    validOrders: [['t-inatif', 't-yasaran', 't-wadkhul', 't-albabalazraqa']],
    grammarExplanation: {
      'id-ID': 'Kata sifat warna (الْأَزْرَقَ) diletakkan setelah kata benda yang disifatinya (الْبَابَ) dan mengikuti awalan الـ serta harakat akhirnya.',
      'ms-MY': 'Kata sifat warna (الْأَزْرَقَ) diletakkan selepas kata nama yang disifatkannya (الْبَابَ) dan mengikut awalan الـ serta baris akhirnya.',
    },
    focusWordIds: ['w-world-inatif', 'w-world-yasar', 'w-world-dakhila'],
  },
  {
    id: 'bridge-4',
    levelNumber: 4,
    title: {
      'id-ID': 'Jembatan 4 · Kalimat Al-Qur’an (QS. Al-Fatihah 1:2)',
      'ms-MY': 'Jambatan 4 · Ayat al-Quran (QS. al-Fatihah 1:2)',
    },
    targetMeaning: {
      'id-ID': '"Segala puji bagi Allah, Tuhan semesta alam."',
      'ms-MY': '"Segala puji tertentu bagi Allah, Tuhan yang memelihara dan mentadbirkan sekalian alam."',
    },
    availableTiles: [
      {
        id: 't-alhamdu',
        arabic: 'ٱلْحَمْدُ',
        transliteration: 'Al-Hamdu',
        roleHint: { 'id-ID': 'Segala puji (Mubtada’)', 'ms-MY': 'Segala puji (Mubtada’)' },
      },
      {
        id: 't-lillahi',
        arabic: 'لِلَّهِ',
        transliteration: 'Lillahi',
        roleHint: { 'id-ID': 'Bagi Allah (Khabar)', 'ms-MY': 'Bagi Allah (Khabar)' },
      },
      {
        id: 't-rabbi',
        arabic: 'رَبِّ',
        transliteration: 'Rabbi',
        roleHint: { 'id-ID': 'Tuhan / Pemelihara', 'ms-MY': 'Tuhan / Pemelihara' },
      },
      {
        id: 't-alalamina',
        arabic: 'ٱلْعَـٰلَمِينَ',
        transliteration: 'Al-‘Alamina',
        roleHint: { 'id-ID': 'Semesta alam (Mudhaf Ilaih)', 'ms-MY': 'Sekalian alam (Mudhaf Ilaih)' },
      },
    ],
    validOrders: [['t-alhamdu', 't-lillahi', 't-rabbi', 't-alalamina']],
    grammarExplanation: {
      'id-ID': 'Susunan mulia QS. Al-Fatihah 1:2: ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ. Anda kini dapat mengenali hubungan Mubtada’, Khabar (لِلَّهِ), dan Idhafah (رَبِّ ٱلْعَـٰلَمِينَ).',
      'ms-MY': 'Susunan mulia QS. al-Fatihah 1:2: ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ. Anda kini dapat mengenali hubungan Mubtada’, Khabar (لِلَّهِ) dan Idhafah (رَبِّ ٱلْعَـٰلَمِينَ).',
    },
    focusWordIds: ['w-alhamdu', 'w-lillahi', 'w-rabbi', 'w-alalamina'],
  },
];

// ============================================================================
// GAME 5: THE LOST MESSAGE — BRANCHING NARRATIVE QUEST (4 CHAPTERS)
// ============================================================================
export interface LostMessageChapter {
  chapterNumber: number;
  locationName: LocalizedText;
  npcName: LocalizedText;
  arabicDialogue: string;
  transliterationDialogue: string;
  dialogueMeaning: LocalizedText;
  clueNote: LocalizedText;
  focusWordIds: string[];
  choices: Array<{
    id: string;
    arabicChoice: string;
    transliterationChoice: string;
    meaning: LocalizedText;
    isCorrect: boolean;
    consequenceStory: LocalizedText;
  }>;
}

export const LOST_MESSAGE_CHAPTERS: LostMessageChapter[] = [
  {
    chapterNumber: 1,
    locationName: {
      'id-ID': 'Bab 1 · Gerbang Kota & Surat Tanpa Alamat',
      'ms-MY': 'Bab 1 · Pintu Gerbang Bandar & Surat Tanpa Alamat',
    },
    npcName: {
      'id-ID': 'Penjaga Gerbang (حَارِسُ الْبَوَّابَةِ)',
      'ms-MY': 'Pengawal Gerbang (حَارِسُ الْبَوَّابَةِ)',
    },
    arabicDialogue: 'وَجَدْتُ هَٰذِهِ الرِّسَالَةَ أَمَامَ الْبَوَّابَةِ. مَكْتُوبٌ فِيهَا: سَلِّمِ الرِّسَالَةَ إِلَى الْكَاتِبِ فِي الْمَكْتَبَةِ بِجَانِبِ الْمَسْجِدِ.',
    transliterationDialogue:
      'Wajadtu hadzihir-risalata amamal-bawwabati. Maktubun fiha: Sallimir-risalata ilal-katibi fil-maktabati bijanibil-masjidi.',
    dialogueMeaning: {
      'id-ID': '"Aku menemukan surat ini di depan gerbang. Tertulis di dalamnya: Serahkan surat ini kepada penulis (الْكَاتِب) di perpustakaan (الْمَكْتَبَة) di samping masjid."',
      'ms-MY': '"Aku menemui surat ini di hadapan gerbang. Tertulis di dalamnya: Serahkan surat ini kepada penulis (الْكَاتِب) di perpustakaan (الْمَكْتَبَة) di sebelah masjid."',
    },
    clueNote: {
      'id-ID': 'Perhatikan kata مَكْتُوبٌ (tertulis), الْكَاتِبِ (penulis), dan الْمَكْتَبَةِ (perpustakaan)—ketiganya dari akar ك-ت-ب!',
      'ms-MY': 'Perhatikan perkataan مَكْتُوبٌ (tertulis), الْكَاتِبِ (penulis) dan الْمَكْتَبَةِ (perpustakaan)—ketiga-tiganya daripada akar ك-ت-ب!',
    },
    focusWordIds: ['w-world-amam', 'w-world-bijanibi', 'w-world-kataba'],
    choices: [
      {
        id: 'c1-a',
        arabicChoice: 'سَأَذْهَبُ إِلَى الْمَكْتَبَةِ بِجَانِبِ الْمَسْجِدِ',
        transliterationChoice: 'Sa-adzhabu ilal-maktabati bijanibil-masjidi',
        meaning: {
          'id-ID': 'Saya akan pergi ke perpustakaan di samping masjid.',
          'ms-MY': 'Saya akan pergi ke perpustakaan di sebelah masjid.',
        },
        isCorrect: true,
        consequenceStory: {
          'id-ID': 'Penjaga tersenyum dan menunjuk jalan lurus menuju masjid dan perpustakaan.',
          'ms-MY': 'Pengawal tersenyum dan menunjukkan jalan lurus menuju masjid dan perpustakaan.',
        },
      },
      {
        id: 'c1-b',
        arabicChoice: 'سَأَذْهَبُ إِلَى السُّوقِ الْبَعِيدِ خَارِجَ الْمَدِينَةِ',
        transliterationChoice: 'Sa-adzhabu ilas-suqil-ba‘idi kharijal-madinati',
        meaning: {
          'id-ID': 'Saya akan pergi ke pasar yang jauh di luar kota.',
          'ms-MY': 'Saya akan pergi ke pasar yang jauh di luar bandar.',
        },
        isCorrect: false,
        consequenceStory: {
          'id-ID': 'Anda berjalan ke luar kota (خَارِجَ الْمَدِينَةِ), namun teringat bahwa isi surat menyebutkan الْمَكْتَبَة بِجَانِبِ الْمَسْجِدِ (Perpustakaan di samping Masjid), bukan Pasar.',
          'ms-MY': 'Anda berjalan ke luar bandar (خَارِجَ الْمَدِينَةِ), namun teringat bahawa isi surat menyebut الْمَكْتَبَة بِجَانِبِ الْمَسْجِدِ (Perpustakaan di sebelah Masjid), bukannya Pasar.',
        },
      },
    ],
  },
  {
    chapterNumber: 2,
    locationName: {
      'id-ID': 'Bab 2 · Persimpangan Air Mancur',
      'ms-MY': 'Bab 2 · Persimpangan Air Pancut',
    },
    npcName: {
      'id-ID': 'Pedagang Buku (بَائِعُ الْكُتُبِ)',
      'ms-MY': 'Penjual Buku (بَائِعُ الْكُتُبِ)',
    },
    arabicDialogue: 'الْمَكْتَبَةُ قَرِيبَةٌ مِنْ هُنَا! تَقَدَّمْ إِلَى الْأَمَامِ، ثُمَّ اِنْعَطِفْ يَمِينًا خَلْفَ الْمَسْجِدِ.',
    transliterationDialogue:
      'Al-maktabatu qaribatun min huna! Taqaddam ilal-amami, tsumma in‘athif yaminan khalfal-masjidi.',
    dialogueMeaning: {
      'id-ID': '"Perpustakaan dekat dari sini! Majulah ke depan, kemudian beloklah ke kanan di belakang masjid."',
      'ms-MY': '"Perpustakaan dekat dari sini! Majulah ke hadapan, kemudian beloklah ke kanan di belakang masjid."',
    },
    clueNote: {
      'id-ID': 'Ikuti arah pedagang: تَقَدَّمْ (maju), اِنْعَطِفْ يَمِينًا (belok kanan), خَلْفَ الْمَسْجِدِ (di belakang masjid).',
      'ms-MY': 'Ikuti arah penjual: تَقَدَّمْ (maju), اِنْعَطِفْ يَمِينًا (belok kanan), خَلْفَ الْمَسْجِدِ (di belakang masjid).',
    },
    focusWordIds: ['w-world-qarib', 'w-world-taqaddam', 'w-world-inatif', 'w-world-yamin', 'w-world-khalf'],
    choices: [
      {
        id: 'c2-a',
        arabicChoice: 'أَتَقَدَّمُ ثُمَّ أَنْعَطِفُ يَسَارًا أَمَامَ السُّوقِ',
        transliterationChoice: 'Ataqaddamu tsumma an‘athifu yasaran amamas-suqi',
        meaning: {
          'id-ID': 'Saya maju lalu belok kiri di depan pasar.',
          'ms-MY': 'Saya maju lalu belok kiri di hadapan pasar.',
        },
        isCorrect: false,
        consequenceStory: {
          'id-ID': 'Anda berbelok ke kiri (يَسَارًا) dan justru tiba di keramaian pasar. Pedagang tadi mengatakan اِنْعَطِفْ يَمِينًا خَلْفَ الْمَسْجِدِ (belok kanan di belakang masjid).',
          'ms-MY': 'Anda membelok ke kiri (يَسَارًا) dan tiba di pasar. Penjual tadi menyebut اِنْعَطِفْ يَمِينًا خَلْفَ الْمَسْجِدِ (belok kanan di belakang masjid).',
        },
      },
      {
        id: 'c2-b',
        arabicChoice: 'أَتَقَدَّمُ ثُمَّ أَنْعَطِفُ يَمِينًا خَلْفَ الْمَسْجِدِ',
        transliterationChoice: 'Ataqaddamu tsumma an‘athifu yaminan khalfal-masjidi',
        meaning: {
          'id-ID': 'Saya maju lalu belok kanan di belakang masjid.',
          'ms-MY': 'Saya maju lalu belok kanan di belakang masjid.',
        },
        isCorrect: true,
        consequenceStory: {
          'id-ID': 'Tepat! Anda melangkah maju dan berbelok ke kanan di belakang masjid hingga melihat pintu perpustakaan.',
          'ms-MY': 'Tepat! Anda melangkah maju dan membelok ke kanan di belakang masjid sehingga melihat pintu perpustakaan.',
        },
      },
    ],
  },
  {
    chapterNumber: 3,
    locationName: {
      'id-ID': 'Bab 3 · Di Dalam Perpustakaan (دَاخِلَ الْمَكْتَبَةِ)',
      'ms-MY': 'Bab 3 · Di Dalam Perpustakaan (دَاخِلَ الْمَكْتَبَةِ)',
    },
    npcName: {
      'id-ID': 'Pustakawan (أَمِينُ الْمَكْتَبَةِ)',
      'ms-MY': 'Pustakawan (أَمِينُ الْمَكْتَبَةِ)',
    },
    arabicDialogue: 'أَهْلًا بِكَ دَاخِلَ الْمَكْتَبَةِ! الْكَاتِبُ يَجْلِسُ بَيْنَ النَّافِذَةِ وَالرَّفِّ الْكَبِيرِ، وَأَمَامَهُ كِتَابٌ أَزْرَقُ.',
    transliterationDialogue:
      'Ahlan bika dakhilal-maktabati! Al-katibu yajlisu baynan-nafidzati war-raffil-kabiri, wa amamahu kitabun azraqu.',
    dialogueMeaning: {
      'id-ID': '"Selamat datang di dalam perpustakaan! Sang penulis duduk di antara jendela dan rak besar, dan di depannya ada sebuah buku biru."',
      'ms-MY': '"Selamat datang di dalam perpustakaan! Penulis itu duduk di antara tingkap dan rak besar, dan di hadapannya ada sebuah buku biru."',
    },
    clueNote: {
      'id-ID': 'Ciri-ciri penerima surat: duduk بَيْنَ (di antara) jendela dan rak besar, serta أَمَامَهُ كِتَابٌ أَزْرَقُ (di depannya ada buku biru).',
      'ms-MY': 'Ciri-ciri penerima surat: duduk بَيْنَ (di antara) tingkap dan rak besar, serta أَمَامَهُ كِتَابٌ أَزْرَقُ (di hadapannya ada buku biru).',
    },
    focusWordIds: ['w-world-dakhila', 'w-world-bayna', 'w-world-amam'],
    choices: [
      {
        id: 'c3-a',
        arabicChoice: 'أُسَلِّمُ الرِّسَالَةَ لِلرَّجُلِ الَّذِي أَمَامَهُ كِتَابٌ أَزْرَقُ بَيْنَ النَّافِذَةِ وَالرَّفِّ',
        transliterationChoice:
          'Usallimur-risalata lir-rajulilladzi amamahu kitabun azraqu baynan-nafidzati war-raffi',
        meaning: {
          'id-ID': 'Menyerahkan surat kepada pria yang di depannya ada buku biru di antara jendela dan rak.',
          'ms-MY': 'Menyerahkan surat kepada lelaki yang di hadapannya ada buku biru di antara tingkap dan rak.',
        },
        isCorrect: true,
        consequenceStory: {
          'id-ID': 'Sang penulis menerima surat tersebut dengan gembira dan membukanya.',
          'ms-MY': 'Penulis itu menerima surat tersebut dengan gembira lalu membukanya.',
        },
      },
      {
        id: 'c3-b',
        arabicChoice: 'أَضَعُ الرِّسَالَةَ تَحْتَ الطَّاوِلَةِ خَارِجَ الْمَكْتَبَةِ',
        transliterationChoice: 'Adha‘ur-risalata tahtath-thawilati kharijal-maktabati',
        meaning: {
          'id-ID': 'Meletakkan surat di bawah meja di luar perpustakaan.',
          'ms-MY': 'Meletakkan surat di bawah meja di luar perpustakaan.',
        },
        isCorrect: false,
        consequenceStory: {
          'id-ID': 'Jika diletakkan تَحْتَ الطَّاوِلَةِ خَارِجَ الْمَكْتَبَةِ (di bawah meja di luar perpustakaan), surat itu akan hilang lagi! Mari serahkan langsung kepada الْكَاتِب.',
          'ms-MY': 'Jika diletakkan تَحْتَ الطَّاوِلَةِ خَارِجَ الْمَكْتَبَةِ (di bawah meja di luar perpustakaan), surat itu akan hilang semula! Mari serahkan terus kepada الْكَاتِب.',
        },
      },
    ],
  },
  {
    chapterNumber: 4,
    locationName: {
      'id-ID': 'Bab 4 · Isi Surat Sang Penulis (Hikmah Ilmu)',
      'ms-MY': 'Bab 4 · Isi Surat Penulis (Hikmah Ilmu)',
    },
    npcName: {
      'id-ID': 'Sang Penulis (الْكَاتِبُ الْحَكِيمُ)',
      'ms-MY': 'Penulis Bijaksana (الْكَاتِبُ الْحَكِيمُ)',
    },
    arabicDialogue: 'شُكْرًا لَكَ! كَتَبَ أُسْتَاذِي فِي هَٰذِهِ الرِّسَالَةِ آيَةً كَرِيمَةً: «وَقُل رَّبِّ زِدْنِي عِلْمًا». مَا مَعْنَى هَٰذَا الدُّعَاءِ؟',
    transliterationDialogue:
      'Syukran laka! Kataba ustadzi fi hadzihir-risalati ayatan karimatan: "Wa qul Rabbi zidni ‘ilman". Ma ma‘na hadzad-du‘a’i?',
    dialogueMeaning: {
      'id-ID': '"Terima kasih! Guruku menulis di dalam surat ini sebuah ayat mulia: «وَقُل رَّبِّ زِدْنِي عِلْمًا» (QS. Thaha 20:114). Apakah arti doa ini?"',
      'ms-MY': '"Terima kasih! Guruku menulis di dalam surat ini sepotong ayat mulia: «وَقُل رَّبِّ زِدْنِي عِلْمًا» (QS. Taha 20:114). Apakah maksud doa ini?"',
    },
    clueNote: {
      'id-ID': 'Perhatikan kata رَبِّ (Ya Tuhanku) dan عِلْمًا (ilmu pengetahuan, dari akar ع-ل-م).',
      'ms-MY': 'Perhatikan perkataan رَبِّ (Wahai Tuhanku) dan عِلْمًا (ilmu pengetahuan, daripada akar ع-ل-م).',
    },
    focusWordIds: ['w-world-kataba', 'w-rabbi'],
    choices: [
      {
        id: 'c4-a',
        arabicChoice: 'وَكَاتِبُ الرِّسَالَةِ يَسْأَلُ اللَّهَ الزِّيَادَةَ فِي الْعِلْمِ النَّافِعِ',
        transliterationChoice: 'Wa katibur-risalati yas’alullaha az-ziyadata fil-‘ilmin-nafi‘i',
        meaning: {
          'id-ID': '"Dan katakanlah: Ya Tuhanku, tambahkanlah kepadaku ilmu pengetahuan."',
          'ms-MY': '"Dan katakanlah: Wahai Tuhanku, tambahkanlah kepadaku ilmu pengetahuan."',
        },
        isCorrect: true,
        consequenceStory: {
          'id-ID': 'Misi selesai! Anda telah mengantarkan pesan yang hilang dan menghubungkan kosakata sehari-hari dengan doa di dalam Al-Qur’an (QS. Thaha 20:114).',
          'ms-MY': 'Misi selesai! Anda telah menghantarkan pesanan yang hilang dan menghubungkan kosa kata harian dengan doa di dalam al-Quran (QS. Taha 20:114).',
        },
      },
      {
        id: 'c4-b',
        arabicChoice: 'أَعْطِنِي تُفَّاحَتَيْنِ حَمْرَاوَيْنِ مِنَ السُّوقِ',
        transliterationChoice: 'A‘thini tuffahatayni hamrawayni minas-suqi',
        meaning: {
          'id-ID': '"Berikan kepadaku dua buah apel merah dari pasar."',
          'ms-MY': '"Berikan kepadaku dua biji epal merah dari pasar."',
        },
        isCorrect: false,
        consequenceStory: {
          'id-ID': 'Itu adalah kalimat pesanan di Pasar! Doa «وَقُل رَّبِّ زِدْنِي عِلْمًا» berarti memohon tambahan ilmu kepada Allah.',
          'ms-MY': 'Itu ialah ayat pesanan di Pasar! Doa «وَقُل رَّبِّ زِدْنِي عِلْمًا» bermaksud memohon tambahan ilmu kepada Allah.',
        },
      },
    ],
  },
];

// ============================================================================
// GAME 6: THE WORD DETECTIVE — ROOT & MORPHOLOGY CASES (4 CASES)
// ============================================================================
export interface WordDetectiveCase {
  caseNumber: number;
  rootArabic: string;
  rootLatin: string;
  coreMeaning: LocalizedText;
  focusWordIds: string[];
  derivatives: Array<{
    id: string;
    arabic: string;
    transliteration: string;
    patternLabel: LocalizedText;
    meaning: LocalizedText;
    contextExample: string;
  }>;
  questionPrompt: LocalizedText;
  targetDerivativeId: string;
}

export const WORD_DETECTIVE_CASES: WordDetectiveCase[] = [
  {
    caseNumber: 1,
    rootArabic: 'ك - ت - ب',
    rootLatin: 'k-t-b',
    coreMeaning: {
      'id-ID': 'Menulis, menghimpun, dan mencatat',
      'ms-MY': 'Menulis, menghimpunkan dan mencatat',
    },
    focusWordIds: ['w-world-kataba', 'w-alkitabu'],
    derivatives: [
      {
        id: 'd-kataba',
        arabic: 'كَتَبَ',
        transliteration: 'Kataba',
        patternLabel: {
          'id-ID': 'Fi’il Madhi (Kata Kerja Lampau · فَعَلَ)',
          'ms-MY': 'Fi’il Madhi (Kata Kerja Lampau · فَعَلَ)',
        },
        meaning: {
          'id-ID': 'Dia telah menulis / menetapkan',
          'ms-MY': 'Dia telah menulis / menetapkan',
        },
        contextExample: 'كَتَبَ عَلَىٰ نَفْسِهِ الرَّحْمَةَ (QS. 6:12)',
      },
      {
        id: 'd-kitab',
        arabic: 'كِتَابٌ',
        transliteration: 'Kitabun',
        patternLabel: {
          'id-ID': 'Isim (Kata Benda · فِعَالٌ)',
          'ms-MY': 'Isim (Kata Nama · فِعَالٌ)',
        },
        meaning: {
          'id-ID': 'Kitab / Buku bacaan',
          'ms-MY': 'Kitab / Buku bacaan',
        },
        contextExample: 'ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ فِيهِ (QS. 2:2)',
      },
      {
        id: 'd-katib',
        arabic: 'كَاتِبٌ',
        transliteration: 'Katibun',
        patternLabel: {
          'id-ID': 'Isim Fa’il (Pelaku / Orang yang menulis · فَاعِلٌ)',
          'ms-MY': 'Isim Fa’il (Pelaku / Orang yang menulis · فَاعِلٌ)',
        },
        meaning: {
          'id-ID': 'Penulis / Pencatat',
          'ms-MY': 'Penulis / Pencatat',
        },
        contextExample: 'وَلْيَكْتُب بَّيْنَكُمْ كَاتِبٌ بِالْعَدْلِ (QS. 2:282)',
      },
      {
        id: 'd-maktub',
        arabic: 'مَكْتُوبٌ',
        transliteration: 'Maktubun',
        patternLabel: {
          'id-ID': 'Isim Maf’ul (Objek yang ditulis · مَفْعُولٌ)',
          'ms-MY': 'Isim Maf’ul (Objek yang ditulis · مَفْعُولٌ)',
        },
        meaning: {
          'id-ID': 'Sesuatu yang tertulis / tercatat',
          'ms-MY': 'Sesuatu yang tertulis / tercatat',
        },
        contextExample: 'يَجِدُونَهُ مَكْتُوبًا عِندَهُمْ (QS. 7:157)',
      },
    ],
    questionPrompt: {
      'id-ID': 'Manakah bentuk turunan dari akar ك - ت - ب yang berpola فَاعِلٌ (Isim Fa’il) dan bermakna "Orang yang menulis / Penulis"?',
      'ms-MY': 'Manakah bentuk terbitan daripada akar ك - ت - ب yang berwazan فَاعِلٌ (Isim Fa’il) dan bermaksud "Orang yang menulis / Penulis"?',
    },
    targetDerivativeId: 'd-katib',
  },
  {
    caseNumber: 2,
    rootArabic: 'ر - ح - م',
    rootLatin: 'r-h-m',
    coreMeaning: {
      'id-ID': 'Kasih sayang, rahmat, dan kelembutan',
      'ms-MY': 'Kasih sayang, rahmat dan kelembutan',
    },
    focusWordIds: ['w-arrahmani', 'w-arrahimi'],
    derivatives: [
      {
        id: 'd-rahmah',
        arabic: 'رَحْمَةٌ',
        transliteration: 'Rahmatun',
        patternLabel: {
          'id-ID': 'Mashdar (Kata Benda Dasar)',
          'ms-MY': 'Masdar (Kata Nama Terbitan)',
        },
        meaning: {
          'id-ID': 'Rahmat / Kasih sayang',
          'ms-MY': 'Rahmat / Kasih sayang',
        },
        contextExample: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ (QS. 21:107)',
      },
      {
        id: 'd-arrahman',
        arabic: 'ٱلرَّحْمَـٰنِ',
        transliteration: 'Ar-Rahmani',
        patternLabel: {
          'id-ID': 'Shifah Polanya فَعْلَان (Keluasan menyeluruh)',
          'ms-MY': 'Sifah Wazannya فَعْلَان (Keluasan menyeluruh)',
        },
        meaning: {
          'id-ID': 'Yang Maha Pengasih (seluruh makhluk)',
          'ms-MY': 'Yang Maha Pemurah (seluruh makhluk)',
        },
        contextExample: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ (QS. 1:1)',
      },
      {
        id: 'd-arrahim',
        arabic: 'ٱلرَّحِيمِ',
        transliteration: 'Ar-Rahimi',
        patternLabel: {
          'id-ID': 'Shifah Polanya فَعِيل (Sifat tetap & berkesinambungan)',
          'ms-MY': 'Sifah Wazannya فَعِيل (Sifat kekal & berterusan)',
        },
        meaning: {
          'id-ID': 'Yang Maha Penyayang',
          'ms-MY': 'Yang Maha Mengasihani',
        },
        contextExample: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ (QS. 1:3)',
      },
      {
        id: 'd-irham',
        arabic: 'ٱرْحَمْ',
        transliteration: 'Irham',
        patternLabel: {
          'id-ID': 'Fi’il Amr (Kata Kerja Perintah / Doa)',
          'ms-MY': 'Fi’il Amr (Kata Kerja Perintah / Doa)',
        },
        meaning: {
          'id-ID': 'Sayangilah / Rahmatilah',
          'ms-MY': 'Kasihanilah / Rahmatilah',
        },
        contextExample: 'وَقُل رَّبِّ ٱرْحَمْهُمَا (QS. 17:24)',
      },
    ],
    questionPrompt: {
      'id-ID': 'Manakah bentuk dari akar ر - ح - م yang merupakan Kata Kerja Perintah/Doa (Fi’il Amr) yang berarti "Sayangilah / Rahmatilah"?',
      'ms-MY': 'Manakah bentuk daripada akar ر - ح - م yang merupakan Kata Kerja Perintah/Doa (Fi’il Amr) yang bermaksud "Kasihanilah / Rahmatilah"?',
    },
    targetDerivativeId: 'd-irham',
  },
  {
    caseNumber: 3,
    rootArabic: 'ع - ل - م',
    rootLatin: '‘-l-m',
    coreMeaning: {
      'id-ID': 'Ilmu, pengetahuan, dan tanda pengenal alam',
      'ms-MY': 'Ilmu, pengetahuan dan tanda pengenalan alam',
    },
    focusWordIds: ['w-alalamina'],
    derivatives: [
      {
        id: 'd-ilm',
        arabic: 'عِلْمٌ',
        transliteration: '‘Ilmun',
        patternLabel: {
          'id-ID': 'Mashdar (Kata Benda Dasar)',
          'ms-MY': 'Masdar (Kata Nama Asas)',
        },
        meaning: {
          'id-ID': 'Ilmu pengetahuan',
          'ms-MY': 'Ilmu pengetahuan',
        },
        contextExample: 'وَقُل رَّبِّ زِدْنِي عِلْمًا (QS. 20:114)',
      },
      {
        id: 'd-alim',
        arabic: 'عَلِيمٌ',
        transliteration: '‘Alimun',
        patternLabel: {
          'id-ID': 'Shifah Musyabbahah / Mubalaghah (فَعِيلٌ)',
          'ms-MY': 'Sifah Musyabbahah / Mubalaghah (فَعِيلٌ)',
        },
        meaning: {
          'id-ID': 'Maha Mengetahui',
          'ms-MY': 'Maha Mengetahui',
        },
        contextExample: 'وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ (QS. 2:29)',
      },
      {
        id: 'd-alamin',
        arabic: 'ٱلْعَـٰلَمِينَ',
        transliteration: 'Al-‘Alamina',
        patternLabel: {
          'id-ID': 'Jamak dari عَالَم (Seluruh makhluk penanda penciptaan)',
          'ms-MY': 'Jamak daripada عَالَم (Seluruh makhluk penanda penciptaan)',
        },
        meaning: {
          'id-ID': 'Semesta alam / Seluruh makhluk',
          'ms-MY': 'Sekalian alam / Seluruh makhluk',
        },
        contextExample: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ (QS. 1:2)',
      },
      {
        id: 'd-allama',
        arabic: 'عَلَّمَ',
        transliteration: '‘Allama',
        patternLabel: {
          'id-ID': 'Fi’il Madhi Wazan فَعَّلَ (Mengajarkan)',
          'ms-MY': 'Fi’il Madhi Wazan فَعَّلَ (Mengajarkan)',
        },
        meaning: {
          'id-ID': 'Dia telah mengajarkan',
          'ms-MY': 'Dia telah mengajarkan',
        },
        contextExample: 'عَلَّمَ ٱلْإِنسَـٰنَ مَا لَمْ يَعْلَمْ (QS. 96:5)',
      },
    ],
    questionPrompt: {
      'id-ID': 'Manakah kata dari akar ع - ل - م yang berpola kata kerja فَعَّلَ (tasydid pada huruf tengah) dan berarti "Dia telah mengajarkan"?',
      'ms-MY': 'Manakah perkataan daripada akar ع - ل - م yang berwazan kata kerja فَعَّلَ (sabdu pada huruf tengah) dan bermaksud "Dia telah mengajarkan"?',
    },
    targetDerivativeId: 'd-allama',
  },
  {
    caseNumber: 4,
    rootArabic: 'ع - ب - د',
    rootLatin: '‘-b-d',
    coreMeaning: {
      'id-ID': 'Pengabdian, ibadah, dan penghambaan',
      'ms-MY': 'Pengabdian, ibadah dan penghambaan',
    },
    focusWordIds: ['w-nabudu'],
    derivatives: [
      {
        id: 'd-nabudu',
        arabic: 'نَعْبُدُ',
        transliteration: 'Na‘budu',
        patternLabel: {
          'id-ID': 'Fi’il Mudhari’ (Awalan نَـ = Kami)',
          'ms-MY': 'Fi’il Mudhari’ (Awalan نَـ = Kami)',
        },
        meaning: {
          'id-ID': 'Kami beribadah / menyembah',
          'ms-MY': 'Kami beribadah / menyembah',
        },
        contextExample: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (QS. 1:5)',
      },
      {
        id: 'd-abdun',
        arabic: 'عَبْدٌ',
        transliteration: '‘Abdun',
        patternLabel: {
          'id-ID': 'Isim Mufrad (Kata Benda Tunggal)',
          'ms-MY': 'Isim Mufrad (Kata Nama Tunggal)',
        },
        meaning: {
          'id-ID': 'Hamba',
          'ms-MY': 'Hamba',
        },
        contextExample: 'سُبْحَـٰنَ ٱلَّذِىٓ أَسْرَىٰ بِعَبْدِهِۦ (QS. 17:1)',
      },
      {
        id: 'd-ibadi',
        arabic: 'عِبَادِي',
        transliteration: '‘Ibadi',
        patternLabel: {
          'id-ID': 'Jamak + Kata Ganti ـِي (Hamba-hamba-Ku)',
          'ms-MY': 'Jamak + Kata Ganti Nama ـِي (Hamba-hamba-Ku)',
        },
        meaning: {
          'id-ID': 'Hamba-hamba-Ku',
          'ms-MY': 'Hamba-hamba-Ku',
        },
        contextExample: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ (QS. 2:186)',
      },
      {
        id: 'd-abidun',
        arabic: 'عَـٰبِدُونَ',
        transliteration: '‘Abiduna',
        patternLabel: {
          'id-ID': 'Isim Fa’il Jamak Mudzakkar Salim (ـُونَ)',
          'ms-MY': 'Isim Fa’il Jamak Muzakkar Salim (ـُونَ)',
        },
        meaning: {
          'id-ID': 'Orang-orang yang menyembah',
          'ms-MY': 'Orang-orang yang menyembah',
        },
        contextExample: 'وَلَآ أَنتُمْ عَـٰبِدُونَ مَآ أَعْبُدُ (QS. 109:3)',
      },
    ],
    questionPrompt: {
      'id-ID': 'Manakah bentuk dari akar ع - ب - د yang diawali huruf نَـ ("Kami") dan kita ucapkan dalam setiap rakaat salat pada Surah Al-Fatihah?',
      'ms-MY': 'Manakah bentuk daripada akar ع - ب - د yang didahului huruf نَـ ("Kami") dan kita lafazkan dalam setiap rakaat solat pada Surah al-Fatihah?',
    },
    targetDerivativeId: 'd-nabudu',
  },
];

// ============================================================================
// GAME 7: THE QURANIC DISCOVERY ROOM (CALM, REVERENT EXPLORATION)
// ============================================================================
export interface QuranicDiscoveryPassage {
  id: string;
  verseRef: string;
  surahNumber: number;
  ayahNumber: number;
  arabicVerse: string;
  transliteration: string;
  verifiedTranslation: LocalizedText;
  translationSource: LocalizedText;
  sourceUrl: string;
  audioUrl: string;
  connectedLessonId: string;
  worldBridgeNote: LocalizedText;
  highlightedTokens: Array<{
    wordId: string;
    arabic: string;
    transliteration: string;
    meaning: LocalizedText;
    worldConnection: LocalizedText;
  }>;
  comprehensionCheck: {
    question: LocalizedText;
    options: LocalizedText[];
    correctIndex: number;
    explanation: LocalizedText;
  };
}

export const QURANIC_DISCOVERY_PASSAGES: QuranicDiscoveryPassage[] = [
  {
    id: 'qd-1',
    verseRef: 'QS. Al-Baqarah 2:2',
    surahNumber: 2,
    ayahNumber: 2,
    arabicVerse: 'ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
    transliteration: 'Dzalikal-kitabu la rayba fihi hudan lil-muttaqina',
    verifiedTranslation: {
      'id-ID': 'Kitab (Al-Qur’an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa.',
      'ms-MY': 'Kitab Al-Quran ini, tidak ada sebarang syak padanya (tentang datangnya dari Allah dan tentang sempurnanya); ia pula menjadi petunjuk bagi orang-orang yang (hendak) bertaqwa.',
    },
    translationSource: {
      'id-ID': 'Terjemahan Al-Qur’an Kementerian Agama RI (Edisi Penyempurnaan 2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman kepada Pengertian al-Quran (JAKIM Malaysia)',
    },
    sourceUrl: 'https://quran.com/2/2',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002002.mp3',
    connectedLessonId: 'lesson-ayah-3',
    worldBridgeNote: {
      'id-ID': 'Di Laboratorium Adegan, Pasar, dan Detektif Kata, Anda telah berinteraksi dengan kata الْكِتَاب (buku/kitab) dari akar ك-ت-ب. Di awal Surah Al-Baqarah, kata ٱلْكِتَـٰبُ merujuk pada Al-Qur’an yang mulia.',
      'ms-MY': 'Di Makmal Adegan, Pasar dan Detektif Perkataan, anda telah berinteraksi dengan perkataan الْكِتَاب (buku/kitab) daripada akar ك-ت-ب. Pada awal Surah al-Baqarah, perkataan ٱلْكِتَـٰبُ merujuk kepada al-Quran yang mulia.',
    },
    highlightedTokens: [
      {
        wordId: 'w-dzalika',
        arabic: 'ذَٰلِكَ',
        transliteration: 'Dzalika',
        meaning: { 'id-ID': 'Itu (Kata Tunjuk)', 'ms-MY': 'Itu (Kata Tunjuk)' },
        worldConnection: {
          'id-ID': 'Kata tunjuk (Isim Isyarah) untuk menunjuk sesuatu yang agung dan tinggi kedudukannya.',
          'ms-MY': 'Kata tunjuk (Isim Isyarah) untuk menunjuk sesuatu yang agung dan tinggi kedudukannya.',
        },
      },
      {
        wordId: 'w-alkitabu',
        arabic: 'ٱلْكِتَـٰبُ',
        transliteration: 'Al-Kitabu',
        meaning: { 'id-ID': 'Kitab (Al-Qur’an)', 'ms-MY': 'Kitab (al-Quran)' },
        worldConnection: {
          'id-ID': 'Satu keluarga akar ك-ت-ب dengan كَتَبَ (menulis), كَاتِب (penulis), dan مَكْتُوب (tertulis) yang Anda temukan di Dunia Makna.',
          'ms-MY': 'Satu keluarga akar ك-ت-ب dengan كَتَبَ (menulis), كَاتِب (penulis) dan مَكْتُوب (tertulis) yang anda temui di Dunia Makna.',
        },
      },
      {
        wordId: 'w-fihi',
        arabic: 'فِيهِ',
        transliteration: 'Fihi',
        meaning: { 'id-ID': 'Di dalamnya / Padanya', 'ms-MY': 'Di dalamnya / Padanya' },
        worldConnection: {
          'id-ID': 'Gabungan kata depan ruang فِي (di dalam) + kata ganti هِ (-nya).',
          'ms-MY': 'Gabungan kata sendi ruang فِي (di dalam) + kata ganti nama هِ (-nya).',
        },
      },
    ],
    comprehensionCheck: {
      question: {
        'id-ID': 'Apa fungsi gabungan kata فِيهِ pada ayat «ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ فِيهِ»?',
        'ms-MY': 'Apakah fungsi gabungan perkataan فِيهِ pada ayat «ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ فِيهِ»?',
      },
      options: [
        {
          'id-ID': 'Menyatakan "di dalamnya / padanya" (gabungan فِي + هِ yang kembali kepada Al-Kitab)',
          'ms-MY': 'Menyatakan "di dalamnya / padanya" (gabungan فِي + هِ yang merujuk kepada Al-Kitab)',
        },
        {
          'id-ID': 'Menyatakan perintah untuk berbelok ke kanan (يَمِينًا)',
          'ms-MY': 'Menyatakan perintah untuk membelok ke kanan (يَمِينًا)',
        },
        {
          'id-ID': 'Menunjukkan jumlah dua buah benda (mutsanna)',
          'ms-MY': 'Menunjukkan bilangan dua objek (mutsanna)',
        },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Benar! فِيهِ terdiri dari huruf jar فِي (di dalam) dan dhamir هِ (nya), menegaskan tidak ada keraguan sedikit pun di dalam Al-Kitab tersebut.',
        'ms-MY': 'Betul! فِيهِ terdiri daripada huruf jar فِي (di dalam) dan dhamir هِ (nya), menegaskan tiada sebarang keraguan di dalam Al-Kitab tersebut.',
      },
    },
  },
  {
    id: 'qd-2',
    verseRef: 'QS. Al-Fatihah 1:1–2',
    surahNumber: 1,
    ayahNumber: 2,
    arabicVerse: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
    transliteration: 'Al-hamdu lillahi Rabbil-‘alamina',
    verifiedTranslation: {
      'id-ID': 'Segala puji bagi Allah, Tuhan seluruh alam.',
      'ms-MY': 'Segala puji tertentu bagi Allah, Tuhan yang memelihara dan mentadbirkan sekalian alam.',
    },
    translationSource: {
      'id-ID': 'Terjemahan Al-Qur’an Kementerian Agama RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM Malaysia)',
    },
    sourceUrl: 'https://quran.com/1/2',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001002.mp3',
    connectedLessonId: 'lesson-ayah-2',
    worldBridgeNote: {
      'id-ID': 'Di Jembatan Kalimat dan Detektif Kata, Anda telah menyusun kalimat ini dan menelusuri akar kata ع-ل-م pada ٱلْعَـٰلَمِينَ.',
      'ms-MY': 'Di Jambatan Ayat dan Detektif Perkataan, anda telah menyusun ayat ini dan menerokai akar perkataan ع-ل-م pada ٱلْعَـٰلَمِينَ.',
    },
    highlightedTokens: [
      {
        wordId: 'w-alhamdu',
        arabic: 'ٱلْحَمْدُ',
        transliteration: 'Al-Hamdu',
        meaning: { 'id-ID': 'Segala puji', 'ms-MY': 'Segala puji' },
        worldConnection: {
          'id-ID': 'Pokok kalimat (Mubtada’) dengan harakat akhir dhammah (-u).',
          'ms-MY': 'Subjek ayat (Mubtada’) dengan baris akhir dhammah (-u).',
        },
      },
      {
        wordId: 'w-lillahi',
        arabic: 'لِلَّهِ',
        transliteration: 'Lillahi',
        meaning: { 'id-ID': 'Bagi Allah', 'ms-MY': 'Bagi Allah' },
        worldConnection: {
          'id-ID': 'Huruf jar لِ (bagi/milik) + Lafzhul Jalalah ٱللَّهِ.',
          'ms-MY': 'Huruf jar لِ (bagi/milik) + Lafzul Jalalah ٱللَّهِ.',
        },
      },
      {
        wordId: 'w-alalamina',
        arabic: 'ٱلْعَـٰلَمِينَ',
        transliteration: 'Al-‘Alamina',
        meaning: { 'id-ID': 'Seluruh alam', 'ms-MY': 'Sekalian alam' },
        worldConnection: {
          'id-ID': 'Berakar dari ع-ل-م (tanda pengenal/ilmu), karena alam semesta adalah tanda kekuasaan Penciptanya.',
          'ms-MY': 'Berakar daripada ع-ل-م (tanda pengenalan/ilmu), kerana alam semesta ialah tanda kekuasaan Penciptanya.',
        },
      },
    ],
    comprehensionCheck: {
      question: {
        'id-ID': 'Mengapa kata ٱلْعَـٰلَمِينَ (seluruh alam) memiliki akar kata yang sama (ع-ل-م) dengan kata عِلْمٌ (ilmu)?',
        'ms-MY': 'Mengapakah perkataan ٱلْعَـٰلَمِينَ (sekalian alam) berkongsi akar perkataan yang sama (ع-ل-م) dengan perkataan عِلْمٌ (ilmu)?',
      },
      options: [
        {
          'id-ID': 'Karena akar ع-ل-م bermakna "tanda pengenal"; seluruh alam menjadi tanda untuk mengenali Sang Pencipta',
          'ms-MY': 'Kerana akar ع-ل-م bermaksud "tanda pengenalan"; sekalian alam menjadi tanda untuk mengenali Penciptanya',
        },
        {
          'id-ID': 'Karena keduanya merupakan kata kerja perintah untuk berjalan',
          'ms-MY': 'Kerana kedua-duanya merupakan kata kerja perintah untuk berjalan',
        },
        {
          'id-ID': 'Hanya kebetulan kemiripan huruf tanpa hubungan makna',
          'ms-MY': 'Hanya kebetulan persamaan huruf tanpa kaitan makna',
        },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Tepat! Dalam leksikon bahasa Arab, عَالَم (alam) disebut demikian karena ia menjadi عَلاَمَة (tanda bukti) yang mengantarkan akal untuk mengetahui (عِلْم) keberadaan Penciptanya.',
        'ms-MY': 'Tepat! Dalam leksikon bahasa Arab, عَالَم (alam) dinamakan sedemikian kerana ia menjadi عَلاَمَة (tanda bukti) yang membawa akal untuk mengetahui (عِلْم) kewujudan Penciptanya.',
      },
    },
  },
  {
    id: 'qd-3',
    verseRef: 'QS. Al-Fatihah 1:5',
    surahNumber: 1,
    ayahNumber: 5,
    arabicVerse: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    transliteration: 'Iyyaka na‘budu wa iyyaka nasta‘inu',
    verifiedTranslation: {
      'id-ID': 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.',
      'ms-MY': 'Engkaulah sahaja (Ya Allah) Yang Kami sembah, dan kepada Engkaulah sahaja kami memohon pertolongan.',
    },
    translationSource: {
      'id-ID': 'Terjemahan Al-Qur’an Kementerian Agama RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM Malaysia)',
    },
    sourceUrl: 'https://quran.com/1/5',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001005.mp3',
    connectedLessonId: 'lesson-prayer-1',
    worldBridgeNote: {
      'id-ID': 'Di Jembatan Kalimat, Anda melihat bagaimana urutan kata dalam bahasa Arab membawa penekanan makna. Pada ayat ini, objek إِيَّاكَ (Hanya kepada Engkau) didahulukan sebelum kata kerja نَعْبُدُ untuk menegaskan pengkhususan ibadah semata-mata kepada Allah.',
      'ms-MY': 'Di Jambatan Ayat, anda melihat bagaimana susunan perkataan dalam bahasa Arab membawa penekanan makna. Pada ayat ini, objek إِيَّاكَ (Hanya kepada Engkau) didahulukan sebelum kata kerja نَعْبُدُ untuk menegaskan pengkhususan ibadah semata-mata kepada Allah.',
    },
    highlightedTokens: [
      {
        wordId: 'w-iyyaka',
        arabic: 'إِيَّاكَ',
        transliteration: 'Iyyaka',
        meaning: { 'id-ID': 'Hanya kepada Engkau', 'ms-MY': 'Hanya kepada Engkau' },
        worldConnection: {
          'id-ID': 'Objek (Maf’ul Bih) yang dikedepankan untuk makna pengkhususan (al-hashr).',
          'ms-MY': 'Objek (Maf’ul Bih) yang dikedepankan untuk makna pengkhususan (al-hasr).',
        },
      },
      {
        wordId: 'w-nabudu',
        arabic: 'نَعْبُدُ',
        transliteration: 'Na‘budu',
        meaning: { 'id-ID': 'Kami menyembah / beribadah', 'ms-MY': 'Kami menyembah / beribadah' },
        worldConnection: {
          'id-ID': 'Berakar dari ع-ب-د dengan awalan نَـ (kami) yang telah Anda selidiki di Detektif Kata.',
          'ms-MY': 'Berakar daripada ع-ب-د dengan awalan نَـ (kami) yang telah anda selidiki di Detektif Perkataan.',
        },
      },
    ],
    comprehensionCheck: {
      question: {
        'id-ID': 'Apa pengaruh didahulukannya kata إِيَّاكَ sebelum kata kerja نَعْبُدُ dalam struktur kalimat Arab?',
        'ms-MY': 'Apakah kesan didahulukan perkataan إِيَّاكَ sebelum kata kerja نَعْبُدُ dalam struktur ayat Arab?',
      },
      options: [
        {
          'id-ID': 'Memberikan makna pembatasan/pengkhususan: "Hanya kepada Engkau semata kami menyembah"',
          'ms-MY': 'Memberikan makna pengkhususan: "Hanya kepada Engkau sahaja kami menyembah"',
        },
        {
          'id-ID': 'Mengubah waktu kata kerja menjadi masa lampau',
          'ms-MY': 'Mengubah masa kata kerja menjadi masa lampau',
        },
        {
          'id-ID': 'Menunjukkan keterangan tempat di samping sesuatu',
          'ms-MY': 'Menunjukkan keterangan tempat di sebelah sesuatu',
        },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Tepat! Dalam ilmu balaghah dan nahwu, mendahulukan objek (إِيَّاكَ) atas kata kerjanya (نَعْبُدُ) menghasilkan makna ikhtishash/hashr ("Hanya kepada-Mu semata").',
        'ms-MY': 'Tepat! Dalam ilmu balaghah dan nahu, mendahulukan objek (إِيَّاكَ) ke atas kata kerjanya (نَعْبُدُ) menghasilkan makna ikhtisas/hasr ("Hanya kepada-Mu sahaja").',
      },
    },
  },
  {
    id: 'qd-4',
    verseRef: 'QS. Al-Baqarah 2:186',
    surahNumber: 2,
    ayahNumber: 186,
    arabicVerse: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ',
    transliteration: 'Wa idza sa’alaka ‘ibadi ‘anni fa-inni qaribun',
    verifiedTranslation: {
      'id-ID': 'Dan apabila hamba-hamba-Ku bertanya kepadamu (Muhammad) tentang Aku, maka sesungguhnya Aku dekat.',
      'ms-MY': 'Dan apabila hamba-hamba-Ku bertanya kepadamu mengenai Aku maka (beritahu kepada mereka): sesungguhnya Aku (Allah) sentiasa hampir (kepada mereka).',
    },
    translationSource: {
      'id-ID': 'Terjemahan Al-Qur’an Kementerian Agama RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM Malaysia)',
    },
    sourceUrl: 'https://quran.com/2/186',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002186.mp3',
    connectedLessonId: 'lesson-ayah-4',
    worldBridgeNote: {
      'id-ID': 'Di Penjelajah Jalan Level 5, Anda mempelajari kata قَرِيبٌ (dekat) sebagai lawan dari بَعِيدٌ (jauh). Di dalam QS. Al-Baqarah 2:186, kata قَرِيبٌ hadir dalam pesan yang sangat menyentuh hati: «فَإِنِّي قَرِيبٌ» ("Maka sesungguhnya Aku dekat").',
      'ms-MY': 'Di Penjelajah Jalan Tahap 5, anda mempelajari perkataan قَرِيبٌ (dekat) sebagai lawan kepada بَعِيدٌ (jauh). Di dalam QS. al-Baqarah 2:186, perkataan قَرِيبٌ hadir dalam mesej yang amat menyentuh hati: «فَإِنِّي قَرِيبٌ» ("Maka sesungguhnya Aku dekat/hampir").',
    },
    highlightedTokens: [
      {
        wordId: 'w-world-qarib',
        arabic: 'قَرِيبٌ',
        transliteration: 'Qaribun',
        meaning: { 'id-ID': 'Dekat', 'ms-MY': 'Dekat / Hampir' },
        worldConnection: {
          'id-ID': 'Kata sifat yang Anda latih untuk mengenali jarak yang dekat di Penjelajah Jalan.',
          'ms-MY': 'Kata sifat yang anda latih untuk mengenali jarak yang dekat di Penjelajah Jalan.',
        },
      },
      {
        wordId: 'w-nabudu',
        arabic: 'عِبَادِي',
        transliteration: '‘Ibadi',
        meaning: { 'id-ID': 'Hamba-hamba-Ku', 'ms-MY': 'Hamba-hamba-Ku' },
        worldConnection: {
          'id-ID': 'Bentuk jamak dari عَبْد (akar ع-ب-د) ditambah akhiran kepemilikan ـِي (-Ku).',
          'ms-MY': 'Bentuk jamak daripada عَبْد (akar ع-ب-د) ditambah akhiran pemilikan ـِي (-Ku).',
        },
      },
    ],
    comprehensionCheck: {
      question: {
        'id-ID': 'Apakah arti ungkapan «فَإِنِّي قَرِيبٌ» pada QS. Al-Baqarah 2:186 berdasarkan kosakata yang telah Anda pelajari?',
        'ms-MY': 'Apakah maksud ungkapan «فَإِنِّي قَرِيبٌ» pada QS. al-Baqarah 2:186 berdasarkan kosa kata yang telah anda pelajari?',
      },
      options: [
        {
          'id-ID': '"Maka sesungguhnya Aku dekat" (قَرِيبٌ = dekat)',
          'ms-MY': '"Maka sesungguhnya Aku dekat/hampir" (قَرِيبٌ = dekat)',
        },
        {
          'id-ID': '"Maka sesungguhnya perjalanan itu jauh" (بَعِيدٌ = jauh)',
          'ms-MY': '"Maka sesungguhnya perjalanan itu jauh" (بَعِيدٌ = jauh)',
        },
        {
          'id-ID': '"Berdirilah di antara dua pintu"',
          'ms-MY': '"Berdirilah di antara dua pintu"',
        },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Sangat tepat! Anda melihat langsung bagaimana kata قَرِيبٌ (dekat) yang dipelajari dalam konteks ruang mengantarkan Anda memahami salah satu ayat doa paling indah di dalam Al-Qur’an.',
        'ms-MY': 'Sangat tepat! Anda melihat secara langsung bagaimana perkataan قَرِيبٌ (dekat) yang dipelajari dalam konteks ruang membawa anda memahami salah satu ayat doa paling indah di dalam al-Quran.',
      },
    },
  },
];
