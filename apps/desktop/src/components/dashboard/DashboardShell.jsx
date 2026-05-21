"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { AssistantCore } from "../ai/AssistantCore";
import { ScanField } from "../animations/ScanField";
import { HudChrome } from "../hud/HudChrome";
import { QuickActions } from "./QuickActions";
import { CommandHistory } from "./CommandHistory";
import { ModeDock } from "./ModeDock";
import { TimeDateWidget } from "../widgets/TimeDateWidget";
import { WeatherWidget } from "../widgets/WeatherWidget";
import { SystemPerformance } from "../widgets/SystemPerformance";
import { ProductivityStats } from "../widgets/ProductivityStats";
import { RunningApps } from "../widgets/RunningApps";
import { AiSuggestions } from "../widgets/AiSuggestions";
import { useAssistantStore } from "../../store/useAssistantStore";
import { useVoiceRecognition } from "../../features/voice-engine/useVoiceRecognition";
import { executeAssistantCommand } from "../../services/commandClient";
import { playTone } from "../../utils/sound";
import { useSystemPulse } from "../../hooks/useSystemPulse";

export function DashboardShell() {
  useSystemPulse();

  const store = useAssistantStore();

  const runCommand = useCallback(
    async (command) => {
      store.setTranscript(command);
      await executeAssistantCommand(command, useAssistantStore.getState());
    },
    [store]
  );

  const voice = useVoiceRecognition({
    onCommand: runCommand,
    onWake: () => {
      playTone("wake");
      store.setStatus("active");
      store.setResponse("Online. How can I assist?");
    },
    onTranscript: store.setTranscript
  });

  const toggleVoice = () => {
    if (voice.listening) voice.stop();
    else voice.start();
  };

  return (
    <main className="aurora-field relative h-screen overflow-hidden">
      <ScanField />
      <HudChrome />

      <motion.div
        className="relative z-10 grid h-[calc(100vh-4rem)] grid-cols-[1fr_1.18fr_1fr] gap-4 p-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="grid min-h-0 gap-4">
          <TimeDateWidget />
          <WeatherWidget />
          <ProductivityStats metrics={store.metrics} />
          <RunningApps apps={store.runningApps} />
        </div>

        <div className="grid min-h-0 grid-rows-[1fr_auto] gap-4">
          <AssistantCore
            transcript={store.transcript}
            response={store.response}
            status={store.status}
            voice={voice}
            onToggle={toggleVoice}
          />
          <ModeDock activeMode={store.activeMode} onCommand={runCommand} />
        </div>

        <div className="grid min-h-0 gap-4">
          <QuickActions onCommand={runCommand} />
          <SystemPerformance metrics={store.metrics} />
          <AiSuggestions suggestions={store.suggestions} onCommand={runCommand} />
          <CommandHistory history={store.history} />
        </div>
      </motion.div>
    </main>
  );
}
