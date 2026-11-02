export type SkillGroup = {
  id: string;
  label: string;
  /** Short mono tag rendered next to the group title. */
  tag: string;
  skills: string[];
  /** Groups marked primary get emphasised tags. */
  primary?: boolean;
  /** Shown with an "in progress" marker. */
  inProgress?: boolean;
};

/** The CV's "Technical Skills" block, group for group. */
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages & Frameworks",
    tag: "lang",
    primary: true,
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "React Native", "Redux", "Python", "C++"],
  },
  {
    id: "apis",
    label: "APIs & Integration",
    tag: "api",
    primary: true,
    skills: ["REST", "SOAP", "GraphQL", "OAuth 2.0 / JWT", "Kong", "Broadcom (CA) Layer7", "Apigee", "Oracle WebLogic", "Postman"],
  },
  {
    id: "ai",
    label: "AI & Agentic Systems",
    tag: "ai",
    primary: true,
    skills: ["MCP", "LLM apps & AI agents", "Tool-contract design", "Agent-loop design", "Context management", "LLM evaluation"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    tag: "ops",
    skills: ["Docker", "Kubernetes", "Docker Compose", "Git / GitHub", "CI/CD", "Google Cloud", "Cloudflare R2", "Vercel", "Linux"],
  },
  {
    id: "databases",
    label: "Databases & CMS",
    tag: "data.store",
    skills: ["PostgreSQL", "Supabase", "SQL Server", "MongoDB", "Firebase", "DynamoDB", "Sanity CMS"],
  },
  {
    id: "platforms",
    label: "Platforms & Testing",
    tag: "platform",
    skills: ["Oracle FLEXCUBE", "Shopify", "Vitest", "Unit / integration / E2E testing"],
  },
  {
    id: "ml",
    label: "Data & ML",
    tag: "ml",
    inProgress: true,
    skills: ["Pandas", "NumPy", "Scikit-learn", "SQL", "EDA", "Matplotlib / Seaborn"],
  },
];
