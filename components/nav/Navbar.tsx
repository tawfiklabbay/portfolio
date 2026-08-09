"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Project", href: "#project" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Hide/show logic
      if (currentY > lastScrollY.current && currentY > 100) {
        setIsVisible(false);
        setMobileOpen(false);
      } else {
        setIsVisible(true);
      }

      setScrolled(currentY > 50);
      lastScrollY.current = currentY;
    };

    // Intersection observer for active section
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      sections.forEach((s) => observer.unobserve(s));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -120, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      className="fixed top-4 left-0 right-0 z-[9000] flex justify-center px-4"
      role="banner"
    >
      <nav
        className="glass flex items-center gap-1 px-2 py-2 rounded-2xl"
        style={{
          background: scrolled
            ? "rgba(14, 17, 23, 0.85)"
            : "rgba(14, 17, 23, 0.6)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,217,255,0.05) inset",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="px-4 py-2 font-display font-bold text-sm text-white mr-2"
          style={{ letterSpacing: "-0.02em" }}
          aria-label="Go to top"
        >
          <span className="gradient-text">TL</span>
        </button>

        <div className="hidden md:flex items-center gap-1" role="list">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <div key={item.href} role="listitem" className="relative">
                <button
                  onClick={() => scrollTo(item.href)}
                  className="relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200"
                  style={{
                    color: isActive ? "#00d9ff" : "#a1a1aa",
                    fontFamily: "var(--font-body)",
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "rgba(0,217,255,0.08)",
                        border: "1px solid rgba(0,217,255,0.2)",
                      }}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
          className="hidden md:flex items-center gap-2 ml-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: "rgba(0,217,255,0.1)",
            border: "1px solid rgba(0,217,255,0.25)",
            color: "#00d9ff",
            fontFamily: "var(--font-body)",
          }}
          data-cursor-hover
        >
          Hire Me
        </a>

        {/* Mobile toggle */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-2 ml-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className="block h-0.5 w-5 bg-white transition-all duration-300"
            style={{ transform: mobileOpen ? "rotate(45deg) translate(3px, 5px)" : "none" }}
          />
          <span
            className="block h-0.5 w-5 bg-white transition-all duration-300"
            style={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <span
            className="block h-0.5 w-5 bg-white transition-all duration-300"
            style={{ transform: mobileOpen ? "rotate(-45deg) translate(3px, -5px)" : "none" }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-4 right-4 glass rounded-2xl p-4 flex flex-col gap-2"
            style={{
              background: "rgba(14, 17, 23, 0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px)",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200"
                style={{
                  color: activeSection === item.href.replace("#", "") ? "#00d9ff" : "#a1a1aa",
                  background:
                    activeSection === item.href.replace("#", "")
                      ? "rgba(0,217,255,0.08)"
                      : "transparent",
                  fontFamily: "var(--font-body)",
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
