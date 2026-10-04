"use client";

import Link from "next/link";
import { getProductById } from "@/data/products";
import { discount, fa } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import { useUI } from "@/context/UIContext";
import { Stars } from "@/components/common/Stars";

/** مودال مشاهده سریع محصول */
export function QuickViewModal() {
  const { quickViewId, openQuickView } = useUI();
  const { addToCart } = useStore();
  const product = quickViewId ? getProductById(quickViewId) : undefined;
  const close = () => openQuickView(null);

  if (!product) return null;
  const p = product;
  const off = discount(p);

  return (
    <div className="fixed inset-0 z-[96] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-deep/60 backdrop-blur-md" onClick={close} />
      <div className="relative bg-white rounded-[1.8rem] max-w-3xl w-full overflow-hidden shadow-pop max-h-[92vh] overflow-y-auto">
        <div className="grid sm:grid-cols-2">
          <div className="relative min-h-[260px]">
            <img
              src={p.img}
              className="absolute inset-0 w-full h-full object-cover sm:rounded-r-[1.8rem]"
              alt={p.name}
            />
            <button
              type="button"
              aria-label="بستن"
              onClick={close}
              className="sm:hidden absolute top-3 left-3 w-9 h-9 rounded-xl bg-white flex items-center justify-center"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="text-[12px] text-accent font-bold">
                {p.cat} • {p.code}
              </div>
              <button
                type="button"
                aria-label="بستن"
                onClick={close}
                className="hidden sm:flex w-8 h-8 rounded-lg bg-mist items-center justify-center shrink-0"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>
            <h3 className="font-black text-[17px] mb-2">{p.name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <Stars rating={p.rating} />
              <span className="text-[12px] text-slate-400 tick">{fa(p.reviews)} دیدگاه</span>
            </div>

            {p.price ? (
              <div className="flex items-center gap-2 mb-4">
                <span className="font-black text-deep text-[20px] tick">{fa(p.price)}</span>
                <span className="text-[12px] text-slate-400">تومان</span>
                {p.old && (
                  <>
                    <span className="text-slate-400 line-through text-[13px] tick">{fa(p.old)}</span>
                    <span className="bg-rose-50 text-rose-600 text-[11px] font-black px-2 py-0.5 rounded-full">
                      ٪{fa(off)}
                    </span>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[13px] font-black rounded-xl p-3 mb-4">
                برای استعلام قیمت تماس بگیرید — 021-91009000
              </div>
            )}

            <p className="text-[13px] text-slate-500 leading-7 mb-4 line-clamp-3">{p.desc}</p>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href={`/products/${p.id}`}
                onClick={close}
                className="bg-deep text-white font-bold py-3 rounded-xl text-[13px] text-center"
              >
                صفحه محصول
              </Link>
              <button
                type="button"
                onClick={() => {
                  close();
                  addToCart(p.id);
                }}
                className="border-2 border-deep/15 font-bold py-3 rounded-xl text-[13px] hover:border-deep"
              >
                افزودن به سبد
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
