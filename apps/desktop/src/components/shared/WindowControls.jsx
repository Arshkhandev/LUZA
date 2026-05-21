"use client";

import { Minus, Square, X } from "lucide-react";

const controls = [
  { label: "Minimize", icon: Minus, action: () => window.luza?.window?.minimize() },
  { label: "Maximize", icon: Square, action: () => window.luza?.window?.maximize() },
  { label: "Close", icon: X, action: () => window.luza?.window?.close() }
];

export function WindowControls() {
  return (
    <div className="flex items-center gap-2">
      {controls.map((control) => {
        const Icon = control.icon;
        return (
          <button
            key={control.label}
            aria-label={control.label}
            title={control.label}
            onClick={control.action}
            className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-100 hover:shadow-neon"
          >
            <Icon size={15} />
          </button>
        );
      })}
    </div>
  );
}
