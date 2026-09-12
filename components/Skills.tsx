export default function Skills() {
  const skillGroups = [
    {
      category: "AI & Agentic",
      skills: ["MCP", "LLM Applications", "Agentic Workflows", "Tool Calling", "Prompt Engineering", "Context Management", "LLM Evaluation", "Observability", "AI Coding Assistants"]
    },
    {
      category: "Backend & APIs",
      skills: ["Node.js", "REST", "GraphQL", "OAuth 2.0", "JWT", "Kong", "CA Layer7", "Apigee"]
    },
    {
      category: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "React Native", "Redux"]
    },
    {
      category: "Cloud & DevOps",
      skills: ["Docker", "Git", "GitHub", "CI/CD", "Google Cloud", "AWS", "Linux"]
    },
    {
      category: "Data & Databases",
      skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "SQL", "MongoDB", "Firebase", "DynamoDB", "SQL Server"]
    }
  ];

  return (
    <section className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-bright mb-4">Technical Capabilities</h2>
          <div className="w-12 h-1 bg-accent" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-lg font-bold text-bright mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-primary border border-border rounded-lg text-sm font-medium text-muted hover:border-accent/50 hover:text-bright transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
