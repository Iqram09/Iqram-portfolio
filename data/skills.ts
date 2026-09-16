export type SkillGroup = {
  id: string;
  label: string;
  /** Short mono tag rendered next to the group title. */
  tag: string;
  skills: string[];
  /** Groups marked primary get the wider column and emphasised tags. */
  primary?: boolean;
  /** Column span on the 6-column desktop grid. */
  span: 2 | 3;
};

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    label: "AI / Agentic",
    tag: "ai.agentic",
    primary: true,
    span: 3,
    skills: [
      "MCP",
      "LLM Applications",
      "Agentic Workflows",
      "Tool Calling",
      "Prompt Engineering",
      "Context Management",
      "LLM Evaluation",
      "Observability",
      "AI Coding Assistants",
    ],
  },
  {
    id: "apis",
    label: "APIs / Architecture",
    tag: "api.arch",
    primary: true,
    span: 3,
    skills: ["REST", "GraphQL", "OAuth 2.0", "JWT", "Kong", "CA Layer7", "Apigee", "Postman"],
  },
  {
    id: "frontend",
    label: "Frontend",
    tag: "frontend",
    span: 2,
    skills: ["React", "Next.js", "TypeScript", "React Native", "Redux", "TailwindCSS"],
  },
  {
    id: "backend",
    label: "Backend",
    tag: "backend",
    span: 2,
    skills: ["Node.js", "Python", "FastAPI"],
  },
  {
    id: "cloud",
    label: "Cloud / DevOps",
    tag: "cloud.devops",
    span: 2,
    skills: ["Docker", "Git", "GitHub", "CI/CD", "Google Cloud", "AWS", "Linux"],
  },
  {
    id: "data",
    label: "Data",
    tag: "data",
    span: 3,
    skills: ["Pandas", "NumPy", "Scikit-learn", "SQL", "EDA", "Matplotlib", "Seaborn"],
  },
  {
    id: "databases",
    label: "Databases",
    tag: "databases",
    span: 3,
    skills: ["MongoDB", "Firebase", "DynamoDB", "SQL Server"],
  },
];
