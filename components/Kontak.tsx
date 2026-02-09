"use client";

import { motion } from "framer-motion";

export default function Contact() {

  const FORMSPREE_ID = "MASUKKAN_ID_KAMU_DISINI"; 

  const contactData = [
    {
      label: "Email",
      value: "andikaprsty24@gmail.com",
      link: "mailto:andikaprsty24@gmail.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: "Whatsapp",
      value: "+62-856-0331-5076",
      link: "https://wa.me/6285603315076",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "Andika Dwi Prasetya",
      link: "https://www.linkedin.com/in/andika-dwi-prasetya-4b70482b4",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      value: "@andikaprsty__",
      link: "https://instagram.com/andikaprsty__",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="py-20 bg-transparent text-white relative overflow-hidden font-montserrat">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-bold tracking-widest uppercase mb-4">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Let's Work <span className="text-teal-400">Together</span>
          </h2>
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto leading-relaxed text-sm">
            Have an interesting idea? Let’s collaborate and create something impactful together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
         
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-rows-4 gap-4"
          >
            {contactData.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-5 rounded-[1.5rem] bg-white/5 border border-white/10 hover:border-teal-500/40 hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{item.label}</p>
                  <p className="text-white font-medium group-hover:text-teal-400 transition-colors truncate">{item.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

        
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col justify-center"
          >
         
            <form action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST" className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name" 
                    required
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email" 
                    required
                    placeholder="your@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Project Inquiry"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Message</label>
                <textarea
                  name="message" 
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all text-sm resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 mt-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-teal-500/20 active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}