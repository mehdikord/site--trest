interface StarsProps {
  rating: number;
  className?: string;
}

/** ستاره‌های امتیاز محصول (معادل تابع stars نسخه اصلی) */
export function Stars({ rating, className = "" }: StarsProps) {
  return (
    <span className={`flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.round(rating);
        return (
          <i
            key={i}
            className={`fa-${filled ? "solid" : "regular"} fa-star ${
              filled ? "text-amber-400" : "text-slate-300"
            } text-[12px]`}
          />
        );
      })}
    </span>
  );
}
