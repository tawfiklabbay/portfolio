"use client";

import { useEffect, useRef } from "react";

export default function MouseSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -500, y: -500 });
  const cur = useRef({ x: -500, y: -500 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const animate = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.08;
      cur.current.y += (pos.current.y - cur.current.y) * 0.08;
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(600px circle at ${cur.current.x}px ${cur.current.y}px,
          rgba(0, 217, 255, 0.07),
          transparent 60%
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

  return (
    <div
      ref={spotRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      aria-hidden="true"
    />
  );
}
