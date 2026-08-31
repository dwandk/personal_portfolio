"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const TAPE_1_ROLES = [
  "SOFTWARE ENGINEER",
  "UI/UX DESIGNER",
  "SYSTEM ANALYST",
  "FULLSTACK WEB DEVELOPER",
  "DATA ANALYST",
  "DATABASE ARCHITECT",
  "QUALITY ASSURANCE",
  "SOLUTIONS ARCHITECT",
];

const TAPE_2_TECHS = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "LARAVEL",
  "FIGMA",
  "TAILWIND CSS",
  "PYTHON",
  "MYSQL",
  "POWER BI",
  "NODE.JS",
  "GIT & GITHUB",
  "REST API",
];

export default function MarqueeRibbons() {
  const [isHoveredTape1, setIsHoveredTape1] = useState(false);
  const [isHoveredTape2, setIsHoveredTape2] = useState(false);

  return (
    <section className="relative py-2 sm:py-4 overflow-hidden bg-[#F3F3F5] dark:bg-[#0E0F12] transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative py-1 flex flex-col justify-center gap-1 sm:gap-2 select-none"
      >
        
        {/* TAPE 1: (-2 deg angle, moves left - smooth calm speed) */}
        <div
          className="w-[130%] -ml-[15%] -rotate-2 z-10 shadow-md shadow-black/5 dark:shadow-black/40 transition-transform duration-300 hover:scale-[1.005]"
          onMouseEnter={() => setIsHoveredTape1(true)}
          onMouseLeave={() => setIsHoveredTape1(false)}
        >
          <div className="bg-white text-black dark:bg-[#121316] dark:text-white py-1.5 sm:py-2 flex overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: isHoveredTape1 ? 90 : 50,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex whitespace-nowrap gap-6 sm:gap-10 items-center"
            >
              {[...TAPE_1_ROLES, ...TAPE_1_ROLES, ...TAPE_1_ROLES].map((role, idx) => (
                <div
                  key={`tape1-${idx}`}
                  className="flex items-center gap-6 sm:gap-10 group cursor-pointer"
                >
                  <span className="font-mono font-bold text-xs sm:text-sm tracking-widest uppercase">
                    {role}
                  </span>
                  <span className="text-black/40 dark:text-white/40 font-bold text-xs">
                    •
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* TAPE 2: (+2 deg angle, moves right, crossing Tape 1 - smooth calm speed) */}
        <div
          className="w-[130%] -ml-[15%] rotate-2 -mt-4 sm:-mt-5 z-20 shadow-lg shadow-black/10 dark:shadow-black/60 transition-transform duration-300 hover:scale-[1.005]"
          onMouseEnter={() => setIsHoveredTape2(true)}
          onMouseLeave={() => setIsHoveredTape2(false)}
        >
          <div className="bg-slate-50 text-black dark:bg-[#18191E] dark:text-white py-1.5 sm:py-2 flex overflow-hidden">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                duration: isHoveredTape2 ? 85 : 45,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex whitespace-nowrap gap-6 sm:gap-10 items-center"
            >
              {[...TAPE_2_TECHS, ...TAPE_2_TECHS, ...TAPE_2_TECHS].map((tech, idx) => (
                <div
                  key={`tape2-${idx}`}
                  className="flex items-center gap-6 sm:gap-10 group cursor-pointer"
                >
                  <span className="font-mono font-bold text-[11px] sm:text-xs tracking-widest uppercase">
                    {tech}
                  </span>
                  <span className="text-black/40 dark:text-white/40 font-bold text-xs">
                    •
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
