export type Project = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  tools: string[];
  highlights?: string[];
  link: string;
  gradient: string;
  image: string;
  year?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Calmora",
    subtitle: "Mental Health App UI",
    category: "UI/UX Design",
    year: "2024",
    shortDesc:
      "A UI/UX design for a mental health application focused on comfort and emotional well-being.",
    longDesc:
      "Calmora is a mental health application UI designed using a user-centered design approach. The project explores user research, persona creation, wireframing, and interactive prototyping to address emotional well-being. The interface emphasizes calm color palettes, clear typography, and intuitive navigation to create a safe and comforting digital space.",
    tools: ["Figma", "Adobe Illustrator", "User Research"],
    highlights: [
      "User research & persona development",
      "High-fidelity wireframing & prototyping",
      "Calm color palette & typography system",
      "Iterative usability testing",
    ],
    link: "https://www.figma.com/proto/TuFIKxVvu7V3mRNVY5RkLX/Calmora?node-id=161-1386&p=f&t=7LaDlVSSs0cxv5Vt-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=161%3A1386&show-proto-sidebar=1",
    gradient: "from-purple-500 to-pink-500",
    image: "/assets/projects/calmora.png",
  },
  {
    id: 2,
    title: "Ling-Ling Pet Shop",
    subtitle: "Pet Shop Website",
    category: "Web Application",
    year: "2024",
    shortDesc:
      "A pet shop website designed to support business operations and customer interaction.",
    longDesc:
      "Ling-Ling Pet Shop is a web-based system developed to support pet shop business operations and customer interaction. The project includes system planning (SKPL), database design, UI development, and backend implementation. The website enables users to browse products, access service information, and interact with the business efficiently.",
    tools: ["PHP", "Laravel", "MySQL", "Tailwind CSS"],
    highlights: [
      "Full system design document (SKPL)",
      "Responsive product catalog UI",
      "Admin panel for inventory management",
      "Secure user authentication",
    ],
    link: "https://drive.google.com/file/d/1foanQ3oQR5m8P-W67BWYAT2zp_YcGTik/view?usp=drive_link",
    gradient: "from-blue-500 to-cyan-500",
    image: "/assets/projects/petshop.png",
  },
  {
    id: 3,
    title: "Fundly",
    subtitle: "UMKM & Investor App UI",
    category: "UI/UX Design",
    year: "2025",
    shortDesc:
      "A UI/UX design for a platform that connects UMKM owners with potential investors.",
    longDesc:
      "Fundly is a UI/UX design project for a digital platform that connects UMKM owners with potential investors. The design focuses on clarity, trust, and usability by creating structured information architecture and smooth user flows. Visual consistency and intuitive interactions were prioritized to help users understand investment opportunities easily.",
    tools: ["Figma", "Prototyping", "Wireframing"],
    highlights: [
      "BERAKSI 2025 competition entry",
      "End-to-end user flow mapping",
      "Investor & UMKM dual-profile UI",
      "Interactive Figma prototype",
    ],
    link: "https://www.figma.com/design/gvErZhSwhQ1C44Q3Wk9GoW/BerakSI?node-id=0-1&p=f&t=M7NodNtudSWCPLSa-0",
    gradient: "from-green-500 to-teal-500",
    image: "/assets/projects/fundly.png",
  },
  {
    id: 4,
    title: "ETHIQ",
    subtitle: "Sharia Investment Website UI",
    category: "UI/UX Design",
    year: "2024",
    shortDesc:
      "A UI/UX design for a Sharia-based investment website with transparent and structured features.",
    longDesc:
      "ETHIQ is a Sharia-based investment website UI designed to promote transparent and ethical investment activities. The project emphasizes clear information hierarchy, intuitive navigation, and strong visual structure to build user trust. Design decisions were carefully aligned with Sharia investment principles while maintaining a modern and professional appearance.",
    tools: ["Figma", "User Research", "Prototyping"],
    highlights: [
      "Sharia-compliant investment guidelines integrated",
      "High-contrast data visualization",
      "Trust-building visual language",
      "Responsive across devices",
    ],
    link: "https://www.figma.com/proto/XEnj9oXvDtcRUAGmo4Z0Cz/ETHIQ?node-id=470-216&t=laIBdGbpKxmJvp4Q-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=188%3A274",
    gradient: "from-amber-500 to-orange-500",
    image: "/assets/projects/ethiq.png",
  },
  {
    id: 5,
    title: "WasteWise",
    subtitle: "Waste Management Website UI",
    category: "UI/UX Design",
    year: "2024",
    shortDesc: "A UI/UX design for a digital waste management website.",
    longDesc:
      "WasteWise is a UI/UX design project aimed at simplifying digital waste management through an informative and accessible interface. The design process includes user research, wireframing, usability testing, and prototyping to present waste-related data clearly.",
    tools: ["Figma", "Wireframing", "User Testing"],
    highlights: [
      "Environmental data visualization",
      "Accessible & inclusive UI design",
      "User testing with real participants",
      "Clear information hierarchy",
    ],
    link: "https://www.figma.com/proto/XEnj9oXvDtcRUAGmo4Z0Cz/ETHIQ?page-id=0%3A1&node-id=188-274&p=f&viewport=427%2C-508%2C0.05&t=HslFnfqrnrxgb9UT-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=188%3A274",
    gradient: "from-emerald-500 to-green-500",
    image: "/assets/projects/waste.png",
  },
  {
    id: 6,
    title: "Dedikasi",
    subtitle: "UMKM Marketplace UI",
    category: "UI/UX Design",
    year: "2024",
    shortDesc:
      "A UI/UX design for UMKM owners to sell products and connect with investors.",
    longDesc:
      "Dedikasi is a UI/UX design for a marketplace that supports UMKM owners in selling products and connecting with investors. The design focuses on creating a supportive and accessible interface that encourages user engagement and trust.",
    tools: ["Figma", "Prototyping", "User Research"],
    highlights: [
      "Dual user role: seller & investor",
      "Marketplace product listing UI",
      "Trust & transparency design patterns",
      "Interactive prototype flows",
    ],
    link: "https://www.figma.com/proto/XEnj9oXvDtcRUAGmo4Z0Cz/ETHIQ?page-id=0%3A1&node-id=624-1611&viewport=-1629%2C-1000%2C0.04&t=BOfiOlzwOAbOoAfr-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=640%3A1660",
    gradient: "from-indigo-500 to-purple-500",
    image: "/assets/projects/dedikasi.png",
  },
  {
    id: 7,
    title: "Peka-Tsunami",
    subtitle: "Tsunami Awareness Website",
    category: "Web Application",
    year: "2023",
    shortDesc:
      "An informational website designed to increase awareness of tsunami disasters.",
    longDesc:
      "Peka-Tsunami is an informational web platform built to raise public awareness about tsunami disaster preparedness. The system presents critical data, safety tips, and geographic risk zones in a structured and accessible format. Built with PHP and Laravel, it includes an admin panel for managing content and data updates.",
    tools: ["PHP", "Laravel", "MySQL", "Bootstrap"],
    highlights: [
      "Disaster awareness content management",
      "Geographic risk zone visualization",
      "Admin panel for content updates",
      "Public-facing responsive UI",
    ],
    link: "https://github.com/FathanRasyidi/SIMB.git",
    gradient: "from-red-500 to-orange-500",
    image: "/assets/projects/tsunami.png",
  },
  {
    id: 8,
    title: "Kelana",
    subtitle: "Travel App UI Design",
    category: "UI/UX Design",
    year: "2024",
    shortDesc:
      "A travel application UI focused on helping users discover destinations, plan trips, and manage travel experiences intuitively.",
    longDesc:
      "Kelana is a travel app UI project that emphasizes user-centered design, clean navigation, and visual storytelling. The design process includes user research, wireframing, and high-fidelity UI to create an engaging and seamless travel planning experience.",
    tools: ["Figma"],
    highlights: [
      "Destination discovery flow",
      "Trip planning & itinerary UI",
      "Visual storytelling layouts",
      "High-fidelity Figma prototype",
    ],
    link: "https://www.figma.com/proto/6541DjgpMLHoSeEccKjGE9/Kelana?page-id=43%3A21&node-id=214-2808&viewport=219%2C183%2C0.09&t=Xoc6mYWJfzA84F3R-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=214%3A2808&show-proto-sidebar=1",
    gradient: "from-teal-500 to-cyan-500",
    image: "/assets/projects/kelana.png",
  },
  {
    id: 9,
    title: "Remedify",
    subtitle: "Healthcare Mobile App",
    category: "Mobile App",
    year: "2025",
    shortDesc:
      "A healthcare mobile app to check drug ingredients, access medication info, receive reminders, and find nearby pharmacies.",
    longDesc:
      "Remedify is a healthcare mobile application focused on improving medication awareness and adherence. The app allows users to check drug ingredients, view detailed medication information including usage and precautions, receive timely reminders for taking medication, and locate nearby pharmacies based on their location.",
    tools: ["Dart", "Flutter", "REST API"],
    highlights: [
      "Drug ingredient & info lookup",
      "Medication reminder system",
      "Nearby pharmacy geolocation",
      "Clean & accessible mobile UI",
    ],
    link: "https://github.com/dwandk/124230092_Tugas-Akhir-PAM_Andika.git",
    gradient: "from-indigo-500 to-purple-500",
    image: "/assets/projects/Remedify.png",
  },
  {
    id: 10,
    title: "Impact of Rainfall on Crop Yield",
    subtitle: "Data Analytics Dashboard",
    category: "Data Analytics",
    year: "2025",
    shortDesc:
      "A data analytics project analyzing the relationship between rainfall variability and agricultural productivity.",
    longDesc:
      "This project analyzes how changes in rainfall patterns affect crop productivity using statistical analysis and data visualization. The dashboard presents insights through interactive charts to support data-driven conclusions in agricultural planning.",
    tools: ["Python", "R", "Power BI", "Tableau"],
    highlights: [
      "Statistical regression analysis",
      "Interactive BI dashboard",
      "Agricultural data sourcing & cleaning",
      "Predictive trend visualization",
    ],
    link: "https://dashboard-kb-pertanian-india.42web.io/?i=2",
    gradient: "from-emerald-500 to-green-600",
    image: "/assets/projects/Dashboard.png",
  },
  {
    id: 11,
    title: "Rempah Rindu",
    subtitle: "Restaurant Web App",
    category: "Web Application",
    year: "2024",
    shortDesc:
      "A restaurant web application for browsing menus, placing orders, and completing payments with an admin panel.",
    longDesc:
      "Rempah Rindu is a full-featured restaurant web application designed to streamline the ordering and payment process for customers while providing efficient management tools for administrators. The platform allows users to explore food and beverage menus, place orders, and complete transactions smoothly. The admin dashboard supports managing menu items, pricing, availability, and real-time order monitoring.",
    tools: ["PHP", "Laravel", "MySQL", "Bootstrap"],
    highlights: [
      "Full ordering & payment flow",
      "Real-time admin order dashboard",
      "Menu & pricing management",
      "Responsive customer-facing UI",
    ],
    link: "https://github.com/FathanRasyidi/SIMB.git",
    gradient: "from-red-500 to-orange-500",
    image: "/assets/projects/rempah.png",
  },
  {
    id: 12,
    title: "Geopark Klaten Web GIS",
    subtitle: "Interactive Map Platform",
    category: "Web Application",
    year: "2025",
    shortDesc:
      "An interactive web-based GIS platform that displays geopark locations in Klaten with map visualization.",
    longDesc:
      "Geopark Klaten Web GIS is an interactive mapping platform designed to visualize and manage geopark locations in Klaten, Central Java. The system provides an intuitive map interface where users can explore various geological sites, view detailed information about each location, and understand the geographical distribution of geopark areas. Integrates OpenStreetMap with interactive markers and location clustering.",
    tools: ["React JS", "Leaflet", "OpenStreetMap", "CSS"],
    highlights: [
      "OpenStreetMap integration with Leaflet",
      "Interactive location markers & clustering",
      "Geopark site detail info panels",
      "Mobile-responsive map interface",
    ],
    link: "https://dwandk.github.io/geopark_klaten/",
    gradient: "from-blue-500 to-cyan-500",
    image: "/assets/projects/geo.png",
  },
];
