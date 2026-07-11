"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  FileText,
  HeartHandshake,
  MessageCircle,
  PawPrint,
  Users,
} from "lucide-react";

import { processSteps } from "@/lib/constants";

const stepIcons = [
  MessageCircle,
  ClipboardCheck,
  FileText,
  PawPrint,
  Users,
  HeartHandshake,
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export function TrainingProcess() {
  return (
    <section
      id="process"
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
            Training Process
          </p>
          <h2 className="mt-3 text-text-700 dark:text-text-50">
            How We Get You There
          </h2>
          <p className="mt-4 text-text-500 dark:text-text-300">
            A simple, structured path from first hello to lasting results.
          </p>
        </motion.div>

        <div className="mt-16 flex flex-col md:flex-row md:items-start">
          {processSteps.map((step, index) => {
            const Icon = stepIcons[index];
            const isLast = index === processSteps.length - 1;

            return (
              <Fragment key={step.step}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={index * 0.1}
                  variants={fadeUp}
                  className="flex min-w-0 gap-4 md:grow md:shrink md:basis-0 md:flex-col md:items-center md:gap-3 md:text-center"
                >
                  <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-600 text-secondary-50 shadow-md dark:bg-primary-400 dark:text-primary-900">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div className="pb-10 md:px-2 md:pb-0">
                    <p className="font-heading text-xs font-semibold uppercase tracking-widest text-cta-600 dark:text-cta-400">
                      Step {step.step}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-text-700 md:text-lg dark:text-text-50">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-500 dark:text-text-300">
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="ml-7 h-10 w-px shrink-0 grow-0 bg-primary-300 md:ml-0 md:mt-7 md:h-px md:w-auto md:min-w-8 md:grow md:shrink md:basis-8 dark:bg-primary-700"
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
