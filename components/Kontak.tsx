"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Instagram, Send, ArrowUpRight } from "lucide-react";
import TypewriterTitle from "./TypewriterTitle";
import { SectionBackdrop, FloatingCodeParticles, CursorGlow, DotGridOverlay, TerminalLabel } from "./SectionDecorations";

const FORMSPREE_ID = "mzebzpbe";

const contactLinks = [
  { label: "Email",     value: "andikaprsty24@gmail.com",   href: "mailto:andikaprsty24@gmail.com",                              Icon: Mail },
  { label: "WhatsApp",  value: "+62-856-0331-5076",          href: "https://wa.me/6285603315076",                                 Icon: Phone },
  { label: "LinkedIn",  value: "Andika Dwi Prasetya",        href: "https://www.linkedin.com/in/andika-dwi-prasetya-4b70482b4",  Icon: Linkedin },
  { label: "Instagram", value: "@andikaprsty__",             href: "https://instagram.com/andikaprsty__",                        Icon: Instagram },
];

export default function Contact() {
  return (
    <section id="contact" className="relative bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white py-12 sm:py-16 px-6 transition-colors duration-500 overflow-hidden">
      <DotGridOverlay />
      <CursorGlow />
      <FloatingCodeParticles count={6} />
      <SectionBackdrop label="CONTACT" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        
        {/* Header */}
        <div className="mb-8">
          <TerminalLabel path="~/portfolio/contact.tsx" />
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-none mb-3 min-h-[45px]">
            <TypewriterTitle text="LET'S WORK TOGETHER." />
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-lg">
            Have a project, collaboration idea, or role opportunity? Send a message and let's turn your vision into reality.
          </p>
        </div>

        {/* 2-Column Equal Height Grid */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Contact Links (Flex-1 to equal form height) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {contactLinks.map(({ label, value, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-between px-4 py-3 sm:py-3.5 rounded-2xl bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 group hover:border-black/30 dark:hover:border-white/30 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#1E1F26] flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                    <Icon size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-mono text-[8px] tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-0.5">{label}</p>
                    <p className="font-bold text-xs sm:text-sm text-black dark:text-white truncate">{value}</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-400 group-hover:text-black dark:group-hover:text-white transition-colors shrink-0 ml-2" />
              </a>
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              action={`https://formspree.io/f/${FORMSPREE_ID}`}
              method="POST"
              className="bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-sm h-full flex flex-col justify-between"
            >
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-mono text-[8px] tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full bg-slate-100 dark:bg-[#1E1F26] border border-black/5 dark:border-white/5 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-black dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[8px] tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@example.com"
                    className="w-full bg-slate-100 dark:bg-[#1E1F26] border border-black/5 dark:border-white/5 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-black dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[8px] tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Project Inquiry / Job Opportunity"
                  className="w-full bg-slate-100 dark:bg-[#1E1F26] border border-black/5 dark:border-white/5 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-black dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[8px] tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder="Tell me about your project or questions..."
                  className="w-full bg-slate-100 dark:bg-[#1E1F26] border border-black/5 dark:border-white/5 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-black dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-80 transition-all shadow-xs cursor-pointer"
              >
                Send Message <Send size={14} />
              </button>
            </form>
          </div>

        </div>

      </motion.div>
    </section>
  );
}