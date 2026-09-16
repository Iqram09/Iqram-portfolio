import Image from "next/image";
import { telemetryFields, telemetrySample, kongImages } from "@/data/kong";
import Window from "@/components/ui/Window";

function Fields({ title, fields }: { title: string; fields: string[] }) {
  return (
    <div>
      <p className="label-mono">{title}</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {fields.map((f) => (
          <li key={f} className="rounded border border-line bg-bg-2 px-2 py-0.5 font-mono text-[11px] text-fg-muted">
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Syntax-tints a small JSON sample without a highlighter dependency. */
function Json({ src }: { src: string }) {
  const lines = src.split("\n");
  return (
    <pre className="overflow-x-auto px-4 py-3 font-mono text-[11.5px] leading-[1.7] text-fg-muted">
      {lines.map((line, i) => {
        const m = line.match(/^(\s*)"([^"]+)":\s*(.*)$/);
        if (!m) {
          return (
            <span key={i} className="block text-fg-dim">
              {line}
            </span>
          );
        }
        const [, indent, key, raw] = m;
        const isString = raw.startsWith('"');
        const tone = isString ? "text-fg" : /^(true|false)/.test(raw) ? "text-violet" : "text-accent";
        return (
          <span key={i} className="block">
            {indent}
            <span className="text-fg-muted">&quot;{key}&quot;</span>
            <span className="text-fg-dim">: </span>
            <span className={tone}>{raw}</span>
          </span>
        );
      })}
    </pre>
  );
}

export default function TelemetryPanel() {
  const shot = kongImages.serverStart;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12">
      <div className="flex flex-col gap-6 lg:col-span-5">
        <Fields title="per tool call" fields={telemetryFields.tool} />
        <Fields title="per LLM call" fields={telemetryFields.llm} />
        <Fields title="per run" fields={telemetryFields.run} />
        <div className="rounded-lg border border-line bg-bg-1 p-4 text-[13px] leading-relaxed text-fg-muted">
          Three correlation ids, deliberately distinct: <code className="font-mono text-fg">taskId</code> for one question,{" "}
          <code className="font-mono text-fg">traceId</code> for one agent run, <code className="font-mono text-fg">requestId</code>{" "}
          for one tool or LLM call. Logs are newline-delimited JSON on stderr — never stdout, which carries the protocol. Token counts are
          provider-reported or null; cost is “unavailable” rather than $0.00 when a model has no declared price.
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4 lg:col-span-7">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
          <Window title="tool_call" meta="stderr · pino">
            <Json src={telemetrySample.toolCall} />
          </Window>
          <Window title="llm_call" meta="provider-reported usage">
            <Json src={telemetrySample.llmCall} />
          </Window>
        </div>
        <Window title="npm start" meta="config redacted at startup">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.w}
            height={shot.h}
            sizes="(min-width: 1024px) 640px, 100vw"
            className="w-full"
          />
          <p className="border-t border-line px-4 py-2 font-mono text-[11px] text-fg-dim">
            <code>&quot;GEMINI_API_KEY&quot;: &quot;[set]&quot;</code> — redactConfig reduces the key to a presence flag. No key value is printed anywhere.
          </p>
        </Window>
      </div>
    </div>
  );
}
