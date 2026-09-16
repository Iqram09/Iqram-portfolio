import { toolGroups, toolGuarantees, agentToolNames, toolSurface } from "@/data/kong";
import { Check } from "@/components/ui/Icons";

const agentSet = new Set<string>(agentToolNames);

export default function ToolCatalog() {
  return (
    <div>
      {/* Guarantees */}
      <ul className="flex flex-wrap gap-2" aria-label="Guarantees shared by every tool">
        {toolGuarantees.map((g) => (
          <li key={g.label} className="flex items-center gap-2 rounded-md border border-line bg-bg-1 px-3 py-1.5">
            <Check size={13} className="text-ok" />
            <span className="text-sm text-fg">{g.label}</span>
            <span className="hidden font-mono text-[10px] text-fg-dim sm:inline">· {g.detail}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {toolGroups.map((g) => (
          <div key={g.group} className="bg-bg p-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-fg">{g.group}</h4>
              <span className="font-mono text-[10px] text-fg-dim">{g.tools.length}</span>
            </div>
            <ul className="mt-3 flex flex-col gap-2.5">
              {g.tools.map((t) => {
                const inAgent = agentSet.has(t.name);
                return (
                  <li key={`${g.group}-${t.name}`}>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-[12.5px] text-accent">{t.name}</code>
                      {inAgent && (
                        <span
                          className="rounded border border-violet/40 bg-violet/10 px-1 font-mono text-[9px] uppercase tracking-wider text-violet"
                          title="Included in the in-repo agent tool set"
                        >
                          agent
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-fg-muted">{t.blurb}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Agent subset note — a real design decision, with its measurement. */}
      <div className="mt-4 grid gap-4 rounded-xl border border-line bg-bg-1 p-5 md:grid-cols-[1fr_auto] md:items-center">
        <p className="text-sm leading-relaxed text-fg-muted">
          <span className="text-fg">The MCP server registers all 14 tools; the in-repo agent is given 8 of them.</span>{" "}
          An interactive client benefits from browsing tools like <code className="font-mono text-[12px] text-fg">list_upstreams</code>;
          an agent with a bounded step budget mostly does not — every extra tool is another way to spend a step on something
          irrelevant. Tool definitions are context the model pays for on every call.
        </p>
        <dl className="flex gap-6 font-mono text-[11px]">
          {toolSurface.map((s) => (
            <div key={s.label}>
              <dt className="text-fg-dim">{s.label}</dt>
              <dd className="mt-0.5 text-fg">
                {s.tools} tools · {s.bytes.toLocaleString()} B
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
