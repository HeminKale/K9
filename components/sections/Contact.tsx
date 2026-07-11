"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { business } from "@/lib/constants";
import {
  contactFormSchema,
  preferredTimeOptions,
  type ContactFormValues,
} from "@/lib/contactSchema";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`
)}`;

type SubmitState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function Contact() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      dogBreed: "",
      dogAge: "",
      problem: "",
      preferredTime: undefined,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState({ status: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setSubmitState({
          status: "error",
          message:
            data?.message ?? "Something went wrong. Please try again or contact us directly.",
        });
        return;
      }

      setSubmitState({ status: "success", message: data.message });
      reset();
    } catch {
      setSubmitState({
        status: "error",
        message: "Network error — please check your connection and try again.",
      });
    }
  };

  return (
    <section
      id="contact"
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
            Contact
          </p>
          <h2 className="mt-3 text-text-700 dark:text-text-50">
            Let&apos;s Talk About Your Dog
          </h2>
          <p className="mt-4 text-text-500 dark:text-text-300">
            Tell us a bit about your dog and what you&apos;re working on &mdash; we&apos;ll
            follow up to schedule your free consultation.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-5 lg:gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.1}
            variants={fadeUp}
            className="lg:col-span-2"
          >
            <div className="flex h-full flex-col gap-6 rounded-2xl border border-secondary-300 bg-background p-6 shadow-sm dark:border-primary-700 dark:bg-primary-800 sm:p-8">
              <div className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 size-5 shrink-0 text-primary-600 dark:text-primary-300"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-text-700 dark:text-text-50">Phone</p>
                  <a
                    href={business.phoneHref}
                    className="text-sm text-text-500 hover:text-primary-600 dark:text-text-300 dark:hover:text-primary-300"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 size-5 shrink-0 text-primary-600 dark:text-primary-300"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-text-700 dark:text-text-50">Email</p>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-sm text-text-500 hover:text-primary-600 dark:text-text-300 dark:hover:text-primary-300"
                  >
                    {business.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 size-5 shrink-0 text-primary-600 dark:text-primary-300"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-text-700 dark:text-text-50">
                    Location
                  </p>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-500 hover:text-primary-600 dark:text-text-300 dark:hover:text-primary-300"
                  >
                    {business.address.street}, {business.address.city}, {business.address.state}{" "}
                    {business.address.zip}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock
                  className="mt-0.5 size-5 shrink-0 text-primary-600 dark:text-primary-300"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-text-700 dark:text-text-50">Hours</p>
                  <ul className="mt-1 space-y-0.5 text-sm text-text-500 dark:text-text-300">
                    {business.hours.map(({ day, time }) => (
                      <li key={day} className="flex justify-between gap-4">
                        <span>{day}</span>
                        <span>{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.2}
            variants={fadeUp}
            className="lg:col-span-3"
          >
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5 rounded-2xl border border-secondary-300 bg-background p-6 shadow-sm dark:border-primary-700 dark:bg-primary-800 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-name">Your Name</Label>
                  <Input
                    id="contact-name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-breed">Dog Breed</Label>
                  <Input
                    id="contact-breed"
                    aria-invalid={!!errors.dogBreed}
                    {...register("dogBreed")}
                  />
                  {errors.dogBreed && (
                    <p className="text-xs text-destructive">{errors.dogBreed.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-age">Dog Age</Label>
                  <Input
                    id="contact-age"
                    placeholder="e.g. 8 months"
                    aria-invalid={!!errors.dogAge}
                    {...register("dogAge")}
                  />
                  {errors.dogAge && (
                    <p className="text-xs text-destructive">{errors.dogAge.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-preferred-time">Preferred Time to Connect</Label>
                <Controller
                  control={control}
                  name="preferredTime"
                  render={({ field }) => (
                    <Select value={field.value ?? null} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="contact-preferred-time"
                        aria-invalid={!!errors.preferredTime}
                        className="w-full"
                      >
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {preferredTimeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.preferredTime && (
                  <p className="text-xs text-destructive">{errors.preferredTime.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-problem">What are you working on?</Label>
                <Textarea
                  id="contact-problem"
                  rows={4}
                  placeholder="Tell us about your dog's behavior, goals, or any challenges you're facing."
                  aria-invalid={!!errors.problem}
                  {...register("problem")}
                />
                {errors.problem && (
                  <p className="text-xs text-destructive">{errors.problem.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-lg bg-cta-500 text-sm font-semibold text-text-900 hover:bg-cta-600 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>

              {submitState.status !== "idle" && (
                <p
                  role="status"
                  className={cn(
                    "text-sm",
                    submitState.status === "success"
                      ? "text-primary-600 dark:text-primary-300"
                      : "text-destructive"
                  )}
                >
                  {submitState.message}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
