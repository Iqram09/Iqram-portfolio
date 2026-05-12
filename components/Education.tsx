"use client";
import { useInView } from "@/hooks/useInView";
import { HiBriefcase, HiAcademicCap } from "react-icons/hi";

const experience = [
  {
    role:    "Associate Consultant",
    org:     "Allied Globetech",
    period:  "May 2025 – Feb 2026",
    location:"Mumbai",
    desc:    ["Contributed to consulting projects, design, testing, and delivery of tech-driven solutions.", "Built internal tools and dashboards to streamline business processes."],
  },
  {
    role:    "Software Developer",
    org:     "Take Solutions",
    period:  "May 2024 – Apr 2025",
    location:"Mumbai",
    desc:    ["Developed scalable web and game solutions; led UI/UX prototyping with design teams.", "Optimised app performance and participated in Agile sprints using DevOps tooling."],
  },
  {
    role:    "Graphic Design Intern",
    org:     "Collective Heads Exp Mktg Sol Pvt Ltd",
    period:  "Oct 2023 – Apr 2024",
    location:"Mumbai",
    desc:    ["Created visual assets, event designs, and marketing collateral using Adobe Creative Suite.", "Supported branding and motion graphics for client campaigns."],
  },
];

const dsModules = [
  "Python for Data Science",
  "Pandas & NumPy",
  "Data Visualisation",
  "Statistics & Probability",
  "Machine Learning",
  "EDA & Feature Engineering",
  "SQL for Analytics",
  "Virtual Internship Projects",
];

export default function Education() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      id="education"
      ref={ref}
      className={`py-28 bg-[#0D1323] transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[#00C9B1] font-mono text-sm">04.</span>
          <h2 className="font-display font-bold text-3xl text-white">Experience & Education</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#1E2D4A] to-transparent" />
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Experience timeline */}
          <div className="lg:col-span-3">
            <h3 className="flex items-center gap-2 text-white font-semibold mb-6">
              <HiBriefcase className="text-[#00C9B1]" /> Work Experience
            </h3>
            <div className="space-y-1 relative">
              {/* vertical line */}
              <div className="absolute left-3.5 top-2 bottom-0 w-px bg-[#1E2D4A]" />

              {experience.map((e, i) => (
                <div key={i} className="relative pl-10 pb-8">
                  {/* dot */}
                  <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full border-2 border-[#00C9B1] bg-[#0D1323]" />

                  <div className="bg-[#0F1629] border border-[#1E2D4A] rounded-2xl p-5 card-glow">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h4 className="font-display font-bold text-white text-[15px]">{e.role}</h4>
                      <span className="text-[11px] bg-[#0D1323] border border-[#1E2D4A] text-slate-400 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                        {e.period}
                      </span>
                    </div>
                    <p className="text-[#00C9B1] text-xs font-semibold mb-3">
                      {e.org} · {e.location}
                    </p>
                    <ul className="space-y-1.5">
                      {e.desc.map((d, j) => (
                        <li key={j} className="text-slate-400 text-sm flex gap-2">
                          <span className="text-[#00C9B1] mt-1 flex-shrink-0">›</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education col */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="flex items-center gap-2 text-white font-semibold mb-6">
              <HiAcademicCap className="text-[#00C9B1]" /> Education & Training
            </h3>

            {/* B.E. card */}
            <div className="bg-[#0F1629] border border-[#1E2D4A] rounded-2xl p-5 card-glow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center text-purple-400 text-lg">
                  🎓
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Bachelor of Science in Information Technology</p>
                  <p className="text-slate-500 text-xs">Mumbai University · 2020 – 2023</p>
                </div>
              </div>
              <span className="inline-block text-[11px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2.5 py-0.5 rounded-full font-medium mt-1">
                Completed
              </span>
            </div>

            {/* DS Bootcamp HERO card */}
            <div className="relative bg-gradient-to-br from-[#00C9B1]/10 via-[#0F1629] to-[#0A0F1C] border border-[#00C9B1]/30 rounded-2xl p-6 overflow-hidden">
              {/* glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#00C9B1]/10 blur-3xl rounded-full pointer-events-none" />

              {/* live badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 bg-[#00C9B1]/10 border border-[#00C9B1]/25 rounded-full px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-[#00C9B1] animate-pulse" />
                  <span className="text-[#00C9B1] text-[11px] font-bold uppercase tracking-widest">In Progress</span>
                </div>
                <span className="text-2xl">📊</span>
              </div>

              <h4 className="font-display font-extrabold text-white text-base mb-0.5 leading-snug">
                Data Science Foundation Bootcamp
              </h4>
              <p className="text-[#00C9B1] text-sm font-semibold mb-1">with Virtual Internship</p>
              <p className="text-slate-500 text-xs mb-4">Codebasics</p>

              {/* progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>Course Progress</span>
                  <span className="text-[#00C9B1]">~65%</span>
                </div>
                <div className="h-1.5 bg-[#1E2D4A] rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-gradient-to-r from-[#00C9B1] to-[#00E5FF] rounded-full" />
                </div>
              </div>

              {/* modules */}
              <div className="flex flex-wrap gap-1.5">
                {dsModules.map((m) => (
                  <span
                    key={m}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-[#00C9B1]/8 text-[#00C9B1] border border-[#00C9B1]/15 font-medium"
                  >
                    {m}
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
