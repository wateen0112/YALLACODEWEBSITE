import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustedCompanies } from "@/components/sections/TrustedCompanies";
import { ProjectsSection } from "@/components/sections/Projects";
import { TechStackSection } from "@/components/sections/TechStack";
import { StatsSection } from "@/components/sections/Stats";
import { ServicesSection } from "@/components/sections/Services";
import { ProcessSection } from "@/components/sections/Process";
import { WhyChooseSection } from "@/components/sections/WhyChoose";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTA";
import { StackSection } from "@/components/ui/StackSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />

      <main className="flex-1">
        <StackSection index={1} className="fixed" pattern="stars">
          <Hero />
        </StackSection>

        <StackSection index={2} pattern="grid">
          <TrustedCompanies />
        </StackSection>

        <StackSection index={3} pattern="diagonal">
          <ProjectsSection />
        </StackSection>

        <StackSection index={4} pattern="hex">
          <TechStackSection />
        </StackSection>

        <StackSection index={5} pattern="radial">
          <StatsSection />
        </StackSection>

        <StackSection index={6} pattern="waves">
          <ServicesSection />
        </StackSection>

        <StackSection index={7} pattern="circuit">
          <ProcessSection />
        </StackSection>

        <StackSection index={8} pattern="mesh">
          <WhyChooseSection />
        </StackSection>

        <StackSection index={9} pattern="cross">
          <TestimonialsSection />
        </StackSection>

        <StackSection index={10} pattern="dots">
          <FAQSection />
        </StackSection>

        <StackSection index={11} pattern="none">
          <CTASection />
        </StackSection>
      </main>

      <Footer />
    </div>
  );
}
