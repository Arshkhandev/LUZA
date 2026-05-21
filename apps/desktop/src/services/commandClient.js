import { parseCommand } from "../features/command-parser/clientParser";
import { composeAssistantResponse, speak } from "../features/ai-core/personality";
import { playTone } from "../utils/sound";

const serverBaseUrl = process.env.NEXT_PUBLIC_LUZA_API_URL || "http://localhost:4545";

export async function executeAssistantCommand(command, store) {
  const intent = parseCommand(command);
  store.addHistory({ command, response: intent.response, status: "running" });
  store.setStatus("processing");

  let result = { ok: true };

  try {
    if (intent.type === "assistant.greeting") {
      result = { ok: true };
    } else if (intent.type === "app.launch") {
      result = window.luza?.apps ? await window.luza.apps.launch(intent.target) : await postCommand(command);
    } else if (intent.type === "folder.open") {
      result = window.luza?.apps ? await window.luza.apps.launch("downloads") : await postCommand(command);
    } else if (intent.type === "mode.activate") {
      store.setMode(intent.mode);
      result = await launchMode(intent.mode);
    } else if (intent.type === "web.search" || intent.type === "web.open") {
      result = window.luza?.system ? await window.luza.system.execute(intent) : await postCommand(command);
    } else if (intent.type === "file.search") {
      result = window.luza?.system
        ? await window.luza.system.searchFiles(intent.query)
        : await postCommand(command);
    } else if (intent.type.startsWith("system.")) {
      result = window.luza?.system ? await window.luza.system.execute(intent) : await postCommand(command);
    } else {
      result = await postCommand(command);
    }
  } catch (error) {
    result = { ok: false, error: error.message };
  }

  const response = composeAssistantResponse(intent, result);
  store.setResponse(response);
  store.addHistory({ command, response, status: result.ok === false ? "blocked" : "complete" });
  store.setStatus(result.ok === false ? "standby" : "active");
  playTone(result.ok === false ? "error" : "success");
  speak(response);
  return { intent, result, response };
}

async function postCommand(command) {
  const response = await fetch(`${serverBaseUrl}/api/commands`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command })
  });
  return response.json();
}

async function launchMode(mode) {
  const modeApps = {
    coding: ["vscode", "chrome", "terminal"],
    focus: ["terminal"],
    creator: ["chrome", "spotify"],
    night: ["vscode", "spotify"],
    study: ["chrome", "downloads"]
  };

  if (!window.luza?.apps) return { ok: true, mode };
  const results = await Promise.all((modeApps[mode] || []).map((app) => window.luza.apps.launch(app)));
  return { ok: results.every((item) => item.ok !== false), results };
}
