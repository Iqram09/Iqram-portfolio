import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { clients } from "@/data/experience";
import { ArrowUpRight } from "@/components/ui/Icons";

/** Freelance client sites — both live, both linked. */
export default function ClientWork() {
  return (
    <section id="clients" className="scroll-mt-20 border-t border-line bg-bg-1/40 py-20 md:py-28" aria-labelledby="clients-title">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            index="02"
            eyebrow="Client work · Freelance"
            id="clients-title"
            title="Shipped for real clients"
            lede="Since March 2026 I've been building and launching websites for businesses — from the frontend down to the database and storage."
            aside={
              <span className="inline-flex items-center gap-2 font-mono text-[11px] text-fg-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
                {clients.length} sites live
              </span>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={i * 80} className="h-full">
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="lift group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-bg-1 hover:bg-bg-2/40"
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-3 border-b border-line bg-bg-2/60 px-3.5 py-2">
                  <span className="flex gap-1.5" aria-hidden>
                    <i className="h-2 w-2 rounded-full bg-line-strong" />
                    <i className="h-2 w-2 rounded-full bg-line-strong" />
                    <i className="h-2 w-2 rounded-full bg-line-strong" />
                  </span>
                  <span className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-[11px] text-fg-muted">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ok" aria-hidden />
                    <span className="truncate">https://{c.domain}</span>
                  </span>
                </div>

                {/* Typographic "screen" */}
                <div className="relative overflow-hidden border-b border-line px-6 py-10 sm:px-8 sm:py-12">
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(70%_80%_at_30%_40%,black,transparent)]" />
                  <p className="relative label-mono">{c.sector}</p>
                  <h3 className="relative mt-3 text-3xl font-semibold tracking-tightest text-fg sm:text-4xl">{c.name}</h3>
                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors group-hover:text-fg">
                    Visit {c.domain} <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="text-pretty text-[15px] leading-relaxed text-fg-muted">{c.summary}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Technologies">
                    {c.technologies.map((t) => (
                      <li key={t} className="rounded border border-line bg-bg-2 px-2 py-0.5 font-mono text-[11px] text-fg-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
