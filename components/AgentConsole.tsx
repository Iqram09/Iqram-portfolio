"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { demoRun } from "@/data/kong";
import Window from "@/components/ui/Window";
import { Play, Refresh } from "@/components/ui/Icons";

export type Stage = "idle" | "input" | "agent" | "mcp" | "tool" | "kong" | "evidence" | "diagnosis" | "done";

type Line = {
  text: string;
  kind: "prompt" | "meta" | "step" | "call" | "result" | "finding" | "heading" | "prose" | "metric";
  stage?: Stage;
  /** ms to wait before showing this line */
  wait: number;
};

function buildScript(): Line[] {
  const s = demoRun.steps;
  const lines: Line[] = [
    { text: `npm run agent -- "${demoRun.question}"`, kind: "prompt", stage: "input", wait: 0 },
    { text: `Provider: ${demoRun.provider}`, kind: "meta", wait: 500 },
    { text: `Step 1  (llm ${s[0].llmMs}ms, finish=${s[0].finish})`, kind: "step", stage: "agent", wait: 700 },
    { text: `-> ${s[0].tool}(${s[0].args})`, kind: "call", stage: "mcp", wait: 500 },
    { text: `ok ${s[0].ms}ms ${s[0].bytes}B  ${s[0].result}`, kind: "result", stage: "kong", wait: 450 },
    { text: `Step 2  (llm ${s[1].llmMs}ms, finish=${s[1].finish})`, kind: "step", stage: "agent", wait: 700 },
    { text: `-> ${s[1].tool}(${s[1].args})`, kind: "call", stage: "tool", wait: 500 },
    { text: `ok ${s[1].ms}ms ${s[1].bytes}B`, kind: "result", stage: "kong", wait: 450 },
    { text: `${demoRun.finding.code} · ${demoRun.finding.severity} · ${demoRun.finding.confidence}`, kind: "finding", stage: "evidence", wait: 350 },
    { text: `Step 3  (llm ${s[2].llmMs}ms, finish=${s[2].finish})`, kind: "step", stage: "agent", wait: 700 },
    { text: "DIAGNOSIS", kind: "heading", stage: "diagnosis", wait: 500 },
    ...demoRun.diagnosis.map((p, i) => ({ text: p, kind: "prose" as const, wait: i === 0 ? 250 : 350 })),
    { text: "RUN METRICS", kind: "heading", wait: 450 },
    ...demoRun.metrics.map((m) => ({ text: `${m.k.padEnd(16, " ")}${m.v}`, kind: "metric" as const, wait: 90 })),
    { text: "", kind: "meta", stage: "done", wait: 200 },
  ];
  return lines;
}

type Props = {
  onStage?: (stage: Stage) => void;
  autoplay?: boolean;
  className?: string;
  compact?: boolean;
};

/**
 * Replays the recorded README run of the Kong agent with a soft stream effect.
 * Frontend only: nothing is queried. Reduced-motion users get the full transcript at once.
 */
export default function AgentConsole({ onStage, autoplay = true, className = "", compact = false }: Props) {
  const script = useMemo(buildScript, []);
  const [count, setCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const timer = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const stop = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    stop();
    setStarted(true);
    if (reduce.current) {
      setCount(script.length);
      onStage?.("done");
      return;
    }
    setCount(0);
    setPlaying(true);
    let i = 0;
    const next = () => {
      if (i >= script.length) {
        setPlaying(false);
        return;
      }
      const line = script[i];
      timer.current = window.setTimeout(() => {
        i += 1;
        setCount(i);
        if (line.stage) onStage?.(line.stage);
        next();
      }, line.wait);
    };
    next();
  }, [script, stop, onStage]);

  // Autoplay once when scrolled into view.
  useEffect(() => {
    if (!autoplay) return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      play();
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          play();
          obs.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  // Keep the newest line in view inside the console.
  useEffect(() => {
    const b = bodyRef.current;
    if (b && playing) b.scrollTop = b.scrollHeight;
  }, [count, playing]);

  const visible = script.slice(0, count);

  return (
    <div ref={rootRef} className={className}>
      <Window
        title="iqram@kong-diag:~"
        meta={
          <button
            type="button"
            onClick={play}
            className="inline-flex items-center gap-1.5 rounded border border-line bg-bg-2 px-2 py-1 font-mono text-[11px] text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            aria-label={started ? "Replay the recorded run" : "Play the recorded run"}
          >
            {started ? <Refresh size={12} /> : <Play size={12} />}
            {started ? "replay" : "play"}
          </button>
        }
      >
        <div
          ref={bodyRef}
          className={`overflow-y-auto px-4 py-4 font-mono text-[12px] leading-[1.7] text-fg-muted sm:px-5 ${
            compact ? "h-[320px]" : "h-[340px] md:h-[460px]"
          }`}
          aria-live="polite"
          aria-atomic="false"
        >
          {!started && (
            <p className="text-fg-dim">
              <span className="text-accent">$</span> press play to replay the recorded run
            </p>
          )}
          {visible.map((l, i) => {
            const last = i === visible.length - 1 && playing;
            switch (l.kind) {
              case "prompt":
                return (
                  <p key={i} className="text-fg">
                    <span className="text-accent">$</span> {l.text}
                  </p>
                );
              case "meta":
                return l.text ? (
                  <p key={i} className="text-fg-dim">
                    {l.text}
                  </p>
                ) : null;
              case "step":
                return (
                  <p key={i} className="mt-3 text-fg">
                    <span className="text-violet">●</span> {l.text}
                  </p>
                );
              case "call":
                return (
                  <p key={i} className="pl-4 text-accent">
                    {l.text}
                  </p>
                );
              case "result":
                return (
                  <p key={i} className="pl-8 text-fg-muted">
                    <span className="text-ok">✓</span> {l.text}
                  </p>
                );
              case "finding":
                return (
                  <p key={i} className="pl-8">
                    <span className="rounded border border-warn/40 bg-warn/10 px-1.5 py-0.5 text-[11px] text-warn">{l.text}</span>
                  </p>
                );
              case "heading":
                return (
                  <p key={i} className="mt-4 text-[11px] tracking-[0.16em] text-fg-dim">
                    {l.text}
                  </p>
                );
              case "prose":
                return (
                  <p key={i} className={`mt-1.5 max-w-prose text-pretty text-fg ${last ? "caret" : ""}`}>
                    {l.text}
                  </p>
                );
              case "metric":
                return (
                  <p key={i} className="whitespace-pre text-fg-muted">
                    <span className="text-fg-dim">{l.text.slice(0, 16)}</span>
                    {l.text.slice(16)}
                  </p>
                );
            }
          })}
          {playing && count < script.length && (
            <p className="mt-1 text-fg-dim caret" aria-hidden />
          )}
        </div>
      </Window>
    </div>
  );
}
