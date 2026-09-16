"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import AgentConsole, { type Stage } from "@/components/AgentConsole";
import SectionHeader from "@/components/ui/SectionHeader";
import { kong } from "@/data/kong";
import { ArrowRight } from "@/components/ui/Icons";

type FlowNode = {
  id: Exclude<Stage, "idle" | "done">;
  label: string;
  kicker: string;
  detail: string;
  tone?: "model" | "accent";
};

const flow: FlowNode[] = [
  {
    id: "input",
    label: "Question",
    kicker: "vague, human, possibly wrong",
    detail:
      "The user asks in plain language. The premise may be wrong — here it was: nothing was rejecting requests on /payments.",
  },
  {
    id: "agent",
    label: "Agent",
    kicker: "bounded loop · Gemini",
    tone: "model",
    detail:
      "A loop the project owns: a step limit of 10, identical-call detection, a cumulative context budget and a halt path that says “diagnosis incomplete” instead of guessing. The model chooses tools and writes prose; it never produces a fact.",
  },
  {
    id: "mcp",
    label: "MCP",
    kicker: "stdio · JSON-RPC · Zod",
    detail:
      "Fourteen read-only tools with schemas, descriptions and bounded results — instead of an HTTP client and a URL. The in-repo agent is given eight of them, on purpose.",
  },
  {
    id: "tool",
    label: "Tool",
    kicker: "shared runner · limits · audit",
    detail:
      "Every call passes through one runner: argument validation, item caps, character budgets, telemetry and an audit event. No tool can opt out of a bound.",
  },
  {
    id: "kong",
    label: "Kong",
    kicker: "Admin API · GET only",
    detail:
      "A typed client against Kong Gateway 3.9.3. Only GET methods exist; responses are validated with Zod; credential values are stripped at the boundary.",
  },
  {
    id: "evidence",
    label: "Evidence",
    kicker: "11 pure rules · ~64 ms",
    tone: "accent",
    detail:
      "An evidence collector reads what a rule needs, then pure rules derive findings with a code, severity, evidence lines and a confidence of CONFIRMED, PARTIAL or INSUFFICIENT_EVIDENCE.",
  },
  {
    id: "diagnosis",
    label: "Diagnosis",
    kicker: "prose + run metrics",
    tone: "accent",
    detail:
      "An explanation with evidence, next steps and limitations, followed by measured run metrics: steps, tool calls, tokens, estimated cost, wall clock.",
  },
];

/**
 * Homepage interactive: a miniature AI-infrastructure flow synchronised with a
 * replay of the recorded run. Frontend only — nothing here queries a gateway.
 */
export default function LiveSystem() {
  const [active, setActive] = useState<Stage>("idle");
  const [selected, setSelected] = useState<FlowNode["id"] | null>(null);

  const onStage = useCallback((s: Stage) => setActive(s), []);

  const shown = selected ?? (active !== "idle" && active !== "done" ? active : "agent");
  const node = flow.find((n) => n.id === shown) ?? flow[1];

  return (
    <section className="border-t border-line py-20 md:py-28" aria-labelledby="live-title">
      <div className="container-site">
        <SectionHeader
          index="02"
          eyebrow="Interactive"
          id="live-title"
          title="Live system"
          lede="How a question becomes a diagnosis. Watch the recorded run stream through each layer, or select a layer to read what it owns."
          aside={
            <span className="font-mono text-[11px] text-fg-dim">
              frontend simulation · replayed from a recorded run · no live gateway
            </span>
          }
        />

        {/* Flow */}
        <ol
          className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7 lg:gap-0"
          aria-label="System flow"
        >
          {flow.map((n, i) => {
            const isActive = active === n.id;
            const isSelected = selected === n.id;
            const tone =
              n.tone === "model"
                ? "text-violet"
                : n.tone === "accent"
                  ? "text-accent"
                  : "text-fg";
            return (
              <li key={n.id} className="relative flex items-stretch">
                <button
                  type="button"
                  onClick={() => setSelected((s) => (s === n.id ? null : n.id))}
                  aria-pressed={isSelected}
                  className={`lift group relative w-full rounded-lg border bg-bg-1 px-3 py-3 text-left lg:rounded-none lg:border-y lg:border-l lg:border-r-0 lg:first:rounded-l-lg lg:last:rounded-r-lg lg:last:border-r ${
                    isSelected
                      ? "border-accent/70 bg-bg-2"
                      : isActive
                        ? "border-line-strong bg-bg-2"
                        : "border-line hover:bg-bg-2"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className={`font-mono text-[10px] tracking-widest text-fg-dim`}>0{i + 1}</span>
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        isActive ? "bg-accent node-pulse" : isSelected ? "bg-accent" : "bg-line-strong"
                      }`}
                    />
                  </span>
                  <span className={`mt-2 block text-sm font-medium ${tone}`}>{n.label}</span>
                  <span className="mt-0.5 block truncate font-mono text-[10px] text-fg-dim">{n.kicker}</span>
                </button>
                {i < flow.length - 1 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-1.5 top-1/2 z-10 hidden h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-line-strong bg-bg-1 lg:block"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <AgentConsole onStage={onStage} />
          </div>

          {/* Explanation */}
          <aside className="flex flex-col rounded-lg border border-line bg-bg-1 p-6 lg:col-span-5" aria-live="polite">
            <div className="flex items-center justify-between">
              <span className="label-mono">layer</span>
              <span className="font-mono text-[11px] text-fg-dim">{selected ? "selected" : active === "idle" ? "default" : "following run"}</span>
            </div>
            <h3
              className={`mt-3 text-2xl font-semibold tracking-tight ${
                node.tone === "model" ? "text-violet" : node.tone === "accent" ? "text-accent" : "text-fg"
              }`}
            >
              {node.label}
            </h3>
            <p className="mt-1 font-mono text-xs text-fg-dim">{node.kicker}</p>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-fg-muted">{node.detail}</p>

            <div className="mt-auto pt-8">
              <Link
                href={`/projects/${kong.slug}#architecture`}
                className="inline-flex items-center gap-2 text-sm text-fg underline-offset-4 hover:underline"
              >
                Read the architecture <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
