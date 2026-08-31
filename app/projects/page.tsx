"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, X, CheckCircle } from "lucide-react";
import Link from "next/link";
import { projects as fallbackProjects, Project } from "@/data/projects";
import { ThemeProvider } from "@/components/ThemeProvider";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
  "All",
  "UI/UX Design",
  "Web Application",
  "Mobile App",
  "Data Analytics",
];

export default function AllProjectsPage() {
  const [projectList, setProjectList] = useState<any[]>(fallbackProjects);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data } = await supabase
          .from("projects")
          .select("*")
          .order("display_order", { ascending: true });

        if (data && data.length > 0) {
          const mapped = data.map((p) => ({
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
            tools: p.tools || [],
            highlights: p.highlights || [],
            link: p.figma_url || p.live_url || p.github_url || `/projects/${p.slug}`,
          }));
          setProjectList(mapped);
        }
      } catch (err) {
        console.error("Error fetching projects archive:", err);
      }
    }
    fetchProjects();
  }, []);

  const filtered = selectedCategory === "All"
    ? projectList
    : projectList.filter((p) => p.category === selectedCategory);

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white transition-colors duration-500 font-sans pb-20">

        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-40 bg-[#F3F3F5]/90 dark:bg-[#0E0F12]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10 px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#14151A] text-xs font-bold hover:border-black dark:hover:border-white transition-all shadow-xs"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>

          <span className="font-mono text-xs text-slate-500 uppercase tracking-widest font-bold hidden sm:block">
            {filtered.length} PROJECTS
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12">
          {/* Header */}
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.25em] text-slate-500 dark:text-slate-400 uppercase mb-2">
              SHOWCASE ARCHIVE
            </p>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-3">
              All Projects
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
              Browse and filter through all my projects — from UI/UX design and web applications to data dashboards.
            </p>
          </div>

          {/* Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* Left Sidebar: Category Filter */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-[#14151A] p-5 rounded-3xl border border-black/10 dark:border-white/10 shadow-sm space-y-1.5 sticky top-24">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-4 font-bold px-1">
                  CATEGORIES
                </p>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-between ${
                      selectedCategory === cat
                        ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E1F26]"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`font-mono text-[9px] ${selectedCategory === cat ? "text-white/60 dark:text-black/60" : "text-slate-400"}`}>
                      {cat === "All" ? projectList.length : projectList.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Grid: Project Cards */}
            <div className="lg:col-span-9">
              <motion.div layout className="grid sm:grid-cols-2 gap-5">
                <AnimatePresence mode="popLayout">
                  {filtered.map((project, idx) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      className="bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:border-black/30 dark:hover:border-white/30 hover:shadow-md transition-all group flex flex-col"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-[#1E1F26]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1 justify-between">
                        <div>
                          {/* Meta row */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-mono text-slate-400 text-xs">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#1E1F26] text-slate-600 dark:text-slate-300 font-mono text-[9px] uppercase font-bold">
                                {project.category}
                              </span>
                              <span className="font-mono text-[9px] text-slate-400 font-bold">
                                {project.year}
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="font-extrabold text-lg text-black dark:text-white mb-1.5 leading-snug">
                            {project.title}
                          </h3>

                          {/* Subtitle */}
                          {project.subtitle && (
                            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mb-3">
                              {project.subtitle}
                            </p>
                          )}

                          {/* Description */}
                          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
                            {project.shortDesc}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {project.tools.slice(0, 4).map((t: string) => (
                              <span
                                key={t}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1E1F26] text-slate-600 dark:text-slate-400 font-mono text-[9px]"
                              >
                                {t}
                              </span>
                            ))}
                            {project.tools.length > 4 && (
                              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1E1F26] text-slate-400 font-mono text-[9px]">
                                +{project.tools.length - 4}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CTA */}
                        <Link
                          href={project.slug ? `/projects/${project.slug}` : "/projects"}
                          className="mt-5 w-full py-2.5 rounded-xl border border-black/15 dark:border-white/15 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-xs transition-all flex items-center justify-center gap-2 text-black dark:text-white"
                        >
                          View Project Details <ExternalLink size={13} />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filtered.length === 0 && (
                <div className="text-center py-24 text-slate-400 font-mono text-sm">
                  No projects found in this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
