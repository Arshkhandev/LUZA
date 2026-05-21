"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import { GlassPanel } from "../shared/GlassPanel";

export function TimeDateWidget() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const time = now
    ? now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
    : "--:--";

  const date = now
    ? now.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
    : "Initializing";

  return (
    <GlassPanel className="p-4">
      <div className="mb-5 flex items-center justify-between text-slate-400">
        <Clock3 size={17} />
        <span className="text-xs uppercase tracking-[0.2em]">Local</span>
      </div>
      <div className="font-mono text-4xl text-cyan-50">{time}</div>
      <div className="mt-2 text-sm text-slate-500">{date}</div>
    </GlassPanel>
  );
}
