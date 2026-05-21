export const appRegistry = {
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
