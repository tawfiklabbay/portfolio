"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  // Mirrored in a ref so the animation loop can read it without re-subscribing.
  const clicking = useRef(false);

  useEffect(() => {
    // Only show cursor on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const onMouseDown = () => { clicking.current = true; };
    const onMouseUp   = () => { clicking.current = false; };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-cursor-hover]") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${mousePos.current.x - 6}px, ${mousePos.current.y - 6}px)` +
          ` scale(${clicking.current ? 0.7 : 1})`;
      }

      // Smooth trail following
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.12;

      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x - 20}px, ${trailPos.current.y - 20}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "var(--accent-primary)",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease, width 0.15s ease, height 0.15s ease",
          boxShadow: "0 0 10px rgba(0, 217, 255, 0.8), 0 0 30px var(--accent-40)",
          mixBlendMode: "screen",
          ...(isHovering && {
            width: 8,
            height: 8,
            background: "#ffffff",
          }),
        }}
        aria-hidden="true"
      />
      {/* Trailing glow ring */}
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? 50 : 40,
          height: isHovering ? 50 : 40,
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "rgba(0, 217, 255, 0.8)" : "var(--border-glow)"}`,
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease, width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
          boxShadow: isHovering
            ? "0 0 15px var(--border-glow), inset 0 0 15px var(--accent-06)"
            : "none",
        }}
        aria-hidden="true"
      />
    </>
  );
}
