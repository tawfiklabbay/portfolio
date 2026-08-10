"use client";

import { useEffect, useRef } from "react";

export default function FerrofluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, vx: 0, vy: 0 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      antialias: true,
      alpha: true,
      premultipliedAlpha: true,
    }) as WebGL2RenderingContext | null;

    if (!gl) {
      // Fallback: CSS gradient animation
      return;
    }

    // ── Vertex Shader ──────────────────────────────────────────────────────────
    const vsSource = `#version 300 es
      in vec4 aPosition;
      void main() {
        gl_Position = aPosition;
      }
    `;

    // ── Fragment Shader ────────────────────────────────────────────────────────
    const fsSource = `#version 300 es
      precision highp float;

      uniform vec2  uResolution;
      uniform float uTime;
      uniform vec2  uMouse;
      uniform vec2  uMouseVel;

      out vec4 fragColor;

      // ─── Hash / noise ───────────────────────────────────────────────────────
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 345.45));
        p += dot(p, p + 34.345);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i),             hash(i + vec2(1,0)), u.x),
          mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0, amp = 0.5;
        for (int i = 0; i < 6; i++) {
          v   += amp * noise(p);
          p   *= 2.1;
          amp *= 0.5;
        }
        return v;
      }

      // ─── Metaball SDF ────────────────────────────────────────────────────────
      float metaball(vec2 uv, vec2 center, float radius, float strength) {
        float d = length(uv - center);
        return strength / (d * d + 0.001);
      }

      // ─── Main ────────────────────────────────────────────────────────────────
      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        vec2 asp = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 p = uv * asp;

        float t = uTime * 0.25;

        // Mouse in aspect-correct space
        vec2 mouse = uMouse * asp;

        // --- Organically moving blobs ---
        float field = 0.0;

        // Central large blob – mouse attracted
        vec2 c0 = vec2(0.5, 0.5) * asp;
        c0 += vec2(
          0.12 * sin(t * 0.7 + 1.0),
          0.10 * cos(t * 0.5 + 2.0)
        );
        c0 = mix(c0, mouse, 0.18); // slight mouse pull
        field += metaball(p, c0, 0.15, 0.28);

        vec2 c1 = vec2(0.3 + 0.2 * sin(t * 0.6), 0.4 + 0.15 * cos(t * 0.8)) * asp;
        field += metaball(p, c1, 0.10, 0.18);

        vec2 c2 = vec2(0.7 + 0.15 * cos(t * 0.9), 0.55 + 0.18 * sin(t * 0.7)) * asp;
        field += metaball(p, c2, 0.09, 0.16);

        vec2 c3 = vec2(0.5 + 0.25 * sin(t * 1.1 + 3.0), 0.7 + 0.1 * cos(t * 0.6)) * asp;
        field += metaball(p, c3, 0.08, 0.14);

        vec2 c4 = vec2(0.2 + 0.1 * cos(t * 0.8 + 1.0), 0.6 + 0.2 * sin(t * 0.5)) * asp;
        field += metaball(p, c4, 0.07, 0.12);

        // Mouse repulsion blob
        field += metaball(p, mouse, 0.06, 0.22);

        // --- Organic noise deformation on the boundary ---
        float noiseVal = fbm(p * 2.5 + t * 0.3) * 0.6
                       + fbm(p * 4.0 - t * 0.2) * 0.3;

        float threshold = 0.55 + noiseVal * 0.18;
        float ferro = smoothstep(threshold - 0.04, threshold + 0.04, field);

        // --- Surface normal estimation for lighting ---
        float eps = 0.008;
        float dx = metaball(p + vec2(eps,0), c0, 0.15, 0.28)
                 + metaball(p + vec2(eps,0), c1, 0.10, 0.18)
                 + metaball(p + vec2(eps,0), c2, 0.09, 0.16)
                 + metaball(p + vec2(eps,0), mouse, 0.06, 0.22)
                 - field;
        float dy = metaball(p + vec2(0,eps), c0, 0.15, 0.28)
                 + metaball(p + vec2(0,eps), c1, 0.10, 0.18)
                 + metaball(p + vec2(0,eps), c2, 0.09, 0.16)
                 + metaball(p + vec2(0,eps), mouse, 0.06, 0.22)
                 - field;
        vec3 normal = normalize(vec3(dx, dy, 0.3));

        // --- Lighting (premium white specular highlights) ---
        vec3 lightDir = normalize(vec3(mouse - p, 0.6));
        float diffuse = max(dot(normal, lightDir), 0.0);
        float specular = pow(max(dot(reflect(-lightDir, normal), vec3(0,0,1)), 0.0), 64.0);

        // --- Base dark ferro color ---
        vec3 ferroColor = vec3(0.02, 0.05, 0.1);

        // Vibrant cyan tint on edges
        float edge = 1.0 - smoothstep(threshold - 0.12, threshold + 0.01, field);
        ferroColor = mix(ferroColor, vec3(0.0, 0.85, 1.0), edge * 0.8);

        ferroColor += diffuse * 0.12 * vec3(0.9, 0.95, 1.0);
        ferroColor += specular * 1.2 * vec3(1.0, 1.0, 1.0);

        // Glow bloom around the blob
        float glow = smoothstep(threshold + 0.05, threshold - 0.25, field);
        glow = glow * glow;
        vec3 glowColor = vec3(0.0, 0.85, 1.0) * glow * 0.55;

        vec4 finalColor = vec4(ferroColor + glowColor, ferro * 0.88);

        // Outside: pure transparent with faint glow haze
        finalColor = mix(
          vec4(vec3(0.0, 0.85, 1.0) * glow * 0.35, glow * 0.25),
          finalColor,
          ferro
        );

        fragColor = finalColor;
      }
    `;

    // ── Compile shaders ───────────────────────────────────────────────────────
    const compileShader = (src: string, type: number) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(s));
      }
      return s;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
    }

    // ── Geometry (fullscreen quad) ────────────────────────────────────────────
    const posLoc = gl.getAttribLocation(program, "aPosition");
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    // ── Uniforms ──────────────────────────────────────────────────────────────
    const uRes  = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMou  = gl.getUniformLocation(program, "uMouse");
    const uMVel = gl.getUniformLocation(program, "uMouseVel");

    // ── Resize ────────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * Math.min(window.devicePixelRatio, 2);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Mouse ─────────────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
      };
    };

    window.addEventListener("mousemove", onMouseMove);

    // ── Blend mode ───────────────────────────────────────────────────────────
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    // ── Render loop ───────────────────────────────────────────────────────────
    const start = performance.now();

    const render = () => {
      // Smooth mouse
      const tm = targetMouseRef.current;
      const m  = mouseRef.current;
      m.vx = (tm.x - m.x) * 0.06;
      m.vy = (tm.y - m.y) * 0.06;
      m.x += m.vx;
      m.y += m.vy;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const t = (performance.now() - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMou, m.x, m.y);
      gl.uniform2f(uMVel, m.vx, m.vy);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(vbo);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9, mixBlendMode: "normal", pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
