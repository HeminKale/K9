"use client";

import { motion } from "framer-motion";
import { Star, Users } from "lucide-react";

import { specializedTraining, trainingApproach, trustStats } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

const statIcons = [Users, Star];

export function HomeHighlights() {
  return (
    <section
      id="home-highlights"
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
            My Specialized Training
          </p>
          <h2 className="mt-3 text-text-700 dark:text-text-50">
            What I Train Your Dog In
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {specializedTraining.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index * 0.1}
              variants={fadeUp}
              className="flex flex-col gap-2 rounded-2xl border border-secondary-300 bg-secondary-100 p-6 dark:border-primary-700 dark:bg-primary-800"
            >
              <Icon className="size-6 text-cta-600 dark:text-cta-400" aria-hidden="true" />
              <h3 className="font-heading text-base font-semibold text-text-700 dark:text-text-50">
                {title}
              </h3>
              <p className="text-sm text-text-500 dark:text-text-300">{description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeUp}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-cta-600 dark:text-cta-400">
            My Training Approach
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {trainingApproach.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index * 0.1}
              variants={fadeUp}
              className="flex flex-col items-center gap-2 rounded-2xl p-6 text-center"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-700 dark:text-primary-200">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-base font-semibold text-text-700 dark:text-text-50">
                {title}
              </h3>
              <p className="text-sm text-text-500 dark:text-text-300">{description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 flex flex-col items-center justify-center gap-8 rounded-2xl bg-primary-600 py-8 text-secondary-50 sm:flex-row sm:gap-16 dark:bg-primary-800"
        >
          {trustStats.map(({ label, value }, index) => {
            const Icon = statIcons[index] ?? Star;
            return (
              <div key={label} className="flex items-center gap-3">
                <Icon className="size-6 text-cta-400" aria-hidden="true" />
                <div>
                  <p className="font-heading text-2xl font-bold">{value}</p>
                  <p className="text-sm text-secondary-100/85">{label}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
