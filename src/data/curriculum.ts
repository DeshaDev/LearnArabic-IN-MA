import {
  CurriculumLevel,
  EditorialArticle,
  Lesson,
  WordToken,
} from '../types/learning';
import {
  EXTRA_WORDS,
  EXTRA_LESSONS,
  EXTRA_CURRICULUM_LEVELS,
} from './curriculumExpanded';

export const WORDS: WordToken[] = [
  ...EXTRA_WORDS,
  {
    id: 'w-bismi',
    arabic: 'بِسْمِ',
    transliteration: 'Bismi',
    contextualMeaning: {
      'id-ID': 'Dengan nama',
      'ms-MY': 'Dengan nama',
    },
    lexicalNote: {
      'id-ID':
        'Gabungan dari huruf jar بِ (dengan) dan kata benda اسْم (nama). Huruf alif washal pada kata اسْم tidak ditulis dalam rasm البسملة.',
      'ms-MY':
        'Gabungan huruf jar بِ (dengan) dan kata nama اسْم (nama). Huruf alif wasal pada perkataan اسْم digugurkan dalam penulisan basmalah.',
    },
    category: 'phrase',
    grammaticalRole: {
      'id-ID': 'Frasa Kata Depan (Jar wa Majrur)',
      'ms-MY': 'Frasa Kata Sendi (Jar wa Majrur)',
    },
    advancedGrammarNote: {
      'id-ID': 'Huruf الباء adalah harf jar, sedangkan اسمِ adalah isim majrur dengan tanda kasrah di akhirnya, sekaligus menjadi mudhaf (kata yang disandarkan).',
      'ms-MY': 'Huruf الباء ialah harf jar, manakala اسمِ ialah isim majrur dengan tanda kasrah di hujungnya, serta berfungsi sebagai mudhaf.',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Fatihah 1:1',
    sourceAttribution: {
      'id-ID': 'Terjemahan Kemenag RI 2019 & Kamus Kosakata Al-Qur’an',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM) & Leksikon Bahasa Arab al-Quran',
    },
    rootFamily: {
      rootArabic: 'س - م - و',
      rootLatin: 's-m-w',
      coreConcept: {
        'id-ID': 'Tanda pengenal, ketinggian, atau penyebutan identitas',
        'ms-MY': 'Tanda pengenalan, ketinggian atau sebutan identiti',
      },
      linguisticNote: {
        'id-ID': 'Ulama bahasa (Bashrah) menjelaskan bahwa kata اسْم berakar dari س-م-و yang bermakna mengangkat atau menampakkan sesuatu.',
        'ms-MY': 'Ulama bahasa (Basrah) menjelaskan bahawa perkataan اسْم berakar daripada س-م-و yang bermaksud mengangkat atau menzahirkan sesuatu.',
      },
      relatedForms: [
        {
          arabic: 'ٱسْمُ',
          transliteration: 'Ismu',
          meaning: { 'id-ID': 'Nama (tunggal)', 'ms-MY': 'Nama (mufrad)' },
          formType: { 'id-ID': 'Kata Benda (Isim)', 'ms-MY': 'Kata Nama (Isim)' },
          verseRef: 'QS. Al-A’la 87:1',
        },
        {
          arabic: 'أَسْمَآءَ',
          transliteration: 'Asmaa-a',
          meaning: { 'id-ID': 'Nama-nama (jamak)', 'ms-MY': 'Nama-nama (jamak)' },
          formType: { 'id-ID': 'Jamak Taksir', 'ms-MY': 'Jamak Taksir' },
          verseRef: 'QS. Al-Baqarah 2:31',
        },
      ],
    },
    audioFreqHz: [293.66, 329.63],
  },
  {
    id: 'w-allahi',
    arabic: 'ٱللَّهِ',
    transliteration: 'Allahi',
    contextualMeaning: {
      'id-ID': 'Allah',
      'ms-MY': 'Allah',
    },
    lexicalNote: {
      'id-ID':
        'Lafaz mulia (Lafzhul Jalalah), nama khusus bagi Tuhan Yang Maha Esa yang berhak disembah. Berakhiran kasrah (-i) karena bersandar pada kata بِسْمِ.',
      'ms-MY':
        'Lafaz mulia (Lafzul Jalalah), nama khas bagi Tuhan Yang Maha Esa yang berhak disembah. Berbaris kasrah (-i) kerana disandarkan kepada perkataan بِسْمِ.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Kata Nama Khusus (Isim ‘Alam / Mudhaf Ilaih)',
      'ms-MY': 'Kata Nama Khas (Isim ‘Alam / Mudhaf Ilaih)',
    },
    advancedGrammarNote: {
      'id-ID': 'Berkedudukan sebagai mudhaf ilaih (kata yang menjadi sandaran bagi اسْمِ), sehingga berharakat akhir kasrah (majrur).',
      'ms-MY': 'Berkedudukan sebagai mudhaf ilaih (perkataan yang menjadi sandaran bagi اسْمِ), maka berbaris akhir kasrah (majrur).',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Fatihah 1:1',
    sourceAttribution: {
      'id-ID': 'Tafsir Ringkas Kemenag RI',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM',
    },
    rootFamily: {
      rootArabic: 'أ - ل - ه',
      rootLatin: 'a-l-h',
      coreConcept: {
        'id-ID': 'Ketuhanan dan pengabdian ibadah',
        'ms-MY': 'Ketuhanan dan pengabdian ibadah',
      },
      linguisticNote: {
        'id-ID': 'Terkait dengan kata إِلَٰه (sembahan/Tuhan), yang menunjukkan Dzat yang disembah dengan penuh kecintaan dan pengagungan.',
        'ms-MY': 'Berkaitan dengan perkataan إِلَٰه (sembahan/Tuhan), yang merujuk kepada Zat yang disembah dengan penuh kecintaan dan pengagungan.',
      },
      relatedForms: [
        {
          arabic: 'إِلَـٰهٌ',
          transliteration: 'Ilahun',
          meaning: { 'id-ID': 'Tuhan / Sembahan', 'ms-MY': 'Tuhan / Sembahan' },
          formType: { 'id-ID': 'Kata Benda (Isim)', 'ms-MY': 'Kata Nama (Isim)' },
          verseRef: 'QS. Al-Baqarah 2:163',
        },
        {
          arabic: 'ٱللَّهُمَّ',
          transliteration: 'Allahumma',
          meaning: { 'id-ID': 'Ya Allah (seruan doa)', 'ms-MY': 'Ya Allah (seruan doa)' },
          formType: { 'id-ID': 'Bentuk Seruan (Nida’)', 'ms-MY': 'Bentuk Seruan (Nida’)' },
          verseRef: 'QS. Ali ‘Imran 3:26',
        },
      ],
    },
    audioFreqHz: [349.23, 392.0],
  },
  {
    id: 'w-arrahmani',
    arabic: 'ٱلرَّحْمَـٰنِ',
    transliteration: 'Ar-Rahmani',
    contextualMeaning: {
      'id-ID': 'Yang Maha Pengasih',
      'ms-MY': 'Yang Maha Pemurah',
    },
    lexicalNote: {
      'id-ID':
        'Menunjukkan keluasan kasih sayang Allah yang meliputi seluruh makhluk di dunia. Mengikuti pola kata فَعْلَان yang menandakan sifat yang sangat penuh dan luas.',
      'ms-MY':
        'Menunjukkan keluasan rahmat Allah yang merangkumi seluruh makhluk di dunia. Mengikut wazan فَعْلَان yang menandakan sifat rahmat yang amat luas.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Kata Sifat / Nama Indah (Isim Shifah / Na’at)',
      'ms-MY': 'Kata Sifat / Nama Indah (Isim Sifah / Na’at)',
    },
    advancedGrammarNote: {
      'id-ID': 'Na’at (sifat) bagi Lafzhul Jalalah ٱللَّهِ, sehingga mengikuti harakat kasrah (majrur). Diawali Alif-Lam Syamsiyah.',
      'ms-MY': 'Na’at (sifat) bagi Lafzul Jalalah ٱللَّهِ, justeru mengikut baris kasrah (majrur). Didahului oleh Alif-Lam Syamsiyyah.',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Fatihah 1:1',
    sourceAttribution: {
      'id-ID': 'Terjemahan & Tafsir Ringkas Kemenag RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM Malaysia)',
    },
    rootFamily: {
      rootArabic: 'ر - ح - م',
      rootLatin: 'r-h-m',
      coreConcept: {
        'id-ID': 'Kasih sayang, kelembutan, dan rahmat',
        'ms-MY': 'Kasih sayang, kelembutan dan rahmat',
      },
      linguisticNote: {
        'id-ID': 'Akar kata ر-ح-م melahirkan berbagai kata di Al-Qur’an yang seluruhnya berporos pada makna kasih sayang dan penjagaan.',
        'ms-MY': 'Akar perkataan ر-ح-م melahirkan pelbagai bentuk perkataan dalam al-Quran yang berpusat pada makna kasih sayang dan belas kasihan.',
      },
      relatedForms: [
        {
          arabic: 'رَحْمَةٌ',
          transliteration: 'Rahmatun',
          meaning: { 'id-ID': 'Rahmat / Kasih sayang', 'ms-MY': 'Rahmat / Kasih sayang' },
          formType: { 'id-ID': 'Kata Benda Dasar (Mashdar)', 'ms-MY': 'Kata Nama Terbitan (Masdar)' },
          verseRef: 'QS. Al-Anbiya 21:107',
        },
        {
          arabic: 'ٱلرَّحِيمِ',
          transliteration: 'Ar-Rahimi',
          meaning: { 'id-ID': 'Yang Maha Penyayang', 'ms-MY': 'Yang Maha Mengasihani' },
          formType: { 'id-ID': 'Pola Sifat Tetap (Fa’il)', 'ms-MY': 'Wazan Sifat Kekal (Fa’il)' },
          verseRef: 'QS. Al-Fatihah 1:1',
        },
        {
          arabic: 'ٱرْحَمْ',
          transliteration: 'Irham',
          meaning: { 'id-ID': 'Sayangilah / Rahmatilah', 'ms-MY': 'Kasihanilah / Rahmatilah' },
          formType: { 'id-ID': 'Kata Kerja Perintah (Fi’il Amr)', 'ms-MY': 'Kata Kerja Perintah (Fi’il Amr)' },
          verseRef: 'QS. Al-Isra 17:24',
        },
      ],
    },
    audioFreqHz: [392.0, 440.0],
  },
  {
    id: 'w-arrahimi',
    arabic: 'ٱلرَّحِيمِ',
    transliteration: 'Ar-Rahimi',
    contextualMeaning: {
      'id-ID': 'Yang Maha Penyayang',
      'ms-MY': 'Yang Maha Mengasihani',
    },
    lexicalNote: {
      'id-ID':
        'Menunjukkan kasih sayang Allah yang berkesinambungan dan tercurah khusus bagi orang-orang beriman di akhirat. Mengikuti pola فَعِيل.',
      'ms-MY':
        'Menunjukkan kasih sayang Allah yang berterusan dan dikurniakan khusus kepada orang-orang beriman di akhirat. Mengikut wazan فَعِيل.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Kata Sifat Kedua (Na’at)',
      'ms-MY': 'Kata Sifat Kedua (Na’at)',
    },
    advancedGrammarNote: {
      'id-ID': 'Sifat kedua yang mengikuti harakat kasrah. Pola فَعِيل menunjukkan sifat yang menetap dan terus-menerus.',
      'ms-MY': 'Sifat kedua yang mengikut baris kasrah. Wazan فَعِيل menunjukkan sifat yang kekal dan berterusan.',
    },
    stage: 1,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Fatihah 1:1',
    sourceAttribution: {
      'id-ID': 'Terjemahan Kemenag RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM)',
    },
    rootFamily: {
      rootArabic: 'ر - ح - م',
      rootLatin: 'r-h-m',
      coreConcept: {
        'id-ID': 'Kasih sayang yang menetap dan berkelanjutan',
        'ms-MY': 'Kasih sayang yang kekal dan berterusan',
      },
      linguisticNote: {
        'id-ID': 'Berakar sama dengan Ar-Rahman (ر-ح-م). Perbedaan pola kata memberi nuansa antara keluasan cakupan dan kesinambungan kasih sayang.',
        'ms-MY': 'Berakar sama dengan Ar-Rahman (ر-ح-م). Perbezaan wazan perkataan memberi nuansa antara keluasan rahmat dan kesinambungan kasih sayang.',
      },
      relatedForms: [
        {
          arabic: 'ٱلرَّحْمَـٰنِ',
          transliteration: 'Ar-Rahmani',
          meaning: { 'id-ID': 'Yang Maha Pengasih', 'ms-MY': 'Yang Maha Pemurah' },
          formType: { 'id-ID': 'Pola Fa’lan', 'ms-MY': 'Wazan Fa’lan' },
          verseRef: 'QS. Al-Fatihah 1:1',
        },
        {
          arabic: 'رُحَمَآءُ',
          transliteration: 'Ruhamaa-u',
          meaning: { 'id-ID': 'Saling berkasih sayang', 'ms-MY': 'Berkasih sayang sesama mereka' },
          formType: { 'id-ID': 'Jamak Sifat', 'ms-MY': 'Jamak Sifat' },
          verseRef: 'QS. Al-Fath 48:29',
        },
      ],
    },
    audioFreqHz: [440.0, 392.0],
  },
  {
    id: 'w-alhamdu',
    arabic: 'ٱلْحَمْدُ',
    transliteration: 'Al-hamdu',
    contextualMeaning: {
      'id-ID': 'Segala puji',
      'ms-MY': 'Segala puji',
    },
    lexicalNote: {
      'id-ID':
        'Pujian yang disertai rasa cinta dan pengagungan atas kebaikan serta kesempurnaan. Awalan الـ (Al) di sini bermakna mencakup seluruh jenis pujian.',
      'ms-MY':
        'Pujian yang disertai rasa cinta dan pengagungan terhadap kesempurnaan. Awalan الـ (Al) di sini membawa maksud merangkumi segala jenis pujian.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Pokok Kalimat (Mubtada’ / Kata Benda)',
      'ms-MY': 'Subjek Ayat (Mubtada’ / Kata Nama)',
    },
    advancedGrammarNote: {
      'id-ID': 'Mubtada’ (subjek awal kalimat nominal/jumlah ismiyyah) sehingga berharakat akhir dhammah (-u / marfu’).',
      'ms-MY': 'Mubtada’ (subjek permulaan ayat namaan/jumlah ismiyyah) justeru berbaris akhir dhammah (-u / marfu’).',
    },
    stage: 2,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Fatihah 1:2',
    sourceAttribution: {
      'id-ID': 'Terjemahan & Tafsir Ringkas Kemenag RI',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM',
    },
    rootFamily: {
      rootArabic: 'ح - م - د',
      rootLatin: 'h-m-d',
      coreConcept: {
        'id-ID': 'Pujian yang tulus dan syukur atas kemuliaan',
        'ms-MY': 'Pujian yang tulus dan penghargaan atas kemuliaan',
      },
      linguisticNote: {
        'id-ID': 'Akar kata ح-م-د digunakan untuk pujian atas sifat mulia maupun pemberian, serta menjadi akar kata dalam zikir salat (سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ).',
        'ms-MY': 'Akar perkataan ح-م-د digunakan untuk pujian atas sifat mulia serta kurniaan, dan hadir dalam bacaan iktidal solat (سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ).',
      },
      relatedForms: [
        {
          arabic: 'حَمِيدٌ',
          transliteration: 'Hamidun',
          meaning: { 'id-ID': 'Maha Terpuji', 'ms-MY': 'Maha Terpuji' },
          formType: { 'id-ID': 'Kata Sifat (Fa’il)', 'ms-MY': 'Kata Sifat (Fa’il)' },
          verseRef: 'QS. Hud 11:73',
        },
        {
          arabic: 'حَـٰمِدُونَ',
          transliteration: 'Hamiduna',
          meaning: { 'id-ID': 'Orang-orang yang memuji', 'ms-MY': 'Orang-orang yang memuji' },
          formType: { 'id-ID': 'Pelaku Jamak (Isim Fa’il)', 'ms-MY': 'Pelaku Jamak (Isim Fa’il)' },
          verseRef: 'QS. At-Taubah 9:112',
        },
      ],
    },
    audioFreqHz: [329.63, 349.23],
  },
  {
    id: 'w-lillahi',
    arabic: 'لِلَّهِ',
    transliteration: 'Lillahi',
    contextualMeaning: {
      'id-ID': 'Bagi Allah / Milik Allah',
      'ms-MY': 'Bagi Allah / Milik Allah',
    },
    lexicalNote: {
      'id-ID':
        'Gabungan huruf depan لِ (bagi / milik) dan ٱللَّهِ (Allah). Menunjukkan bahwa seluruh pujian adalah hak dan milik Allah semata.',
      'ms-MY':
        'Gabungan kata sendi لِ (bagi / milik) dan ٱللَّهِ (Allah). Menunjukkan bahawa segala pujian adalah hak dan milik Allah semata-mata.',
    },
    category: 'phrase',
    grammaticalRole: {
      'id-ID': 'Keterangan Predikat (Khabar Syibhul Jumlah)',
      'ms-MY': 'Predikat Ayat (Khabar Syibhul Jumlah)',
    },
    advancedGrammarNote: {
      'id-ID': 'Huruf اللام adalah harf jar yang bermakna kepemilikan (milkiyyah) dan pengkhususan (istihqaq), menjadi khabar bagi المبتدأ (ٱلْحَمْدُ).',
      'ms-MY': 'Huruf اللام ialah harf jar yang membawa makna pemilikan (milkiyyah) dan pengkhususan (istihqaq), berfungsi sebagai khabar bagi ٱلْحَمْدُ.',
    },
    stage: 2,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Fatihah 1:2',
    sourceAttribution: {
      'id-ID': 'Tafsir Al-Muyassar & Kemenag RI',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM & Al-Muyassar',
    },
    audioFreqHz: [392.0, 440.0],
  },
  {
    id: 'w-rabbi',
    arabic: 'رَبِّ',
    transliteration: 'Rabbi',
    contextualMeaning: {
      'id-ID': 'Tuhan Pemelihara',
      'ms-MY': 'Tuhan Yang Memelihara dan Mentadbirkan',
    },
    lexicalNote: {
      'id-ID':
        'Kata رَبّ dalam bahasa Arab mencakup makna Pencipta, Pemilik, Pemelihara, dan Pengatur yang menumbuhkan makhluk secara bertahap.',
      'ms-MY':
        'Perkataan رَبّ dalam bahasa Arab merangkumi makna Pencipta, Pemilik, Pemelihara dan Pentadbir yang menguruskan makhluk secara berperingkat.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Kata Benda Sandaran (Sifat / Mudhaf)',
      'ms-MY': 'Kata Nama Sandaran (Sifat / Mudhaf)',
    },
    advancedGrammarNote: {
      'id-ID': 'Majrur karena mengikuti ٱللَّهِ dan menjadi mudhaf bagi kata berikutnya (ٱلْعَـٰلَمِينَ).',
      'ms-MY': 'Majrur kerana mengikut ٱللَّهِ dan menjadi mudhaf bagi perkataan selepasnya (ٱلْعَـٰلَمِينَ).',
    },
    stage: 2,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Fatihah 1:2',
    sourceAttribution: {
      'id-ID': 'Tafsir Ringkas Kemenag RI',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM',
    },
    rootFamily: {
      rootArabic: 'ر - ب - ب',
      rootLatin: 'r-b-b',
      coreConcept: {
        'id-ID': 'Pemeliharaan, kepemilikan, dan penjagaan',
        'ms-MY': 'Pemeliharaan, pemilikan dan pentadbiran',
      },
      linguisticNote: {
        'id-ID': 'Banyak doa di dalam Al-Qur’an dimulai dengan seruan رَبَّنَا (Wahai Tuhan Pemelihara kami).',
        'ms-MY': 'Banyak doa di dalam al-Quran dimulakan dengan seruan رَبَّنَا (Wahai Tuhan Pemelihara kami).',
      },
      relatedForms: [
        {
          arabic: 'رَبَّنَا',
          transliteration: 'Rabbana',
          meaning: { 'id-ID': 'Ya Tuhan kami', 'ms-MY': 'Wahai Tuhan kami' },
          formType: { 'id-ID': 'Seruan + Kata Ganti Kami', 'ms-MY': 'Seruan + Kata Ganti Nama Kami' },
          verseRef: 'QS. Al-Baqarah 2:201',
        },
        {
          arabic: 'رَبُّكُمْ',
          transliteration: 'Rabbukum',
          meaning: { 'id-ID': 'Tuhan pemelihara kalian', 'ms-MY': 'Tuhan pemelihara kamu' },
          formType: { 'id-ID': 'Kata Benda + Kata Ganti Kalian', 'ms-MY': 'Kata Nama + Kata Ganti Nama Kamu' },
          verseRef: 'QS. Al-Baqarah 2:21',
        },
      ],
    },
    audioFreqHz: [349.23, 329.63],
  },
  {
    id: 'w-alamin',
    arabic: 'ٱلْعَـٰلَمِينَ',
    transliteration: 'Al-‘Alamina',
    contextualMeaning: {
      'id-ID': 'Seluruh alam',
      'ms-MY': 'Sekalian alam',
    },
    lexicalNote: {
      'id-ID':
        'Bentuk jamak dari عَالَم (alam), yaitu segala sesuatu selain Allah yang menjadi tanda (alamat) atas kekuasaan Penciptanya.',
      'ms-MY':
        'Bentuk jamak bagi عَالَم (alam), iaitu segala sesuatu selain Allah yang menjadi tanda bukti atas kekuasaan Penciptanya.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Pelengkap Sandaran (Mudhaf Ilaih)',
      'ms-MY': 'Pelengkap Sandaran (Mudhaf Ilaih)',
    },
    advancedGrammarNote: {
      'id-ID': 'Majrur dengan tanda huruf ياء (ya’) karena mengikuti pola jamak mudzakkar salim (mulhaq).',
      'ms-MY': 'Majrur dengan tanda huruf ياء (ya’) kerana mengikut pola jamak muzakkar salim (mulhaq).',
    },
    stage: 2,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Fatihah 1:2',
    sourceAttribution: {
      'id-ID': 'Tafsir Ringkas Kemenag RI',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM',
    },
    rootFamily: {
      rootArabic: 'ع - ل - م',
      rootLatin: 'a-l-m',
      coreConcept: {
        'id-ID': 'Pengetahuan, tanda bukti, dan pengenalan',
        'ms-MY': 'Pengetahuan, tanda bukti dan pengenalan',
      },
      linguisticNote: {
        'id-ID': 'Akar kata ع-ل-م menghubungkan konsep "alam" dengan "ilmu" dan "tanda", karena alam semesta adalah tanda untuk mengenal Pencipta.',
        'ms-MY': 'Akar perkataan ع-ل-م menghubungkan konsep "alam" dengan "ilmu" dan "tanda", kerana alam semesta menjadi tanda mengenal Pencipta.',
      },
      relatedForms: [
        {
          arabic: 'عِلْمٌ',
          transliteration: '‘Ilmun',
          meaning: { 'id-ID': 'Ilmu / Pengetahuan', 'ms-MY': 'Ilmu / Pengetahuan' },
          formType: { 'id-ID': 'Kata Benda (Isim)', 'ms-MY': 'Kata Nama (Isim)' },
          verseRef: 'QS. Taha 20:114',
        },
        {
          arabic: 'عَلِيمٌ',
          transliteration: '‘Alimun',
          meaning: { 'id-ID': 'Maha Mengetahui', 'ms-MY': 'Maha Mengetahui' },
          formType: { 'id-ID': 'Kata Sifat (Fa’il)', 'ms-MY': 'Kata Sifat (Fa’il)' },
          verseRef: 'QS. Al-Baqarah 2:32',
        },
      ],
    },
    audioFreqHz: [293.66, 261.63],
  },
  {
    id: 'w-iyyaka',
    arabic: 'إِيَّاكَ',
    transliteration: 'Iyyaka',
    contextualMeaning: {
      'id-ID': 'Hanya kepada Engkau',
      'ms-MY': 'Hanya kepada Engkau (Ya Allah)',
    },
    lexicalNote: {
      'id-ID':
        'Kata ganti objek (dhamir munfashil) yang diletakkan di awal kalimat untuk memberikan makna pengkhususan ("Hanya kepada-Mu, bukan kepada selain-Mu").',
      'ms-MY':
        'Kata ganti nama objek (dhamir munfasil) yang diletakkan di permulaan ayat bagi memberi maksud pengkhususan ("Hanya kepada-Mu semata-mata").',
    },
    category: 'harf',
    grammaticalRole: {
      'id-ID': 'Kata Ganti Objek yang Didahulukan (Maf’ul Bih Muqaddam)',
      'ms-MY': 'Kata Ganti Nama Objek yang Didahulukan (Maf’ul Bih Muqaddam)',
    },
    advancedGrammarNote: {
      'id-ID': 'Mendahulukan objek (إِيَّاكَ) sebelum kata kerja (نَعْبُدُ) dalam ilmu balaghah menghasilkan makna al-hashr (pembatasan/pengkhususan).',
      'ms-MY': 'Mendahulukan objek (إِيَّاكَ) sebelum kata kerja (نَعْبُدُ) dalam ilmu balaghah menghasilkan fungsi al-hasr (pengkhususan).',
    },
    stage: 3,
    pathwayId: 'prayer-comprehension',
    verseRef: 'QS. Al-Fatihah 1:5',
    sourceAttribution: {
      'id-ID': 'Tafsir Ringkas Kemenag RI & Al-Muyassar',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM & Al-Muyassar',
    },
    audioFreqHz: [329.63, 392.0],
  },
  {
    id: 'w-nabudu',
    arabic: 'نَعْبُدُ',
    transliteration: 'Na‘budu',
    contextualMeaning: {
      'id-ID': 'Kami menyembah / beribadah',
      'ms-MY': 'Kami menyembah / mengabdikan diri',
    },
    lexicalNote: {
      'id-ID':
        'Kata kerja masa kini/berkelanjutan (fi’il mudhari’). Huruf نَ (na-) di awal kata bermakna "kami", menunjukkan kebersamaan umat dalam beribadah.',
      'ms-MY':
        'Kata kerja masa kini/berterusan (fi’il mudhari’). Huruf نَ (na-) di awal perkataan bermaksud "kami", menunjukkan kebersamaan jemaah dalam beribadah.',
    },
    category: 'fiil',
    grammaticalRole: {
      'id-ID': 'Kata Kerja Masa Kini (Fi’il Mudhari’ — Kami)',
      'ms-MY': 'Kata Kerja Masa Kini (Fi’il Mudhari’ — Kami)',
    },
    advancedGrammarNote: {
      'id-ID': 'Fi’il mudhari’ marfu’ dengan dhammah, dan pelakunya (fa’il) adalah dhamir mustatir (kata ganti tersimpan) yang bermakna نَحْنُ (kami).',
      'ms-MY': 'Fi’il mudhari’ marfu’ dengan dhammah, dan pelakunya (fa’il) ialah dhamir mustatir yang membawa maksud نَحْنُ (kami).',
    },
    stage: 3,
    pathwayId: 'prayer-comprehension',
    verseRef: 'QS. Al-Fatihah 1:5',
    sourceAttribution: {
      'id-ID': 'Terjemahan Kemenag RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM)',
    },
    rootFamily: {
      rootArabic: 'ع - ب - د',
      rootLatin: 'a-b-d',
      coreConcept: {
        'id-ID': 'Ketaatan, kerendahan hati, dan pengabdian ibadah',
        'ms-MY': 'Ketaatan, kerendahan hati dan pengabdian ibadah',
      },
      linguisticNote: {
        'id-ID': 'Akar kata ع-ب-د melahirkan kata ibadah, ‘abd (hamba), dan ‘abid (orang yang beribadah).',
        'ms-MY': 'Akar perkataan ع-ب-د melahirkan perkataan ibadah, ‘abd (hamba) dan ‘abid (orang yang beribadah).',
      },
      relatedForms: [
        {
          arabic: 'عَبْدٌ',
          transliteration: '‘Abdun',
          meaning: { 'id-ID': 'Hamba', 'ms-MY': 'Hamba' },
          formType: { 'id-ID': 'Kata Benda (Isim)', 'ms-MY': 'Kata Nama (Isim)' },
          verseRef: 'QS. Al-Isra 17:1',
        },
        {
          arabic: 'ٱعْبُدُوا۟',
          transliteration: 'U‘budu',
          meaning: { 'id-ID': 'Sembahlah oleh kalian', 'ms-MY': 'Sembahlah oleh kamu' },
          formType: { 'id-ID': 'Kata Kerja Perintah (Fi’il Amr)', 'ms-MY': 'Kata Kerja Perintah (Fi’il Amr)' },
          verseRef: 'QS. Al-Baqarah 2:21',
        },
      ],
    },
    audioFreqHz: [392.0, 349.23],
  },
  {
    id: 'w-nastain',
    arabic: 'نَسْتَعِينُ',
    transliteration: 'Nasta‘inu',
    contextualMeaning: {
      'id-ID': 'Kami memohon pertolongan',
      'ms-MY': 'Kami memohon pertolongan',
    },
    lexicalNote: {
      'id-ID':
        'Tambahan huruf سْتَ (ista-) pada kata kerja bahasa Arab sering memberi makna "meminta atau memohon". Dari akar kata pertolongan (ع-و-ن) menjadi "kami memohon pertolongan".',
      'ms-MY':
        'Tambahan huruf سْتَ (ista-) pada kata kerja bahasa Arab lazimnya membawa maksud "meminta atau memohon". Daripada akar pertolongan (ع-و-ن) menjadi "kami memohon pertolongan".',
    },
    category: 'fiil',
    grammaticalRole: {
      'id-ID': 'Kata Kerja Permohonan (Fi’il Mudhari’ Wazan Istaf’ala)',
      'ms-MY': 'Kata Kerja Permohonan (Fi’il Mudhari’ Wazan Istaf’ala)',
    },
    advancedGrammarNote: {
      'id-ID': 'Bentuk mudhari’ dari اسْتَعَانَ (wazan اسْتَفْعَلَ) yang menunjukkan thalab (permintaan bantuan).',
      'ms-MY': 'Bentuk mudhari’ daripada اسْتَعَانَ (wazan اسْتَفْعَلَ) yang menunjukkan fungsi thalab (memohon pertolongan).',
    },
    stage: 3,
    pathwayId: 'prayer-comprehension',
    verseRef: 'QS. Al-Fatihah 1:5',
    sourceAttribution: {
      'id-ID': 'Terjemahan Kemenag RI & Modul Morfologi Al-Qur’an',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM & Modul Saraf al-Quran',
    },
    rootFamily: {
      rootArabic: 'ع - و - ن',
      rootLatin: 'a-w-n',
      coreConcept: {
        'id-ID': 'Bantuan, dukungan, dan pertolongan',
        'ms-MY': 'Bantuan, sokongan dan pertolongan',
      },
      linguisticNote: {
        'id-ID': 'Kata kerja yang diawali "ista-" seperti nasta’in dan nastaghfir memiliki pola makna memohon sesuatu kepada Allah.',
        'ms-MY': 'Kata kerja yang bermula dengan "ista-" seperti nasta’in dan nastaghfir mempunyai pola makna memohon sesuatu daripada Allah.',
      },
      relatedForms: [
        {
          arabic: 'ٱسْتَعِينُوا۟',
          transliteration: 'Ista‘inu',
          meaning: { 'id-ID': 'Mohonlah pertolongan kalian', 'ms-MY': 'Mohonlah pertolongan oleh kamu' },
          formType: { 'id-ID': 'Kata Kerja Perintah', 'ms-MY': 'Kata Kerja Perintah' },
          verseRef: 'QS. Al-Baqarah 2:45',
        },
        {
          arabic: 'تَعَاوَنُوا۟',
          transliteration: 'Ta‘awanu',
          meaning: { 'id-ID': 'Saling tolong-menolonglah kalian', 'ms-MY': 'Bertolong-tolonglah kamu' },
          formType: { 'id-ID': 'Kata Kerja Timbal Balik', 'ms-MY': 'Kata Kerja Salingan' },
          verseRef: 'QS. Al-Maidah 5:2',
        },
      ],
    },
    audioFreqHz: [440.0, 349.23],
  },
  {
    id: 'w-ihdina',
    arabic: 'ٱهْدِنَا',
    transliteration: 'Ihdina',
    contextualMeaning: {
      'id-ID': 'Tunjukilah kami / Bimbinglah kami',
      'ms-MY': 'Tunjukilah kami / Pimpinlah kami',
    },
    lexicalNote: {
      'id-ID':
        'Terdiri dari kata kerja permohonan ٱهْدِ (tunjukilah/bimbinglah) dan kata ganti نَا (kami). Dalam konteks doa kepada Allah, kata perintah bermakna permohonan yang rendah hati.',
      'ms-MY':
        'Terdiri daripada kata kerja permohonan ٱهْدِ (tunjukilah/pimpinlah) dan kata ganti nama نَا (kami). Dalam konteks berdoa kepada Allah, bentuk ini bermaksud permohonan.',
    },
    category: 'fiil',
    grammaticalRole: {
      'id-ID': 'Kata Kerja Doa + Objek Kami (Fi’il Du’a + Dhamir)',
      'ms-MY': 'Kata Kerja Doa + Objek Kami (Fi’il Du’a + Dhamir)',
    },
    advancedGrammarNote: {
      'id-ID': 'اهْدِ adalah fi’il amr untuk makna doa, sedangkan نَا adalah dhamir muttashil sebagai maf’ul bih pertama.',
      'ms-MY': 'اهْدِ ialah fi’il amr untuk tujuan doa, manakala نَا ialah dhamir muttasil sebagai maf’ul bih pertama.',
    },
    stage: 3,
    pathwayId: 'prayer-comprehension',
    verseRef: 'QS. Al-Fatihah 1:6',
    sourceAttribution: {
      'id-ID': 'Terjemahan & Tafsir Ringkas Kemenag RI',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM',
    },
    rootFamily: {
      rootArabic: 'ه - د - ي',
      rootLatin: 'h-d-y',
      coreConcept: {
        'id-ID': 'Petunjuk, bimbingan lembut menuju tujuan',
        'ms-MY': 'Petunjuk, bimbingan lembut menuju matlamat',
      },
      linguisticNote: {
        'id-ID': 'Dari akar ه-د-ي lahir kata هُدًى (petunjuk) di awal Surah Al-Baqarah dan الْمُهْتَدُونَ (orang yang mendapat petunjuk).',
        'ms-MY': 'Daripada akar ه-د-ي lahir perkataan هُدًى (petunjuk) pada awal Surah al-Baqarah dan الْمُهْتَدُونَ (orang yang mendapat petunjuk).',
      },
      relatedForms: [
        {
          arabic: 'هُدًى',
          transliteration: 'Hudan',
          meaning: { 'id-ID': 'Petunjuk', 'ms-MY': 'Petunjuk' },
          formType: { 'id-ID': 'Kata Benda (Isim)', 'ms-MY': 'Kata Nama (Isim)' },
          verseRef: 'QS. Al-Baqarah 2:2',
        },
      ],
    },
    audioFreqHz: [329.63, 293.66],
  },
  {
    id: 'w-dzalika',
    arabic: 'ذَٰلِكَ',
    transliteration: 'Dzalika',
    contextualMeaning: {
      'id-ID': 'Itu (menunjuk pada kemuliaan Al-Qur’an)',
      'ms-MY': 'Itu (merujuk kepada kemuliaan al-Quran)',
    },
    lexicalNote: {
      'id-ID':
        'Kata tunjuk jauh (isim isyarah) yang digunakan di awal Surah Al-Baqarah untuk menunjukkan tingginya kedudukan dan kesempurnaan Kitab Al-Qur’an.',
      'ms-MY':
        'Kata tunjuk jauh (isim isyarah) yang digunakan pada awal Surah al-Baqarah bagi menggambarkan ketinggian martabat dan kesempurnaan Kitab al-Quran.',
    },
    category: 'harf',
    grammaticalRole: {
      'id-ID': 'Kata Tunjuk (Isim Isyarah)',
      'ms-MY': 'Kata Tunjuk (Isim Isyarah)',
    },
    advancedGrammarNote: {
      'id-ID': 'Isim isyarah mabni dalam posisi rafa’ sebagai mubtada’.',
      'ms-MY': 'Isim isyarah mabni pada kedudukan rafa’ sebagai mubtada’.',
    },
    stage: 4,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Baqarah 2:2',
    sourceAttribution: {
      'id-ID': 'Tafsir Ringkas Kemenag RI',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman JAKIM',
    },
    audioFreqHz: [293.66, 349.23],
  },
  {
    id: 'w-alkitabu',
    arabic: 'ٱلْكِتَـٰبُ',
    transliteration: 'Al-Kitabu',
    contextualMeaning: {
      'id-ID': 'Kitab (Al-Qur’an) ini',
      'ms-MY': 'Kitab (al-Quran) itu',
    },
    lexicalNote: {
      'id-ID':
        'Berarti sesuatu yang tertulis dan dihimpun, merujuk pada Al-Qur’an yang terjaga tulisan dan bacaannya.',
      'ms-MY':
        'Bermaksud sesuatu yang tertulis dan dihimpunkan, merujuk kepada al-Quran yang terpelihara tulisan serta bacaannya.',
    },
    category: 'isim',
    grammaticalRole: {
      'id-ID': 'Kata Benda Penjelas (Badal)',
      'ms-MY': 'Kata Nama Penjelas (Badal)',
    },
    advancedGrammarNote: {
      'id-ID': 'Badal (kata pengganti/penjelas) bagi ذَٰلِكَ, sehingga berharakat dhammah (marfu’).',
      'ms-MY': 'Badal (perkataan penjelas) bagi ذَٰلِكَ, maka berbaris dhammah (marfu’).',
    },
    stage: 4,
    pathwayId: 'understand-quran',
    verseRef: 'QS. Al-Baqarah 2:2',
    sourceAttribution: {
      'id-ID': 'Terjemahan Kemenag RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM)',
    },
    rootFamily: {
      rootArabic: 'ك - ت - ب',
      rootLatin: 'k-t-b',
      coreConcept: {
        'id-ID': 'Menulis, menghimpun, dan menetapkan ketetapan',
        'ms-MY': 'Menulis, menghimpunkan dan menetapkan ketetapan',
      },
      linguisticNote: {
        'id-ID': 'Akar ك-ت-ب muncul dalam kata كِتَاب (Kitab) maupun كُتِبَ (diwajibkan/ditetapkan, seperti dalam ayat puasa QS. Al-Baqarah 2:183).',
        'ms-MY': 'Akar ك-ت-ب hadir dalam perkataan كِتَاب (Kitab) serta كُتِبَ (diwajibkan/ditetapkan, seperti dalam ayat puasa QS. al-Baqarah 2:183).',
      },
      relatedForms: [
        {
          arabic: 'كُتِبَ',
          transliteration: 'Kutiba',
          meaning: { 'id-ID': 'Telah diwajibkan / ditetapkan', 'ms-MY': 'Telah diwajibkan / ditetapkan' },
          formType: { 'id-ID': 'Kata Kerja Pasif (Fi’il Majhul)', 'ms-MY': 'Kata Kerja Pasif (Fi’il Majhul)' },
          verseRef: 'QS. Al-Baqarah 2:183',
        },
      ],
    },
    audioFreqHz: [349.23, 392.0],
  },
];

export const LESSONS: Lesson[] = [
  ...EXTRA_LESSONS,
  {
    id: 'lesson-ayah-1',
    pathwayId: 'understand-quran',
    level: 1,
    order: 1,
    title: {
      'id-ID': 'Basmalah: Kata Depan, Nama Mulia & Akar Kasih Sayang',
      'ms-MY': 'Basmalah: Kata Sendi, Nama Mulia & Akar Rahmat',
    },
    subtitle: {
      'id-ID': 'QS. Al-Fatihah 1:1 · Mengenali kata depan (بِ) dan keluarga akar kata ر-ح-م',
      'ms-MY': 'QS. al-Fatihah 1:1 · Mengenali kata sendi (بِ) dan keluarga akar perkataan ر-ح-م',
    },
    durationMinutes: 6,
    sourceType: 'quran',
    verseRef: 'QS. Al-Fatihah 1:1',
    editorialStatus: 'verified-source',
    arabicPhrase: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
    transliterationPhrase: 'Bismillahir-rahmanir-rahim',
    verifiedTranslation: {
      'id-ID': 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
      'ms-MY': 'Dengan nama Allah, Yang Maha Pemurah, lagi Maha Mengasihani.',
    },
    translationSource: {
      'id-ID': 'Terjemahan Al-Qur’an Kementerian Agama RI (Edisi Penyempurnaan 2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman kepada Pengertian al-Quran (JAKIM Malaysia)',
    },
    recall: {
      prompt: {
        'id-ID': 'Sebelum kita mulai: Ketika Anda membaca "Bismillah", huruf awal بِ (bi-) berfungsi untuk menyatakan...',
        'ms-MY': 'Sebelum kita bermula: Apabila anda membaca "Bismillah", huruf awal بِ (bi-) berfungsi untuk menyatakan...',
      },
      arabicPrompt: 'بِسْمِ',
      options: [
        {
          'id-ID': 'Dengan / bersama (menyertakan nama Allah di awal perbuatan)',
          'ms-MY': 'Dengan / bersama (menyertakan nama Allah pada permulaan amalan)',
        },
        {
          'id-ID': 'Dari dalam tempat tertentu',
          'ms-MY': 'Dari dalam sesuatu tempat',
        },
        {
          'id-ID': 'Kata tanya untuk menanyakan waktu',
          'ms-MY': 'Kata tanya untuk menanyakan masa',
        },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Tepat. Huruf بِ (bi-) adalah kata depan (harf jar) yang bermakna "dengan", digabung dengan kata اسْم (nama).',
        'ms-MY': 'Tepat sekali. Huruf بِ (bi-) ialah kata sendi (harf jar) yang bermaksud "dengan", digabungkan dengan perkataan اسْم (nama).',
      },
    },
    audioDurationSeconds: 5,
    audioReciter: 'Audio Panduan Pelafalan Terverifikasi (Murattal Standar)',
    audioLicense: 'Referensi Pelafalan Pendidikan Terbuka / Rasm Utsmani',
    wordIds: ['w-bismi', 'w-allahi', 'w-arrahmani', 'w-arrahimi'],
    structureSummary: {
      'id-ID':
        'Ayat ini tersusun dari satu frasa pembuka (بِسْمِ) yang disandarkan kepada nama ٱللَّهِ, lalu diikuti oleh dua sifat kemuliaan dari akar kata yang sama (ر-ح-م).',
      'ms-MY':
        'Ayat ini dibina daripada satu frasa pembuka (بِسْمِ) yang disandarkan kepada nama ٱللَّهِ, kemudian diikuti oleh dua sifat kemuliaan daripada akar perkataan yang sama (ر-ح-م).',
    },
    grammarConceptTitle: {
      'id-ID': 'Satu Gagasan Bahasa: Huruf Depan بِ (Bi-) & Perubahan Harakat Akhir (-i)',
      'ms-MY': 'Satu Konsep Bahasa: Kata Sendi بِ (Bi-) & Perubahan Baris Akhir (-i)',
    },
    grammarConceptBody: {
      'id-ID':
        'Dalam bahasa Arab, ketika sebuah kata didahului oleh kata depan seperti بِ (dengan), akhir kata tersebut berubah bunyinya menjadi kasrah (-i): بِسْمِ (bismi). Kata-kata yang mengikuti dan menjelaskan kata tersebut di dalam frasa ini juga berbunyi akhir -i: ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ.',
      'ms-MY':
        'Dalam bahasa Arab, apabila sesuatu perkataan didahului oleh kata sendi seperti بِ (dengan), baris akhir perkataan tersebut berubah menjadi kasrah (-i): بِسْمِ (bismi). Perkataan yang mengikut dan menerangkan frasa ini turut berbaris akhir -i: ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ.',
    },
    advancedGrammarBody: {
      'id-ID':
        'Catatan Nahwu Lanjutan: بِسْمِ adalah jar wa majrur yang berkaitan (muta’alliq) dengan kata kerja yang disimpan (mahdzuf), yakni "Aku memulai membaca dengan nama Allah". ٱللَّهِ adalah mudhaf ilaih majrur, sedangkan ٱلرَّحْمَـٰنِ dan ٱلرَّحِيمِ adalah na’at (sifat) yang mengikuti status majrur.',
      'ms-MY':
        'Nota Nahu Lanjutan: بِسْمِ ialah jar wa majrur yang berkaitan (muta’alliq) dengan kata kerja tersembunyi (mahzuf), iaitu "Aku memulakan bacaan dengan nama Allah". ٱللَّهِ ialah mudhaf ilaih majrur, manakala ٱلرَّحْمَـٰنِ dan ٱلرَّحِيمِ ialah na’at (sifat) yang mengikut keadaan majrur.',
    },
    structureSegments: [
      {
        wordId: 'w-bismi',
        arabic: 'بِسْمِ',
        roleLabel: { 'id-ID': 'Frasa Depan (Dengan nama)', 'ms-MY': 'Frasa Sendi (Dengan nama)' },
        category: 'phrase',
        functionExplanation: {
          'id-ID': 'Memulai perbuatan dengan menyertakan nama-Nya.',
          'ms-MY': 'Memulakan amalan dengan menyertakan nama-Nya.',
        },
      },
      {
        wordId: 'w-allahi',
        arabic: 'ٱللَّهِ',
        roleLabel: { 'id-ID': 'Nama Khusus (Sandaran)', 'ms-MY': 'Nama Khas (Sandaran)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Nama Tuhan Yang Maha Esa tempat kata "nama" disandarkan.',
          'ms-MY': 'Nama Tuhan Yang Maha Esa tempat perkataan "nama" disandarkan.',
        },
      },
      {
        wordId: 'w-arrahmani',
        arabic: 'ٱلرَّحْمَـٰنِ',
        roleLabel: { 'id-ID': 'Sifat 1 (Keluasan Rahmat)', 'ms-MY': 'Sifat 1 (Keluasan Rahmat)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Menjelaskan kasih sayang Allah yang meliputi seluruh makhluk.',
          'ms-MY': 'Menerangkan rahmat Allah yang merangkumi seluruh makhluk.',
        },
      },
      {
        wordId: 'w-arrahimi',
        arabic: 'ٱلرَّحِيمِ',
        roleLabel: { 'id-ID': 'Sifat 2 (Kasih Sayang Kekal)', 'ms-MY': 'Sifat 2 (Kasih Sayang Kekal)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Menjelaskan kasih sayang yang terus-menerus bagi orang beriman.',
          'ms-MY': 'Menerangkan kasih sayang yang berterusan bagi orang beriman.',
        },
      },
    ],
    tafsirContext: {
      'id-ID':
        'Memulai bacaan dan amal baik dengan Basmalah mengajarkan seorang Muslim untuk menyadari keterbatasannya dan memohon keberkahan kepada Allah yang rahmat-Nya meliputi segala sesuatu.',
      'ms-MY':
        'Memulakan bacaan dan amalan soleh dengan Basmalah mendidik seorang Muslim agar menyedari kebergantungannya kepada Allah yang rahmat-Nya meliputi segala sesuatu.',
    },
    tafsirSource: {
      'id-ID': 'Ringkasan merujuk pada Tafsir Ringkas Kementerian Agama RI (Jilid 1, QS. Al-Fatihah: 1).',
      'ms-MY': 'Ringkasan merujuk kepada Mukadimah Tafsir Pimpinan Ar-Rahman (JAKIM Malaysia, QS. al-Fatihah: 1).',
    },
    reflectionPrompt: {
      'id-ID':
        'Catatan Refleksi Pribadi (bukan tafsir): Kata mana dari ayat ini yang paling membantu Anda lebih khusyuk saat memulai membaca Al-Qur’an?',
      'ms-MY':
        'Nota Refleksi Peribadi (bukan tafsir): Perkataan manakah dalam ayat ini yang paling membantu anda lebih khusyuk ketika memulakan bacaan al-Quran?',
    },
    practice: {
      multipleChoice: {
        question: {
          'id-ID': 'Apa akar kata tiga huruf yang menjadi dasar dari kata ٱلرَّحْمَـٰنِ dan ٱلرَّحِيمِ?',
          'ms-MY': 'Apakah akar perkataan tiga huruf yang menjadi asas bagi perkataan ٱلرَّحْمَـٰنِ dan ٱلرَّحِيمِ?',
        },
        arabicFocus: 'ٱلرَّحْمَـٰنِ · ٱلرَّحِيمِ',
        options: [
          {
            'id-ID': 'ر - ح - م (Kasih sayang dan rahmat)',
            'ms-MY': 'ر - ح - م (Kasih sayang dan rahmat)',
          },
          {
            'id-ID': 'ح - م - د (Pujian dan syukur)',
            'ms-MY': 'ح - م - د (Pujian dan syukur)',
          },
          {
            'id-ID': 'ع - ل - م (Pengetahuan dan tanda)',
            'ms-MY': 'ع - ل - م (Pengetahuan dan tanda)',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Benar! Baik Ar-Rahman maupun Ar-Rahim berasal dari akar kata ر - ح - م (ra-ha-ma) yang bermakna kasih sayang.',
          'ms-MY': 'Betul! Kedua-dua Ar-Rahman dan Ar-Rahim berasal daripada akar perkataan ر - ح - م (ra-ha-ma) yang membawa maksud kasih sayang.',
        },
      },
      matching: {
        instruction: {
          'id-ID': 'Cocokkan setiap kata Arab berikut dengan makna kontekstualnya di dalam Basmalah:',
          'ms-MY': 'Padankan setiap perkataan Arab berikut dengan makna kontekstualnya di dalam Basmalah:',
        },
        pairs: [
          {
            id: 'w-bismi',
            arabic: 'بِسْمِ',
            transliteration: 'Bismi',
            meaning: { 'id-ID': 'Dengan nama', 'ms-MY': 'Dengan nama' },
          },
          {
            id: 'w-arrahmani',
            arabic: 'ٱلرَّحْمَـٰنِ',
            transliteration: 'Ar-Rahmani',
            meaning: { 'id-ID': 'Yang Maha Pengasih', 'ms-MY': 'Yang Maha Pemurah' },
          },
          {
            id: 'w-arrahimi',
            arabic: 'ٱلرَّحِيمِ',
            transliteration: 'Ar-Rahimi',
            meaning: { 'id-ID': 'Yang Maha Penyayang', 'ms-MY': 'Yang Maha Mengasihani' },
          },
        ],
      },
      roleIdentification: {
        question: {
          'id-ID': 'Mengapa kata ٱسْمِ di dalam بِسْمِ berakhiran harakat kasrah (-i)?',
          'ms-MY': 'Mengapakah perkataan ٱسْمِ di dalam بِسْمِ berbaris akhir kasrah (-i)?',
        },
        sentenceArabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
        targetWordArabic: 'بِسْمِ',
        options: [
          {
            'id-ID': 'Karena didahului oleh huruf depan (harf jar) بِ yang bermakna "dengan"',
            'ms-MY': 'Kerana didahului oleh kata sendi (harf jar) بِ yang bermaksud "dengan"',
          },
          {
            'id-ID': 'Karena kata tersebut adalah kata kerja masa lampau',
            'ms-MY': 'Kerana perkataan tersebut ialah kata kerja masa lampau',
          },
          {
            'id-ID': 'Karena menunjukkan bentuk jamak lebih dari dua',
            'ms-MY': 'Kerana menunjukkan bentuk jamak lebih daripada dua',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Tepat sekali. Huruf jar بِ membuat kata benda setelahnya berbunyi akhir kasrah (-i).',
          'ms-MY': 'Tepat sekali. Huruf jar بِ menjadikan kata nama selepasnya berbaris akhir kasrah (-i).',
        },
      },
    },
  },
  {
    id: 'lesson-ayah-2',
    pathwayId: 'understand-quran',
    level: 2,
    order: 2,
    title: {
      'id-ID': 'Pujian & Kepemilikan: Struktur Kalimat Nominal (Al-Fatihah 1:2)',
      'ms-MY': 'Pujian & Pemilikan: Binaan Ayat Namaan (al-Fatihah 1:2)',
    },
    subtitle: {
      'id-ID': 'QS. Al-Fatihah 1:2 · Memahami awalan الـ (Al) dan huruf kepemilikan لِ (Li-)',
      'ms-MY': 'QS. al-Fatihah 1:2 · Memahami awalan الـ (Al) dan kata sendi pemilikan لِ (Li-)',
    },
    durationMinutes: 7,
    prerequisiteLessonId: 'lesson-ayah-1',
    prerequisiteReason: {
      'id-ID': 'Memerlukan pemahaman dasar tentang kata depan (harf jar) dan perubahan harakat akhir dari Pelajaran 1.',
      'ms-MY': 'Memerlukan kefahaman asas tentang kata sendi (harf jar) dan perubahan baris akhir daripada Pelajaran 1.',
    },
    sourceType: 'quran',
    verseRef: 'QS. Al-Fatihah 1:2',
    editorialStatus: 'verified-source',
    arabicPhrase: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
    transliterationPhrase: 'Al-hamdu lillahi Rabbil-‘alamin',
    verifiedTranslation: {
      'id-ID': 'Segala puji bagi Allah, Tuhan seluruh alam.',
      'ms-MY': 'Segala puji tertentu bagi Allah, Tuhan yang memelihara dan mentadbirkan sekalian alam.',
    },
    translationSource: {
      'id-ID': 'Terjemahan Al-Qur’an Kementerian Agama RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM Malaysia)',
    },
    recall: {
      prompt: {
        'id-ID': 'Ingat kembali dari pelajaran sebelumnya: Manakah di antara kata berikut yang berasal dari akar kata ر - ح - م (kasih sayang)?',
        'ms-MY': 'Imbas kembali daripada pelajaran lepas: Antara perkataan berikut, yang manakah berasal daripada akar ر - ح - م (kasih sayang)?',
      },
      arabicPrompt: 'ر - ح - م',
      options: [
        {
          'id-ID': 'ٱلرَّحْمَـٰنِ (Yang Maha Pengasih)',
          'ms-MY': 'ٱلرَّحْمَـٰنِ (Yang Maha Pemurah)',
        },
        {
          'id-ID': 'بِسْمِ (Dengan nama)',
          'ms-MY': 'بِسْمِ (Dengan nama)',
        },
        {
          'id-ID': 'ٱلْعَـٰلَمِينَ (Seluruh alam)',
          'ms-MY': 'ٱلْعَـٰلَمِينَ (Sekalian alam)',
        },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Benar! ٱلرَّحْمَـٰنِ terbentuk dari tiga huruf akar ر - ح - م.',
        'ms-MY': 'Betul! ٱلرَّحْمَـٰنِ terbentuk daripada tiga huruf akar ر - ح - م.',
      },
    },
    audioDurationSeconds: 5,
    audioReciter: 'Audio Panduan Pelafalan Terverifikasi',
    audioLicense: 'Referensi Pelafalan Pendidikan Terbuka',
    wordIds: ['w-alhamdu', 'w-lillahi', 'w-rabbi', 'w-alamin'],
    structureSummary: {
      'id-ID':
        'Ini adalah kalimat nominal (dimulai dengan kata benda ٱلْحَمْدُ) yang menegaskan bahwa seluruh pujian adalah milik Allah (لِلَّهِ), Pemelihara seluruh alam (رَبِّ ٱلْعَـٰلَمِينَ).',
      'ms-MY':
        'Ini ialah ayat namaan (bermula dengan kata nama ٱلْحَمْدُ) yang menegaskan bahawa segala pujian adalah milik Allah (لِلَّهِ), Tuhan yang memelihara sekalian alam (رَبِّ ٱلْعَـٰلَمِينَ).',
    },
    grammarConceptTitle: {
      'id-ID': 'Satu Gagasan Bahasa: Huruf لِ (Bagi/Milik) & Pokok Kalimat Berakhiran -u',
      'ms-MY': 'Satu Konsep Bahasa: Huruf لِ (Bagi/Milik) & Subjek Ayat Berbaris Akhir -u',
    },
    grammarConceptBody: {
      'id-ID':
        'Kata benda yang menjadi pokok pembicaraan di awal kalimat berharakat dhammah (-u): ٱلْحَمْدُ (Al-hamdu = Segala puji). Sedangkan huruf لِ (li-) adalah saudara dari huruf بِ yang berarti "bagi/milik", dan mengubah harakat kata setelahnya menjadi kasrah (-i): لِلَّهِ (lillahi = bagi Allah).',
      'ms-MY':
        'Kata nama yang menjadi subjek utama pada permulaan ayat berbaris dhammah (-u): ٱلْحَمْدُ (Al-hamdu = Segala puji). Manakala huruf لِ (li-) ialah kata sendi yang bermaksud "bagi/milik", dan menjadikan baris akhir perkataan selepasnya kasrah (-i): لِلَّهِ (lillahi = bagi Allah).',
    },
    advancedGrammarBody: {
      'id-ID':
        'Catatan Nahwu Lanjutan: ٱلْحَمْدُ adalah mubtada’ marfu’, لِلَّهِ adalah jar wa majrur sebagai khabar. رَبِّ adalah na’at atau badal bagi Lafzhul Jalalah sekaligus mudhaf, dan ٱلْعَـٰلَمِينَ adalah mudhaf ilaih majrur dengan tanda huruf ya’.',
      'ms-MY':
        'Nota Nahu Lanjutan: ٱلْحَمْدُ ialah mubtada’ marfu’, لِلَّهِ ialah jar wa majrur sebagai khabar. رَبِّ ialah sifat atau badal bagi Lafzul Jalalah serta mudhaf, dan ٱلْعَـٰلَمِينَ ialah mudhaf ilaih majrur dengan tanda huruf ya’.',
    },
    structureSegments: [
      {
        wordId: 'w-alhamdu',
        arabic: 'ٱلْحَمْدُ',
        roleLabel: { 'id-ID': 'Pokok Kalimat (Segala puji)', 'ms-MY': 'Subjek Ayat (Segala puji)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Berharakat dhammah (-u) sebagai subjek utama kalimat.',
          'ms-MY': 'Berbaris dhammah (-u) sebagai subjek utama ayat.',
        },
      },
      {
        wordId: 'w-lillahi',
        arabic: 'لِلَّهِ',
        roleLabel: { 'id-ID': 'Kepemilikan (Bagi Allah)', 'ms-MY': 'Pemilikan (Bagi Allah)' },
        category: 'phrase',
        functionExplanation: {
          'id-ID': 'Huruf لِ menyatakan bahwa seluruh pujian adalah milik Allah.',
          'ms-MY': 'Huruf لِ menyatakan bahawa segala pujian adalah milik Allah.',
        },
      },
      {
        wordId: 'w-rabbi',
        arabic: 'رَبِّ',
        roleLabel: { 'id-ID': 'Sandaran (Tuhan Pemelihara)', 'ms-MY': 'Sandaran (Tuhan Pemelihara)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Menjelaskan Allah sebagai Pencipta, Pemilik, dan Pemelihara.',
          'ms-MY': 'Menerangkan Allah sebagai Pencipta, Pemilik dan Pentadbir.',
        },
      },
      {
        wordId: 'w-alamin',
        arabic: 'ٱلْعَـٰلَمِينَ',
        roleLabel: { 'id-ID': 'Pelengkap Jamak (Seluruh alam)', 'ms-MY': 'Pelengkap Jamak (Sekalian alam)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Segala makhluk ciptaan yang diurus dan dipelihara oleh-Nya.',
          'ms-MY': 'Segala makhluk ciptaan yang dipelihara dan ditadbir oleh-Nya.',
        },
      },
    ],
    tafsirContext: {
      'id-ID':
        'Ayat ini mengajarkan hamba untuk memuji Allah bukan hanya karena satu nikmat sesaat, melainkan karena Dia adalah Rabb (Pemelihara dan Pengatur) seluruh alam semesta setiap saat.',
      'ms-MY':
        'Ayat ini mendidik hamba agar memuji Allah bukan sekadar atas satu nikmat semata-mata, bahkan kerana Dia ialah Rabb yang memelihara serta mentadbirkan sekalian alam setiap masa.',
    },
    tafsirSource: {
      'id-ID': 'Ringkasan merujuk pada Tafsir Ringkas Kemenag RI & Tafsir Al-Muyassar (QS. Al-Fatihah: 2).',
      'ms-MY': 'Ringkasan merujuk kepada Tafsir Pimpinan Ar-Rahman JAKIM & Tafsir Al-Muyassar (QS. al-Fatihah: 2).',
    },
    reflectionPrompt: {
      'id-ID':
        'Catatan Refleksi Pribadi: Bagaimana memahami makna رَبِّ (Pemelihara yang terus mengurus) mengubah perasaan Anda saat mengucapkan "Alhamdulillah"?',
      'ms-MY':
        'Nota Refleksi Peribadi: Bagaimanakah memahami makna رَبِّ (Tuhan yang sentiasa memelihara) mengubah penghayatan anda ketika mengucapkan "Alhamdulillah"?',
    },
    practice: {
      multipleChoice: {
        question: {
          'id-ID': 'Apa fungsi huruf depan لِ (li-) pada kata لِلَّهِ?',
          'ms-MY': 'Apakah fungsi kata sendi لِ (li-) pada perkataan لِلَّهِ?',
        },
        arabicFocus: 'لِلَّهِ',
        options: [
          {
            'id-ID': 'Menyatakan kepemilikan dan pengkhususan ("Bagi / Milik Allah")',
            'ms-MY': 'Menyatakan pemilikan dan pengkhususan ("Bagi / Milik Allah")',
          },
          {
            'id-ID': 'Menyatakan larangan ("Janganlah")',
            'ms-MY': 'Menyatakan larangan ("Janganlah")',
          },
          {
            'id-ID': 'Menyatakan waktu lampau ("Telah berlalu")',
            'ms-MY': 'Menyatakan masa lampau ("Telah berlalu")',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Benar! Huruf لِ (li-) menunjukkan bahwa segala pujian dimiliki dan dikhususkan bagi Allah.',
          'ms-MY': 'Betul! Huruf لِ (li-) menunjukkan bahawa segala pujian dimiliki dan dikhususkan bagi Allah.',
        },
      },
      matching: {
        instruction: {
          'id-ID': 'Pasangkan setiap kata dari QS. Al-Fatihah 1:2 dengan artinya:',
          'ms-MY': 'Padankan setiap perkataan daripada QS. al-Fatihah 1:2 dengan maknanya:',
        },
        pairs: [
          {
            id: 'w-alhamdu',
            arabic: 'ٱلْحَمْدُ',
            transliteration: 'Al-hamdu',
            meaning: { 'id-ID': 'Segala puji', 'ms-MY': 'Segala puji' },
          },
          {
            id: 'w-rabbi',
            arabic: 'رَبِّ',
            transliteration: 'Rabbi',
            meaning: { 'id-ID': 'Tuhan Pemelihara', 'ms-MY': 'Tuhan Yang Memelihara' },
          },
          {
            id: 'w-alamin',
            arabic: 'ٱلْعَـٰلَمِينَ',
            transliteration: 'Al-‘Alamina',
            meaning: { 'id-ID': 'Seluruh alam', 'ms-MY': 'Sekalian alam' },
          },
        ],
      },
      roleIdentification: {
        question: {
          'id-ID': 'Mengapa kata ٱلْحَمْدُ di awal ayat berakhiran dhammah (-u)?',
          'ms-MY': 'Mengapakah perkataan ٱلْحَمْدُ pada permulaan ayat berbaris akhir dhammah (-u)?',
        },
        sentenceArabic: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
        targetWordArabic: 'ٱلْحَمْدُ',
        options: [
          {
            'id-ID': 'Karena menjadi pokok pembicaraan di awal kalimat nominal (Mubtada’)',
            'ms-MY': 'Kerana menjadi subjek utama pada permulaan ayat namaan (Mubtada’)',
          },
          {
            'id-ID': 'Karena didahului oleh kata depan بِ',
            'ms-MY': 'Kerana didahului oleh kata sendi بِ',
          },
          {
            'id-ID': 'Karena merupakan kata perintah',
            'ms-MY': 'Kerana merupakan kata kerja perintah',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Tepat! Kata benda yang mengawali kalimat nominal (mubtada’) menggunakan tanda dasar dhammah (-u).',
          'ms-MY': 'Tepat sekali! Kata nama yang memulakan ayat namaan (mubtada’) menggunakan tanda asal dhammah (-u).',
        },
      },
    },
  },
  {
    id: 'lesson-prayer-1',
    pathwayId: 'prayer-comprehension',
    level: 1,
    order: 1,
    title: {
      'id-ID': 'Inti Dialog Salat: "Hanya Kepada-Mu Kami Menyembah" (Al-Fatihah 1:5–6)',
      'ms-MY': 'Inti Dialog Solat: "Hanya Kepada-Mu Kami Menyembah" (al-Fatihah 1:5–6)',
    },
    subtitle: {
      'id-ID': 'QS. Al-Fatihah 1:5–6 · Kata ganti إِيَّاكَ dan awalan kata kerja نَـ (Kami)',
      'ms-MY': 'QS. al-Fatihah 1:5–6 · Kata ganti nama إِيَّاكَ dan awalan kata kerja نَـ (Kami)',
    },
    durationMinutes: 8,
    sourceType: 'quran',
    verseRef: 'QS. Al-Fatihah 1:5–6',
    editorialStatus: 'verified-source',
    arabicPhrase: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ ٱهْدِنَا',
    transliterationPhrase: 'Iyyaka na‘budu wa iyyaka nasta‘in · Ihdina',
    verifiedTranslation: {
      'id-ID': 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan. Tunjukilah kami...',
      'ms-MY': 'Engkaulah sahaja (Ya Allah) Yang Kami sembah, dan kepada Engkaulah sahaja kami memohon pertolongan. Tunjukilah kami...',
    },
    translationSource: {
      'id-ID': 'Terjemahan Al-Qur’an Kementerian Agama RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM Malaysia)',
    },
    recall: {
      prompt: {
        'id-ID': 'Ketika kita membaca Al-Fatihah di setiap rakaat salat, di ayat ke-5 bacaan berubah dari menyebut "Dia" menjadi menyapa langsung...',
        'ms-MY': 'Apabila kita membaca al-Fatihah pada setiap rakaat solat, pada ayat ke-5 bacaan bertukar daripada menyebut "Dia" kepada menyapa secara langsung...',
      },
      arabicPrompt: 'إِيَّاكَ',
      options: [
        {
          'id-ID': '"Engkau" (berdialog langsung kepada Allah dengan penuh kerendahan hati)',
          'ms-MY': '"Engkau" (bermunajat terus kepada Allah dengan penuh kerendahan hati)',
        },
        {
          'id-ID': '"Mereka" (orang-orang terdahulu)',
          'ms-MY': '"Mereka" (umat-umat terdahulu)',
        },
        {
          'id-ID': '"Kalian" (sesama jamaah di masjid)',
          'ms-MY': '"Kamu sekalian" (sesama jemaah di masjid)',
        },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Benar. Akhiran كَ (-ka) pada إِيَّاكَ adalah kata ganti sapaan langsung "Engkau".',
        'ms-MY': 'Betul. Akhiran كَ (-ka) pada إِيَّاكَ ialah kata ganti nama sapaan langsung "Engkau".',
      },
    },
    audioDurationSeconds: 6,
    audioReciter: 'Audio Panduan Bacaan Salat Terverifikasi',
    audioLicense: 'Referensi Pendidikan Ibadah',
    wordIds: ['w-iyyaka', 'w-nabudu', 'w-nastain', 'w-ihdina'],
    structureSummary: {
      'id-ID':
        'Ayat ini mendahulukan kata ganti objek إِيَّاكَ (Hanya kepada-Mu) sebelum kata kerja نَعْبُدُ (kami menyembah) dan نَسْتَعِينُ (kami memohon pertolongan), lalu dilanjutkan dengan doa ٱهْدِنَا (tunjukilah kami).',
      'ms-MY':
        'Ayat ini mendahulukan kata ganti nama objek إِيَّاكَ (Hanya kepada-Mu) sebelum kata kerja نَعْبُدُ (kami menyembah) dan نَسْتَعِينُ (kami memohon pertolongan), kemudian disambung dengan doa ٱهْدِنَا (tunjukilah kami).',
    },
    grammarConceptTitle: {
      'id-ID': 'Satu Gagasan Bahasa: Awalan نَـ (Kami) & Akhiran نَا (Kami)',
      'ms-MY': 'Satu Konsep Bahasa: Awalan نَـ (Kami) & Akhiran نَا (Kami)',
    },
    grammarConceptBody: {
      'id-ID':
        'Perhatikan dua tanda "Kami" yang sangat sering muncul dalam doa salat: (1) Huruf نَـ (na-) di AWAL kata kerja menunjukkan "Kami sedang melakukan": نَعْبُدُ (kami menyembah), نَسْتَعِينُ (kami memohon pertolongan). (2) Suku kata نَا (-na) di AKHIR kata menunjukkan objek "kepada kami": ٱهْدِنَا (tunjukilah kami).',
      'ms-MY':
        'Perhatikan dua tanda "Kami" yang amat kerap hadir dalam doa solat: (1) Huruf نَـ (na-) di AWAL kata kerja menunjukkan "Kami sedang melakukan": نَعْبُدُ (kami menyembah), نَسْتَعِينُ (kami memohon pertolongan). (2) Suku kata نَا (-na) di HUJUNG perkataan menunjukkan objek "kepada kami": ٱهْدِنَا (tunjukilah kami).',
    },
    advancedGrammarBody: {
      'id-ID':
        'Catatan Balaghah & Nahwu: Taqdim ma haqquhu at-ta’khir (mendahulukan objek إِيَّاكَ yang seharusnya berada setelah fi’il) berfungsi untuk al-ikhtishash / al-hashr (pembatasan eksklusif).',
      'ms-MY':
        'Nota Balaghah & Nahu: Taqdim ma haqquhu at-ta’khir (mendahulukan objek إِيَّاكَ yang sepatutnya hadir selepas fi’il) berfungsi untuk al-ikhtisas / al-hasr (pengkhususan eksklusif).',
    },
    structureSegments: [
      {
        wordId: 'w-iyyaka',
        arabic: 'إِيَّاكَ',
        roleLabel: { 'id-ID': 'Objek Khusus (Hanya kepada-Mu)', 'ms-MY': 'Objek Khusus (Hanya kepada-Mu)' },
        category: 'harf',
        functionExplanation: {
          'id-ID': 'Diletakkan di depan untuk mengkhususkan ibadah hanya kepada Allah.',
          'ms-MY': 'Diletakkan di hadapan untuk mengkhususkan ibadah hanya kepada Allah.',
        },
      },
      {
        wordId: 'w-nabudu',
        arabic: 'نَعْبُدُ',
        roleLabel: { 'id-ID': 'Kata Kerja (Kami menyembah)', 'ms-MY': 'Kata Kerja (Kami menyembah)' },
        category: 'fiil',
        functionExplanation: {
          'id-ID': 'Awalan نَـ menunjukkan pelaku "kami" dari akar kata ع-ب-د.',
          'ms-MY': 'Awalan نَـ menunjukkan pelaku "kami" daripada akar perkataan ع-ب-د.',
        },
      },
      {
        wordId: 'w-nastain',
        arabic: 'نَسْتَعِينُ',
        roleLabel: { 'id-ID': 'Kata Kerja (Kami mohon tolong)', 'ms-MY': 'Kata Kerja (Kami mohon tolong)' },
        category: 'fiil',
        functionExplanation: {
          'id-ID': 'Pola نَسْتَـ menunjukkan permohonan bantuan kepada Allah.',
          'ms-MY': 'Pola نَسْتَـ menunjukkan permohonan pertolongan kepada Allah.',
        },
      },
      {
        wordId: 'w-ihdina',
        arabic: 'ٱهْدِنَا',
        roleLabel: { 'id-ID': 'Doa + Objek (Tunjukilah kami)', 'ms-MY': 'Doa + Objek (Tunjukilah kami)' },
        category: 'fiil',
        functionExplanation: {
          'id-ID': 'Permohonan petunjuk (ٱهْدِ) yang diakhiri kata ganti نَا (kami).',
          'ms-MY': 'Permohonan petunjuk (ٱهْدِ) yang diakhiri kata ganti nama نَا (kami).',
        },
      },
    ],
    tafsirContext: {
      'id-ID':
        'Dalam hadis qudsi riwayat Muslim (no. 395), disebutkan bahwa ketika hamba membaca "Iyyaka na’budu wa iyyaka nasta’in", Allah berfirman: "Ini adalah antara Aku dan hamba-Ku, dan bagi hamba-Ku apa yang ia mohonkan."',
      'ms-MY':
        'Dalam hadis qudsi riwayat Muslim (no. 395), dinyatakan bahawa apabila hamba membaca "Iyyaka na’budu wa iyyaka nasta’in", Allah berfirman: "Ini adalah antara Aku dan hamba-Ku, dan bagi hamba-Ku apa yang dipohonnya."',
    },
    tafsirSource: {
      'id-ID': 'Sumber: Shahih Muslim No. 395 & Tafsir Ringkas Kemenag RI (QS. Al-Fatihah: 5–6).',
      'ms-MY': 'Sumber: Sahih Muslim No. 395 & Tafsir Pimpinan Ar-Rahman JAKIM (QS. al-Fatihah: 5–6).',
    },
    reflectionPrompt: {
      'id-ID':
        'Catatan Refleksi Pribadi: Saat berdiri dalam salat hari ini, bagaimana rasanya menyadari bahwa kata نَسْتَعِينُ adalah pengakuan bahwa kita butuh pertolongan Allah bahkan untuk bisa beribadah?',
      'ms-MY':
        'Nota Refleksi Peribadi: Ketika berdiri dalam solat hari ini, bagaimanakah rasanya menyedari bahawa perkataan نَسْتَعِينُ ialah pengakuan bahawa kita memerlukan pertolongan Allah walau untuk beribadah?',
    },
    practice: {
      multipleChoice: {
        question: {
          'id-ID': 'Apa makna huruf نَـ (na-) di awal kata نَعْبُدُ dan نَسْتَعِينُ?',
          'ms-MY': 'Apakah maksud huruf نَـ (na-) pada permulaan perkataan نَعْبُدُ dan نَسْتَعِينُ?',
        },
        arabicFocus: 'نَعْبُدُ · نَسْتَعِينُ',
        options: [
          {
            'id-ID': 'Menunjukkan pelaku "Kami" (Kami menyembah, Kami memohon pertolongan)',
            'ms-MY': 'Menunjukkan pelaku "Kami" (Kami menyembah, Kami memohon pertolongan)',
          },
          {
            'id-ID': 'Menunjukkan kalimat negatif ("Tidak")',
            'ms-MY': 'Menunjukkan ayat nafi ("Tidak")',
          },
          {
            'id-ID': 'Menunjukkan tempat ("Di dalam")',
            'ms-MY': 'Menunjukkan tempat ("Di dalam")',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Tepat! Awalan نَـ pada kata kerja mudhari’ berarti "Kami".',
          'ms-MY': 'Tepat sekali! Awalan نَـ pada kata kerja mudhari’ bermaksud "Kami".',
        },
      },
      matching: {
        instruction: {
          'id-ID': 'Cocokkan kata-kata dari bacaan salat ini dengan artinya:',
          'ms-MY': 'Padankan perkataan-perkataan daripada bacaan solat ini dengan maknanya:',
        },
        pairs: [
          {
            id: 'w-iyyaka',
            arabic: 'إِيَّاكَ',
            transliteration: 'Iyyaka',
            meaning: { 'id-ID': 'Hanya kepada Engkau', 'ms-MY': 'Hanya kepada Engkau' },
          },
          {
            id: 'w-nabudu',
            arabic: 'نَعْبُدُ',
            transliteration: 'Na‘budu',
            meaning: { 'id-ID': 'Kami menyembah', 'ms-MY': 'Kami menyembah' },
          },
          {
            id: 'w-ihdina',
            arabic: 'ٱهْدِنَا',
            transliteration: 'Ihdina',
            meaning: { 'id-ID': 'Tunjukilah kami', 'ms-MY': 'Tunjukilah kami' },
          },
        ],
      },
      roleIdentification: {
        question: {
          'id-ID': 'Mengapa kata إِيَّاكَ diletakkan di awal kalimat sebelum kata kerja نَعْبُدُ?',
          'ms-MY': 'Mengapakah perkataan إِيَّاكَ diletakkan pada permulaan ayat sebelum kata kerja نَعْبُدُ?',
        },
        sentenceArabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        targetWordArabic: 'إِيَّاكَ',
        options: [
          {
            'id-ID': 'Untuk mengkhususkan makna: "Hanya kepada Engkau semata kami menyembah"',
            'ms-MY': 'Untuk mengkhususkan makna: "Hanya kepada Engkau semata-mata kami menyembah"',
          },
          {
            'id-ID': 'Karena kata kerja tidak boleh berada di awal ayat',
            'ms-MY': 'Kerana kata kerja tidak boleh berada pada permulaan ayat',
          },
          {
            'id-ID': 'Untuk mengubah kalimat menjadi pertanyaan',
            'ms-MY': 'Untuk menukarkan ayat menjadi bentuk soalan',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Benar! Mendahulukan objek إِيَّاكَ memberi penekanan bahwa ibadah hanya ditujukan kepada Allah.',
          'ms-MY': 'Betul! Mendahulukan objek إِيَّاكَ memberi penegasan bahawa ibadah hanya ditujukan kepada Allah.',
        },
      },
    },
  },
  {
    id: 'lesson-tajwid-1',
    pathwayId: 'quran-reading',
    level: 1,
    order: 1,
    title: {
      'id-ID': 'Harakat Dasar, Tasydid & Alif-Lam Syamsiyah pada Basmalah',
      'ms-MY': 'Baris Asas, Sabdu & Alif-Lam Syamsiyyah pada Basmalah',
    },
    subtitle: {
      'id-ID': 'Jalur Bacaan & Tajwid · Membaca sambung (washal) dan mengenali tanda tasydid',
      'ms-MY': 'Laluan Bacaan & Tajwid · Membaca sambung (wasal) dan mengenali tanda sabdu',
    },
    durationMinutes: 6,
    sourceType: 'phonetics-tajwid',
    verseRef: 'QS. Al-Fatihah 1:1 (Latihan Bacaan)',
    editorialStatus: 'educator-reviewed',
    arabicPhrase: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
    transliterationPhrase: 'Bis-mil-laa-hir-rah-maa-nir-ra-hiim',
    verifiedTranslation: {
      'id-ID': 'Panduan Bacaan: Perhatikan peleburan bunyi huruf Lam ke huruf Ra bertasydid (Ar-Rahmani).',
      'ms-MY': 'Panduan Bacaan: Perhatikan peleburan bunyi huruf Lam kepada huruf Ra bersabdu (Ar-Rahmani).',
    },
    translationSource: {
      'id-ID': 'Pedoman Tajwid Dasar & Standar Mushaf Utsmani Kemenag RI',
      'ms-MY': 'Panduan Tajwid Asas & Standard Mushaf Uthmani JAKIM',
    },
    recall: {
      prompt: {
        'id-ID': 'Ketika membaca kata ٱلرَّحْمَـٰنِ, apakah huruf Lam (ل) pada awalan Al- dibaca jelas atau dilebur ke huruf Ra (رّ)?',
        'ms-MY': 'Apabila membaca perkataan ٱلرَّحْمَـٰنِ, adakah huruf Lam (ل) pada awalan Al- dibaca jelas atau dimasukkan ke dalam huruf Ra (رّ)?',
      },
      arabicPrompt: 'ٱلرَّحْمَـٰنِ',
      options: [
        {
          'id-ID': 'Dilebur langsung ke huruf Ra bertasydid (dibaca Ar-Rahmani, bukan Al-Rahmani)',
          'ms-MY': 'Dimasukkan terus ke huruf Ra bersabdu (dibaca Ar-Rahmani, bukan Al-Rahmani)',
        },
        {
          'id-ID': 'Huruf Lam dibaca memantul (qalqalah)',
          'ms-MY': 'Huruf Lam dibaca melantun (qalqalah)',
        },
        {
          'id-ID': 'Huruf Ra tidak dibaca sama sekali',
          'ms-MY': 'Huruf Ra tidak dibunyikan langsung',
        },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Benar! Ini disebut Alif-Lam Syamsiyah (Idgham Syamsi): huruf Lam tidak diucapkan dan suara langsung masuk ke huruf رّ.',
        'ms-MY': 'Betul! Ini dinamakan Alif-Lam Syamsiyyah (Idgham Syamsi): huruf Lam tidak disebut dan bunyi terus masuk ke huruf رّ.',
      },
    },
    audioDurationSeconds: 6,
    audioReciter: 'Panduan Talaqqi & Makhraj Terverifikasi',
    audioLicense: 'Catatan: Gunakan audio sebagai panduan awal; koreksi makhraj terbaik dilakukan bersama guru.',
    wordIds: ['w-bismi', 'w-allahi', 'w-arrahmani', 'w-arrahimi'],
    structureSummary: {
      'id-ID':
        'Latihan ini memfokuskan ketepatan membaca kasrah pada بِسْمِ, tarqiq (tipis) pada Lam ٱللَّهِ karena didahului kasrah, serta tasydid pada ٱلرَّحْمَـٰنِ.',
      'ms-MY':
        'Latihan ini memfokuskan ketepatan membaca baris kasrah pada بِسْمِ, bacaan nipis (tarqiq) pada Lam ٱللَّهِ kerana didahului kasrah, serta sabdu pada ٱلرَّحْمَـٰنِ.',
    },
    grammarConceptTitle: {
      'id-ID': 'Satu Kaidah Tajwid: Lam Jalalah Tipis (Tarqiq) & Alif Kecil (Mad Thabi’i)',
      'ms-MY': 'Satu Hukum Tajwid: Lam Jalalah Nipis (Tarqiq) & Alif Kecil (Mad Asli)',
    },
    grammarConceptBody: {
      'id-ID':
        '1. Karena huruf Mim pada بِسْمِ berharakat kasrah (-i), maka huruf Lam pada kata ٱللَّهِ dibaca tipis (Bismillaahi, bukan Bismilloohi). 2. Perhatikan tanda alif kecil berdiri di atas huruf Mim pada ٱلرَّحْمَـٰنِ: dibaca panjang 2 harakat (Mad Thabi’i).',
      'ms-MY':
        '1. Memandangkan huruf Mim pada بِسْمِ berbaris kasrah (-i), maka huruf Lam pada perkataan ٱللَّهِ dibaca nipis (Bismillaahi, bukan Bismilloohi). 2. Perhatikan tanda alif kecil tegak di atas huruf Mim pada ٱلرَّحْمَـٰنِ: dibaca panjang 2 harakat (Mad Asli).',
    },
    advancedGrammarBody: {
      'id-ID':
        'Catatan Penting Talaqqi: Saat berhenti (waqaf) di akhir ayat pada kata ٱلرَّحِيمِ, huruf Ya’ sebelum huruf terakhir membuat bacaan menjadi Mad ‘Aridh Lissukun (boleh dibaca 2, 4, atau 6 harakat secara konsisten).',
      'ms-MY':
        'Nota Penting Talaqqi: Apabila berhenti (waqaf) di hujung ayat pada perkataan ٱلرَّحِيمِ, huruf Ya’ sebelum huruf akhir menjadikan bacaan Mad ‘Aridh Lissukun (boleh dibaca 2, 4 atau 6 harakat secara seragam).',
    },
    structureSegments: [
      {
        wordId: 'w-bismi',
        arabic: 'بِسْمِ',
        roleLabel: { 'id-ID': 'Sin Sukun (Hams)', 'ms-MY': 'Sin Sukun (Hams)' },
        category: 'phrase',
        functionExplanation: {
          'id-ID': 'Alirkan desis lembut pada huruf Sin sukun tanpa memantul.',
          'ms-MY': 'Alirkan bunyi desiran lembut pada huruf Sin sukun tanpa melantun.',
        },
      },
      {
        wordId: 'w-allahi',
        arabic: 'ٱللَّهِ',
        roleLabel: { 'id-ID': 'Lam Tarqiq (Tipis)', 'ms-MY': 'Lam Tarqiq (Nipis)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Dibaca tipis karena didahului bunyi kasrah pada kata sebelumnya.',
          'ms-MY': 'Dibaca nipis kerana didahului baris kasrah pada perkataan sebelumnya.',
        },
      },
      {
        wordId: 'w-arrahmani',
        arabic: 'ٱلرَّحْمَـٰنِ',
        roleLabel: { 'id-ID': 'Al-Syamsiyah + Mad 2 Harakat', 'ms-MY': 'Al-Syamsiyyah + Mad 2 Harakat' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Leburkan ke huruf Ra bertasydid, panjangkan Mim 2 harakat.',
          'ms-MY': 'Masukkan ke huruf Ra bersabdu, panjangkan Mim 2 harakat.',
        },
      },
      {
        wordId: 'w-arrahimi',
        arabic: 'ٱلرَّحِيمِ',
        roleLabel: { 'id-ID': 'Mad ‘Aridh Lissukun (Saat Waqaf)', 'ms-MY': 'Mad ‘Aridh Lissukun (Ketika Waqaf)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Matikan huruf Mim di akhir ayat ketika berhenti (waqaf).',
          'ms-MY': 'Sukunkan huruf Mim di hujung ayat apabila berhenti (waqaf).',
        },
      },
    ],
    tafsirContext: {
      'id-ID':
        'Catatan Metodologi: Aplikasi digital membantu Anda mengenali tanda baca dan mendengarkan contoh pelafalan yang benar. Untuk memastikan ketepatan makhraj huruf ح (Ha bersih) dan ر (Ra), kami menganjurkan sesi simak bersama guru Al-Qur’an.',
      'ms-MY':
        'Nota Metodologi: Aplikasi digital membantu anda mengenali tanda bacaan dan mendengar contoh sebutan yang betul. Bagi memastikan ketepatan makhraj huruf ح (Ha bersih) dan ر (Ra), kami menggalakkan semakan talaqqi bersama guru al-Quran.',
    },
    tafsirSource: {
      'id-ID': 'Pedoman Tajwid Mushaf Standar Indonesia (LPMQ Kemenag RI).',
      'ms-MY': 'Panduan Tajwid Rasm Uthmani (Bahagian Kawalan Teks al-Quran KDN / JAKIM).',
    },
    reflectionPrompt: {
      'id-ID':
        'Catatan Latihan Bacaan: Bagian mana dari pelafalan Basmalah yang ingin Anda latih kembali bersama guru mengaji?',
      'ms-MY':
        'Nota Latihan Bacaan: Bahagian manakah daripada sebutan Basmalah yang ingin anda semak semula bersama guru mengaji?',
    },
    practice: {
      multipleChoice: {
        question: {
          'id-ID': 'Bagaimana cara membaca huruf Lam pada kata ٱللَّهِ ketika didahului oleh kata بِسْمِ yang berakhiran kasrah (-i)?',
          'ms-MY': 'Bagaimanakah cara menyebut huruf Lam pada perkataan ٱللَّهِ apabila didahului oleh perkataan بِسْمِ yang berbaris kasrah (-i)?',
        },
        arabicFocus: 'بِسْمِ ٱللَّهِ',
        options: [
          {
            'id-ID': 'Dibaca tipis / tarqiq (Bismillaahi)',
            'ms-MY': 'Dibaca nipis / tarqiq (Bismillaahi)',
          },
          {
            'id-ID': 'Dibaca tebal / tafkhim (Bismilloohi)',
            'ms-MY': 'Dibaca tebal / tafkhim (Bismilloohi)',
          },
          {
            'id-ID': 'Dibaca mendengung 4 harakat',
            'ms-MY': 'Dibaca dengung 4 harakat',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Tepat! Lam Jalalah setelah harakat kasrah selalu dibaca tipis (tarqiq).',
          'ms-MY': 'Tepat sekali! Lam Jalalah selepas baris kasrah sentiasa dibaca nipis (tarqiq).',
        },
      },
      matching: {
        instruction: {
          'id-ID': 'Pasangkan potongan kata berikut dengan kaidah cara membacanya:',
          'ms-MY': 'Padankan potongan perkataan berikut dengan hukum cara bacaannya:',
        },
        pairs: [
          {
            id: 'w-bismi',
            arabic: 'بِسْمِ',
            transliteration: 'Bismi',
            meaning: { 'id-ID': 'Sin sukun mengalir lembut', 'ms-MY': 'Sin sukun mengalir lembut' },
          },
          {
            id: 'w-arrahmani',
            arabic: 'ٱلرَّحْمَـٰنِ',
            transliteration: 'Ar-Rahmani',
            meaning: { 'id-ID': 'Alif-Lam Syamsiyah & Mad 2 harakat', 'ms-MY': 'Alif-Lam Syamsiyyah & Mad 2 harakat' },
          },
          {
            id: 'w-arrahimi',
            arabic: 'ٱلرَّحِيمِ',
            transliteration: 'Ar-Rahim(i)',
            meaning: { 'id-ID': 'Mad ‘Aridh Lissukun saat waqaf', 'ms-MY': 'Mad ‘Aridh Lissukun ketika waqaf' },
          },
        ],
      },
      roleIdentification: {
        question: {
          'id-ID': 'Tanda garis vertikal kecil di atas huruf Mim pada kata ٱلرَّحْمَـٰنِ menandakan...',
          'ms-MY': 'Tanda garisan tegak kecil di atas huruf Mim pada perkataan ٱلرَّحْمَـٰنِ menandakan...',
        },
        sentenceArabic: 'ٱلرَّحْمَـٰنِ',
        targetWordArabic: 'مَـٰ',
        options: [
          {
            'id-ID': 'Bacaan panjang (Mad Thabi’i) sepanjang 2 harakat',
            'ms-MY': 'Bacaan panjang (Mad Asli) sepanjang 2 harakat',
          },
          {
            'id-ID': 'Tanda wajib berhenti (waqaf lazim)',
            'ms-MY': 'Tanda wajib berhenti (waqaf lazim)',
          },
          {
            'id-ID': 'Huruf Mim harus dibaca sukun (mati)',
            'ms-MY': 'Huruf Mim mesti dibaca sukun (mati)',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Benar! Alif kecil berdiri (fathah tegak) dibaca panjang 2 harakat sama seperti huruf alif mad.',
          'ms-MY': 'Betul! Alif kecil tegak dibaca panjang 2 harakat sama seperti huruf alif mad.',
        },
      },
    },
  },
  {
    id: 'lesson-tajwid-2',
    pathwayId: 'quran-reading',
    level: 2,
    order: 2,
    title: {
      'id-ID': 'Alif-Lam Qamariyah & Makhraj Huruf Tenggorokan (Al-Fatihah 1:2)',
      'ms-MY': 'Alif-Lam Qamariyyah & Makhraj Huruf Halqi (al-Fatihah 1:2)',
    },
    subtitle: {
      'id-ID': 'Jalur Bacaan & Tajwid · Membedakan huruf ح (Ha) dan ع (‘Ain) dengan jelas',
      'ms-MY': 'Laluan Bacaan & Tajwid · Membezakan sebutan huruf ح (Ha) dan ع (‘Ain) dengan jelas',
    },
    durationMinutes: 7,
    prerequisiteLessonId: 'lesson-tajwid-1',
    prerequisiteReason: {
      'id-ID': 'Memerlukan pengenalan Alif-Lam Syamsiyah dari Pelajaran Bacaan 1 sebagai pembanding.',
      'ms-MY': 'Memerlukan pengenalan Alif-Lam Syamsiyyah daripada Pelajaran Bacaan 1 sebagai perbandingan.',
    },
    sourceType: 'phonetics-tajwid',
    verseRef: 'QS. Al-Fatihah 1:2 (Latihan Bacaan)',
    editorialStatus: 'educator-reviewed',
    arabicPhrase: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
    transliterationPhrase: 'Al-ham-du lil-laa-hi Rab-bil-‘aa-la-miin',
    verifiedTranslation: {
      'id-ID': 'Panduan Bacaan: Huruf Lam pada ٱلْحَمْدُ dan ٱلْعَـٰلَمِينَ bertanda sukun dan dibaca jelas (Izhar Qamari).',
      'ms-MY': 'Panduan Bacaan: Huruf Lam pada ٱلْحَمْدُ dan ٱلْعَـٰلَمِينَ bertanda sukun dan dibaca jelas (Izhar Qamari).',
    },
    translationSource: {
      'id-ID': 'Pedoman Tajwid Standar Mushaf Kemenag RI',
      'ms-MY': 'Panduan Tajwid Rasm Uthmani JAKIM Malaysia',
    },
    recall: {
      prompt: {
        'id-ID': 'Pada pelajaran sebelumnya, huruf Lam pada ٱلرَّحْمَـٰنِ dilebur. Bagaimana dengan huruf Lam bertanda sukun pada kata ٱلْحَمْدُ?',
        'ms-MY': 'Dalam pelajaran lepas, huruf Lam pada ٱلرَّحْمَـٰنِ dimasukkan ke huruf Ra. Bagaimana pula dengan huruf Lam bertanda sukun pada perkataan ٱلْحَمْدُ?',
      },
      arabicPrompt: 'ٱلْحَمْدُ',
      options: [
        {
          'id-ID': 'Dibaca jelas bunyi "L"-nya (Al-hamdu) karena bertemu huruf Qamariyah (ح)',
          'ms-MY': 'Disebut jelas bunyi "L"-nya (Al-hamdu) kerana bertemu huruf Qamariyyah (ح)',
        },
        {
          'id-ID': 'Dilebur menjadi Ah-hamdu',
          'ms-MY': 'Dimasukkan menjadi Ah-hamdu',
        },
        {
          'id-ID': 'Dibaca dengung 2 harakat',
          'ms-MY': 'Dibaca dengung 2 harakat',
        },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Tepat! Tanda sukun di atas huruf Lam menandakan Alif-Lam Qamariyah yang harus dibaca jelas.',
        'ms-MY': 'Tepat sekali! Tanda sukun di atas huruf Lam menandakan Alif-Lam Qamariyyah yang wajib disebut dengan jelas.',
      },
    },
    audioDurationSeconds: 5,
    audioReciter: 'Panduan Talaqqi & Makhraj Terverifikasi',
    audioLicense: 'Referensi Pendidikan Bacaan Al-Qur’an',
    wordIds: ['w-alhamdu', 'w-lillahi', 'w-rabbi', 'w-alamin'],
    structureSummary: {
      'id-ID':
        'Dua huruf tengah tenggorokan (Wasathul Halq), yaitu ح pada ٱلْحَمْدُ dan ع pada ٱلْعَـٰلَمِينَ, didahului oleh Alif-Lam Qamariyah yang dibaca jelas.',
      'ms-MY':
        'Dua huruf tengah kerongkong (Wasatul Halq), iaitu ح pada ٱلْحَمْدُ dan ع pada ٱلْعَـٰلَمِينَ, didahului oleh Alif-Lam Qamariyyah yang disebut jelas.',
    },
    grammarConceptTitle: {
      'id-ID': 'Satu Kaidah Tajwid: Huruf Tengah Tenggorokan (ح dan ع) & Izhar Syafawi',
      'ms-MY': 'Satu Hukum Tajwid: Huruf Tengah Kerongkong (ح dan ع) & Izhar Syafawi',
    },
    grammarConceptBody: {
      'id-ID':
        'Huruf ح (Ha) dan ع (‘Ain) keluar dari bagian tengah tenggorokan. Selain itu, perhatikan huruf Mim sukun (مْ) yang bertemu huruf Dal (دُ) pada kata ٱلْحَمْدُ: bibir merapat dengan jelas tanpa menahan dengung berlebihan (Izhar Syafawi).',
      'ms-MY':
        'Huruf ح (Ha) dan ع (‘Ain) keluar daripada bahagian tengah kerongkong. Selain itu, perhatikan huruf Mim sukun (مْ) yang bertemu huruf Dal (دُ) pada perkataan ٱلْحَمْدُ: bibir dirapatkan dengan jelas tanpa dengung berlebihan (Izhar Syafawi).',
    },
    advancedGrammarBody: {
      'id-ID':
        'Catatan Talaqqi: Hindari memantulkan (qalqalah) huruf Lam sukun pada ٱلْحَمْدُ atau Mim sukun pada حَمْدُ.',
      'ms-MY':
        'Nota Talaqqi: Elakkan daripada melantunkan (qalqalah) huruf Lam sukun pada ٱلْحَمْدُ atau Mim sukun pada حَمْدُ.',
    },
    structureSegments: [
      {
        wordId: 'w-alhamdu',
        arabic: 'ٱلْحَمْدُ',
        roleLabel: { 'id-ID': 'Al-Qamariyah + Izhar Syafawi', 'ms-MY': 'Al-Qamariyyah + Izhar Syafawi' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Lam sukun dan Mim sukun dibaca jelas tanpa memantul.',
          'ms-MY': 'Lam sukun dan Mim sukun disebut jelas tanpa lantunan.',
        },
      },
      {
        wordId: 'w-lillahi',
        arabic: 'لِلَّهِ',
        roleLabel: { 'id-ID': 'Lam Tarqiq (Tipis)', 'ms-MY': 'Lam Tarqiq (Nipis)' },
        category: 'phrase',
        functionExplanation: {
          'id-ID': 'Didahului kasrah pada huruf لِ sehingga dibaca tipis.',
          'ms-MY': 'Didahului baris kasrah pada huruf لِ maka dibaca nipis.',
        },
      },
      {
        wordId: 'w-rabbi',
        arabic: 'رَبِّ',
        roleLabel: { 'id-ID': 'Ba’ Tasydid (Tekanan Jelas)', 'ms-MY': 'Ba’ Sabdu (Tekanan Jelas)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Beri tekanan tepat pada huruf Ba’ bertasydid sebelum masuk ke Al-‘Alamin.',
          'ms-MY': 'Berikan tekanan tepat pada huruf Ba’ bersabdu sebelum masuk ke Al-‘Alamin.',
        },
      },
      {
        wordId: 'w-alamin',
        arabic: 'ٱلْعَـٰلَمِينَ',
        roleLabel: { 'id-ID': 'Makhraj ‘Ain + Mad ‘Aridh', 'ms-MY': 'Makhraj ‘Ain + Mad ‘Aridh' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Ucapkan huruf ‘Ain dari tengah tenggorokan dengan panjang 2 harakat.',
          'ms-MY': 'Sebutkan huruf ‘Ain dari tengah kerongkong dengan panjang 2 harakat.',
        },
      },
    ],
    tafsirContext: {
      'id-ID':
        'Menjaga ketepatan huruf dalam Surah Al-Fatihah sangat dianjurkan karena surah ini merupakan rukun di dalam setiap rakaat salat.',
      'ms-MY':
        'Menjaga ketepatan sebutan huruf dalam Surah al-Fatihah amat dituntut kerana surah ini merupakan rukun di dalam setiap rakaat solat.',
    },
    tafsirSource: {
      'id-ID': 'Pedoman Tajwid & Tahsin Bacaan Al-Qur’an Kemenag RI.',
      'ms-MY': 'Panduan Tahsin Bacaan al-Quran JAKIM / ILIM Malaysia.',
    },
    reflectionPrompt: {
      'id-ID':
        'Catatan Latihan: Apakah Anda sudah dapat membedakan bunyi huruf أ (Hamzah) dan ع (‘Ain) pada kata ٱلْعَـٰلَمِينَ?',
      'ms-MY':
        'Nota Latihan: Adakah anda sudah dapat membezakan bunyi huruf أ (Hamzah) dan ع (‘Ain) pada perkataan ٱلْعَـٰلَمِينَ?',
    },
    practice: {
      multipleChoice: {
        question: {
          'id-ID': 'Apa hukum bacaan Mim sukun (مْ) ketika bertemu huruf Dal (د) pada kata ٱلْحَمْدُ?',
          'ms-MY': 'Apakah hukum bacaan Mim sukun (مْ) apabila bertemu huruf Dal (د) pada perkataan ٱلْحَمْدُ?',
        },
        arabicFocus: 'ٱلْحَمْدُ',
        options: [
          {
            'id-ID': 'Izhar Syafawi (dibaca jelas di bibir tanpa dengung panjang)',
            'ms-MY': 'Izhar Syafawi (dibaca jelas pada bibir tanpa dengung panjang)',
          },
          {
            'id-ID': 'Ikhfa Syafawi (didengungkan karena bertemu Ba)',
            'ms-MY': 'Ikhfa Syafawi (didengungkan kerana bertemu Ba)',
          },
          {
            'id-ID': 'Qalqalah Kubra (dipantulkan kuat)',
            'ms-MY': 'Qalqalah Kubra (dilantunkan dengan kuat)',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Benar! Mim sukun yang bertemu huruf selain Mim dan Ba dibaca jelas (Izhar Syafawi).',
          'ms-MY': 'Betul! Mim sukun yang bertemu huruf selain Mim dan Ba dibaca jelas (Izhar Syafawi).',
        },
      },
      matching: {
        instruction: {
          'id-ID': 'Cocokkan kata berikut dengan fokus latihan tajwidnya:',
          'ms-MY': 'Padankan perkataan berikut dengan fokus latihan tajwidnya:',
        },
        pairs: [
          {
            id: 'w-alhamdu',
            arabic: 'ٱلْحَمْدُ',
            transliteration: 'Al-hamdu',
            meaning: { 'id-ID': 'Alif-Lam Qamariyah & Makhraj Ha', 'ms-MY': 'Alif-Lam Qamariyyah & Makhraj Ha' },
          },
          {
            id: 'w-rabbi',
            arabic: 'رَبِّ',
            transliteration: 'Rabbi',
            meaning: { 'id-ID': 'Tasydid pada huruf Ba', 'ms-MY': 'Sabdu pada huruf Ba' },
          },
          {
            id: 'w-alamin',
            arabic: 'ٱلْعَـٰلَمِينَ',
            transliteration: 'Al-‘Alamina',
            meaning: { 'id-ID': 'Makhraj ‘Ain & Mad 2 harakat', 'ms-MY': 'Makhraj ‘Ain & Mad 2 harakat' },
          },
        ],
      },
      roleIdentification: {
        question: {
          'id-ID': 'Dari mana tempat keluarnya (makhraj) huruf ح pada ٱلْحَمْدُ dan huruf ع pada ٱلْعَـٰلَمِينَ?',
          'ms-MY': 'Dari manakah tempat keluar (makhraj) huruf ح pada ٱلْحَمْدُ dan huruf ع pada ٱلْعَـٰلَمِينَ?',
        },
        sentenceArabic: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
        targetWordArabic: 'ح · ع',
        options: [
          {
            'id-ID': 'Tengah tenggorokan (Wasathul Halq)',
            'ms-MY': 'Tengah kerongkong (Wasatul Halq)',
          },
          {
            'id-ID': 'Ujung lidah dengan gigi seri atas',
            'ms-MY': 'Hujung lidah dengan gigi kacip atas',
          },
          {
            'id-ID': 'Kedua bibir (Asy-Syafatain)',
            'ms-MY': 'Kedua-dua bibir (Asy-Syafatain)',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Tepat sekali! Huruf ع dan ح merupakan dua huruf yang keluar dari tengah tenggorokan.',
          'ms-MY': 'Tepat sekali! Huruf ع dan ح merupakan dua huruf yang keluar daripada bahagian tengah kerongkong.',
        },
      },
    },
  },
  {
    id: 'lesson-ayah-3',
    pathwayId: 'understand-quran',
    level: 3,
    order: 3,
    title: {
      'id-ID': 'Kata Tunjuk & Kitab Petunjuk (QS. Al-Baqarah 2:2)',
      'ms-MY': 'Kata Tunjuk & Kitab Petunjuk (QS. al-Baqarah 2:2)',
    },
    subtitle: {
      'id-ID': 'QS. Al-Baqarah 2:2 · Mengenali kata tunjuk ذَٰلِكَ dan keluarga kata ك-ت-ب serta ه-د-ي',
      'ms-MY': 'QS. al-Baqarah 2:2 · Mengenali kata tunjuk ذَٰلِكَ dan keluarga perkataan ك-ت-ب serta ه-د-ي',
    },
    durationMinutes: 8,
    prerequisiteLessonId: 'lesson-ayah-2',
    prerequisiteReason: {
      'id-ID': 'Memerlukan pemahaman kalimat nominal dari Pelajaran 2 untuk mengenali hubungan kata tunjuk dan kata benda.',
      'ms-MY': 'Memerlukan kefahaman ayat namaan daripada Pelajaran 2 untuk mengenali kaitan kata tunjuk dan kata nama.',
    },
    sourceType: 'quran',
    verseRef: 'QS. Al-Baqarah 2:2',
    editorialStatus: 'verified-source',
    arabicPhrase: 'ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
    transliterationPhrase: 'Dzalikal-kitabu la raiba fihi hudan lil-muttaqin',
    verifiedTranslation: {
      'id-ID': 'Kitab (Al-Qur’an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa.',
      'ms-MY': 'Kitab Al-Quran ini, tidak ada sebarang syak padanya (tentang datangnya dari Allah dan tentang sempurnanya); ia pula menjadi petunjuk bagi orang-orang yang hendak bertaqwa.',
    },
    translationSource: {
      'id-ID': 'Terjemahan Al-Qur’an Kementerian Agama RI (2019)',
      'ms-MY': 'Tafsir Pimpinan Ar-Rahman (JAKIM Malaysia)',
    },
    recall: {
      prompt: {
        'id-ID': 'Ingat kembali: Kata ٱهْدِنَا (Tunjukilah kami) dalam Surah Al-Fatihah berakar dari huruf ه - د - ي. Kata mana dalam QS. Al-Baqarah 2:2 yang berasal dari akar yang sama?',
        'ms-MY': 'Imbas kembali: Perkataan ٱهْدِنَا (Tunjukilah kami) dalam Surah al-Fatihah berakar daripada huruf ه - د - ي. Perkataan manakah dalam QS. al-Baqarah 2:2 yang berasal daripada akar yang sama?',
      },
      arabicPrompt: 'ه - د - ي',
      options: [
        {
          'id-ID': 'هُدًى (Hudan — Petunjuk)',
          'ms-MY': 'هُدًى (Hudan — Petunjuk)',
        },
        {
          'id-ID': 'ذَٰلِكَ (Dzalika — Itu)',
          'ms-MY': 'ذَٰلِكَ (Dzalika — Itu)',
        },
        {
          'id-ID': 'رَيْبَ (Raiba — Keraguan)',
          'ms-MY': 'رَيْبَ (Raiba — Syak/Keraguan)',
        },
      ],
      correctIndex: 0,
      explanation: {
        'id-ID': 'Luar biasa! Ketika kita memohon "Ihdina" (Tunjukilah kami) di Surah Al-Fatihah, awal Surah Al-Baqarah langsung menjawab bahwa Al-Qur’an ini adalah "Hudan" (Petunjuk).',
        'ms-MY': 'Cemerlang! Apabila kita memohon "Ihdina" (Tunjukilah kami) dalam Surah al-Fatihah, permulaan Surah al-Baqarah terus menjawab bahawa al-Quran ini ialah "Hudan" (Petunjuk).',
      },
    },
    audioDurationSeconds: 7,
    audioReciter: 'Audio Panduan Pelafalan Terverifikasi',
    audioLicense: 'Referensi Pendidikan Terbuka',
    wordIds: ['w-dzalika', 'w-alkitabu', 'w-ihdina'],
    structureSummary: {
      'id-ID':
        'Ayat ini dibuka dengan kata tunjuk ذَٰلِكَ (Itu/Ini) yang diikuti kata benda ber-Alif-Lam ٱلْكِتَـٰبُ (Kitab ini), menafikan seluruh keraguan (لَا رَيْبَ فِيهِ), dan menegaskan fungsinya sebagai هُدًى (petunjuk).',
      'ms-MY':
        'Ayat ini dimulakan dengan kata tunjuk ذَٰلِكَ (Itu/Ini) yang diikuti kata nama ber-Alif-Lam ٱلْكِتَـٰبُ (Kitab ini), menafikan sebarang keraguan (لَا رَيْبَ فِيهِ), dan menegaskan fungsinya sebagai هُدًى (petunjuk).',
    },
    grammarConceptTitle: {
      'id-ID': 'Satu Gagasan Bahasa: Kata Tunjuk (ذَٰلِكَ) + Kata Benda Ber-Alif-Lam (ٱلْكِتَـٰبُ)',
      'ms-MY': 'Satu Konsep Bahasa: Kata Tunjuk (ذَٰلِكَ) + Kata Nama Ber-Alif-Lam (ٱلْكِتَـٰبُ)',
    },
    grammarConceptBody: {
      'id-ID':
        'Ketika kata tunjuk seperti ذَٰلِكَ (itu) atau هَٰذَا (ini) diikuti langsung oleh kata benda yang memakai awalan الـ (Al-), keduanya membentuk satu kesatuan frasa tunjuk: ذَٰلِكَ ٱلْكِتَـٰبُ ("Kitab yang agung itu/ini").',
      'ms-MY':
        'Apabila kata tunjuk seperti ذَٰلِكَ (itu) atau هَٰذَا (ini) diikuti terus oleh kata nama yang mempunyai awalan الـ (Al-), kedua-duanya membentuk satu kesatuan frasa tunjuk: ذَٰلِكَ ٱلْكِتَـٰبُ ("Kitab yang agung itu/ini").',
    },
    advancedGrammarBody: {
      'id-ID':
        'Catatan Nahwu: Kata benda ber-Alif-Lam setelah isim isyarah berkedudukan sebagai Badal (penjelas). Sedangkan لَا رَيْبَ menggunakan La Nafiyah lil Jinsi yang menafikan segala jenis keraguan.',
      'ms-MY':
        'Nota Nahu: Kata nama ber-Alif-Lam selepas isim isyarah berkedudukan sebagai Badal (penjelas). Manakala لَا رَيْبَ menggunakan La Nafiyah lil Jinsi yang menafikan segala bentuk keraguan.',
    },
    structureSegments: [
      {
        wordId: 'w-dzalika',
        arabic: 'ذَٰلِكَ',
        roleLabel: { 'id-ID': 'Kata Tunjuk Agung (Itu/Ini)', 'ms-MY': 'Kata Tunjuk Agung (Itu/Ini)' },
        category: 'harf',
        functionExplanation: {
          'id-ID': 'Menunjuk pada kemuliaan dan ketinggian kedudukan Al-Qur’an.',
          'ms-MY': 'Merujuk kepada kemuliaan dan ketinggian martabat al-Quran.',
        },
      },
      {
        wordId: 'w-alkitabu',
        arabic: 'ٱلْكِتَـٰبُ',
        roleLabel: { 'id-ID': 'Kata Benda (Kitab)', 'ms-MY': 'Kata Nama (Kitab)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Dari akar ك-ت-ب yang berarti tertulis dan terjaga.',
          'ms-MY': 'Daripada akar ك-ت-ب yang bermaksud tertulis dan terpelihara.',
        },
      },
      {
        wordId: 'w-ihdina',
        arabic: 'هُدًى',
        roleLabel: { 'id-ID': 'Inti Predikat (Petunjuk)', 'ms-MY': 'Inti Predikat (Petunjuk)' },
        category: 'isim',
        functionExplanation: {
          'id-ID': 'Dari akar ه-د-ي, menjawab doa "Ihdina" pada Surah Al-Fatihah.',
          'ms-MY': 'Daripada akar ه-د-ي, menjawab doa "Ihdina" dalam Surah al-Fatihah.',
        },
      },
    ],
    tafsirContext: {
      'id-ID':
        'Para ulama tafsir menjelaskan keterkaitan indah antara akhir Surah Al-Fatihah ("Tunjukilah kami jalan yang lurus") dengan awal Surah Al-Baqarah ("Kitab ini adalah petunjuk bagi orang-orang yang bertakwa").',
      'ms-MY':
        'Para ulama tafsir menghuraikan pertalian indah antara penghujung Surah al-Fatihah ("Tunjukilah kami jalan yang lurus") dengan permulaan Surah al-Baqarah ("Kitab ini menjadi petunjuk bagi orang-orang yang bertaqwa").',
    },
    tafsirSource: {
      'id-ID': 'Sumber: Tafsir Ringkas Kemenag RI & Tafsir Al-Muyassar (QS. Al-Baqarah: 2).',
      'ms-MY': 'Sumber: Tafsir Pimpinan Ar-Rahman JAKIM & Tafsir Al-Muyassar (QS. al-Baqarah: 2).',
    },
    reflectionPrompt: {
      'id-ID':
        'Catatan Refleksi Pribadi: Bagaimana perasaan Anda ketika melihat hubungan akar kata antara doa "Ihdina" dan jawaban "Hudan" di halaman berikutnya dalam mushaf?',
      'ms-MY':
        'Nota Refleksi Peribadi: Apakah perasaan anda apabila melihat pertalian akar perkataan antara doa "Ihdina" dengan jawapan "Hudan" pada halaman sebelahnya dalam mushaf?',
    },
    practice: {
      multipleChoice: {
        question: {
          'id-ID': 'Apa makna gabungan kata tunjuk dan kata benda ذَٰلِكَ ٱلْكِتَـٰبُ di awal Surah Al-Baqarah?',
          'ms-MY': 'Apakah maksud gabungan kata tunjuk dan kata nama ذَٰلِكَ ٱلْكِتَـٰبُ pada awal Surah al-Baqarah?',
        },
        arabicFocus: 'ذَٰلِكَ ٱلْكِتَـٰبُ',
        options: [
          {
            'id-ID': 'Kitab (Al-Qur’an) yang mulia itu/ini',
            'ms-MY': 'Kitab (al-Quran) yang mulia itu/ini',
          },
          {
            'id-ID': 'Kami telah menulis sebuah buku',
            'ms-MY': 'Kami telah menulis sebuah buku',
          },
          {
            'id-ID': 'Di dalam kitab-kitab terdahulu',
            'ms-MY': 'Di dalam kitab-kitab terdahulu',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Benar! ذَٰلِكَ adalah kata tunjuk, dan ٱلْكِتَـٰبُ adalah kata benda ber-Alif-Lam yang dijelaskannya.',
          'ms-MY': 'Betul! ذَٰلِكَ ialah kata tunjuk, dan ٱلْكِتَـٰبُ ialah kata nama ber-Alif-Lam yang diterangkannya.',
        },
      },
      matching: {
        instruction: {
          'id-ID': 'Cocokkan kata-kata dari QS. Al-Baqarah 2:2 dengan maknanya:',
          'ms-MY': 'Padankan perkataan-perkataan daripada QS. al-Baqarah 2:2 dengan maknanya:',
        },
        pairs: [
          {
            id: 'w-dzalika',
            arabic: 'ذَٰلِكَ',
            transliteration: 'Dzalika',
            meaning: { 'id-ID': 'Itu (kata tunjuk kemuliaan)', 'ms-MY': 'Itu (kata tunjuk kemuliaan)' },
          },
          {
            id: 'w-alkitabu',
            arabic: 'ٱلْكِتَـٰبُ',
            transliteration: 'Al-Kitabu',
            meaning: { 'id-ID': 'Kitab (Al-Qur’an)', 'ms-MY': 'Kitab (al-Quran)' },
          },
          {
            id: 'w-ihdina',
            arabic: 'هُدًى',
            transliteration: 'Hudan',
            meaning: { 'id-ID': 'Petunjuk (akar ه-د-ي)', 'ms-MY': 'Petunjuk (akar ه-د-ي)' },
          },
        ],
      },
      roleIdentification: {
        question: {
          'id-ID': 'Akar kata ك - ت - ب pada ٱلْكِتَـٰبُ juga membentuk kata كُتِبَ dalam ayat puasa (QS. Al-Baqarah 2:183) yang bermakna...',
          'ms-MY': 'Akar perkataan ك - ت - ب pada ٱلْكِتَـٰبُ turut membentuk perkataan كُتِبَ dalam ayat puasa (QS. al-Baqarah 2:183) yang bermaksud...',
        },
        sentenceArabic: 'ذَٰلِكَ ٱلْكِتَـٰبُ',
        targetWordArabic: 'ٱلْكِتَـٰبُ',
        options: [
          {
            'id-ID': 'Telah diwajibkan / ditetapkan (dituliskan ketetapannya)',
            'ms-MY': 'Telah diwajibkan / ditetapkan (dituliskan ketetapannya)',
          },
          {
            'id-ID': 'Telah dibuka pintu rahmat',
            'ms-MY': 'Telah dibuka pintu rahmat',
          },
          {
            'id-ID': 'Telah selesai waktu ibadah',
            'ms-MY': 'Telah selesai waktu ibadah',
          },
        ],
        correctIndex: 0,
        feedback: {
          'id-ID': 'Tepat sekali! Mengenali akar kata ك-ت-ب membantu Anda memahami hubungan antara "Al-Kitab" dan "Kutiba ‘alaikumus-shiyam".',
          'ms-MY': 'Tepat sekali! Mengenali akar perkataan ك-ت-ب membantu anda memahami kaitan antara "Al-Kitab" dengan "Kutiba ‘alaikumus-siyam".',
        },
      },
    },
  },
];

export const CURRICULUM_LEVELS: CurriculumLevel[] = [
  ...EXTRA_CURRICULUM_LEVELS,
  {
    level: 1,
    pathwayId: 'understand-quran',
    title: {
      'id-ID': 'Tahap 1 · Kata & Makna dalam Konteks Ayat',
      'ms-MY': 'Peringkat 1 · Perkataan & Makna dalam Konteks Ayat',
    },
    description: {
      'id-ID': 'Mengenali kata benda, sifat kemuliaan Allah, dan kata depan dasar pada Surah Al-Fatihah.',
      'ms-MY': 'Mengenali kata nama, sifat kemuliaan Allah dan kata sendi asas dalam Surah al-Fatihah.',
    },
    learningOutcome: {
      'id-ID': 'Mengidentifikasi arti kontekstual 4 kata pembuka Al-Qur’an dan keluarga akar kata ر-ح-م.',
      'ms-MY': 'Mengenal pasti makna kontekstual 4 perkataan pembuka al-Quran dan keluarga akar ر-ح-م.',
    },
    lessonIds: ['lesson-ayah-1', 'lesson-ayah-1b'],
  },
  {
    level: 2,
    pathwayId: 'understand-quran',
    title: {
      'id-ID': 'Tahap 2 · Pembentuk Kalimat & Kepemilikan',
      'ms-MY': 'Peringkat 2 · Binaan Asas Ayat & Pemilikan',
    },
    description: {
      'id-ID': 'Memahami cara kerja kalimat nominal (Jumlah Ismiyyah), partikel kepemilikan لِ, dan bentuk jamak.',
      'ms-MY': 'Memahami cara binaan ayat namaan (Jumlah Ismiyyah), partikel pemilikan لِ dan bentuk jamak.',
    },
    learningOutcome: {
      'id-ID': 'Membedakan subjek kalimat (-u) dan kata setelah huruf depan (-i) pada QS. Al-Fatihah 1:2.',
      'ms-MY': 'Membezakan subjek ayat (-u) dan perkataan selepas kata sendi (-i) pada QS. al-Fatihah 1:2.',
    },
    lessonIds: ['lesson-ayah-2'],
  },
  {
    level: 3,
    pathwayId: 'understand-quran',
    title: {
      'id-ID': 'Tahap 3 · Keluarga Kata, Kata Tunjuk & Hubungan Antar-Surah',
      'ms-MY': 'Peringkat 3 · Keluarga Perkataan, Kata Tunjuk & Kaitan Antara Surah',
    },
    description: {
      'id-ID': 'Menelusuri kata tunjuk ذَٰلِكَ serta hubungan akar kata antara doa di Al-Fatihah dan jawaban di Al-Baqarah.',
      'ms-MY': 'Menelusuri kata tunjuk ذَٰلِكَ serta pertalian akar perkataan antara doa dalam al-Fatihah dengan jawapan dalam al-Baqarah.',
    },
    learningOutcome: {
      'id-ID': 'Memahami struktur frasa tunjuk dan akar kata ك-ت-ب serta ه-د-ي pada QS. Al-Baqarah 2:2.',
      'ms-MY': 'Memahami binaan frasa tunjuk dan akar perkataan ك-ت-ب serta ه-د-ي pada QS. al-Baqarah 2:2.',
    },
    lessonIds: ['lesson-ayah-3'],
  },
  {
    level: 1,
    pathwayId: 'quran-reading',
    title: {
      'id-ID': 'Modul Bacaan 1 · Harakat, Tasydid & Alif-Lam Syamsiyah',
      'ms-MY': 'Modul Bacaan 1 · Baris Asas, Sabdu & Alif-Lam Syamsiyyah',
    },
    description: {
      'id-ID': 'Latihan pelafalan harakat kasrah, peleburan Al-Syamsiyah, dan Lam Jalalah tipis.',
      'ms-MY': 'Latihan sebutan baris kasrah, peleburan Al-Syamsiyyah dan Lam Jalalah nipis.',
    },
    learningOutcome: {
      'id-ID': 'Membaca Basmalah dengan peleburan huruf Ra bertasydid dan panjang mad 2 harakat yang tepat.',
      'ms-MY': 'Membaca Basmalah dengan peleburan huruf Ra bersabdu dan panjang mad 2 harakat yang tepat.',
    },
    lessonIds: ['lesson-tajwid-1'],
  },
  {
    level: 2,
    pathwayId: 'quran-reading',
    title: {
      'id-ID': 'Modul Bacaan 2 · Alif-Lam Qamariyah & Makhraj Tenggorokan',
      'ms-MY': 'Modul Bacaan 2 · Alif-Lam Qamariyyah & Makhraj Kerongkong',
    },
    description: {
      'id-ID': 'Membedakan bunyi huruf ح dan ع serta membaca jelas Mim sukun (Izhar Syafawi).',
      'ms-MY': 'Membezakan sebutan huruf ح dan ع serta menyebut jelas Mim sukun (Izhar Syafawi).',
    },
    learningOutcome: {
      'id-ID': 'Melafalkan QS. Al-Fatihah 1:2 tanpa memantulkan huruf Lam sukun dan Mim sukun.',
      'ms-MY': 'Menyebut QS. al-Fatihah 1:2 tanpa melantunkan huruf Lam sukun dan Mim sukun.',
    },
    lessonIds: ['lesson-tajwid-2'],
  },
  {
    level: 1,
    pathwayId: 'prayer-comprehension',
    title: {
      'id-ID': 'Modul Salat 1 · Dialog Inti Salat & Permohonan Hidayah',
      'ms-MY': 'Modul Solat 1 · Dialog Inti Solat & Permohonan Hidayah',
    },
    description: {
      'id-ID': 'Memahami perubahan kata ganti sapaan langsung "Engkau" (إِيَّاكَ) dan kata kerja "Kami" (نَعْبُدُ) di dalam salat.',
      'ms-MY': 'Memahami pertukaran kata ganti nama sapaan langsung "Engkau" (إِيَّاكَ) dan kata kerja "Kami" (نَعْبُدُ) di dalam solat.',
    },
    learningOutcome: {
      'id-ID': 'Menghayati makna setiap kata pada QS. Al-Fatihah 1:5–6 saat berdiri dalam salat.',
      'ms-MY': 'Menghayati makna setiap perkataan pada QS. al-Fatihah 1:5–6 ketika berdiri dalam solat.',
    },
    lessonIds: ['lesson-prayer-1'],
  },
];

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'art-root-system',
    category: 'vocabulary',
    title: {
      'id-ID': 'Mengapa Mengenal Akar Kata 3 Huruf Memudahkan Kita Memahami Al-Qur’an?',
      'ms-MY': 'Mengapa Mengenali Akar Perkataan 3 Huruf Memudahkan Kita Memahami al-Quran?',
    },
    summary: {
      'id-ID':
        'Pelajari bagaimana satu akar kata seperti ر-ح-م atau ع-ل-م dapat membantu Anda mengenali puluhan kata turunan di berbagai surah tanpa menghafal dari nol.',
      'ms-MY':
        'Pelajari bagaimana satu akar perkataan seperti ر-ح-م atau ع-ل-م membantu anda mengenali puluhan perkataan terbitan dalam pelbagai surah tanpa menghafal daripada kosong.',
    },
    readTimeMinutes: 4,
    sourceAttribution: {
      'id-ID': 'Tim Kurikulum Bahasa Arab Faham Ayat · Merujuk pada Pengantar Ilmu Sharaf & Leksikon Al-Qur’an',
      'ms-MY': 'Pasukan Kurikulum Bahasa Arab Faham Ayat · Merujuk kepada Pengantar Ilmu Saraf & Leksikon al-Quran',
    },
    arabicExcerpt: 'رَحْمَةٌ · ٱلرَّحْمَـٰنِ · ٱلرَّحِيمِ · ٱرْحَمْ',
    bodyParagraphs: [
      {
        'id-ID':
          'Dalam bahasa Arab, sebagian besar kosakata dibangun di atas pondasi tiga huruf konsonan yang disebut akar kata tsulatsi. Ketika Anda mengenali ketiga huruf akar tersebut, Anda memegang kunci makna dasar dari seluruh keluarga katanya.',
        'ms-MY':
          'Dalam bahasa Arab, sebahagian besar kosa kata dibina di atas asas tiga huruf konsonan yang dikenali sebagai akar perkataan tsulatsi. Apabila anda mengenali ketiga-tiga huruf akar tersebut, anda memegang kunci makna asas bagi seluruh keluarga perkataannya.',
      },
      {
        'id-ID':
          'Sebagai contoh, akar kata ع - ب - د (ain-ba-dal) membawa gagasan inti tentang pengabdian dan kerendahan hati. Ketika diberi awalan نَـ menjadi نَعْبُدُ (kami menyembah), ketika diubah menjadi kata benda pelaku menjadi عَابِدٌ (orang yang beribadah), dan bentuk jamaknya di Surah Al-Kafirun adalah عَابِدُونَ.',
        'ms-MY':
          'Sebagai contoh, akar perkataan ع - ب - د (ain-ba-dal) membawa gagasan teras tentang pengabdian dan kerendahan hati. Apabila ditambah awalan نَـ ia menjadi نَعْبُدُ (kami menyembah), apabila dibentuk sebagai pelaku ia menjadi عَابِدٌ (orang yang beribadah), dan bentuk jamaknya dalam Surah al-Kafirun ialah عَابِدُونَ.',
      },
      {
        'id-ID':
          'Penting untuk diingat: mengetahui akar kata membantu kita melihat hubungan makna, tetapi arti tepat sebuah kata di dalam ayat tetap harus merujuk pada konteks kalimat dan terjemahan/tafsir yang muktabar.',
        'ms-MY':
          'Penting untuk diingati: mengetahui akar perkataan membantu kita melihat pertalian makna, namun pengertian tepat sesuatu perkataan di dalam ayat tetap perlu merujuk kepada konteks ayat dan terjemahan/tafsir yang muktabar.',
      },
    ],
    relatedPathwayId: 'understand-quran',
  },
  {
    id: 'art-particles-guide',
    category: 'grammar',
    title: {
      'id-ID': 'Mengenal Kata Depan (Harf Jar) yang Paling Sering Muncul di Setiap Halaman Mushaf',
      'ms-MY': 'Mengenali Kata Sendi (Harf Jar) yang Paling Kerap Muncul pada Setiap Halaman Mushaf',
    },
    summary: {
      'id-ID':
        'Panduan praktis memahami partikel penghubung seperti بِ (dengan), لِ (bagi), فِي (di dalam), dan مِنْ (dari) beserta contoh ayatnya.',
      'ms-MY':
        'Panduan amali memahami partikel penghubung seperti بِ (dengan), لِ (bagi), فِي (di dalam) dan مِنْ (daripada) beserta contoh ayatnya.',
    },
    readTimeMinutes: 5,
    sourceAttribution: {
      'id-ID': 'Materi Dasar Nahwu Al-Qur’an · Rujukan Ayat Kemenag RI',
      'ms-MY': 'Bahan Asas Nahu al-Quran · Rujukan Ayat JAKIM Malaysia',
    },
    arabicExcerpt: 'بِسْمِ ٱللَّهِ · لِلَّهِ · لَا رَيْبَ فِيهِ',
    bodyParagraphs: [
      {
        'id-ID':
          'Saat membuka halaman Al-Qur’an mana pun, Anda akan menjumpai kata-kata pendek seperti فِي (di dalam), مِنْ (dari), إِلَىٰ (ke/kepada), بِ (dengan), dan لِ (bagi/milik). Dalam tata bahasa Arab, kelompok kata ini disebut Harf Jar.',
        'ms-MY':
          'Apabila membuka mana-mana halaman al-Quran, anda akan menemui perkataan-perkataan pendek seperti فِي (di dalam), مِنْ (daripada), إِلَىٰ (kepada), بِ (dengan) dan لِ (bagi/milik). Dalam tatabahasa Arab, kumpulan perkataan ini dipanggil Harf Jar.',
      },
      {
        'id-ID':
          'Kabar baiknya: kata-kata depan ini bentuknya tetap dan sering bergabung langsung dengan kata ganti. Contohnya pada QS. Al-Baqarah 2:2, kata فِي (di dalam) bergabung dengan هِ (nya) menjadi فِيهِ ("padanya / di dalamnya").',
        'ms-MY':
          'Berita baiknya: kata-kata sendi ini mempunyai bentuk yang tetap dan sering bercantum terus dengan kata ganti nama. Contohnya dalam QS. al-Baqarah 2:2, perkataan فِي (di dalam) bercantum dengan هِ (nya) menjadi فِيهِ ("padanya / di dalamnya").',
      },
    ],
    relatedPathwayId: 'understand-quran',
  },
  {
    id: 'art-prayer-presence',
    category: 'prayer',
    title: {
      'id-ID': 'Menghadirkan Pemahaman Bahasa Arab di Dalam Bacaan Salat Sehari-hari',
      'ms-MY': 'Menghadirkan Kefahaman Bahasa Arab di Dalam Bacaan Solat Harian',
    },
    summary: {
      'id-ID':
        'Bagaimana mengenali kata ganti dan kata kerja permohonan dalam Surah Al-Fatihah dan zikir rukuk/sujud membantu menjaga kekhusyukan.',
      'ms-MY':
        'Bagaimana mengenali kata ganti nama dan kata kerja permohonan dalam Surah al-Fatihah serta zikir rukuk/sujud membantu memelihara kekhusyukan.',
    },
    readTimeMinutes: 5,
    sourceAttribution: {
      'id-ID': 'Modul Pemahaman Bacaan Salat · Rujukan Hadis Shahih Muslim No. 395',
      'ms-MY': 'Modul Kefahaman Bacaan Solat · Selaras pendekatan Kursus Bahasa Arab Memahami al-Quran & Sahih Muslim No. 395',
    },
    arabicExcerpt: 'سَمِعَ ٱللَّهُ لِمَنْ حَمِدَهُ',
    bodyParagraphs: [
      {
        'id-ID':
          'Banyak Muslim telah menghafal bacaan salat sejak kecil, tetapi belum sempat mempelajari arti per kata dari kalimat yang diucapkan tujuh belas rakaat sehari. Padahal, struktur bahasa bacaan salat sangat erat kaitannya dengan Surah Al-Fatihah.',
        'ms-MY':
          'Ramai Muslim telah menghafal bacaan solat sejak kecil, namun belum berkesempatan mempelajari makna perkataan demi perkataan bagi bacaan yang dilafazkan tujuh belas rakaat sehari. Walhal, struktur bahasa bacaan solat berkait rapat dengan Surah al-Fatihah.',
      },
      {
        'id-ID':
          'Misalnya, setelah Anda mengenal kata ٱلْحَمْدُ (segala puji) dari akar ح-م-د di Surah Al-Fatihah, Anda langsung mengenali kata حَمِدَهُ (memuji-Nya) saat bangkit dari rukuk membaca: سَمِعَ ٱللَّهُ لِمَنْ حَمِدَهُ ("Allah mendengar orang yang memuji-Nya").',
        'ms-MY':
          'Misalnya, selepas anda mengenali perkataan ٱلْحَمْدُ (segala puji) daripada akar ح-م-د dalam Surah al-Fatihah, anda terus mengenali perkataan حَمِدَهُ (memuji-Nya) ketika bangkit daripada rukuk membaca: سَمِعَ ٱللَّهُ لِمَنْ حَمِدَهُ ("Allah mendengar orang yang memuji-Nya").',
      },
    ],
    relatedPathwayId: 'prayer-comprehension',
  },
  {
    id: 'art-talaqqi-ethics',
    category: 'tajwid',
    title: {
      'id-ID': 'Peran Teknologi Digital dan Pentingnya Talaqqi Bersama Guru dalam Belajar Tajwid',
      'ms-MY': 'Peranan Teknologi Digital dan Kepentingan Talaqqi Bersama Guru dalam Mempelajari Tajwid',
    },
    summary: {
      'id-ID':
        'Memahami apa yang dapat dibantu oleh latihan mandiri berbasis web dan kapan Anda memerlukan koreksi langsung dari pengajar Al-Qur’an.',
      'ms-MY':
        'Memahami perkara yang boleh dibantu oleh latihan kendiri berasaskan web dan bilakah anda memerlukan semakan langsung daripada guru al-Quran.',
    },
    readTimeMinutes: 4,
    sourceAttribution: {
      'id-ID': 'Dewan Peninjau Metodologi Faham Ayat',
      'ms-MY': 'Panel Semakan Metodologi Faham Ayat',
    },
    arabicExcerpt: 'وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا',
    bodyParagraphs: [
      {
        'id-ID':
          'Belajar mandiri menggunakan audio terverifikasi dan visualisasi tajwid sangat membantu untuk mengenali tanda waqaf, panjang-pendek mad, serta membedakan Alif-Lam Syamsiyah dan Qamariyah sebelum hadir di majelis ilmu.',
        'ms-MY':
          'Pembelajaran kendiri menggunakan audio yang disahkan dan visualisasi tajwid amat membantu untuk mengenali tanda waqaf, kadar panjang mad serta membezakan Alif-Lam Syamsiyyah dan Qamariyyah sebelum menghadiri kelas pengajian.',
      },
      {
        'id-ID':
          'Namun, ketepatan makharijul huruf dan sifat-sifat huruf membutuhkan pendengaran dan koreksi langsung (musyafahah/talaqqi) dari guru yang kompeten. Karena itu, Faham Ayat tidak pernah mengklaim bahwa algoritma otomatis dapat menggantikan peran guru Al-Qur’an.',
        'ms-MY':
          'Walau bagaimanapun, ketepatan makhraj huruf dan sifat-sifat huruf memerlukan pendengaran serta teguran langsung (musyafahah/talaqqi) daripada guru yang bertauliah. Oleh sebab itu, Faham Ayat tidak sekali-kali mendakwa bahawa algoritma automatik boleh menggantikan peranan guru al-Quran.',
      },
    ],
    relatedPathwayId: 'quran-reading',
  },
];
