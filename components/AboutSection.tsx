import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { kong } from "@/data/kong";
import { Github, Linkedin } from "@/components/ui/Icons";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line py-20 md:py-28" aria-labelledby="about-title">
      <div className="container-site grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <SectionHeader index="09" eyebrow="About" id="about-title" title="About" />
          <div className="mt-8 flex max-w-prose flex-col gap-5 text-pretty text-[17px] leading-relaxed text-fg-muted">
            <p>
              I&rsquo;m a software engineer from Mumbai focused on building reliable software systems and
              exploring AI platform engineering.
            </p>
            <p>
              My work sits at the intersection of APIs, infrastructure, full-stack development and agentic AI.
              At Allied Globetech that meant Kong, CA Layer7 and Apigee integrations for client projects; on my
              own time it meant building an MCP server and evaluation harness around a real gateway.
            </p>
            <p>
              I&rsquo;m particularly interested in systems where AI capabilities are constrained by strong
              interfaces, evaluated with real data and made observable enough to debug.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} className="md:col-span-5">
          <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 md:grid-cols-1">
            <div className="bg-bg-1 p-5">
              <dt className="label-mono">name</dt>
              <dd className="mt-1.5 text-sm text-fg">{site.fullName}</dd>
            </div>
            <div className="bg-bg-1 p-5">
              <dt className="label-mono">based in</dt>
              <dd className="mt-1.5 text-sm text-fg">{site.location}</dd>
            </div>
            <div className="bg-bg-1 p-5">
              <dt className="label-mono">building toward</dt>
              <dd className="mt-1.5 text-sm text-fg">AI platform engineering roles</dd>
            </div>
            <div className="bg-bg-1 p-5">
              <dt className="label-mono">currently</dt>
              <dd className="mt-1.5 text-sm text-fg">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-ok align-middle" aria-hidden />
                {site.availability}
              </dd>
            </div>
            <div className="bg-bg-1 p-5 sm:col-span-2 md:col-span-1">
              <dt className="label-mono">elsewhere</dt>
              <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
                  <Github size={14} /> github.com/{site.githubHandle}
                </a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
                  <Linkedin size={14} /> {site.linkedinHandle}
                </a>
              </dd>
            </div>
            <div className="bg-bg-1 p-5 sm:col-span-2 md:col-span-1">
              <dt className="label-mono">proof of work</dt>
              <dd className="mt-1.5 text-sm text-fg">
                <a href={kong.repo} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-fg-muted hover:text-fg">
                  {kong.repoName}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
