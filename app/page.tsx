"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import ActivityGallery from "@/components/ActivityGallery";
import Certifications from "@/components/Certifications";
import MarqueeRibbons from "@/components/MarqueeRibbons";
import Contact from "@/components/Kontak";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="relative min-h-screen bg-[#F3F3F5] dark:bg-[#0E0F12] text-[#121316] dark:text-white transition-colors duration-500 font-sans">
        <Navbar />
        <Hero />
        <About />
        <MarqueeRibbons />
        <Skills />
        <Projects />
        <Certifications />
        <ActivityGallery />
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
}