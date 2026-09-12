import Link from "next/link";
import { LuTerminal } from "react-icons/lu";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-primary p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center text-muted">
            <LuTerminal size={32} />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold font-mono text-bright">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-xl font-mono text-accent">route not found</h2>
          <p className="text-muted">That one isn&apos;t in the registry.</p>
        </div>

        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-bright border border-border rounded-lg hover:border-accent/50 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
