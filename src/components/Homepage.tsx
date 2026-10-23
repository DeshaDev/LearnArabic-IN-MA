import React, { useState } from 'react';
import { EditorialArticle, InfoPageId, LocaleCode, PathwayId } from '../types/learning';
import { LOCALES } from '../data/locales';
import { EDITORIAL_ARTICLES } from '../data/curriculum';
import { HeroPreview } from './HeroPreview';
import { SampleLessonSection } from './SampleLessonSection';
import { AppScreen } from './Header';
import {
  ArrowRight,
  BookOpen,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Search,
  Globe,
  Calendar,
  FileText,
} from 'lucide-react';

interface HomepageProps {
  locale: LocaleCode;
  onLocaleChange: (locale: LocaleCode) => void;
  bookmarkedWordIds: string[];
  onToggleBookmark: (wordId: string) => void;
  onSelectPathway: (pathwayId: PathwayId) => void;
  onStartLesson: (lessonId: string) => void;
  onOpenOnboarding: () => void;
  onNavigate: (screen: AppScreen) => void;
  ramadanModeEnabled: boolean;
  onToggleRamadanMode: () => void;
  onOpenArticle: (article: EditorialArticle) => void;
  onOpenInfoPage: (page: InfoPageId) => void;
}

export const Homepage: React.FC<HomepageProps> = ({
  locale,
  onLocaleChange,
  bookmarkedWordIds,
  onToggleBookmark,
  onSelectPathway,
  onStartLesson,
  onOpenOnboarding,
  onNavigate,
  ramadanModeEnabled,
  onToggleRamadanMode,
  onOpenArticle,
  onOpenInfoPage,
}) => {
  const dict = LOCALES[locale];
  const [resourceFilter, setResourceFilter] = useState<string>('all');
  const [resourceQuery, setResourceQuery] = useState<string>('');

  const filteredArticles = EDITORIAL_ARTICLES.filter((art) => {
    if (resourceFilter !== 'all' && art.category !== resourceFilter) {
      return false;
    }
    if (!resourceQuery.trim()) return true;
    const q = resourceQuery.toLowerCase();
    return (
      art.title[locale].toLowerCase().includes(q) ||
      art.summary[locale].toLowerCase().includes(q)
    );
  });

  const scrollToSample = () => {
    const el = document.getElementById('pelajaran-contoh');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* SECTION 2: HERO */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-semibold text-[#145A4A] tracking-wide">
                {dict.hero.kicker}
              </p>
              <h1
                className="mt-3 font-bold text-[#1C2724] tracking-tight text-balance"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 1.15 }}
              >
                {dict.hero.headline}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#1C2724]/80 leading-relaxed max-w-xl">
                {dict.hero.supporting}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={onOpenOnboarding}
                  className="px-5 py-3 text-sm font-semibold text-white bg-[#145A4A] hover:bg-[#10483B] rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>{dict.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollToSample}
                  className="px-5 py-3 text-sm font-semibold text-[#1C2724] bg-white hover:bg-[#DDEBE3]/60 border border-[#1C2724]/15 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  {dict.hero.secondaryCta}
                </button>
              </div>

              <p className="mt-4 text-xs text-[#1C2724]/65">
                {dict.hero.noAccountNote}
              </p>

              {/* Unboxed Editorial Trust Metadata */}
              <div className="mt-8 pt-6 border-t border-[#1C2724]/10 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#1C2724]/70">
                <span>
                  {locale === 'id-ID'
                    ? 'Rujukan Terjemahan Kemenag RI (2019)'
                    : 'Rujukan Tafsir Pimpinan Ar-Rahman JAKIM'}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {locale === 'id-ID'
                    ? 'Kurikulum 3 Jalur Terpisah'
                    : 'Kurikulum 3 Laluan Berasingan'}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {locale === 'id-ID'
                    ? 'Ulasan Berjarak (Spaced Practice)'
                    : 'Ulang Kaji Berjarak (Spaced Practice)'}
                </span>
              </div>
            </div>

            {/* Right Column: Genuine Interactive Product Preview */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <HeroPreview
                locale={locale}
                bookmarkedWordIds={bookmarkedWordIds}
                onToggleBookmark={onToggleBookmark}
                onOpenFullLesson={() => onStartLesson('lesson-ayah-1')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: A PERSONAL STARTING POINT (3 PATHWAYS) */}
      <section
        id="jalur-belajar"
        aria-labelledby="starting-point-heading"
        className="py-16 sm:py-20 border-t border-[#1C2724]/10"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#145A4A]">
                {dict.startingPoint.kicker}
              </p>
              <h2
                id="starting-point-heading"
                className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-2 text-balance"
              >
                {dict.startingPoint.headline}
              </h2>
              <p className="text-sm sm:text-base text-[#1C2724]/75 mt-3 leading-relaxed">
                {dict.startingPoint.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenOnboarding}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#145A4A] bg-[#DDEBE3] hover:bg-[#cde0d5] rounded-xl transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <Compass className="w-4 h-4" />
              <span>{dict.startingPoint.diagnosticCta}</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Path A Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#145A4A]/25 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-[#145A4A]">
                  {dict.startingPoint.paths.understandQuran.tag}
                </div>
                <h3 className="text-xl font-bold text-[#1C2724] mt-2">
                  {dict.startingPoint.paths.understandQuran.title}
                </h3>
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl text-[#145A4A] my-3 py-2 px-3 bg-[#F7F5EF] rounded-lg text-center"
                >
                  بِسْمِ · ٱلْحَمْدُ · ذَٰلِكَ ٱلْكِتَـٰبُ
                </p>
                <p className="text-sm text-[#1C2724]/80 leading-relaxed">
                  {dict.startingPoint.paths.understandQuran.description}
                </p>
                <p className="text-xs text-[#1C2724]/70 mt-4 pt-3 border-t border-[#1C2724]/8">
                  {dict.startingPoint.paths.understandQuran.outcome}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectPathway('understand-quran')}
                className="mt-6 w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#145A4A] hover:bg-[#10483B] rounded-xl transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>{dict.startingPoint.paths.understandQuran.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Path B Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#1C2724]/12 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-[#1C2724]/65">
                  {dict.startingPoint.paths.quranReading.tag}
                </div>
                <h3 className="text-xl font-bold text-[#1C2724] mt-2">
                  {dict.startingPoint.paths.quranReading.title}
                </h3>
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl text-[#145A4A] my-3 py-2 px-3 bg-[#F7F5EF] rounded-lg text-center"
                >
                  أَ إِ أُ · ٱلرَّحْمَـٰنِ · ٱلْحَمْدُ
                </p>
                <p className="text-sm text-[#1C2724]/80 leading-relaxed">
                  {dict.startingPoint.paths.quranReading.description}
                </p>
                <p className="text-xs text-[#1C2724]/70 mt-4 pt-3 border-t border-[#1C2724]/8">
                  {dict.startingPoint.paths.quranReading.outcome}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectPathway('quran-reading')}
                className="mt-6 w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#145A4A] bg-[#F7F5EF] hover:bg-[#DDEBE3] border border-[#145A4A]/20 rounded-xl transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>{dict.startingPoint.paths.quranReading.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Path C Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#1C2724]/12 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-[#1C2724]/65">
                  {dict.startingPoint.paths.prayerComprehension.tag}
                </div>
                <h3 className="text-xl font-bold text-[#1C2724] mt-2">
                  {dict.startingPoint.paths.prayerComprehension.title}
                </h3>
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl text-[#145A4A] my-3 py-2 px-3 bg-[#F7F5EF] rounded-lg text-center"
                >
                  إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
                </p>
                <p className="text-sm text-[#1C2724]/80 leading-relaxed">
                  {dict.startingPoint.paths.prayerComprehension.description}
                </p>
                <p className="text-xs text-[#1C2724]/70 mt-4 pt-3 border-t border-[#1C2724]/8">
                  {dict.startingPoint.paths.prayerComprehension.outcome}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectPathway('prayer-comprehension')}
                className="mt-6 w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#145A4A] bg-[#F7F5EF] hover:bg-[#DDEBE3] border border-[#145A4A]/20 rounded-xl transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>{dict.startingPoint.paths.prayerComprehension.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: EXPERIENCE ONE LESSON (INTERACTIVE SAMPLE) */}
      <SampleLessonSection
        locale={locale}
        bookmarkedWordIds={bookmarkedWordIds}
        onToggleBookmark={onToggleBookmark}
        onStartLesson={onStartLesson}
      />

      {/* SECTION 5: HOW LEARNING WORKS */}
      <section
        id="metode-belajar"
        aria-labelledby="how-it-works-heading"
        className="py-16 sm:py-20 border-t border-[#1C2724]/10"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#145A4A]">
              {dict.howItWorks.kicker}
            </p>
            <h2
              id="how-it-works-heading"
              className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-2 text-balance"
            >
              {dict.howItWorks.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#1C2724]/75 mt-3 leading-relaxed">
              {dict.howItWorks.subtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.howItWorks.steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-[#1C2724]/10 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#145A4A]">
                    {step.number}
                  </div>
                  <h3 className="text-base font-bold text-[#1C2724] mt-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#1C2724]/75 mt-2.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <p className="text-xs text-[#1C2724]/60 mt-4 pt-3 border-t border-[#1C2724]/8">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: YOUR LEARNING JOURNEY (CURRICULUM MAP TABLE) */}
      <section
        aria-labelledby="journey-map-heading"
        className="py-16 sm:py-20 border-t border-[#1C2724]/10 bg-white"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#145A4A]">
                {dict.journeyMap.kicker}
              </p>
              <h2
                id="journey-map-heading"
                className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-2 text-balance"
              >
                {dict.journeyMap.headline}
              </h2>
              <p className="text-sm sm:text-base text-[#1C2724]/75 mt-3 leading-relaxed">
                {dict.journeyMap.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('course-map')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#145A4A] bg-[#F7F5EF] hover:bg-[#DDEBE3] border border-[#1C2724]/12 rounded-xl transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                {locale === 'id-ID'
                  ? 'Buka Peta Kurikulum Interaktif'
                  : 'Buka Peta Kurikulum Interaktif'}
              </span>
            </button>
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#1C2724]/12">
            <table className="w-full text-left border-collapse bg-[#F7F5EF]/50">
              <thead>
                <tr className="border-b border-[#1C2724]/12 bg-[#DDEBE3]/50 text-xs font-semibold text-[#1C2724]">
                  <th className="py-3.5 px-4 sm:px-5">
                    {dict.journeyMap.tableHeaders.stage}
                  </th>
                  <th className="py-3.5 px-4 sm:px-5">
                    {dict.journeyMap.tableHeaders.focus}
                  </th>
                  <th className="py-3.5 px-4 sm:px-5">
                    {dict.journeyMap.tableHeaders.outcome}
                  </th>
                  <th className="py-3.5 px-4 sm:px-5">
                    {dict.journeyMap.tableHeaders.prerequisite}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C2724]/10 text-xs sm:text-sm">
                {dict.journeyMap.stages.map((row, idx) => (
                  <tr key={idx} className="bg-white hover:bg-[#F7F5EF]/80 transition-colors">
                    <td className="py-4 px-4 sm:px-5 font-bold text-[#145A4A] whitespace-nowrap">
                      {row.stage}
                    </td>
                    <td className="py-4 px-4 sm:px-5 text-[#1C2724]/85">
                      {row.focus}
                    </td>
                    <td className="py-4 px-4 sm:px-5 text-[#1C2724]/80">
                      {row.outcome}
                    </td>
                    <td className="py-4 px-4 sm:px-5 text-xs text-[#1C2724]/65">
                      {row.prerequisite}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 7: MADE FOR DAILY LIFE + SEASONAL RAMADAN MODULE */}
      <section
        aria-labelledby="daily-life-heading"
        className="py-16 sm:py-20 border-t border-[#1C2724]/10"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#145A4A]">
              {dict.dailyLife.kicker}
            </p>
            <h2
              id="daily-life-heading"
              className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-2 text-balance"
            >
              {dict.dailyLife.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#1C2724]/75 mt-3 leading-relaxed">
              {dict.dailyLife.subtitle}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.dailyLife.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#1C2724]/10"
              >
                <h3 className="text-base font-bold text-[#1C2724]">
                  {card.title}
                </h3>
                <p className="text-sm text-[#1C2724]/75 mt-2.5 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Optional Seasonal Ramadan Learning Series Banner */}
          <div className="mt-8 bg-white rounded-2xl p-6 sm:p-7 border border-[#D8A75B]/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#145A4A]">
                <Calendar className="w-3.5 h-3.5 text-[#D8A75B]" />
                <span>{dict.dailyLife.ramadanBanner.tag}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1C2724] mt-1.5">
                {dict.dailyLife.ramadanBanner.title}
              </h3>
              <p className="text-sm text-[#1C2724]/75 mt-1.5 leading-relaxed">
                {dict.dailyLife.ramadanBanner.description}
              </p>
              {ramadanModeEnabled && (
                <div className="mt-4 p-4 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#145A4A]">
                      {locale === 'id-ID'
                        ? 'Kata Kunci Hari Ini · QS. Al-Baqarah 2:183'
                        : 'Perkataan Utama Hari Ini · QS. al-Baqarah 2:183'}
                    </span>
                    <span dir="rtl" lang="ar" className="font-arabic text-xl text-[#145A4A] font-bold">
                      كُتِبَ عَلَيْكُمُ ٱلصِّيَامُ · لَعَلَّكُمْ تَتَّقُونَ
                    </span>
                  </div>
                  <p className="text-xs text-[#1C2724]/80 mt-1.5">
                    {locale === 'id-ID'
                      ? 'كُتِبَ (Kutiba — Telah diwajibkan/ditetapkan, dari akar ك-ت-ب) · تَتَّقُونَ (Tattaqun — Agar kalian bertakwa, dari akar و-ق-ي).'
                      : 'كُتِبَ (Kutiba — Telah diwajibkan/ditetapkan, daripada akar ك-ت-ب) · تَتَّقُونَ (Tattaqun — Supaya kamu bertaqwa, daripada akar و-ق-ي).'}
                  </p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onToggleRamadanMode}
              aria-pressed={ramadanModeEnabled}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                ramadanModeEnabled
                  ? 'bg-[#145A4A] text-white border-[#145A4A]'
                  : 'bg-[#F7F5EF] text-[#1C2724] border-[#1C2724]/15 hover:bg-[#DDEBE3]'
              }`}
            >
              {ramadanModeEnabled
                ? locale === 'id-ID'
                  ? 'Sembunyikan Pratinjau Ramadan'
                  : 'Sembunyikan Pratonton Ramadan'
                : dict.dailyLife.ramadanBanner.toggleLabel}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8: LEARNING RESOURCES */}
      <section
        id="materi-pembelajaran"
        aria-labelledby="resources-heading"
        className="py-16 sm:py-20 border-t border-[#1C2724]/10 bg-white"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#145A4A]">
                {locale === 'id-ID'
                  ? 'Pustaka Materi & Panduan Bahasa'
                  : 'Pustaka Bahan & Panduan Bahasa'}
              </p>
              <h2
                id="resources-heading"
                className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-2 text-balance"
              >
                {locale === 'id-ID'
                  ? 'Artikel singkat tentang akar kata, partikel Al-Qur’an, dan adab belajar'
                  : 'Rencana ringkas tentang akar perkataan, partikel al-Quran dan adab belajar'}
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <label htmlFor="home-resource-search" className="sr-only">
                {locale === 'id-ID' ? 'Cari materi' : 'Cari bahan'}
              </label>
              <Search className="w-4 h-4 text-[#1C2724]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="home-resource-search"
                type="search"
                value={resourceQuery}
                onChange={(e) => setResourceQuery(e.target.value)}
                placeholder={
                  locale === 'id-ID'
                    ? 'Cari topik (mis. akar kata, harf)...'
                    : 'Cari topik (cth. akar kata, harf)...'
                }
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F7F5EF] border border-[#1C2724]/15 rounded-xl focus:outline-2 focus:outline-[#145A4A]"
              />
            </div>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-6 flex items-center gap-1.5 p-1 bg-[#F7F5EF] rounded-xl w-fit border border-[#1C2724]/8 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: locale === 'id-ID' ? 'Semua Materi' : 'Semua Bahan' },
              { id: 'vocabulary', label: locale === 'id-ID' ? 'Akar & Kosakata' : 'Akar & Kosa Kata' },
              { id: 'grammar', label: locale === 'id-ID' ? 'Struktur Kalimat' : 'Struktur Ayat' },
              { id: 'prayer', label: locale === 'id-ID' ? 'Bacaan Salat' : 'Bacaan Solat' },
              { id: 'tajwid', label: 'Tajwid & Talaqqi' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setResourceFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  resourceFilter === tab.id
                    ? 'bg-white text-[#145A4A] shadow-xs font-semibold'
                    : 'text-[#1C2724]/70 hover:text-[#1C2724]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-[#F7F5EF] rounded-2xl p-6 border border-[#1C2724]/10 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs text-[#1C2724]/60 flex items-center gap-2">
                    <span className="font-semibold text-[#145A4A]">
                      {article.category.toUpperCase()}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {article.readTimeMinutes}{' '}
                      {locale === 'id-ID' ? 'menit baca' : 'minit bacaan'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1C2724] mt-2">
                    {article.title[locale]}
                  </h3>
                  {article.arabicExcerpt && (
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-xl text-[#145A4A] my-2.5 bg-white px-3.5 py-2 rounded-lg border border-[#1C2724]/8"
                    >
                      {article.arabicExcerpt}
                    </p>
                  )}
                  <p className="text-sm text-[#1C2724]/80 mt-2 leading-relaxed">
                    {article.summary[locale]}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1C2724]/10 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#1C2724]/60 truncate">
                    {article.sourceAttribution[locale]}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#145A4A] hover:underline whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>
                      {locale === 'id-ID' ? 'Baca Selengkapnya' : 'Baca Sepenuhnya'}
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: TRUST AND EDUCATIONAL INTEGRITY */}
      <section
        id="integritas-keilmuan"
        aria-labelledby="trust-heading"
        className="py-16 sm:py-20 border-t border-[#1C2724]/10"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#145A4A]">
              {dict.trustSection.kicker}
            </p>
            <h2
              id="trust-heading"
              className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-2 text-balance"
            >
              {dict.trustSection.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#1C2724]/75 mt-3 leading-relaxed">
              {dict.trustSection.subtitle}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.trustSection.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#1C2724]/10 flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#145A4A]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>0{idx + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1C2724] mt-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#1C2724]/80 mt-2 leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
                <p className="text-xs text-[#1C2724]/60 mt-4 pt-3 border-t border-[#1C2724]/8">
                  {pillar.sourceNote}
                </p>
              </div>
            ))}
          </div>

          {/* Clear Scope Boundary Box */}
          <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#1C2724]/12">
            <h3 className="text-base sm:text-lg font-bold text-[#1C2724]">
              {dict.trustSection.boundaryTitle}
            </h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-bold text-[#145A4A] mb-2.5">
                  {locale === 'id-ID'
                    ? 'Fokus Pengajaran Faham Ayat'
                    : 'Fokus Pengajaran Faham Ayat'}
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#1C2724]/85">
                  {dict.trustSection.whatWeTeach.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#145A4A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold text-[#1C2724]/70 mb-2.5">
                  {locale === 'id-ID'
                    ? 'Batasan yang Kami Jaga dengan Jujur'
                    : 'Sempadan yang Kami Pelihara dengan Jujur'}
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#1C2724]/75">
                  {dict.trustSection.whatWeDoNotClaim.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-[#1C2724]/50 shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA AND FOOTER */}
      <footer className="bg-[#1C2724] text-[#F7F5EF] pt-16 pb-12 border-t border-[#1C2724]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Final CTA Banner */}
          <div className="bg-[#145A4A] rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white text-balance">
                {dict.footer.finalCtaHeadline}
              </h2>
              <p className="text-sm text-[#DDEBE3] mt-2 leading-relaxed">
                {dict.footer.finalCtaSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenOnboarding}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#1C2724] bg-[#F7F5EF] hover:bg-white rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                {dict.hero.primaryCta}
              </button>
              <button
                type="button"
                onClick={() => onStartLesson('lesson-ayah-1')}
                className="px-4 py-3 text-xs sm:text-sm font-semibold text-white border border-white/30 hover:bg-white/10 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                {dict.sampleLesson.openFullExplorer}
              </button>
            </div>
          </div>

          {/* Footer Links & Locale Switcher */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <div className="text-lg font-bold text-white">Faham Ayat</div>
              <p className="text-xs sm:text-sm text-[#F7F5EF]/75 mt-2 max-w-sm leading-relaxed">
                {dict.footer.tagline}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#DDEBE3]" />
                <button
                  type="button"
                  onClick={() => onLocaleChange('id-ID')}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    locale === 'id-ID'
                      ? 'bg-[#DDEBE3] text-[#1C2724] font-semibold'
                      : 'text-[#F7F5EF]/75 hover:text-white'
                  }`}
                >
                  Bahasa Indonesia (/id/)
                </button>
                <button
                  type="button"
                  onClick={() => onLocaleChange('ms-MY')}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    locale === 'ms-MY'
                      ? 'bg-[#DDEBE3] text-[#1C2724] font-semibold'
                      : 'text-[#F7F5EF]/75 hover:text-white'
                  }`}
                >
                  Bahasa Melayu (/my/)
                </button>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
              <div className="space-y-2.5">
                <div className="font-semibold text-white">
                  {locale === 'id-ID' ? 'Jalur Belajar' : 'Laluan Pembelajaran'}
                </div>
                <ul className="space-y-2 text-[#F7F5EF]/75">
                  <li>
                    <button
                      type="button"
                      onClick={() => onSelectPathway('understand-quran')}
                      className="hover:text-white text-left"
                    >
                      {dict.startingPoint.paths.understandQuran.title}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onSelectPathway('quran-reading')}
                      className="hover:text-white text-left"
                    >
                      {dict.startingPoint.paths.quranReading.title}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onSelectPathway('prayer-comprehension')}
                      className="hover:text-white text-left"
                    >
                      {dict.startingPoint.paths.prayerComprehension.title}
                    </button>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <div className="font-semibold text-white">
                  {locale === 'id-ID' ? 'Kurikulum & Sumber' : 'Kurikulum & Sumber'}
                </div>
                <ul className="space-y-2 text-[#F7F5EF]/75">
                  <li>
                    <button
                      type="button"
                      onClick={() => onOpenInfoPage('about')}
                      className="hover:text-white text-left"
                    >
                      {dict.footer.links.about}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onOpenInfoPage('curriculum')}
                      className="hover:text-white text-left"
                    >
                      {dict.footer.links.curriculum}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onOpenInfoPage('sources')}
                      className="hover:text-white text-left"
                    >
                      {dict.footer.links.sources}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigate('vocabulary')}
                      className="hover:text-white text-left"
                    >
                      {dict.nav.vocabulary}
                    </button>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <div className="font-semibold text-white">
                  {locale === 'id-ID' ? 'Bantuan & Kebijakan' : 'Bantuan & Dasar'}
                </div>
                <ul className="space-y-2 text-[#F7F5EF]/75">
                  <li>
                    <button
                      type="button"
                      onClick={() => onOpenInfoPage('faq')}
                      className="hover:text-white text-left"
                    >
                      {dict.footer.links.faq}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onOpenInfoPage('contact')}
                      className="hover:text-white text-left"
                    >
                      {dict.footer.links.contact}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onOpenInfoPage('privacy')}
                      className="hover:text-white text-left"
                    >
                      {dict.footer.links.privacy}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onOpenInfoPage('terms')}
                      className="hover:text-white text-left"
                    >
                      {dict.footer.links.terms}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 text-xs text-[#F7F5EF]/60 flex flex-wrap items-center justify-between gap-4">
            <span>{dict.footer.copyright}</span>
            <span>hreflang: id-ID (/id/) · ms-MY (/my/)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
