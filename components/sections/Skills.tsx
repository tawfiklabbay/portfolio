"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SKILLS = [
  { name: "React",              category: "Frontend",  icon: "⚛️"  },
  { name: "Next.js",            category: "Frontend",  icon: "▲"   },
  { name: "TypeScript",         category: "Language",  icon: "TS"  },
  { name: "Node.js",            category: "Backend",   icon: "⬡"   },
  { name: "Python",             category: "Language",  icon: "🐍"  },
  { name: "Java",               category: "Language",  icon: "☕"  },
  { name: "C++",                category: "Language",  icon: "C++" },
  { name: "Linux",              category: "OS",        icon: "🐧"  },
  { name: "Kali Linux",         category: "Security",  icon: "🔒"  },
  { name: "Docker",             category: "DevOps",    icon: "🐳"  },
  { name: "MongoDB",            category: "Database",  icon: "🍃"  },
  { name: "SQL",                category: "Database",  icon: "🗃️"  },
  { name: "Networking",         category: "Security",  icon: "🌐"  },
  { name: "Ethical Hacking",    category: "Security",  icon: "🛡️"  },
  { name: "Pen Testing",        category: "Security",  icon: "🔍"  },
  { name: "GSAP",               category: "Animation", icon: "✨"  },
  { name: "Tailwind CSS",       category: "Frontend",  icon: "🎨"  },
  { name: "Git",                category: "DevOps",    icon: "⑂"   },
];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend:  "rgba(0,217,255,0.15)",
  Backend:   "rgba(94,234,255,0.12)",
  Language:  "rgba(120,180,255,0.12)",
  Security:  "rgba(255,100,100,0.12)",
  OS:        "rgba(150,255,150,0.10)",
  Database:  "rgba(255,200,50,0.10)",
  DevOps:    "rgba(200,100,255,0.10)",
  Animation: "rgba(255,150,50,0.10)",
};

function SkillCard({
  skill,
  index,
  inView,
}: {
  skill: (typeof SKILLS)[0];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 22;

    // Light reflection spot
    const lightX = ((e.clientX - rect.left) / rect.width) * 100;
    const lightY = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.transform = `perspective(500px) rotateY(${x}deg) rotateX(${y}deg) translateZ(8px)`;
    card.style.background = `
      radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.06), transparent 60%),
      ${CATEGORY_COLORS[skill.category] || "rgba(255,255,255,0.04)"}
    `;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(500px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    card.style.background = CATEGORY_COLORS[skill.category] || "rgba(255,255,255,0.04)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.04,
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl cursor-default select-none"
        style={{
          background: CATEGORY_COLORS[skill.category] || "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          willChange: "transform",
          transition: "transform 0.15s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,217,255,0.08)";
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "rgba(0,217,255,0.2)";
        }}
        data-cursor-hover
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-transform duration-200 group-hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            fontFamily: skill.icon.length > 2 ? "var(--font-mono)" : "inherit",
            fontSize: skill.icon.length > 2 ? "0.7rem" : "1.25rem",
            color: "#00d9ff",
          }}
        >
          {skill.icon}
        </div>

        {/* Name */}
        <span
          className="text-sm font-medium text-center leading-tight"
          style={{ color: "#e4e4e7", fontFamily: "var(--font-body)" }}
        >
          {skill.name}
        </span>

        {/* Category badge */}
        <span
          className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 md:py-32 lg:py-36 relative"
      style={{ background: "var(--bg-secondary)" }}
      aria-label="Skills"
    >
      {/* Background glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,217,255,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16"
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "#00d9ff", fontFamily: "var(--font-mono)" }}
          >
            02 / Skills
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            My Arsenal
          </h2>
          <p
            className="text-base max-w-lg"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
          >
            Technologies I use to build secure, performant, and elegant solutions.
          </p>
        </motion.div>

        {/* Skill cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-6">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom decorative bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mt-20 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,217,255,0.3), transparent)",
            transformOrigin: "left",
          }}
          aria-hidden="true"
        />
      </div>
      {/* Section divider */}
      <div className="section-divider" aria-hidden="true" />
    </section>
  );
}
