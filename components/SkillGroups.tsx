import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

export default function SkillGroups() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-line py-20 md:py-28" aria-labelledby="skills-title">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            index="06"
            eyebrow="Capabilities"
            id="skills-title"
            title="Skills"
            lede="Grouped the way they appear on my CV. No percentages — those were never measurements."
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal
              key={g.id}
              delay={i * 40}
              className={`bg-bg p-6 ${i === skillGroups.length - 1 ? "sm:col-span-2 lg:col-span-3" : ""}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-fg">{g.label}</h3>
                {g.inProgress ? (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-warn">
                    <span className="h-1.5 w-1.5 rounded-full bg-warn" aria-hidden />
                    in progress
                  </span>
                ) : (
                  <span className="font-mono text-[10px] text-fg-dim">{g.tag}</span>
                )}
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.skills.map((s) => (
                  <li
                    key={s}
                    className={`rounded-md border px-2.5 py-1 text-[13px] transition-colors hover:border-line-strong hover:text-fg ${
                      g.primary ? "border-line-strong bg-bg-2 text-fg" : "border-line bg-bg-1 text-fg-muted"
                    }`}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
