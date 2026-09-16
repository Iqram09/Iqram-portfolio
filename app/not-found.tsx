import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "404 — route not found",
};

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" />
      <div className="relative w-full max-w-lg">
        <div className="overflow-hidden rounded-xl border border-line bg-bg-1">
          <div className="flex items-center justify-between border-b border-line bg-bg-2/60 px-4 py-2 font-mono text-[11px] text-fg-muted">
            <span>iqram@portfolio:~</span>
            <span className="text-err">exit 404</span>
          </div>
          <div className="px-6 py-8 font-mono text-sm leading-relaxed text-fg-muted">
            <p className="text-fg">
              <span className="text-accent">$</span> find_route_by_path --path &quot;{"{requested}"}&quot;
            </p>
            <h1 className="mt-4 text-6xl font-medium tabular-nums tracking-tight text-fg md:text-7xl">404</h1>
            <p className="mt-2 text-accent">route not found</p>
            <p className="mt-4 text-fg">This one isn&rsquo;t in the registry.</p>
            <p className="mt-1 text-[12px] text-fg-dim">matched 0 routes · no near-miss suggestions</p>
          </div>
          <div className="border-t border-line px-6 py-4">
            <Button href="/" variant="secondary" size="sm">
              <ArrowLeft size={14} /> Back to home
            </Button>
          </div>
        </div>
        <p className="mt-4 text-center font-mono text-[11px] text-fg-dim">
          Looking for the case study?{" "}
          <Link href="/projects/kong-ai-gateway-diagnostics" className="text-fg-muted underline underline-offset-4 hover:text-fg">
            /projects/kong-ai-gateway-diagnostics
          </Link>
        </p>
      </div>
    </main>
  );
}
