"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="py-27 relative min-h-screen w-full flex items-center justify-center bg-transparent text-white font-montserrat">
      {/* CONTENT LAYER */}
      <div className="relative z-10 max-w-5xl px-6 flex flex-col items-center text-center">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group cursor-pointer mb-8 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/5 backdrop-blur-md hover:bg-teal-500/10 transition-all"
        >
          <span className="text-sm font-medium bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Open for New Opportunities
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
        >
          Andika's Portfolio
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-xl text-neutral-400 max-w-3xl mb-10 leading-relaxed"
        >
          An Information Systems student with a strong interest in
          <span className="text-teal-400">
            {" "}
            UI/UX Design, System Analyst, Web Development, Computer Networks, and Data Analysis
          </span>
          . I enjoy transforming ideas into clean, functional, and impactful
          digital experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center"
        >
          <motion.a
            href="mailto:andikaprsty24@gmail.com"
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 0 25px rgba(20, 184, 166, 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-10 py-4 bg-teal-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all"
          >
            Contact Me
          </motion.a>

          <motion.a
            href="https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-10 py-4 border border-neutral-800 rounded-2xl font-bold backdrop-blur-sm transition-colors text-neutral-300"
          >
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-neutral-500"
        >
          {[
            { label: "Email", href: "mailto:andikaprsty24@gmail.com" },
            { label: "GitHub", href: "https://github.com/dwandk" },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/andika-dwi-prasetya-4b70482b4",
            },
            { label: "Instagram", href: "https://instagram.com/andikaprsty__" },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: "#2dd4bf" }}
              className="
        text-xs font-bold tracking-[0.2em] uppercase
        transition-colors duration-300
        hover:text-teal-400
      "
            >
              {social.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
