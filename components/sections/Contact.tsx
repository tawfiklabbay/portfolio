"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Download, Send, CheckCircle2, Mail } from "lucide-react";

// SVG social icons (lucide doesn't export Github/Linkedin in this version)
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    Icon: GitHubIcon,
    label: "GitHub",
    href: "https://github.com/tawfiklabbay",
    color: "#e4e4e7",
  },
  {
    Icon: LinkedInIcon,
    label: "LinkedIn",
    href: "https://linkedin.com/in/tawfiklabbay",
    color: "#0077B5",
  },
  {
    Icon: Mail,
    label: "Email",
    href: "mailto:tawfik@example.com",
    color: "#00d9ff",
  },
];


function MagneticButton({
  children,
  onClick,
  className = "",
  style = {},
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={className}
      style={{ ...style, transition: "transform 0.3s var(--ease-spring)" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
      data-cursor-hover
    >
      {children}
    </button>
  );
}

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    // Simulate API call — replace with actual endpoint
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");
    setFields({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-28 lg:py-32 relative"
      aria-label="Contact Tawfik Labbay"
    >
      {/* Background glow */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,217,255,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "#00d9ff", fontFamily: "var(--font-mono)" }}
          >
            05 / Contact
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Let&apos;s Build Something
          </h2>
          <p
            className="text-base max-w-lg mx-auto"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
          >
            Have a project in mind or want to discuss security solutions?
            I&apos;m open to collaborations and opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — Social + Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="glass-card p-8 space-y-4">
              <h3 className="font-display font-bold text-xl text-white mb-6">
                Connect With Me
              </h3>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,217,255,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,217,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.02)";
                  }}
                  data-cursor-hover
                  aria-label={`${link.label} profile`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: link.color,
                    }}
                  >
                    <link.Icon />
                  </div>

                  <span
                    className="font-medium text-sm"
                    style={{ color: "#e4e4e7", fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Resume download */}
            <a
              href="/resume.pdf"
              download
              className="glass-card p-8 flex items-center gap-4 transition-all duration-200"
              style={{ textDecoration: "none" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,217,255,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}
              data-cursor-hover
              aria-label="Download resume PDF"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(0,217,255,0.1)",
                  border: "1px solid rgba(0,217,255,0.2)",
                }}
              >
                <Download size={20} style={{ color: "#00d9ff" }} aria-hidden="true" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm">Download Resume</p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                >
                  PDF · Updated 2025
                </p>
              </div>
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-12 gap-4"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "rgba(0,255,136,0.1)",
                        border: "1px solid rgba(0,255,136,0.3)",
                      }}
                    >
                      <CheckCircle2 size={32} style={{ color: "#00ff88" }} />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white">
                      Message Sent!
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                      Thanks for reaching out. I&apos;ll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="mt-4 px-6 py-2 rounded-xl text-sm"
                      style={{
                        background: "rgba(0,217,255,0.1)",
                        border: "1px solid rgba(0,217,255,0.2)",
                        color: "#00d9ff",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-label="Contact form"
                  >
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs mb-2"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={fields.name}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, name: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#fff",
                          fontFamily: "var(--font-body)",
                        }}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = "rgba(0,217,255,0.4)";
                          (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(0,217,255,0.08)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)";
                          (e.target as HTMLInputElement).style.boxShadow = "none";
                        }}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs mb-2"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={fields.email}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, email: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#fff",
                          fontFamily: "var(--font-body)",
                        }}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = "rgba(0,217,255,0.4)";
                          (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(0,217,255,0.08)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)";
                          (e.target as HTMLInputElement).style.boxShadow = "none";
                        }}
                        placeholder="your@email.com"
                        autoComplete="email"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs mb-2"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={fields.message}
                        onChange={(e) =>
                          setFields((f) => ({ ...f, message: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#fff",
                          fontFamily: "var(--font-body)",
                        }}
                        onFocus={(e) => {
                          (e.target as HTMLTextAreaElement).style.borderColor = "rgba(0,217,255,0.4)";
                          (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px rgba(0,217,255,0.08)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.08)";
                          (e.target as HTMLTextAreaElement).style.boxShadow = "none";
                        }}
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {/* Submit */}
                    <MagneticButton
                      onClick={() => {}}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-sm transition-all duration-300"
                      style={{
                        background: "linear-gradient(135deg, #00d9ff, #5eeaff)",
                        color: "#050505",
                        fontFamily: "var(--font-body)",
                        boxShadow: "0 0 30px rgba(0,217,255,0.25), 0 4px 16px rgba(0,0,0,0.4)",
                        cursor: formState === "loading" ? "wait" : "pointer",
                      }}
                      aria-label="Send message"
                    >
                      {formState === "loading" ? (
                        <>
                          <div
                            className="w-4 h-4 rounded-full border-2 border-[#050505] border-t-transparent animate-spin"
                            aria-hidden="true"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
