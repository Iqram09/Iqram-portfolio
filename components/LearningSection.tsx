import { education, learning } from "@/data/experience";
import Reveal from "@/components/ui/Reveal";

/** Demoted from the old site's hero-level bootcamp card: a compact, truthful panel. */
export default function LearningSection() {
  return (
    <section className="border-t border-line py-14 md:py-16" aria-labelledby="learning-title">
      <div className="container-site">
        <Reveal>
          <div className="grid gap-6 rounded-xl border border-line bg-bg-1 p-6 md:grid-cols-12 md:items-center md:p-8">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3">
                <span className="section-index">08</span>
                <span className="h-px w-6 bg-line-strong" aria-hidden />
                <span className="label-mono">Learning</span>
              </div>
              <h2 id="learning-title" className="mt-3 text-xl font-semibold tracking-tight text-fg">
                {learning.programme}
              </h2>
              <p className="mt-1 font-mono text-xs text-fg-muted">
                {learning.provider} · <span className="text-ok">{learning.status}</span>
              </p>
            </div>

            <div className="md:col-span-5">
              <p className="label-mono">current areas</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {learning.areas.map((a) => (
                  <li key={a} className="rounded-md border border-line bg-bg-2 px-2.5 py-1 text-[13px] text-fg-muted">
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line pt-5 md:col-span-3 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <p className="label-mono">education</p>
              <p className="mt-2 text-sm font-medium text-fg">{education.degree}</p>
              <p className="mt-0.5 font-mono text-xs text-fg-muted">
                {education.institution} · {education.period}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
