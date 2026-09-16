export const caseSections = [
  { id: "problem", n: "01", title: "Problem" },
  { id: "architecture", n: "02", title: "Architecture" },
  { id: "tooling", n: "03", title: "MCP Tooling" },
  { id: "agent", n: "04", title: "Agentic Workflow" },
  { id: "context", n: "05", title: "Context Management" },
  { id: "safety", n: "06", title: "Safety" },
  { id: "observability", n: "07", title: "Observability" },
  { id: "evaluation", n: "08", title: "Evaluation" },
  { id: "failure-modes", n: "09", title: "Failure Modes" },
  { id: "testing", n: "10", title: "Testing" },
  { id: "limitations", n: "11", title: "Limitations" },
] as const;

export type CaseSectionId = (typeof caseSections)[number]["id"];
