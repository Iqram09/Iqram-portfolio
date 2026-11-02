export type ProjectCategory = "Mobile" | "Web" | "Data";

export type Project = {
  slug: string;
  title: string;
  /** The CV's short framing, e.g. "Deliveroo-style". */
  subtitle: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  github: string;
};

/** Side projects from the CV. Kong is the flagship and lives in data/kong.ts. */
export const projects: Project[] = [
  {
    slug: "food-delivery-app",
    title: "Food Delivery App",
    subtitle: "Deliveroo-style",
    description:
      "Cross-platform mobile app with real-time map tracking, basket and order flow, and a headless CMS backend.",
    category: "Mobile",
    technologies: ["React Native", "Redux", "Google Maps", "Sanity.io", "AWS Amplify"],
    github: "https://github.com/Iqram09/Deliveroo-clone",
  },
  {
    slug: "streaming-platform",
    title: "Streaming Platform",
    subtitle: "Netflix-style",
    description:
      "Subscription-based streaming UI with Firebase authentication, Stripe billing, and server-side rendering.",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Firebase Auth", "Stripe", "TailwindCSS"],
    github: "https://github.com/Iqram09/Netflix-Clone",
  },
  {
    slug: "hospitality-expense-analysis",
    title: "Hospitality & Expense Data Analysis",
    subtitle: "Codebasics bootcamp",
    description:
      "End-to-end EDA: cleaned raw datasets and visualised occupancy, revenue, and spending trends.",
    category: "Data",
    technologies: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    github: "https://github.com/Iqram09/codebasics-ds-bootcamp",
  },
];
