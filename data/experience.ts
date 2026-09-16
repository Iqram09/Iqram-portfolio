export type Experience = {
  role: string;
  company: string;
  companyShort?: string;
  location: string;
  start: string;
  end: string;
  /** Renders the entry visually smaller (e.g. non-engineering roles). */
  minor?: boolean;
  summary: string[];
  technologies: string[];
};

/** Verified against the CV in /public. No metrics are invented. */
export const experience: Experience[] = [
  {
    role: "Associate Consultant",
    company: "Allied Globetech",
    location: "Mumbai",
    start: "May 2025",
    end: "Feb 2026",
    summary: [
      "Designed and integrated enterprise API gateway solutions using Kong, CA Layer7 and Apigee across multiple client projects, standardising authentication and service-integration patterns.",
      "Built internal React / TypeScript / MongoDB reporting platforms that gave consulting teams visibility into project KPIs, replacing spreadsheet-based reporting.",
      "Worked across requirements, implementation, testing, deployment and release sign-off with client stakeholders through Agile delivery cycles.",
    ],
    technologies: ["Kong", "CA Layer7", "Apigee", "React", "TypeScript", "MongoDB", "REST APIs"],
  },
  {
    role: "Software Developer",
    company: "Take Solutions",
    location: "Mumbai",
    start: "May 2024",
    end: "Apr 2025",
    summary: [
      "Built and maintained full-stack web applications across frontend, backend, API integration, testing and deployment.",
      "Designed and consumed REST APIs supporting core application workflows, integrating frontend applications with backend services.",
      "Participated across the delivery lifecycle — sprint planning, automated testing, CI/CD, deployment and production support.",
    ],
    technologies: ["React", "TypeScript", "Node.js", "REST APIs", "CI/CD"],
  },
  {
    role: "Graphic Design Intern",
    company: "Collective Heads Exp Mktg Sol Pvt Ltd",
    companyShort: "Collective Heads",
    location: "Mumbai",
    start: "Oct 2023",
    end: "Apr 2024",
    minor: true,
    summary: [
      "Created visual assets, event designs and marketing collateral using Adobe Creative Suite.",
    ],
    technologies: ["Adobe Creative Suite"],
  },
];

export const education = {
  degree: "B.Sc. Information Technology",
  institution: "Mumbai University",
  period: "2020 – 2023",
};

export const learning = {
  programme: "Data Science Bootcamp + Virtual Internship",
  provider: "Codebasics",
  status: "ongoing",
  areas: ["Python", "Machine Learning", "Statistics", "EDA", "SQL"],
};
