import { kong, headlineMetrics } from "./kong";

export type ProjectCategory = "ai-systems" | "full-stack" | "data";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  year: string;
  featured: boolean;
  /** Internal route (case study) if one exists. */
  href?: string;
  github?: string;
  images?: { src: string; alt: string; w: number; h: number }[];
  metrics?: { value: string; label: string }[];
  /** Points at the case-study dataset for the flagship project. */
  caseStudy?: typeof kong;
};

export const projectFilters = [
  { id: "featured", label: "Featured" },
  { id: "ai-systems", label: "AI / Systems" },
  { id: "full-stack", label: "Full-Stack" },
  { id: "data", label: "Data" },
] as const;

export type ProjectFilterId = (typeof projectFilters)[number]["id"];

export const projects: Project[] = [
  {
    slug: kong.slug,
    title: kong.title,
    subtitle: kong.subtitle,
    description:
      "An MCP server that lets an LLM agent investigate a Kong Gateway through fourteen read-only, bounded, schema-validated tools — with a deterministic diagnostic engine producing the facts, a bounded agent loop producing the explanation, and an evaluation harness measuring whether it works.",
    category: "ai-systems",
    technologies: kong.githubTags,
    year: "2026",
    featured: true,
    href: `/projects/${kong.slug}`,
    github: kong.repo,
    metrics: headlineMetrics.map((m) => ({ value: `${m.value}${m.suffix}`, label: m.label })),
    caseStudy: kong,
  },
  {
    slug: "ecommerce-dashboard",
    title: "Ecommerce Dashboard",
    subtitle: "Internal analytics",
    description:
      "Internal analytics dashboard built at Allied Globetech for KPI visibility and reporting.",
    category: "full-stack",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    year: "2025",
    featured: false,
    github: "https://github.com/Iqram09/Ecommerce",
  },
  {
    slug: "food-delivery-app",
    title: "Food Delivery App",
    subtitle: "Cross-platform mobile",
    description:
      "Cross-platform mobile application with map tracking, cart state management and CMS integration.",
    category: "full-stack",
    technologies: ["React Native", "Redux", "Google Maps", "Sanity.io", "AWS Amplify"],
    year: "2023",
    featured: false,
    github: "https://github.com/Iqram09/Deliveroo-clone",
  },
  {
    slug: "streaming-platform",
    title: "Streaming Platform",
    subtitle: "Subscription web app",
    description:
      "Subscription-oriented streaming application with authentication, billing integration and server-side rendering.",
    category: "full-stack",
    technologies: ["Next.js", "Firebase Auth", "Tailwind CSS", "Stripe"],
    year: "2023",
    featured: false,
    github: "https://github.com/Iqram09/Netflix-clone",
  },
  {
    slug: "data-science-projects",
    title: "Data Science Projects",
    subtitle: "Bootcamp + virtual internship",
    description:
      "EDA, feature engineering, statistics and machine-learning projects.",
    category: "data",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    year: "2025",
    featured: false,
    github: "https://github.com/Iqram09/codebasics-ds-bootcamp",
  },
];

export const featuredProject = projects[0];

export function filterProjects(filter: ProjectFilterId): Project[] {
  if (filter === "featured") {
    // Kong first, then the rest in declared order.
    return [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  }
  return projects.filter((p) => p.category === filter);
}
