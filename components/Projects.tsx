"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="py-10 bg-transparent relative overflow-hidden font-montserrat"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          // DIUBAH: mb-6 -> mb-10 (Jarak header ke filter ditambah sedikit)
          className="text-center mb-10"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-bold tracking-widest uppercase mb-4">
            Portfolio
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            Featured <span className="text-teal-400">Projects</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
            Discover my latest work in design and development
          </p>
        </motion.div>

        {/* FILTER - Ukuran tetap besar, jarak bawah ditambah dikit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          // DIUBAH: mb-8 -> mb-12 (Jarak filter ke grid ditambah sedikit)
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {["All", "UI/UX Design", "Web Development", "Mobile Apps", "Data Analytics"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-8 py-3.5 rounded-full text-sm font-extrabold transition-all duration-300 border-2 ${
                activeCategory === cat
                  ? "text-white border-teal-500 bg-teal-500/20 shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                  : "text-neutral-400 border-white/10 bg-white/5 hover:border-white/30 hover:text-white"
              }`}
            >
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="h-[480px]"
              style={{ perspective: "1500px" }}
            >
              <div
                className="relative w-full h-full transition-transform duration-700 shadow-2xl"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedCards[project.id] ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* FRONT CARD */}
                <div
                  className="absolute w-full h-full rounded-3xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <motion.img
                      animate={{ scale: hoveredCard === project.id ? 1.1 : 1 }}
                      transition={{ duration: 0.6 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-xs text-teal-400 font-bold uppercase tracking-widest mb-4">
                      {project.category}
                    </p>
                    <p className="text-sm text-neutral-400 mb-6 line-clamp-2 leading-relaxed">
                      {project.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tools.slice(0, 3).map((tool) => (
                        <span key={tool} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-neutral-300 font-bold uppercase">
                          {tool}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleFlip(project.id)}
                      className="w-full py-3 rounded-xl bg-teal-600 text-white text-xs font-black uppercase tracking-widest hover:bg-teal-500 transition-all shadow-lg shadow-teal-900/20"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* BACK CARD */}
                <div
                  className="absolute w-full h-full rounded-3xl bg-neutral-900 border-2 border-teal-500/30 p-8 flex flex-col backdrop-blur-xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-teal-400">{project.title}</h3>
                    <button 
                      onClick={() => toggleFlip(project.id)}
                      className="text-neutral-500 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-6 text-sm text-neutral-300 leading-relaxed">
                    {project.longDesc}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    className="w-full py-3 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest text-center hover:bg-teal-400 transition-all"
                  >
                    Launch Case Study
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2dd4bf;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}