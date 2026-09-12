"use client";

import Link from "next/link";
import { LuArrowRight, LuGithub, LuFileText } from "react-icons/lu";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full z-10">
        {/* Text Content */}
        <div className="flex flex-col gap-8 animate-fade-in">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface rounded-full border border-border text-xs font-mono text-muted mb-6">
              <span className="text-accent">Mumbai, India</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Available for opportunities</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-bright leading-tight">
              AI engineering, software architecture, and{" "}
              <span className="text-gradient-accent">systems that work.</span>
            </h1>
          </div>

          <p className="text-lg text-muted max-w-xl leading-relaxed">
            I am a software engineer focused on AI platforms, agentic systems, API
            architecture, and full-stack engineering. I build systems where AI is
            constrained by strong interfaces, observability, evaluation, and
            deterministic infrastructure.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bright text-primary font-medium rounded-lg hover:bg-bright/90 transition-colors"
            >
              View selected work
              <LuArrowRight size={18} />
            </a>
            <a
              href="https://github.com/Iqram09"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-bright border border-border rounded-lg hover:border-accent/50 hover:bg-surface/80 transition-colors"
            >
              <LuGithub size={18} />
              GitHub
            </a>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-6 py-3 text-muted hover:text-bright transition-colors font-medium"
            >
              <LuFileText size={18} />
              Resume
            </Link>
          </div>
        </div>

        {/* Visual Content: Architecture Graph */}
        <div
          className={`relative h-[400px] w-full border border-border bg-surface/50 rounded-xl p-8 flex flex-col justify-center transition-opacity duration-1000 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Animated Graph */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50 rounded-xl" />
          
          <div className="relative z-10 flex flex-col h-full justify-between max-w-sm mx-auto font-mono text-sm">
            <GraphNode label="User Request" delay="0s" />
            <GraphEdge />
            <GraphNode label="AI Agent (Gemini)" highlight delay="0.5s" />
            <GraphEdge />
            <GraphNode label="MCP Server" delay="1s" />
            <GraphEdge />
            <GraphNode label="API Gateway (Kong)" delay="1.5s" />
            <GraphEdge />
            <GraphNode label="Deterministic Diagnosis" delay="2s" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GraphNode({
  label,
  highlight = false,
  delay = "0s",
}: {
  label: string;
  highlight?: boolean;
  delay?: string;
}) {
  return (
    <div
      className={`px-4 py-3 rounded border text-center transition-all duration-700 animate-slide-up ${
        highlight
          ? "border-accent text-accent bg-accent/10 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          : "border-border text-muted bg-primary"
      }`}
      style={{ animationDelay: delay }}
    >
      {label}
    </div>
  );
}

function GraphEdge() {
  return (
    <div className="flex-1 w-px bg-gradient-to-b from-border via-accent/30 to-border mx-auto my-1" />
  );
}
