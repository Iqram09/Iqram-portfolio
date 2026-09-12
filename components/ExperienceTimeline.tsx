export default function ExperienceTimeline() {
  const experiences = [
    {
      role: "Associate Consultant",
      company: "Allied Globetech",
      period: "May 2025 – Feb 2026",
      achievements: [
        "Led enterprise API gateway integrations using Kong, CA Layer7, and Apigee.",
        "Built internal reporting tools using React, TypeScript, and MongoDB for client delivery tracking.",
        "Managed complex API integration architectures for enterprise clients.",
      ],
    },
    {
      role: "Software Developer",
      company: "Take Solutions",
      period: "May 2024 – Apr 2025",
      achievements: [
        "Owned end-to-end full-stack development, delivering robust REST APIs and scalable frontends.",
        "Implemented CI/CD pipelines to streamline agile delivery processes.",
        "Maintained strong frontend and backend ownership across multiple internal systems.",
      ],
    },
    {
      role: "Graphic Design Intern",
      company: "Collective Heads",
      period: "Oct 2023 – Apr 2024",
      achievements: [
        "Supported creative delivery and digital asset creation.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 border-t border-border bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-bright mb-4">Experience</h2>
          <div className="w-12 h-1 bg-accent" />
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-border bg-surface shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#050505] relative z-10 text-accent">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-6 rounded-xl border border-border bg-surface/50 card-hover">
                <div className="flex flex-col mb-4">
                  <span className="text-accent font-mono text-sm mb-1">{exp.period}</span>
                  <h3 className="text-xl font-bold text-bright">{exp.role}</h3>
                  <span className="text-muted font-medium">{exp.company}</span>
                </div>
                <ul className="space-y-2 text-muted text-sm list-none">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-border mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
