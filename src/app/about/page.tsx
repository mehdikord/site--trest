import type { Metadata } from "next";
import { IMG } from "@/data/images";
import Link from "next/link";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "داستان کارخانه تی‌رست؛ از کارگاه ۲۰۰ متری در یافت‌آباد تا کارخانه ۶٬۰۰۰ متری با ۸۰ استادکار و شوروم ۱٬۲۰۰ متری.",
};

const HERO_STATS = [
  { value: "27", label: "سال تجربه" },
  { value: "80+", label: "استادکار" },
  { value: "14k+", label: "مشتری وفادار" },
];

const HERO_IMAGES = [
  {
    src: IMG.modern,
    className: "rounded-3xl h-56 w-full object-cover border-4 border-white/15",
  },
  {
    src: IMG.factory,
    className: "rounded-3xl h-56 w-full object-cover mt-6 border-4 border-white/15",
  },
  {
    src: IMG.desk,
    className: "rounded-3xl h-48 w-full object-cover border-4 border-white/15",
  },
  {
    src: IMG.aria,
    className: "rounded-3xl h-48 w-full object-cover mt-6 border-4 border-white/15",
  },
];

const TIMELINE = [
  {
    badge: "78",
    badgeClass: "bg-deep text-white",
    cardClass: "bg-white rounded-2xl border border-slate-100 shadow-card p-5 flex-1",
    titleClass: "font-black text-deep",
    textClass: "text-[13.5px] text-slate-500 leading-7 mt-1",
    title: "۱۳۷۸ — تولد در یافت‌آباد",
    text: "کارگاه کوچک نجاری حاج‌اکبر رستمی با ۴ شاگرد؛ تخصص: مبل کلاسیک دست‌ساز.",
  },
  {
    badge: "88",
    badgeClass: "bg-primary text-white",
    cardClass: "bg-white rounded-2xl border border-slate-100 shadow-card p-5 flex-1",
    titleClass: "font-black text-deep",
    textClass: "text-[13.5px] text-slate-500 leading-7 mt-1",
    title: "۱۳۸۸ — کارخانه صنعتی",
    text: "انتقال به سوله ۶٬۰۰۰ متری، راه‌اندازی خط رنگ کوره‌ای و واحد طراحی صنعتی.",
  },
  {
    badge: "96",
    badgeClass: "bg-accent text-white",
    cardClass: "bg-white rounded-2xl border border-slate-100 shadow-card p-5 flex-1",
    titleClass: "font-black text-deep",
    textClass: "text-[13.5px] text-slate-500 leading-7 mt-1",
    title: "۱۳۹۶ — برند «تی‌رست» و شوروم",
    text: "افتتاح شوروم ۱٬۲۰۰ متری، ثبت برند و شروع فروش مستقیم بدون واسطه.",
  },
  {
    badge: "04",
    badgeClass: "bg-gold text-deep",
    cardClass: "bg-gradient-to-l from-deep to-primary rounded-2xl p-5 flex-1 text-white shadow-card",
    titleClass: "font-black",
    textClass: "text-[13.5px] text-white/75 leading-7 mt-1",
    title: "۱۴۰۴ — خرید اقساطی و تولید سفارشی",
    text: "راه‌اندازی واحد سفارشی‌سازی (ابعاد/پارچه/رنگ) و طرح خرید اقساطی اختصاصی تی‌رست.",
  },
];

const VALUES = [
  {
    icon: "fa-gem",
    theme: "bg-blue-50 text-primary",
    title: "کیفیتِ ماندگار",
    text: "متریال درجه‌یک، گارانتی ۵ ساله و تعمیر مادام‌العمر. مبلی که برای نسل بعدی هم بماند.",
  },
  {
    icon: "fa-handshake",
    theme: "bg-emerald-50 text-emerald-600",
    title: "صداقت کارخانه",
    text: "قیمت شفاف تولید، پیش‌فاکتور رسمی و اعلام دقیق زمان تحویل. بدون هزینه پنهان.",
  },
  {
    icon: "fa-lightbulb",
    theme: "bg-amber-50 text-amber-600",
    title: "نوآوری در تولید",
    text: "طراحی به‌روز، ارگونومی علمی نشست و امکان تولید اختصاصی برای هتل و پروژه‌ها.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* هیرو */}
      <div className="relative bg-gradient-to-bl from-deep via-[#0e4d94] to-primary text-white py-14 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-amber-300 font-bold text-[13px] mb-2">داستان ما • از ۱۳۷۸ تا امروز</div>
            <h1 className="font-black text-[28px] lg:text-[40px] leading-[1.4] mb-4">
              تی‌رست؛ جایی که چوب،
              <br />
              به خانه تبدیل می‌شود
            </h1>
            <p className="text-white/75 leading-8 text-[14.5px]">
              از یک کارگاه ۲۰۰ متری در یافت‌آباد شروع کردیم؛ امروز با کارخانه ۶٬۰۰۰ متری، شوروم
              ۱٬۲۰۰ متری و ۸۰ استادکار، یکی از معدود برندهایی هستیم که از طراحی تا تحویل را خودمان
              انجام می‌دهیم.
            </p>
            <div className="flex gap-3 mt-6">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/12 border border-white/20 rounded-2xl px-5 py-3 text-center"
                >
                  <div className="font-black text-xl">{stat.value}</div>
                  <div className="text-[11px] text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {HERO_IMAGES.map((image) => (
              <img key={image.src} src={image.src} className={image.className} alt="کارخانه تی‌رست" />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        {/* خط زمانی */}
        <div className="text-center mb-10">
          <h2 className="font-black text-[26px] text-deep">سفر تولید تی‌رست</h2>
          <p className="text-slate-500 text-[14px]">خط زمانی افتخار ما</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute right-[19px] top-2 bottom-2 w-[3px] timeline-line rounded-full" />
          <div className="space-y-5">
            {TIMELINE.map((item) => (
              <div key={item.badge} className="flex gap-4">
                <div
                  className={`w-10 h-10 shrink-0 rounded-2xl ${item.badgeClass} flex items-center justify-center font-black text-sm z-10 shadow-card`}
                >
                  {item.badge}
                </div>
                <div className={item.cardClass}>
                  <div className={item.titleClass}>{item.title}</div>
                  <p className={item.textClass}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ارزش‌ها */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="bg-white rounded-3xl border border-slate-100 shadow-card p-7 text-center"
            >
              <div
                className={`w-14 h-14 mx-auto rounded-2xl ${value.theme} text-2xl flex items-center justify-center mb-3`}
              >
                <i className={`fa-solid ${value.icon}`} />
              </div>
              <div className="font-black text-[16px] mb-1">{value.title}</div>
              <p className="text-[13px] text-slate-500 leading-7">{value.text}</p>
            </div>
          ))}
        </div>

        {/* شوروم و کارخانه */}
        <div className="mt-10 bg-white rounded-[2rem] border border-slate-100 shadow-card p-7 lg:p-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-black text-[22px] text-deep mb-3">
              شوروم + کارخانه؛ دو تجربه در یک آدرس
            </h3>
            <p className="text-slate-500 text-[14px] leading-8 mb-5">
              شوروم مرکزی ما در بازار مبل یافت‌آباد، هر روز از ۱۰ صبح تا ۱۰ شب پذیرای شماست. با
              هماهنگی قبلی می‌توانید از خط تولید هم بازدید کنید و فرآیند ساخت مبل خودتان را از نزدیک
              ببینید.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-deep text-white text-sm font-bold px-6 py-3 rounded-xl"
              >
                اطلاعات تماس و آدرس
              </Link>
              <Link
                href="/products"
                className="border-2 border-slate-200 text-sm font-bold px-6 py-3 rounded-xl hover:border-deep"
              >
                دیدن محصولات
              </Link>
            </div>
          </div>
          <img
            src={IMG.royal}
            className="rounded-3xl h-72 w-full object-cover"
            alt="شوروم تی‌رست"
          />
        </div>
      </div>
    </>
  );
}
