import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Motif from "@/components/ui/Motif";
import Window from "@/components/ui/Window";
import { site } from "@/data/site";
import { Github, Linkedin, Mail } from "@/components/ui/Icons";

const rows = [
  { k: "email", v: site.email, href: `mailto:${site.email}` },
  { k: "github", v: `github.com/${site.githubHandle}`, href: site.github, external: true },
  { k: "linkedin", v: `linkedin.com/in/${site.linkedinHandle}`, href: site.linkedin, external: true },
  { k: "location", v: site.location },
  { k: "phone", v: site.phone, href: site.phoneHref },
];

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-20 md:py-28" aria-labelledby="contact-title">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-6">
          <div className="flex items-center gap-3">
            <span className="section-index">10</span>
            <span className="h-px w-6 bg-line-strong" aria-hidden />
            <span className="label-mono">Contact</span>
          </div>
          <h2 id="contact-title" className="mt-5 text-balance text-4xl font-semibold tracking-tightest text-fg md:text-5xl">
            Have a system worth building?
          </h2>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-fg-muted">
            Open to software engineering and AI engineering opportunities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${site.email}`}>
              <Mail size={16} /> Email me
            </Button>
            <Button href={site.linkedin} variant="secondary" external>
              <Linkedin size={15} /> LinkedIn
            </Button>
            <Button href={site.github} variant="secondary" external>
              <Github size={15} /> GitHub
            </Button>
          </div>
          <Motif className="mt-8" />
        </Reveal>

        <Reveal delay={100} className="lg:col-span-6">
          <Window title="iqram@portfolio:~" meta="bash">
            <div className="term px-5 py-5 font-mono text-[13px] leading-[1.9] text-fg-muted">
              <p className="text-fg">
                <span className="text-accent">iqram@portfolio</span>
                <span className="text-fg-dim">:~$</span>{" "}
                <span className="term-typed">contact --open</span>
              </p>
              <ul className="mt-1">
                {rows.map((r, i) => (
                  <li key={r.k} className="term-line flex gap-3" style={{ animationDelay: `${900 + i * 140}ms` }}>
                    <span className="text-line-strong" aria-hidden>
                      →
                    </span>
                    <span className="w-20 shrink-0 text-fg-dim">{r.k}</span>
                    {r.href ? (
                      <a
                        href={r.href}
                        target={r.external ? "_blank" : undefined}
                        rel={r.external ? "noopener noreferrer" : undefined}
                        className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        {r.v}
                      </a>
                    ) : (
                      <span className="text-fg">{r.v}</span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="term-line mt-1" style={{ animationDelay: `${900 + rows.length * 140 + 100}ms` }}>
                <span className="text-ok">✓</span> channels open
              </p>
              <p className="term-line mt-1 text-fg" style={{ animationDelay: `${900 + rows.length * 140 + 400}ms` }}>
                <span className="text-accent">iqram@portfolio</span>
                <span className="text-fg-dim">:~$</span> <span className="caret" />
              </p>
            </div>
          </Window>
        </Reveal>
      </div>
    </section>
  );
}
