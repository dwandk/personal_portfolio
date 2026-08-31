"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, FileText } from "lucide-react";
import TypewriterTitle from "./TypewriterTitle";
import {
  SectionBackdrop,
  FloatingCodeParticles,
  CursorGlow,
  DotGridOverlay,
  TerminalLabel,
} from "./SectionDecorations";
import { supabase } from "@/lib/supabase";

export default function About() {
  const [profile, setProfile] = useState({
    name: "ANDIKA DWI PRASETYA",
    headline: "Problem Solver. Digital Generalist.",
    bio_line_1: `I'm an Information Systems student at UPN "Veteran" Yogyakarta focused on UI/UX design, web development, and system analysis. I enjoy turning ideas and real-world problems into practical digital solutions, particularly through web applications, databases, and structured system workflows.`,
    bio_line_2: `Throughout my studies, I gained hands-on experience building database-driven systems and working with technologies such as Laravel, React, Mikrotik, SQL, and Power BI. My work was recognized through awards including 2nd Place in BERAKSI 2025 National UX Competition.`,
    profile_photo: "/assets/projects/Andika.png",
    university: "UPN VETERAN",
    graduation_year: "2026",
    cv_url: "https://drive.google.com/file/d/1vN8IHGorNeELunyL0rSZkzvWBu7LXTSq/view?usp=drive_link",
  });

  const [projectCount, setProjectCount] = useState<number>(12);
  const [certCount, setCertCount] = useState<number>(4);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .single();

        if (profileData) {
          setProfile({
            name: profileData.name || "ANDIKA DWI PRASETYA",
            headline: profileData.headline || "Problem Solver. Digital Generalist.",
            bio_line_1: profileData.bio_line_1 || "",
            bio_line_2: profileData.bio_line_2 || "",
            profile_photo: profileData.profile_photo || "/assets/projects/Andika.png",
            university: profileData.university ? profileData.university.toUpperCase() : "UPN VETERAN",
            graduation_year: profileData.graduation_year || "2026",
            cv_url: profileData.cv_url || "#",
          });
        }

        const { count: pCount } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true });

        if (pCount !== null && pCount !== undefined) {
          setProjectCount(pCount);
        }

        const { count: cCount } = await supabase
          .from("certifications")
          .select("*", { count: "exact", head: true });

        if (cCount !== null && cCount !== undefined) {
          setCertCount(cCount);
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <section
      id="about"
      className="relative bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white py-12 sm:py-16 px-6 transition-colors duration-500 overflow-hidden"
    >
      {/* Decorative background layers */}
      <DotGridOverlay />
      <CursorGlow />
      <FloatingCodeParticles count={10} />
      <SectionBackdrop label="ABOUT ME" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="mb-10">
          <TerminalLabel path="~/portfolio/about.tsx" />
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight min-h-[50px] sm:min-h-[60px]">
            <TypewriterTitle text={profile.headline} speed={0.03} />
          </h2>
        </div>

        {/* Profile & Bio Row */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Avatar & Stats */}
          <div className="lg:col-span-4 flex items-center gap-5">
            {/* Avatar Circle with hover ring */}
            <motion.div
              whileHover={{ scale: 1.07, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-black/20 dark:border-white/20 shrink-0 bg-slate-200 dark:bg-[#1E1F26] cursor-pointer"
            >
              <img
                src={profile.profile_photo}
                alt={profile.name}
                className="w-full h-full object-cover object-top"
              />
            </motion.div>

            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <h3 className="font-extrabold text-base sm:text-lg text-black dark:text-white uppercase tracking-tight">
                  {profile.name}
                </h3>
                <CheckCircle2 size={16} className="text-blue-500 fill-blue-500/20 shrink-0" />
              </div>

              {/* Stats Grid — with hover highlight */}
              <div className="flex gap-5 pt-1">
                {[
                  { label: "PROJECTS", value: `${projectCount}+` },
                  { label: "CERTIFICATES", value: `${certCount}+` },
                  { label: profile.university.includes("UPN") ? "UPN VETERAN" : profile.university, value: profile.graduation_year },
                ].map(({ label, value }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="cursor-default"
                  >
                    <p className="font-mono text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</p>
                    <p className="font-extrabold text-sm text-black dark:text-white">{value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Bio Text & Resume Link */}
          <div className="lg:col-span-8 space-y-3 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            {profile.bio_line_1 && <p>{profile.bio_line_1}</p>}
            {profile.bio_line_2 && <p>{profile.bio_line_2}</p>}
            {profile.cv_url && (
              <p className="pt-1 font-medium">
                Want to know more about my experience?{" "}
                <motion.a
                  href={profile.cv_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1 text-black dark:text-white font-semibold underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <FileText size={14} /> View full CV / Resume
                </motion.a>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
