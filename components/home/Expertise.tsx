import { skillGroups } from "@/data/skills";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import TileFan from "@/components/home/ExpertiseTiles";
import { cn } from "@/lib/cn";

/** The CV's skills, group for group. Nothing is folded away: it has to scan. */
export default function Expertise() {
  return (
    <section id="expertise" className="overflow-hidden bg-bg-1 py-24 md:py-36" aria-labelledby="expertise-title">
      <div className="container-site">
        <SectionHead
          align="left"
          eyebrow="Technical expertise"
          id="expertise-title"
          title="The toolkit"
          lede="Grouped the way they appear on my CV. No percentages — those were never measurements."
        />

        <ul className="mt-12 border-t border-line md:mt-16">
          {skillGroups.map((g, i) => (
            <Reveal as="li" key={g.id} delay={i * 40} className="fan-host border-b border-line">
              <div className="grid gap-x-8 gap-y-4 py-8 md:grid-cols-12 md:items-center md:py-7">
                <div className="md:col-span-4">
                  <h3 className="text-[23px] tracking-[-0.025em] md:text-[25px]">{g.label}</h3>
                  {g.inProgress ? (
                    <p className="mt-1 inline-flex items-center gap-2 text-[15px] text-warn">
                      <span className="h-2 w-2 rounded-full bg-warn" aria-hidden />
                      In progress
                    </p>
                  ) : (
                    <p className="mt-1 text-[15px] text-fg-dim">{g.tag}</p>
                  )}
                </div>
                <ul
                  className={cn(
                    "dots flex flex-wrap gap-y-1 text-[18px] leading-[1.45] tracking-[-0.015em] md:col-span-8 lg:col-span-5",
                    g.primary ? "text-fg" : "text-fg-muted"
                  )}
                >
                  {g.skills.map((s) => (
                    <li key={s} className="whitespace-nowrap">
                      {s}
                    </li>
                  ))}
                </ul>
                <TileFan id={g.id} className="hidden lg:col-span-3 lg:block" />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
