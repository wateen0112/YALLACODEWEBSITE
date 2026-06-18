import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Globe, MessageCircle } from "lucide-react";

export function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-full flex flex-col justify-center bg-[#02040a] border-t border-white/8 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="YallaCode"
                width={730}
                height={194}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              {tFooter("description")}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                aria-label="Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@yallacode.com"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{tFooter("pages_title")}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { key: "home", href: "#" },
                { key: "projects", href: "#projects" },
                { key: "about", href: "#about" },
                { key: "contact", href: "#contact" },
              ].map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-text-secondary hover:text-primary-400 transition-colors"
                  >
                    {tFooter(`pages.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("services")}</h3>
            <ul className="space-y-2 text-sm">
              {["web_mobile", "ai_ml", "cloud_architecture"].map((key) => (
                <li key={key}>
                  <Link
                    href="#services"
                    className="text-text-secondary hover:text-primary-400 transition-colors"
                  >
                    {tFooter(`services.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("contact")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-text-secondary">
                <Phone className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>{tFooter("contact_phone")}</span>
              </li>
              <li className="flex items-start gap-2 text-text-secondary">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>{tFooter("contact_email")}</span>
              </li>
              <li className="flex items-start gap-2 text-text-secondary">
                <MapPin className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <span>{tFooter("contact_address")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm">
            © {currentYear} YallaCode. {tFooter("rights_reserved")}
          </p>
          <div className="flex gap-6 text-sm text-text-secondary">
            <Link href="#" className="hover:text-primary-400 transition-colors">
              {tFooter("privacy_policy")}
            </Link>
            <Link href="#" className="hover:text-primary-400 transition-colors">
              {tFooter("terms_of_service")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
