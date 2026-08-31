"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "WHAT I CAN DO", href: "#skills" },
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
        className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Floating Nav Capsule */}
          <div className="w-full flex items-center justify-between bg-white/85 dark:bg-[#121316]/90 backdrop-blur-md text-black dark:text-white border border-black/20 dark:border-white/25 rounded-full px-4 sm:px-6 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.07)] transition-colors duration-300">
            
            {/* Logo Badge */}
            <a href="#hero" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-full bg-black text-white dark:bg-white dark:text-black font-display font-bold flex items-center justify-center text-xs shadow-xs group-hover:scale-105 transition-transform">
                A
              </div>
              <span className="font-sans font-bold tracking-widest text-[11px] uppercase hidden sm:inline-block">
                ANDIKA
              </span>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const sectionId = href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={label}
                    href={href}
                    className={`relative px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase transition-colors duration-200 ${
                      isActive
                        ? "text-black dark:text-white font-bold"
                        : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-black/10 dark:bg-white/15 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right Action Items */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-all cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
              </button>

              <a
                href="#contact"
                className="px-3.5 py-1.5 rounded-full border border-black/80 dark:border-white/80 text-black dark:text-white text-[11px] font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 hidden sm:inline-block"
              >
                Hire Me
              </a>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-8 h-8 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
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
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-white/95 dark:bg-[#14151A]/95 backdrop-blur-xl border border-black/15 dark:border-white/20 rounded-3xl p-5 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-slate-400">
                NAVIGATION MENU
              </span>
              <span className="font-mono text-[10px] text-slate-400 font-semibold">
                PORTFOLIO
              </span>
            </div>

            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map(({ label, href }) => {
                const sectionId = href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-xs font-bold font-mono tracking-wider transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1E1F26]"
                    }`}
                  >
                    <span>{label}</span>
                    <ArrowUpRight size={14} className={isActive ? "opacity-100" : "opacity-40"} />
                  </a>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs text-center shadow-md flex items-center justify-center gap-1.5"
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