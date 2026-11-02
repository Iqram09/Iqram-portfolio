import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { ArrowUpRight } from "@/components/ui/Icons";

export default function OtherWork() {
  return (
    <section id="projects" className="scroll-mt-20 border-t border-line bg-bg-1/40 py-20 md:py-28" aria-labelledby="projects-title">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            index="05"
            eyebrow="Projects"
            id="projects-title"
            title="Side projects"
            lede="Mobile, web and data work built outside client engagements."
            aside={
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-muted transition-colors hover:text-fg"
              >
                github.com/{site.githubHandle} <ArrowUpRight size={13} />
              </a>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
