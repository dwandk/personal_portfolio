"use client";

import { motion } from "framer-motion";

export default function About() {
  const skills = [
    { title: "UI/UX Design" },
    { title: "Web Development" },
    { title: "Computer Networks" },
    { title: "Data Analysis" },
    { title: "System Analyst" },
  ];

  return (

    <section
      id="about"
      className="relative bg-transparent overflow-hidden font-montserrat"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
         
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/assets/projects/Andika.png"
                alt="Andika Dwi Prasetya"
                className="w-full h-full transition-all duration-700 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-bold tracking-widest uppercase mb-6">
              About Me
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Andika Dwi Prasetya
            </h2>

            <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
              <p>
                I am an Information Systems student at{" "}
                <span className="text-white font-medium">
                  UPN "Veteran" Yogyakarta
                </span>{" "}
                who enjoys turning ideas into meaningful digital experiences. My
                journey began with a curiosity about how technology can solve
                real-world problems and support business goals.
              </p>

              <p>
                Along the way, I discovered a strong interest in{" "}
                <span className="text-white font-medium">UI/UX Design</span> and{" "}
                <span className="text-white font-medium">Web Development</span>.
                I enjoy designing intuitive interfaces with Figma and bringing
                them to life using Laravel, React, and Tailwind. Beyond
                development, I also explore networking with Mikrotik and data
                analysis using SQL and Power BI to better understand how systems
                and data work behind the scenes.
              </p>
            </div>

           
            <div className="flex flex-wrap gap-3 mt-10">
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -5,
                    backgroundColor: "rgba(20, 184, 166, 0.1)",
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-teal-400 flex items-center gap-3 transition-all cursor-default backdrop-blur-sm"
                >
                  {skill.title}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
