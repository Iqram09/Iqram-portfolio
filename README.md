# Iqram Patel — Portfolio

Personal portfolio of Mohammed Iqram Patel, AI / Software Engineer (Mumbai).
Built with Next.js 14 (App Router), TypeScript and Tailwind CSS, with GSAP, Framer Motion and Lenis for motion.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home: hero + letterform marquee, introduction, featured Kong project, client work, side projects, interactive system, experience, expertise, about, contact |
| `/projects/kong-ai-gateway-diagnostics` | Technical case study (11 sections) |
| `/resume` | PDF preview + download of `public/Iqram_Patel_CV.pdf` |
| `*` | Custom 404 |

## Design

"Letterform": a light editorial system. Neutral paper and near-black bands, a condensed display serif
(Noto Serif Display) over Inter Tight, and JetBrains Mono for code only. All three are self-hosted in
`app/fonts` (OFL), so a build never depends on Google Fonts.
The five letters of the name are drawn as shapes in `components/brand/Letterform.tsx` and cut from project
imagery. Colours are sampled from the work and defined once in `tailwind.config.js`.

- Set small figures in the sans. At small sizes the serif's 5 reads as a 3.
- Text tokens clear WCAG AA on every ground they are used on.
- GSAP and Framer Motion load after idle; the hero headline animates in CSS so it can paint before hydration.
- Every animation has a reduced-motion path.

## Structure

```
app/                    routes, layout (metadata, fonts), globals.css, icon.svg, fonts/
components/             page sections (server components unless interaction requires a client)
components/brand/       Letterform, Wordmark, DitherWordmark, MumbaiClock
components/hero/        Hero, HeroReel, LetterMarquee
components/home/        Intro, TechBand, FeaturedWork, KongShowcase, ClientWork, SideProjects, Expertise, Mosaic
components/motion/      SmoothScroll, ScaleIn
components/ui/          Button, SectionHead, Reveal, SplitText, Window, Bits, HoverTag, Icons
components/case-study/  ArchitectureDiagram, ToolCatalog, CompressionChart, SafetyChain,
                        TelemetryPanel, EvaluationDashboard, FailureModeGrid, TestMetrics, CaseStudyNav
data/                   site.ts (identity/links), projects.ts, kong.ts (case-study dataset),
                        experience.ts, skills.ts
public/                 Iqram_Patel_CV.pdf, og.png, kong/ (captured screenshots), work/ (client sites),
                        crops/ (details cut from the clients' full-size images), about/
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
