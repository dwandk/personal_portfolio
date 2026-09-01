"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Figma,
  FileText,
  CheckCircle,
  Play,
  Layers,
  Target,
  Search,
  GitBranch,
  Lightbulb,
  Image as ImageIcon,
  Trophy,
  BookOpen,
  Star,
  Info,
  Wrench,
  Link as LinkIcon,
  Calendar,
  Users,
  Tag,
  ChevronRight,
} from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { supabase } from "@/lib/supabase";
import { projects as fallbackProjects } from "@/data/projects";

const SECTION_ICONS: Record<string, any> = {
  overview: Info,
  problem: Target,
  research: Search,
  process: GitBranch,
  solution: Lightbulb,
  gallery: ImageIcon,
  result: Trophy,
  lessons_learned: BookOpen,
  key_features: Star,
  project_info: Info,
  technologies: Wrench,
  links: LinkIcon,
};

const SECTION_COLORS: Record<string, string> = {
  overview: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  problem: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  research: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  process: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  solution: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  gallery: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  result: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  lessons_learned: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  key_features: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  project_info: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
  technologies: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  links: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
};

function SectionLabel({ id, label }: { id: string; label: string }) {
  const colorClass = SECTION_COLORS[id] || "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
  const Icon = SECTION_ICONS[id] || Info;
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono text-[10px] font-bold uppercase tracking-widest ${colorClass}`}>
      <Icon size={11} />
      {label}
    </div>
  );
}

function SectionCard({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-[#14151A] rounded-3xl border border-black/10 dark:border-white/10 shadow-xs overflow-hidden"
    >
      <div className="p-6 sm:p-8 space-y-4">
        <SectionLabel id={id} label={label} />
        {children}
      </div>
    </motion.div>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

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
              overview: found.longDesc,
              thumbnail: found.image,
              role: found.category,
              tools: found.tools,
              highlights: found.highlights || [],
              key_features: found.highlights || [],
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
        <div className="min-h-screen bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-black/10 dark:border-white/10 border-t-black dark:border-t-white animate-spin" />
            <p className="font-mono text-xs text-slate-500">Loading project...</p>
          </div>
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

  const hasLinks = project.live_url || project.figma_url || project.github_url || project.documentation_url || project.prototype_url;
  const keyFeaturesArr: string[] = (project.key_features?.length ? project.key_features : project.highlights) || [];

  return (
    <ThemeProvider>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxImg}
              alt="Full view"
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white transition-colors duration-500 font-sans pb-32">
        
        {/* Sticky Topbar */}
        <div className="sticky top-0 z-40 bg-[#F3F3F5]/90 dark:bg-[#0E0F12]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10 px-6 py-4 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#14151A] text-xs font-bold hover:border-black dark:hover:border-white transition-all shadow-xs"
          >
            <ArrowLeft size={14} /> Back to Showcase
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider border border-blue-500/20 hidden sm:inline-flex">
              {project.category}
            </span>
            <span className="font-mono text-xs text-slate-400 font-bold hidden sm:block">{project.year}</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 space-y-6">

          {/* ─── HERO HEADER ──────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                {project.category}
              </span>
              <span className="font-mono text-xs text-slate-400 font-bold">{project.year}</span>
              {project.timeline && (
                <span className="flex items-center gap-1 font-mono text-[10px] text-slate-400">
                  <Calendar size={11} /> {project.timeline}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white leading-tight">
              {project.title}
            </h1>

            {project.subtitle && (
              <p className="font-mono text-xs sm:text-sm text-slate-500 uppercase tracking-widest font-semibold">
                {project.subtitle}
              </p>
            )}

            {project.short_desc && (
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                {project.short_desc}
              </p>
            )}
          </motion.div>

          {/* ─── MAIN THUMBNAIL ───────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4">
            <div
              className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-[#18191E] shadow-lg cursor-zoom-in"
              onClick={() => setLightboxImg(activeImage || project.thumbnail)}
            >
              <img
                src={activeImage || project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>

            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((imgUrl: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === imgUrl ? "border-blue-500 ring-2 ring-blue-500/30" : "border-black/10 dark:border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ─── TWO-COLUMN LAYOUT ────────────────────────────────────── */}
          <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* LEFT: Main Content Sections */}
            <div className="lg:col-span-8 space-y-5">

              {/* OVERVIEW */}
              {(project.overview || project.long_desc) && (
                <SectionCard id="overview" label="Overview">
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {project.overview || project.long_desc}
                  </p>
                </SectionCard>
              )}

              {/* PROBLEM */}
              {project.problem && (
                <SectionCard id="problem" label="Problem">
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {project.problem}
                  </p>
                </SectionCard>
              )}

              {/* RESEARCH */}
              {project.research && (
                <SectionCard id="research" label="Research">
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {project.research}
                  </p>
                </SectionCard>
              )}

              {/* PROCESS */}
              {project.process && (
                <SectionCard id="process" label="Process">
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {project.process}
                  </p>
                </SectionCard>
              )}

              {/* SOLUTION */}
              {project.solution && (
                <SectionCard id="solution" label="Solution">
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {project.solution}
                  </p>
                </SectionCard>
              )}

              {/* GALLERY */}
              {galleryImages.length > 1 && (
                <SectionCard id="gallery" label="Gallery">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {galleryImages.map((imgUrl: string, i: number) => (
                      <div
                        key={i}
                        onClick={() => setLightboxImg(imgUrl)}
                        className="relative aspect-video rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-[#18191E] cursor-zoom-in group"
                      >
                        <img
                          src={imgUrl}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                          <ImageIcon size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* RESULT */}
              {project.result && (
                <SectionCard id="result" label="Result">
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {project.result}
                  </p>
                </SectionCard>
              )}

              {/* LESSONS LEARNED */}
              {project.lessons_learned && (
                <SectionCard id="lessons_learned" label="Lessons Learned">
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {project.lessons_learned}
                  </p>
                </SectionCard>
              )}

              {/* KEY FEATURES */}
              {keyFeaturesArr.length > 0 && (
                <SectionCard id="key_features" label="Key Features">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {keyFeaturesArr.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#1E1F26] rounded-xl p-3 border border-black/5 dark:border-white/5">
                        <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

            </div>

            {/* RIGHT: Sidebar */}
            <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">

              {/* PROJECT INFO */}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <SectionCard id="project_info" label="Project Info">
                  <div className="space-y-4">
                    {project.role && (
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">My Role</p>
                        <p className="text-sm font-extrabold text-black dark:text-white">{project.role}</p>
                      </div>
                    )}
                    {project.timeline && (
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Timeline</p>
                        <p className="text-sm font-bold text-black dark:text-white flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400" /> {project.timeline}
                        </p>
                      </div>
                    )}
                    {project.team_size && (
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Team</p>
                        <p className="text-sm font-bold text-black dark:text-white flex items-center gap-1.5">
                          <Users size={13} className="text-slate-400" /> {project.team_size}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Category</p>
                      <p className="text-sm font-bold text-black dark:text-white flex items-center gap-1.5">
                        <Tag size={13} className="text-slate-400" /> {project.category}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Year</p>
                      <p className="text-sm font-bold text-black dark:text-white">{project.year}</p>
                    </div>
                  </div>
                </SectionCard>
              </motion.div>

              {/* TECHNOLOGIES */}
              {project.tools && project.tools.length > 0 && (
                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
                  <SectionCard id="technologies" label="Technologies">
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((t: string) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1E1F26] text-slate-700 dark:text-slate-300 font-mono text-[11px] font-bold border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </SectionCard>
                </motion.div>
              )}

              {/* LINKS */}
              {hasLinks && (
                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
                  <SectionCard id="links" label="Links">
                    <div className="space-y-2">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-80 transition-all flex items-center justify-between shadow-xs"
                        >
                          <span className="flex items-center gap-2"><ExternalLink size={13} /> Live Demo</span>
                          <ChevronRight size={14} />
                        </a>
                      )}
                      {project.figma_url && (
                        <a
                          href={project.figma_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white font-bold text-xs transition-all flex items-center justify-between text-black dark:text-white bg-white dark:bg-[#14151A]"
                        >
                          <span className="flex items-center gap-2"><Figma size={13} /> Figma Prototype</span>
                          <ChevronRight size={14} />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white font-bold text-xs transition-all flex items-center justify-between text-black dark:text-white bg-white dark:bg-[#14151A]"
                        >
                          <span className="flex items-center gap-2"><Github size={13} /> GitHub Repository</span>
                          <ChevronRight size={14} />
                        </a>
                      )}
                      {project.documentation_url && (
                        <a
                          href={project.documentation_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white font-bold text-xs transition-all flex items-center justify-between text-black dark:text-white bg-white dark:bg-[#14151A]"
                        >
                          <span className="flex items-center gap-2"><FileText size={13} /> Documentation</span>
                          <ChevronRight size={14} />
                        </a>
                      )}
                      {project.prototype_url && (
                        <a
                          href={project.prototype_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white font-bold text-xs transition-all flex items-center justify-between text-black dark:text-white bg-white dark:bg-[#14151A]"
                        >
                          <span className="flex items-center gap-2"><Play size={13} /> Interactive Prototype</span>
                          <ChevronRight size={14} />
                        </a>
                      )}
                    </div>
                  </SectionCard>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
