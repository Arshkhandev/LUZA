import { motion } from "framer-motion";
import { Mic, Radio } from "lucide-react";
import { Waveform } from "./Waveform";

export function VoiceOrb({ active, armed, supported, onToggle }) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onToggle}
        className="relative grid h-64 w-64 place-items-center rounded-full border border-cyan-200/25 bg-black/40 shadow-[0_0_90px_rgba(34,211,238,0.2)]"
        aria-label="Toggle LUZA listening"
        title="Toggle listening"
      >
        <motion.div
          className="absolute inset-5 rounded-full border border-cyan-300/25"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-12 rounded-full border border-violet-300/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-300/10 blur-2xl"
          animate={{ opacity: active ? [0.28, 0.72, 0.28] : 0.18, scale: active ? [0.94, 1.05, 0.94] : 0.94 }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <div className="relative grid h-28 w-28 place-items-center rounded-full border border-white/15 bg-gradient-to-br from-cyan-200/20 via-slate-950 to-violet-300/10">
          {armed ? <Radio size={34} className="text-mint-200" /> : <Mic size={34} className="text-cyan-100" />}
        </div>
      </button>

      <Waveform active={active || armed} />
      <div className="text-center">
        <p className="text-sm font-medium text-slate-200">{supported ? (armed ? "Wake word accepted" : active ? "Listening for Hey LUZA" : "Standby") : "Speech API unavailable"}</p>
        <p className="mt-1 text-xs text-slate-500">Neural voice interface</p>
      </div>
    </div>
  );
}
