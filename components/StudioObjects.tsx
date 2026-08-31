"use client";

import React from "react";

// Architectural Studio Window Grid background element
export function StudioWindow({ className = "" }: { className?: string }) {
  return (
    <div className={`relative rounded-3xl border border-slate-300/80 bg-gradient-to-b from-sky-100/40 via-white/20 to-amber-50/20 backdrop-blur-xs p-3 shadow-inner ${className}`}>
      <div className="w-full h-full border border-dashed border-slate-300/60 rounded-2xl grid grid-cols-3 grid-rows-3 gap-2 p-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="border border-slate-200/50 rounded-lg bg-white/30 backdrop-blur-xs" />
        ))}
      </div>
      {/* Light ray beam effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/10 via-transparent to-blue-200/10 pointer-events-none rounded-3xl" />
    </div>
  );
}

// Framed Studio Wall Art Poster
export function StudioPoster({
  title,
  subtitle,
  className = "",
  badge = "STUDIO ART",
}: {
  title: string;
  subtitle: string;
  className?: string;
  badge?: string;
}) {
  return (
    <div className={`relative bg-white p-4 rounded-2xl border-4 border-slate-900 shadow-xl overflow-hidden ${className}`}>
      {/* Frame hanging string / clip indicator */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-slate-400 bg-slate-100 z-10 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
      </div>
      <div className="bg-[#f8fafc] border border-slate-200 p-5 rounded-xl flex flex-col justify-between h-full relative overflow-hidden">
        <div className="flex justify-between items-start">
          <span className="px-2.5 py-0.5 rounded bg-blue-600 text-white font-mono text-[9px] font-black uppercase tracking-widest">
            {badge}
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-400">№ 04/26</span>
        </div>
        <div className="my-6">
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tighter leading-none mb-1">
            {title}
          </p>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{subtitle}</p>
        </div>
        <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[9px] font-mono text-slate-400 font-bold uppercase">
          <span>UPN "VETERAN" YOGYAKARTA</span>
          <span>SYSTEMS ARCH & DESIGN</span>
        </div>
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      </div>
    </div>
  );
}

// Tactile Paper Sticky Note with Push Pin
export function StickyNote({
  color = "yellow",
  rotate = "-3deg",
  children,
  className = "",
}: {
  color?: "yellow" | "blue" | "pink" | "sage";
  rotate?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const colorMap = {
    yellow: "bg-amber-100/95 text-amber-950 border-amber-200/90 shadow-amber-900/10",
    blue: "bg-sky-100/95 text-sky-950 border-sky-200/90 shadow-sky-900/10",
    pink: "bg-rose-100/95 text-rose-950 border-rose-200/90 shadow-rose-900/10",
    sage: "bg-emerald-100/95 text-emerald-950 border-emerald-200/90 shadow-emerald-900/10",
  };

  return (
    <div
      style={{ transform: `rotate(${rotate})` }}
      className={`relative p-5 rounded-tr-3xl rounded-bl-2xl rounded-tl-lg rounded-br-lg border shadow-lg backdrop-blur-xs transition-transform duration-300 hover:rotate-0 hover:scale-105 ${colorMap[color]} ${className}`}
    >
      {/* Push Pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 shadow-md border border-white flex items-center justify-center z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-rose-200 opacity-80" />
      </div>
      {/* Turned Corner Shadow */}
      <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-black/10 via-black/5 to-transparent rounded-bl-xl pointer-events-none" />
      {children}
    </div>
  );
}

// Sketched UI Wireframe Card Sheet
export function WireframeSheet({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white border border-slate-300 rounded-2xl p-4 shadow-md rotate-1 hover:rotate-0 transition-transform ${className}`}>
      {/* Tape Strip */}
      <div className="absolute -top-3 left-1/3 w-12 h-5 bg-amber-200/60 border border-amber-300/60 rotate-[-6deg] rounded-xs shadow-xs" />
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">UI Wireframe v2.4</span>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-200 rounded-md w-3/4" />
        <div className="h-2 bg-slate-100 rounded-md w-full" />
        <div className="h-2 bg-slate-100 rounded-md w-5/6" />
        <div className="grid grid-cols-3 gap-1.5 pt-2">
          <div className="h-10 bg-blue-50 border border-blue-200/80 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-blue-400 border-dashed" />
          </div>
          <div className="h-10 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center">
            <div className="w-4 h-2 bg-slate-200 rounded" />
          </div>
          <div className="h-10 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center">
            <div className="w-4 h-2 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Studio Coffee Mug with Steam
export function CoffeeMug({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Steam lines */}
      <div className="flex gap-1.5 mb-1 opacity-70 animate-pulse">
        <div className="w-1 h-3 bg-slate-300 rounded-full blur-[0.5px]" />
        <div className="w-1 h-4 bg-slate-300 rounded-full blur-[0.5px]" />
        <div className="w-1 h-2.5 bg-slate-300 rounded-full blur-[0.5px]" />
      </div>
      {/* Mug Body */}
      <div className="relative w-12 h-14 bg-white border-2 border-slate-300 rounded-b-2xl rounded-t-md shadow-md flex items-center justify-center">
        {/* Mug Handle */}
        <div className="absolute -right-3.5 top-2 w-4 h-8 border-2 border-slate-300 rounded-r-xl bg-slate-50/50" />
        {/* Inside Coffee Surface */}
        <div className="w-9 h-2.5 bg-amber-900 rounded-full absolute top-1 border border-amber-950/40" />
        {/* Studio Badge */}
        <span className="text-[8px] font-extrabold text-blue-600 uppercase tracking-widest z-10">DEV</span>
      </div>
    </div>
  );
}

// Potted Studio Plant
export function StudioPlant({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Plant Leaves */}
      <div className="relative w-14 h-14 mb-[-6px] flex items-center justify-center z-10">
        <div className="absolute w-6 h-10 bg-emerald-600 rounded-tl-full rounded-br-full rotate-[-25deg] shadow-xs" />
        <div className="absolute w-7 h-11 bg-emerald-500 rounded-tr-full rounded-bl-full rotate-[30deg] shadow-xs" />
        <div className="absolute w-5 h-9 bg-emerald-400 rounded-t-full rotate-[5deg]" />
      </div>
      {/* Ceramic Pot */}
      <div className="w-10 h-10 bg-amber-50 border-2 border-amber-200/90 rounded-b-xl rounded-t-sm shadow-md flex items-center justify-center">
        <div className="w-8 h-1 bg-amber-200 rounded-full" />
      </div>
    </div>
  );
}

// Color Palette Swatch Card
export function ColorSwatchCard({ className = "" }: { className?: string }) {
  const colors = ["#2563EB", "#38BDF8", "#0F172A", "#F8FAFC", "#F43F5E"];
  return (
    <div className={`bg-white border border-slate-200 p-3 rounded-2xl shadow-md rotate-[-4deg] ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">PALETTE</span>
        <span className="text-[9px] font-mono text-slate-700 font-extrabold">STUDIO BLUE</span>
      </div>
      <div className="flex gap-1.5">
        {colors.map((c) => (
          <div key={c} className="w-6 h-8 rounded-lg shadow-xs flex flex-col justify-end p-0.5" style={{ backgroundColor: c }}>
            <span className="text-[6px] font-mono text-white/90 font-bold leading-none uppercase overflow-hidden">
              {c.slice(1, 4)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
