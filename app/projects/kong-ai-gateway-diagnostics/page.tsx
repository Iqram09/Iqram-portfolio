import Link from "next/link";
import { LuArrowLeft, LuExternalLink, LuShieldCheck, LuDatabase, LuFileCode, LuTerminal } from "react-icons/lu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KongCaseStudy() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-24 bg-primary text-bright selection:bg-accent/30 font-sans">
        
        {/* Header Section */}
        <section className="py-20 border-b border-border bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-primary to-primary">
          <div className="max-w-4xl mx-auto px-6">
            <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-bright transition-colors mb-8 font-mono text-sm">
              <LuArrowLeft size={16} /> Back to portfolio
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-surface border border-border rounded text-xs font-mono text-accent">MCP Server</span>
              <span className="px-3 py-1 bg-surface border border-border rounded text-xs font-mono text-accent">Agentic Diagnostics</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Kong AI Gateway Diagnostics</h1>
            <p className="text-xl text-muted leading-relaxed mb-8">
              A read-only MCP-based AI agent that investigates Kong Gateway configuration through bounded tools, deterministic diagnostics, context management, evaluation and observability.
            </p>
            
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Iqram09/kong-ai-gateway-diagnostics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-bright border border-border rounded-lg hover:border-accent/50 transition-colors"
              >
                View Repository <LuExternalLink size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Overview</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-bold text-accent mb-3">The Problem</h3>
                <p className="text-muted leading-relaxed">
                  Debugging an API gateway involves many narrow questions across routes, services, plugins, consumers, and upstream health. Hunting down a configuration error across these interconnected entities is highly manual.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-accent mb-3">The Solution</h3>
                <p className="text-muted leading-relaxed">
                  Allow an LLM to investigate using structured MCP tools while keeping infrastructure facts deterministic and authoritative.
                </p>
              </div>
            </div>
            
            <div className="mt-12 p-8 bg-surface border border-border rounded-xl text-center">
              <p className="text-2xl font-serif italic text-bright">
                &quot;The model owns the investigation. The code owns the facts.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="py-20 border-b border-border bg-surface/30">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-12">Architecture</h2>
            
            <div className="relative border border-border rounded-xl bg-primary p-8 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              <div className="relative z-10 flex flex-col items-center max-w-sm mx-auto space-y-2">
                <div className="w-full p-4 border border-border bg-surface rounded-lg text-center font-bold">AI Client (Gemini)</div>
                <div className="h-6 w-px bg-border"></div>
                <div className="w-full p-3 border border-accent/50 bg-accent/5 text-accent rounded-lg text-center font-mono text-sm">Model Context Protocol</div>
                <div className="h-6 w-px bg-border"></div>
                <div className="w-full grid grid-cols-2 gap-2">
                  <div className="p-3 border border-border bg-surface rounded-lg text-center text-xs">Context Mgmt</div>
                  <div className="p-3 border border-border bg-surface rounded-lg text-center text-xs">Safety Layer</div>
                </div>
                <div className="h-6 w-px bg-border"></div>
                <div className="w-full p-4 border border-border bg-surface rounded-lg text-center font-bold relative group">
                  14 Read-Only Tools
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent rounded-lg transition-colors"></div>
                </div>
                <div className="h-6 w-px bg-border"></div>
                <div className="w-full p-4 border border-border bg-surface rounded-lg text-center font-bold">Kong Admin API</div>
                <div className="h-6 w-px bg-border"></div>
                <div className="w-full flex justify-between gap-2 text-xs text-muted font-mono">
                  <div className="p-2 border border-border/50 rounded bg-surface/50 w-full text-center">Routes</div>
                  <div className="p-2 border border-border/50 rounded bg-surface/50 w-full text-center">Services</div>
                  <div className="p-2 border border-border/50 rounded bg-surface/50 w-full text-center">Plugins</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl font-bold">MCP Tooling</h2>
              <div className="flex gap-4 text-xs font-mono text-muted">
                <span className="flex items-center gap-1"><LuShieldCheck size={14} className="text-accent" /> Read-only</span>
                <span className="flex items-center gap-1"><LuFileCode size={14} className="text-accent" /> Schema validated</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-sm">
              {[
                { group: "Routing", tools: ["find_route_by_path", "get_route", "get_service", "list_services", "list_routes_for_service"] },
                { group: "Plugins", tools: ["list_plugins_for_route", "list_global_plugins"] },
                { group: "Consumers", tools: ["get_consumer", "list_consumers"] },
                { group: "Upstreams", tools: ["list_upstreams", "check_upstream_health"] },
                { group: "Diagnostics", tools: ["diff_config", "diagnose_route", "explain_auth_failure"] }
              ].map((category) => (
                <div key={category.group} className="border border-border bg-surface p-4 rounded-lg">
                  <h4 className="text-accent mb-3 text-xs uppercase tracking-wider">{category.group}</h4>
                  <ul className="space-y-2 text-muted">
                    {category.tools.map(tool => (
                      <li key={tool} className="flex items-center gap-2">
                        <LuTerminal size={12} /> {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Context Management Section */}
        <section className="py-20 border-b border-border bg-surface/30">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Context Management</h2>
            <p className="text-muted mb-12">
              Language models struggle with massive configuration dumps. The solution is aggressive, deterministic context reduction before the model sees the data.
            </p>
            
            <div className="space-y-8 font-mono">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Raw Admin API dump</span>
                  <span className="text-bright">28,658 bytes</span>
                </div>
                <div className="h-4 w-full bg-surface rounded overflow-hidden flex">
                  <div className="h-full bg-border w-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Summarized context</span>
                  <span className="text-bright">8,071 bytes</span>
                </div>
                <div className="h-4 w-full bg-surface rounded overflow-hidden flex">
                  <div className="h-full bg-muted w-[28%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Targeted diagnosis payload</span>
                  <span className="text-accent font-bold">3,164 bytes</span>
                </div>
                <div className="h-4 w-full bg-surface rounded overflow-hidden flex">
                  <div className="h-full bg-accent w-[11%]"></div>
                </div>
                <p className="text-xs text-muted mt-4 font-sans">
                  Achieved via progressive collection, bounded results, and reference serialization rather than deep nesting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Evaluation Section */}
        <section className="py-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold">Evaluation Dashboard</h2>
              <span className="px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded font-mono text-xs">run-003</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="p-6 border border-border bg-surface rounded-xl">
                <div className="text-3xl font-mono text-bright mb-1">28</div>
                <div className="text-xs text-muted uppercase tracking-wider font-bold">Cases Passed</div>
              </div>
              <div className="p-6 border border-border bg-surface rounded-xl">
                <div className="text-3xl font-mono text-green-400 mb-1">100%</div>
                <div className="text-xs text-muted uppercase tracking-wider font-bold">Finding Recall</div>
              </div>
              <div className="p-6 border border-border bg-surface rounded-xl">
                <div className="text-3xl font-mono text-green-400 mb-1">100%</div>
                <div className="text-xs text-muted uppercase tracking-wider font-bold">Fact Match</div>
              </div>
              <div className="p-6 border border-border bg-surface rounded-xl">
                <div className="text-3xl font-mono text-bright mb-1">0</div>
                <div className="text-xs text-muted uppercase tracking-wider font-bold">Repeated Tools</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
               <div className="p-4 border border-border bg-surface rounded-lg flex justify-between items-center">
                 <span className="text-sm text-muted">Mean Steps</span>
                 <span className="font-mono text-bright">3.5</span>
               </div>
               <div className="p-4 border border-border bg-surface rounded-lg flex justify-between items-center">
                 <span className="text-sm text-muted">Tools / Case</span>
                 <span className="font-mono text-bright">2.57</span>
               </div>
               <div className="p-4 border border-border bg-surface rounded-lg flex justify-between items-center">
                 <span className="text-sm text-muted">Est. Cost</span>
                 <span className="font-mono text-bright">$0.149</span>
               </div>
            </div>
            <p className="text-xs text-muted mt-4 italic text-center">
              * Demonstration benchmark against deterministic scenarios, not a universal statistical guarantee.
            </p>
          </div>
        </section>

        {/* Failure Modes & Safety */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
            
            {/* Failure Modes */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Where it broke</h2>
              <p className="text-muted text-sm mb-8">Documented development failures.</p>
              
              <div className="space-y-4">
                {[
                  { code: "AGENT-HALT-TOOLS-001", fix: "Implemented tool execution bounds." },
                  { code: "EVAL-SCORING-BRITTLE-001", fix: "Moved to deterministic assertion scoring." },
                  { code: "HEALTH-VERDICT-REVERT-001", fix: "Forced explicit health endpoint check." }
                ].map((failure) => (
                  <div key={failure.code} className="p-4 border border-red-900/30 bg-red-900/10 rounded-lg">
                    <div className="font-mono text-xs text-red-400 mb-2">{failure.code}</div>
                    <div className="text-sm text-bright flex gap-2">
                      <span className="text-muted">Fix:</span> {failure.fix}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Safety constraints</h2>
              <p className="text-muted text-sm mb-8">Engineering boundaries.</p>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1"><LuShieldCheck size={20} className="text-accent" /></div>
                  <div>
                    <h4 className="font-bold text-bright">Strictly Read-Only</h4>
                    <p className="text-sm text-muted mt-1">No write methods are exposed to the agent. State mutation is impossible by design.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1"><LuDatabase size={20} className="text-accent" /></div>
                  <div>
                    <h4 className="font-bold text-bright">Kong is Authoritative</h4>
                    <p className="text-sm text-muted mt-1">The LLM cannot invent configurations. All diagnostic findings originate from deterministic rules against actual gateway state.</p>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
