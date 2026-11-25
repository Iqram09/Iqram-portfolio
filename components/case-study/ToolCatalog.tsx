import { toolGroups, toolGuarantees, agentToolNames, toolSurface } from "@/data/kong";
import { Check } from "@/components/ui/Icons";

const agentSet = new Set<string>(agentToolNames);

export default function ToolCatalog() {
  return (
    <div>
      {/* Guarantees */}
      <ul className="flex flex-col gap-2 text-[16px]" aria-label="Guarantees shared by every tool">
        {toolGuarantees.map((g) => (
          <li key={g.label} className="flex flex-wrap items-center gap-x-2.5">
            <Check size={17} className="text-ok" />
            <span className="font-medium tracking-[-0.01em]">{g.label}</span>
            <span className="text-[14px] text-fg-dim max-sm:pl-[27px]">· {g.detail}</span>
          </li>
        ))}
      </ul>

      {/* Alternating grounds, like a board. */}
      <div className="mt-7 grid overflow-hidden rounded-[18px] sm:grid-cols-2">
        {toolGroups.map((g, i) => (
          <div
            key={g.group}
            className={`p-6 md:p-8 ${i % 2 ? "bg-stone" : "bg-bg-1"} ${i % 4 === 1 || i % 4 === 2 ? "sm:bg-stone" : "sm:bg-bg-1"}`}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-[26px] tracking-[-0.03em]">{g.group}</h3>
              <span className="text-[15px] tabular-nums text-fg-dim">{g.tools.length}</span>
            </div>
            <ul className="mt-5 flex flex-col gap-4">
              {g.tools.map((t) => {
                const inAgent = agentSet.has(t.name);
                return (
                  <li key={`${g.group}-${t.name}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <code className="break-all font-mono text-[14px] font-medium">{t.name}</code>
                      {inAgent && (
                        <span className="rounded bg-violet px-1.5 py-px text-[12px] text-white" title="Included in the in-repo agent tool set">
                          agent
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[15px] leading-[1.5] text-fg-muted">{t.blurb}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Agent subset note — a real design decision, with its measurement. */}
      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
        <p className="text-[16px] leading-relaxed text-fg-muted">
          <span className="text-fg">The MCP server registers all 14 tools; the in-repo agent is given 8 of them.</span>{" "}
          An interactive client benefits from browsing tools like <code className="font-mono text-[14px] text-fg">list_upstreams</code>;
          an agent with a bounded step budget mostly does not — every extra tool is another way to spend a step on something
          irrelevant. Tool definitions are context the model pays for on every call.
        </p>
        <dl className="flex gap-8">
          {toolSurface.map((s) => (
            <div key={s.label}>
              <dt className="text-[14px] text-fg-dim">{s.label}</dt>
              <dd className="mt-1 whitespace-nowrap text-[16px]">
                {s.tools} tools · {s.bytes.toLocaleString()} B
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
