"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Certifications() {
  const certs = [
    {
      title: "2nd Place UX Competition BERAKSI 2025",
      issuer: "BERAKSI",
      date: "2025",
      category: "Design",
      image: "/assets/projects/Beraksi.png",
      description: "Achieved 2nd place in the BERAKSI 2025 UX Competition by delivering a user-centered digital solution.",
    },
    {
      title: "Network Engineer Certification (BNSP)",
      issuer: "BNSP Indonesia",
      date: "2025",
      category: "Network",
      image: "/assets/projects/BNSP.jpg",
      description: "Certified Network Engineer, demonstrating competencies in network configuration and infrastructure.",
    },
    {
      title: "IBM Data Classification",
      issuer: "IBM",
      date: "2025",
      category: "Data",
      image: "/assets/projects/IBM.png",
      description: "Gaining knowledge in data categorization, governance, and data-driven decision making.",
    },
    {
      title: "Google Project Manager – KOMDIGI",
      issuer: "Google x KOMDIGI",
      date: "2025",
      category: "Management",
      image: "/assets/projects/PM.png",
      description: "Covering agile methodologies, stakeholder communication, and project lifecycle management.",
    },
  ];

  return (
    <section id="certifications" className="py-15 bg-transparent font-montserrat overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-bold tracking-widest uppercase mb-4">
            Achievements
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Certifications & <span className="text-teal-400">Awards</span>
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={28}
            slidesPerView={1}
            centeredSlides={false}
            pagination={{ 
              clickable: true,
              el: '.custom-pagination' // Menggunakan class custom agar mudah diatur posisinya
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10 cert-swiper"
          >
            {certs.map((cert, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="group h-full bg-[#111111]/40 border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-md hover:border-teal-500/40 transition-all duration-500 flex flex-col hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.15)]">
                  
                  {/* Image Container */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                       <span className="px-3 py-1 rounded-full bg-teal-500 text-black text-[10px] font-black uppercase tracking-wider">
                        {cert.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors line-clamp-2 leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-widest mb-4">
                      {cert.issuer} • {cert.date}
                    </p>
                    <p className="text-sm text-neutral-400/90 line-clamp-3 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* CUSTOM PAGINATION CONTAINER - Dipastikan Tengah */}
          <div className="custom-pagination flex justify-center items-center gap-2 mt-10 w-full"></div>
        </div>
      </div>

      <style jsx global>{`
        /* Memastikan titik-titik (bullets) tampil rapi di tengah */
        .custom-pagination {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }

        .custom-pagination .swiper-pagination-bullet {
          background: #333333 !important;
          opacity: 1 !important;
          margin: 0 4px !important;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .custom-pagination .swiper-pagination-bullet-active {
          background: #2dd4bf !important;
          width: 24px !important; /* Membuat lonjong saat aktif */
          border-radius: 10px !important;
        }
      `}</style>
    </section>
  );
}