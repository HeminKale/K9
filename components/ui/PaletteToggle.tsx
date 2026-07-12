"use client";

import { usePalette } from "@/components/PaletteProvider";
import { Button } from "@/components/ui/button";
import { colorPalettes, paletteOrder } from "@/lib/colorPalettes";

export function PaletteToggle({ className }: { className?: string }) {
  const { palette, setPalette } = usePalette();

  const nextPalette = () => {
    const currentIndex = paletteOrder.indexOf(palette);
    const next = paletteOrder[(currentIndex + 1) % paletteOrder.length];
    setPalette(next);
  };

  const current = colorPalettes[palette];

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={`Switch color palette (currently ${current.label})`}
      onClick={nextPalette}
      className={className}
    >
      <span aria-hidden="true">{current.icon}</span>
      {current.label}
    </Button>
  );
}
