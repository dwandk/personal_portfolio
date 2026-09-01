"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, ArrowUp } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-200 dark:bg-[#0A0B0D] text-black dark:text-white border-t border-black/10 dark:border-white/10 pt-14 pb-8 font-sans transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start pb-10 border-b border-black/10 dark:border-white/10">
          {/* Brand */}
          <div>
            <a href="#hero" className="inline-flex items-center gap-2.5 mb-3 group">
              <div className="flex items-center justify-center text-black dark:text-white group-hover:scale-105 transition-transform duration-200">
                <Logo className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <span className="font-sans font-black text-xl tracking-wider text-black dark:text-white">
                ANDIKA<span className="text-slate-500 dark:text-slate-400 font-bold text-sm">.DEV</span>
              </span>
            </a>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed max-w-[260px]">
              Information Systems Student &amp; Digital Creator crafting clean, functional, and impactful digital experiences.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:pt-2">
            {[
              { name: "Work", href: "#projects" },
              { name: "Skills", href: "#skills" },
              { name: "About", href: "#about" },
              { name: "Gallery", href: "#gallery" },
              { name: "Awards", href: "#certifications" },
              { name: "Contact", href: "#contact" },
            ].map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {name}
              </a>
            ))}
          </div>

          {/* Social + back to top */}
          <div className="flex justify-end items-center gap-2.5">
            {[
              { label: "GitHub", href: "https://github.com/dwandk", Icon: Github },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/andika-dwi-prasetya-4b70482b4", Icon: Linkedin },
              { label: "Instagram", href: "https://instagram.com/andikaprsty__", Icon: Instagram },
            ].map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-9 h-9 rounded-full bg-white dark:bg-[#18191E] border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-all shadow-xs"
                title={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-9 h-9 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shadow-md hover:opacity-80 transition-opacity ml-1"
              title="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Andika Dwi Prasetya. All rights reserved.</p>
          <p>UPN "Veteran" Yogyakarta</p>
        </div>
      </div>
    </footer>
  );
}