import { site } from "@/data/site";
import Button from "@/components/ui/Button";
import TrackPanel from "@/components/TrackPanel";
import { ArrowRight, FileText, Github, MapPin } from "@/components/ui/Icons";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-[calc(var(--nav-h)+48px)] pb-16 md:pt-[calc(var(--nav-h)+80px)] md:pb-24"
      aria-labelledby="hero-title"
    >
      {/* Restrained accent field — one soft radial, no blobs. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(55%_50%_at_75%_0%,rgba(56,189,248,0.10),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="container-site relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-6">
          <p className="animate-fade-up flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-xs text-fg-muted">
            <span className="text-fg">{site.role}</span>
            {site.supporting.map((s) => (
              <span key={s} className="inline-flex items-center gap-2">
                <span aria-hidden className="text-line-strong">·</span>
                {s}
              </span>
            ))}
          </p>

          <h1
            id="hero-title"
            className="animate-fade-up mt-6 text-balance text-[2.6rem] font-semibold leading-[1.03] tracking-tightest text-fg sm:text-6xl lg:text-[3.4rem] xl:text-[3.9rem] [animation-delay:60ms]"
          >
            {site.fullName.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-fg-muted">{site.fullName.split(" ").slice(-1)}</span>
          </h1>

          <p className="animate-fade-up mt-7 max-w-xl text-pretty text-lg leading-relaxed text-fg [animation-delay:120ms]">
            I ship software end to end — client websites with real backends, enterprise API
            integrations inside a bank, and an LLM agent that diagnoses Kong Gateway through an MCP
            server I built.
          </p>
          <p className="animate-fade-up mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-fg-muted [animation-delay:160ms]">
            {site.experienceYears} years across TypeScript, React, Next.js, Node.js, Python, Kong, Apigee
            and Docker. Currently deepening Data Science / ML through the Codebasics bootcamp.
          </p>

          <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-3 [animation-delay:220ms]">
            <Button href="/#work">
              View work <ArrowRight size={16} />
            </Button>
            <Button href="/resume" variant="secondary">
              <FileText size={16} /> Resume
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
          </div>
        </div>

        {/* Visual */}
        <div className="animate-fade-in lg:col-span-6 [animation-delay:200ms]">
          <TrackPanel />
        </div>
      </div>
    </section>
  );
}
