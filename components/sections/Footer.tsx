"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer
      className="relative pt-16 pb-10 overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
      role="contentinfo"
    >
      {/* Glowing divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,217,255,0.4) 30%, rgba(94,234,255,0.6) 50%, rgba(0,217,255,0.4) 70%, transparent 100%)",
          boxShadow: "0 0 20px rgba(0,217,255,0.15)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span
              className="font-display font-bold text-2xl gradient-text"
              style={{ letterSpacing: "-0.02em" }}
            >
              TL
            </span>
            <p
              className="text-xs"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
            >
              Tawfik Labbay — Cyber Security & Full Stack
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <div className="flex flex-wrap justify-center gap-6">
              {["Home", "About", "Skills", "Project", "Achievements", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    document
                      .getElementById(item.toLowerCase())
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs transition-colors duration-200"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLButtonElement).style.color = "#00d9ff")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLButtonElement).style.color = "var(--text-muted)")
                  }
                  data-cursor-hover
                >
                  {item}
                </button>
              ))}
            </div>
          </nav>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(0,217,255,0.08)",
              border: "1px solid rgba(0,217,255,0.2)",
              color: "#00d9ff",
            }}
            aria-label="Back to top"
            data-cursor-hover
          >
            <ArrowUp size={16} aria-hidden="true" />
          </motion.button>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--border)" }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            © {year} Tawfik Labbay. Built with passion & precision.
          </motion.p>
          <p
            className="text-xs flex items-center gap-1"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            Crafted with{" "}
            <span style={{ color: "#00d9ff" }}>Next.js · GSAP · Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
