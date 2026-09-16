"use client";

import { useState } from "react";
import { architectureSpine, architectureSide, architectureEntities, type ArchNode } from "@/data/kong";

const all = [...architectureSpine, ...architectureSide];

function NodeButton({
  node,
  selected,
  onSelect,
  variant,
}: {
  node: ArchNode;
  selected: boolean;
  onSelect: (id: string) => void;
  variant: "spine" | "side";
}) {
  const emphasis = node.id === "tools" || node.id === "kong";
  return (
    <button
      type="button"
      onClick={() => onSelect(node.id)}
      aria-pressed={selected}
      aria-describedby="arch-detail"
      className={`group w-full rounded-md border text-left transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-px ${
        variant === "spine" ? "px-4 py-3" : "px-3.5 py-2.5"
      } ${
        selected
          ? "border-accent/70 bg-bg-2 accent-glow"
          : emphasis
            ? "border-line-strong bg-bg-2 hover:border-accent/50"
            : "border-line bg-bg-1 hover:border-line-strong hover:bg-bg-2"
      }`}
    >
      <span className={`block font-medium text-fg ${variant === "spine" ? "text-sm" : "text-[13px]"}`}>{node.label}</span>
      {node.sub && <span className="mt-0.5 block truncate font-mono text-[10px] text-fg-dim">{node.sub}</span>}
    </button>
  );
}

export default function ArchitectureDiagram() {
  const [selectedId, setSelectedId] = useState<string>("tools");
  const node = all.find((n) => n.id === selectedId) ?? all[0];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-bg-1">
      <div className="flex items-center justify-between border-b border-line bg-bg-2/60 px-4 py-2.5 font-mono text-[11px]">
        <span className="text-fg-muted">architecture · select a node</span>
        <span className="hidden text-fg-dim sm:inline">hover highlights · click reveals</span>
      </div>

      <div className="relative grid grid-cols-[minmax(0,1fr)] gap-8 p-5 md:p-7 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(80%_80%_at_50%_50%,black,transparent)]" />

        {/* Spine */}
        <ol className="relative mx-auto flex w-full max-w-md flex-col" aria-label="Request path">
          {architectureSpine.map((n, i) => (
            <li key={n.id} className="relative">
              <NodeButton node={n} selected={selectedId === n.id} onSelect={setSelectedId} variant="spine" />
              {i < architectureSpine.length - 1 && (
                <div className="flex h-7 items-center justify-center" aria-hidden>
                  <svg width="2" height="28" className="overflow-visible">
                    <line x1="1" y1="0" x2="1" y2="28" stroke="#2B2B37" strokeWidth="2" />
                    <line x1="1" y1="0" x2="1" y2="28" stroke="#38BDF8" strokeWidth="2" className="edge-flow" opacity="0.7" />
                  </svg>
                </div>
              )}
            </li>
          ))}
          <li className="mt-7" aria-label="Kong entities">
            <div className="flex h-7 items-center justify-center" aria-hidden>
              <svg width="2" height="28">
                <line x1="1" y1="0" x2="1" y2="28" stroke="#2B2B37" strokeWidth="2" strokeDasharray="3 4" />
              </svg>
            </div>
            <ul className="grid grid-cols-5 gap-1.5">
              {architectureEntities.map((e) => (
                <li
                  key={e}
                  className="min-w-0 truncate rounded border border-line/80 bg-bg-1 px-1 py-1.5 text-center font-mono text-[9px] text-fg-muted sm:text-[10px]"
                >
                  {e}
                </li>
              ))}
            </ul>
          </li>
        </ol>

        {/* Side layers */}
        <div className="relative">
          <p className="label-mono mb-2">cross-cutting layers</p>
          <ul className="flex flex-col gap-1.5" aria-label="Cross-cutting layers">
            {architectureSide.map((n) => (
              <li key={n.id}>
                <NodeButton node={n} selected={selectedId === n.id} onSelect={setSelectedId} variant="side" />
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[10px] leading-relaxed text-fg-dim">
            Dotted into the tool layer: every tool call passes through safety and telemetry; diagnostics and context sit
            between tools and the Kong client.
          </p>
        </div>
      </div>

      {/* Detail */}
      <div id="arch-detail" className="grid gap-4 border-t border-line bg-bg-2/40 p-5 md:grid-cols-[200px_1fr] md:p-7" aria-live="polite">
        <div>
          <p className="label-mono">selected</p>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-fg">{node.label}</h3>
          {node.sub && <p className="mt-0.5 font-mono text-[11px] text-fg-dim">{node.sub}</p>}
        </div>
        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="label-mono">what it does</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted">{node.does}</dd>
          </div>
          <div>
            <dt className="label-mono">what it owns</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted">{node.owns}</dd>
          </div>
          <div>
            <dt className="label-mono text-err/80">must not</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted">{node.mustNot}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
