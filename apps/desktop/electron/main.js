const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { registerSystemCommands } = require("./ipc/systemCommands");
const { registerWindowControls } = require("./ipc/windowControls");
const { registerAppLauncher } = require("./ipc/appLauncher");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1120,
    minHeight: 760,
    frame: false,
    titleBarStyle: "hidden",
    backgroundColor: "#030507",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      devTools: isDev
    }
  });

  const startUrl = isDev
    ? process.env.LUZA_DESKTOP_URL || "http://localhost:3000"
    : `file://${path.join(__dirname, "../out/index.html")}`;

  mainWindow.loadURL(startUrl);
  mainWindow.once("ready-to-show", () => mainWindow.show());

  registerWindowControls(ipcMain, mainWindow);
  registerSystemCommands(ipcMain);
  registerAppLauncher(ipcMain);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
