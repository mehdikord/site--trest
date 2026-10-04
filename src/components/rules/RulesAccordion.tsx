"use client";

import { useState } from "react";
import { rulesData } from "@/data/rules";

/** نگاشت رنگ آیکون‌ها به کلاس‌های ثابت Tailwind */
const ACCENTS: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  violet: "bg-violet-50 text-violet-600",
  rose: "bg-rose-50 text-rose-600",
};

/** آکاردئون قوانین و مقررات */
export function RulesAccordion() {
  const [open, setOpen] = useState<number[]>([0]);

  const toggle = (index: number) =>
    setOpen((list) => (list.includes(index) ? list.filter((i) => i !== index) : [...list, index]));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-3">
      {rulesData.map((rule, i) => {
        const isOpen = open.includes(i);
        return (
          <div
            key={rule.t}
            className={`accordion ${isOpen ? "open" : ""} bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden`}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-3 p-5 text-right"
            >
              <span
                className={`w-11 h-11 shrink-0 rounded-xl ${ACCENTS[rule.c]} flex items-center justify-center`}
              >
                <i className={`fa-solid ${rule.i}`} />
              </span>
              <span className="font-black text-[15px] flex-1">{rule.t}</span>
              <span className="acc-icon w-8 h-8 rounded-full bg-mist flex items-center justify-center text-deep shrink-0">
                <i className="fa-solid fa-plus text-xs" />
              </span>
            </button>
            <div className="accordion-body">
              <div className="px-5 pb-5 pt-0 space-y-2">
                {rule.b.map((text) => (
                  <div
                    key={text}
                    className="flex gap-2.5 bg-mist/70 rounded-xl p-3.5 text-[13.5px] leading-7 text-slate-600"
                  >
                    <i className="fa-solid fa-circle-check text-emerald-500 mt-1.5 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
