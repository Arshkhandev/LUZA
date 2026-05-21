export function nextMetricValue(value, drift = 8) {
  const delta = Math.round((Math.random() - 0.48) * drift);
  return Math.min(96, Math.max(8, value + delta));
}
