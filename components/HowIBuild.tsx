import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

const principles = [
  {
    n: "1",
    title: "Build the system, not just the demo.",
    body:
      "A demo is one happy path. A system has a step limit, a context budget, a halt path, an audit log and a test for each of them. The Kong project ships all of those before it ships a screenshot.",
    proof: "170 tests · bounded agent loop · structural read-only guarantee",
  },
  {
    n: "2",
    title: "Let code own facts; let AI own investigation.",
    body:
      "The model is good at sequencing an investigation from a vague description and bad at being trusted with infrastructure state. So it chooses tools and writes prose, and eleven pure rules over Kong data produce every finding.",
    proof: "11 deterministic rules · ~64 ms · no model in the fact path",
  },
  {
    n: "3",
    title: "Measure before claiming.",
    body:
      "Numbers are reported only if they were measured: provider-reported tokens, nearest-rank percentiles, a cost table with its source and date. Where a figure is unavailable the output says so instead of printing zero.",
    proof: "28-case harness · deterministic scorer · four runs kept, including the bad ones",
  },
  {
    n: "4",
    title: "Document failures, not just successes.",
    body:
      "Thirteen failures observed while building were written up with symptom, root cause, impact, mitigation and regression test. Twenty-three more were deliberately provoked and verified.",
    proof: "docs/failure-modes.md · every entry tied to a test",
  },
];

export default function HowIBuild() {
  return (
    <section className="border-t border-line bg-bg-1/40 py-20 md:py-28" aria-labelledby="how-title">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            index="03"
            eyebrow="Principles"
            id="how-title"
            title="How I build"
            lede="Four rules I keep returning to. Each one is written down because the Kong project forced it."
          />
        </Reveal>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-16 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.n} as="li" delay={i * 70} className="bg-bg">
              <div className="group flex h-full flex-col p-7 transition-colors hover:bg-bg-1 md:p-9">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-5xl font-medium leading-none tracking-tight text-line-strong transition-colors group-hover:text-accent/70 md:text-6xl">
                    0{p.n}
                  </span>
                  <span className="label-mono">principle</span>
                </div>
                <h3 className="mt-8 text-balance text-xl font-semibold tracking-tight text-fg md:text-2xl">{p.title}</h3>
                <p className="mt-4 text-pretty text-[15px] leading-relaxed text-fg-muted">{p.body}</p>
                <p className="mt-auto pt-6 font-mono text-[11px] text-fg-dim">
                  <span className="text-accent">▸</span> {p.proof}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
