"use client";

import { useUI } from "@/context/UIContext";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  productId?: number | null;
  subject?: string;
}

/** دکمه بازکردن فرم ثبت سفارش / مشاوره */
export function OrderButton({ children, className = "", productId = null, subject = "" }: ButtonProps) {
  const { openOrder } = useUI();
  return (
    <button type="button" className={className} onClick={() => openOrder(productId, subject)}>
      {children}
    </button>
  );
}

/** دکمه بازکردن فرم خرید اقساطی */
export function InstallmentButton({ children, className = "", productId = null }: ButtonProps) {
  const { openInstallment } = useUI();
  return (
    <button type="button" className={className} onClick={() => openInstallment(productId)}>
      {children}
    </button>
  );
}
