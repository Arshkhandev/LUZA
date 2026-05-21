import { exec } from "child_process";
import os from "os";
import path from "path";
import { serverConfig } from "@luza/config";
import { appRegistry } from "../system/appRegistry.js";
import { findFiles } from "../system/fileSearch.js";

function run(command) {
  return new Promise((resolve) => {
    exec(command, { windowsHide: true, timeout: 20000 }, (error, stdout, stderr) => {
      resolve({ ok: !error, stdout, stderr, error: error?.message });
    });
  });
}

export async function runSystemIntent(intent) {
  if (intent.type === "assistant.greeting") {
    return { ok: true, response: intent.response };
  }

  if (intent.dangerous && !serverConfig.allowDangerousCommands) {
    return { ok: false, protected: true, response: "Protected action blocked." };
  }

  if (intent.type === "app.launch") {
    const command = appRegistry[process.platform]?.[intent.target];
    if (!command) return { ok: false, response: `No launcher registered for ${intent.target}.` };
    const result = await run(command);
    return { ...result, response: intent.response };
  }

  if (intent.type === "folder.open" && intent.target === "downloads") {
    const downloads = path.join(os.homedir(), "Downloads");
    const command = process.platform === "win32" ? `start "" "${downloads}"` : `open "${downloads}"`;
    const result = await run(command);
    return { ...result, response: intent.response };
  }

  if (intent.type === "file.search") {
    const results = await findFiles(intent.query);
    return { ok: true, results, response: results.length ? "I found matching local items." : "No matching files found." };
  }

  if (intent.type === "web.search") {
    const encoded = encodeURIComponent(intent.query);
    const url = intent.provider === "youtube"
      ? `https://www.youtube.com/results?search_query=${encoded}`
      : `https://www.google.com/search?q=${encoded}`;
    const command = process.platform === "win32"
      ? `start "" "${url}"`
      : process.platform === "darwin"
        ? `open "${url}"`
        : `xdg-open "${url}"`;
    const result = await run(command);
    return { ...result, response: intent.response };
  }

  if (intent.type === "web.open" && intent.target === "youtube") {
    const command = process.platform === "win32"
      ? "start \"\" \"https://www.youtube.com\""
      : process.platform === "darwin"
        ? "open \"https://www.youtube.com\""
        : "xdg-open \"https://www.youtube.com\"";
    const result = await run(command);
    return { ...result, response: intent.response };
  }

  if (intent.type === "system.shutdown") {
    const command = process.platform === "win32" ? "shutdown /s /t 20" : "shutdown -h +1";
    const result = await run(command);
    return { ...result, response: "Shutdown sequence initiated." };
  }

  if (intent.type === "mode.activate") {
    return { ok: true, mode: intent.mode, response: intent.response };
  }

  return { ok: false, response: "No route has been assigned for that command." };
}
