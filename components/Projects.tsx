"use client";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { HiExternalLink } from "react-icons/hi";
import { SiGithub } from "react-icons/si";

type Project = {
  title: string;
  emoji: string;
  desc: string;
  tags: string[];
  color: string;
  github: string;
  live?: string;
  category: "fullstack" | "data";
};

const projects: Project[] = [
  {
    title:    "Deliveroo Clone",
    emoji:    "🍕",
    desc:     "A full-featured food-delivery mobile app with real-time Google Maps tracking, cart management with Redux, and a Sanity.io CMS backend.",
    tags:     ["React Native", "Redux", "Google Maps", "Sanity.io", "AWS Amplify"],
    color:    "#00C2D1",
    github:   "https://github.com/Iqram09/Deliveroo-clone",
    category: "fullstack",
  },
  {
    title:    "Netflix Clone",
    emoji:    "🎬",
    desc:     "Streaming platform UI clone with Firebase Authentication, subscription plan logic, and server-side rendering via Next.js App Router.",
    tags:     ["Next.js", "Firebase Auth", "Tailwind CSS", "Stripe"],
    color:    "#E50914",
    github:   "https://github.com/Iqram09/Netflix-clone",
    category: "fullstack",
  },
  {
    title:    "DS Bootcamp Projects",
    emoji:    "📊",
    desc:     "End-to-end data analysis & ML projects from the Codebasics virtual internship — EDA pipelines, feature engineering, and model training.",
    tags:     ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    color:    "#00C9B1",
    github:   "https://github.com/Iqram09/codebasics-ds-bootcamp",
    category: "data",
  },
  {
    title:    "Ecommerce Dashboard",
    emoji:    "📈",
    desc:     "Internal analytics dashboard built at Allied Globetech to streamline business reporting and KPI tracking for consulting teams.",
    tags:     ["React", "TypeScript", "Node.js", "MongoDB"],
    color:    "#7C3AED",
    github:   "https://github.com/Iqram09/Ecommerce",
    category: "fullstack",
  },
];

const filters = ["All", "Full-Stack", "Data Science"] as const;

export default function Projects() {
  const [ref, inView] = useInView<HTMLElement>();
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const shown = projects.filter((p) => {
    if (active === "All") return true;
    if (active === "Full-Stack") return p.category === "fullstack";
    return p.category === "data";
  });

  return (
    <section
      id="projects"
      ref={ref}
      className={`py-28 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[#00C9B1] font-mono text-sm">03.</span>
          <h2 className="font-display font-bold text-3xl text-white">Featured Projects</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#1E2D4A] to-transparent" />
        </div>

        {/* filters */}
        <div className="flex gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                active === f
                  ? "bg-[#00C9B1] text-[#0A0F1C]"
                  : "bg-[#0F1629] border border-[#1E2D4A] text-slate-400 hover:text-white hover:border-[#00C9B1]/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {shown.map((p) => (
            <div
              key={p.title}
              className="group bg-[#0F1629] border border-[#1E2D4A] rounded-2xl p-6 card-glow relative overflow-hidden"
            >
              {/* top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }}
              />

              {/* glow blob */}
              <div
                className="absolute top-0 right-0 w-40 h-40 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-full"
                style={{ background: p.color }}
              />

              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{p.emoji}</span>
                <div className="flex gap-2">
                  <a
                    href={p.github}
                    className="w-8 h-8 rounded-lg bg-[#0D1323] border border-[#1E2D4A] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <SiGithub size={14} />
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      className="w-8 h-8 rounded-lg bg-[#0D1323] border border-[#1E2D4A] flex items-center justify-center text-slate-400 hover:text-[#00C9B1] transition-colors"
                    >
                      <HiExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-[#00C9B1] transition-colors">
                {p.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-0.5 rounded-full border font-medium"
                    style={{
                      background: `${p.color}12`,
                      borderColor: `${p.color}30`,
                      color: p.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://github.com/Iqram09"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F1629] border border-[#1E2D4A] rounded-xl text-slate-300 hover:text-white hover:border-[#00C9B1]/40 text-sm font-medium transition-all"
          >
            <SiGithub size={16} />
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
