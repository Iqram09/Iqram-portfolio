export type ClientEngagement = {
  name: string;
  url: string;
  domain: string;
  sector: string;
  /** What was delivered, in the CV's words. */
  role: string;
  year: string;
  summary: string;
  technologies: string[];
  /** A capture of the live homepage (1600×900). */
  image: { src: string; w: number; h: number; alt: string };
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  /** Marks the role that is ongoing. */
  current?: boolean;
  /** Freelance roles list their clients instead of plain bullets. */
  clients?: ClientEngagement[];
  summary: string[];
  technologies: string[];
};

/** Freelance client work — both sites are live. Copied from the CV, nothing added. */
export const clients: ClientEngagement[] = [
  {
    name: "Stans Buildtech",
    url: "https://stansbuildtech.com",
    domain: "stansbuildtech.com",
    sector: "Real estate developer · Mumbai",
    role: "Website + full backend",
    year: "2026",
    image: {
      src: "/work/stans-buildtech.jpg",
      w: 1600,
      h: 900,
      alt: "The live stansbuildtech.com homepage: the Vantage residential tower at dusk on a Mumbai street, under the site navigation.",
    },
    summary:
      "Built the site and the full backend in Next.js and TypeScript: enquiry and careers APIs on PostgreSQL (moved from Docker to Supabase) and Cloudflare R2 storage.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Cloudflare R2"],
  },
  {
    name: "Proximo",
    url: "https://www.proximoshirts.com",
    domain: "proximoshirts.com",
    sector: "D2C menswear brand",
    role: "Shopify storefront",
    year: "2026",
    image: {
      src: "/work/proximo.jpg",
      w: 1600,
      h: 900,
      alt: "The live proximoshirts.com homepage: a striped shirt and pinstripe trousers on a warm backdrop, under the Proximo navigation.",
    },
    summary: "Launched a Shopify storefront for the brand on a customised theme.",
    technologies: ["Shopify", "Theme customisation"],
  },
];

/** Verified against the CV in /public. No metrics are invented. */
export const experience: Experience[] = [
  {
    role: "Freelance Full-Stack Developer",
    company: "Independent",
    location: "Mumbai",
    start: "Mar 2026",
    end: "Present",
    current: true,
    clients,
    summary: [],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Cloudflare R2", "Shopify"],
  },
  {
    role: "Associate Consultant",
    company: "Allied Globetech",
    location: "Mumbai",
    start: "May 2025",
    end: "Feb 2026",
    summary: [
      "Integrated enterprise API gateways (Kong, CA Layer7, Apigee) across 3+ client projects, standardising authentication and cutting integration setup time for new services.",
      "Worked on-site at a leading private-sector bank (client under NDA) on Broadcom Layer7 API integration around the Oracle FLEXCUBE core-banking platform, using Docker, Kubernetes and SQL.",
      "Delivered Oracle WebLogic integration services, exposing and consuming REST and SOAP APIs (client under NDA).",
      "Built React / TypeScript / MongoDB reporting dashboards with real-time KPI visibility, replacing manual spreadsheets.",
    ],
    technologies: ["Kong", "Broadcom Layer7", "Apigee", "Oracle FLEXCUBE", "Oracle WebLogic", "Kubernetes", "Docker", "React", "MongoDB"],
  },
  {
    role: "Software Developer",
    company: "Take Solutions",
    location: "Mumbai",
    start: "Feb 2023",
    end: "Apr 2025",
    summary: [
      "Built and shipped scalable web applications end-to-end, from UI/UX prototypes to production deployment.",
      "Designed and consumed REST APIs powering core application features across frontend and backend.",
      "Worked in full Agile delivery cycles with sprint planning, automated testing, and CI/CD-based deployments.",
    ],
    technologies: ["React", "TypeScript", "Node.js", "REST APIs", "CI/CD"],
  },
];

export const education = {
  degree: "B.Sc. Information Technology",
  institution: "Mumbai University",
  period: "2020 – 2023",
};

export const learning = {
  programme: "Data Science Foundation Bootcamp + Virtual Internship",
  provider: "Codebasics",
  status: "ongoing",
  areas: ["Python", "Pandas", "NumPy", "Scikit-learn", "SQL", "EDA"],
};
