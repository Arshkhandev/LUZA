function registerWindowControls(ipcMain, window) {
  ipcMain.handle("window:minimize", () => window.minimize());
  ipcMain.handle("window:maximize", () => {
    if (window.isMaximized()) window.unmaximize();
    else window.maximize();
  });
  ipcMain.handle("window:close", () => window.close());
}

module.exports = { registerWindowControls };
