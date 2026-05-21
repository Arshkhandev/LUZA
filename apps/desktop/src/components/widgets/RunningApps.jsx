import { AppWindow } from "lucide-react";
import { GlassPanel } from "../shared/GlassPanel";

export function RunningApps({ apps }) {
  return (
    <GlassPanel className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AppWindow size={17} className="text-cyan-200" />
          <h2 className="text-sm font-semibold text-slate-100">Running Apps</h2>
        </div>
        <span className="text-xs text-slate-500">{apps.length}</span>
      </div>
      <div className="space-y-2">
        {apps.map((app) => (
          <div key={app} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
            <span className="text-sm text-slate-300">{app}</span>
            <span className="h-2 w-2 rounded-full bg-mint-200 shadow-[0_0_12px_rgba(94,234,212,0.8)]" />
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
