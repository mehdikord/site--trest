import Link from "next/link";

interface PageBannerProps {
  breadcrumb: string;
  title: string;
  subtitle?: string;
  /** نمایش الگوی نقطه‌ای روی پس‌زمینه */
  pattern?: boolean;
  className?: string;
  titleClassName?: string;
}

/** بنر بالای صفحات داخلی با عنوان و مسیر راهنما */
export function PageBanner({
  breadcrumb,
  title,
  subtitle,
  pattern = false,
  className = "bg-gradient-to-bl from-deep to-primary text-white py-10",
  titleClassName = "font-black text-[26px] lg:text-[36px] mb-2",
}: PageBannerProps) {
  return (
    <div className={`${className} relative overflow-hidden`}>
      {pattern && <div className="absolute inset-0 hero-pattern opacity-40" />}
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-[12.5px] text-white/60 font-semibold mb-2">
          <Link href="/" className="hover:text-white transition">
            خانه
          </Link>{" "}
          / <span className="text-white">{breadcrumb}</span>
        </div>
        <h1 className={titleClassName}>{title}</h1>
        {subtitle && <p className="text-white/70 text-[14px] mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
