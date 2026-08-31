"use client";

import { motion } from "framer-motion";
import { Compass, Search, Layout, Palette, Code2, ShieldCheck, RefreshCw, ArrowRight } from "lucide-react";

export default function CreativeProcess() {
  const steps = [
    {
      step: "01",
      title: "Research & Analysis",
      icon: Search,
      category: "Discovery",
      desc: "Understanding user needs, business goals, persona mapping, and requirements specification.",
      objectType: "Research Brief",
      color: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      step: "02",
      title: "Wireframing & IA",
      icon: Layout,
      category: "Architecture",
      desc: "Mapping information architecture, user journeys, low-fidelity layouts, and structural blueprints.",
      objectType: "Sketch Sheet",
      color: "bg-sky-500",
      lightColor: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
      step: "03",
      title: "UI/UX Design",
      icon: Palette,
      category: "Visual Studio",
      desc: "Crafting high-fidelity UI interfaces, design systems, interactive prototypes, and micro-interactions in Figma.",
      objectType: "Figma Board",
      color: "bg-purple-500",
      lightColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      step: "04",
      title: "Development",
      icon: Code2,
      category: "Engineering",
      desc: "Building modern responsive web applications using React, Next.js, Laravel, PHP, and Tailwind CSS.",
      objectType: "Code Sandbox",
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      step: "05",
      title: "Testing & QA",
      icon: ShieldCheck,
      category: "Quality Assurance",
      desc: "Conducting usability testing, cross-browser compatibility checks, performance profiling, and network security checks.",
      objectType: "Audit Report",
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      step: "06",
      title: "Iteration & Refinement",
      icon: RefreshCw,
      category: "Evolution",
      desc: "Analyzing user feedback, optimizing database queries, refining visual elements, and continuous deployment.",
      objectType: "Sprint Notes",
      color: "bg-rose-500",
      lightColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
  ];

  return (
    <section
      id="process"
      className="py-28 bg-transparent font-sans relative overflow-hidden border-y border-slate-200/50"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-3">
              <Compass size={14} />
              <span>03 / Workflow & Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Creative <span className="text-blue-600">Process</span>
            </h2>
          </div>
          <p className="text-slate-500 font-semibold text-sm max-w-md">
            How ideas transform into structured, user-centered digital solutions inside the studio.
          </p>
        </div>

        {/* Pinned Studio Corkboard Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative bg-white border border-slate-200/90 rounded-3xl p-7 flex flex-col justify-between blue-shadow card-hover-lift hover:border-blue-400 overflow-hidden"
              >
                {/* Push Pin Header Element */}
                <div className="absolute top-4 right-6 flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-md border border-white flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-white/80" />
                  </div>
                </div>

                <div>
                  {/* Top Badge & Number */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {item.step}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${item.lightColor}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Artefact Tag */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    {item.objectType}
                  </span>
                  <span className="text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Stage {item.step} <ArrowRight size={12} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
