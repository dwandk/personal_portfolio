"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import TypewriterTitle from "./TypewriterTitle";
import { SectionBackdrop, FloatingCodeParticles, CursorGlow, DotGridOverlay, TerminalLabel } from "./SectionDecorations";
import { supabase } from "@/lib/supabase";

interface CertificationItem {
  id: string;
  categoryTitle: string;
  subtitle: string;
  issuer: string;
  date: string;
  image: string;
  desc: string;
  link: string;
}

const FALLBACK_CATEGORIES: CertificationItem[] = [
  {
    id: "design",
    categoryTitle: "UI/UX & DESIGN COMPETITION",
    subtitle: "2nd Place UX Competition BERAKSI 2025",
    issuer: "BERAKSI 2025 UX Competition",
    date: "2025",
    image: "/assets/projects/Beraksi.png",
    desc: "2nd Place Winners in BERAKSI 2025 National UX Competition. Conducted user research, persona mapping, wireframing, high-fidelity UI design, and interactive Figma prototyping.",
    link: "https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link",
  },
  {
    id: "networking",
    categoryTitle: "NETWORKING & SECURITY",
    subtitle: "Certified Network Engineer (BNSP)",
    issuer: "BNSP Indonesia",
    date: "2025",
    image: "/assets/projects/BNSP.jpg",
    desc: "Achieved national network engineering competency certification from BNSP Indonesia, validating skills in Mikrotik routing, network topology, security, and hardware troubleshooting.",
    link: "https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link",
  },
  {
    id: "data",
    categoryTitle: "DATA & ANALYTICS",
    subtitle: "IBM Data Classification & Analytics",
    issuer: "IBM",
    date: "2025",
    image: "/assets/projects/IBM.png",
    desc: "Completed professional credentials in Data Classification, Data Governance, SQL querying, and analytical model building for structured business data.",
    link: "https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link",
  },
  {
    id: "management",
    categoryTitle: "PROJECT MANAGEMENT",
    subtitle: "Google Project Management Scholar",
    issuer: "Google x KOMDIGI",
    date: "2025",
    image: "/assets/projects/PM.png",
    desc: "Completed intensive professional program covering Agile & Scrum project management, sprint planning, risk assessment, and software project lifecycles.",
    link: "https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link",
  },
];

export default function Certifications() {
  const [certs, setCerts] = useState<CertificationItem[]>(FALLBACK_CATEGORIES);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCerts() {
      try {
        const { data } = await supabase
          .from("certifications")
          .select("*")
          .order("display_order", { ascending: true });

        if (data && data.length > 0) {
          const mapped: CertificationItem[] = data.map((c) => ({
            id: c.id,
            categoryTitle: c.category_title,
            subtitle: c.subtitle,
            issuer: c.issuer,
            date: c.year,
            image: c.image,
            desc: c.description || "",
            link: c.link || "https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link",
          }));
          setCerts(mapped);
        }
      } catch (err) {
        console.error("Error fetching certifications:", err);
      }
    }
    fetchCerts();
  }, []);

  return (
    <section
      id="certifications"
      className="relative bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white py-14 sm:py-20 px-6 transition-colors duration-500 overflow-hidden"
    >
      <DotGridOverlay />
      <CursorGlow />
      <FloatingCodeParticles count={6} />
      <SectionBackdrop label="CERTIFICATIONS" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        
        {/* Header Section */}
        <div className="mb-10">
          <TerminalLabel path="~/portfolio/certifications.tsx" />
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight min-h-[45px]">
            <TypewriterTitle text="Certifications & Achievements" />
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Verified credentials, national competition awards, and technical certifications earned across design, engineering, and data analysis.
          </p>
        </div>

        {/* Accordion / List Grid */}
        <div className="space-y-4">
          {certs.map((cert) => {
            const isExpanded = expandedId === cert.id;

            return (
              <div
                key={cert.id}
                className="bg-white dark:bg-[#14151A] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs transition-all duration-300 hover:border-black/20 dark:hover:border-white/20"
              >
                {/* Header row - clickable */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : cert.id)}
                  className="w-full text-left p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none group"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase font-bold">
                      {cert.categoryTitle}
                    </span>
                    <h3 className="text-base sm:text-xl font-bold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cert.subtitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Issued by <span className="text-slate-700 dark:text-slate-300 font-semibold">{cert.issuer}</span> &bull; {cert.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 group-hover:underline">
                      {isExpanded ? "Hide Details" : "View Credential"}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center transition-transform duration-300 ${
                        isExpanded ? "rotate-45 bg-black text-white dark:bg-white dark:text-black" : "bg-slate-100 dark:bg-[#1E1F26]"
                      }`}
                    >
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </button>

                {/* Expanded Content Panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="border-t border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-[#0E0F12]/50"
                    >
                      <div className="p-4 sm:p-6 grid md:grid-cols-12 gap-6 items-center">
                        {/* Certificate Image Preview */}
                        <div className="md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm group/img cursor-pointer">
                          <img
                            src={cert.image}
                            alt={cert.subtitle}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Description & Action */}
                        <div className="md:col-span-7 space-y-4">
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {cert.desc}
                          </p>

                          <div className="pt-2 flex items-center gap-3">
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-mono text-xs font-bold hover:opacity-80 transition-opacity inline-flex items-center gap-2 shadow-xs"
                            >
                              Open Official Credential <ArrowUpRight size={13} />
                            </a>

                            <button
                              onClick={() => setExpandedId(null)}
                              className="px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400 font-mono text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors inline-flex items-center gap-1"
                            >
                              <X size={13} /> Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}