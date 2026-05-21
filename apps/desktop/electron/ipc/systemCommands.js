const { exec } = require("child_process");
const { shell } = require("electron");
const fs = require("fs/promises");
const os = require("os");
const path = require("path");

const allowDangerousCommands = process.env.LUZA_ENABLE_DANGEROUS_COMMANDS === "true";

const safeCommands = {
  "system.info": process.platform === "win32" ? "systeminfo" : "uname -a",
  "system.processes": process.platform === "win32" ? "tasklist" : "ps aux"
};

function run(command) {
  return new Promise((resolve) => {
    exec(command, { windowsHide: true, timeout: 20000 }, (error, stdout, stderr) => {
      resolve({ ok: !error, stdout, stderr, error: error?.message });
    });
  });
}

async function findFiles(query) {
  const roots = [path.join(os.homedir(), "Desktop"), path.join(os.homedir(), "Documents"), path.join(os.homedir(), "Downloads")];
  const needle = query.toLowerCase();
  const matches = [];

  async function walk(dir, depth = 0) {
    if (depth > 2 || matches.length >= 24) return;
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.name.toLowerCase().includes(needle)) {
          matches.push({ name: entry.name, path: fullPath, type: entry.isDirectory() ? "folder" : "file" });
        }
        if (entry.isDirectory()) await walk(fullPath, depth + 1);
      }
    } catch {
      // Some user folders are protected; LUZA skips them quietly.
    }
  }

  await Promise.all(roots.map((root) => walk(root)));
  return matches;
}

function registerSystemCommands(ipcMain) {
  ipcMain.handle("system:open-path", async (_, targetPath) => {
    const result = await shell.openPath(targetPath);
    return { ok: !result, error: result || null };
  });

  ipcMain.handle("system:search-files", async (_, query) => {
    const results = await findFiles(query);
    return { ok: true, results };
  });

  ipcMain.handle("system:execute", async (_, intent) => {
    if (intent?.dangerous && !allowDangerousCommands) {
      return { ok: false, protected: true, message: "Dangerous command blocked by LUZA safety policy." };
    }

    if (intent?.type === "system.shutdown") {
      const command = process.platform === "win32" ? "shutdown /s /t 20" : "shutdown -h +1";
      return run(command);
    }

    if (intent?.type === "web.search" || intent?.type === "web.open") {
      const query = encodeURIComponent(intent.query || "");
      const url = intent.type === "web.open" && intent.target === "youtube"
        ? "https://www.youtube.com"
        : intent.provider === "youtube"
        ? `https://www.youtube.com/results?search_query=${query}`
        : `https://www.google.com/search?q=${query}`;
      await shell.openExternal(url);
      return { ok: true };
    }

    const command = safeCommands[intent?.type];
    if (!command) return { ok: false, message: "No system command route registered." };
    return run(command);
  });
}

module.exports = { registerSystemCommands };
