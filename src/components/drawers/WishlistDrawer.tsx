"use client";

import Link from "next/link";
import { fa } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import { useUI } from "@/context/UIContext";

/** کشوی علاقه‌مندی‌ها */
export function WishlistDrawer() {
  const { wishProducts, toggleWishlist } = useStore();
  const { panels, openPanel } = useUI();
  const open = panels.wishlistDrawer;

  return (
    <div className={`fixed inset-0 z-[95] ${open ? "" : "hidden"}`}>
      <div
        className="absolute inset-0 bg-deep/50 backdrop-blur-sm"
        onClick={() => openPanel("wishlistDrawer", false)}
      />
      <div className="absolute left-0 top-0 h-full w-[92%] max-w-[400px] bg-white rounded-r-[1.8rem] flex flex-col overflow-hidden shadow-pop">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="font-black">علاقه‌مندی‌ها</div>
          <button
            type="button"
            aria-label="بستن علاقه‌مندی‌ها"
            onClick={() => openPanel("wishlistDrawer", false)}
            className="w-9 h-9 rounded-xl bg-mist flex items-center justify-center"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {wishProducts.length === 0 ? (
            <div className="text-center py-14 text-slate-400">
              <i className="fa-regular fa-heart text-4xl mb-3 block" />
              <div className="font-black text-ink">هنوز چیزی ذخیره نکردی</div>
            </div>
          ) : (
            wishProducts.map((p) => (
              <div key={p.id} className="bg-mist rounded-2xl p-3 flex gap-3">
                <img src={p.img} className="w-16 h-16 rounded-xl object-cover" alt={p.name} />
                <div className="flex-1">
                  <div className="font-black text-[13px]">{p.name}</div>
                  <div className="font-black text-primary text-[13px] tick mt-1">
                    {p.price ? fa(p.price) : "استعلام قیمت"}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Link
                      href={`/products/${p.id}`}
                      onClick={() => openPanel("wishlistDrawer", false)}
                      className="text-[12px] font-bold bg-white px-3 py-1.5 rounded-lg border"
                    >
                      مشاهده
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(p.id)}
                      className="text-[12px] font-bold text-rose-500"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
