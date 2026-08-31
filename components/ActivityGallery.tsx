"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles } from "lucide-react";
import { activityPhotos as FALLBACK_PHOTOS, ActivityPhoto } from "@/data/gallery";
import TypewriterTitle from "./TypewriterTitle";
import { SectionBackdrop, FloatingCodeParticles, CursorGlow, DotGridOverlay, TerminalLabel } from "./SectionDecorations";
import { supabase } from "@/lib/supabase";

export default function ActivityGallery() {
  const [photos, setPhotos] = useState<ActivityPhoto[]>(FALLBACK_PHOTOS);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<ActivityPhoto | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const { data } = await supabase
          .from("activities")
          .select("*")
          .order("display_order", { ascending: true });

        if (data && data.length > 0) {
          const mapped: ActivityPhoto[] = data.map((a, idx) => ({
            id: idx + 1,
            src: a.image,
            title: a.title,
            caption: a.caption,
            category: a.category || "EVENT",
          }));
          setPhotos(mapped);
          setActiveIndex(Math.floor(mapped.length / 2));
        } else {
          setActiveIndex(Math.floor(FALLBACK_PHOTOS.length / 2));
        }
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    }
    fetchActivities();
  }, []);

  const N = photos.length;

  return (
    <section
      id="gallery"
      className="relative bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white py-12 sm:py-16 px-6 transition-colors duration-500 overflow-hidden"
    >
      <DotGridOverlay />
      <CursorGlow />
      <FloatingCodeParticles count={6} />
      <SectionBackdrop label="ACTIVITIES" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        
        {/* Header Section */}
        <div className="mb-6">
          <TerminalLabel path="~/portfolio/activities.tsx" />
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight min-h-[40px]">
            <TypewriterTitle text="Activities" />
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Interactive snapshot gallery of moments, campus events, and organizational activities.
          </p>
        </div>

        {/* 3D Infinite Loop Cover Flow Carousel Container */}
        <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center [perspective:1200px] select-none my-2">
          {photos.map((photo, index) => {
            let offset = index - activeIndex;
            if (offset > N / 2) offset -= N;
            if (offset < -N / 2) offset += N;

            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            let rotateY = offset * -28;
            let translateX = offset * 160;
            let translateZ = -absOffset * 150;
            let scale = 1 - absOffset * 0.12;
            let opacity = 1 - absOffset * 0.25;

            if (absOffset > 2) {
              opacity = 0;
            }

            return (
              <motion.div
                key={photo.id}
                onClick={() => {
                  if (isCenter) {
                    setSelectedPhoto(photo);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: 100 - absOffset * 10,
                }}
                className={`absolute w-[220px] sm:w-[320px] h-[280px] sm:h-[340px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl border transition-all duration-300 ${
                  isCenter
                    ? "border-black/30 dark:border-white/40 ring-4 ring-black/10 dark:ring-white/20"
                    : "border-black/10 dark:border-white/10 opacity-70 hover:opacity-100"
                } bg-[#18191E] group`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[9px] font-bold uppercase tracking-wider border border-white/20">
                    {photo.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-sm sm:text-base leading-tight mb-1 line-clamp-1 group-hover:text-blue-300 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-300 line-clamp-2 leading-snug">
                    {photo.caption}
                  </p>
                  
                  {isCenter && (
                    <div className="mt-2.5 flex items-center gap-1 font-mono text-[9px] text-blue-400 font-bold uppercase tracking-wider">
                      <ZoomIn size={12} /> Click to expand
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 bg-black dark:bg-white"
                  : "w-1.5 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal for Photo Details */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-white dark:bg-[#14151A] border border-black/20 dark:border-white/20 rounded-2xl overflow-hidden shadow-2xl cursor-default"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors border border-white/20"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 sm:p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                    {selectedPhoto.category}
                  </span>
                  <span className="font-mono text-xs text-slate-400 font-medium">Activity Snapshot</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-black dark:text-white">
                  {selectedPhoto.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
