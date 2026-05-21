export function composeAssistantResponse(intent, result) {
  if (result?.protected) return "Protected action blocked.";
  if (result?.ok === false && result?.message) return result.message;
  if (intent?.response) return intent.response;
  return "Request processed.";
}

export function speak(text) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.92;
  utterance.pitch = 0.82;
  utterance.volume = 0.82;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
