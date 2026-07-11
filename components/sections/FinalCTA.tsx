"use client";

import { motion } from "framer-motion";
import { PawPrint, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { business } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="section-padding relative overflow-hidden bg-primary-600 dark:bg-primary-900"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklch,var(--color-cta-500)_25%,transparent),transparent_50%),radial-gradient(circle_at_85%_80%,color-mix(in_oklch,var(--color-primary-300)_20%,transparent),transparent_45%)]"
      />
      <PawPrint
        aria-hidden="true"
        className="absolute -bottom-10 -right-10 size-56 rotate-12 text-secondary-50/5"
        strokeWidth={1}
      />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeUp}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <h2 className="text-secondary-50">
            Let&apos;s Build a Better Relationship
          </h2>
          <p className="mt-4 text-lg text-secondary-100/85">
            Whether it&apos;s a new puppy or a long-standing behavior
            challenge, your dog&apos;s next chapter starts with one
            conversation.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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
              className="h-12 gap-2 rounded-xl border-secondary-100/40 bg-transparent px-8 text-base font-semibold text-secondary-50 hover:bg-secondary-50/10"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call Today
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
