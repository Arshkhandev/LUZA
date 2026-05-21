import { motion } from "framer-motion";
import { Code2, GraduationCap, Moon, PenTool, Shield } from "lucide-react";
import { productivityModes } from "../../features/productivity-modes/modes";
import { GlassPanel } from "../shared/GlassPanel";
import { cn } from "../../utils/cn";

const icons = {
  coding: Code2,
  focus: Shield,
  creator: PenTool,
  night: Moon,
  study: GraduationCap
};

export function ModeDock({ activeMode, onCommand }) {
  return (
    <GlassPanel className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">Productivity Modes</h2>
        <span className="text-xs text-cyan-200">{productivityModes[activeMode]?.label}</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(productivityModes).map(([key, mode]) => {
          const Icon = icons[key];
          const active = activeMode === key;
          return (
            <motion.button
              key={key}
              onClick={() => onCommand(`${mode.label} mode`)}
              aria-label={`${mode.label} mode`}
              title={`${mode.label} mode`}
              className={cn(
                "relative grid h-16 place-items-center rounded-lg border transition",
                active ? "border-cyan-300/50 bg-cyan-300/12 text-cyan-50 shadow-neon" : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-cyan-100"
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {active && <motion.span layoutId="modeGlow" className="absolute inset-0 rounded-lg bg-cyan-300/10" />}
              <Icon size={20} className="relative" />
            </motion.button>
          );
        })}
      </div>
    </GlassPanel>
  );
}
