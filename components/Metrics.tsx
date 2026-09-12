export default function Metrics() {
  const metrics = [
    { value: "14", label: "MCP tools" },
    { value: "170", label: "tests" },
    { value: "28", label: "evaluation cases" },
    { value: "100%", label: "finding recall" },
  ];

  return (
    <section className="py-12 border-y border-border bg-primary/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-border/0 md:divide-border">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 ${
                index !== 0 ? "md:pl-12" : ""
              }`}
            >
              <div className="text-3xl md:text-4xl font-bold font-mono text-bright">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-muted uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
