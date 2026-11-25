import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Window from "@/components/ui/Window";
import { ArrowLeft } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "404 — route not found",
};

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-screen items-center overflow-hidden py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(60%_60%_at_70%_40%,black,transparent)]" />
      <div className="container-site relative grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h1 className="display text-[clamp(8rem,24vw,19rem)] leading-[0.8] tabular-nums">404</h1>
          <p className="mt-6 text-[22px] tracking-[-0.02em] text-accent">route not found</p>
          <p className="mt-1 text-[22px] tracking-[-0.02em]">This one isn&rsquo;t in the registry.</p>
          <div className="mt-8">
            <Button href="/">
              <ArrowLeft size={17} /> Back to home
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Window title="iqram@portfolio:~" meta={<span className="text-err">exit 404</span>} className="!border-term">
            <div className="bg-term px-5 py-7 font-mono text-[14px] leading-relaxed text-term-muted">
              <p className="text-term-fg">
                <span className="text-term-accent">$</span> find_route_by_path --path &quot;{"{requested}"}&quot;
              </p>
              <p className="mt-3 text-term-dim">matched 0 routes · no near-miss suggestions</p>
            </div>
          </Window>
          <p className="mt-5 text-[15px] text-fg-muted">
            Looking for the case study?{" "}
            <Link
              href="/projects/kong-ai-gateway-diagnostics"
              className="break-words text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
            >
              /projects/kong-ai-gateway-diagnostics
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
