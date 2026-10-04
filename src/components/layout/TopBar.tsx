import { site } from "@/data/site";

/** نوار بالای هدر */
export function TopBar() {
  return (
    <div className="bg-deep text-white text-[12.5px] py-2 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          {site.topbarText}
        </p>
        <div className="hidden md:flex items-center gap-4 shrink-0 text-white/80">
          <span className="flex items-center gap-1.5">
            <i className="fa-solid fa-phone text-[11px]" /> {site.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <i className="fa-solid fa-location-dot text-[11px]" /> {site.showroomShort}
          </span>
        </div>
      </div>
    </div>
  );
}
