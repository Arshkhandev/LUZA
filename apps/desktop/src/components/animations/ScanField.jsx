import { motion } from "framer-motion";

export function ScanField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hud-grid absolute inset-0 opacity-60" />
      <motion.div
        className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"
        animate={{ y: [0, 420, 0], opacity: [0.15, 0.55, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-[12%] top-[10%] h-56 w-56 rounded-full border border-cyan-300/15"
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{ rotate: { duration: 24, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity } }}
      />
    </div>
  );
}
