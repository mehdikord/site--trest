# تی رست (TREST) — وب‌سایت فروشگاه و تولیدکننده مبلمان

پروژه‌ی کامل **Next.js (App Router) + TypeScript + Tailwind CSS v4** که از روی نسخه‌ی تک‌فایلی
(HTML/CSS/JS) سایت تی‌رست ساخته شده است. ظاهر، رنگ‌بندی، انیمیشن‌ها، متن‌ها و تمام
رفتارهای نسخه‌ی اصلی (سبد خرید، علاقه‌مندی‌ها، جستجو، فیلترها، فرم‌ها، محاسبه‌گر اقساط)
عیناً حفظ شده است؛ فقط معماری پروژه به یک اپلیکیشن استاندارد Next.js با صفحات و کامپوننت‌های
مجزا تبدیل شده است.

> این پروژه برای اجرا روی سرور لینوکسی به‌صورت سرویس (`npm start`) آماده است و **خروجی آن
> static export نیست**.

---

## ۱. پیش‌نیازها

- Node.js نسخه ۲۰.۹ یا بالاتر (توصیه: ۲۰ LTS یا ۲۲)
- npm نسخه ۱۰ یا بالاتر

بررسی نسخه‌ها:

```bash
node -v
npm -v
```

## ۲. نصب و اجرا در حالت توسعه

```bash
npm install       # نصب وابستگی‌ها
npm run dev       # اجرای سرور توسعه روی http://localhost:3000
```

## ۳. ساخت و اجرای نسخه‌ی production (سرویس)

```bash
npm run build     # ساخت نسخه production
npm start         # اجرای سرویس روی 0.0.0.0:3000
```

دستور `npm start` در `package.json` به شکل زیر تنظیم شده است:

```json
"start": "next start -H 0.0.0.0 -p 3000"
```

بنابراین سرویس روی همه‌ی اینترفیس‌ها (`0.0.0.0`) و پورت `3000` بالا می‌آید و از بیرون هم
قابل دسترسی است.

### اجرا به‌صورت سرویس systemd

فایل `/etc/systemd/system/trest.service`:

```ini
[Unit]
Description=Trest Furniture Website (Next.js)
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/trest
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

فعال‌سازی و اجرا:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now trest
sudo systemctl status trest
sudo journalctl -u trest -f      # مشاهده لاگ‌ها
```

اگر می‌خواهید روی پورت دیگری اجرا شود، مقدار `-p` را در اسکریپت `start` (فایل `package.json`)
تغییر دهید یا در سرویس از `-- -p 8080` استفاده کنید.

### اجرای پشت Nginx (پیشنهادی)

```nginx
server {
    listen 80;
    server_name trest.ir www.trest.ir;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## ۴. ساختار پروژه

```
trest-next/
├── src/
│   ├── app/                          # صفحات (App Router)
│   │   ├── layout.tsx                # لایوت اصلی: هدر، فوتر، منو، کشوها، مودال‌ها، RTL
│   │   ├── page.tsx                  # صفحه اصلی
│   │   ├── products/page.tsx         # کاتالوگ محصولات (فیلترها سمت سرور + فیلتر آنی)
│   │   ├── products/[id]/page.tsx    # صفحه جزئیات محصول (SSG + متادیتای اختصاصی)
│   │   ├── categories/page.tsx       # صفحه دسته‌بندی‌ها (صفحه جدید، هم‌تم با سایت)
│   │   ├── about/page.tsx            # درباره ما
│   │   ├── contact/page.tsx          # تماس با ما
│   │   ├── rules/page.tsx            # قوانین و مقررات
│   │   ├── not-found.tsx             # صفحه ۴۰۴
│   │   ├── icon.svg                  # فاوآیکون
│   │   └── globals.css               # Tailwind v4 + توکن‌های طراحی + استایل‌های سفارشی
│   ├── components/
│   │   ├── layout/                   # TopBar, Header, MobileMenu, SearchOverlay,
│   │   │                             # MobileBottomNav, Footer, PageTransition, Logo
│   │   ├── home/                     # Hero, CategoriesSection, FlashSale,
│   │   │                             # FeaturedProducts, ManufacturingStory,
│   │   │                             # InstallmentSection, BenefitsShowroom,
│   │   │                             # Testimonials, FinalCta
│   │   ├── catalog/                  # CatalogView, FiltersPanel, InstallmentStrip
│   │   ├── products/                 # ProductCard
│   │   ├── product/                  # ProductDetail, ProductGallery, ProductTabs, ReviewsSection
│   │   ├── drawers/                  # CartDrawer, WishlistDrawer
│   │   ├── modals/                   # QuickViewModal, OrderModal (سفارش + اقساط)
│   │   ├── contact/                  # ContactForm
│   │   ├── rules/                    # RulesAccordion
│   │   └── common/                   # Reveal, Stars, Counter, SectionHeading,
│   │                                 # PageBanner, TrustStrip, CategoryCard, Buttons
│   ├── context/                      # StoreContext (سبد/علاقه‌مندی)، UIContext، ToastContext
│   ├── data/                         # محصولات، دسته‌بندی‌ها، نظرات، قوانین، اطلاعات سایت
│   ├── lib/                          # format.ts (اعداد فارسی/تخفیف)، catalog.ts (فیلترها)
│   └── types/                        # تایپ‌های TypeScript
├── public/
│   └── images/                       # تصاویر لوکال محصولات، دسته‌بندی‌ها و آواتارها
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

### نقشه‌ی تبدیل نسخه‌ی تک‌فایلی به پروژه Next.js

| نسخه تک‌فایلی | پروژه Next.js |
| --- | --- |
| تابع `showPage('products')` | مسیر واقعی `/products` با `<Link>` |
| `showPage('about' / 'contact' / 'rules')` | مسیرهای `/about`, `/contact`, `/rules` |
| `scrollToCats()` در هدر | صفحه‌ی مستقل `/categories` |
| `openProduct(id)` | مسیر داینامیک `/products/[id]` |
| `cardHTML()` | کامپوننت `ProductCard` |
| `renderHome()` و بخش‌های آن | کامپوننت‌های `components/home/*` |
| `filterHTML()` + `renderCatalog()` | `components/catalog/*` با فیلترهای همگام با URL |
| `renderDetail()` | `components/product/ProductDetail` (+ گالری، تب‌ها، نظرات) |
| `openQuick` / `openOrder` / `openInstallment` | `QuickViewModal` و `OrderModal` |
| `toggleCart` / `toggleWishlistDrawer` | `CartDrawer` / `WishlistDrawer` |
| `toast()` | `ToastContext` |
| توابع `fa`, `faToman`, `discount` | `src/lib/format.ts` |
| آبجکت‌های داده‌ی درون فایل | `src/data/*` |

---

## ۵. نمای صفحات (اسکرین‌شات‌ها)

اسکرین‌شات‌های واقعی از اجرای پروژه در پوشه `docs/screenshots` قرار دارند:

| صفحه | دسکتاپ | موبایل / تبلت |
| --- | --- | --- |
| صفحه اصلی | `docs/screenshots/home-desktop.png` | `docs/screenshots/home-mobile.png` |
| کاتالوگ محصولات | `docs/screenshots/products-desktop.png` | `docs/screenshots/products-tablet.png` |
| جزئیات محصول | `docs/screenshots/product-detail-desktop.png` | `docs/screenshots/product-detail-mobile.png` |
| دسته‌بندی‌ها | `docs/screenshots/categories-desktop.png` | — |
| تماس با ما | `docs/screenshots/contact-desktop.png` | — |

## ۶. نکات فنی

- **RTL و فونت:** `<html lang="fa" dir="rtl">` و فونت Vazirmatn به‌صورت لوکال
  (پکیج `@fontsource-variable/vazirmatn`) بارگذاری می‌شود؛ نیازی به CDN گوگل نیست.
- **آیکون‌ها:** Font Awesome 6 به‌صورت پکیج npm (`@fortawesome/fontawesome-free`) نصب و
  در `globals.css` ایمپورت شده است؛ کلاس‌های `fa-solid` / `fa-regular` / `fa-brands` دقیقاً
  مثل نسخه‌ی اصلی استفاده شده‌اند.
- **Tailwind CSS v4:** تنظیمات تم (رنگ‌های `deep`, `primary`, `accent`, `mist`, `ink`, `gold`،
  سایه‌ها و `rounded-4xl`) به‌صورت CSS-first داخل `globals.css` با `@theme` تعریف شده است.
- **سبد خرید و علاقه‌مندی‌ها:** در `StoreContext` مدیریت می‌شوند و در `localStorage` ذخیره
  می‌شوند (پس از رفرش باقی می‌مانند). مقادیر اولیه مثل نسخه‌ی اصلی نمایشی هستند.
- **فیلترهای کاتالوگ:** با آدرس صفحه همگام‌اند، مثلاً:
  `/products?cat=راحتی&style=مدرن&off=1&sort=cheap&q=آریا`
  نسخه‌ی اولیه سمت سرور رندر می‌شود (SEO) و فیلترها در مرورگر آنی اعمال می‌شوند.
- **تصاویر (کاملاً لوکال):** همه‌ی تصاویر محصولات، دسته‌بندی‌ها، بنرها و آواتارها داخل پروژه
  در مسیر `public/images` قرار دارند و با آدرس‌هایی مثل `/images/aria.jpg` سرو می‌شوند؛
  هیچ درخواستی به سرور خارجی (Unsplash/Pravatar) زده نمی‌شود، پس روی سرور بدون اینترنت هم
  تصاویر نمایش داده می‌شوند. برای جایگزینی با عکس‌های واقعی کارخانه، کافی است همان نام‌ها را
  در `public/images` جایگزین کنید (یا کلیدها را در `src/data/images.ts` تغییر دهید —
  این فایل تنها منبع آدرس تصاویر در کل پروژه است).
- **SEO:** برای هر صفحه `metadata` اختصاصی و برای محصولات `generateMetadata` و
  `generateStaticParams` تعریف شده است.
- **دسترس‌پذیری و ریسپانسیو:** تمام کلاس‌های ریسپانسیو نسخه‌ی اصلی (`sm`, `md`, `lg`, `xl`)
  عیناً حفظ شده و برای دکمه‌های آیکونی `aria-label` اضافه شده است.

## ۷. اسکریپت‌ها

| دستور | توضیح |
| --- | --- |
| `npm run dev` | اجرای سرور توسعه |
| `npm run build` | ساخت نسخه production |
| `npm start` | اجرای سرویس (0.0.0.0:3000) |
| `npm run lint` | بررسی کد با ESLint |
| `npm run typecheck` | بررسی تایپ‌ها با TypeScript |

## ۸. شخصی‌سازی سریع محتوا

- محصولات، قیمت‌ها، رنگ‌ها و گالری‌ها: `src/data/products.ts`
- دسته‌بندی‌ها: `src/data/categories.ts`
- شماره تماس، آدرس، شبکه‌های اجتماعی و متن‌های عمومی: `src/data/site.ts`
- قوانین و مقررات: `src/data/rules.ts`
- نظرات نمایشی محصول: `src/data/reviews.ts`
- رنگ‌های برند: بلوک `@theme` در `src/app/globals.css`
- تصاویر: پوشه `public/images` + نقشه آدرس‌ها در `src/data/images.ts`
