"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white py-24 sm:py-32 px-6 border-t border-black/5 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-xs tracking-[0.25em] text-slate-500 dark:text-slate-400 uppercase mb-2">
            ACADEMIC &amp; JOURNEY
          </p>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Experience &amp; Milestones
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 sm:left-[140px] top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" />

          <div className="space-y-0">
            {experiences.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex flex-col sm:flex-row gap-4 sm:gap-0 pb-12"
              >
                <div className="sm:w-[140px] sm:shrink-0 sm:pr-8 sm:text-right">
                  <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                    {item.period}
                  </span>
                </div>

                <div className="absolute left-[-5px] sm:left-[135px] top-1 w-2.5 h-2.5 rounded-full bg-black dark:bg-white border-2 border-[#F3F3F5] dark:border-[#0E0F12]" />

                <div className="pl-6 sm:pl-10 flex-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-mono text-[9px] tracking-widest uppercase mb-2 inline-block font-bold">
                    {item.type}
                  </span>

                  <h3 className="font-extrabold text-xl text-black dark:text-white mb-1">
                    {item.role}
                  </h3>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-3">
                    {item.organization} · {item.location}
                  </p>

                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 max-w-xl">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 rounded-lg bg-white dark:bg-[#14151A] border border-black/5 dark:border-white/5 font-mono text-[9px] tracking-wider text-slate-600 dark:text-slate-400"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
