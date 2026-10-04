"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { flashProducts } from "@/data/products";
import { discount, fa } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import { useUI } from "@/context/UIContext";
import { Reveal } from "@/components/common/Reveal";
import { Stars } from "@/components/common/Stars";

const INITIAL_SECONDS = 11 * 3600 + 42 * 60 + 18;

/** شمارش معکوس فروش فوق‌العاده */
function useCountdown(initial: number) {
  const [total, setTotal] = useState(initial);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTotal((t) => (t > 0 ? t - 1 : 14 * 3600));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    h: pad(Math.floor(total / 3600)),
    m: pad(Math.floor((total % 3600) / 60)),
    s: pad(total % 60),
  };
}

/** بخش فروش فوق‌العاده با تایمر */
export function FlashSale() {
  const { addToCart } = useStore();
  const { openOrder } = useUI();
  const { h, m, s } = useCountdown(INITIAL_SECONDS);

  return (
    <section className="mt-14 relative overflow-hidden">
      <div className="bg-gradient-to-bl from-deep via-[#0d4a8c] to-primary py-12 relative">
        <div className="absolute inset-0 hero-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
          <Reveal className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-7">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center text-2xl shadow-pop shrink-0">
                <i className="fa-solid fa-bolt text-white" />
              </div>
              <div>
                <h2 className="font-black text-white text-[22px] lg:text-[28px]">
                  فروش فوق‌العاده <span className="text-amber-300">تی‌رست</span>
                </h2>
                <p className="text-white/70 text-[13.5px]">
                  تخفیف‌های شگفت‌انگیز کارخانه — موجودی محدود
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="tick-box text-white rounded-2xl w-[68px] py-2.5 text-center border border-white/20">
                <div className="font-black text-xl tick">{h}</div>
                <div className="text-[10.5px] text-white/70">ساعت</div>
              </div>
              <span className="text-white/50 font-black text-xl">:</span>
              <div className="tick-box text-white rounded-2xl w-[68px] py-2.5 text-center border border-white/20">
                <div className="font-black text-xl tick">{m}</div>
                <div className="text-[10.5px] text-white/70">دقیقه</div>
              </div>
              <span className="text-white/50 font-black text-xl">:</span>
              <div className="tick-box text-white rounded-2xl w-[68px] py-2.5 text-center border !border-amber-300/50">
                <div className="font-black text-xl tick">{s}</div>
                <div className="text-[10.5px] text-amber-200">ثانیه</div>
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flashProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-[1.4rem] overflow-hidden shadow-pop border border-white/40 flex flex-col"
              >
                <Link href={`/products/${p.id}`} className="relative cursor-pointer group overflow-hidden block">
                  <img src={p.img} className="w-full h-48 object-cover img-zoom" alt={p.name} />
                  <span className="absolute top-2.5 right-2.5 bg-gradient-to-l from-rose-500 to-orange-500 text-white text-[12px] font-black px-3 py-1 rounded-full shadow">
                    ٪{fa(discount(p))}
                  </span>
                  <div className="absolute bottom-2.5 right-2.5 left-2.5 bg-deep/85 backdrop-blur rounded-xl px-3 py-2 flex items-center justify-between">
                    <span className="text-white text-[11.5px] font-bold">موجودی محدود</span>
                    <div className="h-1.5 flex-1 mx-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-l from-amber-300 to-orange-400 rounded-full"
                        style={{ width: `${55 + ((p.id * 7) % 35)}%` }}
                      />
                    </div>
                    <span className="text-amber-300 text-[11px] font-black tick">
                      فقط {fa(3 + (p.id % 4))} عدد
                    </span>
                  </div>
                </Link>
                <div className="p-4 flex-1 flex flex-col">
                  <Link
                    href={`/products/${p.id}`}
                    className="font-black text-[14px] mb-1 hover:text-primary transition"
                  >
                    {p.name}
                  </Link>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Stars rating={p.rating} />
                    <span className="text-[11px] text-slate-400 tick">({fa(p.reviews)})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-slate-400 line-through text-[13px] tick">{fa(p.old!)}</span>
                    <span className="font-black text-deep text-[17px] tick">{fa(p.price!)}</span>
                    <span className="text-[11px] text-slate-400">تومان</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(p.id);
                      openOrder(p.id);
                    }}
                    className="mt-auto w-full bg-gradient-to-l from-deep to-primary text-white font-black py-3 rounded-xl text-[13px] hover:shadow-pop transition btn-sheen"
                  >
                    افزودن + ثبت سفارش <i className="fa-solid fa-bolt mr-1 text-amber-300 text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
