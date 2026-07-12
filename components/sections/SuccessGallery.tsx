"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";

import { galleryItems } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export function SuccessGallery({ sectionId = "gallery" }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="section-padding border-b border-secondary-300 bg-background dark:border-primary-800"
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-cta-600 dark:text-cta-400">
            Success Gallery
          </p>
          <h2 className="mt-3 text-text-700 dark:text-text-50">
            Moments From the Journey
          </h2>
          <p className="mt-4 text-text-500 dark:text-text-300">
            A look at the dogs and families who&apos;ve worked through their
            training goals with us.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map(({ id, caption, category }, index) => (
            <motion.div
              key={id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={(index % 3) * 0.06}
              variants={fadeUp}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary-200 via-primary-300 to-primary-500 shadow-sm dark:from-primary-800 dark:via-primary-700 dark:to-primary-900"
            >
              <div className="flex size-full items-center justify-center">
                <Camera
                  className="size-10 text-primary-50/60 transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary-900/90 via-primary-900/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-300">
                  {category}
                </p>
                <p className="mt-1 text-sm font-medium text-secondary-50">
                  {caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
