import Link from "next/link";
import type { Project } from "@/data/projects";
import Motif from "@/components/ui/Motif";
import { ArrowRight, Github } from "@/components/ui/Icons";

const categoryLabel: Record<Project["category"], string> = {
  "ai-systems": "AI / Systems",
  "full-stack": "Full-Stack",
  data: "Data",
};

export default function ProjectCard({ project }: { project: Project }) {
  const p = project;
  const featured = p.featured;

  return (
    <article
      className={`lift group relative flex flex-col rounded-xl border bg-bg-1 ${
        featured ? "border-accent/30 md:col-span-2" : "border-line"
      }`}
    >
      <div className={`flex flex-1 flex-col p-6 ${featured ? "md:p-8" : ""}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="label-mono">{categoryLabel[p.category]}</span>
          <span className="font-mono text-[11px] tabular-nums text-fg-dim">{p.year}</span>
        </div>

        <h3 className={`mt-4 font-semibold tracking-tight text-fg ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
          {p.href ? (
            <Link href={p.href} className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none">
              {p.title}
            </Link>
          ) : (
            p.title
          )}
        </h3>
        <p className="mt-1 font-mono text-xs text-fg-muted">{p.subtitle}</p>

        <p className={`mt-4 text-pretty leading-relaxed text-fg-muted ${featured ? "max-w-2xl text-[15px]" : "text-sm"}`}>
          {p.description}
        </p>

        {featured && p.metrics && (
          <dl className="mt-6 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {p.metrics.map((m) => (
              <div key={m.label} className="rounded-md border border-line bg-bg-2 px-3 py-2">
                <dd className="font-mono text-lg tabular-nums text-fg">{m.value}</dd>
                <dt className="text-[11px] text-fg-dim">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.technologies.map((t) => (
            <li key={t} className="rounded border border-line bg-bg-2 px-2 py-0.5 font-mono text-[11px] text-fg-muted">
              {t}
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-auto flex items-center justify-between gap-4 pt-6">
          {featured ? <Motif /> : <span />}
          <div className="flex items-center gap-4">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
                aria-label={`${p.title} on GitHub`}
              >
                <Github size={15} /> GitHub
              </a>
            )}
            {p.href && (
              <Link href={p.href} className="inline-flex items-center gap-1.5 text-sm text-fg">
                Case study <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
