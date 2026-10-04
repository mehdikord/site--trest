import type { Product } from "@/types";

/** تبدیل عدد به عدد فارسی با جداکننده هزارگان */
export const fa = (n: number | string): string => Number(n).toLocaleString("fa-IR");

/** نمایش قیمت به تومان */
export const faToman = (n: number | null | undefined): string => (n == null ? "" : `${fa(n)} تومان`);

/** درصد تخفیف محصول */
export const discount = (p: Product): number =>
  p.old && p.price ? Math.round(((p.old - p.price) / p.old) * 100) : 0;

/** قسط ماهانه تقریبی (۷۰٪ مبلغ تقسیم بر تعداد ماه) */
export const monthlyInstallment = (price: number, months = 12): number =>
  Math.round((price * 0.7) / months);

/** اعتبارسنجی موبایل ایران */
export const isValidMobile = (v: string): boolean => /^09\d{9}$/.test(v.trim());

/** اعتبارسنجی ایمیل */
export const isValidEmail = (v: string): boolean => /^\S+@\S+\.\S+$/.test(v.trim());
