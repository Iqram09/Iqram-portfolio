import { LuGithub, LuLinkedin, LuMail, LuMapPin } from "react-icons/lu";

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-border bg-surface/30">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-bright mb-6">
          Have a system worth building?
        </h2>
        <p className="text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
          Open to software engineering and AI engineering opportunities. Let&apos;s build infrastructure that works.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <a
            href="mailto:mdipramp@gmail.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-bright text-primary font-medium rounded-lg hover:bg-bright/90 transition-colors"
          >
            <LuMail size={20} />
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/iqram-patel09/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface text-bright border border-border rounded-lg hover:border-accent/50 transition-colors"
          >
            <LuLinkedin size={20} />
            LinkedIn
          </a>
          <a
            href="https://github.com/Iqram09"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface text-bright border border-border rounded-lg hover:border-accent/50 transition-colors"
          >
            <LuGithub size={20} />
            GitHub
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-mono text-muted">
          <div className="flex items-center gap-2">
            <LuMapPin size={16} className="text-accent" />
            Mumbai, India
          </div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-border" />
          <div>mdipramp@gmail.com</div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-border" />
          <div>+91 9324533302</div>
        </div>
      </div>
    </section>
  );
}