"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import { discount, fa, monthlyInstallment } from "@/lib/format";
import { site } from "@/data/site";
import { useStore } from "@/context/StoreContext";
import { useUI } from "@/context/UIContext";
import { Stars } from "@/components/common/Stars";
import { ProductGallery } from "./ProductGallery";
import { ProductTabs } from "./ProductTabs";
import { ReviewsSection } from "./ReviewsSection";

/** بدنه صفحه جزئیات محصول */
export function ProductDetail({ product: p }: { product: Product }) {
  const { addToCart, inWishlist, toggleWishlist } = useStore();
  const { openOrder, openInstallment } = useUI();

  const [colorIndex, setColorIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const off = discount(p);
  const wished = inWishlist(p.id);

  const changeQty = (delta: number) => setQty((q) => Math.max(1, Math.min(9, q + delta)));
  const goReviews = () => reviewsRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-card overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <ProductGallery
          images={p.gallery}
          discountBadge={
            <>
              {off > 0 && (
                <span className="bg-rose-500 text-white text-[12px] font-black px-3 py-1 rounded-full">
                  ٪{fa(off)} تخفیف
                </span>
              )}
              {p.badge && (
                <span className="bg-deep/90 text-white text-[12px] font-bold px-3 py-1 rounded-full">
                  {p.badge}
                </span>
              )}
            </>
          }
        />

        <div className="p-5 lg:p-8">
          <div className="flex items-center gap-2 text-[12px] font-bold text-slate-400 mb-2">
            <span>
              <Link href="/" className="hover:text-deep transition">
                خانه
              </Link>{" "}
              /{" "}
              <Link
                href={`/products?cat=${encodeURIComponent(p.cat)}`}
                className="hover:text-deep transition"
              >
                {p.cat}
              </Link>
            </span>
            <span className="bg-mist px-2 py-0.5 rounded-full tick">کد: {p.code}</span>
            <span
              className={`${
                p.available ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              } px-2 py-0.5 rounded-full`}
            >
              {p.available ? "موجود در شوروم و انبار" : "ناموجود — قابل پیش‌ثبت"}
            </span>
          </div>

          <h1 className="font-black text-[21px] lg:text-[27px] leading-[1.5] text-deep mb-2">
            {p.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Stars rating={p.rating} />
            <span className="font-black text-[13px] tick">{fa(p.rating)}</span>
            <button
              type="button"
              onClick={goReviews}
              className="text-accent text-[13px] font-bold hover:underline tick"
            >
              {fa(p.reviews)} دیدگاه خریداران
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-[12.5px] text-slate-500">
              تولید کارخانه تی‌رست • گارانتی اصالت
            </span>
          </div>

          {/* قیمت */}
          <div className="bg-mist border border-blue-100 rounded-2xl p-4 mb-4">
            {p.price ? (
              <>
                <div className="flex items-end justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      {p.old && (
                        <>
                          <span className="text-slate-400 line-through tick text-[14px]">
                            {fa(p.old)} تومان
                          </span>
                          <span className="bg-rose-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full">
                            ٪{fa(off)}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="font-black text-deep text-[26px] tick">
                      {fa(p.price)}{" "}
                      <span className="text-[13px] font-medium text-slate-400">تومان</span>
                    </div>
                    <div className="text-[12px] text-emerald-600 font-bold mt-0.5">
                      سود شما از خرید کارخانه: {p.old ? `${fa(p.old - p.price)} تومان` : "—"}
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="افزودن به علاقه‌مندی‌ها"
                    onClick={() => toggleWishlist(p.id)}
                    className={`w-11 h-11 rounded-2xl ${
                      wished
                        ? "bg-rose-500 text-white"
                        : "bg-white text-slate-400 border border-slate-200"
                    } flex items-center justify-center hover:scale-105 transition`}
                  >
                    <i className={`${wished ? "fa-solid" : "fa-regular"} fa-heart`} />
                  </button>
                </div>
                <div className="mt-3 bg-white rounded-xl p-3 flex items-center justify-between text-[12.5px]">
                  <span className="font-bold text-slate-500">
                    قسط ماهانه از{" "}
                    <span className="text-primary font-black tick">
                      {fa(monthlyInstallment(p.price))} تومان
                    </span>{" "}
                    (۱۲ ماهه)
                  </span>
                  <button
                    type="button"
                    onClick={() => openInstallment(p.id)}
                    className="text-primary font-black hover:underline"
                  >
                    محاسبه اقساط ←
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl">
                  <i className="fa-solid fa-phone" />
                </div>
                <div>
                  <div className="font-black text-[15px]">برای استعلام قیمت تماس بگیرید</div>
                  <div className="text-[13px] text-slate-500">
                    این مدل سفارشی تولید می‌شود —{" "}
                    <span className="font-black text-deep tick" dir="ltr">
                      {site.phone}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* رنگ */}
          <div className="mb-4">
            <div className="font-black text-[13.5px] mb-2">
              رنگ / پارچه: <span className="text-primary">{p.colorNames[colorIndex]}</span>
            </div>
            <div className="flex gap-2">
              {p.colors.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  aria-label={p.colorNames[i]}
                  onClick={() => setColorIndex(i)}
                  className={`swatch w-11 h-11 rounded-2xl border border-slate-200 ${
                    i === colorIndex ? "active" : ""
                  }`}
                  style={{ background: c }}
                />
              ))}
              <button
                type="button"
                onClick={() => openOrder(p.id, "درخواست کاتالوگ پارچه")}
                className="text-[12px] font-bold text-slate-500 border border-dashed border-slate-300 rounded-2xl px-3 hover:border-deep hover:text-deep"
              >
                + ۴۰ رنگ دیگر
              </button>
            </div>
          </div>

          {/* مشخصات خلاصه */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-[12.5px]">
            <div className="bg-white border border-slate-100 rounded-xl p-3">
              <div className="text-slate-400 font-bold text-[11.5px] mb-0.5">ابعاد</div>
              <div className="font-bold">{p.dims}</div>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-3">
              <div className="text-slate-400 font-bold text-[11.5px] mb-0.5">متریال</div>
              <div className="font-bold">{p.material}</div>
            </div>
          </div>

          {/* خرید */}
          <div className="flex items-stretch gap-2 mb-3">
            <div className="flex items-center gap-1 bg-mist rounded-2xl p-1.5">
              <button
                type="button"
                aria-label="کاهش تعداد"
                onClick={() => changeQty(-1)}
                className="w-9 h-10 rounded-xl bg-white shadow-sm font-black text-lg"
              >
                −
              </button>
              <span className="w-8 text-center font-black tick">{fa(qty)}</span>
              <button
                type="button"
                aria-label="افزایش تعداد"
                onClick={() => changeQty(1)}
                className="w-9 h-10 rounded-xl bg-white shadow-sm font-black text-lg"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                addToCart(p.id, qty);
                openOrder(p.id);
              }}
              className="flex-1 btn-sheen bg-gradient-to-l from-deep to-primary text-white font-black rounded-2xl text-[14px] shadow-card hover:shadow-pop transition"
            >
              <i className="fa-solid fa-bag-shopping ml-1" /> ثبت سفارش
            </button>
            <button
              type="button"
              onClick={() => openOrder(p.id, "درخواست مشاوره")}
              className="px-5 border-2 border-deep/15 rounded-2xl font-black text-[13px] hover:border-deep hover:text-deep transition"
            >
              درخواست مشاوره
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => addToCart(p.id, qty)}
              className="bg-mist font-bold py-3 rounded-2xl text-[13px] hover:bg-blue-100 transition"
            >
              افزودن به سبد خرید
            </button>
            <button
              type="button"
              onClick={() => openInstallment(p.id)}
              className="bg-amber-50 border border-amber-200 text-amber-800 font-black py-3 rounded-2xl text-[13px] hover:bg-amber-100 transition"
            >
              <i className="fa-solid fa-credit-card ml-1" /> خرید اقساطی این مدل
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[12px] text-slate-500 bg-blue-50/60 border border-blue-100 rounded-xl p-3">
            <i className="fa-solid fa-truck-fast text-primary" /> ارسال به تهران ۲ تا ۴ روزه •
            شهرستان ۵ تا ۹ روزه با بیمه حمل و نصب رایگان
          </div>
        </div>
      </div>

      <ProductTabs product={p} />

      <div ref={reviewsRef}>
        <ReviewsSection product={p} />
      </div>
    </div>
  );
}
