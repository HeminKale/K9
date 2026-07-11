"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, ChevronDown, HeartHandshake, ShieldCheck, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { business } from "@/lib/constants";

const trustBadges = [
  { icon: Award, label: "Certified & Experienced" },
  { icon: HeartHandshake, label: "Positive Reinforcement Only" },
  { icon: Star, label: "5-Star Rated" },
  { icon: ShieldCheck, label: "Insured & Bonded" },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: backgroundY }}
        className="absolute inset-0 -top-[15%] h-[130%] bg-[radial-gradient(circle_at_30%_20%,var(--color-primary-500),var(--color-primary-800)_55%,var(--color-primary-900)_100%)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,color-mix(in_oklch,var(--color-cta-500)_35%,transparent),transparent_45%)]" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-primary-900/95 via-primary-900/60 to-primary-900/30"
      />

      <div className="container relative z-10 py-24 sm:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-heading text-sm font-semibold uppercase tracking-widest text-accent-300"
          >
            {business.name}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 text-secondary-50"
          >
            {business.tagline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-lg text-secondary-100/85 sm:mt-6"
          >
            Whether you&apos;re starting with a new puppy or working through
            tough behavior challenges, we&apos;ll build a training plan that
            fits your dog and strengthens the bond you share.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row"
          >
            <Button
              render={<a href="#contact" />}
              nativeButton={false}
              className="h-12 rounded-xl bg-cta-500 px-8 text-base font-semibold text-text-900 hover:bg-cta-600"
            >
              Book Consultation
            </Button>
            <Button
              render={<a href={business.phoneHref} />}
              nativeButton={false}
              variant="outline"
              className="h-12 rounded-xl border-secondary-100/40 bg-transparent px-8 text-base font-semibold text-secondary-50 hover:bg-secondary-50/10"
            >
              Call Now
            </Button>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-10 grid w-full grid-cols-2 gap-6 border-t border-secondary-100/20 pt-6 sm:mt-16 sm:grid-cols-4 sm:pt-10"
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <Icon className="size-6 text-accent-300" aria-hidden="true" />
                <dt className="text-xs font-medium text-secondary-100/80 sm:text-sm">
                  {label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.8 },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <ChevronDown className="size-6 text-secondary-100/70" />
      </motion.div>
    </section>
  );
}
