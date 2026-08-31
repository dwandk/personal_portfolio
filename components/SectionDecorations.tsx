"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SectionBackdropProps {
  label: string;
}

export function SectionBackdrop({ label }: SectionBackdropProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-start overflow-hidden pointer-events-none select-none z-0">
      <span
        className="font-black uppercase tracking-tighter whitespace-nowrap text-[12vw] sm:text-[10vw] leading-none
        text-black/[0.04] dark:text-white/[0.04] transition-colors duration-500"
        style={{ userSelect: "none" }}
      >
        {label}
      </span>
    </div>
  );
}

// Floating code particles that drift around
interface CodeParticle {
  id: number;
  text: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}

const CODE_SNIPPETS = [
  "</>", "{}",  "[]", "=>", "&&", "||", "==", "!==", "??", "::",
  "git", "npm", "tsx", "api", "css", "db", "sql", "fn()", ">>", "01",
  "10", "var", "let", "const", "=>", "async", "await", "null", "[]", "{}",
];

export function FloatingCodeParticles({ count = 12 }: { count?: number }) {
  const [particles, setParticles] = useState<CodeParticle[]>([]);

  useEffect(() => {
    const generated: CodeParticle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      text: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 8 + Math.random() * 14,
      delay: Math.random() * 6,
      size: 9 + Math.random() * 4,
      opacity: 0.06 + Math.random() * 0.1,
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-mono font-bold text-black dark:text-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -18, 0, 12, 0],
            x: [0, 8, -6, 4, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity, p.opacity * 0.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.text}
        </motion.span>
      ))}
    </div>
  );
}

// Cursor magnetic spot — a glowing dot that follows the cursor inside a section
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        style={{
          left: springX,
          top: springY,
          background: "radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)",
        }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.3 }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.3 } }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none blur-2xl dark:[background:radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)]"
      />
    </div>
  );
}

// Grid dot pattern overlay
export function DotGridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 opacity-[0.025] dark:opacity-[0.04]"
      style={{
        backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    />
  );
}

// Terminal-style section label
export function TerminalLabel({ path }: { path: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mb-1 tracking-wide"
    >
      <span className="text-green-500 dark:text-green-400 font-bold">▶</span>
      <span>{path}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.9 }}
        className="w-1.5 h-3 bg-current inline-block ml-0.5 align-middle"
      />
    </motion.div>
  );
}
