export interface ActivityPhoto {
  id: number;
  src: string;
  title: string;
  caption: string;
  category: string;
}

export const activityPhotos: ActivityPhoto[] = [
  {
    id: 1,
    src: "/assets/projects/Beraksi.png",
    title: "BERAKSI 2025 UX Competition",
    caption: "2nd Place Winners at BERAKSI 2025 National UX Competition — presenting user research & Figma prototypes.",
    category: "COMPETITION",
  },
  {
    id: 2,
    src: "/assets/projects/Andika.png",
    title: "Campus & Organizational Activities",
    caption: "Information Systems student, organizing tech events and campus initiatives at UPN Veteran Yogyakarta.",
    category: "FEATURED",
  },
  {
    id: 3,
    src: "/assets/projects/BNSP.jpg",
    title: "BNSP Network Engineer Certification",
    caption: "Official Network Engineering competency assessment certified by BNSP Indonesia.",
    category: "CERTIFICATION",
  },
  {
    id: 4,
    src: "/assets/projects/PM.png",
    title: "Google Project Management Scholar",
    caption: "Participating in Google Project Management & Agile Sprint workshops, organized by KOMDIGI.",
    category: "COURSE",
  },
  {
    id: 5,
    src: "/assets/projects/IBM.png",
    title: "IBM Data Analytics Certification",
    caption: "Hands-on data classification, governance, and analytical model building with IBM.",
    category: "DATA",
  },
];
