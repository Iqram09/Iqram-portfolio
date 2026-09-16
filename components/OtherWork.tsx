import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ProjectFilters from "@/components/ProjectFilters";
import { site } from "@/data/site";
import { ArrowUpRight } from "@/components/ui/Icons";

export default function OtherWork() {
  return (
    <section id="projects" className="border-t border-line bg-bg-1/40 py-20 md:py-28" aria-labelledby="projects-title">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            index="05"
            eyebrow="Selected work"
            id="projects-title"
            title="Other selected work"
            lede="Earlier full-stack and data work, kept for the record. Kong remains the flagship."
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
        <Reveal delay={80} className="mt-10">
          <ProjectFilters />
        </Reveal>
      </div>
    </section>
  );
}
