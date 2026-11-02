import Image from "next/image";
import SceneHeader from "@/components/home/SceneHeader";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ClipReveal from "@/components/motion/ClipReveal";
import Viewfinder from "@/components/brand/Viewfinder";
import { site } from "@/data/site";
import { education, learning } from "@/data/experience";
import { ArrowRight, Download } from "@/components/ui/Icons";

/** Scene 08 — the person behind the work. */
export default function AboutSection() {
  return (
    <section id="about" className="relative bg-bg py-28 md:py-40" aria-labelledby="about-title">
      <div className="container-site">
        <SceneHeader index="08" label="About" id="about-title" title="Behind the systems" />

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-12">
          {/* Portrait, framed like a still from a film. */}
          <div className="lg:col-span-5">
            <figure className="relative">
              <ClipReveal className="aspect-[1000/1133] bg-night" radius={24}>
                <Image
                  src="/about/iqram.jpg"
                  alt="Iqram Patel standing still in a moving crowd, wearing a maroon football jersey and white trousers."
                  fill
                  sizes="(min-width: 1320px) 520px, (min-width: 1024px) 40vw, 92vw"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
                <Viewfinder inset="inset-4 md:inset-5" />
              </ClipReveal>
              <figcaption className="hud mt-4 flex items-center justify-between">
                <span>{site.fullName}</span>
                <span>{site.location}</span>
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div className="flex flex-col gap-6 text-pretty text-[18px] leading-relaxed text-fg-muted md:text-xl md:leading-relaxed">
                <p className="text-fg">
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
              <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                <div className="bg-bg-1 p-6">
                  <dt className="hud">Education</dt>
                  <dd className="mt-2 text-[15px] font-medium text-fg">{education.degree}</dd>
                  <dd className="mt-1 font-mono text-xs text-fg-muted">
                    {education.institution} · {education.period}
                  </dd>
                </div>
                <div className="bg-bg-1 p-6">
                  <dt className="hud">Learning</dt>
                  <dd className="mt-2 text-[15px] font-medium text-fg">{learning.programme}</dd>
                  <dd className="mt-1 font-mono text-xs text-fg-muted">
                    {learning.provider} · <span className="text-ok">{learning.status}</span>
                  </dd>
                </div>
                <div className="bg-bg-1 p-6 sm:col-span-2">
                  <dt className="hud">Currently</dt>
                  <dd className="mt-2 text-[15px] text-fg">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-ok align-middle" aria-hidden />
                    Freelancing · {site.availability.toLowerCase()}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={180} className="mt-10 flex flex-wrap gap-3">
              <Button href="/resume">
                View résumé <ArrowRight size={15} />
              </Button>
              <Button href={site.resumeFile} variant="secondary" download={site.resumeDownloadName}>
                <Download size={15} /> Download CV
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
