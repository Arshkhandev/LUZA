import { Activity } from "lucide-react";
import { GlassPanel } from "../shared/GlassPanel";

function Bar({ label, value, color = "bg-cyan-300" }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs text-slate-500">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className={`${color} h-full rounded-full shadow-[0_0_18px_rgba(34,211,238,0.3)]`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function SystemPerformance({ metrics }) {
  return (
    <GlassPanel className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-100">
          <Activity size={17} className="text-cyan-200" />
          <h2 className="text-sm font-semibold">System Performance</h2>
        </div>
        <span className="text-xs text-slate-500">pulse</span>
      </div>
      <div className="space-y-4">
        <Bar label="CPU" value={metrics.cpu} />
        <Bar label="Memory" value={metrics.memory} color="bg-violet-300" />
        <Bar label="Focus" value={metrics.focus} color="bg-teal-300" />
      </div>
    </GlassPanel>
  );
}
