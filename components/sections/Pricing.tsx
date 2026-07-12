"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

import { useActiveTab } from "@/components/TabsProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { pricingPlans } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export function Pricing() {
  const { setActiveTab } = useActiveTab();

  return (
    <section
      id="pricing"
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
            Pricing
          </p>
          <h2 className="mt-3 text-text-700 dark:text-text-50">
            Programs for Every Stage
          </h2>
          <p className="mt-4 text-text-500 dark:text-text-300">
            Every plan is tailored during your free consultation &mdash;
            request pricing to get a quote built around your dog.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-center">
          {pricingPlans.map(({ name, description, features, featured }, index) => (
            <motion.div
              key={name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index * 0.1}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn("relative", featured && "lg:scale-105")}
            >
              {featured && (
                <span className="absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-cta-500 px-4 py-1 text-xs font-semibold text-text-900 shadow-md">
                  <Star className="size-3 fill-current" aria-hidden="true" />
                  Most Popular
                </span>
              )}

              <Card
                className={cn(
                  "h-full gap-6 rounded-2xl border p-2 shadow-sm",
                  featured
                    ? "border-cta-400 bg-primary-50 shadow-lg dark:border-cta-500 dark:bg-primary-800"
                    : "border-secondary-300 bg-background dark:border-primary-700 dark:bg-primary-800"
                )}
              >
                <CardHeader className="gap-2 px-6 pt-4">
                  <h3 className="font-heading text-xl font-semibold text-text-700 dark:text-text-50">
                    {name}
                  </h3>
                  <p className="text-sm text-text-500 dark:text-text-300">
                    {description}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-6 px-6 pb-4">
                  <ul className="flex flex-1 flex-col gap-3">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-text-600 dark:text-text-200"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-primary-600 dark:text-primary-300"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => {
                      setActiveTab("contact");
                      trackEvent("cta_click", {
                        cta_label: "Request Pricing",
                        cta_location: "pricing",
                        plan_name: name,
                      });
                    }}
                    className={cn(
                      "h-11 w-full rounded-lg text-sm font-semibold",
                      featured
                        ? "bg-cta-500 text-text-900 hover:bg-cta-600"
                        : "bg-primary-600 text-secondary-50 hover:bg-primary-700 dark:bg-primary-400 dark:text-primary-900 dark:hover:bg-primary-300"
                    )}
                  >
                    Request Pricing
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
