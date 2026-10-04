"use client";

import { useEffect, useState } from "react";
import { fa } from "@/lib/format";

interface CounterProps {
  value: number;
  className?: string;
}

/** شمارنده انیمیشنی اعداد (معادل animateCounters نسخه اصلی) */
export function Counter({ value, className = "" }: CounterProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.round(value / 60));
    const timer = window.setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        window.clearInterval(timer);
      }
      setCurrent(current);
    }, 30);
    return () => window.clearInterval(timer);
  }, [value]);

  return <span className={className}>{fa(current)}</span>;
}
