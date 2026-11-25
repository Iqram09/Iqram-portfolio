import Image from "next/image";
import { telemetryFields, telemetrySample, kongImages } from "@/data/kong";
import Window from "@/components/ui/Window";

function Fields({ title, fields }: { title: string; fields: string[] }) {
  return (
    <div>
      <p className="label">{title}</p>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {fields.map((f) => (
          <li key={f} className="bg-bg-1 px-2 py-1 font-mono text-[12.5px] text-fg-muted">
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
    <pre tabIndex={0} className="on-dark h-full overflow-x-auto bg-term px-4 py-3.5 font-mono text-[12px] leading-[1.7] text-term-muted">
      {lines.map((line, i) => {
        const m = line.match(/^(\s*)"([^"]+)":\s*(.*)$/);
        if (!m) {
          return (
            <span key={i} className="block text-term-dim">
              {line}
            </span>
          );
        }
        const [, indent, key, raw] = m;
        const isString = raw.startsWith('"');
        const tone = isString ? "text-term-fg" : /^(true|false)/.test(raw) ? "text-term-violet" : "text-term-accent";
        return (
          <span key={i} className="block">
            {indent}
            <span className="text-term-muted">&quot;{key}&quot;</span>
            <span className="text-term-dim">: </span>
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
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-12 lg:gap-6">
      <div className="flex flex-col gap-7 lg:col-span-5">
        <Fields title="per tool call" fields={telemetryFields.tool} />
        <Fields title="per LLM call" fields={telemetryFields.llm} />
        <Fields title="per run" fields={telemetryFields.run} />
        <div className="rounded-[14px] bg-stone p-5 text-[15px] leading-relaxed text-fg-muted">
          Three correlation ids, deliberately distinct: <code className="font-mono text-[13px] text-fg">taskId</code> for one question,{" "}
          <code className="font-mono text-[13px] text-fg">traceId</code> for one agent run,{" "}
          <code className="font-mono text-[13px] text-fg">requestId</code>{" "}
          for one tool or LLM call. Logs are newline-delimited JSON on stderr — never stdout, which carries the protocol. Token counts are
          provider-reported or null; cost is “unavailable” rather than $0.00 when a model has no declared price.
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4 lg:col-span-7">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
          <Window title="tool_call" meta="stderr · pino" bodyClassName="bg-term">
            <Json src={telemetrySample.toolCall} />
          </Window>
          <Window title="llm_call" meta="provider-reported usage" bodyClassName="bg-term">
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
          <p className="border-t border-line px-4 py-3 text-[14px] leading-relaxed text-fg-muted">
            <code className="font-mono text-[13px] text-fg">&quot;GEMINI_API_KEY&quot;: &quot;[set]&quot;</code> — redactConfig reduces the key to a presence flag. No key value is printed anywhere.
          </p>
        </Window>
      </div>
    </div>
  );
}
