export default function ArchitecturePrinciples() {
  const principles = [
    {
      id: "01",
      title: "Build the system, not just the demo.",
      description: "Demos are easy. Systems that handle edge cases, state failures, and scale require actual engineering.",
    },
    {
      id: "02",
      title: "Let code own facts; let AI own investigation.",
      description: "The LLM is not the source of truth. The underlying infrastructure (APIs, databases) provides the deterministic facts.",
    },
    {
      id: "03",
      title: "Measure before claiming.",
      description: "Implement evaluations and telemetry to know exactly how a system performs before deploying it.",
    },
    {
      id: "04",
      title: "Document failures, not just successes.",
      description: "A mature engineering culture talks about what broke, why it broke, and how it was fixed.",
    },
  ];

  return (
    <section className="py-24 border-t border-border bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-bright mb-4">How I build</h2>
          <div className="w-12 h-1 bg-accent" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {principles.map((principle) => (
            <div
              key={principle.id}
              className="p-8 border border-border bg-surface rounded-xl hover:border-accent/30 transition-colors"
            >
              <div className="text-accent font-mono text-sm mb-4">
                {principle.id}
              </div>
              <h3 className="text-xl font-bold text-bright mb-3">
                {principle.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
