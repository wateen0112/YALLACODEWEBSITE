import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Globe, Mail, MessageCircle, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: Mail, href: "#", label: "Email" },
  { icon: MessageCircle, href: "#", label: "Chat" },
  { icon: MapPin, href: "#", label: "Location" },
];

export function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");

  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12" data-aos="fade-up">
          <div>
            <Image
              src="/logo.png"
              alt="YallaCode"
              width={730}
              height={194}
              className="h-10 w-auto mb-5"
            />
            <p className="text-text-secondary leading-relaxed">
              {tFooter("description")}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold font-satoshi mb-6 text-white">{t("services")}</h4>
            <ul className="space-y-3">
              {["web_mobile", "ai_ml", "cloud_architecture"].map((key) => (
                <li key={key}>
                  <Link href="#services" className="text-text-secondary hover:text-accent-cyan transition-colors">
                    {tFooter(`services.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold font-satoshi mb-6 text-white">{tFooter("pages_title")}</h4>
            <ul className="space-y-3">
              {["home", "projects", "about"].map((key) => (
                <li key={key}>
                  <Link href={`#${key}`} className="text-text-secondary hover:text-accent-cyan transition-colors">
                    {tFooter(`pages.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold font-satoshi mb-6 text-white">{t("contact")}</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 rounded-full bg-gradient-to-br from-accent-cyan to-accent-magenta text-white hover:shadow-glow-cyan transition-shadow"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-text-secondary text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            © {new Date().getFullYear()} YallaCode. {tFooter("rights_reserved")}
          </p>
          <div className="flex gap-4 text-xs">
            <Link href="#" className="hover:text-accent-cyan transition-colors">{tFooter("privacy_policy")}</Link>
            <Link href="#" className="hover:text-accent-cyan transition-colors">{tFooter("terms_of_service")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
