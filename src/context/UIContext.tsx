"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { SiteModal } from "@/types";

type Panel = "mobileMenu" | "searchOverlay" | "cartDrawer" | "wishlistDrawer" | "filterDrawer";

interface UIContextValue {
  panels: Record<Panel, boolean>;
  openPanel: (panel: Panel, open?: boolean) => void;
  closeAllPanels: () => void;
  quickViewId: number | null;
  openQuickView: (id: number | null) => void;
  modal: SiteModal | null;
  openOrder: (productId?: number | null, subject?: string) => void;
  openInstallment: (productId?: number | null) => void;
  closeModal: () => void;
}

const CLOSED: Record<Panel, boolean> = {
  mobileMenu: false,
  searchOverlay: false,
  cartDrawer: false,
  wishlistDrawer: false,
  filterDrawer: false,
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [panels, setPanels] = useState<Record<Panel, boolean>>(CLOSED);
  const [quickViewId, setQuickViewId] = useState<number | null>(null);
  const [modal, setModal] = useState<SiteModal | null>(null);

  const openPanel = useCallback((panel: Panel, open = true) => {
    setPanels((state) => ({ ...state, [panel]: open }));
  }, []);

  const closeAllPanels = useCallback(() => setPanels(CLOSED), []);

  const openQuickView = useCallback((id: number | null) => setQuickViewId(id), []);

  const openOrder = useCallback((productId: number | null = null, subject = "") => {
    setQuickViewId(null);
    setModal({ kind: "order", productId, subject });
  }, []);

  const openInstallment = useCallback((productId: number | null = null) => {
    setQuickViewId(null);
    setModal({ kind: "installment", productId });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  /* بستن همه لایه‌ها با کلید Escape */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setQuickViewId(null);
      setModal(null);
      closeAllPanels();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeAllPanels]);

  const value = useMemo(
    () => ({
      panels,
      openPanel,
      closeAllPanels,
      quickViewId,
      openQuickView,
      modal,
      openOrder,
      openInstallment,
      closeModal,
    }),
    [panels, openPanel, closeAllPanels, quickViewId, openQuickView, modal, openOrder, openInstallment, closeModal]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
