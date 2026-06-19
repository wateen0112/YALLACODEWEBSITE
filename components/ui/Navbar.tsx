"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("home"), href: "#" },
    { name: t("services"), href: "#services" },
    { name: t("projects"), href: "#projects" },
    { name: t("about"), href: "#about" },
    { name: t("contact"), href: "#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 md:py-5"
      data-aos="fade-down"
      data-aos-duration="800"
      data-aos-delay="300"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div
          className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-[58px] border transition-all duration-500 ${
            isScrolled
              ? "bg-surface-glass-strong/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
              : "bg-surface-glass/50 backdrop-blur-md border-white/5"
          }`}
        >
          <Link href="/" aria-label="YallaCode home" className="flex items-center">
            <Image
              src="/logo.png"
              alt="YallaCode"
              width={730}
              height={194}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-muted hover:text-accent-magenta transition-colors duration-500"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-full bg-white/5 text-text-primary hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t("toggle_menu")}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full px-4 pt-3"
          >
            <div className="bg-surface-glass-strong/90 backdrop-blur-2xl border border-white/10 rounded-[36px] p-6 flex flex-col gap-5 shadow-2xl">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-text-muted hover:text-accent-magenta transition-colors border-b border-white/5 pb-3 last:border-0 last:pb-0"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
