import Link from "next/link";
import { LuArrowRight, LuGithub } from "react-icons/lu";

export default function FeaturedProject() {
  return (
    <section id="work" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-bright mb-4">Featured Work</h2>
          <div className="w-12 h-1 bg-accent" />
        </div>

        <div className="group relative border border-border bg-surface rounded-2xl overflow-hidden card-hover">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Project Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary rounded-full border border-border text-xs font-mono text-accent mb-6 w-max">
                MCP Server · Agentic Diagnostics · LLM Evaluation
              </div>
              
              <h3 className="text-3xl font-bold text-bright mb-4">
                Kong AI Gateway Diagnostics
              </h3>
              
              <p className="text-muted text-lg mb-8 leading-relaxed">
                A read-only MCP-based AI agent that investigates Kong Gateway
                configuration through bounded tools, deterministic diagnostics,
                context management, evaluation, and observability.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["TypeScript", "MCP", "Kong", "Gemini", "Docker", "Vitest"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary border border-border rounded text-xs font-mono text-muted"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <Link
                  href="/projects/kong-ai-gateway-diagnostics"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-bright text-primary font-medium rounded-lg hover:bg-bright/90 transition-colors"
                >
                  Read Case Study
                  <LuArrowRight size={18} />
                </Link>
                <a
                  href="https://github.com/Iqram09/kong-ai-gateway-diagnostics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-3 text-muted hover:text-bright border border-border rounded-lg hover:border-accent/50 hover:bg-primary transition-colors"
                  aria-label="GitHub Repository"
                >
                  <LuGithub size={20} />
                </a>
              </div>
            </div>

            {/* Project Visual (Code / Architecture representation) */}
            <div className="bg-[#0A0A0B] border-l border-border p-8 hidden lg:flex flex-col justify-center font-mono text-sm">
              <div className="w-full max-w-md mx-auto">
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <div className="text-muted text-xs ml-2">agent_diagnostics.ts</div>
                </div>
                
                <div className="space-y-2 text-muted">
                  <div className="flex gap-4">
                    <span className="text-border">1</span>
                    <span><span className="text-blue-400">const</span> <span className="text-yellow-200">result</span> = <span className="text-blue-400">await</span> agent.<span className="text-accent">diagnose_route</span>(&#123;</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-border">2</span>
                    <span className="pl-4">route_name: <span className="text-green-400">&quot;/payments&quot;</span>,</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-border">3</span>
                    <span className="pl-4">issue: <span className="text-green-400">&quot;auth failure&quot;</span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-border">4</span>
                    <span>&#125;);</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-border">5</span>
                    <span><span className="text-border">{"/*"}</span></span>
                  </div>
                  <div className="flex gap-4 animate-pulse-slow">
                    <span className="text-border">6</span>
                    <span className="text-accent">→ evidence: NO_AUTH_PLUGIN_ATTACHED</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-border">7</span>
                    <span className="text-border">{"*/"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
