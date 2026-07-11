"use client";

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export function FAQ() {
  return (
    <section
      id="faq"
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
            FAQ
          </p>
          <h2 className="mt-3 text-text-700 dark:text-text-50">
            Common Questions
          </h2>
          <p className="mt-4 text-text-500 dark:text-text-300">
            Answers to what most owners ask before getting started.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0.1}
          variants={fadeUp}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border border-secondary-300 bg-background px-6 shadow-sm dark:border-primary-700 dark:bg-primary-800 sm:px-8"
        >
          <Accordion>
            {faqs.map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`faq-${index}`}>
                <AccordionTrigger className="font-heading text-base font-semibold text-text-700 dark:text-text-50">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-text-500 dark:text-text-300">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
