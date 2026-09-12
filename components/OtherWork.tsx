import { ExternalLink } from "lucide-react";

export default function OtherWork() {
  const projects = [
    {
      title: "Ecommerce Dashboard",
      description: "Internal analytics dashboard built at Allied Globetech for KPI and project reporting.",
      tags: ["React", "TypeScript", "MongoDB"],
    },
    {
      title: "Deliveroo-style Application",
      description: "Mobile application built with React Native, Redux, Google Maps, Sanity.io and AWS Amplify.",
      tags: ["React Native", "Redux", "AWS"],
    },
    {
      title: "Streaming Platform",
      description: "Platform built with Next.js, Firebase Authentication, Stripe and server-side rendering.",
      tags: ["Next.js", "Firebase", "Stripe"],
    },
    {
      title: "Data Science Projects",
      description: "Various projects involving data exploration, modeling, and evaluation.",
      tags: ["Python", "Pandas", "Scikit-learn"],
    },
  ];

  return (
    <section id="projects" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-bright mb-4">Other Selected Work</h2>
          <div className="w-12 h-1 bg-accent" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-8 border border-border bg-surface rounded-xl hover:border-accent/30 transition-colors flex flex-col h-full"
            >
              <h3 className="text-xl font-bold text-bright mb-3 flex items-center justify-between">
                {project.title}
              </h3>
              <p className="text-muted leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-primary border border-border rounded text-xs font-mono text-muted"
                  >
                    {tag}
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
