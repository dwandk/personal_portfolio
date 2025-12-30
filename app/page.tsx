"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Contact from "@/components/Kontak";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Logic Mouse Tracking Global
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  // Parallax untuk background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative bg-[#030303] text-white overflow-x-hidden selection:bg-teal-500/30">
      {/* --- LAYER BACKGROUND IT-THEMED (ENHANCED ANIMATIONS) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        
        {/* Binary Code Rain Effect */}
        {mounted && Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            initial={{ 
              x: (i * (typeof window !== 'undefined' ? window.innerWidth : 1000) / 20),
              y: -100,
              opacity: 0
            }}
            animate={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
              opacity: [0, 0.3, 0.3, 0],
            }}
            transition={{ 
              duration: Math.random() * 10 + 15, 
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute text-teal-500/30 text-xs font-mono"
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="leading-tight">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </motion.div>
        ))}

        {/* Floating Code Brackets & Symbols */}
        {mounted && ['<', '>', '{', '}', '[', ']', '( )', '< />', '::'].map((symbol, i) => (
          <motion.div
            key={`symbol-${i}`}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0
            }}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0, 0.2, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: Math.random() * 8 + 5, 
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
            className="absolute text-4xl font-mono text-blue-400/20"
          >
            {symbol}
          </motion.div>
        ))}

        {/* Circuit Board Lines - Horizontal */}
        <motion.svg className="absolute inset-0 w-full h-full" style={{ y: y1 }}>
          <motion.line
            x1="0" y1="20%" x2="100%" y2="20%"
            stroke="url(#gradient1)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 0.3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          />
          <motion.line
            x1="0" y1="60%" x2="100%" y2="60%"
            stroke="url(#gradient2)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 0.3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2, repeatDelay: 2 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
              <stop offset="50%" stopColor="#14b8a6" stopOpacity="1" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Data Packets Moving */}
        {mounted && Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`packet-${i}`}
            initial={{ 
              x: -50,
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{ 
              x: typeof window !== 'undefined' ? window.innerWidth + 50 : 1000,
            }}
            transition={{ 
              duration: Math.random() * 10 + 8, 
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-2 h-2 bg-teal-500/40 rounded-full"
            style={{
              boxShadow: '0 0 10px rgba(20, 184, 166, 0.6)'
            }}
          />
        ))}

        {/* Floating Gradient Orbs - IT themed colors */}
        <motion.div
          style={{ y: y1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 -left-20 w-[500px] h-[500px] bg-gradient-radial from-blue-600/20 via-blue-500/10 to-transparent rounded-full blur-[100px]"
        />
        
        <motion.div
          style={{ y: y2 }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 
          }}
          className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/20 via-cyan-500/10 to-transparent rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, 100, 0],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2 
          }}
          className="absolute bottom-20 left-1/4 w-[450px] h-[450px] bg-gradient-radial from-teal-500/25 via-teal-500/10 to-transparent rounded-full blur-[100px]"
        />

        {/* Mouse Follow Glow - Enhanced Blue/Teal */}
        <motion.div
          style={{ x: dx, y: dy }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/25 via-teal-500/15 to-transparent rounded-full blur-[80px]"
        />

        {/* Digital Particles (像素點) */}
        {mounted && Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: 0,
              opacity: 0
            }}
            animate={{ 
              scale: [0, 1.5, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{ 
              duration: Math.random() * 4 + 3, 
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-sm"
            style={{
              boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)'
            }}
          />
        ))}

        {/* Network Nodes Connection */}
        {mounted && Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`node-${i}`}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-3 h-3 border-2 border-teal-500/40 rounded-full bg-teal-500/10"
            style={{
              boxShadow: '0 0 15px rgba(20, 184, 166, 0.4)'
            }}
          />
        ))}

        {/* Hexagon Tech Patterns */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[15%] right-[10%] w-32 h-32 opacity-10"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            border: '2px solid rgba(20, 184, 166, 0.3)',
          }}
        />

        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-[20%] left-[15%] w-24 h-24 opacity-10"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            border: '2px solid rgba(59, 130, 246, 0.3)',
          }}
        />

        {/* Terminal Cursor Blink */}
        <motion.div
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-20 w-2 h-6 bg-teal-400"
        />

        {/* Tekstur Noise halus */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"></div>
      </div>

      {/* --- KONTEN UTAMA --- */}
      <div className="relative z-10">
        <Navbar />
        {/* Berikan pembungkus transparan agar grid di bawahnya terlihat */}
        <div className="bg-transparent">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}