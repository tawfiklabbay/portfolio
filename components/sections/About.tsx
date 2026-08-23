"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";


interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ end, suffix = "", duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 20;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale(1.03)`;
  };

  const onLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform =
        "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.15s ease", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

const TIMELINE = [
  {
    year: "2022",
    title: "Started Coding Journey",
    desc: "Began with Python and web fundamentals, quickly developing a passion for building.",
  },
  {
    year: "2023",
    title: "Dived into Cyber Security",
    desc: "Discovered ethical hacking and penetration testing — merging engineering with security.",
  },
  {
    year: "2024",
    title: "Award-Winning Hackathon Project",
    desc: "Built Project Argus, a threat deception platform, winning the Paradox Hackathon.",
  },
  {
    year: "2025",
    title: "Full Stack + Security Integration",
    desc: "Mastering both worlds — building secure, high-performance web applications.",
  },
];

const STATS = [
  { label: "Projects Built",    end: 20,  suffix: "+"  },
  { label: "Hackathon Wins",    end: 1,   suffix: "🏆" },
  { label: "Technologies",      end: 18,  suffix: "+"  },
  { label: "Years Learning",    end: 3,   suffix: "+"  },
];



const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-32 lg:py-36 relative"
      aria-label="About Tawfik Labbay"
    >
      {/* Background blob */}
      <div
        className="absolute -left-64 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,217,255,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div
        style={{
          width: "100%",
          maxWidth: "var(--container-max)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "var(--container-px-sm)",
          paddingRight: "var(--container-px-sm)",
        }}
      >
        {/* Section header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "#00d9ff", fontFamily: "var(--font-mono)" }}
          >
            01 / About
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            Who I Am
          </motion.h2>
        </motion.div>

        {/* Main split layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32 items-start">
          {/* Left — Profile image with 3D tilt + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <TiltCard className="relative">
              {/* Avatar card */}
              <div
                className="relative rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center"
                style={{
                  padding: "3rem 2rem",
                  background: "linear-gradient(135deg, #0e1117 0%, #050505 100%)",
                  border: "1px solid rgba(0,217,255,0.2)",
                  boxShadow:
                    "0 0 40px rgba(0,217,255,0.1), 0 0 0 1px rgba(0,217,255,0.05) inset, 0 24px 64px rgba(0,0,0,0.6)",
                }}
              >
                {/* Gradient avatar background */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 30%, rgba(0,217,255,0.15) 0%, transparent 60%), linear-gradient(180deg, rgba(0,217,255,0.05) 0%, transparent 100%)",
                  }}
                  aria-hidden="true"
                />

                {/* Avatar — 160-180px on desktop, 120px on mobile */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div
                    className="rounded-full flex items-center justify-center mb-5"
                    style={{
                      width: "clamp(120px, 20vw, 180px)",
                      height: "clamp(120px, 20vw, 180px)",
                      background:
                        "linear-gradient(135deg, rgba(0,217,255,0.2), rgba(94,234,255,0.1))",
                      border: "2px solid rgba(0,217,255,0.3)",
                      boxShadow: "0 0 40px rgba(0,217,255,0.2)",
                    }}
                  >
                    <span
                      className="font-display font-bold gradient-text"
                      style={{
                        fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      TL
                    </span>
                  </div>
                  <p
                    className="font-display font-bold text-white text-lg mb-1"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    Tawfik Labbay
                  </p>
                  <p style={{ color: "#00d9ff", fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
                    Cyber Security Engineer & Full Stack Dev
                  </p>
                </div>

                {/* Available Status */}
                <div
                  className="mt-8 relative z-10"
                  style={{
                    background: "rgba(14,17,23,0.8)",
                    border: "1px solid rgba(0,217,255,0.2)",
                    borderRadius: "12px",
                    padding: "8px 16px",
                    backdropFilter: "blur(10px)",
                    fontFamily: "var(--font-mono)",
                    color: "#00d9ff",
                    fontSize: "0.75rem",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Available for opportunities
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Stats grid — 2x2 on mobile, 4x1 on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="grid grid-cols-2 gap-4 mt-6"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card flex flex-col items-center justify-center text-center gap-2"
                  style={{ padding: "1.5rem 1rem", minHeight: "110px" }}
                >
                  <span className="font-display font-bold gradient-text" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </span>
                  <span
                    className="text-xs leading-tight"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Story + Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Story */}
            <div className="space-y-5">
              <p
                className="text-lg"
                style={{ color: "#e4e4e7", fontFamily: "var(--font-body)", lineHeight: "1.75" }}
              >
                I&apos;m a passionate{" "}
                <span style={{ color: "#00d9ff" }}>
                  Cyber Security Engineer
                </span>{" "}
                and{" "}
                <span style={{ color: "#00d9ff" }}>Full Stack Developer</span>{" "}
                driven by an obsession with understanding how systems work — and
                how they break.
              </p>
              <p
                className="text-base"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)", lineHeight: "1.75" }}
              >
                My journey started with software engineering and quickly evolved
                into the world of ethical hacking and penetration testing. I love
                building things that not only work beautifully but are secure from
                the inside out.
              </p>
              <p
                className="text-base"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)", lineHeight: "1.75" }}
              >
                From crafting elegant web applications to architecting threat
                deception platforms, I merge offensive security expertise with
                modern engineering practices to build solutions that matter.
              </p>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{ background: "var(--border)" }}
              aria-hidden="true"
            />

            {/* Timeline */}
            <div>
              <h3
                className="font-display font-bold text-white mb-8"
                style={{ fontSize: "1.25rem" }}
              >
                My Journey
              </h3>
              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute top-0 bottom-0 w-px"
                  style={{
                    left: "7px",
                    background:
                      "linear-gradient(to bottom, rgba(0,217,255,0.5), transparent)",
                  }}
                  aria-hidden="true"
                />

                <div className="space-y-8 pl-8">
                  {TIMELINE.map((item, i) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                      className="relative"
                    >
                      {/* Dot */}
                      <div
                        className="absolute -left-8 top-1 w-3.5 h-3.5 rounded-full border-2"
                        style={{
                          background: "#050505",
                          borderColor: "#00d9ff",
                          boxShadow: "0 0 10px rgba(0,217,255,0.5)",
                        }}
                        aria-hidden="true"
                      />
                      {/* Timeline card */}
                      <div
                        className="rounded-2xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          padding: "1rem 1.25rem",
                        }}
                      >
                        <span
                          className="text-xs font-mono mb-1 block"
                          style={{ color: "#00d9ff" }}
                        >
                          {item.year}
                        </span>
                        <h4 className="font-display font-bold text-white text-base mb-1">
                          {item.title}
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)", lineHeight: "1.6" }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Section divider */}
      <div className="section-divider mt-24" aria-hidden="true" />
    </section>
  );
}
