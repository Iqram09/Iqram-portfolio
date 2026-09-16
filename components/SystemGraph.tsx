import { demoRun } from "@/data/kong";

type Node = {
  id: string;
  label: string;
  tele: string[];
  tone?: "model" | "accent";
};

/**
 * Hero visualization: the agentic diagnostic flow rendered as a trace.
 * Every telemetry value comes from the recorded README run (2026-09-12).
 * Server component — animation is CSS only and disabled under reduced motion.
 */
const nodes: Node[] = [
  { id: "input", label: "INPUT", tele: [`"${demoRun.question}"`] },
  { id: "agent", label: "AGENT", tone: "model", tele: ["gemini-3.5-flash-lite · step 1 · 1,602 ms · tool_calls"] },
  { id: "mcp", label: "MCP", tele: ["stdio · JSON-RPC · readOnlyHint: true"] },
  {
    id: "tools",
    label: "TOOLS",
    tele: ["find_route_by_path  30 ms · 209 B", "diagnose_route  64 ms · 3,162 B"],
  },
  { id: "infra", label: "INFRASTRUCTURE", tele: ["Kong 3.9.3 · Admin API · GET only"] },
  { id: "evidence", label: "EVIDENCE", tone: "accent", tele: ["NO_AUTH_PLUGIN · HIGH · CONFIRMED"] },
  { id: "diagnosis", label: "DIAGNOSIS", tone: "accent", tele: ["3 steps · 2 tool calls · $0.0046 · 5.0 s"] },
];

export default function SystemGraph({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`relative overflow-hidden rounded-xl border border-line bg-bg-1 ${className}`}
      aria-label="Diagnostic flow: input, agent, MCP, tools, infrastructure, evidence, diagnosis — with telemetry from a recorded run"
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-70" aria-hidden />
      <div className="relative flex items-center justify-between border-b border-line bg-bg-2/60 px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[11px] text-fg-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent node-pulse" aria-hidden />
          system.trace
        </span>
        <span className="hidden font-mono text-[11px] text-fg-dim sm:inline">recorded run · {demoRun.provider.split(" / ")[1]}</span>
      </div>

      <ol className="relative px-4 py-5 sm:px-6" aria-label="Flow steps">
        {/* Rail */}
        <span aria-hidden className="absolute left-[27px] top-6 bottom-6 w-px bg-line-strong sm:left-[35px]" />
        <span aria-hidden className="absolute left-[27px] top-6 bottom-6 w-px overflow-hidden sm:left-[35px]">
          <span className="packet absolute -left-[3px] block h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_10px_2px_rgba(56,189,248,0.45)]" />
        </span>

        {nodes.map((n, i) => {
          const tone =
            n.tone === "model"
              ? "border-violet/60 text-violet"
              : n.tone === "accent"
                ? "border-accent/60 text-accent"
                : "border-line-strong text-fg";
          return (
            <li
              key={n.id}
              className={`relative grid grid-cols-[16px_1fr] items-start gap-x-4 sm:grid-cols-[16px_150px_1fr] ${
                i === nodes.length - 1 ? "" : "pb-4"
              }`}
            >
              {/* rail dot */}
              <span className="relative mt-[11px] flex h-4 w-4 items-center justify-center" aria-hidden>
                <span
                  className={`h-2 w-2 rounded-full border bg-bg-1 ${
                    n.tone === "model" ? "border-violet" : n.tone === "accent" ? "border-accent bg-accent" : "border-fg-dim"
                  }`}
                />
              </span>

              <div
                className={`inline-flex h-9 w-fit items-center rounded-md border bg-bg-2 px-3 font-mono text-[11px] font-medium tracking-[0.12em] ${tone}`}
              >
                {n.label}
              </div>

              <ul className="col-start-2 mt-1.5 flex flex-col gap-1 sm:col-start-3 sm:mt-0 sm:min-h-[36px] sm:justify-center">
                {n.tele.map((t) => (
                  <li key={t} className="flex items-baseline gap-2 font-mono text-[11px] leading-snug text-fg-muted">
                    <span aria-hidden className="text-line-strong">·</span>
                    <span className={n.id === "input" ? "text-fg" : ""}>{t}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      <figcaption className="relative flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[11px] text-fg-dim sm:px-6">
        <span>Kong AI Gateway Diagnostics</span>
        <span>not live · replayed from a recorded run</span>
      </figcaption>
    </figure>
  );
}
