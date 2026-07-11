"use client";

import { motion } from "framer-motion";
import { ArrowRight, Newspaper } from "lucide-react";

import { blogPosts } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Blog() {
  return (
    <section
      id="blog"
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
            Blog
          </p>
          <h2 className="mt-3 text-text-700 dark:text-text-50">
            Tips &amp; Insights
          </h2>
          <p className="mt-4 text-text-500 dark:text-text-300">
            Practical advice on training, behavior, and building a better
            relationship with your dog.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map(({ slug, title, excerpt, date }, index) => (
            <motion.article
              key={slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={(index % 4) * 0.08}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-secondary-300 bg-background shadow-sm hover:shadow-lg dark:border-primary-700 dark:bg-primary-800"
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary-200 via-primary-300 to-primary-500 dark:from-primary-800 dark:via-primary-700 dark:to-primary-900">
                <Newspaper
                  className="size-10 text-primary-50/80"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-text-400 dark:text-text-500">
                  {formatDate(date)}
                </p>
                <h3 className="font-heading text-base font-semibold text-text-700 dark:text-text-50">
                  {title}
                </h3>
                <p className="flex-1 text-sm text-text-500 dark:text-text-300">
                  {excerpt}
                </p>
                <a
                  href="#"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-cta-600 dark:text-primary-300 dark:hover:text-cta-400"
                >
                  Read More
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
