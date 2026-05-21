import { create } from "zustand";

const initialHistory = [
  { id: "boot", command: "System boot", response: "LUZA online.", status: "complete", time: "16:26" },
  { id: "mode", command: "Start coding mode", response: "Coding environment ready.", status: "complete", time: "16:28" }
];

export const useAssistantStore = create((set) => ({
  status: "standby",
  transcript: "",
  response: "Good evening, Arsh.",
  activeMode: "coding",
  history: initialHistory,
  runningApps: ["VS Code", "Chrome", "Terminal"],
  suggestions: [
    "Resume portfolio project",
    "Review open pull requests",
    "Start focus sprint",
    "Search recent downloads"
  ],
  metrics: {
    cpu: 28,
    memory: 61,
    focus: 87,
    tasks: 12
  },
  setStatus: (status) => set({ status }),
  setTranscript: (transcript) => set({ transcript }),
  setResponse: (response) => set({ response }),
  setMode: (activeMode) => set({ activeMode }),
  setRunningApps: (runningApps) => set({ runningApps }),
  updateMetrics: (metrics) => set((state) => ({ metrics: { ...state.metrics, ...metrics } })),
  addHistory: (entry) =>
    set((state) => ({
      history: [
        {
          id: crypto.randomUUID(),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          ...entry
        },
        ...state.history
      ].slice(0, 8)
    }))
}));
