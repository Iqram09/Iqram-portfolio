"use client";
import { useInView } from "@/hooks/useInView";

type Skill = { name: string; pct: number; color: string };

const devSkills: Skill[] = [
  { name: "React / Next.js",    pct: 88, color: "#61DAFB" },
  { name: "TypeScript",         pct: 82, color: "#3178C6" },
  { name: "Node.js",            pct: 78, color: "#68A063" },
  { name: "React Native",       pct: 72, color: "#61DAFB" },
  { name: "TailwindCSS",        pct: 90, color: "#38BDF8" },
  { name: "GraphQL",            pct: 65, color: "#E535AB" },
];

const dsSkills: Skill[] = [
  { name: "Python",             pct: 80, color: "#FFD43B" },
  { name: "Pandas / NumPy",     pct: 75, color: "#150458" },
  { name: "Matplotlib / Seaborn", pct: 70, color: "#11A0DC" },
  { name: "Scikit-learn (ML)",  pct: 65, color: "#F89939" },
  { name: "SQL for Analytics",  pct: 72, color: "#336791" },
  { name: "EDA & Feature Eng.", pct: 68, color: "#00C9B1" },
];

const cloudTools = [
  "MongoDB","Firebase","DynamoDB","SQL Server","GCP","CI/CD","Figma","Adobe Suite","Git/GitHub","Redux",
];

function SkillBar({ skill, inView }: { skill: Skill; inView: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
        <span className="text-slate-500 text-xs font-mono">{skill.pct}%</span>
      </div>
      <div className="h-2 bg-[#1E2D4A] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${skill.pct}%` : "0%",
            background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
            transitionDelay: "0.2s",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      id="skills"
      ref={ref}
      className={`py-28 bg-[#0D1323] transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[#00C9B1] font-mono text-sm">02.</span>
          <h2 className="font-display font-bold text-3xl text-white">Skills & Tech</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#1E2D4A] to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Dev skills */}
          <div className="bg-[#0F1629] border border-[#1E2D4A] rounded-2xl p-6 card-glow">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                &lt;/&gt;
              </div>
              <h3 className="font-display font-semibold text-white">Full-Stack Development</h3>
            </div>
            <div className="space-y-4">
              {devSkills.map((s) => (
                <SkillBar key={s.name} skill={s} inView={inView} />
              ))}
            </div>
          </div>

          {/* DS skills */}
          <div className="bg-[#0F1629] border border-[#00C9B1]/20 rounded-2xl p-6 card-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C9B1]/5 blur-2xl rounded-full pointer-events-none" />
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#00C9B1]/15 border border-[#00C9B1]/20 flex items-center justify-center text-[#00C9B1] text-sm">
                📊
              </div>
              <h3 className="font-display font-semibold text-white">Data Science</h3>
              <span className="ml-auto text-[10px] bg-[#00C9B1]/10 text-[#00C9B1] border border-[#00C9B1]/20 px-2 py-0.5 rounded-full font-semibold">
                Learning
              </span>
            </div>
            <p className="text-slate-500 text-xs mb-5">via Codebasics Bootcamp + Virtual Internship</p>
            <div className="space-y-4">
              {dsSkills.map((s) => (
                <SkillBar key={s.name} skill={s} inView={inView} />
              ))}
            </div>
          </div>
        </div>

        {/* Tools & Cloud */}
        <div className="bg-[#0F1629] border border-[#1E2D4A] rounded-2xl p-6">
          <h3 className="font-display font-semibold text-white mb-5 flex items-center gap-2">
            <span className="text-[#00C9B1]">☁️</span> Cloud, Databases & Tools
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {cloudTools.map((t) => (
              <span
                key={t}
                className="px-4 py-2 bg-[#0D1323] border border-[#1E2D4A] rounded-xl text-slate-300 text-sm font-medium hover:border-[#00C9B1]/40 hover:text-white transition-all cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
