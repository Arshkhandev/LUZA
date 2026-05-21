import { Sparkle } from "lucide-react";
import { GlassPanel } from "../shared/GlassPanel";

export function AiSuggestions({ suggestions, onCommand }) {
  return (
    <GlassPanel className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <Sparkle size={17} className="text-violet-200" />
        <h2 className="text-sm font-semibold text-slate-100">AI Suggestions</h2>
      </div>
      <div className="space-y-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onCommand(suggestion)}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-left text-sm text-slate-300 transition hover:border-violet-300/40 hover:text-violet-100"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </GlassPanel>
  );
}
