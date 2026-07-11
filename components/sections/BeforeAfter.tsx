"use client";

import { motion } from "framer-motion";
import { ArrowRight, CircleX, Sparkles } from "lucide-react";

import { beforeAfterExamples } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export function BeforeAfter() {
  return (
    <section
      id="before-after"
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
            Before &amp; After
          </p>
          <h2 className="mt-3 text-text-700 dark:text-text-50">
            Real Transformations, Real Fast
          </h2>
          <p className="mt-4 text-text-500 dark:text-text-300">
            A snapshot of the everyday challenges we help turn into calm,
            confident behavior.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beforeAfterExamples.map(({ before, after }, index) => (
            <motion.div
              key={before}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={(index % 3) * 0.08}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-secondary-300 bg-background shadow-sm hover:shadow-xl dark:border-primary-700 dark:bg-primary-800 sm:flex-row"
            >
              <div className="flex flex-1 flex-col gap-2 p-6">
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-text-400 dark:text-text-500">
                  <CircleX className="size-4 shrink-0" aria-hidden="true" />
                  Before
                </span>
                <p className="text-sm font-medium text-text-600 dark:text-text-200">
                  {before}
                </p>
              </div>

              <div className="flex shrink-0 items-center justify-center bg-secondary-100 py-3 dark:bg-primary-900 sm:w-14 sm:py-0">
                <ArrowRight
                  className="size-5 rotate-90 text-cta-500 sm:rotate-0"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 bg-primary-50 p-6 dark:bg-primary-700/40">
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-300">
                  <Sparkles className="size-4 shrink-0" aria-hidden="true" />
                  After
                </span>
                <p className="text-sm font-medium text-text-700 dark:text-text-50">
                  {after}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
