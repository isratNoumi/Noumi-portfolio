"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Send,
  X,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PROFILE, SOCIALS } from "@/content/profile";
import { cn } from "@/lib/utils";

// EmailJS config — set these in your build environment (e.g. GitHub Pages
// repository secrets). See EMAILJS_SETUP.md for the full walkthrough.
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  // Auto-close the success modal after 3 seconds
  React.useEffect(() => {
    if (!showModal) return;
    const t = setTimeout(() => setShowModal(false), 3000);
    return () => clearTimeout(t);
  }, [showModal]);

  // Close modal on Escape
  React.useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMsg(
        "Contact form is not configured yet. See EMAILJS_SETUP.md to add your EmailJS keys.",
      );
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        e.currentTarget,
        { publicKey: PUBLIC_KEY },
      );
      setStatus("success");
      setShowModal(true);
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      const message =
        err instanceof Error ? err.message : "Something went wrong. Try again?";
      setErrorMsg(message);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let&apos;s build{" "}
          <span className="text-gradient">something good</span>.
        </>
      }
      description="Have a role, a project, or just want to say hi? My inbox is open."
    >
      <div className="grid gap-6 md:grid-cols-5">
        {/* Contact form */}
        <Card className="md:col-span-3">
          <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
            {/* Hidden field so EmailJS template can address the recipient */}
            <input type="hidden" name="to_name" value={PROFILE.name} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="from_name"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink-faint"
                >
                  Name
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-ink placeholder-ink-faint outline-none transition focus:border-brand-400/60 focus:bg-white/[0.05]"
                  placeholder="Ada Lovelace"
                />
              </div>
              <div>
                <label
                  htmlFor="from_email"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink-faint"
                >
                  Email
                </label>
                <input
                  id="from_email"
                  name="from_email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-ink placeholder-ink-faint outline-none transition focus:border-brand-400/60 focus:bg-white/[0.05]"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink-faint"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-ink placeholder-ink-faint outline-none transition focus:border-brand-400/60 focus:bg-white/[0.05]"
                placeholder="Tell me about your project or role…"
              />
            </div>

            {/* Honeypot — bots fill this; humans don't see it */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-bg-base shadow-glow transition",
                  "hover:scale-[1.02] hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send message
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-sm text-rose-400">{errorMsg}</p>
              )}
            </div>
          </form>
        </Card>

        {/* Contact info */}
        <div className="space-y-4 md:col-span-2">
          <Card>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-300">
              Direct
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="mt-2 flex items-center gap-2 text-lg font-medium text-ink transition hover:text-brand-300"
            >
              <Mail className="h-4 w-4" /> {PROFILE.email}
            </a>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
              <MapPin className="h-4 w-4" /> {PROFILE.location}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {PROFILE.availability}
            </p>
          </Card>

          <Card>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-300">
              Elsewhere
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SOCIALS.filter((s) => s.label !== "Email").map((s) => {
                const Icon = s.icon;
                return (
                  <Button
                    key={s.label}
                    href={s.href}
                    variant="outline"
                    size="sm"
                    external
                  >
                    <Icon className="h-3.5 w-3.5" /> {s.label}
                  </Button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Success modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Message sent"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-bg-surface/95 p-8 text-center shadow-glow backdrop-blur-xl"
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className="absolute right-3 top-3 rounded-full p-1 text-ink-faint transition hover:bg-white/5 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Animated check */}
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/15"
              >
                <CheckCircle2 className="h-10 w-10 text-brand-400" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-4 font-display text-xl font-semibold text-ink"
              >
                Message sent
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="mt-2 text-sm text-ink-muted"
              >
                Thanks for reaching out — I&apos;ll get back to you soon.
              </motion.p>

              {/* Auto-close progress bar */}
              <div className="mt-6 h-0.5 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="h-full bg-brand-gradient"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
