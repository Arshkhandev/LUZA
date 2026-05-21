import { motion } from "framer-motion";

const bars = Array.from({ length: 32 }, (_, index) => index);

export function Waveform({ active }) {
  return (
    <div className="flex h-16 items-center justify-center gap-1.5">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-1 rounded-full bg-cyan-200/80 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
          animate={{
            height: active ? [10, 18 + ((bar * 7) % 34), 12] : [8, 12, 8],
            opacity: active ? [0.35, 0.95, 0.45] : 0.24
          }}
          transition={{
            duration: 0.8 + (bar % 5) * 0.08,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
