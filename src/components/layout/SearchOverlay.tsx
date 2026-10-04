"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { quickSearches } from "@/data/site";
import { fa } from "@/lib/format";
import { useUI } from "@/context/UIContext";
import { searchProducts } from "./Header";

/** اورلی جستجو با جستجوهای پرتکرار */
export function SearchOverlay() {
  const { panels, openPanel } = useUI();
  const open = panels.searchOverlay;
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /* فوکوس خودکار روی ورودی هنگام باز شدن اورلی */
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => window.clearTimeout(timer);
  }, [open]);

  const results = searchProducts(query);

  return (
    <div className={`fixed inset-0 z-[90] ${open ? "" : "hidden"}`}>
      <div
        className="absolute inset-0 bg-deep/60 backdrop-blur-md"
        onClick={() => openPanel("searchOverlay", false)}
      />
      <div className="relative max-w-2xl mx-auto mt-[10vh] px-4">
        <div className="bg-white rounded-[1.8rem] shadow-pop overflow-hidden">
          <div className="flex items-center gap-3 p-5 border-b border-slate-100">
            <i className="fa-solid fa-magnifying-glass text-accent" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="دنبال چه مبلی هستی؟"
              className="flex-1 text-[15px]"
            />
            <button
              type="button"
              aria-label="بستن جستجو"
              onClick={() => openPanel("searchOverlay", false)}
              className="w-9 h-9 rounded-xl bg-mist flex items-center justify-center"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="p-4">
            <div className="text-xs font-bold text-slate-400 mb-3">جستجوهای پرتکرار</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {quickSearches.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuery(q)}
                  className="px-3 py-1.5 rounded-full bg-mist text-[13px] font-semibold hover:bg-deep hover:text-white transition"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="grid gap-2 max-h-[45vh] overflow-y-auto">
              {query.trim() &&
                (results.length > 0 ? (
                  results.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      onClick={() => openPanel("searchOverlay", false)}
                      className="flex items-center gap-3 bg-mist rounded-2xl p-3 text-right hover:bg-blue-50 transition"
                    >
                      <img src={p.img} className="w-14 h-14 rounded-xl object-cover" alt={p.name} />
                      <span className="flex-1">
                        <span className="block font-black text-[13.5px]">{p.name}</span>
                        <span className="text-[12px] text-slate-500">
                          {p.cat} •{" "}
                          <span className="text-primary font-bold tick">
                            {p.price ? fa(p.price) : "استعلامی"}
                          </span>
                        </span>
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="text-center text-[13px] text-slate-400 py-6">
                    چیزی پیدا نشد — «مبل راحتی» را امتحان کن
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
