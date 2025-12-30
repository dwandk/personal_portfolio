import { ReactNode } from "react";

export const skillCategories: {
  title: string;
  icon: ReactNode;
  skills: string[];
}[] = [
  {
    title: "UI/UX Design",
    icon: (
      <svg className="w-8 h-8 text-teal-400" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          fill="currentColor"
          opacity="0.3"
        />
        <path
          d="M2 17L12 22L22 17M2 12L12 17L22 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    skills: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Figma",
    ],
  },
  {
    title: "Web Development",
    icon: (
      <svg className="w-8 h-8 text-teal-400" viewBox="0 0 24 24" fill="none">
        <path
          d="M16 18L22 12L16 6M8 6L2 12L8 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    skills: [
      "PHP",
      "Laravel",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Computer Networks",
    icon: (
      <svg className="w-8 h-8 text-teal-400" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path
          d="M2 12H22M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    skills: [
      "Mikrotik Configuration",
      "Network Security",
      "Routing & Switching",
      "Troubleshooting",
    ],
  },
  {
    title: "Data Analysis",
    icon: (
      <svg className="w-8 h-8 text-teal-400" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          fill="currentColor"
          opacity="0.3"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          fill="currentColor"
          opacity="0.5"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
          fill="currentColor"
          opacity="0.7"
        />
        <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
      </svg>
    ),
    skills: ["SQL", "Power BI", "Data Visualization", "Statistical Analysis"],
  },
  {
    title: "System Analyst",
    icon: (
      <svg className="w-8 h-8 text-teal-400" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="4"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M7 20H17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 8H16M8 12H14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    skills: [
      "System Analysis & Design",
      "Business Process Modeling",
      "Use Case & UML Diagram",
      "Functional Specification",
    ],
  },
];
