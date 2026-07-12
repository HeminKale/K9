"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

import { useActiveTab } from "@/components/TabsProvider";
import { Button } from "@/components/ui/button";
import { PaletteToggle } from "@/components/ui/PaletteToggle";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trackEvent } from "@/lib/analytics";
import { business } from "@/lib/constants";
import { images } from "@/lib/imageConfig";
import { useHasMounted } from "@/lib/hooks/useHasMounted";
import { tabGroups } from "@/lib/tabConfig";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mounted = useHasMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const { setActiveTab } = useActiveTab();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const goToContact = (ctaLocation: string) => {
    setActiveTab("contact");
    trackEvent("cta_click", {
      cta_label: "Book Consultation",
      cta_location: ctaLocation,
    });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/90 shadow-md backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="container flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading font-semibold text-primary-600 dark:text-primary-300"
          onClick={() => setActiveTab(tabGroups[0].id)}
        >
          <Image
            src={images.logo.url}
            alt={images.logo.alt}
            width={48}
            height={48}
            className="rounded-full"
          />
          <span className="text-sm sm:text-base">{business.name}</span>
        </Link>

        <TabsList className="hidden md:flex">
          {tabGroups.map((group) => (
            <TabsTrigger key={group.id} value={group.id}>
              {group.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="hidden items-center gap-3 md:flex">
          {mounted && <PaletteToggle />}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle dark mode"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
          )}
          <Button
            onClick={() => goToContact("navbar_desktop")}
            className="bg-cta-500 text-text-900 hover:bg-cta-600"
          >
            Book Consultation
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-text-600 md:hidden dark:text-text-200"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-secondary-300 bg-background md:hidden dark:border-primary-700"
          >
            <div
              className="container flex flex-col gap-4 py-6"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {tabGroups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveTab(group.id)}
                  className="text-left text-base font-medium text-text-600 dark:text-text-200"
                >
                  {group.label}
                </button>
              ))}
              <Button
                onClick={() => goToContact("navbar_mobile")}
                className="mt-2 w-full bg-cta-500 text-text-900 hover:bg-cta-600"
              >
                Book Consultation
              </Button>
              {mounted && (
                <PaletteToggle className="w-full justify-center border border-secondary-300 dark:border-primary-700" />
              )}
              {mounted && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                >
                  {resolvedTheme === "dark" ? (
                    <>
                      <Sun className="size-4" /> Light mode
                    </>
                  ) : (
                    <>
                      <Moon className="size-4" /> Dark mode
                    </>
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
