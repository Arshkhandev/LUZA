import { useEffect } from "react";
import { nextMetricValue } from "../features/system-monitor/mockMetrics";
import { useAssistantStore } from "../store/useAssistantStore";

export function useSystemPulse() {
  useEffect(() => {
    const pulse = window.setInterval(() => {
      useAssistantStore.setState((state) => ({
        metrics: {
          cpu: nextMetricValue(state.metrics.cpu, 10),
          memory: nextMetricValue(state.metrics.memory, 4),
          focus: nextMetricValue(state.metrics.focus, 3),
          tasks: state.metrics.tasks
        }
      }));
    }, 3200);

    return () => {
      window.clearInterval(pulse);
    };
  }, []);
}
