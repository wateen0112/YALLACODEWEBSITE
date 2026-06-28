"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { m } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Send,
  User,
  Mail,
  Building2,
  MessageSquare,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
  ArrowUpLeft,
} from "lucide-react";
import { GlowButton } from "../ui/GlowButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function CTASection() {
  const t = useTranslations("home");
  const tContact = useTranslations("contact");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { opacity: 0, x: isRtl ? 60 : -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: isRtl ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = tContact("error_name_required");
    if (!formData.email.trim()) {
      newErrors.email = tContact("error_email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = tContact("error_email_invalid");
    }
    if (!formData.message.trim()) newErrors.message = tContact("error_message_required");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = (field: string, hasError?: string) =>
    `w-full rounded-xl border bg-white/[0.03] backdrop-blur-sm px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-transform transition-opacity transition-colors duration-300 outline-none ${
      hasError
        ? "border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/20"
        : focusedField === field
        ? "border-primary-400/50 focus:border-primary-400 focus:ring-1 focus:ring-primary-400/20"
        : "border-white/10 hover:border-white/20 focus:border-primary-400/50"
    }`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden bg-background"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary-600/15 rounded-full blur-[160px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-[140px] -translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column — CTA copy */}
          <div ref={leftRef} className="flex flex-col justify-center lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-text-secondary mb-6 w-fit">
              <Send className="h-4 w-4 text-primary-400" />
              <span>{tContact("badge")}</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t("cta_banner")}
            </h2>

            <p className="text-xl text-text-secondary mb-8 max-w-md leading-relaxed">
              {t("cta_subtitle")}
            </p>

            {/* Contact info cards */}
            <div className="flex flex-col gap-4">
              <m.div
                whileHover={{ x: isRtl ? -4 : 4 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-600/10 border border-primary-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-0.5">{tContact("email_label")}</p>
                  <p className="text-sm font-medium text-white">hello@yallacode.com</p>
                </div>
              </m.div>

              <m.div
                whileHover={{ x: isRtl ? -4 : 4 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-600/10 border border-primary-500/20 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-0.5">{tContact("location_label")}</p>
                  <p className="text-sm font-medium text-white">{tContact("location_value")}</p>
                </div>
              </m.div>
            </div>
          </div>

          {/* Right column — Contact form */}
          <div ref={rightRef}>
            <div className="glass-card rounded-3xl p-6 md:p-8 lg:p-10 relative overflow-hidden">
              {/* Top gradient line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-60" />

              {isSubmitted ? (
                /* Success state */
                <m.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-primary-400 mb-6" />
                  </m.div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {tContact("success_title")}
                  </h3>
                  <p className="text-text-secondary max-w-sm">
                    {tContact("success_message")}
                  </p>
                  <GlowButton
                    variant="secondary"
                    className="mt-8 rounded-full px-8 py-3"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", company: "", message: "" });
                    }}
                  >
                    {tContact("send_another")}
                  </GlowButton>
                </m.div>
              ) : (
                /* Form */
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tContact("form_title")}
                  </h3>

                  {/* Name */}
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={tContact("placeholder_name")}
                      className={`${inputClasses("name", errors.name)} pl-10`}
                    />
                    {errors.name && (
                      <m.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 mt-1.5 ml-1"
                      >
                        {errors.name}
                      </m.p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={tContact("placeholder_email")}
                      className={`${inputClasses("email", errors.email)} pl-10`}
                    />
                    {errors.email && (
                      <m.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 mt-1.5 ml-1"
                      >
                        {errors.email}
                      </m.p>
                    )}
                  </div>

                  {/* Company (optional) */}
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={tContact("placeholder_company")}
                      className={inputClasses("company") + " pl-10"}
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 text-white/30">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={tContact("placeholder_message")}
                      rows={4}
                      className={`${inputClasses("message", errors.message)} pl-10 resize-none`}
                    />
                    {errors.message && (
                      <m.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 mt-1.5 ml-1"
                      >
                        {errors.message}
                      </m.p>
                    )}
                  </div>

                  {/* Submit */}
                  <GlowButton
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full text-base px-8 py-4 rounded-full mt-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {tContact("sending")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {tContact("submit")}
                        {isRtl ? (
                          <ArrowUpLeft className="w-5 h-5 shrink-0" aria-hidden />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 shrink-0" aria-hidden />
                        )}
                      </span>
                    )}
                  </GlowButton>
                </form>
              )}

              {/* Bottom gradient line */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-600 to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
