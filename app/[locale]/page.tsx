import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { ServicesSection } from "@/components/sections/Services";
import { ProjectsSection } from "@/components/sections/Projects";
import { StatsSection } from "@/components/sections/Stats";
import { GlobeSection } from "@/components/sections/Globe";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { ProcessSection } from "@/components/sections/Process";
import { CTASection } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Marquee />
        <ServicesSection />
        <ProjectsSection />
        <StatsSection />
        <GlobeSection />
        <TestimonialsSection />
        <ProcessSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
