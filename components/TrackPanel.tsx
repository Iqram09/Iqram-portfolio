import Link from "next/link";
import { clients } from "@/data/experience";
import { evalRun, kong } from "@/data/kong";
import { ArrowUpRight } from "@/components/ui/Icons";

type Track = {
  id: string;
  label: string;
  period: string;
  tone: "ok" | "accent" | "violet";
  headline: string;
  lines: { text: string; href?: string; external?: boolean }[];
  tags: string[];
};

/**
 * Hero visual: the three tracks of work on the CV, each with a line of proof.
 * Every value comes from data/ — nothing here is a separate claim.
 */
const tracks: Track[] = [
  {
    id: "client",
    label: "client.work",
    period: "2026 – now",
    tone: "ok",
    headline: "Freelance full-stack",
    lines: clients.map((c) => ({ text: `${c.domain} — ${c.sector}`, href: c.url, external: true })),
    tags: ["Next.js", "Supabase", "Cloudflare R2", "Shopify"],
  },
  {
    id: "enterprise",
    label: "enterprise.api",
    period: "2025 – 2026",
    tone: "accent",
    headline: "API integration at a private-sector bank",
    lines: [
      { text: "Layer7 around Oracle FLEXCUBE core banking · on-site" },
      { text: "Kong · Layer7 · Apigee across 3+ client projects" },
    ],
    tags: ["Layer7", "FLEXCUBE", "Kubernetes", "WebLogic"],
  },
  {
    id: "ai",
    label: "ai.engineering",
    period: "2026",
    tone: "violet",
    headline: kong.title,
    lines: [
      { text: "MCP server · 14 read-only tools · deterministic rule engine" },
      { text: `${evalRun.passed}/${evalRun.cases} eval cases · ${evalRun.costPerCase} per case · ${evalRun.id}`, href: `/projects/${kong.slug}` },
    ],
    tags: ["MCP", "TypeScript", "Kong 3.9", "Gemini"],
  },
];

const dot: Record<Track["tone"], string> = {
  ok: "bg-ok",
  accent: "bg-accent",
  violet: "bg-violet",
};
const text: Record<Track["tone"], string> = {
  ok: "text-ok",
  accent: "text-accent",
  violet: "text-violet",
};

export default function TrackPanel() {
  return (
    <figure
      className="relative overflow-hidden rounded-xl border border-line bg-bg-1"
      aria-label="Three tracks of work: freelance client work, enterprise API integration, and AI engineering"
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden />
      <div className="relative flex items-center justify-between border-b border-line bg-bg-2/60 px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[11px] text-fg-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent node-pulse" aria-hidden />
          iqram --whoami
        </span>
        <span className="font-mono text-[11px] text-fg-dim">3 tracks · 3+ years</span>
      </div>

      <ol className="relative divide-y divide-line">
        {tracks.map((t) => (
          <li key={t.id} className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <span className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] ${text[t.tone]}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${dot[t.tone]}`} aria-hidden />
                {t.label}
              </span>
              <span className="font-mono text-[11px] tabular-nums text-fg-dim">{t.period}</span>
            </div>
            <p className="mt-2.5 text-[15px] font-medium tracking-tight text-fg">{t.headline}</p>
            <ul className="mt-2 flex flex-col gap-1">
              {t.lines.map((l) => (
                <li key={l.text} className="flex items-baseline gap-2 font-mono text-[11px] leading-snug text-fg-muted">
                  <span aria-hidden className="text-line-strong">→</span>
                  {l.href ? (
                    l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        {l.text} <ArrowUpRight size={11} className="shrink-0 text-fg-dim" />
                      </a>
                    ) : (
                      <Link href={l.href} className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent">
                        {l.text}
                      </Link>
                    )
                  ) : (
                    <span>{l.text}</span>
                  )}
                </li>
              ))}
            </ul>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
              {t.tags.map((tag) => (
                <li key={tag} className="rounded border border-line bg-bg-2 px-1.5 py-0.5 font-mono text-[10px] text-fg-muted">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </figure>
  );
}
