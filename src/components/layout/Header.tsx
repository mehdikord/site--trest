"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/site";
import { products } from "@/data/products";
import { fa } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import { useUI } from "@/context/UIContext";
import { Logo } from "./Logo";

/** جستجوی محصولات برای هدر و اورلی جستجو */
export function searchProducts(query: string) {
  const q = query.trim();
  if (!q) return [];
  return products
    .filter((p) => p.name.includes(q) || p.cat.includes(q) || p.style.includes(q))
    .slice(0, 5);
}

export function Header() {
  const pathname = usePathname();
  const { cartCount, wishlist } = useStore();
  const { openPanel } = useUI();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inputBoxRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* بستن نتایج جستجوی هدر با کلیک بیرون از آن */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (inputBoxRef.current?.contains(target) || resultsRef.current?.contains(target)) return;
      setShowResults(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const results = searchProducts(query);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 glass border-b border-slate-200/70 transition-all ${
        scrolled ? "shadow-card" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-[72px] gap-3">
          <Logo />

          {/* ناوبری دسکتاپ */}
          <nav className="hidden lg:flex items-center gap-1 text-[14.5px] font-semibold text-slate-700">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-deep transition ${
                  isActive(item.href) ? "text-deep bg-blue-50" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* اکشن‌ها */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="جستجو"
              onClick={() => openPanel("searchOverlay")}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-deep hover:border-deep/30 hover:shadow-card transition"
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>

            <button
              type="button"
              aria-label="علاقه‌مندی‌ها"
              onClick={() => openPanel("wishlistDrawer")}
              className="hidden sm:flex w-10 h-10 rounded-xl bg-white border border-slate-200 items-center justify-center text-slate-600 hover:text-deep transition relative"
            >
              <i className="fa-regular fa-heart" />
              <span className="absolute -top-1.5 -left-1.5 min-w-[20px] h-5 px-1 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                {fa(wishlist.length)}
              </span>
            </button>

            <button
              type="button"
              aria-label="سبد خرید"
              onClick={() => openPanel("cartDrawer")}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-deep transition relative"
            >
              <i className="fa-solid fa-bag-shopping" />
              <span className="absolute -top-1.5 -left-1.5 min-w-[20px] h-5 px-1 rounded-full bg-deep text-white text-[11px] font-bold flex items-center justify-center">
                {fa(cartCount)}
              </span>
            </button>

            <Link
              href="/products"
              className="hidden md:flex btn-sheen items-center gap-2 bg-gradient-to-l from-deep to-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-card hover:shadow-pop transition"
            >
              مشاهده محصولات <i className="fa-solid fa-arrow-left text-xs" />
            </Link>

            <button
              type="button"
              aria-label="منو"
              onClick={() => openPanel("mobileMenu")}
              className="lg:hidden w-10 h-10 rounded-xl bg-deep text-white flex items-center justify-center"
            >
              <i className="fa-solid fa-bars" />
            </button>
          </div>
        </div>

        {/* جستجوی درون‌هدر دسکتاپ */}
        <div className="hidden lg:flex pb-3 -mt-1">
          <div
            ref={inputBoxRef}
            className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 focus-within:border-accent focus-within:shadow-card transition"
          >
            <i className="fa-solid fa-magnifying-glass text-slate-400 text-sm" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              placeholder="جستجو در مبلمان تی‌رست... (مثلا: مبل راحتی، میز ناهارخوری)"
              className="flex-1 bg-transparent text-sm placeholder:text-slate-400"
            />
            <span className="text-[11px] text-slate-400 bg-mist px-2 py-1 rounded-lg hidden xl:block">
              + ۲۵۰ مدل تولید کارخانه
            </span>
          </div>
        </div>
      </div>

      {/* نتایج جستجوی هدر */}
      <div
        ref={resultsRef}
        className={`${showResults && query.trim() ? "" : "hidden"} max-w-7xl mx-auto px-6 pb-3`}
      >
        <div className="bg-white rounded-2xl border border-slate-200 shadow-pop p-2 grid gap-1">
          {results.length > 0 ? (
            results.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                onClick={() => {
                  setQuery("");
                  setShowResults(false);
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-mist text-right transition"
              >
                <img src={p.img} className="w-12 h-12 rounded-xl object-cover" alt={p.name} />
                <span className="flex-1">
                  <span className="block font-black text-[13px]">{p.name}</span>
                  <span className="text-[12px] text-primary font-bold tick">
                    {p.price ? fa(p.price) : "استعلام قیمت"}
                  </span>
                </span>
                <i className="fa-solid fa-arrow-left text-slate-300 text-xs" />
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-[13px] text-slate-400">
              نتیجه‌ای برای «{query}» پیدا نشد
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
