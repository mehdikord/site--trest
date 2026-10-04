"use client";

import { useEffect, useRef, useState } from "react";

interface RevealOptions {
  /** نمایش فوری بدون انتظار برای اسکرول (برای بخش‌های بالای صفحه) */
  immediate?: boolean;
}

/**
 * هوک نمایش تدریجی عناصر هنگام اسکرول (معادل تابع observeReveals نسخه اصلی)
 * روی هر عنصری (div، a، button و ...) قابل استفاده است.
 */
export function useReveal<T extends HTMLElement>({ immediate = false }: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const [visible] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return { ref, className: visible ? "visible" : "" };
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** تاخیر انیمیشن: ۱ تا ۳ */
  delay?: 1 | 2 | 3;
  immediate?: boolean;
  id?: string;
}

/** پوشش ساده برای انیمیشن ورود بخش‌ها */
export function Reveal({ children, className = "", delay, immediate = false, id }: RevealProps) {
  const { ref, className: visible } = useReveal<HTMLDivElement>({ immediate });

  return (
    <div
      id={id}
      ref={ref}
      className={`reveal ${delay ? `reveal-d${delay}` : ""} ${visible} ${className}`}
    >
      {children}
    </div>
  );
}
