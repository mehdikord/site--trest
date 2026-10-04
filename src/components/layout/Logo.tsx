import Link from "next/link";
import { site } from "@/data/site";

/** لوگوی تی‌رست */
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0">
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-deep via-primary to-accent flex items-center justify-center text-white font-black text-2xl shadow-card relative">
        T
        <span className="absolute -bottom-1 -left-1 w-4 h-4 bg-gold rounded-full border-2 border-white" />
      </div>
      <div className="text-right leading-tight">
        <div className="font-black text-[19px] text-deep tracking-tight">
          {site.name}{" "}
          <span className="text-[11px] font-medium text-accent bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full mr-1">
            {site.nameEn}
          </span>
        </div>
        <div className="text-[11px] text-slate-500 font-medium">{site.tagline}</div>
      </div>
    </Link>
  );
}
