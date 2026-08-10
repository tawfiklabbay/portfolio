"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Star, Code2, Zap } from "lucide-react";

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    color: "#ffcc44",
    bg: "rgba(255,200,0,0.08)",
    border: "rgba(255,200,0,0.2)",
    title: "🏆 Paradox Hackathon — Winner",
    subtitle: "1st Place",
    project: "Project Argus",
    desc: "Threat Deception Platform — Award-winning cybersecurity solution that actively lures and analyzes malicious actors.",
    tags: ["Hackathon", "Cybersecurity", "1st Place"],
  },
  {
    icon: Code2,
    color: "#00d9ff",
    bg: "rgba(0,217,255,0.06)",
    border: "rgba(0,217,255,0.15)",
    title: "Full Stack Development",
    subtitle: "Proficiency",
    project: "18+ Technologies",
    desc: "Mastered a comprehensive tech stack spanning frontend, backend, security, and DevOps across multiple real-world projects.",
    tags: ["React", "Next.js", "Node.js", "Python"],
  },
  {
    icon: Zap,
    color: "#5eeaff",
    bg: "rgba(94,234,255,0.06)",
    border: "rgba(94,234,255,0.15)",
    title: "Security Engineering",
    subtitle: "Expertise",
    project: "Ethical Hacking",
    desc: "Developed advanced penetration testing skills and built real-world intrusion detection and threat deception systems.",
    tags: ["Kali Linux", "Pen Testing", "CTFs"],
  },
];

function AchievementCard({
  achievement,
  index,
  inView,
}: {
  achievement: (typeof ACHIEVEMENTS)[0];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.background = `radial-gradient(300px circle at ${x}px ${y}px, ${achievement.bg.replace("0.06", "0.15").replace("0.08", "0.18")}, transparent 60%)`;
    card.style.transform = `perspective(800px) rotateY(${((x / rect.width) - 0.5) * 8}deg) rotateX(${-((y / rect.height) - 0.5) * 8}deg)`;
  };

  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative glass-card p-8 md:p-10 h-full"
        style={{
          transition: "transform 0.2s ease",
        }}
        data-cursor-hover
      >
        <div ref={glowRef} className="absolute inset-0 rounded-[20px] pointer-events-none" aria-hidden="true" />

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: achievement.bg,
              border: `1px solid ${achievement.border}`,
              boxShadow: `0 0 20px ${achievement.bg}`,
            }}
          >
            <achievement.icon size={24} style={{ color: achievement.color }} aria-hidden="true" />
          </div>
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-1"
              style={{ color: achievement.color, fontFamily: "var(--font-mono)" }}
            >
              {achievement.subtitle}
            </p>
            <h3 className="font-display font-bold text-xl text-white leading-tight">
              {achievement.title}
            </h3>
          </div>
        </div>

        {/* Project */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-4"
          style={{
            background: achievement.bg,
            border: `1px solid ${achievement.border}`,
          }}
        >
          <Star size={12} style={{ color: achievement.color }} aria-hidden="true" />
          <span
            className="text-sm font-semibold"
            style={{ color: achievement.color, fontFamily: "var(--font-body)" }}
          >
            {achievement.project}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-loose mb-8"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)", lineHeight: "1.9" }}
        >
          {achievement.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2.5">
          {achievement.tags.map((tag) => (
            <span
              key={tag}
              className="pill"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="achievements"
      ref={ref}
      className="py-24 md:py-32 lg:py-36 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
      aria-label="Achievements"
    >
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(255,200,0,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "#00d9ff", fontFamily: "var(--font-mono)" }}
          >
            04 / Achievements
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
            Recognition
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ACHIEVEMENTS.map((a, i) => (
            <AchievementCard key={a.title} achievement={a} index={i} inView={inView} />
          ))}
        </div>
      </div>
      {/* Section divider */}
      <div className="section-divider" aria-hidden="true" />
    </section>
  );
}
