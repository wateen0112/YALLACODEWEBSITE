import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SectionIndicator } from "@/components/ui/SectionIndicator";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { WhyWeStandOut } from "@/components/sections/WhyWeStandOut";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ServicesSection } from "@/components/sections/Services";
import { SolutionsWeDeliver } from "@/components/sections/SolutionsWeDeliver";
import { ProjectsSection } from "@/components/sections/Projects";
import { StatsSection } from "@/components/sections/Stats";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { ProcessSection } from "@/components/sections/Process";
import { CTASection } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <SectionIndicator />

      <main className="flex-1 h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <section id="hero" className="h-screen snap-start shrink-0 overflow-hidden">
          <Hero />
        </section>

        <section id="trusted-by" className="h-screen snap-start shrink-0 overflow-hidden">
          <TrustedBy />
        </section>

        <section id="why-stand-out" className="h-screen snap-start shrink-0 overflow-hidden">
          <WhyWeStandOut />
        </section>

        <section id="why-choose-us" className="h-screen snap-start shrink-0 overflow-hidden">
          <WhyChooseUs />
        </section>

        <section id="services" className="h-screen snap-start shrink-0 overflow-hidden">
          <ServicesSection />
        </section>

        <section id="solutions" className="h-screen snap-start shrink-0 overflow-hidden">
          <SolutionsWeDeliver />
        </section>

        <section id="projects" className="snap-start shrink-0 overflow-hidden">
          <ProjectsSection />
        </section>

        <section id="stats" className="h-screen snap-start shrink-0 overflow-hidden">
          <StatsSection />
        </section>

        <section id="testimonials" className="h-screen snap-start shrink-0 overflow-hidden">
          <TestimonialsSection />
        </section>

        <section id="process" className="snap-start shrink-0 overflow-hidden">
          <ProcessSection />
        </section>

        <section id="cta" className="h-screen snap-start shrink-0 overflow-hidden">
          <CTASection />
        </section>

        <section id="footer" className="h-screen snap-start shrink-0 overflow-hidden">
          <Footer />
        </section>
      </main>
    </div>
  );
}
