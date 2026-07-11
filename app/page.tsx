import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/sections/About";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { SuccessGallery } from "@/components/sections/SuccessGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrainingProcess } from "@/components/sections/TrainingProcess";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
