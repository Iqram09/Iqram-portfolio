import Link from "next/link";
import { LuArrowLeft, LuDownload, LuExternalLink, LuFileText } from "react-icons/lu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Iqram Patel — Resume",
  description: "View and download Iqram Patel's resume.",
};

const RESUME_FILENAME = "Iqram_Patel_CV.pdf";

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-24 bg-primary text-bright selection:bg-accent/30 font-sans min-h-screen">
        <section className="py-12 border-b border-border bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-primary to-primary">
          <div className="max-w-6xl mx-auto px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted hover:text-bright transition-colors mb-8 font-mono text-sm"
            >
              <LuArrowLeft size={16} /> Home / Resume
            </Link>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left Panel: Sticky Information */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 animate-slide-up">
                <div className="flex items-center gap-2 mb-4">
                  <LuFileText className="text-accent" size={24} />
                  <h1 className="text-3xl font-bold tracking-tight text-bright">RESUME</h1>
                </div>
                
                <h2 className="text-xl font-bold text-bright mb-1">Iqram Patel</h2>
                <p className="text-accent font-mono text-sm mb-6">AI / Software Engineer</p>
                
                <p className="text-muted leading-relaxed mb-6">
                  Software engineering, AI platform, and full-stack experience.
                </p>
                
                <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-md border border-border text-xs font-mono text-muted mb-8 w-max">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow"></span>
                  Open to opportunities
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={`/${RESUME_FILENAME}`}
                    download="Iqram-Patel-CV.pdf"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bright text-primary font-medium rounded-lg hover:bg-bright/90 transition-colors w-full"
                  >
                    <LuDownload size={18} />
                    Download PDF
                  </a>
                  <a
                    href={`/${RESUME_FILENAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface text-bright border border-border rounded-lg hover:border-accent/50 transition-colors w-full"
                  >
                    <LuExternalLink size={18} />
                    Open full screen
                  </a>
                </div>
              </div>

              {/* Right Panel: PDF Viewer */}
              <div className="lg:col-span-8 animate-fade-in w-full h-[70vh] lg:h-[80vh] bg-surface rounded-xl border border-border overflow-hidden shadow-2xl flex items-center justify-center relative">
                {/* Fallback for browsers that don't support PDF embedding well */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 -z-10">
                   <LuFileText className="text-border mb-4" size={48} />
                   <p className="text-muted mb-4">If the PDF doesn&apos;t load, you can download it directly.</p>
                </div>
                
                <iframe
                  src={`/${RESUME_FILENAME}#toolbar=0&navpanes=0`}
                  title="Iqram Patel Resume"
                  className="w-full h-full border-none z-10 bg-white"
                  aria-label="PDF Resume Viewer"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
