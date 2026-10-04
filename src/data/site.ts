/** اطلاعات پایه و محتوای ثابت سایت تی‌رست */

export const site = {
  name: "تی رست",
  nameEn: "TREST",
  tagline: "فروشگاه و تولیدکننده مبلمان • از ۱۳۷۸",
  description:
    "تولید مستقیم، قیمت منصفانه، ضمانت ۵ ساله و خرید اقساطی. مبلمان تی‌رست در کارخانه خودمان ساخته و با بسته‌بندی صادراتی به سراسر کشور ارسال می‌شود.",
  topbarText: "ارسال به سراسر کشور • خرید اقساطی بدون ضامن تا ۲۴ ماه • ضمانت ۵ ساله تولیدی تی‌رست",
  phone: "021-91009000",
  phoneDisplay: "021 - 9100 9000",
  mobile: "0912-3456789",
  mobileDisplay: "0912 - 345 6789",
  email: "hello@trest.ir",
  hours: "هر روز ۱۰ تا ۲۲",
  showroom: "تهران، یافت‌آباد، بازار مبل ایران، بلوک ۴، پلاک ۱۲",
  showroomShort: "شوروم یافت‌آباد",
  factory: "کارخانه: جاده ساوه، شهرک صنعتی پرند، خیابان صنعت ۷",
} as const;

/** منوی اصلی سایت */
export const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/products", label: "محصولات" },
  { href: "/categories", label: "دسته‌بندی‌ها" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/rules", label: "قوانین" },
] as const;

/** مارکی زیر هدر */
export const marqueeItems = [
  "چوب راش گرجستان •",
  "پارچه مازراتی ترک •",
  "اسفنج ۳۵ کیلویی یورتان •",
  "رنگ پلی‌یورتان ایتالیایی •",
  "گارانتی ۵ ساله اسکلت •",
  "امکان سفارش رنگ و ابعاد •",
];

/** آمار هیرو صفحه اصلی */
export const heroStats = [
  { value: 27, suffix: "", label: "سال تولید" },
  { value: 14800, suffix: "+", label: "خانواده مشتری" },
  { value: 5, suffix: " ساله", label: "ضمانت تولید" },
];

/** نوار اعتماد */
export const trustItems = [
  {
    icon: "fa-industry",
    theme: "blue",
    title: "تولید مستقیم کارخانه",
    sub: "بدون واسطه، قیمت منصفانه",
  },
  {
    icon: "fa-credit-card",
    theme: "violet",
    title: "خرید اقساطی تی‌رست",
    sub: "تا ۲۴ ماه، تحویل فوری",
  },
  {
    icon: "fa-shield-halved",
    theme: "emerald",
    title: "۵ سال ضمانت‌نامه",
    sub: "اسکلت + خدمات پس از فروش",
  },
  {
    icon: "fa-palette",
    theme: "amber",
    title: "سفارشی‌سازی کامل",
    sub: "رنگ، پارچه و ابعاد دلخواه",
  },
];

/** مراحل تولید در کارخانه */
export const processSteps = [
  { n: "۱", title: "طراحی و نقشه", sub: "مدل‌سازی سه‌بعدی" },
  { n: "۲", title: "برش و کلاف", sub: "چوب راش خشک‌شده" },
  { n: "۳", title: "دوخت و رویه‌کوبی", sub: "دست‌دوز استادکار" },
  { n: "۴", title: "رنگ و پرداخت", sub: "پلی‌یورتان ایتالیا" },
  { n: "check", title: "تست و بسته‌بندی", sub: "QC نهایی + ارسال" },
];

/** ویژگی‌های تولید کارخانه */
export const productionFeatures = [
  { icon: "fa-pen-ruler", title: "طراحی اختصاصی", sub: "تیم دیزاین، ترند روز اروپا" },
  { icon: "fa-tree", title: "انتخاب متریال", sub: "چوب راش، پارچه ترک درجه‌یک" },
  { icon: "fa-hammer", title: "صناعت استادکاران", sub: "کلاف‌کشی، دوخت و منبت دستی" },
  { icon: "fa-microscope", title: "کنترل کیفیت ۱۴ مرحله‌ای", sub: "تست نشست، رنگ و اتصالات" },
];

/** مراحل خرید اقساطی */
export const installmentSteps = [
  { icon: "fa-file-signature", title: "۱. ثبت درخواست", sub: "آنلاین یا حضوری در ۳ دقیقه" },
  { icon: "fa-user-check", title: "۲. اعتبارسنجی سریع", sub: "پاسخ معمولاً همان روز" },
  { icon: "fa-truck-ramp-box", title: "۳. تحویل درب منزل", sub: "نصب و ضمانت‌نامه همراه" },
];

/** مزیت‌های خرید از تولیدکننده */
export const benefits = [
  {
    icon: "fa-tags",
    theme: "blue",
    title: "قیمت کارخانه، بدون واسطه",
    text: "حذف ۲ تا ۳ واسطه یعنی تا ۳۰٪ ارزان‌تر از بازار.",
  },
  {
    icon: "fa-award",
    theme: "emerald",
    title: "ضمانت‌نامه کتبی ۵ ساله",
    text: "اسکلت، اتصالات و خدمات تعمیر در محل.",
  },
  {
    icon: "fa-truck-fast",
    theme: "violet",
    title: "ارسال و نصب تخصصی",
    text: "تیم نصب کارخانه + بیمه حمل سراسری.",
  },
  {
    icon: "fa-rotate-left",
    theme: "amber",
    title: "۷ روز ضمانت بازگشت",
    text: "طبق شرایط مرجوعی، بی‌قید و شرط بررسی می‌شود.",
  },
];

/** جستجوهای پرتکرار */
export const quickSearches = ["مبل راحتی", "کلاسیک", "میز", "صندلی", "سرویس خواب"];

/** دسته‌های شبکه‌های اجتماعی */
export const socials = [
  { icon: "fa-instagram", label: "اینستاگرام", className: "bg-gradient-to-tr from-amber-500 via-rose-500 to-violet-600" },
  { icon: "fa-telegram", label: "تلگرام", className: "bg-[#229ED9]" },
  { icon: "fa-whatsapp", label: "واتساپ", className: "bg-emerald-500" },
  { icon: "fa-linkedin-in", label: "لینکدین", className: "bg-deep" },
];

/** شهرهای فرم سفارش */
export const cities = [
  "تهران",
  "کرج",
  "اصفهان",
  "شیراز",
  "مشهد",
  "تبریز",
  "اهواز",
  "رشت",
  "سایر شهرستان‌ها",
];

/** موضوعات فرم تماس */
export const contactSubjects = [
  "مشاوره خرید",
  "پیگیری سفارش",
  "خرید اقساطی",
  "تولید سفارشی / پروژه‌ای",
  "خدمات پس از فروش",
];
