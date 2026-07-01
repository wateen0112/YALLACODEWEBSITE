"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("about"), href: "#about" },
    { name: t("services"), href: "#services" },
    { name: t("how_it_works"), href: "#process" },
    { name: t("blog"), href: "#testimonials" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-transform transition-opacity transition-colors duration-300">
      {/* Full-width wrapper — transparent at top, minimal when scrolled */}
      <div
        className={`w-full transition-transform transition-opacity transition-colors duration-300 ${
          isScrolled
            ? "bg-transparent border-b border-transparent"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center py-3 md:py-4">
            {/* At top: full-width spread layout (no pill bg) */}
            <div
              className={`hidden md:flex w-full items-center justify-between transition-transform transition-opacity transition-colors duration-300 ${
                isScrolled
                  ? "opacity-0 pointer-events-none absolute"
                  : "opacity-100 relative"
              }`}
            >
              {/* Logo */}
              <Link href="/" aria-label="YallaCode home" className="shrink-0">
                <Image
                  src="/logo.png"
                  alt="YallaCode"
                  width={730}
                  height={194}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 120px, 150px"
                  className="h-7 md:h-8 w-auto aspect-video object-contain"
                />
              </Link>

              {/* Links */}
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/5"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2">
                <Link
                  href="#contact"
                  className="text-sm font-bold text-white hover:text-primary-300 transition-colors px-3 py-1.5"
                >
                  {t("contact")}
                </Link>
                <LanguageSwitcher />
              </div>
            </div>

            {/* Scrolled: centered floating pill */}
            <nav
              className={`hidden md:flex mx-auto items-center rounded-full border shadow-lg transition-all duration-300 ${
                isScrolled
                  ? "w-fit max-w-full justify-between gap-2 border-white/10 bg-surface/70 backdrop-blur-2xl px-4 py-1.5 opacity-100 translate-y-0 relative"
                  : "w-auto gap-1 md:gap-2 border-transparent bg-transparent backdrop-blur-none px-2 py-1.5 opacity-0 -translate-y-2 pointer-events-none absolute"
              }`}
            >
              {/* Logo */}
              <Link href="/" aria-label="YallaCode home" className="shrink-0 pl-1 pr-1">
                <Image
                  src="/logo.png"
                  alt="YallaCode"
                  width={730}
                  height={194}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 120px, 150px"
                  className="h-7 md:h-8 w-auto aspect-video object-contain"
                />
              </Link>

              {/* Main links */}
              <div className={`flex items-center gap-1 ${isScrolled ? "px-1" : "px-2"}`}>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`py-1.5 text-sm font-medium text-text-primary/90 hover:text-white transition-colors rounded-full hover:bg-white/5 ${isScrolled ? "px-1.5" : "px-3"}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Right side: contact + language */}
              <div className="flex items-center gap-2 pl-1 pr-2">
                <Link
                  href="#contact"
                  className="text-sm font-bold text-white hover:text-primary-300 transition-colors px-3 py-1.5"
                >
                  {t("contact")}
                </Link>
                <LanguageSwitcher />
              </div>
            </nav>

            {/* Mobile: always pill */}
            <nav
              className={`md:hidden flex items-center gap-1 rounded-full border px-2 py-1.5 shadow-lg transition-transform transition-opacity transition-colors duration-300 mx-auto ${
                isScrolled
                  ? "border-white/10 bg-surface/70 backdrop-blur-2xl"
                  : "border-white/10 bg-white/5 backdrop-blur-xl"
              }`}
            >
              <Link href="/" aria-label="YallaCode home" className="shrink-0 pl-1">
                <Image
                  src="/logo.png"
                  alt="YallaCode"
                  width={730}
                  height={194}
                  priority
                  fetchPriority="high"
                  sizes="100px"
                  className="h-6 w-auto aspect-video object-contain"
                />
              </Link>
              <button
                className="p-2 text-primary-400"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={t("toggle_menu")}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl z-40"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-primary-400 transition-colors border-b border-white/10 pb-2"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4">
              <LanguageSwitcher />
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-white hover:text-primary-300 transition-colors"
              >
                {t("contact")}
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
