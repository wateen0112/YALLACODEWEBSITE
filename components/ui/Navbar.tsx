"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export function Navbar() {
  const t = useTranslations("nav");
  const tServices = useTranslations("services");
  const tFooter = useTranslations("footer");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  const navItems: NavItem[] = [
    { label: t("home"), href: "#" },
    {
      label: t("services"),
      href: "#services",
      children: [
        { label: tServices("items.web-mobile.title"), href: "#services" },
        { label: tServices("items.ai-ml.title"), href: "#services" },
        { label: tServices("items.cloud.title"), href: "#services" },
      ],
    },
    { label: t("projects"), href: "#projects" },
    { label: t("about"), href: "#about" },
    { label: t("contact"), href: "#contact" },
  ];

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="YallaCode home" className="flex items-center gap-2 group shrink-0 relative z-10">
            <Image
              src="/logo.png"
              alt="YallaCode"
              width={730}
              height={194}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          {/* Center pill navigation - perfectly centered on screen */}
          <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/8 backdrop-blur-xl border border-white/10">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors rounded-full hover:bg-white/5"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 py-2 rounded-2xl bg-surface/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 mx-1 rounded-xl text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-400 hover:shadow-[0_4px_20px_rgba(168,85,247,0.35)] transition-all"
            >
              {t("get_started")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={t("toggle_menu")}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-80 bg-surface/98 backdrop-blur-xl border-l border-white/10 p-6 lg:hidden z-50"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-white">{t("menu")}</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-text-secondary hover:text-white"
                  aria-label={t("close_menu")}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between text-base font-medium py-3 px-2 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {item.label}
                      {item.children && <ChevronDown className="w-4 h-4" />}
                    </Link>
                    {item.children && (
                      <div className="ml-4 pl-4 border-l border-white/10 space-y-1 mt-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-sm text-text-secondary hover:text-white transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-sm font-semibold text-white px-4 py-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-400"
                >
                  {t("get_started")}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
