import type { NextConfig } from "next";

/**
 * تنظیمات پروژه تی‌رست
 * ------------------------------------------------------------
 * این پروژه برای اجرا به صورت سرویس لینوکسی (npm start) ساخته شده است
 * و خروجی آن به هیچ عنوان export / static نیست.
 * در صورت تمایل می‌توانید در سرور output: "standalone" را فعال کنید.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // همه تصاویر پروژه به‌صورت لوکال در پوشه public/images قرار دارند و
  // از ریشه دامنه سرو می‌شوند (بدون وابستگی به سرور یا CDN خارجی).
};

export default nextConfig;
