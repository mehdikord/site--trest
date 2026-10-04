"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/site";
import { useUI } from "@/context/UIContext";

/** منوی کشویی موبایل */
export function MobileMenu() {
  const pathname = usePathname();
  const { panels, openPanel, openInstallment } = useUI();
  const open = panels.mobileMenu;

  /* بستن منو هنگام تغییر مسیر (نه در رندر اول) */
  const previousPath = useRef(pathname);
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    openPanel("mobileMenu", false);
  }, [pathname, openPanel]);

  return (
    <div className={`fixed inset-0 z-[90] ${open ? "" : "hidden"}`}>
      <div
        className="absolute inset-0 bg-deep/50 backdrop-blur-sm"
        onClick={() => openPanel("mobileMenu", false)}
      />
      <div className="absolute right-0 top-0 h-full w-[86%] max-w-[360px] bg-white rounded-l-[2rem] p-6 flex flex-col gap-2 shadow-pop overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-deep text-white flex items-center justify-center font-black text-xl">
              T
            </div>
            <div className="font-black text-deep">تی رست</div>
          </div>
          <button
            type="button"
            aria-label="بستن منو"
            onClick={() => openPanel("mobileMenu", false)}
            className="w-9 h-9 rounded-xl bg-mist flex items-center justify-center"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => openPanel("mobileMenu", false)}
            className="text-right font-bold p-3.5 rounded-2xl hover:bg-mist"
          >
            {item.label}
            {item.href === "/about" && (
              <span className="text-xs font-medium text-slate-500 block">داستان کارخانه تی‌رست</span>
            )}
          </Link>
        ))}

        <div className="mt-3 bg-gradient-to-bl from-deep to-primary rounded-2xl p-5 text-white">
          <div className="font-black mb-1">خرید اقساطی تی‌رست</div>
          <p className="text-[13px] text-white/80 leading-6 mb-3">
            بدون ضامن، با چک و سفته — تحویل درب منزل
          </p>
          <button
            type="button"
            onClick={() => {
              openPanel("mobileMenu", false);
              openInstallment();
            }}
            className="w-full bg-white text-deep font-bold rounded-xl py-2.5 text-sm"
          >
            درخواست خرید اقساطی
          </button>
        </div>

        <Link
          href="/products"
          onClick={() => openPanel("mobileMenu", false)}
          className="mt-2 w-full text-center bg-deep text-white font-bold rounded-2xl py-3.5"
        >
          مشاهده محصولات
        </Link>
      </div>
    </div>
  );
}
