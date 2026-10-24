import React, { useState } from 'react';
import { LocaleCode } from '../../types/learning';
import { MARKET_INVENTORY, MARKET_MISSIONS, MarketProductItem } from '../../data/worldData';
import { evaluateMarketOrder } from '../../utils/worldEngine';
import { audioController } from '../../utils/audioPlayer';
import {
  ShoppingBasket,
  Plus,
  Minus,
  Trash2,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Star,
} from 'lucide-react';

const PRODUCT_PALETTE = {
  red: { main: '#D9433F', dark: '#9F2928', light: '#FFAAA0' },
  green: { main: '#4F9D59', dark: '#24683A', light: '#BDE7A8' },
  blue: { main: '#2F73C8', dark: '#194780', light: '#A8D3FF' },
  yellow: { main: '#E7B83F', dark: '#A66C13', light: '#FFF0A5' },
  brown: { main: '#A96A3E', dark: '#714126', light: '#EBC69D' },
} as const;

function MarketProductIllustration({
  item,
  compact = false,
}: {
  item: MarketProductItem;
  compact?: boolean;
}) {
  const color = PRODUCT_PALETTE[item.color];
  const gradientId = \`product-\${item.id.replace(/[^a-zA-Z0-9_-]/g, '')}\`;

  return (
    <div
      aria-hidden="true"
      className={\`relative overflow-hidden rounded-2xl border border-[#775A35]/10 bg-gradient-to-br from-[#FFFDF7] via-[#F8EED9] to-[#EAD5B1] \${compact ? 'h-16 w-20 shrink-0' : 'h-28 w-full'}\`}
    >
      <svg viewBox="0 0 180 112" className="h-full w-full" role="presentation">
        <defs>
          <linearGradient id={\`\${gradientId}-shadow\`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8A6C42" stopOpacity=".05" />
            <stop offset="100%" stopColor="#8A6C42" stopOpacity=".24" />
          </linearGradient>
          <linearGradient id={\`\${gradientId}-product\`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={color.light} />
            <stop offset="48%" stopColor={color.main} />
            <stop offset="100%" stopColor={color.dark} />
          </linearGradient>
        </defs>
        <ellipse cx="90" cy="96" rx="42" ry="7" fill={\`url(#\${gradientId}-shadow)\`} />
        {item.productType === 'apple' && (
          <g>
            <path d="M84 34 C74 25 58 34 56 52 C53 72 67 87 82 84 C88 82 93 82 99 84 C116 88 128 70 124 52 C120 34 105 27 95 35 C91 38 88 38 84 34Z" fill={\`url(#\${gradientId}-product)\`} stroke={color.dark} strokeWidth="1.5" />
            <path d="M90 36 C89 28 94 23 99 18" fill="none" stroke="#68442A" strokeWidth="5" strokeLinecap="round" />
            <path d="M96 24 C105 10 121 13 127 17 C119 29 107 31 96 24Z" fill="#4C8F4F" stroke="#2D6839" strokeWidth="1.5" />
            <path d="M67 49 C68 41 73 39 77 39" fill="none" stroke="#FFFFFF" strokeOpacity=".72" strokeWidth="4" strokeLinecap="round" />
            <path d="M92 42 C87 55 88 69 92 78" fill="none" stroke={color.dark} strokeOpacity=".23" strokeWidth="2" />
          </g>
        )}
        {item.productType === 'book' && (
          <g>
            <path d="M47 32 L88 22 Q95 21 101 27 L133 43 L91 57 Z" fill={color.dark} opacity=".95" />
            <path d="M47 32 L90 47 L90 88 L47 73 Z" fill={\`url(#\${gradientId}-product)\`} stroke={color.dark} strokeWidth="1.5" />
            <path d="M90 47 L133 32 L133 73 L90 88 Z" fill={color.main} stroke={color.dark} strokeWidth="1.5" />
            <path d="M90 47 L90 88" stroke="#FDF7E9" strokeWidth="2" />
            <path d="M55 40 L81 49 M55 47 L81 56 M55 54 L77 62" stroke="#FFF9E8" strokeOpacity=".9" strokeWidth="2" strokeLinecap="round" />
            <path d="M99 48 L122 40 M99 56 L122 48 M99 64 L122 56" stroke="#FFF9E8" strokeOpacity=".72" strokeWidth="2" strokeLinecap="round" />
            <path d="M51 75 L90 89 L129 74" fill="none" stroke="#F7EAD0" strokeWidth="4" />
          </g>
        )}
        {item.productType === 'bread' && (
          <g>
            <path d="M43 75 C34 66 40 48 55 43 C62 26 82 22 97 32 C115 25 134 39 133 56 C144 67 131 82 115 83 L59 83 C52 83 47 80 43 75Z" fill="#B87938" opacity=".28" transform="translate(0 5)" />
            <path d="M43 69 C34 60 40 42 55 37 C62 20 82 16 97 26 C115 19 134 33 133 50 C144 61 131 76 115 77 L59 77 C52 77 47 74 43 69Z" fill="#DCA45D" stroke="#A8672B" strokeWidth="2" />
            <path d="M59 35 Q68 43 67 54 M82 27 Q92 36 90 47 M106 29 Q116 38 113 48" fill="none" stroke="#F8E3B7" strokeWidth="5" strokeLinecap="round" />
            <path d="M58 37 Q66 44 65 52 M81 29 Q89 37 88 45 M105 31 Q113 39 111 47" fill="none" stroke="#A8672B" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}
        {item.productType === 'dates' && (
          <g>
            <path d="M48 51 L132 51 L124 83 Q90 94 56 83Z" fill="#C79658" stroke="#87552E" strokeWidth="2" />
            <path d="M48 51 L132 51 L126 64 L54 64Z" fill="#E6C18D" stroke="#87552E" strokeWidth="2" />
            <path d="M55 50 C43 44 48 28 62 30 C76 31 74 48 62 53Z" fill="#5B2E24" stroke="#3D201B" strokeWidth="1.5" />
            <path d="M71 47 C60 39 66 23 79 26 C92 29 89 45 78 50Z" fill="#713B2A" stroke="#3D201B" strokeWidth="1.5" />
            <path d="M86 49 C77 40 84 25 96 28 C109 31 105 47 94 52Z" fill="#5A2B20" stroke="#3D201B" strokeWidth="1.5" />
            <path d="M103 48 C94 39 102 25 113 30 C125 34 121 49 110 52Z" fill="#7F432D" stroke="#3D201B" strokeWidth="1.5" />
            <path d="M59 34 L66 38 M76 31 L82 35 M93 33 L99 37 M107 35 L113 39" stroke="#D9A06B" strokeWidth="2" strokeLinecap="round" />
            <path d="M57 69 L123 69" stroke="#A56C39" strokeWidth="2" strokeOpacity=".65" />
          </g>
        )}
        {item.productType === 'cup' && (
          <g>
            <path d="M118 42 C147 36 145 65 120 68" fill="none" stroke="#B7C8BE" strokeWidth="10" strokeLinecap="round" />
            <path d="M47 34 L124 34 L116 81 Q87 91 57 81Z" fill="#F4F1E8" stroke="#7E9388" strokeWidth="2" />
            <path d="M50 38 L121 38" stroke={color.main} strokeWidth="5" strokeLinecap="round" />
            <path d="M53 43 L119 43 L114 78 Q86 86 61 78Z" fill={color.main} opacity=".92" />
            <path d="M68 27 C60 18 73 14 67 6 M88 27 C80 18 94 14 87 5 M107 27 C100 18 112 13 106 6" fill="none" stroke="#A7B6AE" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M60 45 L64 74" stroke="#FFFFFF" strokeOpacity=".75" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
      </svg>
      {!compact && (
        <span className="absolute bottom-2 right-2 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold text-[#705334] shadow-sm">
          {item.size === 'large' ? 'XL' : 'S'}
        </span>
      )}
    </div>
  );
}

function MarketStallIllustration() {
  return (
    <div aria-hidden="true" className="hidden h-24 w-40 shrink-0 overflow-hidden rounded-xl border border-[#E3D2B7] bg-[#F7E8CA] sm:block">
      <svg viewBox="0 0 160 96" className="h-full w-full" role="presentation">
        <circle cx="130" cy="17" r="9" fill="#E7B83F" opacity=".8" />
        <path d="M0 70 L160 60 L160 96 L0 96Z" fill="#D6BE93" />
        <rect x="31" y="27" width="100" height="57" rx="3" fill="#F4DFB7" stroke="#9E7645" strokeWidth="1.5" />
        <rect x="25" y="22" width="110" height="13" rx="2" fill="#145A4A" />
        <path d="M25 35 L135 35 L127 47 L33 47Z" fill="#EBC87D" stroke="#9E7645" strokeWidth="1.5" />
        <path d="M25 35 L43 35 L40 47 L33 47Z M61 35 L79 35 L76 47 L58 47Z M97 35 L115 35 L112 47 L94 47Z M125 35 L135 35 L127 47 L112 47Z" fill="#C95E47" />
        <rect x="40" y="52" width="35" height="29" rx="2" fill="#B9854E" stroke="#805B35" />
        <rect x="83" y="52" width="39" height="29" rx="2" fill="#B9854E" stroke="#805B35" />
        <path d="M40 60 L75 60 M40 69 L75 69 M83 60 L122 60 M83 69 L122 69" stroke="#805B35" strokeWidth="1.5" />
        <circle cx="49" cy="57" r="5" fill="#D9433F" /><circle cx="61" cy="56" r="5" fill="#4F9D59" /><circle cx="69" cy="58" r="4" fill="#D9433F" />
        <ellipse cx="92" cy="57" rx="5" ry="4" fill="#6B3327" /><ellipse cx="104" cy="57" rx="5" ry="4" fill="#7C422B" /><ellipse cx="114" cy="57" rx="5" ry="4" fill="#5B2E24" />
      </svg>
    </div>
  );
}

interface MarketGameProps {
  locale: LocaleCode;
  showTransliteration: boolean;
  completedLevels: Record<string, { stars: number }>;
  onRecordAttempt: (
    levelNumber: number,
    wordIds: string[],
    mistakesCount: number,
    arabicPrompt: string,
    didPass: boolean,
    diagnosticCategory?: 'comprehension' | 'quantity-dual' | 'color-adjective',
    feedbackText?: string
  ) => void;
}

export const MarketGame: React.FC<MarketGameProps> = ({
  locale,
  showTransliteration,
  completedLevels,
  onRecordAttempt,
}) => {
  const [stageIdx, setStageIdx] = useState<number>(0);
  const currentStage = MARKET_MISSIONS[stageIdx] || MARKET_MISSIONS[0];

  const [basket, setBasket] = useState<Record<string, number>>({});
  const [mistakesCount, setMistakesCount] = useState<number>(0);
  const [evaluation, setEvaluation] = useState<{
    isCorrect: boolean;
    text: string;
  } | null>(null);

  const handleSelectStage = (idx: number) => {
    setStageIdx(idx);
    setBasket({});
    setMistakesCount(0);
    setEvaluation(null);
  };

  const isOrderCompleted = evaluation?.isCorrect === true;

  const handleAdjustQuantity = (itemId: string, delta: number) => {
    if (isOrderCompleted) return;
    setEvaluation(null);
    setBasket((prev) => {
      const nextQty = Math.max(0, Math.min(5, (prev[itemId] || 0) + delta));
      const updated = { ...prev };
      if (nextQty === 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = nextQty;
      }
      return updated;
    });
  };

  const handleSubmitOrder = () => {
    if (isOrderCompleted) return;
    const res = evaluateMarketOrder(currentStage, basket);
    setEvaluation({
      isCorrect: res.isCorrect,
      text: res.feedback[locale],
    });

    if (res.isCorrect) {
      onRecordAttempt(
        currentStage.stageNumber,
        currentStage.focusWordIds,
        mistakesCount,
        currentStage.arabicRequest,
        true
      );
    } else {
      const nextMistakes = mistakesCount + 1;
      setMistakesCount(nextMistakes);
      onRecordAttempt(
        currentStage.stageNumber,
        currentStage.focusWordIds,
        nextMistakes,
        currentStage.arabicRequest,
        false,
        res.diagnosticCategory,
        res.feedback[locale]
      );
    }
  };

  const totalItemsInBasket = Object.values(basket).reduce(
    (sum, n) => sum + n,
    0
  );

  return (
    <div className="space-y-6">
      {/* Stage Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {MARKET_MISSIONS.map((stg, idx) => {
          const done = completedLevels[`market:${stg.stageNumber}`];
          const isCurrent = idx === stageIdx;
          return (
            <button
              key={stg.stageNumber}
              type="button"
              onClick={() => handleSelectStage(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-[#145A4A] text-white border-[#145A4A]'
                  : done
                  ? 'bg-[#DDEBE3] text-[#145A4A] border-[#145A4A]/25'
                  : 'bg-white text-[#1C2724]/80 border-[#1C2724]/15 hover:bg-[#F7F5EF]'
              }`}
            >
              <span>
                {locale === 'id-ID' ? 'Misi' : 'Misi'} {stg.stageNumber}
              </span>
              {done && (
                <span className="inline-flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: done.stars }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-3 h-3 fill-amber-500 text-amber-500" />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Customer Request Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#145A4A]/25 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#DDEBE3] text-[#145A4A]">
              <svg viewBox="0 0 48 48" className="h-10 w-10" role="presentation" aria-hidden="true">
                <circle cx="24" cy="24" r="21" fill="#F3D6AE" />
                <path d="M9 20 C10 8 37 6 39 21 L35 21 L33 14 L15 14 L13 21Z" fill="#145A4A" />
                <path d="M13 24 C13 15 18 13 24 13 C31 13 35 17 35 25 L32 34 L16 34Z" fill="#F1C49D" />
                <path d="M15 20 Q24 14 33 20 L32 16 L16 16Z" fill="#FFFFFF" />
                <circle cx="20" cy="24" r="1.5" fill="#3E3227" />
                <circle cx="28" cy="24" r="1.5" fill="#3E3227" />
                <path d="M20 29 Q24 32 28 29" fill="none" stroke="#9A5140" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 36 Q24 30 32 36 L36 43 L12 43Z" fill="#145A4A" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-semibold text-[#145A4A]">
                {currentStage.title[locale]}
              </span>
              <h3 className="text-base font-bold text-[#1C2724] mt-0.5">
                {currentStage.customerName[locale]}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <MarketStallIllustration />
            <button
              type="button"
              onClick={() =>
                audioController.playVerifiedOrFallback({
                  arabicText: currentStage.arabicRequest,
                  allowSyntheticFallback: true,
                })
              }
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#DDEBE3] text-[#145A4A] text-xs font-semibold hover:bg-[#cde0d5]"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>
                {locale === 'id-ID'
                  ? 'Bantuan Pelafalan Pesanan'
                  : 'Bantuan Sebutan Pesanan'}
              </span>
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 text-center space-y-1">
          <div
            dir="rtl"
            lang="ar"
            className="font-arabic text-2xl sm:text-3xl font-bold text-[#145A4A]"
          >
            « {currentStage.arabicRequest} »
          </div>
          {showTransliteration && (
            <div className="text-xs text-[#1C2724]/70 italic">
              {currentStage.transliterationRequest}
            </div>
          )}
        </div>

        <div className="text-xs text-[#1C2724]/75">
          <span className="font-semibold text-[#145A4A]">
            {locale === 'id-ID' ? 'Catatan Kaidah: ' : 'Nota Kaedah: '}
          </span>
          {currentStage.grammarHint[locale]}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Market Stall Shelves */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#1C2724]/12 space-y-4">
          <h4 className="text-sm font-bold text-[#1C2724]">
            {locale === 'id-ID'
              ? 'Rak Barang Pasar (Klik + untuk memasukkan ke Keranjang)'
              : 'Rak Barang Pasar (Klik + untuk memasukkan ke dalam Bakul)'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {MARKET_INVENTORY.map((item) => {
              const qty = basket[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                    qty > 0
                      ? 'bg-[#DDEBE3]/40 border-[#145A4A]'
                      : 'bg-[#F7F5EF] border-[#1C2724]/12'
                  }`}
                >
                  <div>
                    <MarketProductIllustration item={item} />
                    <div className="flex items-start justify-between gap-2 mt-3">
                      <div>
                        <div className="text-sm font-bold text-[#1C2724]">
                          {item.name[locale]}
                        </div>
                        <div className="text-[11px] text-[#1C2724]/65">
                          {item.colorLabel[locale]}
                        </div>
                      </div>
                      <span
                        dir="rtl"
                        lang="ar"
                        className="font-arabic text-xl font-bold text-[#145A4A]"
                      >
                        {qty === 2
                          ? item.arabicDual
                          : qty >= 3
                          ? item.arabicPlural
                          : item.arabicSingular}
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#1C2724]/8 text-[11px] text-[#1C2724]/70 space-y-0.5">
                      <div>
                        1 (Mufrad):{' '}
                        <span dir="rtl" lang="ar" className="font-arabic font-bold text-xs">
                          {item.arabicSingular}
                        </span>
                      </div>
                      <div>
                        2 (Mutsanna):{' '}
                        <span dir="rtl" lang="ar" className="font-arabic font-bold text-xs text-[#145A4A]">
                          {item.arabicDual}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleAdjustQuantity(item.id, -1)}
                        disabled={qty === 0}
                        aria-label={`Remove ${item.name[locale]}`}
                        className="w-8 h-8 rounded-lg bg-white border border-[#1C2724]/15 flex items-center justify-center text-[#1C2724] disabled:opacity-40 hover:bg-slate-100"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm font-bold tabular-nums">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAdjustQuantity(item.id, 1)}
                        aria-label={`Add ${item.name[locale]}`}
                        className="w-8 h-8 rounded-lg bg-[#145A4A] text-white flex items-center justify-center hover:bg-[#10483B]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        audioController.playVerifiedOrFallback({
                          arabicText:
                            qty === 2 ? item.arabicDual : item.arabicSingular,
                        })
                      }
                      className="text-xs font-semibold text-[#145A4A] hover:underline"
                    >
                      {locale === 'id-ID' ? 'Suara' : 'Suara'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: Customer Basket & Order Evaluation */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#1C2724]/12 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1C2724]/10">
            <h4 className="text-sm font-bold text-[#1C2724] flex items-center gap-2">
              <ShoppingBasket className="w-4 h-4 text-[#145A4A]" />
              <span>
                {locale === 'id-ID'
                  ? `Keranjang Pesanan (${totalItemsInBasket})`
                  : `Bakul Pesanan (${totalItemsInBasket})`}
              </span>
            </h4>
            {totalItemsInBasket > 0 && (
              <button
                type="button"
                onClick={() => {
                  setBasket({});
                  setEvaluation(null);
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{locale === 'id-ID' ? 'Kosongkan' : 'Kosongkan'}</span>
              </button>
            )}
          </div>

          {totalItemsInBasket === 0 ? (
            <div className="flex flex-col items-center gap-3 py-7 px-4 text-center text-xs text-[#1C2724]/65 bg-[#F7F5EF] rounded-xl border border-[#1C2724]/8">
              <svg viewBox="0 0 120 88" className="h-20 w-28" role="presentation" aria-hidden="true">
                <ellipse cx="60" cy="77" rx="35" ry="5" fill="#8A6C42" opacity=".14" />
                <path d="M27 28 L93 28 L84 69 Q60 81 36 69Z" fill="#D6A96B" stroke="#8C623A" strokeWidth="2.5" />
                <path d="M31 34 L89 34 M35 45 L85 45 M38 56 L82 56" stroke="#A87743" strokeWidth="3" strokeLinecap="round" />
                <path d="M36 29 C36 8 84 8 84 29" fill="none" stroke="#8C623A" strokeWidth="4" strokeLinecap="round" />
                <path d="M43 32 L48 68 M59 32 L60 72 M75 32 L71 68" stroke="#F0D2A0" strokeWidth="2" />
                <path d="M21 18 L16 11 M99 18 L104 11 M60 7 L60 0" stroke="#E7B83F" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="max-w-xs leading-relaxed">
                {locale === 'id-ID'
                  ? 'Keranjang masih kosong. Pilih barang bergambar di rak sesuai permintaan berbahasa Arab.'
                  : 'Bakul masih kosong. Pilih barang bergambar di rak mengikut permintaan berbahasa Arab.'}
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              {Object.entries(basket).map(([itemId, qty]) => {
                const item = MARKET_INVENTORY.find((i) => i.id === itemId);
                if (!item || qty <= 0) return null;
                return (
                  <div
                    key={itemId}
                    className="p-3 rounded-xl bg-[#F7F5EF] border border-[#1C2724]/10 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <MarketProductIllustration item={item} compact />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#1C2724]">
                          {qty}x {item.name[locale]}
                        </div>
                      <div
                        dir="rtl"
                        lang="ar"
                        className="font-arabic text-base font-bold text-[#145A4A]"
                      >
                        {qty === 2
                          ? item.arabicDual
                          : qty >= 3
                          ? item.arabicPlural
                          : item.arabicSingular}
                      </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAdjustQuantity(itemId, -qty)}
                      className="text-xs font-semibold text-rose-700 hover:underline"
                    >
                      {locale === 'id-ID' ? 'Hapus' : 'Padam'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <button
            type="button"
            disabled={isOrderCompleted}
            onClick={handleSubmitOrder}
            className="w-full py-3 px-4 rounded-xl bg-[#145A4A] text-white text-xs sm:text-sm font-semibold hover:bg-[#10483B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isOrderCompleted
              ? locale === 'id-ID'
                ? 'Pesanan Selesai Terverifikasi ✓'
                : 'Pesanan Selesai Disahkan ✓'
              : locale === 'id-ID'
              ? 'Serahkan Pesanan ke Pelanggan'
              : 'Serahkan Pesanan kepada Pelanggan'}
          </button>

          {evaluation && (
            <div
              role="status"
              className={`p-4 rounded-xl border space-y-3 ${
                evaluation.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {evaluation.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-[#1E7A57] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                )}
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {evaluation.text}
                </p>
              </div>

              <div className="pt-2 border-t border-black/10 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectStage(stageIdx)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-black/15 text-xs font-semibold text-[#1C2724] hover:bg-slate-50"
                >
                  {locale === 'id-ID' ? 'Ulangi Pesanan' : 'Ulang Pesanan'}
                </button>
                {evaluation.isCorrect &&
                  stageIdx < MARKET_MISSIONS.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleSelectStage(stageIdx + 1)}
                      className="px-4 py-2 rounded-xl bg-[#145A4A] text-white text-xs font-semibold hover:bg-[#10483B] inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {locale === 'id-ID'
                          ? `Lanjut ke Misi ${currentStage.stageNumber + 1} →`
                          : `Teruskan ke Misi ${currentStage.stageNumber + 1} →`}
                      </span>
                    </button>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
