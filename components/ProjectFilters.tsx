"use client";

import { useState } from "react";
import { filterProjects, projectFilters, type ProjectFilterId } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectFilters() {
  const [active, setActive] = useState<ProjectFilterId>("featured");
  const shown = filterProjects(active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects"
        className="inline-flex flex-wrap gap-1 rounded-lg border border-line bg-bg-1 p-1"
      >
        {projectFilters.map((f) => {
          const on = f.id === active;
          return (
            <button
              key={f.id}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="projects-panel"
              onClick={() => setActive(f.id)}
              className={`rounded-md px-3.5 py-1.5 text-sm transition-colors ${
                on ? "bg-bg-3 text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              {f.label}
              {on && <span className="sr-only"> (selected)</span>}
            </button>
          );
        })}
      </div>

      <div id="projects-panel" role="tabpanel" className="mt-6 grid gap-4 md:grid-cols-2">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
        {shown.length === 0 && (
          <p className="rounded-lg border border-dashed border-line p-8 text-center font-mono text-sm text-fg-dim">
            nothing in this category yet
          </p>
        )}
      </div>
    </div>
  );
}
