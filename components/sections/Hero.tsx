"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const FerrofluidCanvas = dynamic(
  () => import("@/components/effects/FerrofluidCanvas"),
  { ssr: false }
);
const ParticleField = dynamic(
  () => import("@/components/effects/ParticleField"),
  { ssr: false }
);

const ROLES = [
  "Cyber Security Engineer",
  "Full Stack Developer",
  "Ethical Hacker",
  "Penetration Tester",
];

function TypewriterRoles() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1800);
      return () => clearTimeout(t);
    }

    const current = ROLES[roleIndex];

    if (!deleting && displayed === current) {
      const t = setTimeout(() => {
        setPaused(true);
        setDeleting(true);
      }, 0);
      return () => clearTimeout(t);
    }

    if (deleting && displayed === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }, 0);
      return () => clearTimeout(t);
    }

    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      setDisplayed((prev) =>
        deleting
          ? current.slice(0, prev.length - 1)
          : current.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(t);
  }, [displayed, deleting, roleIndex, paused]);

  return (
    <span className="text-[var(--accent-primary)] font-display">
      {displayed}
      <span className="animate-blink ml-0.5 inline-block w-0.5 h-8 bg-[var(--accent-primary)] align-middle" />
    </span>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.6 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span
        className="text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
      >
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="w-px h-12 rounded-full"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,217,255,0.8), transparent)",
        }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const glowRef  = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const curGlow  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (e.clientY > rect.bottom) return;
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const animate = () => {
      curGlow.current.x += (mouseRef.current.x - curGlow.current.x) * 0.06;
      curGlow.current.y += (mouseRef.current.y - curGlow.current.y) * 0.06;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(800px circle at ${curGlow.current.x}px ${curGlow.current.y}px,
          rgba(0,217,255,0.12),
          rgba(0,217,255,0.04) 40%,
          transparent 70%
        )`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToWork = () => {
    document.getElementById("project")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100dvh" }}
      aria-label="Hero section"
    >
      {/* ── Backgrounds ─────────────────────────────────────────────── */}
      {/* Deep vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(5,5,5,0.7) 100%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Ferrofluid WebGL */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <FerrofluidCanvas />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        <ParticleField />
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #050505, transparent)",
          zIndex: 4,
        }}
        aria-hidden="true"
      />

      {/* Mouse-following hero glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 5 }}
        aria-hidden="true"
      />

      {/* Soft ambient gradient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          background:
            "radial-gradient(ellipse, rgba(0,217,255,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 2,
        }}
        aria-hidden="true"
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div
        className="container-section relative flex flex-col items-center text-center py-20"
        style={{ zIndex: 10 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
            style={{
              background: "var(--accent-06)",
              border: "1px solid rgba(0,217,255,0.2)",
              color: "var(--accent-primary)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.1em",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse-glow"
              aria-hidden="true"
            />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name — responsive type scale */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="font-display font-bold text-white leading-none tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 8rem)",
            lineHeight: 1.05,
          }}
        >
          Tawfik{" "}
          <span className="gradient-text glow-text">Labbay</span>
        </motion.h1>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="my-8 h-px w-32"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,217,255,0.6), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="font-display font-medium"
          style={{
            fontSize: "clamp(1.25rem, 3.5vw, 2.5rem)",
            minHeight: "3rem",
          }}
          aria-live="polite"
          aria-label="Current role"
        >
          <TypewriterRoles />
        </motion.div>

        {/* Sub description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-8 text-center"
          style={{
            maxWidth: "38rem",
            fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
            lineHeight: 1.7,
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Building real-world security solutions and award-winning applications
          where offensive security meets elegant software engineering.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary */}
          <button
            onClick={scrollToWork}
            data-cursor-hover
            className="btn btn-primary group relative overflow-hidden"
          >
            <span className="relative z-10">View My Work</span>
            <ArrowRight
              size={16}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            {/* Hover overlay */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))",
              }}
              aria-hidden="true"
            />
          </button>

          {/* Secondary */}
          <button
            onClick={scrollToContact}
            data-cursor-hover
            className="btn btn-secondary"
          >
            <Mail size={16} aria-hidden="true" />
            Contact Me
          </button>
        </motion.div>

        {/* Tech stack pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {["React", "Next.js", "Python", "Kali Linux", "Node.js", "TypeScript"].map(
            (tech, i) => (
              <motion.span
                key={tech}
                className="pill"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + i * 0.06, duration: 0.4 }}
              >
                {tech}
              </motion.span>
            )
          )}
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
