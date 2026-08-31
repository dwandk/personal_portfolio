"use client";

import { motion } from "framer-motion";
import { MapPin, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] bg-[#F8F9FA] dark:bg-[#0E0F12] text-[#121316] dark:text-white transition-colors duration-500 overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 pb-8 sm:pb-12 px-6"
    >
      {/* Background 2-Row Animated Name Marquee */}
      <div className="absolute top-14 sm:top-16 left-0 right-0 overflow-hidden select-none pointer-events-none z-0 space-y-0.5 opacity-90">
        
        {/* ROW 1: ANDIKA DWI PRASETYA (Moving Left) */}
        <motion.div
          animate={{ x: [0, -1450] }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap gap-10"
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 font-sans font-black text-[7.5vw] sm:text-[8vw] leading-none tracking-tighter uppercase"
            >
              <span className="text-outline">ANDIKA DWI</span>
              <span className="text-black dark:text-white">PRASETYA</span>
            </div>
          ))}
        </motion.div>

        {/* ROW 2: ANDIKA DWI PRASETYA (Moving Right) */}
        <motion.div
          animate={{ x: [-1450, 0] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap gap-10"
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 font-sans font-black text-[7.5vw] sm:text-[8vw] leading-none tracking-tighter uppercase"
            >
              <span className="text-black dark:text-white">ANDIKA DWI</span>
              <span className="text-outline">PRASETYA</span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Main 3-Column Sejajar Layout (Left & Right elements raised higher) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-20 sm:pt-24 pb-4 sm:pb-8">
        
        {/* LEFT COLUMN: Role, Bio & Location Pill (Raised Up with pb-12 sm:pb-16) */}
        <div className="md:col-span-4 lg:col-span-4 space-y-4 pb-12 sm:pb-16 lg:pb-20 z-20">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black dark:text-white leading-tight">
              Information Systems Student &amp; Web Developer
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed max-w-md">
              I build reliable web applications, intuitive UI/UX designs, and data-driven systems—then keep expanding my technical capabilities across networks and analytics.
            </p>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold text-xs shadow-md">
            <MapPin size={14} />
            <span>Yogyakarta, Indonesia</span>
          </div>
        </div>

        {/* CENTER COLUMN: Enlarged Portrait Cutout Photo */}
        <div className="md:col-span-4 lg:col-span-5 flex items-end justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl flex justify-center scale-100 sm:scale-115 md:scale-125 origin-bottom"
          >
            <img
              src="/assets/projects/Andika.png"
              alt="Andika Dwi Prasetya"
              className="w-full max-h-[65vh] sm:max-h-[75vh] object-contain drop-shadow-2xl"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Social Link Buttons Stack (Raised Up with pb-12 sm:pb-16) */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col items-start md:items-end justify-end gap-3 pb-12 sm:pb-16 lg:pb-20 z-20">
          <a
            href="https://github.com/dwandk"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white text-xs font-bold flex items-center justify-center gap-2.5 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all bg-white/50 dark:bg-black/40 backdrop-blur-xs shadow-xs"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/andika-dwi-prasetya-4b70482b4"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white text-xs font-bold flex items-center justify-center gap-2.5 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all bg-white/50 dark:bg-black/40 backdrop-blur-xs shadow-xs"
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:andikaprsty24@gmail.com"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white text-xs font-bold flex items-center justify-center gap-2.5 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all bg-white/50 dark:bg-black/40 backdrop-blur-xs shadow-xs"
          >
            <Mail size={14} />
            <span>Email</span>
          </a>
        </div>

      </div>
    </section>
  );
}
