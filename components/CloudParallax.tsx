"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, Sun, Sunset, Moon, Wind, Cloud } from "lucide-react";

/* -------------------------------------------------------
   COLOR SCHEMES FOR INTERACTIVE SKY MODES
------------------------------------------------------- */
export type SkyMode = "day" | "sunset" | "night";

interface CloudProps {
  width?: number;
  opacity?: number;
  tint?: string;
  gradStop?: string;
  shadowColor?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

/* -------------------------------------------------------
   CLOUD SVG SHAPES — High volume, crisp highlights
------------------------------------------------------- */
function CloudTypeA({
  width = 360,
  opacity = 0.9,
  tint = "#FFFFFF",
  gradStop = "#BFDBFE",
  shadowColor = "#93C5FD",
  className = "",
  onClick,
}: CloudProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      <svg
        width={width}
        viewBox="0 0 420 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="select-none pointer-events-none"
        style={{ opacity, display: "block" }}
      >
        <defs>
          <radialGradient id={`ra-${width}-${tint}`} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor={tint} stopOpacity="1" />
            <stop offset="100%" stopColor={gradStop} stopOpacity="0.85" />
          </radialGradient>
          <filter id={`fa-${width}-${tint}`} x="-15%" y="-30%" width="130%" height="170%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor={shadowColor} floodOpacity="0.3" />
          </filter>
        </defs>
        <ellipse cx="210" cy="130" rx="195" ry="34" fill={`url(#ra-${width}-${tint})`} filter={`url(#fa-${width}-${tint})`} />
        <ellipse cx="110" cy="100" rx="95" ry="75" fill={`url(#ra-${width}-${tint})`} />
        <ellipse cx="210" cy="72" rx="115" ry="90" fill={`url(#ra-${width}-${tint})`} />
        <ellipse cx="320" cy="100" rx="88" ry="68" fill={`url(#ra-${width}-${tint})`} />
        <ellipse cx="205" cy="64" rx="75" ry="54" fill="#FFFFFF" opacity="0.45" />
      </svg>
    </div>
  );
}

function CloudTypeB({
  width = 600,
  opacity = 0.85,
  tint = "#FFFFFF",
  gradStop = "#BFDBFE",
  shadowColor = "#93C5FD",
  className = "",
  onClick,
}: CloudProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      <svg
        width={width}
        viewBox="0 0 680 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="select-none pointer-events-none"
        style={{ opacity, display: "block" }}
      >
        <defs>
          <radialGradient id={`rb-${width}-${tint}`} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor={tint} stopOpacity="1" />
            <stop offset="100%" stopColor={gradStop} stopOpacity="0.85" />
          </radialGradient>
          <filter id={`fb-${width}-${tint}`} x="-12%" y="-30%" width="124%" height="170%">
            <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor={shadowColor} floodOpacity="0.25" />
          </filter>
        </defs>
        <ellipse cx="340" cy="175" rx="330" ry="38" fill={`url(#rb-${width}-${tint})`} filter={`url(#fb-${width}-${tint})`} />
        <ellipse cx="120" cy="132" rx="115" ry="88" fill={`url(#rb-${width}-${tint})`} />
        <ellipse cx="250" cy="100" rx="125" ry="102" fill={`url(#rb-${width}-${tint})`} />
        <ellipse cx="420" cy="112" rx="138" ry="92" fill={`url(#rb-${width}-${tint})`} />
        <ellipse cx="570" cy="142" rx="98" ry="72" fill={`url(#rb-${width}-${tint})`} />
        <ellipse cx="310" cy="90" rx="95" ry="60" fill="#FFFFFF" opacity="0.4" />
      </svg>
    </div>
  );
}

function CloudTypeC({
  width = 300,
  opacity = 0.9,
  tint = "#EFF6FF",
  gradStop = "#93C5FD",
  shadowColor = "#60A5FA",
  className = "",
  onClick,
}: CloudProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-90 ${className}`}
    >
      <svg
        width={width}
        viewBox="0 0 340 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="select-none pointer-events-none"
        style={{ opacity, display: "block" }}
      >
        <defs>
          <radialGradient id={`rc-${width}-${tint}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor={tint} stopOpacity="0.9" />
          </radialGradient>
          <filter id={`fc-${width}-${tint}`} x="-15%" y="-35%" width="130%" height="180%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor={shadowColor} floodOpacity="0.32" />
          </filter>
        </defs>
        <ellipse cx="170" cy="118" rx="155" ry="28" fill={`url(#rc-${width}-${tint})`} filter={`url(#fc-${width}-${tint})`} />
        <ellipse cx="85" cy="92" rx="80" ry="66" fill={`url(#rc-${width}-${tint})`} />
        <ellipse cx="180" cy="70" rx="98" ry="80" fill={`url(#rc-${width}-${tint})`} />
        <ellipse cx="270" cy="94" rx="70" ry="60" fill={`url(#rc-${width}-${tint})`} />
        <ellipse cx="178" cy="62" rx="58" ry="42" fill="#FFFFFF" opacity="0.55" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------
   CSS KEYFRAMES
------------------------------------------------------- */
const CLOUD_ANIMATIONS = `
@keyframes cloudDriftA {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33%       { transform: translateY(-22px) translateX(12px); }
  66%       { transform: translateY(-10px) translateX(-8px); }
}
@keyframes cloudDriftB {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  40%       { transform: translateY(-16px) translateX(-14px); }
  70%       { transform: translateY(-26px) translateX(8px); }
}
@keyframes cloudDriftC {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-14px) rotate(1.5deg); }
}
@keyframes popPuff {
  0%   { opacity: 1; transform: scale(0.6) translateY(0); }
  100% { opacity: 0; transform: scale(1.6) translateY(-40px); }
}

.cloud-drift-a { animation: cloudDriftA 10s ease-in-out infinite; }
.cloud-drift-b { animation: cloudDriftB 14s ease-in-out infinite; }
.cloud-drift-c { animation: cloudDriftC 8s ease-in-out infinite; }
.puff-pop { animation: popPuff 0.8s ease-out forwards; }
`;

export default function CloudParallax() {
  const [skyMode, setSkyMode] = useState<SkyMode>("day");
  const [poppedCount, setPoppedCount] = useState(0);
  const [puffs, setPuffs] = useState<{ id: number; x: number; y: number }[]>([]);

  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const scrollY = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const smoothX = useRef(0);
  const smoothY = useRef(0);

  const handleCloudClick = (e: React.MouseEvent) => {
    const newPuff = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
    setPuffs((prev) => [...prev.slice(-8), newPuff]);
    setPoppedCount((c) => c + 1);
  };

  const animate = useCallback(() => {
    smoothX.current += (mouseX.current - smoothX.current) * 0.07;
    smoothY.current += (mouseY.current - smoothY.current) * 0.07;

    const sy = scrollY.current;
    const mx = smoothX.current;
    const my = smoothY.current;

    if (bgRef.current) {
      bgRef.current.style.transform = `translate(${mx * 20}px, ${my * 20 + sy * 0.08}px)`;
    }
    if (midRef.current) {
      midRef.current.style.transform = `translate(${mx * 40 + sy * 0.05}px, ${my * 40 + sy * 0.24}px)`;
    }
    if (fgRef.current) {
      fgRef.current.style.transform = `translate(${mx * 65}px, ${my * 65 + sy * 0.48}px)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const onScroll = () => {
      scrollY.current = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX / window.innerWidth - 0.5;
      mouseY.current = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // Color schemes according to mode
  const theme = {
    day: {
      tintBg: "#F0F9FF",
      tintMid: "#FFFFFF",
      tintFg: "#EFF6FF",
      gradBg: "#BFDBFE",
      gradMid: "#DBEAFE",
      gradFg: "#93C5FD",
      shadowBg: "#93C5FD",
      shadowMid: "#60A5FA",
      shadowFg: "#3B82F6",
    },
    sunset: {
      tintBg: "#FFF7ED",
      tintMid: "#FFE4E6",
      tintFg: "#FEF3C7",
      gradBg: "#FDBA74",
      gradMid: "#FCA5A5",
      gradFg: "#FDE047",
      shadowBg: "#F97316",
      shadowMid: "#F43F5E",
      shadowFg: "#EAB308",
    },
    night: {
      tintBg: "#E0E7FF",
      tintMid: "#C7D2FE",
      tintFg: "#DDD6FE",
      gradBg: "#818CF8",
      gradMid: "#A5B4FC",
      gradFg: "#C084FC",
      shadowBg: "#4F46E5",
      shadowMid: "#6366F1",
      shadowFg: "#9333EA",
    },
  }[skyMode];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CLOUD_ANIMATIONS }} />

      {/* Floating Interactive Sky Control Widget */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 p-2 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xl">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold">
          <Cloud size={14} className="text-blue-600 animate-pulse" />
          <span className="hidden sm:inline">Sky Theme:</span>
        </div>

        <button
          onClick={() => setSkyMode("day")}
          className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
            skyMode === "day"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          title="Daylight Sky"
        >
          <Sun size={15} />
          <span className="hidden md:inline">Day</span>
        </button>

        <button
          onClick={() => setSkyMode("sunset")}
          className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
            skyMode === "sunset"
              ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md scale-105"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          title="Golden Sunset"
        >
          <Sunset size={15} />
          <span className="hidden md:inline">Sunset</span>
        </button>

        <button
          onClick={() => setSkyMode("night")}
          className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
            skyMode === "night"
              ? "bg-indigo-700 text-white shadow-md shadow-indigo-500/30 scale-105"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          title="Starry Night"
        >
          <Moon size={15} />
          <span className="hidden md:inline">Night</span>
        </button>

        {poppedCount > 0 && (
          <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 border border-amber-200 text-amber-800 rounded-xl text-[10px] font-extrabold ml-1 animate-bounce">
            <Sparkles size={11} />
            <span>{poppedCount} Puffs!</span>
          </div>
        )}
      </div>

      {/* Click Puffs FX Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        {puffs.map((p) => (
          <div
            key={p.id}
            style={{ left: p.x - 40, top: p.y - 40 }}
            className="absolute w-20 h-20 pointer-events-none puff-pop flex items-center justify-center"
          >
            <div className="w-16 h-12 bg-white/90 rounded-full shadow-lg border border-blue-200 blur-[1px]" />
          </div>
        ))}
      </div>

      {/* ================================================
          LAYER 1 — FAR BACKGROUND (slow, vast, high coverage)
          ================================================ */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="cloud-layer"
        style={{ willChange: "transform" }}
      >
        {/* Top-Right Big Cloud */}
        <div className="absolute top-[0%] right-[-8%]">
          <div className="cloud-drift-b">
            <CloudTypeB
              width={780}
              opacity={0.65}
              tint={theme.tintBg}
              gradStop={theme.gradBg}
              shadowColor={theme.shadowBg}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        {/* Top-Left Big Cloud */}
        <div className="absolute top-[12%] left-[-8%]">
          <div className="cloud-drift-a">
            <CloudTypeB
              width={680}
              opacity={0.58}
              tint={theme.tintBg}
              gradStop={theme.gradBg}
              shadowColor={theme.shadowBg}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        {/* Mid-Scroll Left Cloud */}
        <div className="absolute top-[32%] left-[-10%]">
          <div className="cloud-drift-c">
            <CloudTypeB
              width={740}
              opacity={0.55}
              tint={theme.tintBg}
              gradStop={theme.gradBg}
              shadowColor={theme.shadowBg}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        {/* Mid-Scroll Right Cloud */}
        <div className="absolute top-[48%] right-[-9%]">
          <div className="cloud-drift-a">
            <CloudTypeB
              width={700}
              opacity={0.52}
              tint={theme.tintBg}
              gradStop={theme.gradBg}
              shadowColor={theme.shadowBg}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        {/* Lower-Scroll Left Cloud */}
        <div className="absolute top-[68%] left-[-7%]">
          <div className="cloud-drift-b">
            <CloudTypeB
              width={660}
              opacity={0.50}
              tint={theme.tintBg}
              gradStop={theme.gradBg}
              shadowColor={theme.shadowBg}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        {/* Bottom Right Cloud */}
        <div className="absolute top-[86%] right-[-8%]">
          <div className="cloud-drift-c">
            <CloudTypeB
              width={720}
              opacity={0.48}
              tint={theme.tintBg}
              gradStop={theme.gradBg}
              shadowColor={theme.shadowBg}
              onClick={handleCloudClick}
            />
          </div>
        </div>
      </div>

      {/* ================================================
          LAYER 2 — MIDGROUND (medium speed, dense placement)
          ================================================ */}
      <div
        ref={midRef}
        aria-hidden="true"
        className="cloud-layer"
        style={{ willChange: "transform" }}
      >
        {/* Near Hero / About boundary */}
        <div className="absolute top-[6%] left-[-2%]">
          <div className="cloud-drift-a" style={{ animationDelay: "1s" }}>
            <CloudTypeA
              width={500}
              opacity={0.85}
              tint={theme.tintMid}
              gradStop={theme.gradMid}
              shadowColor={theme.shadowMid}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        <div className="absolute top-[18%] right-[-2%]">
          <div className="cloud-drift-c" style={{ animationDelay: "2.5s" }}>
            <CloudTypeA
              width={460}
              opacity={0.80}
              tint={theme.tintMid}
              gradStop={theme.gradMid}
              shadowColor={theme.shadowMid}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        <div className="absolute top-[28%] left-[2%]">
          <div className="cloud-drift-b" style={{ animationDelay: "0.5s" }}>
            <CloudTypeA
              width={480}
              opacity={0.78}
              tint={theme.tintMid}
              gradStop={theme.gradMid}
              shadowColor={theme.shadowMid}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        <div className="absolute top-[42%] right-[1%]">
          <div className="cloud-drift-a" style={{ animationDelay: "3s" }}>
            <CloudTypeA
              width={520}
              opacity={0.75}
              tint={theme.tintMid}
              gradStop={theme.gradMid}
              shadowColor={theme.shadowMid}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        <div className="absolute top-[58%] left-[-1%]">
          <div className="cloud-drift-c" style={{ animationDelay: "1.8s" }}>
            <CloudTypeA
              width={450}
              opacity={0.72}
              tint={theme.tintMid}
              gradStop={theme.gradMid}
              shadowColor={theme.shadowMid}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        <div className="absolute top-[72%] right-[0%]">
          <div className="cloud-drift-b" style={{ animationDelay: "4s" }}>
            <CloudTypeA
              width={470}
              opacity={0.70}
              tint={theme.tintMid}
              gradStop={theme.gradMid}
              shadowColor={theme.shadowMid}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        <div className="absolute top-[88%] left-[1%]">
          <div className="cloud-drift-a" style={{ animationDelay: "2s" }}>
            <CloudTypeA
              width={440}
              opacity={0.68}
              tint={theme.tintMid}
              gradStop={theme.gradMid}
              shadowColor={theme.shadowMid}
              onClick={handleCloudClick}
            />
          </div>
        </div>
      </div>

      {/* ================================================
          LAYER 3 — FOREGROUND ACCENTS (fastest, high crispness)
          ================================================ */}
      <div
        ref={fgRef}
        aria-hidden="true"
        className="cloud-layer"
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-[2%] left-[-3%]">
          <div className="cloud-drift-c" style={{ animationDelay: "0.8s" }}>
            <CloudTypeC
              width={380}
              opacity={0.95}
              tint={theme.tintFg}
              gradStop={theme.gradFg}
              shadowColor={theme.shadowFg}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        <div className="absolute top-[14%] right-[-2%]">
          <div className="cloud-drift-a" style={{ animationDelay: "2.2s" }}>
            <CloudTypeC
              width={340}
              opacity={0.90}
              tint={theme.tintFg}
              gradStop={theme.gradFg}
              shadowColor={theme.shadowFg}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        <div className="absolute top-[36%] left-[-3%]">
          <div className="cloud-drift-b" style={{ animationDelay: "3.1s" }}>
            <CloudTypeC
              width={360}
              opacity={0.88}
              tint={theme.tintFg}
              gradStop={theme.gradFg}
              shadowColor={theme.shadowFg}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        <div className="absolute top-[52%] right-[-3%]">
          <div className="cloud-drift-c" style={{ animationDelay: "1.4s" }}>
            <CloudTypeC
              width={350}
              opacity={0.85}
              tint={theme.tintFg}
              gradStop={theme.gradFg}
              shadowColor={theme.shadowFg}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        <div className="absolute top-[66%] left-[-2%]">
          <div className="cloud-drift-a" style={{ animationDelay: "0.4s" }}>
            <CloudTypeC
              width={330}
              opacity={0.82}
              tint={theme.tintFg}
              gradStop={theme.gradFg}
              shadowColor={theme.shadowFg}
              onClick={handleCloudClick}
            />
          </div>
        </div>

        <div className="absolute top-[82%] right-[-2%]">
          <div className="cloud-drift-b" style={{ animationDelay: "4.2s" }}>
            <CloudTypeC
              width={370}
              opacity={0.80}
              tint={theme.tintFg}
              gradStop={theme.gradFg}
              shadowColor={theme.shadowFg}
              onClick={handleCloudClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------
   EXPORTED INLINE CLOUD — used inside Hero section.
------------------------------------------------------- */
export function HeroCloud({
  className = "",
  opacity = 0.75,
  width = 560,
  tint = "#FFFFFF",
}: {
  className?: string;
  opacity?: number;
  width?: number;
  tint?: string;
}) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <CloudTypeB width={width} opacity={opacity} tint={tint} />
    </div>
  );
}
