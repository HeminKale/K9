"use client";

import { motion } from "framer-motion";

import { whyChooseUs } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="section-padding border-b border-secondary-300 bg-secondary-100 dark:border-primary-800 dark:bg-primary-900"
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
            Why Choose Us
          </p>
          <h2 className="mt-3 text-text-700 dark:text-text-50">
            Training Built Around Trust
          </h2>
          <p className="mt-4 text-text-500 dark:text-text-300">
            Every family and every dog is different. Here&apos;s what sets our
            approach apart.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index * 0.08}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col gap-4 rounded-2xl border border-secondary-300 bg-background p-6 shadow-sm hover:shadow-lg dark:border-primary-700 dark:bg-primary-800"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-700 dark:text-primary-200">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-text-700 dark:text-text-50">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-text-500 dark:text-text-300">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
