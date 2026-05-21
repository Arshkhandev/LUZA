const { exec } = require("child_process");
const os = require("os");
const path = require("path");
const { shell } = require("electron");

const platformLaunchers = {
  win32: {
    chrome: "start \"\" chrome",
    vscode: "code",
    spotify: "start \"\" spotify:",
    terminal: "start \"\" powershell"
  },
  darwin: {
    chrome: "open -a 'Google Chrome'",
    vscode: "open -a 'Visual Studio Code'",
    spotify: "open -a Spotify",
    terminal: "open -a Terminal"
  },
  linux: {
    chrome: "google-chrome",
    vscode: "code",
    spotify: "spotify",
    terminal: "x-terminal-emulator"
  }
};

const favorites = [
  { id: "vscode", label: "VS Code", role: "Primary editor" },
  { id: "chrome", label: "Chrome", role: "Research browser" },
  { id: "terminal", label: "Terminal", role: "Command layer" },
  { id: "spotify", label: "Spotify", role: "Audio focus" }
];

function execute(command) {
  return new Promise((resolve) => {
    exec(command, { windowsHide: true }, (error, stdout, stderr) => {
      resolve({
        ok: !error,
        stdout,
        stderr,
        error: error?.message
      });
    });
  });
}

function registerAppLauncher(ipcMain) {
  ipcMain.handle("apps:favorites", () => favorites);

  ipcMain.handle("apps:launch", async (_, target) => {
    if (target === "downloads") {
      const downloads = path.join(os.homedir(), "Downloads");
      const result = await shell.openPath(downloads);
      return { ok: !result, target, error: result || null };
    }

    const command = platformLaunchers[process.platform]?.[target];
    if (!command) return { ok: false, error: `No launcher registered for ${target}.` };
    return execute(command);
  });
}

module.exports = { registerAppLauncher };
