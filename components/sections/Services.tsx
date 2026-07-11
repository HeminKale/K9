"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { services } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export function Services() {
  return (
    <section
      id="services"
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
            Services
          </p>
          <h2 className="mt-3 text-text-700 dark:text-text-50">
            Training Programs for Every Need
          </h2>
          <p className="mt-4 text-text-500 dark:text-text-300">
            From puppy foundations to advanced behavior work, there&apos;s a
            program built for your dog&apos;s stage and goals.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, title, description, icon: Icon }, index) => (
            <motion.div
              key={id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={(index % 3) * 0.08}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-secondary-300 bg-background shadow-sm hover:shadow-xl dark:border-primary-700 dark:bg-primary-800"
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary-200 via-primary-300 to-primary-500 dark:from-primary-800 dark:via-primary-700 dark:to-primary-900">
                <Icon
                  className="size-12 text-primary-50/80 transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="font-heading text-lg font-semibold text-text-700 dark:text-text-50">
                  {title}
                </h3>
                <p className="flex-1 text-sm text-text-500 dark:text-text-300">
                  {description}
                </p>
                <Button
                  render={<a href="#" />}
                  nativeButton={false}
                  variant="outline"
                  className="mt-2 h-10 w-fit rounded-lg border-primary-300 px-5 text-sm font-semibold text-primary-600 hover:bg-primary-100 dark:border-primary-600 dark:text-primary-200 dark:hover:bg-primary-700"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
