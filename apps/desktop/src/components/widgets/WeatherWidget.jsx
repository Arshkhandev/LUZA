import { CloudSun } from "lucide-react";
import { GlassPanel } from "../shared/GlassPanel";

export function WeatherWidget() {
  return (
    <GlassPanel className="p-4">
      <div className="mb-4 flex items-center justify-between text-slate-400">
        <CloudSun size={17} />
        <span className="text-xs uppercase tracking-[0.2em]">Weather</span>
      </div>
      <div className="text-3xl font-semibold text-slate-100">28°C</div>
      <div className="mt-2 text-sm text-slate-500">Clear night signal</div>
    </GlassPanel>
  );
}
