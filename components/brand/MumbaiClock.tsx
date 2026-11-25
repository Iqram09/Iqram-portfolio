"use client";

import { useEffect, useState } from "react";

const base = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false } as const;
const long = new Intl.DateTimeFormat("en-GB", { ...base, second: "2-digit" });
const brief = new Intl.DateTimeFormat("en-GB", base);

/** Local time in Mumbai, ticking each second. Renders a placeholder on the server. `short` drops the seconds. */
export default function MumbaiClock({ className, short }: { className?: string; short?: boolean }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = short ? brief : long;
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [short]);
  return (
    <time className={className} aria-label="Local time in Mumbai">
      {now ?? (short ? "--:--" : "--:--:--")}
    </time>
  );
}
