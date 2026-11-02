import Image from "next/image";
import { clients } from "@/data/experience";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import SceneHeader from "@/components/home/SceneHeader";
import ClipReveal from "@/components/motion/ClipReveal";
import Reveal from "@/components/ui/Reveal";
import Viewfinder from "@/components/brand/Viewfinder";
import { ArrowUpRight, Github } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/** Scene 04 — freelance client work (both sites live), then side projects. */
export default function ClientWork() {
  return (
    <section id="clients" className="relative bg-bg pb-28 pt-8 md:pb-40" aria-labelledby="clients-title">
      <div className="container-site">
        <SceneHeader
          index="04"
          label="Client work"
          id="clients-title"
          title="Shipped for real clients"
          lede="Since March 2026 I've been building and launching websites for businesses — from the interface down to the database and storage."
          aside={
            <span className="hud inline-flex items-center gap-2 text-fg-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
              {clients.length} sites live
            </span>
          }
        />

        <ol className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-36">
          {clients.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={c.name} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                {/* 16:9 preview. */}
                <div className={cn("lg:col-span-8", flip && "lg:order-2 lg:col-start-5")}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <span className="sr-only">(opens in a new tab)</span>
                    <ClipReveal className="aspect-video bg-night" radius={24}>
                      <Image
                        src={c.image.src}
                        alt={c.image.alt}
                        fill
                        sizes="(min-width: 1320px) 860px, (min-width: 1024px) 64vw, 92vw"
                        className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.03]"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/10" />
                      <Viewfinder inset="inset-4 md:inset-6" />
                      {/* Glass overlay: the live address. */}
                      <div className="glass glass-blur glass-strong absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-full py-2 pl-4 pr-2 md:bottom-6 md:left-6 md:right-auto md:min-w-[340px]">
                        <span className="flex min-w-0 items-center gap-2 font-mono text-[11px] text-fg-muted">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ok" aria-hidden />
                          <span className="truncate">https://{c.domain}</span>
                        </span>
                        <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-fg px-3 text-[12px] font-medium text-bg transition-colors group-hover:bg-white">
                          Visit <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </ClipReveal>
                  </a>
                </div>

                {/* Editorial copy. */}
                <Reveal className={cn("lg:col-span-4", flip && "lg:order-1 lg:col-start-1")}>
                  <p className="hud flex items-center gap-3">
                    <span className="text-warm-soft">0{i + 1}</span>
                    <span aria-hidden className="h-px w-8 bg-line-strong" />
                    {c.sector}
                  </p>
                  <h3 className="display mt-5 text-[clamp(2.4rem,4.4vw,4.25rem)] text-fg">{c.name}</h3>
                  <dl className="mt-7 grid grid-cols-2 gap-4 border-y border-line py-4 font-mono text-[11px]">
                    <div>
                      <dt className="hud">Delivered</dt>
                      <dd className="mt-1 text-fg">{c.role}</dd>
                    </div>
                    <div>
                      <dt className="hud">Year</dt>
                      <dd className="mt-1 text-fg">{c.year}</dd>
                    </div>
                  </dl>
                  <p className="mt-6 text-pretty text-[16px] leading-relaxed text-fg-muted">{c.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2" aria-label="Technologies">
                    {c.technologies.map((t) => (
                      <li key={t} className="hud text-fg-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* Side projects. */}
        <Reveal className="mt-28 md:mt-40">
          <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
            <h3 className="display text-3xl text-fg md:text-4xl">Also built</h3>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hud inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
            >
              github.com/{site.githubHandle} <ArrowUpRight size={12} />
            </a>
          </div>
          <ul>
            {projects.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid items-baseline gap-2 py-6 transition-colors md:grid-cols-12 md:gap-6"
                >
                  <span className="hud md:col-span-1">{p.category}</span>
                  <span className="text-xl font-medium tracking-tight text-fg md:col-span-4">
                    {p.title} <span className="text-fg-dim">— {p.subtitle}</span>
                  </span>
                  <span className="text-pretty text-sm leading-relaxed text-fg-muted md:col-span-5">{p.description}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors group-hover:text-fg md:col-span-2 md:justify-end">
                    <Github size={14} /> Source <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
