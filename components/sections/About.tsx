"use client";

import { motion } from "framer-motion";
import { GraduationCap, HeartHandshake, PawPrint, ShieldCheck } from "lucide-react";

import { business } from "@/lib/constants";

const values = [
  {
    icon: ShieldCheck,
    title: "Certified & Insured",
    description: "Professionally certified with years of hands-on experience.",
  },
  {
    icon: HeartHandshake,
    title: "Positive Reinforcement",
    description: "Force-free methods that build trust, not fear.",
  },
  {
    icon: PawPrint,
    title: "Every Dog, Every Age",
    description: "Puppies to seniors, all breeds and temperaments welcome.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export function About() {
  return (
    <section
      id="about"
      className="section-padding border-b border-secondary-300 bg-background dark:border-primary-800"
    >
      <div className="container grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeUp}
          className="relative mx-auto w-full max-w-md md:mx-0"
        >
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-primary-200 via-primary-300 to-primary-500 shadow-xl dark:from-primary-800 dark:via-primary-700 dark:to-primary-900">
            <PawPrint
              className="size-28 text-primary-50/40"
              strokeWidth={1}
              aria-hidden="true"
            />
            <span className="sr-only">Photo of {business.trainerName}</span>
          </div>

          <div className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl border border-secondary-300 bg-background px-5 py-4 shadow-lg dark:border-primary-700 dark:bg-primary-800 sm:-right-6">
            <GraduationCap className="size-8 shrink-0 text-cta-500" aria-hidden="true" />
            <div>
              <p className="font-heading text-lg font-semibold leading-none text-text-700 dark:text-text-50">
                10+ Years
              </p>
              <p className="text-xs text-text-500 dark:text-text-300">
                Training Experience
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.15}
          variants={fadeUp}
        >
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-cta-600 dark:text-cta-400">
            About {business.trainerName}
          </p>
          <h2 className="mt-3 text-text-700 dark:text-text-50">
            Meet Your Dog&apos;s New Best Friend
          </h2>
          <div className="mt-6 space-y-4 text-text-500 dark:text-text-300">
            <p>
              With over a decade of hands-on experience, {business.trainerName}{" "}
              has helped hundreds of families turn frustration into
              connection. What started as a personal passion for understanding
              dog behavior has grown into a full-time mission: helping dogs
              and their people communicate better.
            </p>
            <p>
              Every session is rooted in positive reinforcement &mdash; no
              fear, no force, just clear communication and consistency. From
              puppy foundations to complex behavior modification, the goal is
              always the same: a calmer dog and a more confident owner.
            </p>
            <p>
              The mission is simple &mdash; build a lasting relationship of
              trust between you and your dog, one that goes far beyond
              &ldquo;sit&rdquo; and &ldquo;stay.&rdquo;
            </p>
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex flex-col gap-2">
                <Icon className="size-6 text-primary-500 dark:text-primary-300" aria-hidden="true" />
                <p className="font-heading text-sm font-semibold text-text-700 dark:text-text-50">
                  {title}
                </p>
                <p className="text-xs text-text-500 dark:text-text-300">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
