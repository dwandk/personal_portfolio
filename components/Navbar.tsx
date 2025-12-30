"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // 1. Efek Background Scrolled
      setScrolled(window.scrollY > 50);

      // 2. Logika Active Section saat Scroll
      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 100; // Offset agar ganti sebelum benar-benar di atas
          if (window.scrollY >= offsetTop) {
            currentSection = `#${section}`;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 font-montserrat ${
        scrolled 
          ? "py-4 bg-black/60 backdrop-blur-xl border-b border-white/5" 
          : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <a href="#" className="text-2xl md:text-3xl font-black tracking-tighter text-white group">
          ANDIKA <span className="text-teal-400">PORTFOLIO</span>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveSection(item.href)}
                className={`relative px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 group ${
                  isActive ? "text-teal-400" : "text-neutral-400 hover:text-white"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Active Indicator (Garis bawah permanen saat aktif) */}
                {isActive && (
                  <motion.span 
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Hover Line (Hanya muncul jika tidak aktif) */}
                {!isActive && (
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white/40 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4" />
                )}
              </a>
            );
          })}
        </div>

        {/* MOBILE BUTTON */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-0 left-0 w-full h-screen bg-black/98 backdrop-blur-2xl z-[-1] flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setOpen(false);
                      setActiveSection(item.href);
                    }}
                    className={`text-4xl font-black tracking-tighter transition-colors ${
                      isActive ? "text-teal-400" : "text-white hover:text-teal-200"
                    }`}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}