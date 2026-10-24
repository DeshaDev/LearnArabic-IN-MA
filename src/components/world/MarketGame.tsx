import React, { useState } from 'react';
import { LocaleCode } from '../../types/learning';
import { MARKET_INVENTORY, MARKET_MISSIONS } from '../../data/worldData';
import { evaluateMarketOrder } from '../../utils/worldEngine';
import { audioController } from '../../utils/audioPlayer';
import { Market3DScene } from './Market3DScene';
import { ShoppingBasket, Trash2, Volume2, CheckCircle2, AlertCircle, Sparkles, Star, RotateCcw } from 'lucide-react';

interface MarketGameProps {
  locale: LocaleCode;
  showTransliteration: boolean;
  completedLevels: Record<string, { stars: number }>;
  onRecordAttempt: (
    levelNumber: number, wordIds: string[], mistakesCount: number, arabicPrompt: string,
    didPass: boolean, diagnosticCategory?: 'comprehension' | 'quantity-dual' | 'color-adjective',
    feedbackText?: string
  ) => void;
}

export const MarketGame: React.FC<MarketGameProps> = ({ locale, showTransliteration, completedLevels, onRecordAttempt }) => {
  const [stageIdx, setStageIdx] = useState(0);
  const currentStage = MARKET_MISSIONS[stageIdx] || MARKET_MISSIONS[0];
  const [basket, setBasket] = useState<Record<string, number>>({});
  const [mistakesCount, setMistakesCount] = useState(0);
  const [evaluation, setEvaluation] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const isOrderCompleted = evaluation?.isCorrect === true;
  const totalItems = Object.values(basket).reduce((sum, quantity) => sum + quantity, 0);

  const handleCollect = (itemId: string) => {
    if (isOrderCompleted) return;
    setEvaluation(null);
    setBasket((previous) => {
      const next = { ...previous, [itemId]: Math.min(5, (previous[itemId] || 0) + 1) };
      if (!next[itemId]) delete next[itemId];
      return next;
    });
  };

  const handleAdjust = (itemId: string, delta: number) => {
    if (isOrderCompleted) return;
    setEvaluation(null);
    setBasket((previous) => {
      const next = { ...previous };
      const quantity = Math.max(0, Math.min(5, (next[itemId] || 0) + delta));
      if (quantity === 0) delete next[itemId];
      else next[itemId] = quantity;
      return next;
    });
  };

  const selectStage = (index: number) => {
    setStageIdx(index);
    setBasket({});
    setMistakesCount(0);
    setEvaluation(null);
  };

  const handleSubmit = () => {
    if (isOrderCompleted) return;
    const result = evaluateMarketOrder(currentStage, basket);
    setEvaluation({ isCorrect: result.isCorrect, text: result.feedback[locale] });
    if (result.isCorrect) {
      onRecordAttempt(currentStage.stageNumber, currentStage.focusWordIds, mistakesCount, currentStage.arabicRequest, true);
    } else {
      const nextMistakes = mistakesCount + 1;
      setMistakesCount(nextMistakes);
      onRecordAttempt(currentStage.stageNumber, currentStage.focusWordIds, nextMistakes, currentStage.arabicRequest, false, result.diagnosticCategory, result.feedback[locale]);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {MARKET_MISSIONS.map((mission, index) => {
          const completed = completedLevels['market:' + mission.stageNumber];
          return (
            <button key={mission.stageNumber} type="button" onClick={() => selectStage(index)}
              className={'flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all ' + (
                index === stageIdx ? 'border-[#754522] bg-[#352116] text-[#ffe2a0] shadow-md' :
                completed ? 'border-[#6a987e] bg-[#dcece0] text-[#215a43]' :
                'border-[#a8865c]/30 bg-[#fffaf0] text-[#684728] hover:bg-[#f2e1be]'
              )}>
              <span>Misi {mission.stageNumber}</span>
              {completed && <span className="inline-flex text-amber-600">{Array.from({ length: completed.stars }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}</span>}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-start">
        <section className="min-w-0 space-y-3">
          <div className="overflow-hidden rounded-2xl border border-[#9d7146]/30 bg-[#fff8e8] shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#9d7146]/20 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#96632d]">SUQ AL-MADINAH · 3D MARKET</div>
                <div className="mt-0.5 text-sm font-extrabold text-[#382719]">{currentStage.title[locale]}</div>
                <div className="text-xs text-[#78583b]">{currentStage.customerName[locale]}</div>
              </div>
              <button type="button" onClick={() => audioController.playVerifiedOrFallback({ arabicText: currentStage.arabicRequest, allowSyntheticFallback: true })}
                className="inline-flex items-center gap-2 rounded-xl border border-[#21654f]/20 bg-[#dcece0] px-3 py-2 text-xs font-bold text-[#215d49] hover:bg-[#cce1d2]">
                <Volume2 className="h-4 w-4" />{locale === 'id-ID' ? 'Dengarkan pesanan' : 'Dengar pesanan'}
              </button>
            </div>
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-[minmax(0,1fr)_210px]">
              <div className="px-4 py-4 sm:px-5">
                <div dir="rtl" lang="ar" className="font-arabic text-2xl font-bold leading-relaxed text-[#2c503d] sm:text-3xl">« {currentStage.arabicRequest} »</div>
                {showTransliteration && <div className="mt-1 text-xs italic text-[#856747]">{currentStage.transliterationRequest}</div>}
                <div className="mt-3 rounded-xl border border-[#dfc69b] bg-[#f7ead0] px-3 py-2 text-xs leading-relaxed text-[#6d4c2d]">
                  <strong>{locale === 'id-ID' ? 'Petunjuk bahasa: ' : 'Petunjuk bahasa: '}</strong>{currentStage.grammarHint[locale]}
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-[#9d7146]/20 bg-[#f7ead0] px-4 py-3 sm:border-l sm:border-t-0 sm:px-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e4c28b] text-3xl shadow-inner" aria-hidden="true">🧔🏽</div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#98662f]">Pelanggan menunggu</div>
                  <div className="text-xs font-bold text-[#4c3521]">{currentStage.customerName[locale]}</div>
                  <div className="text-[10px] text-[#896949]">Cari barangnya di pasar.</div>
                </div>
              </div>
            </div>
          </div>

          <Market3DScene locale={locale} items={MARKET_INVENTORY} basket={basket} locked={isOrderCompleted} onCollect={handleCollect} />

          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#9d7146]/20 bg-[#fff8e8] px-4 py-3 text-xs text-[#6d4c2d]">
            <span>Jelajahi pasar: dekati lapak dan ambil barang yang diminta.</span>
            <span className="font-bold text-[#215d49]">{totalItems} / 5 barang dikumpulkan</span>
          </div>
        </section>

        <aside className="space-y-4 rounded-2xl border border-[#9d7146]/30 bg-[#fffaf0] p-4 shadow-sm xl:sticky xl:top-4">
          <div className="flex items-center justify-between gap-2 border-b border-[#9d7146]/20 pb-3">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#422b19]"><ShoppingBasket className="h-4 w-4 text-[#7e522d]" />{locale === 'id-ID' ? 'Keranjang pesanan' : 'Bakul pesanan'}</h3>
            <span className="rounded-lg bg-[#352116] px-2 py-1 text-xs font-black text-[#ffe2a0]">{totalItems}</span>
          </div>

          {Object.keys(basket).length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#bc9a6b] bg-[#f7ead0] px-3 py-6 text-center">
              <div className="text-4xl" aria-hidden="true">🧺</div>
              <p className="mt-2 text-xs leading-relaxed text-[#806343]">Keranjang kosong. Berjalanlah di pasar 3D, lalu dekati barang dan tekan E.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {Object.entries(basket).map(([itemId, quantity]) => {
                const item = MARKET_INVENTORY.find((product) => product.id === itemId);
                if (!item || quantity <= 0) return null;
                return (
                  <div key={itemId} className="rounded-xl border border-[#b79465]/25 bg-[#f7ead0] p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-extrabold text-[#49321e]">{item.name[locale]}</div>
                        <div dir="rtl" lang="ar" className="mt-1 font-arabic text-base font-bold text-[#215d49]">{quantity === 2 ? item.arabicDual : quantity >= 3 ? item.arabicPlural : item.arabicSingular}</div>
                      </div>
                      <button type="button" onClick={() => handleAdjust(itemId, -quantity)} aria-label={'Remove ' + item.name[locale]} className="rounded-lg p-1.5 text-rose-700 hover:bg-rose-100"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-[#896949]">Jumlah</span>
                      <div className="flex items-center gap-2">
                        <button type="button" disabled={isOrderCompleted || quantity <= 0} onClick={() => handleAdjust(itemId, -1)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#b79465]/50 bg-white font-bold disabled:opacity-40">−</button>
                        <span className="min-w-4 text-center text-xs font-black">{quantity}</span>
                        <button type="button" disabled={isOrderCompleted || quantity >= 5} onClick={() => handleAdjust(itemId, 1)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#b79465]/50 bg-white font-bold disabled:opacity-40">+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <button type="button" disabled={isOrderCompleted} onClick={handleSubmit} className="w-full rounded-xl bg-[#245e49] px-4 py-3 text-xs font-extrabold text-white shadow-md transition hover:bg-[#174a37] disabled:cursor-not-allowed disabled:opacity-60">
            {isOrderCompleted ? 'Pesanan selesai ✓' : 'Serahkan ke pelanggan'}
          </button>

          {evaluation && (
            <div role="status" className={'space-y-3 rounded-xl border p-3 ' + (evaluation.isCorrect ? 'border-emerald-300 bg-emerald-50 text-emerald-950' : 'border-amber-300 bg-amber-50 text-amber-950')}>
              <div className="flex items-start gap-2">
                {evaluation.isCorrect ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />}
                <p className="text-xs leading-relaxed">{evaluation.text}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => selectStage(stageIdx)} className="inline-flex items-center gap-1 rounded-lg border border-current/20 bg-white/80 px-3 py-2 text-xs font-bold"><RotateCcw className="h-3.5 w-3.5" />Coba lagi</button>
                {evaluation.isCorrect && stageIdx < MARKET_MISSIONS.length - 1 && (
                  <button type="button" onClick={() => selectStage(stageIdx + 1)} className="inline-flex items-center gap-1 rounded-lg bg-[#245e49] px-3 py-2 text-xs font-bold text-white"><Sparkles className="h-3.5 w-3.5" />Misi berikutnya</button>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
