import { trustItems } from "@/data/site";
import { Reveal } from "./Reveal";

const THEMES: Record<string, string> = {
  blue: "bg-blue-50 text-primary",
  violet: "bg-violet-50 text-violet-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
};

interface TrustStripProps {
  className?: string;
}

/** نوار چهارگانه اعتماد (تولید مستقیم، اقساط، ضمانت، سفارشی‌سازی) */
export function TrustStrip({ className = "max-w-7xl mx-auto px-4 lg:px-6 -mt-0 pt-8" }: TrustStripProps) {
  return (
    <section className={className}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {trustItems.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i > 0 ? (Math.min(i, 3) as 1 | 2 | 3) : undefined}
            className="bg-white rounded-2xl border border-slate-100 shadow-card p-4 flex items-center gap-3"
          >
            <div
              className={`w-11 h-11 rounded-xl ${THEMES[item.theme]} flex items-center justify-center text-lg shrink-0`}
            >
              <i className={`fa-solid ${item.icon}`} />
            </div>
            <div>
              <div className="font-black text-[14px]">{item.title}</div>
              <div className="text-[12px] text-slate-500">{item.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
