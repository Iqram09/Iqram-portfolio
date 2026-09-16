import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";
import { kong } from "@/data/kong";
import { ArrowRight, ArrowUpRight, FileText, Github } from "@/components/ui/Icons";

/** Resume + GitHub, side by side. Nothing here is a statistic; only links and verified tags. */
export default function ResumeCTA() {
  return (
    <section className="border-t border-line bg-bg-1/40 py-16 md:py-20" aria-label="Resume and GitHub">
      <div className="container-site grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col rounded-xl border border-line bg-bg-1 p-7 md:p-8">
            <div className="flex items-center justify-between">
              <span className="label-mono">resume</span>
              <FileText size={16} className="text-fg-dim" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-fg">One page, current.</h2>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-fg-muted">
              The CV behind this site — experience, the Kong project, skills and education. Preview it in the
              browser or download the PDF.
            </p>
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <Button href="/resume">
                View resume <ArrowRight size={15} />
              </Button>
              <Button href={site.resumeFile} variant="secondary" download={site.resumeDownloadName}>
                Download PDF
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="flex h-full flex-col rounded-xl border border-line bg-bg-1 p-7 md:p-8">
            <div className="flex items-center justify-between">
              <span className="label-mono">github</span>
              <Github size={16} className="text-fg-dim" />
            </div>
            <a
              href={kong.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 block rounded-lg border border-line bg-bg-2 p-4 transition-colors hover:border-line-strong"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="truncate font-mono text-sm text-fg">{kong.repoName}</span>
                <ArrowUpRight size={14} className="shrink-0 text-fg-dim transition-colors group-hover:text-fg" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                MCP server, deterministic diagnostics, bounded agent loop and evaluation harness for Kong Gateway.
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
                {kong.githubTags.map((t) => (
                  <li key={t} className="rounded border border-line bg-bg-1 px-2 py-0.5 font-mono text-[11px] text-fg-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </a>
            <div className="mt-auto pt-6">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                All repositories at github.com/{site.githubHandle} <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
