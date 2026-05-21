import say from "say";

export function speakText(text) {
  if (!text || process.env.LUZA_SERVER_TTS === "false") return;
  try {
    say.speak(text, undefined, 0.92);
  } catch {
    // Desktop speech is optional and should never block command execution.
  }
}
