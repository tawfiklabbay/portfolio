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
  Frontend:  "var(--accent-15)",
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
        className="group flex flex-col items-center justify-center gap-3 rounded-2xl cursor-default select-none"
        style={{
          background: CATEGORY_COLORS[skill.category] || "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          willChange: "transform",
          transition: "transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease",
          padding: "1.25rem 1rem",
          minHeight: "140px",
          aspectRatio: "1 / 1",
          display: "flex",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,217,255,0.08)";
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "var(--accent-25)";
        }}
        data-cursor-hover
      >
        {/* Icon */}
        <div
          className="rounded-xl flex items-center justify-center font-bold transition-transform duration-200 group-hover:scale-110"
          style={{
            width: "3rem",
            height: "3rem",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontFamily: skill.icon.length > 2 ? "var(--font-mono)" : "inherit",
            fontSize: skill.icon.length > 2 ? "0.65rem" : "1.4rem",
            color: "var(--accent-primary)",
            flexShrink: 0,
          }}
        >
          {skill.icon}
        </div>

        {/* Name */}
        <span
          className="font-medium text-center leading-tight"
          style={{
            color: "var(--text-bright)",
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
          }}
        >
          {skill.name}
        </span>

        {/* Category badge */}
        <span className="pill pill-sm">{skill.category}</span>
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
      className="section-padding relative"
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

      <div className="container-section">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="section-header"
        >
          <p className="section-eyebrow">02 / Skills</p>
          <h2 className="section-title">My Arsenal</h2>
          <p className="section-lede">
            Technologies I use to build secure, performant, and elegant solutions.
          </p>
        </motion.div>

        {/* Skill cards grid — 2 cols mobile, 3 cols tablet, 4-6 cols desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.25rem",
          }}
          className="sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>

      </div>
      {/* Seam to the next section */}
      <div className="section-seam" aria-hidden="true" />
    </section>
  );
}
