export function playTone(type = "success") {
  if (typeof window === "undefined") return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  const frequencies = {
    wake: [520, 740],
    success: [660, 880],
    error: [220, 180]
  };

  const [start, end] = frequencies[type] || frequencies.success;
  oscillator.frequency.setValueAtTime(start, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(end, context.currentTime + 0.16);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.22);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.24);
}
