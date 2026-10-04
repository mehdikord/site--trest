"use client";

import Link from "next/link";
import { fa, faToman } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import { useUI } from "@/context/UIContext";
import { useToast } from "@/context/ToastContext";

const FREE_SHIPPING = 30_000_000;

/** کشوی سبد خرید */
export function CartDrawer() {
  const { cartLines, cartCount, cartTotal, changeQty, removeFromCart } = useStore();
  const { panels, openPanel, openOrder, openInstallment } = useUI();
  const { toast } = useToast();
  const open = panels.cartDrawer;

  const pct = Math.min(100, Math.round((cartTotal / FREE_SHIPPING) * 100));
  const shipLabel =
    cartTotal >= FREE_SHIPPING
      ? "تبریک! ارسال تهران رایگان شد"
      : `تا ارسال رایگان ${fa(FREE_SHIPPING - cartTotal)} تومان مانده`;

  const checkout = () => {
    if (!cartLines.length) {
      toast("سبد خرید خالی است", "warn");
      return;
    }
    openPanel("cartDrawer", false);
    openOrder(cartLines[0].product.id);
  };

  return (
    <div className={`fixed inset-0 z-[95] ${open ? "" : "hidden"}`}>
      <div
        className="absolute inset-0 bg-deep/50 backdrop-blur-sm"
        onClick={() => openPanel("cartDrawer", false)}
      />
      <div className="absolute left-0 top-0 h-full w-[92%] max-w-[420px] bg-[#F5F8FC] rounded-r-[1.8rem] flex flex-col overflow-hidden shadow-pop">
        <div className="bg-white p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="font-black text-[16px]">
            سبد خرید{" "}
            <span className="text-[12px] bg-blue-50 text-primary px-2 py-0.5 rounded-full font-bold">
              {fa(cartCount)} کالا
            </span>
          </div>
          <button
            type="button"
            aria-label="بستن سبد خرید"
            onClick={() => openPanel("cartDrawer", false)}
            className="w-9 h-9 rounded-xl bg-mist flex items-center justify-center"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="px-5 pt-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-3.5">
            <div className="flex justify-between text-[12px] font-bold mb-2">
              <span>{shipLabel}</span>
              <span className="text-primary tick">{fa(pct)}٪</span>
            </div>
            <div className="h-2.5 bg-mist rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-l from-deep to-accent rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5">
              ارسال رایگان تهران برای خرید بالای ۳۰ میلیون تومان
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cartLines.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center text-2xl text-slate-300 mb-3 shadow-sm">
                <i className="fa-solid fa-bag-shopping" />
              </div>
              <div className="font-black">سبد خالی است</div>
              <p className="text-[13px] text-slate-500 mb-4">از کاتالوگ کارخانه انتخاب کن</p>
              <Link
                href="/products"
                onClick={() => openPanel("cartDrawer", false)}
                className="bg-deep text-white text-sm font-bold px-6 py-2.5 rounded-xl"
              >
                مشاهده محصولات
              </Link>
            </div>
          ) : (
            cartLines.map(({ product: p, qty }) => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-100 p-3 flex gap-3 shadow-sm">
                <Link href={`/products/${p.id}`} onClick={() => openPanel("cartDrawer", false)}>
                  <img src={p.img} className="w-[74px] h-[74px] rounded-xl object-cover shrink-0" alt={p.name} />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-[13px] leading-5 truncate">{p.name}</div>
                  <div className="text-[11.5px] text-slate-400 mb-1.5">کد {p.code}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-mist rounded-xl p-1">
                      <button
                        type="button"
                        aria-label="کاهش تعداد"
                        onClick={() => changeQty(p.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white shadow-sm font-black"
                      >
                        −
                      </button>
                      <span className="w-7 text-center font-black text-[13px] tick">{fa(qty)}</span>
                      <button
                        type="button"
                        aria-label="افزایش تعداد"
                        onClick={() => changeQty(p.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white shadow-sm font-black"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-black text-deep text-[13px] tick">
                      {p.price ? fa(p.price * qty) : "استعلامی"}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="حذف از سبد"
                  onClick={() => removeFromCart(p.id)}
                  className="text-slate-300 hover:text-rose-500 transition self-start"
                >
                  <i className="fa-regular fa-trash-can" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="bg-white border-t border-slate-100 p-5">
          <div className="flex justify-between text-[13px] font-bold mb-1">
            <span className="text-slate-500">جمع اقلام</span>
            <span className="tick">{faToman(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-[13px] font-bold mb-3">
            <span className="text-slate-500">هزینه ارسال</span>
            <span className="text-emerald-600">در شوروم مشخص می‌شود</span>
          </div>
          <button
            type="button"
            onClick={checkout}
            className="w-full btn-sheen bg-gradient-to-l from-deep to-primary text-white font-black py-3.5 rounded-2xl text-sm shadow-card mb-2"
          >
            ثبت درخواست سفارش
          </button>
          <button
            type="button"
            onClick={() => {
              openPanel("cartDrawer", false);
              openInstallment();
            }}
            className="w-full border-2 border-amber-300 bg-amber-50 text-amber-800 font-bold py-3 rounded-2xl text-[13px]"
          >
            یا خرید اقساطی کل سبد <i className="fa-solid fa-credit-card mr-1" />
          </button>
          <p className="text-center text-[11px] text-slate-400 mt-2">
            تسویه نهایی فقط در شوروم یا با مشاور فروش — بدون پرداخت آنلاین
          </p>
        </div>
      </div>
    </div>
  );
}
