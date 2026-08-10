"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Radar, Eye, Brain, BarChart3, Globe, ScrollText, LayoutDashboard } from "lucide-react";

const FEATURES = [
  { icon: Shield,          label: "Threat Deception Environment" },
  { icon: Radar,           label: "Real-time Intrusion Detection" },
  { icon: Eye,             label: "Threat Intelligence Collection" },
  { icon: Brain,           label: "Behavioral Analysis" },
  { icon: BarChart3,       label: "Attack Visualization Dashboard" },
  { icon: Globe,           label: "Web Infrastructure Monitoring" },
  { icon: ScrollText,      label: "Security Analytics" },
  { icon: LayoutDashboard, label: "Interactive Logs" },
];

function DashboardPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const W = canvas.width;
    const H = canvas.height;

    let t = 0;

    // Log lines data
    const logLines = [
      "ALERT   | 192.168.1.44 — Port scan detected",
      "INFO    | Honeypot engaged — attacker trapped",
      "WARN    | Brute force attempt on SSH",
      "ALERT   | C2 callback intercepted",
      "INFO    | Threat fingerprint recorded",
      "WARN    | SQL injection attempt blocked",
      "INFO    | Payload captured for analysis",
      "ALERT   | Lateral movement detected",
    ];
    let logOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "rgba(5,5,5,0.95)";
      ctx.fillRect(0, 0, W, H);

      // Header bar
      ctx.fillStyle = "rgba(14,17,23,0.9)";
      ctx.fillRect(0, 0, W, 36);

      ctx.fillStyle = "#00d9ff";
      ctx.font = "bold 9px JetBrains Mono, monospace";
      ctx.fillText("■ PROJECT ARGUS — THREAT DECEPTION PLATFORM", 10, 22);

      // Status dot
      ctx.fillStyle = Math.sin(t * 3) > 0 ? "#00ff88" : "#00cc66";
      ctx.beginPath();
      ctx.arc(W - 16, 18, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#00ff88";
      ctx.font = "7px JetBrains Mono, monospace";
      ctx.fillText("LIVE", W - 38, 22);

      // Mini waveform / activity chart
      const chartX = 10, chartY = 50, chartW = W - 20, chartH = 55;
      ctx.strokeStyle = "rgba(0,217,255,0.15)";
      ctx.strokeRect(chartX, chartY, chartW, chartH);

      ctx.beginPath();
      ctx.strokeStyle = "#00d9ff";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#00d9ff";

      for (let x = 0; x <= chartW; x++) {
        const wave =
          Math.sin((x / chartW) * Math.PI * 6 + t * 2) * 12 +
          Math.sin((x / chartW) * Math.PI * 14 + t * 3) * 6 +
          Math.sin((x / chartW) * Math.PI * 3 + t) * 18;
        const y = chartY + chartH / 2 - wave;
        if (x === 0) ctx.moveTo(chartX + x, y);
        else ctx.lineTo(chartX + x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1;

      ctx.fillStyle = "rgba(0,217,255,0.5)";
      ctx.font = "7px JetBrains Mono, monospace";
      ctx.fillText("Network Activity", chartX + 4, chartY + 10);

      // Threat meter
      const meterY = 116;
      ctx.fillStyle = "rgba(14,17,23,0.6)";
      ctx.fillRect(10, meterY, W - 20, 20);

      const threatLevel = 0.65 + Math.sin(t * 0.8) * 0.15;
      const gradient = ctx.createLinearGradient(10, 0, W - 20, 0);
      gradient.addColorStop(0, "#00ff88");
      gradient.addColorStop(0.5, "#ffcc00");
      gradient.addColorStop(1, "#ff4444");
      ctx.fillStyle = gradient;
      ctx.fillRect(10, meterY, (W - 20) * threatLevel, 20);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 8px JetBrains Mono, monospace";
      ctx.fillText(`THREAT LEVEL: ${Math.round(threatLevel * 100)}%`, 16, meterY + 13);

      // Log lines
      const logY = 148;
      const lineH = 16;
      const visibleLines = Math.floor((H - logY - 10) / lineH);

      for (let i = 0; i < visibleLines; i++) {
        const lineIdx = (i + Math.floor(logOffset)) % logLines.length;
        const line = logLines[lineIdx];
        const isAlert = line.startsWith("ALERT");
        const isWarn  = line.startsWith("WARN");

        ctx.fillStyle = isAlert
          ? "rgba(255,68,68,0.08)"
          : isWarn
          ? "rgba(255,200,0,0.05)"
          : "transparent";
        ctx.fillRect(10, logY + i * lineH, W - 20, lineH);

        ctx.fillStyle = isAlert ? "#ff6666" : isWarn ? "#ffcc44" : "#a1a1aa";
        ctx.font = "8px JetBrains Mono, monospace";
        ctx.fillText(line, 14, logY + i * lineH + 11);
      }

      // Scroll logs
      logOffset += 0.012;

      t += 0.016;
      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        border: "1px solid rgba(0,217,255,0.2)",
        boxShadow: "0 0 60px rgba(0,217,255,0.08), 0 24px 64px rgba(0,0,0,0.6)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: 280, display: "block" }}
        aria-label="Project Argus live dashboard preview"
      />
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

function SpotlightCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(0,217,255,0.08), transparent 60%)`;

    // Subtle tilt
    const rx = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const ry = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
    card.style.transform = `perspective(1000px) rotateY(${rx}deg) rotateX(${ry}deg)`;
  };

  const onMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative glass-card overflow-hidden"
      style={{
        transition: "transform 0.2s ease",
      }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      {children}
    </div>
  );
}

export default function FeaturedProject() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="project"
      ref={ref}
      className="py-24 md:py-32 lg:py-36 relative overflow-hidden"
      aria-label="Featured Project — Project Argus"
    >
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,217,255,0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "#00d9ff", fontFamily: "var(--font-mono)" }}
          >
            03 / Featured Project
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            The Centrepiece
          </h2>
        </motion.div>

        {/* Trophy banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mb-12"
        >
          <div
            className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,200,0,0.1), rgba(255,150,0,0.05))",
              border: "1px solid rgba(255,200,0,0.25)",
              boxShadow:
                "0 0 40px rgba(255,200,0,0.08), 0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <span className="text-4xl animate-float">🏆</span>
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-0.5"
                style={{ color: "#ffcc44", fontFamily: "var(--font-mono)" }}
              >
                Award Winner
              </p>
              <p className="font-display font-bold text-xl text-white">
                Paradox Hackathon — 1st Place
              </p>
            </div>
            <div
              className="ml-4 h-12 w-px"
              style={{ background: "rgba(255,200,0,0.2)" }}
              aria-hidden="true"
            />
            <div>
              <p
                className="text-xs"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
              >
                Category
              </p>
              <p
                className="text-sm font-semibold"
                style={{ color: "#ffcc44" }}
              >
                Cybersecurity & Threat Intelligence
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main project card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        >
          <SpotlightCard>
            {/* Animated gradient border */}
            <div className="animated-border absolute inset-0 rounded-[20px]" aria-hidden="true" />

            <div className="relative p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left — Info */}
                <div className="space-y-8">
                  {/* Title block */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold"
                        style={{
                          background: "rgba(0,217,255,0.1)",
                          border: "1px solid rgba(0,217,255,0.2)",
                          color: "#00d9ff",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        Cybersecurity Platform
                      </span>
                      <span
                        className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold"
                        style={{
                          background: "rgba(255,200,0,0.08)",
                          border: "1px solid rgba(255,200,0,0.2)",
                          color: "#ffcc44",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        🏆 Winner
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-5xl text-white mb-2">
                      Project{" "}
                      <span className="gradient-text glow-text">Argus</span>
                    </h3>
                    <p
                      className="text-lg"
                      style={{ color: "#00d9ff", fontFamily: "var(--font-body)" }}
                    >
                      Threat Deception Platform
                    </p>
                  </div>

                  <p
                    className="text-base leading-loose mb-6"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                  >
                    An advanced cyber threat deception platform that actively lures
                    malicious actors into controlled environments, detects hostile
                    behavior in real time, gathers actionable threat intelligence,
                    and provides deep forensic insights for defenders.
                  </p>

                  {/* Key features */}
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-4"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      Key Features
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                      {FEATURES.map((feat, i) => (
                        <motion.div
                          key={feat.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + i * 0.07 }}
                          className="flex items-center gap-3"
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              background: "rgba(0,217,255,0.08)",
                              border: "1px solid rgba(0,217,255,0.15)",
                            }}
                          >
                            <feat.icon
                              size={13}
                              style={{ color: "#00d9ff" }}
                              aria-hidden="true"
                            />
                          </div>
                          <span
                            className="text-sm"
                            style={{ color: "#a1a1aa", fontFamily: "var(--font-body)" }}
                          >
                            {feat.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-3"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      Built With
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {["Python", "React", "Node.js", "Docker", "MongoDB", "Kali Linux", "WebSockets"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="pill"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Right — Dashboard preview */}
                <div className="space-y-6">
                  <DashboardPreview />

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Threat Vectors",  value: "12+" },
                      { label: "Detection Rate",  value: "98%" },
                      { label: "Hackathon Place", value: "#1"  },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col items-center p-4 rounded-xl text-center"
                        style={{
                          background: "rgba(0,217,255,0.04)",
                          border: "1px solid rgba(0,217,255,0.1)",
                        }}
                      >
                        <span className="font-display font-bold text-2xl gradient-text">
                          {stat.value}
                        </span>
                        <span
                          className="text-[10px] mt-1"
                          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                        >
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Description tag */}
                  <p
                    className="text-xs leading-relaxed p-4 rounded-xl"
                    style={{
                      background: "rgba(255,200,0,0.04)",
                      border: "1px solid rgba(255,200,0,0.12)",
                      color: "#a1a1aa",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <span style={{ color: "#ffcc44" }}>{"//"} </span>
                    Demonstrates offensive security concepts, deception
                    engineering, intrusion detection, and intelligent attack
                    analysis while maintaining isolated environments for safe
                    observation.
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
      {/* Section divider */}
      <div className="section-divider" aria-hidden="true" />
    </section>
  );
}
