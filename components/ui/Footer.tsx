"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Globe, Mail, MessageCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const footerLinks = [
    { name: t("about"), href: "#about" },
    { name: t("services"), href: "#services" },
    { name: t("how_it_works"), href: "#process" },
    { name: t("testimonials"), href: "#testimonials" },
  ];

  const marqueeWords = Array(8).fill(tFooter("marquee"));

  return (
    <footer className="relative bg-surface border-t border-white/10 overflow-hidden">
  
     
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Image
              src="/logo.png"
              alt="YallaCode"
              width={730}
              height={194}
              sizes="150px"
              className="h-10 w-auto mb-6"
            />
            <p className="text-text-secondary">{tFooter("description")}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{tFooter("pages_title")}</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t("services")}</h3>
            <ul className="space-y-3">
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

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t("contact")}</h3>
            <div className="flex gap-3">
              {[
                { Icon: Globe, label: tFooter("social_website") },
                { Icon: Mail, label: tFooter("social_email") },
                { Icon: MessageCircle, label: tFooter("social_chat") },
                { Icon: MapPin, label: tFooter("social_location") },
              ].map(({ Icon, label }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-primary-400 hover:bg-primary-600/15 hover:border-primary-500/30 transition-colors"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
          <p>
            © {new Date().getFullYear()} YallaCode. {tFooter("rights_reserved")}
          </p>
          <div className="flex gap-6">
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
