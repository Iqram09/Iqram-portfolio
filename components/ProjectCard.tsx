import type { Project } from "@/data/projects";
import { ArrowUpRight, Github } from "@/components/ui/Icons";

export default function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="lift group relative flex h-full flex-col rounded-xl border border-line bg-bg-1 hover:bg-bg-2/40">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="label-mono">{p.category}</span>
          <ArrowUpRight size={14} className="text-fg-dim transition-colors group-hover:text-fg" />
        </div>

        <h3 className="mt-4 text-lg font-semibold tracking-tight text-fg">
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none"
          >
            {p.title}
          </a>
        </h3>
        <p className="mt-1 font-mono text-xs text-fg-muted">{p.subtitle}</p>

        <p className="mt-4 text-pretty text-sm leading-relaxed text-fg-muted">{p.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.technologies.map((t) => (
            <li key={t} className="rounded border border-line bg-bg-2 px-2 py-0.5 font-mono text-[11px] text-fg-muted">
              {t}
            </li>
          ))}
        </ul>

        <p className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm text-fg-muted transition-colors group-hover:text-fg">
          <Github size={15} /> Source on GitHub
        </p>
      </div>
    </article>
  );
}
