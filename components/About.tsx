export default function About() {
  return (
    <section id="about" className="py-24 border-t border-border bg-primary">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 lg:col-span-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-bright mb-4">About</h2>
            <div className="w-12 h-1 bg-accent" />
          </div>
          
          <div className="space-y-6 text-lg text-muted leading-relaxed">
            <p>
              I am a software engineer from Mumbai focused on building reliable software systems and exploring AI platform engineering.
            </p>
            <p>
              My work sits at the intersection of APIs, full-stack development, infrastructure, and agentic AI. I enjoy building systems where AI capabilities are supported by strong architecture, evaluation, observability, and clear engineering boundaries.
            </p>
            <p>
              Whether it&apos;s integrating enterprise API gateways, building internal analytics tools, or engineering deterministic diagnostics using MCP, I prioritize systems that actually work over demos that just look good.
            </p>
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-4 bg-surface border border-border rounded-2xl p-8">
          <h3 className="font-mono text-sm text-accent mb-6">## Learning</h3>
          <p className="text-sm text-muted mb-6">
            Constantly expanding my foundation in Data Science and Machine Learning.
          </p>
          <ul className="space-y-3 text-sm text-bright font-medium">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              Data Science Foundation
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              Machine Learning & EDA
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              Python & Statistics
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              SQL
            </li>
          </ul>
          <div className="mt-8 pt-6 border-t border-border/50 text-xs text-muted font-mono">
            Codebasics Virtual Internship
          </div>
        </div>
      </div>
    </section>
  );
}