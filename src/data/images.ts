/**
 * تصاویر پروژه — همه فایل‌ها به‌صورت لوکال در پوشه public/images قرار دارند
 * و آدرس آن‌ها از ریشه سایت سرو می‌شود (بدون وابستگی به سرویس خارجی).
 *
 * برای جایگزینی با عکس‌های واقعی کارخانه کافی است فایل‌ها را در
 * public/images نگه دارید و نام‌ها را همین‌جا به‌روز کنید.
 */
export const IMG = {
  aria: "/images/aria.jpg",
  royal: "/images/royal.jpg",
  modern: "/images/modern.jpg",
  dining: "/images/dining.jpg",
  chair: "/images/chair.jpg",
  chair2: "/images/chair2.jpg",
  living: "/images/living.jpg",
  living2: "/images/living2.jpg",
  bed: "/images/bed.jpg",
  desk: "/images/desk.jpg",
  dark: "/images/dark.jpg",
  sofa2: "/images/sofa2.jpg",
  factory: "/images/factory.jpg",
} as const;

/** آواتارهای نمایشی مشتریان (صفحه اصلی و بخش نظرات) */
export const AVATARS = {
  "12": "/images/avatar-12.jpg",
  "32": "/images/avatar-32.jpg",
  "47": "/images/avatar-47.jpg",
} as const;
