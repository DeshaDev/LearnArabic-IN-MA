import React from 'react';
import { LocaleCode } from '../types/learning';
import { LOCALES } from '../data/locales';
import {
  Globe,
  BookOpen,
  Compass,
  Layers,
  CheckCircle2,
  BarChart3,
  FileText,
  Settings,
  Sparkles,
} from 'lucide-react';

export type AppScreen =
  | 'home'
  | 'dashboard'
  | 'course-map'
  | 'lesson'
  | 'vocabulary'
  | 'review'
  | 'progress'
  | 'resources'
  | 'settings';

interface HeaderProps {
  locale: LocaleCode;
  onLocaleChange: (locale: LocaleCode) => void;
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onOpenOnboarding: () => void;
  onOpenAuth: () => void;
  userName?: string;
  dueReviewCount: number;
  isDemoMode?: boolean;
  onToggleDemoMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  locale,
  onLocaleChange,
  activeScreen,
  onNavigate,
  onOpenOnboarding,
  onOpenAuth,
  userName,
  dueReviewCount,
  isDemoMode,
  onToggleDemoMode,
}) => {
  const dict = LOCALES[locale];

  const handleMethodClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activeScreen !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        document.getElementById('metode-belajar')?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      document.getElementById('metode-belajar')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-[#F7F5EF]/95 backdrop-blur-sm border-b border-[#1C2724]/10">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href={dict.urlPrefix}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="text-xl font-bold tracking-tight text-[#145A4A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A4A]"
        >
          Faham Ayat
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1C2724]/80"
        >
          <a
            href={`${dict.urlPrefix}#beranda`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className={`hover:text-[#145A4A] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeScreen === 'home'
                ? 'text-[#145A4A] underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            {dict.nav.home}
          </a>
          <a
            href={`${dict.urlPrefix}#jalur`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('course-map');
            }}
            className={`hover:text-[#145A4A] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeScreen === 'course-map'
                ? 'text-[#145A4A] underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            {dict.nav.paths}
          </a>
          <a
            href={`${dict.urlPrefix}#metode-belajar`}
            onClick={handleMethodClick}
            className="hover:text-[#145A4A] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {dict.nav.method}
          </a>
          <a
            href={`${dict.urlPrefix}#materi`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('resources');
            }}
            className={`hover:text-[#145A4A] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeScreen === 'resources'
                ? 'text-[#145A4A] underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            {dict.nav.resources}
          </a>
          <a
            href={`${dict.urlPrefix}#masuk`}
            onClick={(e) => {
              e.preventDefault();
              onOpenAuth();
            }}
            className="hover:text-[#145A4A] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {userName ? `${userName} (Tersinkron)` : dict.nav.signIn}
          </a>
        </nav>

        {/* Zone 3: Account & Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenAuth}
            className="md:hidden px-3 py-2 text-xs font-semibold text-[#145A4A] bg-white border border-[#145A4A]/25 rounded-lg hover:bg-[#DDEBE3] transition-colors whitespace-nowrap shrink-0"
          >
            {userName ? userName : dict.nav.signIn}
          </button>
          <button
            type="button"
            onClick={onOpenOnboarding}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#145A4A] rounded-lg hover:bg-[#10483B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A4A]"
          >
            {dict.nav.startFree}
          </button>
        </div>
      </header>

      {/* Secondary Workspace & Localization Bar */}
      <div className="bg-[#DDEBE3]/60 border-t border-[#1C2724]/8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
          {/* App Workspace Screen Switcher */}
          <div
            role="navigation"
            aria-label="Workspace Views"
            className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5"
          >
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeScreen === 'home'
                  ? 'bg-white text-[#145A4A] shadow-xs font-semibold'
                  : 'text-[#1C2724]/75 hover:text-[#1C2724]'
              }`}
            >
              {dict.nav.home}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeScreen === 'dashboard'
                  ? 'bg-white text-[#145A4A] shadow-xs font-semibold'
                  : 'text-[#1C2724]/75 hover:text-[#1C2724]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{dict.nav.dashboard}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('course-map')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeScreen === 'course-map'
                  ? 'bg-white text-[#145A4A] shadow-xs font-semibold'
                  : 'text-[#1C2724]/75 hover:text-[#1C2724]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{dict.nav.paths}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('lesson')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeScreen === 'lesson'
                  ? 'bg-white text-[#145A4A] shadow-xs font-semibold'
                  : 'text-[#1C2724]/75 hover:text-[#1C2724]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ayat Explorer</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('vocabulary')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeScreen === 'vocabulary'
                  ? 'bg-white text-[#145A4A] shadow-xs font-semibold'
                  : 'text-[#1C2724]/75 hover:text-[#1C2724]'
              }`}
            >
              {dict.nav.vocabulary}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('review')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeScreen === 'review'
                  ? 'bg-white text-[#145A4A] shadow-xs font-semibold'
                  : 'text-[#1C2724]/75 hover:text-[#1C2724]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {dict.nav.review} ({dueReviewCount})
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('progress')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeScreen === 'progress'
                  ? 'bg-white text-[#145A4A] shadow-xs font-semibold'
                  : 'text-[#1C2724]/75 hover:text-[#1C2724]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{locale === 'id-ID' ? 'Kemampuan' : 'Kemahiran'}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('resources')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeScreen === 'resources'
                  ? 'bg-white text-[#145A4A] shadow-xs font-semibold'
                  : 'text-[#1C2724]/75 hover:text-[#1C2724]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{dict.nav.resources}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('settings')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeScreen === 'settings'
                  ? 'bg-white text-[#145A4A] shadow-xs font-semibold'
                  : 'text-[#1C2724]/75 hover:text-[#1C2724]'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{locale === 'id-ID' ? 'Pengaturan' : 'Tetapan'}</span>
            </button>
          </div>

          {/* Explicit Language / Locale Selector & Demo Mode Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {onToggleDemoMode && (
              <button
                type="button"
                onClick={onToggleDemoMode}
                aria-pressed={Boolean(isDemoMode)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                  isDemoMode
                    ? 'bg-amber-100 text-amber-950 border-amber-400'
                    : 'bg-white/90 text-[#1C2724]/75 border-[#1C2724]/10 hover:text-[#145A4A]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D8A75B]" />
                <span>
                  {isDemoMode
                    ? locale === 'id-ID'
                      ? 'Mode Demo Aktif (Reset ke Kosong)'
                      : 'Mod Demo Aktif (Reset ke Kosong)'
                    : locale === 'id-ID'
                    ? 'Mode Data Demo'
                    : 'Mod Data Demo'}
                </span>
              </button>
            )}

            <div
              role="group"
              aria-label="Language Selector"
              className="flex items-center gap-1 bg-white/90 p-0.5 rounded-lg border border-[#1C2724]/10 shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-[#145A4A] ml-2 mr-1" />
              <button
                type="button"
                onClick={() => onLocaleChange('id-ID')}
                aria-pressed={locale === 'id-ID'}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  locale === 'id-ID'
                    ? 'bg-[#145A4A] text-white font-semibold'
                    : 'text-[#1C2724]/75 hover:text-[#1C2724]'
                }`}
              >
                Indonesia (ID)
              </button>
              <button
                type="button"
                onClick={() => onLocaleChange('ms-MY')}
                aria-pressed={locale === 'ms-MY'}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  locale === 'ms-MY'
                    ? 'bg-[#145A4A] text-white font-semibold'
                    : 'text-[#1C2724]/75 hover:text-[#1C2724]'
                }`}
              >
                Malaysia (MY)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
