"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, UserRound } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section
      id="testimonials"
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
            Testimonials
          </p>
          <h2 className="mt-3 text-text-700 dark:text-text-50">
            Happy Dogs, Happy Owners
          </h2>
          <p className="mt-4 text-text-500 dark:text-text-300">
            Don&apos;t just take our word for it &mdash; hear from the families
            we&apos;ve worked with.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0.1}
          variants={fadeUp}
          className="relative mx-auto mt-12 max-w-2xl px-0 sm:px-14"
        >
          <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {testimonials.map(({ name, dogName, quote, rating }) => (
                <CarouselItem key={name}>
                  <div className="flex flex-col items-center gap-4 rounded-2xl border border-secondary-300 bg-background p-8 text-center shadow-sm dark:border-primary-700 dark:bg-primary-800 sm:p-10">
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-700 dark:text-primary-200">
                      <UserRound className="size-8" aria-hidden="true" />
                    </span>

                    <div className="flex gap-1 text-accent-500" aria-hidden="true">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>

                    <Quote
                      className="size-6 text-primary-300 dark:text-primary-600"
                      aria-hidden="true"
                    />

                    <p className="text-lg italic text-text-600 dark:text-text-200">
                      &ldquo;{quote}&rdquo;
                    </p>

                    <div className="mt-2">
                      <p className="font-heading text-base font-semibold text-text-700 dark:text-text-50">
                        {name}
                      </p>
                      <p className="text-sm text-text-500 dark:text-text-300">
                        Owner of {dogName}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 hidden sm:-left-14 sm:flex" />
            <CarouselNext className="-right-2 hidden sm:-right-14 sm:flex" />
          </Carousel>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === selected
                    ? "w-6 bg-primary-600 dark:bg-primary-300"
                    : "w-2 bg-primary-200 hover:bg-primary-300 dark:bg-primary-700 dark:hover:bg-primary-600"
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
