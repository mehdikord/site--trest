"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Toast, ToastType } from "@/types";

interface ToastContextValue {
  toast: (msg: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const STYLES: Record<ToastType, { box: string; icon: string }> = {
  ok: { box: "border-emerald-200 bg-emerald-50 text-emerald-800", icon: "fa-circle-check text-emerald-500" },
  info: { box: "border-blue-200 bg-blue-50 text-deep", icon: "fa-circle-info text-primary" },
  warn: { box: "border-amber-200 bg-amber-50 text-amber-800", icon: "fa-triangle-exclamation text-amber-500" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((msg: string, type: ToastType = "ok") => {
    const id = Date.now() + Math.random();
    setToasts((list) => [...list, { id, msg, type }]);
    window.setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-[90px] lg:bottom-6 right-4 left-4 sm:left-auto sm:w-[360px] z-[100] space-y-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  const [leaving, setLeaving] = useState(false);
  const style = STYLES[toast.type];

  useEffect(() => {
    const t = window.setTimeout(() => setLeaving(true), 3200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className={`toast-in bg-white border rounded-2xl shadow-pop p-3.5 flex items-start gap-3 border ${style.box}`}
      style={leaving ? { transition: "all .4s", opacity: 0, transform: "translateY(10px)" } : undefined}
    >
      <i className={`fa-solid ${style.icon} mt-0.5`} />
      <div className="text-[13px] font-bold leading-6 flex-1">{toast.msg}</div>
    </div>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
