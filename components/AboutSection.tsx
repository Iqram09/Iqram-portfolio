import Image from "next/image";
import SectionHead from "@/components/ui/SectionHead";
import ScaleIn from "@/components/motion/ScaleIn";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { Dot, Tag } from "@/components/ui/Bits";
import { site } from "@/data/site";
import { education, learning } from "@/data/experience";
import { ArrowRight, Download } from "@/components/ui/Icons";

/** The person behind the work. */
export default function AboutSection() {
  return (
    <section id="about" className="overflow-hidden bg-bg py-24 md:py-36" aria-labelledby="about-title">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <figure className="lg:col-span-5">
            <ScaleIn from={0.86} className="lg:sticky lg:top-28">
              <div className="relative aspect-[1000/1133] overflow-hidden rounded-[4px] bg-bg-3">
                <Image
                  src="/about/iqram.jpg"
                  alt="Iqram Patel standing still in a moving crowd, wearing a maroon football jersey and white trousers."
                  fill
                  sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 92vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 md:bottom-5 md:left-5">
                  <Tag>{site.fullName}</Tag>
                  <Tag>{site.location}</Tag>
                </figcaption>
              </div>
            </ScaleIn>
          </figure>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHead align="left" eyebrow="About" id="about-title" title="Behind the systems" />

            <Reveal className="mt-10">
              <div className="flex flex-col gap-6 text-pretty text-[18px] leading-[1.55] tracking-[-0.012em] text-fg-muted">
                <p className="text-[clamp(1.4rem,2vw,1.7rem)] leading-[1.34] tracking-[-0.025em] text-fg">
                  I&rsquo;m a full-stack and AI software engineer from Mumbai with {site.experienceYears} years of shipping
                  software end to end.
                </p>
                <p>
                  I started at Take Solutions building web applications from prototype to production. At Allied Globetech
                  I moved into enterprise integration — Kong, Layer7 and Apigee gateways for client projects, including
                  on-site work at a leading private-sector bank around its Oracle FLEXCUBE core-banking platform.
                </p>
                <p>
                  Today I freelance, building client websites with real backends, and I build AI systems where the model
                  is boxed in by strong interfaces — like an MCP server that lets an LLM agent diagnose Kong Gateway
                  without ever being able to change it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <dl className="mt-10 flex flex-col gap-2.5">
                <div className="grid gap-x-6 gap-y-1 rounded-lg border border-line bg-bg-1 px-5 py-4 sm:grid-cols-[7.5rem_1fr]">
                  <dt className="text-[15px] leading-7 text-fg-dim">Education</dt>
                  <dd>
                    <span className="block text-[18px] tracking-[-0.015em]">{education.degree}</span>
                    <span className="block text-[15px] text-fg-muted">
                      {education.institution} · {education.period}
                    </span>
                  </dd>
                </div>
                <div className="grid gap-x-6 gap-y-1 rounded-lg border border-line bg-bg-1 px-5 py-4 sm:grid-cols-[7.5rem_1fr]">
                  <dt className="text-[15px] leading-7 text-fg-dim">Learning</dt>
                  <dd>
                    <span className="block text-[18px] tracking-[-0.015em]">{learning.programme}</span>
                    <span className="block text-[15px] text-fg-muted">
                      {learning.provider} · <span className="text-ok">{learning.status}</span>
                    </span>
                  </dd>
                </div>
                <div className="grid gap-x-6 gap-y-1 rounded-lg border border-line bg-bg-1 px-5 py-4 sm:grid-cols-[7.5rem_1fr]">
                  <dt className="text-[15px] leading-7 text-fg-dim">Currently</dt>
                  <dd className="flex items-center gap-2.5 text-[18px] tracking-[-0.015em]">
                    <Dot pulse />
                    Freelancing · {site.availability.toLowerCase()}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={180} className="mt-9 flex flex-wrap gap-3">
              <Button href="/resume">
                View résumé <ArrowRight size={17} />
              </Button>
              <Button href={site.resumeFile} variant="secondary" download={site.resumeDownloadName}>
                <Download size={17} /> Download CV
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
