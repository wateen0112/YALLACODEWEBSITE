"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "../ui/Reveal";
import Image from "next/image";
import { motion } from "framer-motion";

const companies = [
  { name: "Google", slug: "google", color: "4285F4" },
  { name: "Facebook", slug: "facebook", color: "0866FF" },
  { name: "Amazon", slug: "amazon", color: "FF9900" },
  { name: "Microsoft", slug: "microsoft", color: "5E5E5E" },
  { name: "Apple", slug: "apple", color: "FFFFFF" },
  { name: "Netflix", slug: "netflix", color: "E50914" },
  { name: "Spotify", slug: "spotify", color: "1DB954" },
  { name: "Slack", slug: "slack", color: "4A154B" },
  { name: "X", slug: "x", color: "FFFFFF" },
  { name: "Instagram", slug: "instagram", color: "E4405F" },
  { name: "YouTube", slug: "youtube", color: "FF0000" },
  { name: "LinkedIn", slug: "linkedin", color: "0A66C2" },
  { name: "Tesla", slug: "tesla", color: "CC0000" },
  { name: "Airbnb", slug: "airbnb", color: "FF5A5F" },
  { name: "Uber", slug: "uber", color: "FFFFFF" },
  { name: "Adobe", slug: "adobe", color: "FF0000" },
  { name: "Salesforce", slug: "salesforce", color: "00A1E0" },
  { name: "Intel", slug: "intel", color: "0071C5" },
];

const technologies = [
  { name: "HTML5", slug: "html5", color: "E34F26" },
  { name: "CSS3", slug: "css3", color: "1572B6" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
  { name: "Angular", slug: "angular", color: "DD0031" },
  { name: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "PHP", slug: "php", color: "777BB4" },
  { name: "Laravel", slug: "laravel", color: "FF2D20" },
  { name: "C++", slug: "cplusplus", color: "00599C" },
  { name: "C#", slug: "csharp", color: "512BD4" },
  { name: "Rust", slug: "rust", color: "CE422B" },
  { name: "Ruby", slug: "ruby", color: "CC342D" },
  { name: "Flutter", slug: "flutter", color: "02569B" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Kubernetes", slug: "kubernetes", color: "326CE5" },
  { name: "MySQL", slug: "mysql", color: "4479A1" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "Redis", slug: "redis", color: "DC382D" },
  { name: "GraphQL", slug: "graphql", color: "E10098" },
  { name: "AWS", slug: "amazonaws", color: "FF9900" },
  { name: "NestJS", slug: "nestjs", color: "E0234E" },
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "Adobe", slug: "adobe", color: "FF0000" },
];

function TechIcon({ name, slug, color }: { name: string; slug: string; color: string }) {
  return (
    <div className="glass-card rounded-2xl p-3 lg:p-4 flex flex-col items-center justify-center gap-2 hover-card h-full">
      <Image
        src={`https://cdn.simpleicons.org/${slug}/${color}`}
        alt={name}
        width={36}
        height={36}
        unoptimized
        className="w-9 h-9 lg:w-10 lg:h-10 object-contain"
      />
      <span className="text-xs font-medium text-text-primary text-center">
        {name}
      </span>
    </div>
  );
}

export function TrustedBy() {
  const t = useTranslations("home");
  const duplicatedCompanies = [...companies, ...companies, ...companies];

  return (
    <section className="h-full flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14">
        {/* Trusted By companies - infinite carousel */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-primary-400">
              {t("trusted_by")}
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative w-full overflow-hidden mb-10">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <motion.div
              animate={{ x: ["0%", "-33.333%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
              className="flex w-max items-center py-2"
            >
              {duplicatedCompanies.map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex-shrink-0 flex items-center gap-2 px-6 lg:px-8 text-text-secondary/80 hover:text-white transition-colors duration-300"
                  title={company.name}
                >
                  <Image
                    src={`https://cdn.simpleicons.org/${company.slug}/${company.color}`}
                    alt={company.name}
                    width={28}
                    height={28}
                    unoptimized
                    className="w-7 h-7 object-contain"
                  />
                  <span className="text-base lg:text-lg font-semibold whitespace-nowrap">{company.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Reveal>

        {/* Technologies grid */}
        <div className="text-center max-w-3xl mx-auto mb-5">
          <Reveal delay={0.15}>
            <h3 className="text-xl lg:text-2xl font-semibold mb-2 text-text-primary">
              {t("tech_stack_title")}
            </h3>
            <p className="text-text-secondary text-sm lg:text-base">
              {t("tech_stack_subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {technologies.map((tech, index) => (
            <Reveal key={tech.name} delay={0.15 + index * 0.02}>
              <TechIcon {...tech} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
