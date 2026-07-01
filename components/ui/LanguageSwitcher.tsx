"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Globe, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { LANGUAGE_OPTIONS, SUPPORTED_LOCALES } from "@/lib/locales";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [search, setSearch] = useState("");

  const basePath = useMemo(() => {
    const escapedLocales = SUPPORTED_LOCALES.join("|");
    const localePrefixRegex = new RegExp(`^/(${escapedLocales})(?=/|$)`);
    const stripped = pathname.replace(localePrefixRegex, "");
    return stripped === "" ? "/" : stripped;
  }, [pathname]);

  const filteredLanguages = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return LANGUAGE_OPTIONS;

    return LANGUAGE_OPTIONS.filter((language) =>
      `${language.label} ${language.sublabel} ${language.code}`.toLowerCase().includes(query)
    );
  }, [search]);

  const suggestedLanguages = filteredLanguages.filter((language) => language.suggested);
  const allLanguages = filteredLanguages.filter((language) => !language.suggested);
  const currentLanguage = LANGUAGE_OPTIONS.find((language) => language.code === locale);

  const getFlagUrl = (countryCode: string) => `https://flagcdn.com/${countryCode}.svg`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 p-2 rounded-full bg-surface/50 border border-primary-600/20 hover:bg-surface transition-colors"
        aria-label={t("button_aria_label")}
      >
        {currentLanguage && (
          <Image
            src={getFlagUrl(currentLanguage.countryCode)}
            alt={`${currentLanguage.label} flag`}
            width={20}
            height={14}
            sizes="20px"
            className="rounded-[2px] shadow-sm"
            unoptimized
          />
        )}
        <span className="text-sm font-medium uppercase">{locale}</span>
        
      
      </button>

      {isMounted &&
        isOpen &&
        createPortal(
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6 md:p-8"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("dialog_title")}
            className="my-auto max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F1A] text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="text-lg font-semibold">{t("dialog_title")}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
                aria-label={t("close_aria_label")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="border-b border-white/10 bg-black/10 p-5">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t("search_placeholder")}
                  className="w-full rounded-xl border border-primary-500/40 bg-[#0B0F1A] py-3 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-primary-400"
                />
              </div>
            </div>

            <div className="max-h-[64vh] overflow-y-auto p-5">
              {suggestedLanguages.length > 0 && (
                <section>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-300">{t("suggested_title")}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {suggestedLanguages.map((language) => {
                      const isCurrent = locale === language.code;

                      return (
                        <Link
                          key={language.code}
                          href={`/${language.code}${basePath === "/" ? "" : basePath}`}
                          onClick={() => setIsOpen(false)}
                          className={`rounded-xl border p-3 transition-colors ${
                            isCurrent
                              ? "border-primary-400 bg-primary-500/15"
                              : "border-white/10 bg-white/[0.03] hover:border-primary-500/50 hover:bg-white/[0.06]"
                          }`}
                        >
                          <p className="text-sm font-semibold">
                            <Image
                              src={getFlagUrl(language.countryCode)}
                              alt={`${language.label} flag`}
                              width={24}
                              height={16}
                              sizes="24px"
                              className="mr-2 inline-block rounded-[2px] shadow-sm"
                              unoptimized
                            />
                            {language.sublabel}
                          </p>
                          <p className="mt-1 text-xs text-zinc-400">{language.label}</p>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}

              <section className={suggestedLanguages.length > 0 ? "mt-8" : ""}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-300">{t("all_languages_title")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {allLanguages.map((language) => {
                    const isCurrent = locale === language.code;

                    return (
                      <Link
                        key={language.code}
                        href={`/${language.code}${basePath === "/" ? "" : basePath}`}
                        onClick={() => setIsOpen(false)}
                        className={`rounded-xl border p-3 transition-colors ${
                          isCurrent
                            ? "border-primary-400 bg-primary-500/15"
                            : "border-white/10 bg-white/[0.03] hover:border-primary-500/50 hover:bg-white/[0.06]"
                        }`}
                      >
                        <p className="text-sm font-semibold">
                          <Image
                            src={getFlagUrl(language.countryCode)}
                            alt={`${language.label} flag`}
                            width={24}
                            height={16}
                            className="mr-2 inline-block rounded-[2px] shadow-sm"
                          />
                          {language.sublabel}
                        </p>
                        <p className="mt-1 text-xs text-zinc-400">
                          {language.label} ({language.code.toUpperCase()})
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
