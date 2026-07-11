import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";

type PlaceholderSectionProps = {
  id: string;
  label: string;
  tone?: "default" | "muted";
};

function PlaceholderSection({ id, label, tone = "default" }: PlaceholderSectionProps) {
  return (
    <section
      id={id}
      className={`section-padding flex min-h-[40vh] items-center justify-center border-b border-secondary-300 dark:border-primary-800 ${
        tone === "muted" ? "bg-secondary-100 dark:bg-primary-900" : ""
      }`}
    >
      <p className="font-heading text-sm uppercase tracking-widest text-text-400 dark:text-text-500">
        {label}
      </p>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <PlaceholderSection id="why-choose-us" label="Why Choose Us" tone="muted" />
        <PlaceholderSection id="services" label="Services" />
        <PlaceholderSection id="process" label="Training Process" tone="muted" />
        <PlaceholderSection id="before-after" label="Before &amp; After" />
        <PlaceholderSection id="testimonials" label="Testimonials" tone="muted" />
        <PlaceholderSection id="gallery" label="Success Gallery" />
        <PlaceholderSection id="faq" label="FAQ" tone="muted" />
        <PlaceholderSection id="pricing" label="Pricing" />
        <PlaceholderSection id="blog" label="Blog" tone="muted" />
        <PlaceholderSection id="final-cta" label="Let's Build a Better Relationship" />
        <PlaceholderSection id="contact" label="Contact" tone="muted" />
      </main>
      <Footer />
    </>
  );
}
