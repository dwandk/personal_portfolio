"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CERTIFICATIONS", href: "#certifications" },
  { label: "ACTIVITIES", href: "#gallery" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Thicker Floating Nav Capsule with Enhanced Tactile Effects */}
          <div className="w-full flex items-center justify-between bg-white/90 dark:bg-[#121318]/92 backdrop-blur-xl sm:backdrop-blur-2xl text-black dark:text-white border-2 border-black/25 dark:border-white/30 rounded-full px-4 sm:px-7 py-3 sm:py-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.16),0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(255,255,255,0.09)] ring-1 ring-black/10 dark:ring-white/15 transition-all duration-300">
            
            {/* Brand Logo & Text: AD Monogram + ANDIKA (Extra Bold) */}
            <a href="#hero" className="flex items-center gap-2.5 group py-0.5">
              <div className="flex items-center justify-center text-black dark:text-white group-hover:scale-105 transition-transform duration-200">
                <Logo className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <span className="font-sans font-black tracking-widest text-sm sm:text-base uppercase text-black dark:text-white group-hover:opacity-85 transition-opacity leading-none">
                ANDIKA
              </span>
            </a>

            {/* Desktop Nav Links (Extra Bold) */}
            <nav className="hidden md:flex items-center gap-1 sm:gap-1.5">
              {NAV_LINKS.map(({ label, href }) => {
                const sectionId = href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={label}
                    href={href}
                    className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-all duration-200 ${
                      isActive
                        ? "text-black dark:text-white font-black"
                        : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-black/10 dark:bg-white/15 rounded-full border border-black/15 dark:border-white/20 shadow-xs"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right Action Items */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full border-2 border-black/20 dark:border-white/25 flex items-center justify-center text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all cursor-pointer bg-black/5 dark:bg-white/5 active:scale-95"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={15} className="stroke-[2.5]" /> : <Sun size={15} className="stroke-[2.5]" />}
              </button>

              <a
                href="#contact"
                className="px-4 sm:px-5 py-2 rounded-full border-2 border-black dark:border-white text-black dark:text-white text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 hidden sm:inline-block shadow-xs active:scale-95"
              >
                Hire Me
              </a>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 rounded-full border-2 border-black/20 dark:border-white/25 flex items-center justify-center text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors active:scale-95"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={18} className="stroke-[2.5]" /> : <Menu size={18} className="stroke-[2.5]" />}
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-4 top-22 z-40 md:hidden bg-white/95 dark:bg-[#14151A]/95 backdrop-blur-xl border-2 border-black/20 dark:border-white/25 rounded-3xl p-5 shadow-2xl space-y-4 ring-1 ring-black/10 dark:ring-white/10"
          >
            <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-3">
              <span className="font-mono text-[10px] uppercase font-black tracking-widest text-slate-500 dark:text-slate-400">
                NAVIGATION MENU
              </span>
              <div className="flex items-center gap-2">
                <Logo className="w-5 h-5 text-black dark:text-white" />
                <span className="font-sans text-xs font-black text-black dark:text-white uppercase tracking-widest">
                  ANDIKA
                </span>
              </div>
            </div>

            <nav className="flex flex-col space-y-1.5">
              {NAV_LINKS.map(({ label, href }) => {
                const sectionId = href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-xs font-black font-mono tracking-wider transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                        : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1E1F26]"
                    }`}
                  >
                    <span>{label}</span>
                    <ArrowUpRight size={15} className={isActive ? "opacity-100 stroke-[3]" : "opacity-40 stroke-[2]"} />
                  </a>
                );
              })}
            </nav>

            <div className="pt-2 border-t-2 border-black/10 dark:border-white/10 flex items-center justify-between">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-wider text-center shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                Hire Me &rarr;
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}