export const appAliases = {
  chrome: ["chrome", "chrom", "chromw", "google chrome", "browser"],
  vscode: ["visual studio code", "vs code", "vscode", "editor", "code editor"],
  spotify: ["spotify", "music"],
  terminal: ["terminal", "powershell", "command line", "shell"],
  downloads: ["downloads", "downloads folder"],
  youtube: ["youtube", "you tube"]
};

export const productivityModeRules = [
  {
    mode: "coding",
    phrases: ["coding mode", "start coding", "i want to code", "open my editor", "launch coding setup"],
    response: "Coding environment ready."
  },
  {
    mode: "focus",
    phrases: ["focus mode", "deep work", "block distractions"],
    response: "Focus mode activated."
  },
  {
    mode: "creator",
    phrases: ["creator mode", "content creator mode", "recording setup", "make content"],
    response: "Creator workspace online."
  },
  {
    mode: "night",
    phrases: ["night mode", "late night mode", "dim the interface"],
    response: "Night mode engaged."
  },
  {
    mode: "study",
    phrases: ["study mode", "learning mode", "research mode"],
    response: "Study mode prepared."
  }
];

export function normalizeCommand(input = "") {
  return input
    .toLowerCase()
    .replace(/[^\w\s:/.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseCommand(input = "") {
  const normalized = normalizeCommand(input);

  if (
    ["hi luza", "hii luza", "hiii luza", "hello luza", "hey luza", "luza", "lusa", "luja", "luzza", "looser", "loser", "luzer"].includes(normalized) ||
    /^(hi+|hello|hey)\s+(luza|lusa|luja|luzza|looser|loser|luzer)$/.test(normalized)
  ) {
    return {
      type: "assistant.greeting",
      confidence: 0.96,
      response: "Online. How can I assist?",
      raw: input
    };
  }

  const modeRule = productivityModeRules.find((rule) =>
    rule.phrases.some((phrase) => normalized.includes(phrase))
  );

  if (modeRule) {
    return {
      type: "mode.activate",
      mode: modeRule.mode,
      confidence: 0.93,
      response: modeRule.response,
      raw: input
    };
  }

  if (normalized.includes("search youtube for")) {
    return {
      type: "web.search",
      provider: "youtube",
      query: normalized.split("search youtube for").at(-1).trim(),
      confidence: 0.91,
      response: "Opening YouTube search.",
      raw: input
    };
  }

  if (normalized.startsWith("open ") || normalized.startsWith("launch ") || normalized.startsWith("start ")) {
    const target = normalized.replace(/^(open|launch|start)\s+/, "");
    const app = Object.entries(appAliases).find(([, aliases]) =>
      aliases.some((alias) => target.includes(alias))
    );

    if (app) {
      return {
        type: app[0] === "downloads" ? "folder.open" : app[0] === "youtube" ? "web.open" : "app.launch",
        target: app[0],
        confidence: 0.88,
        response: app[0] === "downloads" ? "Opening Downloads." : app[0] === "youtube" ? "Opening YouTube." : `Launching ${app[0]}.`,
        raw: input
      };
    }

    return {
      type: "file.search",
      query: target,
      confidence: 0.66,
      response: "Searching local workspace.",
      raw: input
    };
  }

  if (normalized.includes("shutdown") || normalized.includes("shut down")) {
    return {
      type: "system.shutdown",
      dangerous: true,
      confidence: 0.9,
      response: "Shutdown command requires confirmation.",
      raw: input
    };
  }

  return {
    type: "ai.respond",
    prompt: input,
    confidence: 0.45,
    response: "Analyzing request.",
    raw: input
  };
}
