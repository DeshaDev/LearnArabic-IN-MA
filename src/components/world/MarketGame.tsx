import React, { useState } from 'react';
import { LocaleCode } from '../../types/learning';
import { MARKET_INVENTORY, MARKET_MISSIONS } from '../../data/worldData';
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

  const handleAdjustQuantity = (itemId: string, delta: number) => {
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
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-[#145A4A]">
              {currentStage.title[locale]}
            </span>
            <h3 className="text-base font-bold text-[#1C2724] mt-0.5">
              {currentStage.customerName[locale]}
            </h3>
          </div>
          <button
            type="button"
            onClick={() =>
              audioController.playVerifiedOrFallback({
                arabicText: currentStage.arabicRequest,
              })
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DDEBE3] text-[#145A4A] text-xs font-semibold hover:bg-[#cde0d5]"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>
              {locale === 'id-ID' ? 'Dengarkan Pesanan' : 'Dengar Pesanan'}
            </span>
          </button>
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
                    <div className="flex items-start justify-between gap-2">
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
            <div className="py-8 text-center text-xs text-[#1C2724]/65 bg-[#F7F5EF] rounded-xl border border-[#1C2724]/8">
              {locale === 'id-ID'
                ? 'Keranjang masih kosong. Pilih barang dari rak di sebelah kiri sesuai permintaan berbahasa Arab.'
                : 'Bakul masih kosong. Pilih barang dari rak di sebelah kiri mengikut permintaan berbahasa Arab.'}
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
                    <div>
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
            onClick={handleSubmitOrder}
            className="w-full py-3 px-4 rounded-xl bg-[#145A4A] text-white text-xs sm:text-sm font-semibold hover:bg-[#10483B] transition-colors"
          >
            {locale === 'id-ID'
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

              {evaluation.isCorrect &&
                stageIdx < MARKET_MISSIONS.length - 1 && (
                  <div className="pt-2 border-t border-emerald-200 flex justify-end">
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
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
