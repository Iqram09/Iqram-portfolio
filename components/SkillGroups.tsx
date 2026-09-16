import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

export default function SkillGroups() {
  return (
    <section className="border-t border-line bg-bg-1/40 py-20 md:py-28" aria-labelledby="skills-title">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            index="07"
            eyebrow="Capabilities"
            id="skills-title"
            title="Skills"
            lede="Grouped by where they get used. No percentages — those were never measurements."
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-6">
          {skillGroups.map((g, i) => (
            <Reveal
              key={g.id}
              delay={i * 40}
              className={`bg-bg p-6 ${g.span === 3 ? "md:col-span-3" : "md:col-span-2"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-fg">{g.label}</h3>
                <span className="font-mono text-[10px] text-fg-dim">{g.tag}</span>
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
