export interface ExperienceItem {
  id: number;
  period: string;
  role: string;
  organization: string;
  type: string;
  location: string;
  description: string;
  highlights: string[];
  status?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    period: "2023 — Present",
    role: "Information Systems Student",
    organization: 'UPN "Veteran" Yogyakarta',
    type: "Education",
    location: "Yogyakarta, Indonesia",
    status: "Active Student",
    description:
      "Undergraduate student in Information Systems. Focused on System Analysis & Design, Web Development, UI/UX Design, Computer Networks, and Data Analytics.",
    highlights: [
      "System Analysis & Database Design",
      "UI/UX Design & Frontend Development",
      "Network Infrastructure & Mikrotik",
      "Data Analytics with SQL & Power BI"
    ]
  },
  {
    id: 2,
    period: "2025",
    role: "2nd Place UX Competition Winner",
    organization: "BERAKSI 2025 UX Competition",
    type: "Achievement",
    location: "National Level",
    status: "Awarded",
    description:
      "Awarded 2nd Place in BERAKSI 2025 National UX Competition. Conducted user research, user journey mapping, high-fidelity wireframing, and interactive prototyping for digital solutions.",
    highlights: [
      "2nd Place National Winner",
      "User-Centered Design Methodology",
      "Interactive High-Fidelity Prototype"
    ]
  },
  {
    id: 3,
    period: "2025",
    role: "Certified Network Engineer",
    organization: "BNSP Indonesia",
    type: "Certification",
    location: "Indonesia",
    status: "Certified",
    description:
      "Achieved official national network engineering competency certification from BNSP Indonesia, validating skills in network topology design, Mikrotik routing, security, and hardware troubleshooting.",
    highlights: [
      "BNSP National Certification",
      "Mikrotik Routing & Security",
      "Network Infrastructure Management"
    ]
  },
  {
    id: 4,
    period: "2025",
    role: "Google Project Management Scholar",
    organization: "Google x KOMDIGI",
    type: "Professional Course",
    location: "Online",
    status: "Completed",
    description:
      "Completed intensive professional program covering Agile & Scrum project management, sprint planning, risk assessment, stakeholder communications, and software project lifecycles.",
    highlights: [
      "Agile & Scrum Methodologies",
      "Project Lifecycle & Sprint Management",
      "Stakeholder Communication"
    ]
  }
];
