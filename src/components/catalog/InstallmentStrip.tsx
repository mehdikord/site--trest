"use client";

import { useUI } from "@/context/UIContext";

interface InstallmentStripProps {
  className?: string;
}

/** نوار تبلیغاتی خرید اقساطی */
export function InstallmentStrip({
  className = "max-w-7xl mx-auto px-4 lg:px-6 pb-12",
}: InstallmentStripProps) {
  const { openInstallment } = useUI();

  return (
    <div className={className}>
      <div className="rounded-[1.6rem] bg-gradient-to-l from-amber-50 to-orange-50 border border-amber-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-xl shrink-0">
            <i className="fa-solid fa-credit-card" />
          </div>
          <div>
            <div className="font-black text-[15px]">بودجه‌ات کافی نیست؟ اقساطی بخر!</div>
            <div className="text-[13px] text-slate-500">
              پیش‌پرداخت منعطف + اقساط تا ۲۴ ماه + تحویل فوری
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => openInstallment()}
          className="shrink-0 bg-deep text-white text-sm font-bold px-6 py-3 rounded-xl"
        >
          درخواست خرید اقساطی
        </button>
      </div>
    </div>
  );
}
