export type PaletteId = "green" | "navy";

export const PALETTE_STORAGE_KEY = "palette-preference";

export const defaultPalette: PaletteId = "green";

export const colorPalettes: Record<
  PaletteId,
  { id: PaletteId; label: string; icon: string; swatch: string }
> = {
  green: {
    id: "green",
    label: "Green",
    icon: "🟢",
    swatch: "#1f4d3d",
  },
  navy: {
    id: "navy",
    label: "Navy",
    icon: "🔵",
    swatch: "#142c44",
  },
};

export const paletteOrder: PaletteId[] = ["green", "navy"];
