import { Target, Zap } from "lucide-react";
import { GlassPanel } from "../shared/GlassPanel";

export function ProductivityStats({ metrics }) {
  return (
    <GlassPanel className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">Productivity</h2>
        <Zap size={16} className="text-amber-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-white/10 bg-black/20 p-3">
          <div className="flex items-center gap-2 text-slate-500">
            <Target size={14} />
            <span className="text-xs">Focus</span>
          </div>
          <div className="mt-3 text-3xl font-semibold text-cyan-50">{metrics.focus}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/20 p-3">
          <div className="text-xs text-slate-500">Tasks</div>
          <div className="mt-3 text-3xl font-semibold text-slate-100">{metrics.tasks}</div>
        </div>
      </div>
    </GlassPanel>
  );
}
