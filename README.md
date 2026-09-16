# Iqram Patel — Portfolio

Personal portfolio of Mohammed Iqram Patel, AI / Software Engineer (Mumbai).
Built with Next.js 14 (App Router), TypeScript and Tailwind CSS. No animation or icon libraries.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home: hero + system trace, metrics, featured Kong project, interactive live system, principles, engineering surface, other work, experience, skills, learning, about, resume/GitHub, contact |
| `/projects/kong-ai-gateway-diagnostics` | Technical case study (11 sections) |
| `/resume` | PDF preview + download of `public/Iqram_Patel_CV.pdf` |
| `*` | Custom 404 |

## Structure

```
app/                 routes, layout (metadata, fonts), globals.css, icon.svg
components/          page sections (server components unless interaction requires a client)
components/ui/       Button, SectionHeader, Reveal, Motif, Window, Icons
components/case-study/  ArchitectureDiagram, ToolCatalog, CompressionChart, SafetyChain,
                        TelemetryPanel, EvaluationDashboard, FailureModeGrid, TestMetrics, CaseStudyNav
data/                site.ts (identity/links), projects.ts, kong.ts (case-study dataset),
                     experience.ts, skills.ts
public/              Iqram_Patel_CV.pdf, og.png, kong/ (captured screenshots)
```

All project content lives in `data/`. Every figure in `data/kong.ts` is copied from the
Kong AI Gateway Diagnostics repository (README, docs, `evals/results/run-003.*`).

## Scripts

```
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm start
```

## Updating content

- Identity, email, links: `data/site.ts`
- Projects and filters: `data/projects.ts`
- Kong case study numbers, tools, failure modes, limitations: `data/kong.ts`
- Experience / education / learning: `data/experience.ts`
- Skills: `data/skills.ts`
- Resume: replace `public/Iqram_Patel_CV.pdf` (filename is referenced from `data/site.ts`)
