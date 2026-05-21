import { CheckCircle2, CircleDashed, Lock } from "lucide-react";
import { GlassPanel } from "../shared/GlassPanel";

const icons = {
  complete: CheckCircle2,
  running: CircleDashed,
  blocked: Lock
};

export function CommandHistory({ history }) {
  return (
    <GlassPanel className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">Command History</h2>
        <span className="text-xs text-slate-500">live</span>
      </div>
      <div className="no-scrollbar max-h-[270px] space-y-3 overflow-auto pr-1">
        {history.map((item) => {
          const Icon = icons[item.status] || CircleDashed;
          return (
            <div key={item.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-slate-200">{item.command}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.response}</p>
                </div>
                <Icon size={16} className="shrink-0 text-cyan-200" />
              </div>
              <div className="mt-2 text-[11px] text-slate-600">{item.time}</div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
