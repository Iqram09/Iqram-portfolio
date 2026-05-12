"use client";
import { useInView } from "@/hooks/useInView";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { CiLinkedin } from "react-icons/ci";

const facts = [
  { icon: <HiLocationMarker />, text: "Mumbai, India" },
  { icon: <HiMail />, text: "mdipramp@gmail.com" },
  { icon: <HiPhone />, text: "+91 93245 33302" },
  { icon: <SiGithub />, text: "github.com/Iqram09" },
  { icon: <CiLinkedin />, text: "linkedin.com/in/iqram-patel09" },
];

const stats = [
  { n: "⚽", label: "Football Passion" },
  { n: "🎮", label: "Game Dev Hobby" },
  { n: "🎧", label: "Music & Focus" },
  { n: "💡", label: "Always Exploring" },
];

export default function About() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className={`py-28 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[#00C9B1] font-mono text-sm">01.</span>
          <h2 className="font-display font-bold text-3xl text-white">About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#1E2D4A] to-transparent" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* text col */}
          <div className="lg:col-span-3 space-y-5">
            <p className="text-slate-400 leading-relaxed text-[15px]">
              I&apos;m a passionate <span className="text-white font-medium">Full-Stack Developer</span> with
              hands-on experience building web and mobile applications across consulting and product companies
              in Mumbai. I enjoy blending clean UI/UX with robust backend architecture.
            </p>

            <p className="text-slate-400 leading-relaxed text-[15px]">
              Currently, I&apos;m expanding into{" "}
              <span className="text-[#00C9B1] font-medium">Data Science</span> through the{" "}
              <span className="text-[#00C9B1] font-semibold">
                Codebasics Data Science Foundation Bootcamp with Virtual Internship
              </span>
              , where I&apos;m learning Python, machine learning, statistical analysis, and building real-world
              data projects that I can showcase.
            </p>

            <p className="text-slate-400 leading-relaxed text-[15px]">
              My engineering background (Bachelor of Science in Information Technology, Mumbai University) gives me a strong analytical
              foundation — now supercharged with modern data tools and cloud technologies.
            </p>

            {/* contact pills */}
            <div className="grid sm:grid-cols-2 gap-2 pt-2">
              {facts.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-[#0F1629] border border-[#1E2D4A] rounded-xl px-3.5 py-2.5 text-sm text-slate-400 hover:border-[#00C9B1]/40 hover:text-slate-200 transition-all"
                >
                  <span className="text-[#00C9B1] text-base flex-shrink-0">{f.icon}</span>
                  <span className="truncate">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* stats + learning col */}
          <div className="lg:col-span-2">
            {/* hobbies heading */}
            <div className="flex items-center gap-2 mb-4 pl-1">
              <span className="w-2 h-2 rounded-full bg-[#00C9B1] animate-pulse flex-shrink-0" />
              <span className="text-[#00C9B1] text-xs font-semibold uppercase tracking-[0.25em]">
                Hobbies
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-[#0F1629] border border-[#1E2D4A] rounded-2xl p-5 text-center card-glow"
                >
                  <p className="font-display font-extrabold text-4xl mb-1">{s.n}</p>
                  <p className="text-slate-400 text-xs leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* currently learning card */}
            <div className="mt-4 bg-gradient-to-br from-[#00C9B1]/10 to-purple-500/8 border border-[#00C9B1]/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#00C9B1] animate-pulse" />
                <span className="text-[#00C9B1] text-xs font-semibold uppercase tracking-widest">
                  Currently Learning
                </span>
              </div>

              <p className="text-white font-semibold text-sm mb-1">DS Foundation Bootcamp</p>
              <p className="text-slate-400 text-xs">Codebasics · Virtual Internship</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Python", "ML", "EDA", "Statistics", "SQL"].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 bg-[#00C9B1]/10 text-[#00C9B1] rounded-full border border-[#00C9B1]/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}