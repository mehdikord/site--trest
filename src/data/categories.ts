import type { Category } from "@/types";
import { IMG } from "./images";

/** دسته‌بندی‌های اصلی تی‌رست (کلید هر دسته با فیلد cat محصولات یکسان است) */
export const categories: Category[] = [
  {
    "name": "مبل راحتی",
    "key": "راحتی",
    "img": IMG.aria,
    "count": "۴۸ مدل",
    "desc": "نشیمن عمیق خانوادگی"
  },
  {
    "name": "مبل کلاسیک",
    "key": "کلاسیک",
    "img": IMG.royal,
    "count": "۳۲ مدل",
    "desc": "منبت دست استادکار"
  },
  {
    "name": "مبل مدرن",
    "key": "مدرن",
    "img": IMG.modern,
    "count": "۳۶ مدل",
    "desc": "مینیمال و ترند روز"
  },
  {
    "name": "سرویس مبلمان",
    "key": "سرویس خواب",
    "img": IMG.bed,
    "count": "۲۴ مدل",
    "desc": "خواب کامل + مبلمان"
  },
  {
    "name": "صندلی",
    "key": "صندلی",
    "img": IMG.chair,
    "count": "۴۰ مدل",
    "desc": "تک‌نفره و ناهارخوری"
  },
  {
    "name": "میز و اکسسوری",
    "key": "میز",
    "img": IMG.dining,
    "count": "۲۸ مدل",
    "desc": "ناهارخوری و جلو مبلی"
  }
];
