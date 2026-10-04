"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";

/** ناوبری پایین صفحه در موبایل */
export function MobileBottomNav() {
  const pathname = usePathname();
  const { openPanel } = useUI();

  const itemClass = (active: boolean) =>
    `mnav flex flex-col items-center gap-1 py-1.5 rounded-xl ${
      active ? "text-deep" : "text-slate-400"
    }`;

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 glass border-t border-slate-200 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5 gap-1 py-2">
          <Link href="/" className={itemClass(pathname === "/")}>
            <i className="fa-solid fa-house" />
            <span className="text-[10.5px] font-bold">خانه</span>
          </Link>

          <Link href="/products" className={itemClass(pathname.startsWith("/products"))}>
            <i className="fa-solid fa-border-all" />
            <span className="text-[10.5px] font-bold">محصولات</span>
          </Link>

          <button
            type="button"
            onClick={() => openPanel("cartDrawer")}
            className="flex flex-col items-center gap-1 py-1.5 rounded-xl text-slate-400 relative"
          >
            <span className="w-11 h-11 -mt-7 rounded-2xl bg-gradient-to-br from-deep to-primary text-white flex items-center justify-center text-lg shadow-pop border-4 border-[#F5F8FC]">
              <i className="fa-solid fa-bag-shopping" />
            </span>
            <span className="text-[10.5px] font-bold -mt-1">سبد خرید</span>
          </button>

          <button
            type="button"
            onClick={() => openPanel("wishlistDrawer")}
            className="flex flex-col items-center gap-1 py-1.5 rounded-xl text-slate-400"
          >
            <i className="fa-regular fa-heart" />
            <span className="text-[10.5px] font-bold">علاقه‌ها</span>
          </button>

          <Link href="/contact" className={itemClass(pathname.startsWith("/contact"))}>
            <i className="fa-solid fa-headset" />
            <span className="text-[10.5px] font-bold">پشتیبانی</span>
          </Link>
        </div>
      </nav>
      <div className="h-[76px] lg:hidden" />
    </>
  );
}
