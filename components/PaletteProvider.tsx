"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import {
  defaultPalette,
  PALETTE_STORAGE_KEY,
  type PaletteId,
} from "@/lib/colorPalettes";

type PaletteContextValue = {
  palette: PaletteId;
  setPalette: (id: PaletteId) => void;
};

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }
  return ctx;
}

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<PaletteId>(defaultPalette);

  useEffect(() => {
    const stored = window.localStorage.getItem(PALETTE_STORAGE_KEY);
    if (stored === "green" || stored === "navy") {
      setPaletteState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-palette", palette);
  }, [palette]);

  const setPalette = (id: PaletteId) => {
    setPaletteState(id);
    window.localStorage.setItem(PALETTE_STORAGE_KEY, id);
  };

  return (
    <PaletteContext.Provider value={{ palette, setPalette }}>
      {children}
    </PaletteContext.Provider>
  );
}
