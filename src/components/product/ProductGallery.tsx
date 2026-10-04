"use client";

import { useEffect, useRef, useState } from "react";
import { fa } from "@/lib/format";

interface FullscreenGalleryProps {
  images: string[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

/** نمایش تمام‌صفحه گالری محصول */
export function FullscreenGallery({ images, index, onChange, onClose }: FullscreenGalleryProps) {
  /* بستن با کلید Escape
     توجه: از ref استفاده می‌شود تا لیسنر یک‌بار و برای همیشه ثبت شود.
     اگر onClose در وابستگی‌های effect باشد، با هر رندر حذف/اضافه می‌شود و
     چون رندر هم‌زمان با dispatch کلید انجام می‌شود، رویداد Escape از دست می‌رود. */
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const move = (dir: number) => onChange((index + dir + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[98] flex items-center justify-center bg-deep/95 backdrop-blur p-4">
      <button
        type="button"
        aria-label="بستن"
        onClick={onClose}
        className="absolute top-5 left-5 w-11 h-11 rounded-2xl bg-white/15 text-white flex items-center justify-center hover:bg-white hover:text-deep transition"
      >
        <i className="fa-solid fa-xmark text-lg" />
      </button>
      <button
        type="button"
        aria-label="تصویر بعدی"
        onClick={() => move(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/15 text-white flex items-center justify-center"
      >
        <i className="fa-solid fa-arrow-right" />
      </button>
      <button
        type="button"
        aria-label="تصویر قبلی"
        onClick={() => move(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/15 text-white flex items-center justify-center"
      >
        <i className="fa-solid fa-arrow-left" />
      </button>
      <img
        src={images[index]}
        className="max-h-[85vh] max-w-full rounded-3xl shadow-pop object-contain"
        alt=""
      />
      <div className="absolute bottom-6 text-white/70 text-sm font-bold tick">
        {fa(index + 1)} از {fa(images.length)}
      </div>
    </div>
  );
}

interface ProductGalleryProps {
  images: string[];
  discountBadge?: React.ReactNode;
}

/** گالری تصاویر محصول با زوم و تامبنیل */
export function ProductGallery({ images, discountBadge }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleZoom = (event: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    const frame = frameRef.current;
    if (!img || !frame) return;
    const rect = frame.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(1.9)";
  };

  const resetZoom = () => {
    const img = imgRef.current;
    if (img) img.style.transform = "scale(1)";
  };

  return (
    <div className="p-4 lg:p-7 bg-mist/50">
      <div
        ref={frameRef}
        onMouseMove={handleZoom}
        onMouseLeave={resetZoom}
        className="relative rounded-[1.4rem] overflow-hidden bg-white border border-slate-100 shadow-sm gallery-main group"
      >
        <img
          ref={imgRef}
          src={images[active]}
          className="w-full h-[320px] sm:h-[440px] object-cover transition-transform duration-300"
          alt=""
        />
        <div className="absolute top-3 right-3 flex gap-1.5">{discountBadge}</div>
        <button
          type="button"
          onClick={() => setFullscreen(true)}
          className="absolute bottom-3 left-3 bg-white/95 backdrop-blur text-deep text-[12px] font-black px-3.5 py-2 rounded-xl shadow flex items-center gap-1.5"
        >
          <i className="fa-solid fa-expand" /> بزرگ‌نمایی / تمام‌صفحه
        </button>
        <div className="absolute bottom-3 right-3 bg-deep/70 backdrop-blur text-white text-[11px] px-2.5 py-1 rounded-lg">
          ساخت کارخانه تی‌رست
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 mt-2.5">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`تصویر ${i + 1}`}
            className={`gal-thumb rounded-2xl overflow-hidden border-2 transition ${
              i === active ? "border-deep" : "border-transparent hover:border-accent"
            }`}
          >
            <img src={src} className="w-full h-20 sm:h-24 object-cover" alt="" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3 text-center">
        <div className="bg-white rounded-2xl border border-slate-100 p-3">
          <i className="fa-solid fa-shield-halved text-emerald-500 mb-1" />
          <div className="text-[11.5px] font-black">۵ سال ضمانت</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-3">
          <i className="fa-solid fa-truck-fast text-primary mb-1" />
          <div className="text-[11.5px] font-black">ارسال سراسری</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-3">
          <i className="fa-solid fa-credit-card text-violet-500 mb-1" />
          <div className="text-[11.5px] font-black">خرید اقساطی</div>
        </div>
      </div>

      {fullscreen && (
        <FullscreenGallery
          images={images}
          index={active}
          onChange={setActive}
          onClose={() => setFullscreen(false)}
        />
      )}
    </div>
  );
}
