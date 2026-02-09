"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { tools } from "@/data/tools";

export default function Skills() {
  return (
   
    <section
      id="skills"
      className="py-18 md:py-20 bg-transparent font-montserrat"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-bold tracking-widest uppercase mb-4">
            Expertise
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Skills & <span className="text-teal-400">Tools</span>
          </h2>
        </div>

       
        <div className="relative overflow-hidden mb-10 group">
          <div className="flex gap-6 animate-scroll w-max">
            {[...tools, ...tools].map((tool, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-44 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-teal-500/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-white/5 rounded-xl p-3 transition-all">
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-sm font-bold text-center text-white mb-1">
                  {tool.name}
                </h4>
                <p className="text-[10px] text-neutral-500 text-center uppercase tracking-wider">
                  {tool.category}
                </p>
              </div>
            ))}
          </div>
        
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#030303] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#030303] to-transparent z-10" />
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-teal-500/50 transition-all duration-500 cursor-pointer overflow-hidden h-64"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                  <span className="text-4xl">{cat.icon}</span>
                </div>

                <h3 className="font-bold text-lg text-center group-hover:text-teal-400 transition-colors">
                  {cat.title}
                </h3>

               
                <div className="hidden md:block absolute inset-0 bg-neutral-900/95 backdrop-blur-md p-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <div className="flex flex-col justify-center h-full">
                    <h4 className="font-bold text-teal-400 mb-4 text-center border-b border-white/10 pb-2 text-sm uppercase tracking-widest">
                      {cat.title}
                    </h4>

                    <div className="space-y-2.5">
                      {cat.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
                          <span className="text-xs font-medium text-neutral-200">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile cuii */}
                <details className="md:hidden mt-4 w-full text-center">
                  <summary className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest list-none cursor-pointer">
                    Tap to expand
                  </summary>
                  <div className="mt-4 space-y-2 text-left bg-black/40 p-4 rounded-xl">
                    {cat.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-teal-400" />
                        <span className="text-xs text-neutral-300">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 35s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
