import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/sections/About";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Blog } from "@/components/sections/Blog";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { SuccessGallery } from "@/components/sections/SuccessGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrainingProcess } from "@/components/sections/TrainingProcess";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

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
        <WhyChooseUs />
        <Services />
        <TrainingProcess />
        <BeforeAfter />
        <Testimonials />
        <SuccessGallery />
        <FAQ />
        <Pricing />
        <Blog />
        <FinalCTA />
        <PlaceholderSection id="contact" label="Contact" tone="muted" />
      </main>
      <Footer />
    </>
  );
}
