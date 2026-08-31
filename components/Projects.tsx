"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { projects as fallbackProjects } from "@/data/projects";
import TypewriterTitle from "./TypewriterTitle";
import { SectionBackdrop, FloatingCodeParticles, CursorGlow, DotGridOverlay, TerminalLabel } from "./SectionDecorations";
import { supabase } from "@/lib/supabase";
import { ProjectData } from "@/lib/types";

// Distinct color styling for each category type
const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case "UI/UX Design":
      return "bg-indigo-600/85 text-white border-indigo-400/30 shadow-indigo-900/20";
    case "Mobile App":
      return "bg-purple-600/85 text-white border-purple-400/30 shadow-purple-900/20";
    case "Web Application":
      return "bg-emerald-600/85 text-white border-emerald-400/30 shadow-emerald-900/20";
    case "Data Analytics":
      return "bg-amber-600/85 text-white border-amber-400/30 shadow-amber-900/20";
    default:
      return "bg-black/75 text-white border-white/20";
  }
};

export default function Projects() {
  const [projectList, setProjectList] = useState<any[]>(fallbackProjects);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data } = await supabase
          .from("projects")
          .select("*")
          .order("display_order", { ascending: true });

        if (data && data.length > 0) {
          const mapped = data.map((p: ProjectData) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            subtitle: p.subtitle,
            category: p.category,
            year: p.year,
            shortDesc: p.short_desc,
            longDesc: p.long_desc,
            gradient: p.gradient,
            image: p.thumbnail,
            link: p.figma_url || p.live_url || p.github_url || `/projects/${p.slug}`,
          }));
          setProjectList(mapped);
          setActiveIndex(Math.floor(mapped.length / 2));
        } else {
          setActiveIndex(Math.floor(fallbackProjects.length / 2));
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
    fetchProjects();
  }, []);

  const activeProject = projectList[activeIndex] || projectList[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projectList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === projectList.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="projects"
      className="relative bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white py-8 sm:py-12 px-6 overflow-hidden transition-colors duration-500"
    >
      <DotGridOverlay />
      <CursorGlow />
      <FloatingCodeParticles count={8} />
      <SectionBackdrop label="PROJECTS" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <TerminalLabel path="~/portfolio/projects.tsx" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight min-h-[45px]">
              <TypewriterTitle text="Project Gallery" />
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              A collection of systems, digital projects, and technical work I've built.
            </p>
          </div>

          <Link
            href="/projects"
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-80 transition-all inline-flex items-center gap-2 shadow-md"
          >
            View All Projects <ExternalLink size={14} />
          </Link>
        </div>

        {/* 3D Stack Carousel */}
        <div className="relative py-2 flex items-center justify-center min-h-[240px] sm:min-h-[290px]">
          {/* Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-30 p-2.5 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            aria-label="Previous project"
          >
            <ArrowLeft size={16} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-30 p-2.5 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            aria-label="Next project"
          >
            <ArrowRight size={16} />
          </button>

          {/* Cards Stack */}
          <div className="relative w-full max-w-2xl flex items-center justify-center h-[200px] sm:h-[260px]">
            {projectList.map((project, idx) => {
              const offset = idx - activeIndex;
              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={project.id}
                  onClick={() => setActiveIndex(idx)}
                  animate={{
                    x: offset * 140,
                    scale: isCenter ? 1 : 0.82 - Math.abs(offset) * 0.08,
                    rotateY: offset * -15,
                    zIndex: 20 - Math.abs(offset) * 5,
                    opacity: isCenter ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className={`absolute w-[220px] sm:w-[380px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-xl border ${
                    isCenter ? "border-black/30 dark:border-white/40 ring-4 ring-black/5 dark:ring-white/10" : "border-black/10 dark:border-white/10"
                  } bg-white dark:bg-[#18191E] group`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-md font-mono text-[9px] uppercase font-bold tracking-wider border shadow-sm ${getCategoryBadgeClass(project.category)}`}>
                    {project.category}
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-[9px] font-bold border border-white/20">
                    {project.year}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Project Info */}
        {activeProject && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-center max-w-2xl mx-auto mt-2"
            >
              <h3 className="text-lg sm:text-xl font-extrabold text-black dark:text-white mb-1">
                {activeProject.title} {activeProject.subtitle ? `— ${activeProject.subtitle}` : ""}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
                {activeProject.longDesc || activeProject.shortDesc}
              </p>

              <Link
                href={activeProject.slug ? `/projects/${activeProject.slug}` : "/projects"}
                className="inline-flex items-center gap-2 text-xs font-bold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all px-4 py-2 rounded-xl border border-black/20 dark:border-white/20 bg-white/50 dark:bg-white/5 shadow-xs"
              >
                View Project →
              </Link>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
}