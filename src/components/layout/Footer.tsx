import Link from "next/link";
import { categories } from "@/data/categories";
import { site, socials } from "@/data/site";
import { InstallmentButton } from "@/components/common/Buttons";
import { NewsletterForm } from "./NewsletterForm";

/** برچسب دسته‌ها در فوتر (مطابق نسخه اصلی) */
const FOOTER_CATEGORIES = categories.map((c) => ({
  key: c.key,
  label: c.key === "سرویس خواب" ? "سرویس خواب و مبلمان" : c.name,
}));

/** فوتر سراسری سایت */
export function Footer() {
  const quickLinks = [
    { href: "/", label: "خانه" },
    { href: "/products", label: "همه محصولات" },
    { href: "/about", label: "درباره تی‌رست و کارخانه" },
    { href: "/contact", label: "تماس با ما" },
    { href: "/rules", label: "قوانین و مقررات" },
  ];

  return (
    <footer className="bg-deep text-white relative overflow-hidden mt-4">
      <div className="absolute inset-0 hero-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 pt-12 pb-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-deep flex items-center justify-center font-black text-2xl">
                T
              </div>
              <div>
                <div className="font-black text-xl">
                  {site.name}{" "}
                  <span className="text-[11px] font-medium text-white/60">{site.nameEn}</span>
                </div>
                <div className="text-[12px] text-white/60">فروشگاه و تولیدکننده مبلمان از ۱۳۷۸</div>
              </div>
            </div>
            <p className="text-white/65 text-[13.5px] leading-7 mb-5 max-w-sm">{site.description}</p>

            <div className="bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center justify-between gap-3 mb-4">
              <div>
                <div className="font-black text-[14px]">خرید اقساطی تی‌رست</div>
                <div className="text-[12px] text-white/60">تا ۲۴ ماه • تحویل فوری</div>
              </div>
              <InstallmentButton className="bg-gold text-deep text-[13px] font-black px-5 py-2.5 rounded-xl shrink-0 hover:bg-white transition">
                درخواست اقساط
              </InstallmentButton>
            </div>

            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white hover:text-deep transition"
                >
                  <i className={`fa-brands ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-black mb-4 text-[15px]">دسترسی سریع</div>
            <div className="space-y-2.5 text-[13.5px] text-white/70">
              {quickLinks.map((l) => (
                <Link key={l.href} href={l.href} className="block hover:text-white transition">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-black mb-4 text-[15px]">دسته‌بندی‌ها</div>
            <div className="space-y-2.5 text-[13.5px] text-white/70">
              {FOOTER_CATEGORIES.map((c) => (
                <Link
                  key={c.key}
                  href={`/products?cat=${encodeURIComponent(c.key)}`}
                  className="block hover:text-white transition"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-black mb-4 text-[15px]">خدمات مشتریان</div>
            <div className="space-y-3 text-[13px] text-white/70">
              <div className="flex gap-2.5">
                <i className="fa-solid fa-phone mt-1 text-accent" />
                <span dir="ltr" className="tick">
                  {site.phoneDisplay}
                </span>
              </div>
              <div className="flex gap-2.5">
                <i className="fa-solid fa-envelope mt-1 text-accent" />
                <span dir="ltr">{site.email}</span>
              </div>
              <div className="flex gap-2.5">
                <i className="fa-solid fa-location-dot mt-1 text-accent" />
                <span>یافت‌آباد، بازار مبل ایران، بلوک ۴، پلاک ۱۲</span>
              </div>
              <div className="flex gap-2.5">
                <i className="fa-solid fa-clock mt-1 text-accent" />
                <span>{site.hours}</span>
              </div>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-white/12 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/50">
          <span>© ۱۴۰۵ تی‌رست — کلیه حقوق مادی و معنوی محفوظ است. (نسخه نمایشی)</span>
          <div className="flex gap-4 font-semibold">
            <Link href="/rules">حریم خصوصی</Link>
            <Link href="/rules">شرایط بازگشت</Link>
            <Link href="/rules">گارانتی</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
