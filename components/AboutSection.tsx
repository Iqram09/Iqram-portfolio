import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";
import { education, learning } from "@/data/experience";
import { ArrowRight, Download } from "@/components/ui/Icons";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line bg-bg-1/40 py-20 md:py-28" aria-labelledby="about-title">
      <div className="container-site grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <SectionHeader index="07" eyebrow="About" id="about-title" title="About" />
          <div className="mt-8 flex max-w-prose flex-col gap-5 text-pretty text-[17px] leading-relaxed text-fg-muted">
            <p>
              I&rsquo;m a full-stack and AI software engineer from Mumbai with {site.experienceYears} years of
              shipping software end to end.
            </p>
            <p>
              I started at Take Solutions building web applications from prototype to production. At Allied
              Globetech I moved into enterprise integration — Kong, Layer7 and Apigee gateways for client projects,
              including on-site work at a leading private-sector bank around its Oracle FLEXCUBE core-banking
              platform.
            </p>
            <p>
              Today I freelance, building client websites with real backends, and I build AI systems where the model
              is boxed in by strong interfaces — like an MCP server that lets an LLM agent diagnose Kong Gateway
              without ever being able to change it.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/resume">
              View resume <ArrowRight size={15} />
            </Button>
            <Button href={site.resumeFile} variant="secondary" download={site.resumeDownloadName}>
              <Download size={15} /> Download PDF
            </Button>
          </div>
        </Reveal>

        <Reveal delay={80} className="md:col-span-5">
          <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 md:grid-cols-1">
            <div className="bg-bg-1 p-5">
              <dt className="label-mono">education</dt>
              <dd className="mt-1.5 text-sm font-medium text-fg">{education.degree}</dd>
              <dd className="mt-0.5 font-mono text-xs text-fg-muted">
                {education.institution} · {education.period}
              </dd>
            </div>
            <div className="bg-bg-1 p-5">
              <dt className="label-mono">learning</dt>
              <dd className="mt-1.5 text-sm font-medium text-fg">{learning.programme}</dd>
              <dd className="mt-0.5 font-mono text-xs text-fg-muted">
                {learning.provider} · <span className="text-ok">{learning.status}</span>
              </dd>
              <dd className="mt-3 flex flex-wrap gap-1.5">
                {learning.areas.map((a) => (
                  <span key={a} className="rounded border border-line bg-bg-2 px-2 py-0.5 font-mono text-[11px] text-fg-muted">
                    {a}
                  </span>
                ))}
              </dd>
            </div>
            <div className="bg-bg-1 p-5">
              <dt className="label-mono">based in</dt>
              <dd className="mt-1.5 text-sm text-fg">{site.location}</dd>
            </div>
            <div className="bg-bg-1 p-5">
              <dt className="label-mono">currently</dt>
              <dd className="mt-1.5 text-sm text-fg">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-ok align-middle" aria-hidden />
                Freelancing · {site.availability.toLowerCase()}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
