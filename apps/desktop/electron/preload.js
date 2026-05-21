const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("luza", {
  system: {
    execute: (intent) => ipcRenderer.invoke("system:execute", intent),
    openPath: (targetPath) => ipcRenderer.invoke("system:open-path", targetPath),
    searchFiles: (query) => ipcRenderer.invoke("system:search-files", query)
  },
  apps: {
    launch: (target) => ipcRenderer.invoke("apps:launch", target),
    favorites: () => ipcRenderer.invoke("apps:favorites")
  },
  window: {
    minimize: () => ipcRenderer.invoke("window:minimize"),
    maximize: () => ipcRenderer.invoke("window:maximize"),
    close: () => ipcRenderer.invoke("window:close")
  }
});
