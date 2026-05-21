import { motion } from "framer-motion";
import { Code2, FolderOpen, Moon, Search, Shield, Video } from "lucide-react";
import { GlassPanel } from "../shared/GlassPanel";

const actions = [
  { label: "Coding", command: "Start coding mode", icon: Code2 },
  { label: "Focus", command: "Activate focus mode", icon: Shield },
  { label: "Creator", command: "Content creator mode", icon: Video },
  { label: "Night", command: "Night mode", icon: Moon },
  { label: "Downloads", command: "Open Downloads folder", icon: FolderOpen },
  { label: "Lo-fi", command: "Search YouTube for lo-fi music", icon: Search }
];

export function QuickActions({ onCommand }) {
  return (
    <GlassPanel className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">Quick Actions</h2>
        <span className="text-xs text-slate-500">6 presets</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              onClick={() => onCommand(action.command)}
              className="flex h-20 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.07]"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-md bg-cyan-300/10 text-cyan-100">
                <Icon size={17} />
              </span>
              <span className="text-sm font-medium text-slate-200">{action.label}</span>
            </motion.button>
          );
        })}
      </div>
    </GlassPanel>
  );
}
