import dynamic from "next/dynamic";

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { StackSection } from "@/components/ui/StackSection";

const TrustedCompanies = dynamic(
  () => import("@/components/sections/TrustedCompanies").then((m) => m.TrustedCompanies),
  { ssr: true, loading: () => <div className="min-h-screen bg-background" /> }
);
const ProjectsSection = dynamic(
  () => import("@/components/sections/Projects").then((m) => m.ProjectsSection),
  { ssr: true, loading: () => <div className="min-h-screen bg-background" /> }
);
const TechStackSection = dynamic(
  () => import("@/components/sections/TechStack").then((m) => m.TechStackSection),
  { ssr: true, loading: () => <div className="min-h-screen bg-background" /> }
);
const StatsSection = dynamic(
  () => import("@/components/sections/Stats").then((m) => m.StatsSection),
  { ssr: true, loading: () => <div className="min-h-screen bg-background" /> }
);
const ServicesSection = dynamic(
  () => import("@/components/sections/Services").then((m) => m.ServicesSection),
  { ssr: true, loading: () => <div className="min-h-screen bg-background" /> }
);
const ProcessSection = dynamic(
  () => import("@/components/sections/Process").then((m) => m.ProcessSection),
  { ssr: true, loading: () => <div className="min-h-screen bg-background" /> }
);
const WhyChooseSection = dynamic(
  () => import("@/components/sections/WhyChoose").then((m) => m.WhyChooseSection),
  { ssr: true, loading: () => <div className="min-h-screen bg-background" /> }
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => m.TestimonialsSection),
  { ssr: true, loading: () => <div className="min-h-screen bg-background" /> }
);
const FAQSection = dynamic(
  () => import("@/components/sections/FAQ").then((m) => m.FAQSection),
  { ssr: true, loading: () => <div className="min-h-screen bg-background" /> }
);
const CTASection = dynamic(
  () => import("@/components/sections/CTA").then((m) => m.CTASection),
  { ssr: true, loading: () => <div className="min-h-screen bg-background" /> }
);

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
