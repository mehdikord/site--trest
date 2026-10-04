interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  /** هم‌ترازی وسط (برای بخش نظرات) */
  center?: boolean;
  className?: string;
  action?: React.ReactNode;
}

/** تیتر استاندارد بخش‌ها با خط تزئینی و متن کوچک بالای آن */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  className = "",
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={`${
        center ? "text-center" : "flex items-end justify-between"
      } mb-6 ${className}`}
    >
      <div>
        <div
          className={`text-accent font-bold text-[13px] ${
            center ? "" : "mb-1 flex items-center gap-2"
          }`}
        >
          {!center && <span className="w-8 h-[3px] bg-accent rounded-full inline-block" />}
          {eyebrow}
        </div>
        <h2 className="font-black text-[24px] lg:text-[30px] text-deep">{title}</h2>
        {subtitle && <p className="text-slate-500 text-[14px] mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
