import { motion } from "framer-motion";
import { Brain, MessageSquareText } from "lucide-react";
import { GlassPanel } from "../shared/GlassPanel";
import { VoiceOrb } from "../voice/VoiceOrb";

export function AssistantCore({ transcript, response, status, voice, onToggle }) {
  return (
    <GlassPanel className="relative min-h-[620px] overflow-hidden p-6 scanline">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-100">
            <Brain size={18} />
            <h1 className="text-lg font-semibold">Assistant Core</h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">Real-time command intelligence</p>
        </div>
        <motion.div
          className="rounded-md border border-cyan-300/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100"
          animate={{ opacity: status === "processing" ? [0.5, 1, 0.5] : 0.8 }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          {status}
        </motion.div>
      </div>

      <div className="grid place-items-center">
        <VoiceOrb active={voice.listening} armed={voice.armed} supported={voice.supported} onToggle={onToggle} />
      </div>

      <div className="mt-8 grid gap-4">
        <div className="rounded-lg border border-white/10 bg-black/25 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
            <MessageSquareText size={14} />
            Live transcription
          </div>
          <p className="min-h-12 text-base text-slate-200">{transcript || "Say Hey LUZA, then speak a command."}</p>
        </div>

        <motion.div
          className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.06] p-4"
          initial={false}
          animate={{ boxShadow: ["0 0 0 rgba(34,211,238,0)", "0 0 36px rgba(34,211,238,0.12)", "0 0 0 rgba(34,211,238,0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">LUZA response</div>
          <p className="mt-2 text-xl font-semibold text-cyan-50">{response}</p>
        </motion.div>
      </div>
    </GlassPanel>
  );
}
