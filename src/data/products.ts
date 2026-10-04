import type { Product } from "@/types";
import { IMG } from "./images";

export const products: Product[] = [
  {
    "id": 1,
    "name": "ست مبل راحتی ۷ نفره آریا",
    "cat": "راحتی",
    "price": 48500000,
    "old": 62000000,
    "rating": 4.8,
    "reviews": 214,
    "img": IMG.aria,
    "gallery": [
      IMG.aria,
      IMG.modern,
      IMG.living
    ],
    "colors": [
      "#0B3A6E",
      "#9AA5B1",
      "#D9C5A0"
    ],
    "colorNames": [
      "آبی نفتی",
      "طوسی",
      "کرمی"
    ],
    "material": "پارچه مازراتی ترک + چوب راش",
    "style": "مدرن",
    "available": true,
    "badge": "پرفروش کارخانه",
    "isFlash": true,
    "isNew": false,
    "pop": 98,
    "code": "TR-101",
    "dims": "کاناپه ۲۲۰×۹۵ • مبل تک ۸۵×۹۰",
    "desc": "ست آریا پرفروش‌ترین تولید تی‌رست است؛ نشیمن عمیق و ارگونومیک، اسفنج ۳۵ کیلویی و کلاف چوب راش گرجستان. انتخاب اول خانواده‌های پرجمعیت."
  },
  {
    "id": 2,
    "name": "مبل کلاسیک ۸ نفره سلطنتی دیبا",
    "cat": "کلاسیک",
    "price": 98500000,
    "old": 118000000,
    "rating": 4.9,
    "reviews": 96,
    "img": IMG.royal,
    "gallery": [
      IMG.royal,
      IMG.dark,
      IMG.living2
    ],
    "colors": [
      "#7A5C2E",
      "#3B2F2F",
      "#E8DCC8"
    ],
    "colorNames": [
      "گردویی",
      "قهوه‌ای سوخته",
      "کرم"
    ],
    "material": "چوب راش + منبت دستی + پارچه یزد",
    "style": "کلاسیک",
    "available": true,
    "badge": "ساخت استادکار",
    "isFlash": true,
    "isNew": false,
    "pop": 88,
    "code": "TR-202",
    "dims": "کاناپه ۲۴۰×۱۰۰ • میزبان ۷۰×۷۵",
    "desc": "منبت تمام‌دست استادکاران تی‌رست، رنگ پلی‌یورتان ایتالیایی و دوخت ژورنال. شکوهی که فقط تولیدکننده واقعی می‌تواند تضمین کند."
  },
  {
    "id": 3,
    "name": "مبل مدرن مینیمال نُردیک",
    "cat": "مدرن",
    "price": 36900000,
    "old": 44000000,
    "rating": 4.7,
    "reviews": 158,
    "img": IMG.modern,
    "gallery": [
      IMG.modern,
      IMG.living,
      IMG.aria
    ],
    "colors": [
      "#EDEAE3",
      "#A8B5A0",
      "#0B3A6E"
    ],
    "colorNames": [
      "شنی",
      "سبز مریم",
      "سرمه‌ای"
    ],
    "material": "پارچه کتان + پایه چوبی",
    "style": "مینیمال",
    "available": true,
    "badge": "تخفیف شگفت‌انگیز",
    "isFlash": true,
    "isNew": true,
    "pop": 92,
    "code": "TR-303",
    "dims": "کاناپه ۲۰۰×۸۸ • عمق نشیمن ۶۰",
    "desc": "خطوط تمیز اسکاندیناوی، پایه‌های مخروطی چوبی و نشیمن نرم اما فرم‌دار. ایده‌آل آپارتمان‌های مدرن."
  },
  {
    "id": 4,
    "name": "میز ناهارخوری ۸ نفره رستا + صندلی",
    "cat": "میز",
    "price": 32800000,
    "old": 39500000,
    "rating": 4.6,
    "reviews": 74,
    "img": IMG.dining,
    "gallery": [
      IMG.dining,
      IMG.desk,
      IMG.dark
    ],
    "colors": [
      "#6B4A2B",
      "#1F2937"
    ],
    "colorNames": [
      "گردویی",
      "مشکی"
    ],
    "material": "صفحه MDF روکش بلوط + پایه فلزی",
    "style": "مدرن",
    "available": true,
    "badge": "ست کامل",
    "isFlash": true,
    "isNew": false,
    "pop": 76,
    "code": "TR-404",
    "dims": "میز ۲۰۰×۱۰۰ • صندلی ۴۵×۵۰",
    "desc": "ست ناهارخوری رستا با ۸ صندلی ارگونومیک، تولید یکپارچه کارخانه؛ مقاوم در برابر خط و خش و رطوبت."
  },
  {
    "id": 5,
    "name": "صندلی راحتی تک‌نفره لئو",
    "cat": "صندلی",
    "price": 8900000,
    "old": 11200000,
    "rating": 4.5,
    "reviews": 187,
    "img": IMG.chair,
    "gallery": [
      IMG.chair,
      IMG.chair2,
      IMG.modern
    ],
    "colors": [
      "#D9C5A0",
      "#5B7A6B",
      "#C96F4A"
    ],
    "colorNames": [
      "کرمی",
      "سبز",
      "آجری"
    ],
    "material": "پارچه مخمل + اسفنج HR",
    "style": "مدرن",
    "available": true,
    "badge": "پیشنهاد طراحان",
    "isFlash": false,
    "isNew": true,
    "pop": 84,
    "code": "TR-505",
    "dims": "۷۵×۸۰×۹۵ سانتی‌متر",
    "desc": "گوشه دنج مطالعه و استراحت؛ صندلی لئو با تکیه‌گاه طبی و دسته‌های پهن، امضای گوشه‌های خاص خانه."
  },
  {
    "id": 6,
    "name": "سرویس خواب دونفره ماهور + آینه و پاتختی",
    "cat": "سرویس خواب",
    "price": null,
    "old": null,
    "rating": 4.9,
    "reviews": 63,
    "img": IMG.bed,
    "gallery": [
      IMG.bed,
      IMG.dark,
      IMG.modern
    ],
    "colors": [
      "#E8DCC8",
      "#6B4A2B"
    ],
    "colorNames": [
      "کرمی",
      "گردویی"
    ],
    "material": "چوب راش + MDF وکیوم",
    "style": "نئوکلاسیک",
    "available": true,
    "badge": "سفارشی‌سازی",
    "isFlash": false,
    "isNew": true,
    "pop": 70,
    "code": "TR-606",
    "dims": "تخت ۲۰۰×۱۸۰ • کمد ۱۸۰×۶۰",
    "desc": "سرویس ماهور کاملاً سفارشی تولید می‌شود؛ رنگ، ابعاد تخت و تعداد کشو را خودت انتخاب کن. برای استعلام قیمت تماس بگیر."
  },
  {
    "id": 7,
    "name": "کاناپه سه‌نفره مایا — پارچه تدی",
    "cat": "راحتی",
    "price": 19800000,
    "old": 24900000,
    "rating": 4.6,
    "reviews": 142,
    "img": IMG.sofa2,
    "gallery": [
      IMG.sofa2,
      IMG.aria,
      IMG.living2
    ],
    "colors": [
      "#F3EFE7",
      "#9AA5B1"
    ],
    "colorNames": [
      "تدی سفید",
      "طوسی روشن"
    ],
    "material": "پارچه تدی ترک + فوم سرد",
    "style": "مدرن",
    "available": true,
    "badge": "ترند ۱۴۰۵",
    "isFlash": true,
    "isNew": true,
    "pop": 90,
    "code": "TR-707",
    "dims": "۲۱۰×۹۰×۸۵ سانتی‌متر",
    "desc": "نرم‌ترین کاناپه کارخانه؛ پارچه تدی ضدپرز با قابلیت تعویض کاور و شست‌وشو."
  },
  {
    "id": 8,
    "name": "صندلی ناهارخوری مدل کارن (ست ۴ عددی)",
    "cat": "صندلی",
    "price": 12400000,
    "old": null,
    "rating": 4.4,
    "reviews": 58,
    "img": IMG.chair2,
    "gallery": [
      IMG.chair2,
      IMG.dining,
      IMG.chair
    ],
    "colors": [
      "#1F2937",
      "#D9C5A0"
    ],
    "colorNames": [
      "مشکی",
      "کرمی"
    ],
    "material": "پلی‌پروپیلن + پایه چوبی",
    "style": "مینیمال",
    "available": true,
    "badge": "",
    "isFlash": false,
    "isNew": false,
    "pop": 62,
    "code": "TR-808",
    "dims": "۴۵×۵۰×۸۲ سانتی‌متر",
    "desc": "ست ۴ عددی سبک، مقاوم و خوش‌نشست؛ تولید انبوه کارخانه با قیمت باورنکردنی."
  },
  {
    "id": 9,
    "name": "مبل ال راحتی نیلوفر + پاف",
    "cat": "راحتی",
    "price": 42500000,
    "old": 51000000,
    "rating": 4.7,
    "reviews": 109,
    "img": IMG.living,
    "gallery": [
      IMG.living,
      IMG.living2,
      IMG.aria
    ],
    "colors": [
      "#0B3A6E",
      "#5B7A6B"
    ],
    "colorNames": [
      "سرمه‌ای",
      "سبز"
    ],
    "material": "پارچه نانو ضدلک",
    "style": "مدرن",
    "available": false,
    "badge": "ناموجود موقت",
    "isFlash": false,
    "isNew": false,
    "pop": 80,
    "code": "TR-909",
    "dims": "ال ۲۸۰×۱۸۰ • پاف ۶۰×۶۰",
    "desc": "مبل ال جادار با پارچه نانو ضدلک و ضدآب؛ مناسب خانواده‌های بچه‌دار. سری جدید به‌زودی از خط تولید می‌رسد."
  },
  {
    "id": 10,
    "name": "ست پذیرایی فرانسوی ژینو",
    "cat": "کلاسیک",
    "price": 76800000,
    "old": 89000000,
    "rating": 4.8,
    "reviews": 81,
    "img": IMG.living2,
    "gallery": [
      IMG.living2,
      IMG.royal,
      IMG.modern
    ],
    "colors": [
      "#E8DCC8",
      "#C9A86A"
    ],
    "colorNames": [
      "کرم طلایی",
      "شامپاینی"
    ],
    "material": "چوب راش + پارچه ژاکارد",
    "style": "کلاسیک",
    "available": true,
    "badge": "تولید محدود",
    "isFlash": false,
    "isNew": false,
    "pop": 74,
    "code": "TR-110",
    "dims": "۷ نفره + میز جلو مبلی",
    "desc": "ظرافت فرانسوی با اصالت تولید ایرانی؛ پایه‌های خراطی‌شده و دوخت لمسه‌کاری پشتی."
  },
  {
    "id": 11,
    "name": "میز جلو مبلی و عسلی ست پارما",
    "cat": "میز",
    "price": 9800000,
    "old": 13500000,
    "rating": 4.5,
    "reviews": 93,
    "img": IMG.desk,
    "gallery": [
      IMG.desk,
      IMG.dining,
      IMG.dark
    ],
    "colors": [
      "#6B4A2B",
      "#111827"
    ],
    "colorNames": [
      "گردویی",
      "مشکی"
    ],
    "material": "MDF + شیشه سکوریت",
    "style": "مدرن",
    "available": true,
    "badge": "۲۷٪ تخفیف",
    "isFlash": true,
    "isNew": false,
    "pop": 68,
    "code": "TR-111",
    "dims": "جلو مبلی ۱۲۰×۶۰ • عسلی ۴۵×۴۵",
    "desc": "ست ۳ تکه پارما؛ ترکیب چوب و شیشه دودی برای پذیرایی‌های مینیمال."
  },
  {
    "id": 12,
    "name": "مبل راحتی چستر مدل لندن",
    "cat": "راحتی",
    "price": 54900000,
    "old": null,
    "rating": 4.9,
    "reviews": 177,
    "img": IMG.dark,
    "gallery": [
      IMG.dark,
      IMG.aria,
      IMG.sofa2
    ],
    "colors": [
      "#1F3A2E",
      "#3B2F2F"
    ],
    "colorNames": [
      "سبز یشمی",
      "قهوه‌ای"
    ],
    "material": "چرم ناپا + لمسه دست‌دوز",
    "style": "کلاسیک مدرن",
    "available": true,
    "badge": "امضای تی‌رست",
    "isFlash": false,
    "isNew": false,
    "pop": 95,
    "code": "TR-112",
    "dims": "۳+۲+۱ • لمسه‌کاری کامل",
    "desc": "چستر اصیل انگلیسی با لمسه تمام‌دست؛ ۴۲۰ دوخت دستی روی هر کاناپه. شناسنامه تولید همراه محصول."
  }
];

export const getProductById = (id: number): Product | undefined =>
  products.find((p) => p.id === id);

export const getRelatedProducts = (product: Product, limit = 4): Product[] =>
  products
    .filter((p) => p.cat === product.cat && p.id !== product.id)
    .concat(products.filter((p) => p.cat !== product.cat))
    .slice(0, limit);

export const flashProducts = products.filter((p) => p.isFlash);
