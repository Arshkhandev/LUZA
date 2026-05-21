"use client";

import { Cpu, Sparkles } from "lucide-react";
import { WindowControls } from "../shared/WindowControls";

export function HudChrome() {
  return (
    <header className="drag-region relative z-20 flex h-16 items-center justify-between border-b border-white/10 px-5">
      <div className="flex items-center gap-4">
        <div className="grid h-9 w-9 place-items-center rounded-md border border-cyan-300/30 bg-cyan-300/10 shadow-neon">
          <Sparkles size={17} className="text-cyan-100" />
        </div>
        <div>
          <div className="text-sm font-semibold text-cyan-100">LUZA</div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-slate-500">AI operating layer</div>
        </div>
      </div>

      <div className="hidden items-center gap-3 text-xs text-slate-400 md:flex">
        <Cpu size={15} className="text-mint-200" />
        <span>Secure command bridge active</span>
      </div>

      <WindowControls />
    </header>
  );
}
