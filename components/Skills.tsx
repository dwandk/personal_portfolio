"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tools } from "@/data/tools";
import TypewriterTitle from "./TypewriterTitle";
import { SectionBackdrop, FloatingCodeParticles, CursorGlow, DotGridOverlay, TerminalLabel } from "./SectionDecorations";
import { supabase } from "@/lib/supabase";

interface Specialization {
  id: string;
  number: string;
  title: string;
  label: string;
  category: string;
  tagline: string;
  description: string;
  tools: { name: string; icon: string }[];
  skills: string[];
}

const FALLBACK_SPECIALIZATIONS: Specialization[] = [
  {
    id: "uiux",
    number: "01",
    title: "UI/UX Design",
    label: "UI/UX DESIGN",
    category: "DESIGN & USER EXPERIENCE",
    tagline: "User research, wireframing & interactive UI prototyping",
    description:
      "Designing intuitive, user-centered interfaces by combining user research, persona mapping, wireframing, high-fidelity UI design, and comprehensive design systems.",
    tools: [
      tools.find((t) => t.name === "Figma")!,
      tools.find((t) => t.name === "Canva")!,
      tools.find((t) => t.name === "Tailwind CSS")!,
      tools.find((t) => t.name === "VS Code")!,
    ].filter(Boolean),
    skills: [
      "UI/UX Design",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Usability Testing",
      "Persona Mapping",
      "Architecture",
    ],
  },
  {
    id: "sysanalyst",
    number: "02",
    title: "System Analyst",
    label: "SYSTEM ANALYST",
    category: "SYSTEM ARCHITECTURE & LOGIC",
    tagline: "Requirement analysis, UML modeling & database schema design",
    description:
      "Analyzing business requirements, mapping system logic, designing relational database schemas, creating UML diagrams, and structuring efficient software architecture.",
    tools: [
      tools.find((t) => t.name === "MySQL")!,
      tools.find((t) => t.name === "VS Code")!,
      tools.find((t) => t.name === "GitHub")!,
      tools.find((t) => t.name === "PHP")!,
    ].filter(Boolean),
    skills: [
      "System Analysis",
      "UML Modeling",
      "Database Schemas",
      "Requirements",
      "DFD Diagramming",
      "System Architecture",
    ],
  },
  {
    id: "webdev",
    number: "03",
    title: "Web Development",
    label: "WEB DEVELOPMENT",
    category: "FULLSTACK WEB DEVELOPMENT",
    tagline: "Building responsive, scalable web applications",
    description:
      "Developing modern full-stack web applications using robust frameworks like Next.js, React, and Laravel with responsive UI, optimized APIs, and clean maintainable code.",
    tools: [
      tools.find((t) => t.name === "Next JS")!,
      tools.find((t) => t.name === "React JS")!,
      tools.find((t) => t.name === "Tailwind CSS")!,
      tools.find((t) => t.name === "Laravel")!,
      tools.find((t) => t.name === "JavaScript")!,
      tools.find((t) => t.name === "PHP")!,
      tools.find((t) => t.name === "Bootstrap")!,
      tools.find((t) => t.name === "GitHub")!,
    ].filter(Boolean),
    skills: [
      "Web Development",
      "Frontend & Backend",
      "REST APIs",
      "CRUD Operations",
      "Next.js App Router",
      "Responsive Web",
    ],
  },
  {
    id: "mobile",
    number: "04",
    title: "Mobile Development",
    label: "MOBILE DEVELOPMENT",
    category: "MOBILE APPLICATIONS",
    tagline: "Designing & building intuitive mobile app experiences",
    description:
      "Creating user-friendly mobile interfaces and application features with focus on smooth navigation, mobile UX patterns, and API integration.",
    tools: [
      tools.find((t) => t.name === "Figma")!,
      tools.find((t) => t.name === "React JS")!,
      tools.find((t) => t.name === "JavaScript")!,
      tools.find((t) => t.name === "VS Code")!,
      tools.find((t) => t.name === "GitHub")!,
    ].filter(Boolean),
    skills: [
      "Mobile UI/UX",
      "App Layout Design",
      "Mobile Prototyping",
      "API Integration",
      "User-Centered Flows",
    ],
  },
  {
    id: "network",
    number: "05",
    title: "Network",
    label: "NETWORK",
    category: "NETWORK & INFRASTRUCTURE",
    tagline: "Network fundamentals, configuration & troubleshooting",
    description:
      "Understanding computer networking concepts, IP subnets, network security basics, server-client architecture, and system connectivity.",
    tools: [
      tools.find((t) => t.name === "VS Code")!,
      tools.find((t) => t.name === "GitHub")!,
      tools.find((t) => t.name === "Node JS")!,
    ].filter(Boolean),
    skills: [
      "Network Fundamentals",
      "IP Subnetting",
      "Client-Server Architecture",
      "Network Security",
      "Connectivity",
      "Troubleshooting",
    ],
  },
  {
    id: "datascience",
    number: "06",
    title: "Data Analyst & Data Science",
    label: "DATA ANALYST & SCIENCE",
    category: "DATA SCIENCE & ANALYTICS",
    tagline: "Data visualization, statistical analysis & BI dashboards",
    description:
      "Extracting insights from complex datasets using statistical modeling, SQL querying, data cleaning, and creating interactive Power BI dashboards for data-driven decisions.",
    tools: [
      tools.find((t) => t.name === "Power BI")!,
      tools.find((t) => t.name === "Python")!,
      tools.find((t) => t.name === "R")!,
      tools.find((t) => t.name === "MySQL")!,
      tools.find((t) => t.name === "VS Code")!,
    ].filter(Boolean),
    skills: [
      "Data Analytics",
      "Statistical Analysis",
      "SQL Querying",
      "Data Visualization",
      "Data Cleaning",
      "Business Intelligence",
    ],
  },
  {
    id: "sqa",
    number: "07",
    title: "Software Quality Assurance",
    label: "QUALITY ASSURANCE",
    category: "QA & SYSTEM TESTING",
    tagline: "Bug identification, test case design & quality validation",
    description:
      "Executing manual and system testing, designing comprehensive test scenarios, identifying software bugs, and ensuring system reliability before deployment.",
    tools: [
      tools.find((t) => t.name === "VS Code")!,
      tools.find((t) => t.name === "GitHub")!,
      tools.find((t) => t.name === "PHP")!,
      tools.find((t) => t.name === "JavaScript")!,
    ].filter(Boolean),
    skills: [
      "Software Testing",
      "Bug Identification",
      "Test Case Scenario",
      "Quality Assurance",
      "Usability Testing",
      "Regression Testing",
    ],
  },
  {
    id: "other",
    number: "08",
    title: "Other (Business & Supply Chain)",
    label: "BUSINESS & SUPPLY CHAIN",
    category: "BUSINESS DIGITALIZATION & SUPPLY CHAIN",
    tagline: "Business process optimization, supply chain & digital transformation",
    description:
      "Analyzing business processes, supply chain management workflows, and implementing digital transformation solutions tailored to business strategy.",
    tools: [
      tools.find((t) => t.name === "Power BI")!,
      tools.find((t) => t.name === "Canva")!,
      tools.find((t) => t.name === "Figma")!,
      tools.find((t) => t.name === "MySQL")!,
    ].filter(Boolean),
    skills: [
      "Business Process",
      "Supply Chain",
      "Digital Transformation",
      "Workflow Optimization",
      "Business Strategy",
    ],
  },
];

export default function Skills() {
  const [specs, setSpecs] = useState<Specialization[]>(FALLBACK_SPECIALIZATIONS);
  const [activeId, setActiveId] = useState<string>("uiux");

  useEffect(() => {
    async function fetchCapabilities() {
      try {
        const { data } = await supabase
          .from("capabilities")
          .select("*")
          .order("display_order", { ascending: true });

        if (data && data.length > 0) {
          const mapped: Specialization[] = data.map((c) => {
            const fallbackMatch = FALLBACK_SPECIALIZATIONS.find(
              (f) => f.title.toLowerCase() === c.title.toLowerCase() || f.number === c.number_code
            ) || FALLBACK_SPECIALIZATIONS[0];

            return {
              id: c.id,
              number: c.number_code || "01",
              title: c.title,
              label: c.label || c.title.toUpperCase(),
              category: c.category || "CAPABILITY",
              tagline: c.tagline || "",
              description: c.description || "",
              tools: fallbackMatch.tools,
              skills: fallbackMatch.skills,
            };
          });
          setSpecs(mapped);
          setActiveId(mapped[0].id);
        }
      } catch (err) {
        console.error("Error fetching capabilities:", err);
      }
    }
    fetchCapabilities();
  }, []);

  const activeSpec = specs.find((s) => s.id === activeId) || specs[0];

  return (
    <section
      id="skills"
      className="relative bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white py-8 sm:py-12 px-6 transition-colors duration-500 overflow-hidden"
    >
      <DotGridOverlay />
      <CursorGlow />
      <FloatingCodeParticles count={8} />
      <SectionBackdrop label="CAPABILITIES" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 max-w-5xl mx-auto space-y-5"
      >
        
        {/* Header Section */}
        <div>
          <TerminalLabel path="~/portfolio/skills.tsx" />
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight min-h-[40px]">
            <TypewriterTitle text="What I Can Do" />
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            I combine technical, problem-solving, and digital skills to build reliable systems, design intuitive interfaces, and manage data.
          </p>
        </div>

        {/* 2-Column Minimalist Compact Grid */}
        <div className="grid lg:grid-cols-12 gap-5 items-start">
          
          {/* LEFT COLUMN: Filter Pill Cloud */}
          <div className="lg:col-span-5 bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-2">
              <span className="font-mono text-[9px] tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase font-bold">
                SPECIALIZATION FILTERS
              </span>
              <span className="font-mono text-[9px] text-slate-400 font-bold">
                {String(specs.length).padStart(2, "0")} AREAS
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {specs.map((spec) => {
                const isActive = spec.id === activeId;

                return (
                  <motion.button
                    key={spec.id}
                    onClick={() => setActiveId(spec.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative px-3 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer overflow-hidden ${
                      isActive
                        ? "text-white dark:text-black shadow-xs"
                        : "bg-slate-100 dark:bg-[#1E1F26] text-slate-600 dark:text-slate-400 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePillAccent"
                        className="absolute inset-0 bg-black dark:bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}

                    <span className="relative z-10">{spec.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Specialization Details */}
          <div className="lg:col-span-7 bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-xs">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpec.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Header Tag + Number */}
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-black dark:text-white font-mono text-[9px] font-extrabold uppercase tracking-widest">
                      {activeSpec.category}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-extrabold text-slate-400">
                    {activeSpec.number} / {String(specs.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-black dark:text-white mb-1.5 tracking-tight">
                    {activeSpec.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed max-w-2xl">
                    {activeSpec.description}
                  </p>
                </div>

                {/* Tools (Logo Only) & Key Skills */}
                <div className="grid sm:grid-cols-2 gap-4 pt-1 border-t border-black/5 dark:border-white/5">
                  
                  {/* Software & Tools - LOGO ONLY */}
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      SOFTWARE &amp; TOOLS
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeSpec.tools.map((tool) => (
                        <div
                          key={tool.name}
                          title={tool.name}
                          className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#1E1F26] border border-black/5 dark:border-white/10 flex items-center justify-center p-2 hover:scale-110 hover:border-black/30 dark:hover:border-white/30 transition-all cursor-pointer shadow-xs group"
                        >
                          <img
                            src={tool.icon}
                            alt={tool.name}
                            className="w-5 h-5 object-contain group-hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Skills */}
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      KEY COMPETENCIES
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSpec.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-[#1E1F26]/80 text-slate-700 dark:text-slate-300 font-mono text-[10px] border border-black/5 dark:border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
