"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { discount, fa } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import { useUI } from "@/context/UIContext";
import { Stars } from "@/components/common/Stars";

interface ProductCardProps {
  product: Product;
  /** حالت کارت افقی در ردیف محصولات ویژه */
  row?: boolean;
}

/** کارت محصول (معادل تابع cardHTML نسخه اصلی) */
export function ProductCard({ product: p, row = false }: ProductCardProps) {
  const { addToCart, inWishlist, toggleWishlist } = useStore();
  const { openQuickView } = useUI();

  const off = discount(p);
  const wished = inWishlist(p.id);
  const href = `/products/${p.id}`;

  return (
    <div
      className={`group ${
        row ? "snap-start shrink-0 w-[240px] sm:w-[260px]" : "w-full"
      } bg-white rounded-[1.4rem] border border-slate-100 shadow-card hover:shadow-pop hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col`}
    >
      <div className="relative overflow-hidden cursor-pointer">
        <Link href={href} aria-label={p.name}>
          <img
            src={p.img}
            loading="lazy"
            className={`img-zoom w-full object-cover ${row ? "h-44" : "h-48 sm:h-56"}`}
            alt={p.name}
          />
        </Link>
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 pointer-events-none">
          {off > 0 && (
            <span className="bg-gradient-to-l from-rose-500 to-orange-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow">
              ٪{fa(off)} تخفیف
            </span>
          )}
          {p.badge && (
            <span className="bg-deep/90 backdrop-blur text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              {p.badge}
            </span>
          )}
          {p.isNew && (
            <span className="bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              جدید
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          onClick={() => toggleWishlist(p.id)}
          className={`absolute top-2.5 left-2.5 w-9 h-9 rounded-xl ${
            wished ? "bg-rose-500 text-white" : "bg-white/95 text-slate-500"
          } backdrop-blur flex items-center justify-center shadow hover:scale-110 transition`}
        >
          <i className={`${wished ? "fa-solid" : "fa-regular"} fa-heart text-sm`} />
        </button>
        {!p.available && (
          <div className="absolute inset-x-0 bottom-0 bg-deep/80 backdrop-blur text-white text-center text-[11.5px] font-bold py-1.5">
            ناموجود موقت — پیش‌ثبت تولید
          </div>
        )}
        <button
          type="button"
          onClick={() => openQuickView(p.id)}
          className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur text-deep text-[11.5px] font-black px-3 py-2 rounded-xl shadow opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
        >
          <i className="fa-regular fa-eye ml-1" /> مشاهده سریع
        </button>
      </div>

      <div className="p-3.5 flex flex-col flex-1">
        <div className="text-[11px] text-accent font-bold mb-1">
          {p.cat} • کد {p.code}
        </div>
        <Link
          href={href}
          className="font-black text-[13.5px] leading-6 mb-1.5 hover:text-primary transition line-clamp-1"
        >
          {p.name}
        </Link>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Stars rating={p.rating} />
          <span className="text-[11px] text-slate-400 font-bold tick">
            {fa(p.rating)} ({fa(p.reviews)})
          </span>
        </div>

        <div className="mt-auto">
          {p.price ? (
            <div className="flex items-end justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  {p.old && (
                    <span className="text-[11.5px] text-slate-400 line-through tick">{fa(p.old)}</span>
                  )}
                </div>
                <div className="font-black text-deep text-[15px] tick">
                  {fa(p.price)}{" "}
                  <span className="text-[10.5px] font-medium text-slate-400">تومان</span>
                </div>
              </div>
              <button
                type="button"
                aria-label="افزودن به سبد خرید"
                onClick={() => addToCart(p.id)}
                className="w-10 h-10 rounded-xl bg-deep text-white flex items-center justify-center hover:bg-primary hover:scale-105 transition shadow-card shrink-0"
              >
                <i className="fa-solid fa-plus text-sm" />
              </button>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-[12px] font-black text-amber-800 flex items-center justify-between gap-2">
              برای استعلام قیمت تماس بگیرید <i className="fa-solid fa-phone text-[11px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
