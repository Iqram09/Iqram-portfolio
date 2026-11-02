import { skillGroups } from "@/data/skills";
import SceneHeader from "@/components/home/SceneHeader";
import Reveal from "@/components/ui/Reveal";
import Glow from "@/components/brand/Glow";
import { cn } from "@/lib/cn";

/** Scene 07 — the CV's skills, group for group, as editorial rows. */
export default function Expertise() {
  return (
    <section id="expertise" className="relative overflow-hidden bg-bg py-28 md:py-40" aria-labelledby="expertise-title">
      <Glow tone="warm" className="-left-[26rem] top-[20%] w-[860px] [--glow-opacity:0.22]" />
      <div className="container-site relative">
        <SceneHeader
          index="07"
          label="Technical expertise"
          id="expertise-title"
          title="The toolkit"
          lede="Grouped the way they appear on my CV. No percentages — those were never measurements."
        />

        <ul className="mt-16 border-t border-line md:mt-24">
          {skillGroups.map((g, i) => (
            <Reveal as="li" key={g.id} delay={i * 50} className="border-b border-line">
              <div className="group grid gap-4 py-8 transition-colors duration-500 md:grid-cols-12 md:gap-8 md:py-10">
                <div className="flex items-baseline gap-4 md:col-span-4">
                  <span className="font-mono text-[11px] tabular-nums text-warm-soft">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">{g.label}</h3>
                </div>
                <p
                  className={cn(
                    "text-pretty text-lg leading-relaxed md:col-span-7 md:text-xl",
                    g.primary ? "text-fg" : "text-fg-muted"
                  )}
                >
                  {g.skills.map((s, j) => (
                    <span key={s}>
                      <span className="whitespace-nowrap transition-colors duration-300 group-hover:text-fg">{s}</span>
                      {j < g.skills.length - 1 && (
                        <span aria-hidden className="mx-2.5 text-line-strong">
                          /
                        </span>
                      )}
                    </span>
                  ))}
                </p>
                <div className="whitespace-nowrap md:col-span-1 md:flex md:justify-end">
                  {g.inProgress ? (
                    <span className="hud inline-flex items-center gap-1.5 text-warn">
                      <span className="h-1.5 w-1.5 rounded-full bg-warn" aria-hidden />
                      In progress
                    </span>
                  ) : (
                    <span className="hud">{g.tag}</span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
