import { site } from "@/data/site";
import Button from "@/components/ui/Button";
import Motif from "@/components/ui/Motif";
import SystemGraph from "@/components/SystemGraph";
import { ArrowRight, Github, FileText, MapPin } from "@/components/ui/Icons";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-[calc(var(--nav-h)+48px)] pb-16 md:pt-[calc(var(--nav-h)+80px)] md:pb-24"
      aria-labelledby="hero-title"
    >
      {/* Restrained accent field — one soft radial, no blobs. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_50%_at_70%_0%,rgba(56,189,248,0.10),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="container-site relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <div className="animate-fade-up flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-fg-muted">
            <span className="text-fg">{site.displayName}</span>
            <span aria-hidden className="text-line-strong">/</span>
            <span>{site.role}</span>
          </div>

          <h1
            id="hero-title"
            className="animate-fade-up mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-tightest text-fg sm:text-6xl lg:text-[3.4rem] xl:text-[4rem] [animation-delay:60ms]"
          >
            I build AI systems with{" "}
            <span className="text-fg-muted">software engineering discipline.</span>
          </h1>

          <p className="animate-fade-up mt-7 max-w-xl text-pretty text-lg leading-relaxed text-fg [animation-delay:120ms]">
            Software engineer focused on AI platforms, agentic systems, API architecture, and
            full-stack engineering.
          </p>
          <p className="animate-fade-up mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-fg-muted [animation-delay:160ms]">
            I like building systems where AI is constrained by strong interfaces, evaluated with
            real data, and connected to infrastructure through explicit engineering boundaries.
          </p>

          <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-3 [animation-delay:220ms]">
            <Button href="/#work">
              View selected work <ArrowRight size={16} />
            </Button>
            <Button href="/resume" variant="secondary">
              <FileText size={16} /> View resume
            </Button>
            <Button href={site.github} variant="ghost" external>
              <Github size={16} /> GitHub
            </Button>
          </div>

          <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 [animation-delay:280ms]">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-fg-muted">
              <MapPin size={14} className="text-fg-dim" />
              {site.location}
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-fg-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
              {site.availability}
            </span>
            <Motif />
          </div>
        </div>

        {/* Visual */}
        <div className="animate-fade-in lg:col-span-6 [animation-delay:200ms]">
          <SystemGraph />
        </div>
      </div>
    </section>
  );
}
