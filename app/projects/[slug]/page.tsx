"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Figma, FileText, CheckCircle, Play, Layers } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { supabase } from "@/lib/supabase";
import { projects as fallbackProjects } from "@/data/projects";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    async function fetchProjectDetail() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*, project_images(*)")
          .eq("slug", slug)
          .single();

        if (data && !error) {
          setProject(data);
          setActiveImage(data.thumbnail);
        } else {
          // Fallback matching from hardcoded projects
          const found = fallbackProjects.find(
            (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug || p.id.toString() === slug
          );
          if (found) {
            setProject({
              id: found.id,
              title: found.title,
              subtitle: found.subtitle,
              category: found.category,
              year: found.year,
              short_desc: found.shortDesc,
              long_desc: found.longDesc,
              thumbnail: found.image,
              role: found.category,
              tools: found.tools,
              highlights: found.highlights || [],
              figma_url: found.link.includes("figma.com") ? found.link : null,
              github_url: found.link.includes("github.com") ? found.link : null,
              live_url: !found.link.includes("figma.com") && !found.link.includes("github.com") ? found.link : null,
            });
            setActiveImage(found.image);
          }
        }
      } catch (err) {
        console.error("Error fetching project detail:", err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProjectDetail();
    }
  }, [slug]);

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white flex items-center justify-center font-mono text-xs">
          Loading project detail...
        </div>
      </ThemeProvider>
    );
  }

  if (!project) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white flex flex-col items-center justify-center space-y-4 p-6">
          <p className="font-mono text-sm text-slate-500">Project not found.</p>
          <Link
            href="/projects"
            className="px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs"
          >
            ← Back to Projects
          </Link>
        </div>
      </ThemeProvider>
    );
  }

  const galleryImages = [
    project.thumbnail,
    ...(project.project_images ? project.project_images.map((img: any) => img.image_url) : [])
  ].filter(Boolean);

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white transition-colors duration-500 font-sans pb-24">
        {/* Top Navbar */}
        <div className="sticky top-0 z-40 bg-[#F3F3F5]/90 dark:bg-[#0E0F12]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10 px-6 py-4 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#14151A] text-xs font-bold hover:border-black dark:hover:border-white transition-all shadow-xs"
          >
            <ArrowLeft size={14} /> Back to Showcase
          </Link>

          <span className="font-mono text-xs text-slate-500 uppercase tracking-widest font-bold hidden sm:block">
            {project.category} &bull; {project.year}
          </span>
        </div>

        {/* Content Container */}
        <div className="max-w-5xl mx-auto px-6 pt-10 space-y-10">
          
          {/* Header info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                {project.category}
              </span>
              <span className="font-mono text-xs text-slate-400 font-bold">{project.year}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white">
              {project.title}
            </h1>

            {project.subtitle && (
              <p className="font-mono text-xs sm:text-sm text-slate-500 uppercase tracking-widest font-semibold">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Main Showcase Image & Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-[#18191E] shadow-lg">
              <img
                src={activeImage || project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gallery Thumbnails (if multiple images exist) */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === imgUrl ? "border-blue-500 ring-2 ring-blue-500/30" : "border-black/10 dark:border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Main Overview */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Description */}
              <div className="bg-white dark:bg-[#14151A] p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-xs space-y-3">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Project Description
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {project.long_desc || project.short_desc}
                </p>
              </div>

              {/* Key Highlights / Features */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="bg-white dark:bg-[#14151A] p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-xs space-y-4">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                    Key Features &amp; Highlights
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.highlights.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Meta & Action Links */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Project Meta Card */}
              <div className="bg-white dark:bg-[#14151A] p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xs space-y-5">
                
                {/* Role */}
                {project.role && (
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      My Role
                    </p>
                    <p className="text-sm font-extrabold text-black dark:text-white">{project.role}</p>
                  </div>
                )}

                {/* Technologies / Tools */}
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools && project.tools.map((t: string) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1E1F26] text-slate-700 dark:text-slate-300 font-mono text-[10px] font-bold border border-black/5 dark:border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-2">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Links &amp; Resources
                  </p>

                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-80 transition-all flex items-center justify-between shadow-xs"
                    >
                      <span className="flex items-center gap-2"><ExternalLink size={14} /> Live Project</span>
                      <span>→</span>
                    </a>
                  )}

                  {project.figma_url && (
                    <a
                      href={project.figma_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white font-bold text-xs transition-all flex items-center justify-between text-black dark:text-white"
                    >
                      <span className="flex items-center gap-2"><Figma size={14} /> Figma Design Prototype</span>
                      <span>→</span>
                    </a>
                  )}

                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white font-bold text-xs transition-all flex items-center justify-between text-black dark:text-white"
                    >
                      <span className="flex items-center gap-2"><Github size={14} /> GitHub Repository</span>
                      <span>→</span>
                    </a>
                  )}

                  {project.documentation_url && (
                    <a
                      href={project.documentation_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white font-bold text-xs transition-all flex items-center justify-between text-black dark:text-white"
                    >
                      <span className="flex items-center gap-2"><FileText size={14} /> System Documentation</span>
                      <span>→</span>
                    </a>
                  )}

                  {project.prototype_url && (
                    <a
                      href={project.prototype_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white font-bold text-xs transition-all flex items-center justify-between text-black dark:text-white"
                    >
                      <span className="flex items-center gap-2"><Play size={14} /> Interactive Prototype</span>
                      <span>→</span>
                    </a>
                  )}
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>
    </ThemeProvider>
  );
}
