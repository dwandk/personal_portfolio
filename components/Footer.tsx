"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent pt-20 pb-10 overflow-hidden font-montserrat">
      {/* Divider halus dengan gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          
          {/* Sisi Kiri: Brand & Slogan */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-black tracking-tighter text-white">
              ANDIKA <span className="text-teal-400">DWI PRASETYA</span>
            </h3>
            <p className="mt-2 text-sm text-neutral-500 leading-relaxed max-w-xs mx-auto md:mx-0">
              Building digital experiences that balance aesthetics and performance.
            </p>
          </div>

          {/* Sisi Tengah: Quick Links (Centered) */}
          <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <a href="#about" className="hover:text-teal-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-teal-400 transition-colors">Projects</a>
            <a href="#certifications" className="hover:text-teal-400 transition-colors">Contact</a>
          </div>

          {/* Sisi Kanan: Social Media (Dibuat Modern) */}
          <div className="flex justify-center md:justify-end gap-4">
            {[
              { label: "LI", href: "https://www.linkedin.com/in/andika-dwi-prasetya-4b70482b4", name: "LinkedIn" },
              { label: "GH", href: "https://github.com/dwandk", name: "GitHub" },
              { label: "IG", href: "https://instagram.com/andikaprsty__", name: "Instagram" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ y: -3 }}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-neutral-400 hover:border-teal-500/50 hover:text-teal-400 transition-all"
                title={social.name}
              >
                {social.label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Baris Bawah: Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium text-neutral-600 uppercase tracking-[0.2em]">
          <p>© {currentYear} All rights reserved.</p>
          <div className="flex gap-6">
            <span>Designed by Andika</span>
          </div>
        </div>
      </div>
    </footer>
  );
}