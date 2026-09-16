/**
 * Kong AI Gateway Diagnostics — case-study data.
 *
 * Every figure here is copied from the project repository
 * (README, docs/*.md, evals/results/run-003.*) or from captured terminal output.
 * Nothing is estimated or extrapolated.
 */

export const kong = {
  slug: "kong-ai-gateway-diagnostics",
  title: "Kong AI Gateway Diagnostics",
  subtitle: "MCP Server · Agentic Diagnostics · LLM Evaluation Platform",
  repo: "https://github.com/Iqram09/kong-ai-gateway-mcp",
  repoName: "Iqram09/kong-ai-gateway-mcp",
  status:
    "Working reference implementation, verified against a local Kong 3.9.3 and the live Gemini API. Not deployed anywhere; not used in production.",
  capturedOn: "2026-09-12",
  principle: {
    a: "The model owns the investigation.",
    b: "The code owns the facts.",
  },
  stack: ["TypeScript", "MCP SDK v2", "Kong 3.9.3 OSS", "PostgreSQL 17", "Gemini API", "Docker", "Zod", "Vitest"],
  githubTags: ["TypeScript", "MCP", "Kong", "Gemini", "Docker", "Vitest"],
};

/* ------------------------------------------------------------------ */
/* Headline metrics                                                    */
/* ------------------------------------------------------------------ */

export const headlineMetrics = [
  { value: 14, suffix: "", label: "MCP tools", note: "read-only · schema-validated" },
  { value: 170, suffix: "", label: "Automated tests", note: "140 unit · 27 integration · 3 e2e" },
  { value: 28, suffix: "", label: "Evaluation cases", note: "11 scenarios · 3 difficulty tiers" },
  { value: 100, suffix: "%", label: "Finding recall", note: "run-003 · verified evaluation run" },
] as const;

/** Seeded gateway topology (kong/scripts/seed.ts). */
export const topology = [
  { label: "Services", value: 12 },
  { label: "Routes", value: 12 },
  { label: "Upstreams", value: 4 },
  { label: "Consumers", value: 7 },
  { label: "Plugins", value: 20 },
  { label: "Defect scenarios", value: 10 },
  { label: "Healthy control", value: 1 },
] as const;

/* ------------------------------------------------------------------ */
/* Architecture                                                        */
/* ------------------------------------------------------------------ */

export type ArchNode = {
  id: string;
  label: string;
  sub?: string;
  does: string;
  owns: string;
  mustNot: string;
};

export const architectureSpine: ArchNode[] = [
  {
    id: "client",
    label: "AI Client",
    sub: "Claude Desktop · IDE · npm run agent",
    does: "Sends the question and selects tools through the MCP protocol.",
    owns: "The conversation and the decision of which tool to call next.",
    mustNot: "Reach Kong directly. There is no generic execute_kong_api_call tool, and never will be.",
  },
  {
    id: "mcp",
    label: "MCP over stdio",
    sub: "JSON-RPC · @modelcontextprotocol/server v2",
    does: "Carries tool definitions, calls and results between the client and the server.",
    owns: "The protocol boundary. stdout carries JSON-RPC only; every log line goes to stderr.",
    mustNot: "Carry a single non-protocol byte on stdout (MCP-STDOUT-001).",
  },
  {
    id: "tools",
    label: "14 Read-only Tools",
    sub: "src/mcp · Zod input schemas",
    does: "Defines each tool: what it does, when to use it, what it returns, and its limits.",
    owns: "Tool definitions and descriptions; readOnlyHint / destructiveHint annotations.",
    mustNot: "Perform HTTP itself or hold state across calls.",
  },
  {
    id: "runner",
    label: "Shared Tool Runner",
    sub: "runTool · validation · limits · telemetry · audit",
    does: "Validates arguments, enforces result limits, records telemetry and audit events for every call.",
    owns: "The one path every tool result passes through. No tool can opt out of a bound.",
    mustNot: "Let a tool skip validation, truncation signalling or the audit log.",
  },
  {
    id: "kong-client",
    label: "Kong Admin API client",
    sub: "src/kong · typed · GET only · bounded",
    does: "Issues every HTTP request to Kong, validates responses with Zod, normalises errors.",
    owns: "Response and page-count ceilings; the error taxonomy; credential stripping at the boundary.",
    mustNot: "Expose a generic path-taking method or issue anything but GET.",
  },
  {
    id: "kong",
    label: "Kong Gateway 3.9.3",
    sub: "OSS · PostgreSQL 17 · Docker Compose",
    does: "Serves as the source of truth for gateway state.",
    owns: "Every fact the system reports. The model never authors a finding.",
    mustNot: "Be mutated by anything in src/. The only write-capable client is the seed script outside src/.",
  },
];

export const architectureEntities = ["Services", "Routes", "Plugins", "Consumers", "Upstreams"] as const;

export const architectureSide: ArchNode[] = [
  {
    id: "context",
    label: "Context Management",
    sub: "src/context",
    does: "Turns Kong entities into references, summaries, bounded lists and model-readable pagination.",
    owns: "Entity references; summary projections; per-result and per-run limits; cursor pagination.",
    mustNot: "Know about any specific tool or any LLM.",
  },
  {
    id: "diagnostics",
    label: "Diagnostics",
    sub: "src/diagnostics · 11 pure rules",
    does: "Collects evidence progressively and derives findings with pure rules over an evidence bundle.",
    owns: "Findings, confidence (CONFIRMED / PARTIAL / INSUFFICIENT_EVIDENCE) and the scenario catalogue.",
    mustNot: "Call a model, or assert absence when a relevant scope was not read.",
  },
  {
    id: "safety",
    label: "Safety",
    sub: "src/safety",
    does: "Gates tool registration by permission level and records an audit event per invocation.",
    owns: "Permission levels; registration gating; audit events with sanitised arguments.",
    mustNot: "Register a write tool — the server refuses to start with ENABLE_WRITE_TOOLS=true.",
  },
  {
    id: "telemetry",
    label: "Telemetry",
    sub: "src/telemetry",
    does: "Emits structured JSON logs, computes metrics and estimates cost from provider-reported usage.",
    owns: "Logger, redaction, nearest-rank percentiles, a cost table with its source and date.",
    mustNot: "Write to stdout, or print $0.00 where a figure is unavailable.",
  },
  {
    id: "evaluation",
    label: "Evaluation",
    sub: "src/evaluation · 28 cases",
    does: "Loads and validates the dataset, runs cases sequentially and scores them deterministically.",
    owns: "Dataset validation; quota-aware resumable runs; JSON and Markdown reports from one structure.",
    mustNot: "Call a model to judge.",
  },
];

/* ------------------------------------------------------------------ */
/* MCP tools                                                           */
/* ------------------------------------------------------------------ */

/** Tools the in-repo agent is given (8 of the 14) — src/mcp/registry.ts AGENT_TOOL_NAMES. */
export const agentToolNames = [
  "find_route_by_path",
  "get_route",
  "list_plugins_for_route",
  "get_consumer",
  "check_upstream_health",
  "diff_config",
  "diagnose_route",
  "list_services",
] as const;

export type ToolGroup = { group: string; tools: { name: string; blurb: string }[] };

export const toolGroups: ToolGroup[] = [
  {
    group: "Discovery",
    tools: [
      { name: "find_route_by_path", blurb: "Resolve a path to route and service references. Whole-path match." },
      { name: "list_services", blurb: "Page through services; nameContains narrows a page." },
      { name: "list_routes_for_service", blurb: "Routes attached to one service, as references." },
    ],
  },
  {
    group: "Entities",
    tools: [
      { name: "get_route", blurb: "One route, summarised, with its service reference." },
      { name: "get_service", blurb: "One service, summarised, with its upstream host." },
    ],
  },
  {
    group: "Plugins",
    tools: [
      { name: "list_plugins_for_route", blurb: "Route-scoped plugins with projected config." },
      { name: "list_global_plugins", blurb: "Plugins applying at global scope." },
    ],
  },
  {
    group: "Consumers",
    tools: [
      { name: "list_consumers", blurb: "Consumers as references, paginated." },
      { name: "get_consumer", blurb: "One consumer; credential counts only, never values; ACL groups listed." },
    ],
  },
  {
    group: "Upstreams",
    tools: [
      { name: "list_upstreams", blurb: "Upstreams as references." },
      { name: "check_upstream_health", blurb: "Target verdicts, with the optimistic-HEALTHY caveat stated." },
    ],
  },
  {
    group: "Diagnostics",
    tools: [
      { name: "diff_config", blurb: "Live configuration against the seeded baseline." },
      { name: "diagnose_route", blurb: "Evidence collection + 11 rules → findings with confidence." },
      { name: "explain_auth_failure", blurb: "Authentication-focused diagnosis for a route and consumer." },
    ],
  },
];

export const toolGuarantees = [
  { label: "Read-only", detail: "readOnlyHint: true · destructiveHint: false on every tool" },
  { label: "Schema validated", detail: "Zod input schema, validated by the SDK and again in runTool" },
  { label: "Bounded output", detail: "MAX_TOOL_RESULT_ITEMS 50 · MAX_CONTEXT_CHARS 12,000" },
] as const;

/* ------------------------------------------------------------------ */
/* Agent demo (README trace, captured 2026-09-12)                      */
/* ------------------------------------------------------------------ */

export type DemoStep = {
  step: number;
  llmMs: number;
  finish: "tool_calls" | "stop";
  tool?: string;
  args?: string;
  ms?: number;
  bytes?: number;
  result?: string;
};

export const demoRun = {
  question: "Why is authentication failing on /payments?",
  provider: "gemini / gemini-3.5-flash-lite",
  steps: [
    { step: 1, llmMs: 1602, finish: "tool_calls", tool: "find_route_by_path", args: '{"path":"/payments"}', ms: 30, bytes: 209, result: "route:payments-prod → service:payments-api" },
    { step: 2, llmMs: 1317, finish: "tool_calls", tool: "diagnose_route", args: '{"route":"route:payments-prod"}', ms: 64, bytes: 3162, result: "NO_AUTH_PLUGIN (HIGH) · CONFIRMED" },
    { step: 3, llmMs: 1971, finish: "stop" },
  ] as DemoStep[],
  finding: {
    code: "NO_AUTH_PLUGIN",
    category: "AUTHENTICATION",
    severity: "HIGH",
    confidence: "CONFIRMED",
    entityRef: "route:payments-prod",
    evidence: [
      "Route-scoped plugins: cors.",
      "Service-scoped plugins: none.",
      "Global plugins: request-size-limiting, correlation-id.",
    ],
  },
  diagnosis: [
    "The premise was wrong. Nothing is rejecting requests on /payments.",
    "No authentication plugin is attached or enabled for that route at any scope. Kong passes every request through without requiring credentials.",
    "If clients see 401 / 403, those responses come from the upstream (payments-upstream:8080), not from Kong.",
  ],
  metrics: [
    { k: "steps", v: "3 / 10" },
    { k: "tool calls", v: "2 (0 errors)" },
    { k: "repeated calls", v: "0" },
    { k: "tokens", v: "12,677 in · 300 out · 12,977 total" },
    { k: "estimated cost", v: "$0.004553" },
    { k: "context used", v: "3,371 / 50,000 chars" },
    { k: "wall clock", v: "4,993 ms" },
  ],
};

/* ------------------------------------------------------------------ */
/* Context management (docs/context-management.md)                     */
/* ------------------------------------------------------------------ */

export const contextMeasurements = [
  { label: "Raw Admin API dump", sub: "/services · /routes · /plugins · /consumers · /upstreams", bytes: 28658, tone: "dim" },
  { label: "Same entities, summarised", sub: "through the summarization layer", bytes: 8071, tone: "muted" },
  { label: "Targeted diagnose_route result", sub: "one route: /payments", bytes: 3164, tone: "accent" },
] as const;

export const routeMeasurements = [
  { label: "Raw route object", bytes: 549 },
  { label: "Summarised route", bytes: 222 },
] as const;

export const toolSurface = [
  { label: "Full MCP registry", tools: 14, bytes: 19510 },
  { label: "Agent tool set", tools: 8, bytes: 13622 },
] as const;

export const contextMechanisms = [
  { name: "References, not embedded entities", detail: "route:payments-prod → serviceRef: service:payments-api. A reference is an identifier and a description, usable as the next tool argument without another lookup." },
  { name: "Summaries for orientation", detail: "Allow-listed plugin config projection; secret-bearing keys never surfaced; zero plugins reported as a fact, because absence is itself a finding." },
  { name: "Bounded results", detail: "Lists capped at 50 items; a result over 12,000 chars is replaced with CONTEXT_BUDGET_EXCEEDED and a narrowing hint, never truncated JSON." },
  { name: "Truncation is announced", detail: "A capped list carries a _truncation notice: returned, total, INCOMPLETE. A silently trimmed list is worse than a large one." },
  { name: "Cursor pagination written for a model", detail: "page.hasMore as an explicit boolean plus a continuation instruction naming the tool and the cursor." },
  { name: "Progressive, conditional collection", detail: "Upstream health only if the service names a Kong upstream; the full route list only when a path fails to resolve." },
  { name: "Absence is explicit", detail: "routePlugins: [] (asked, none) is distinct from undefined (not asked). Absence is asserted only when every scope was read." },
];

/* ------------------------------------------------------------------ */
/* Safety (docs/security.md)                                           */
/* ------------------------------------------------------------------ */

export const safetyChain = [
  { label: "Read-only tools", detail: "No write method exists in src/. Write tools are gated at registration; the server refuses to start with ENABLE_WRITE_TOOLS=true." },
  { label: "Typed schemas", detail: "Every argument validated by Zod; identifiers URL-encoded before reaching an Admin API path." },
  { label: "Bounded outputs", detail: "Item caps, per-result and per-run character budgets, response-size and page-chain ceilings." },
  { label: "Deterministic findings", detail: "Findings come from 11 pure rules over Kong data. The LLM does not own gateway facts." },
  { label: "Audit / telemetry", detail: "Every invocation recorded with correlation ids and sanitised arguments, at warn level, on stderr." },
];

export const safetyStatements = [
  "No write method exists in src/.",
  "The project is read-only.",
  "The LLM does not own gateway facts.",
  "Prompt injection is defanged rather than detected.",
];

export const executionLimits = [
  { name: "MAX_AGENT_STEPS", value: "10", when: "halt turn — tools declared but forbidden; answer marked incomplete" },
  { name: "MAX_REPEATED_TOOL_CALLS", value: "2", when: "identical (tool, args) refused with a structured error" },
  { name: "MAX_TOTAL_TOOL_RESULT_SIZE", value: "50,000 chars", when: "halt" },
  { name: "MAX_CONTEXT_CHARS", value: "12,000", when: "CONTEXT_BUDGET_EXCEEDED with a narrowing hint" },
  { name: "MAX_TOOL_RESULT_ITEMS", value: "50", when: "announced truncation" },
  { name: "KONG_TIMEOUT_MS", value: "5,000", when: "TIMEOUT error" },
];

/* ------------------------------------------------------------------ */
/* Observability (docs/observability.md)                               */
/* ------------------------------------------------------------------ */

export const telemetryFields = {
  tool: ["traceId", "requestId", "taskId", "toolName", "durationMs", "status", "errorCategory", "resultSize", "repeated"],
  llm: ["provider", "model", "durationMs", "inputTokens", "outputTokens", "thinkingTokens", "finishReason", "estimatedCostUsd"],
  run: ["steps used / limit", "tool calls", "repeated calls", "context chars / budget", "tools used in order", "stop reason", "wall clock"],
};

/** Verbatim shapes from docs/observability.md (values from a real run). */
export const telemetrySample = {
  toolCall: `{
  "level": "info",
  "time": "2026-09-12T10:51:54.712Z",
  "service": "kong-ai-gateway-mcp",
  "component": "agent",
  "taskId": "task_6b53c2a654b345f9",
  "traceId": "trace_f1c1bddcd893479b",
  "requestId": "req_cf733480a6f043f0",
  "toolName": "diagnose_route",
  "event": "tool_call",
  "durationMs": 66,
  "status": "success",
  "resultSize": 3162,
  "repeated": false
}`,
  llmCall: `{
  "event": "llm_call",
  "step": 2,
  "durationMs": 2220,
  "finishReason": "tool_calls",
  "inputTokens": 4182,
  "outputTokens": 21,
  "toolCallCount": 1,
  "estimatedCostUsd": 0.001307
}`,
};

/* ------------------------------------------------------------------ */
/* Evaluation (evals/results/run-003.md)                               */
/* ------------------------------------------------------------------ */

export const evalRun = {
  id: "run-003",
  dataset: "1.2.0",
  model: "gemini-3.5-flash-lite",
  kong: "3.9.3",
  date: "2026-09-12",
  cases: 28,
  passed: 28,
  findingRecall: "100%",
  answerFactMatch: "100%",
  toolCoverage: "99%",
  completedWithinLimits: "100%",
  repeatedCalls: 0,
  unnecessaryCalls: 20,
  meanSteps: "3.5",
  stepsRange: "min 3 · max 9",
  toolCallsPerCase: "2.57",
  totalTokens: "425,710",
  tokensPerCase: "15,204",
  totalCost: "$0.149596",
  costPerCase: "$0.0053",
  medianDuration: "5.4 s",
  retryFreeMedian: "4.5 s",
  meanDuration: "20.5 s",
  byDifficulty: [
    { tier: "easy", passed: 6, total: 6 },
    { tier: "medium", passed: 14, total: 14 },
    { tier: "hard", passed: 8, total: 8 },
  ],
  toolUsage: [
    { tool: "find_route_by_path", calls: 27 },
    { tool: "diagnose_route", calls: 22 },
    { tool: "diff_config", calls: 7 },
    { tool: "list_services", calls: 4 },
    { tool: "get_route", calls: 3 },
    { tool: "check_upstream_health", calls: 1 },
    { tool: "get_service", calls: 1 },
    { tool: "list_plugins_for_route", calls: 1 },
  ],
  caveat: "Demonstration benchmark — 28 cases, one clean run, one model.",
};

export const evalHistory = [
  { run: "run-001", dataset: "1.0.0", passed: "22 / 28", note: "Four correct answers marked wrong by substring scoring; two provider rate-limit losses." },
  { run: "run-002", dataset: "1.1.0", passed: "26 / 28", note: "Two correct answers matched a forbidden phrase inside a negation." },
  { run: "run-003", dataset: "1.2.0", passed: "28 / 28", note: "Current. The run reported above.", current: true },
  { run: "run-004", dataset: "1.2.0", passed: "22 / 28", note: "Local Kong reset by another process mid-run: six UNREACHABLE cases, zero wrong diagnoses." },
];

/* ------------------------------------------------------------------ */
/* Tests                                                               */
/* ------------------------------------------------------------------ */

export const tests = {
  total: 170,
  suites: [
    { name: "unit", count: 140, files: 8, detail: "no Docker, no network · 1.11 s", image: "/kong/tests-unit.png", w: 685, h: 380 },
    { name: "integration", count: 27, files: 2, detail: "live seeded Kong + MCP over real stdio · 8.29 s", image: "/kong/tests-integration.png", w: 665, h: 324 },
    { name: "e2e", count: 3, files: 1, detail: "question → agent → tool → Kong → diagnosis · 13.50 s", image: "/kong/tests-e2e.png", w: 781, h: 332 },
  ],
  statement: "All passing in the verified project run.",
};

/* ------------------------------------------------------------------ */
/* Failure modes (docs/failure-modes.md)                               */
/* ------------------------------------------------------------------ */

export type FailureMode = { id: string; failure: string; impact: string; fix: string };

export const failureModes: FailureMode[] = [
  {
    id: "AGENT-HALT-TOOLS-001",
    failure: "Gemini rejected any request whose history contained a function call but declared no tools: UNEXPECTED_TOOL_CALL, no content.",
    impact: "The halt path would have returned an empty answer exactly when it needed to say “diagnosis incomplete”.",
    fix: "Tools stay declared on the halt turn with toolChoice: none. An error finish reason now ends the run as provider_error, never as an answer.",
  },
  {
    id: "GEMINI3-THOUGHT-SIGNATURE-001",
    failure: "Gemini 3 requires the thoughtSignature on each function-call part to be echoed back verbatim. 27 of 28 cases died after one tool call (HTTP 400).",
    impact: "0 / 28 on the first Gemini 3 evaluation run.",
    fix: "An opaque providerState on LlmToolCall that only the originating provider reads. No agent, tool or evaluation change was needed.",
  },
  {
    id: "COST-THINKING-TOKENS-001",
    failure: "Cost was computed from input + output tokens. Gemini reports thinking tokens separately and bills them as output.",
    impact: "Cost understated by roughly 10× on short answers, in a report meant to be trusted.",
    fix: "estimateCost bills output + thinking at the output rate; thinkingTokens plumbed through usage and metrics.",
  },
  {
    id: "EVAL-QUOTA-DAILY-001",
    failure: "A 20-requests-per-day free-tier quota returned 429 with a misleading “retry in 54 s” hint.",
    impact: "Quota-starved cases were recorded as FAIL, fabricating a low pass rate.",
    fix: "New QUOTA_EXHAUSTED category, never retried. Remaining cases marked SKIPPED and excluded from rates; --resume finishes them later.",
  },
  {
    id: "EVAL-SCORING-BRITTLE-001",
    failure: "Substring scoring marked six correct answers wrong across two runs: paraphrase (“enabled: false” vs “disabled”) and negation.",
    impact: "Reported pass rate understated the agent by four cases, then by two.",
    fix: "Any-of alternatives for facts; forbidden phrases must assert the wrong conclusion. Dataset 1.0.0 → 1.2.0; every run kept.",
  },
  {
    id: "MCP-STDOUT-001",
    failure: "tsx watch printed status lines to stdout and consumed the client newline as a restart key.",
    impact: "The documented dev command could not serve an MCP client at all.",
    fix: "Watch mode removed; clients invoke node dist/server.js directly; the stdio test asserts zero non-JSON lines on stdout.",
  },
  {
    id: "HEALTH-VERDICT-REVERT-001",
    failure: "After reset-then-immediate-seed, a target stayed at the optimistic HEALTHY Kong starts in and was never probed.",
    impact: "Health-dependent assertions saw a false HEALTHY no matter how long they waited.",
    fix: "Seed and integration tests send one proxied request through each health-checked route before polling for the verdict.",
  },
  {
    id: "EVAL-KONG-OUTAGE-001",
    failure: "An evaluation run overlapped an operator kong:reset in another terminal.",
    impact: "run-004 scored 22 / 28 with six UNREACHABLE cases — and zero wrong diagnoses.",
    fix: "Recorded next to run-003 rather than deleted. Two evaluations must not share one local Kong.",
  },
];

export const observedFailureIds = [
  "TOOLCHAIN-TS7-001",
  "SEED-HEALTH-RACE-001",
  "HEALTH-VERDICT-REVERT-001",
  "EVAL-KONG-OUTAGE-001",
  "MCP-SDK-PREVALIDATION-001",
  "REF-UUID-LEAK-001",
  "AGENT-HALT-TOOLS-001",
  "COST-THINKING-TOKENS-001",
  "EVAL-QUOTA-DAILY-001",
  "GEMINI3-THOUGHT-SIGNATURE-001",
  "EVAL-SCORING-BRITTLE-001",
  "EVAL-RATE-LIMIT-RETRY-001",
  "MCP-STDOUT-001",
];

export const failureSummary = { observed: 13, provoked: 23 };

/* ------------------------------------------------------------------ */
/* Limitations (README)                                                */
/* ------------------------------------------------------------------ */

export const limitations = [
  { title: "Read-only", detail: "The agent can find a problem but not fix it. The write flow (confirmation token, preview diff, audit, rollback) is designed and documented, not built." },
  { title: "11 diagnostic rule classes", detail: "A novel defect class is invisible until someone writes a rule for it." },
  { title: "Whole-path route matching", detail: "find_route_by_path does not simulate Kong prefix or regex routing." },
  { title: "Gemini only, currently", detail: "The provider interface is one file; Anthropic and OpenAI providers do not exist yet." },
  { title: "Free-tier quota shaped the harness", detail: "A 20-request daily quota and per-minute rate limits added 30–60 s to nine cases." },
  { title: "Substring-based scoring", detail: "A regression net for named facts and named wrong conclusions, not a judge of prose quality." },
  { title: "Prompt injection: defanged, not detected", detail: "No write path, typed arguments, facts from rules. Gateway data still reaches the model verbatim." },
  { title: "Kong 3.9.x only", detail: "The only version tested." },
  { title: "28 cases, one clean run, one model", detail: "Enough to demonstrate and to catch regressions; not enough to state a stable percentage." },
];

/* ------------------------------------------------------------------ */
/* Images (public/kong) — captured terminal output and Kong Manager    */
/* ------------------------------------------------------------------ */

export type KongImage = { src: string; w: number; h: number; alt: string };

export const kongImages: Record<string, KongImage> = {
  agentDiagnosis: { src: "/kong/agent-diagnosis.png", w: 1059, h: 817, alt: "Terminal output of npm run agent: the diagnosis for /payments explaining that no authentication plugin is attached, followed by run metrics — 3 steps, 2 tool calls, 0 repeated calls." },
  agentUpstream: { src: "/kong/agent-diagnosis-upstream.png", w: 1036, h: 602, alt: "Terminal output of a second diagnosis: the payments upstream reports HEALTHCHECKS_OFF rather than unhealthy, with evidence, next steps, limitations and run metrics." },
  kongRoutes: { src: "/kong/kong-manager-routes.png", w: 1581, h: 839, alt: "Kong Manager routes table listing the twelve seeded routes, three of them tagged with their defect scenario." },
  serverStart: { src: "/kong/server-start.png", w: 1061, h: 250, alt: "MCP server startup log: configuration printed with GEMINI_API_KEY reduced to [set], then connected to Kong Admin API with kongVersion 3.9.3." },
  evalExcerpt: { src: "/kong/eval-run-003-excerpt.png", w: 1053, h: 487, alt: "Excerpt of evals/results/run-003.md: case nonexistent-001 PASS, with the verbatim diagnosis for a path that has no route." },
};
