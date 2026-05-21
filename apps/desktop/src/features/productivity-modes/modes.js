export const productivityModes = {
  coding: {
    label: "Coding",
    ambiance: "cyan",
    apps: ["vscode", "chrome", "terminal"],
    actions: ["Open editor", "Launch terminal", "Resume local server"]
  },
  focus: {
    label: "Focus",
    ambiance: "mint",
    apps: ["terminal"],
    actions: ["Mute notifications", "Start 50 minute sprint", "Hide distractions"]
  },
  creator: {
    label: "Creator",
    ambiance: "violet",
    apps: ["chrome", "spotify"],
    actions: ["Open content board", "Launch recorder", "Prepare references"]
  },
  night: {
    label: "Night",
    ambiance: "blue",
    apps: ["vscode", "spotify"],
    actions: ["Dim interface", "Open notes", "Start ambient audio"]
  },
  study: {
    label: "Study",
    ambiance: "amber",
    apps: ["chrome", "downloads"],
    actions: ["Open research", "Prepare notes", "Queue reading list"]
  }
};
