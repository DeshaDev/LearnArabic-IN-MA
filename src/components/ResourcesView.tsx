import React, { useState } from 'react';
import { EditorialArticle, LocaleCode, PathwayId } from '../types/learning';
import { EDITORIAL_ARTICLES } from '../data/curriculum';
import { Search, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface ResourcesViewProps {
  locale: LocaleCode;
  initialArticle?: EditorialArticle | null;
  onSelectPathway: (pathwayId: PathwayId) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  locale,
  initialArticle,
  onSelectPathway,
}) => {
  const [selectedArticle, setSelectedArticle] =
    useState<EditorialArticle | null>(initialArticle || EDITORIAL_ARTICLES[0]);
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  const filteredArticles = EDITORIAL_ARTICLES.filter((art) => {
    if (category !== 'all' && art.category !== category) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      art.title[locale].toLowerCase().includes(q) ||
      art.summary[locale].toLowerCase().includes(q)
    );
  });

  const activeArticle = selectedArticle || filteredArticles[0];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#145A4A]">
            {locale === 'id-ID'
              ? 'Pustaka Editorial & Rujukan Keilmuan'
              : 'Pustaka Editorial & Rujukan Keilmuan'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C2724] mt-1">
            {locale === 'id-ID'
              ? 'Panduan bahasa Arab Al-Qur’an, bacaan salat, dan metodologi'
              : 'Panduan bahasa Arab al-Quran, bacaan solat dan metodologi'}
          </h1>
        </div>

        <div className="relative w-full md:w-80">
          <label htmlFor="resources-view-search" className="sr-only">
            {locale === 'id-ID' ? 'Cari artikel' : 'Cari rencana'}
          </label>
          <Search className="w-4 h-4 text-[#1C2724]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="resources-view-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              locale === 'id-ID'
                ? 'Cari panduan bahasa atau tajwid...'
                : 'Cari panduan bahasa atau tajwid...'
            }
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#1C2724]/15 rounded-xl focus:outline-2 focus:outline-[#145A4A]"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl w-fit border border-[#1C2724]/10 overflow-x-auto max-w-full">
        {[
          { id: 'all', label: locale === 'id-ID' ? 'Semua' : 'Semua' },
          { id: 'vocabulary', label: locale === 'id-ID' ? 'Akar Kata' : 'Akar Perkataan' },
          { id: 'grammar', label: locale === 'id-ID' ? 'Partikel & Kalimat' : 'Partikel & Ayat' },
          { id: 'prayer', label: locale === 'id-ID' ? 'Bacaan Salat' : 'Bacaan Solat' },
          { id: 'tajwid', label: 'Tajwid & Talaqqi' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setCategory(t.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              category === t.id
                ? 'bg-[#145A4A] text-white font-semibold'
                : 'text-[#1C2724]/75 hover:text-[#1C2724]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Split Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-3">
          {filteredArticles.map((art) => {
            const active = activeArticle?.id === art.id;
            return (
              <button
                key={art.id}
                type="button"
                onClick={() => setSelectedArticle(art)}
                className={`w-full p-5 rounded-2xl border text-left transition-all ${
                  active
                    ? 'bg-[#145A4A] text-white border-[#145A4A]'
                    : 'bg-white text-[#1C2724] border-[#1C2724]/12 hover:bg-[#DDEBE3]/40'
                }`}
              >
                <div
                  className={`text-xs flex items-center gap-2 ${
                    active ? 'text-[#DDEBE3]' : 'text-[#1C2724]/60'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{art.category.toUpperCase()}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {art.readTimeMinutes}{' '}
                    {locale === 'id-ID' ? 'menit' : 'minit'}
                  </span>
                </div>
                <h2 className="text-base font-bold mt-1.5">
                  {art.title[locale]}
                </h2>
                <p
                  className={`text-xs mt-1.5 line-clamp-2 ${
                    active ? 'text-[#F7F5EF]/85' : 'text-[#1C2724]/70'
                  }`}
                >
                  {art.summary[locale]}
                </p>
              </button>
            );
          })}
        </div>

        {activeArticle && (
          <article className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#1C2724]/12 space-y-5">
            <div className="pb-4 border-b border-[#1C2724]/10">
              <div className="text-xs text-[#145A4A] font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{activeArticle.sourceAttribution[locale]}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C2724] mt-2">
                {activeArticle.title[locale]}
              </h2>
            </div>

            {activeArticle.arabicExcerpt && (
              <div
                dir="rtl"
                lang="ar"
                className="p-5 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 text-center font-arabic text-3xl text-[#145A4A] font-bold"
              >
                {activeArticle.arabicExcerpt}
              </div>
            )}

            <div className="space-y-4 text-sm sm:text-base text-[#1C2724]/85 leading-relaxed">
              {activeArticle.bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para[locale]}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-[#1C2724]/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#1C2724]/60">
                {locale === 'id-ID'
                  ? 'Artikel ini adalah materi pembelajaran bahasa, bukan fatwa keagamaan.'
                  : 'Rencana ini ialah bahan pembelajaran bahasa, bukannya fatwa keagamaan.'}
              </span>
              <button
                type="button"
                onClick={() => onSelectPathway(activeArticle.relatedPathwayId)}
                className="px-4 py-2 rounded-xl bg-[#145A4A] text-white text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <span>
                  {locale === 'id-ID'
                    ? 'Pelajari di Kurikulum Terkait'
                    : 'Pelajari dalam Kurikulum Berkaitan'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};
