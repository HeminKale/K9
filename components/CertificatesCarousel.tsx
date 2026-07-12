"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { certificates } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

// Placeholder slides until real certificate/credential images are added —
// see the `certificates` array in lib/constants.ts and PLAN/PENDING_STEPS.md.
export function CertificatesCarousel() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={0}
      variants={fadeUp}
      className="mb-12"
    >
      <p className="text-center font-heading text-sm font-semibold uppercase tracking-widest text-cta-600 dark:text-cta-400">
        Certifications & Credentials
      </p>

      <Carousel opts={{ loop: true, align: "start" }} className="relative mx-auto mt-6 w-full max-w-3xl px-0 sm:px-14">
        <CarouselContent>
          {certificates.map(({ id, title }) => (
            <CarouselItem key={id} className="basis-1/2 sm:basis-1/3">
              <div className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-secondary-400 bg-secondary-100 p-4 text-center dark:border-primary-600 dark:bg-primary-900">
                <Award
                  className="size-8 text-primary-400 dark:text-primary-500"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="text-xs font-medium text-text-500 dark:text-text-300">
                  {title}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-2 hidden sm:-left-14 sm:flex" />
        <CarouselNext className="-right-2 hidden sm:-right-14 sm:flex" />
      </Carousel>
    </motion.div>
  );
}
