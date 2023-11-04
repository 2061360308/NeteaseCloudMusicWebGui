import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import os from "os";
import { initialize, enable } from "@electron/remote/main"; // <-- 无边框窗口

// require("@electron/remote/main").initialize(); // <-- 无边框窗口

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    width: 1000,
    height: 800,
    useContentSize: true,
    frame: false, // <-- 无边框窗口
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  const win = BrowserWindow.getFocusedWindow();

  ipcMain.on("set-title", (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
  });

  ipcMain.on("window-min", function () {
  // 1. 收到渲染进程的窗口最小化操作的通知，并调用窗口最小化函数，执行该操作
    win.minimize();
  });
  // 2. 窗口 最大化、恢复
  ipcMain.on("window-toggleMax", function () {
    if (win.isMaximized()) {
      // 为true表示窗口已最大化
      win.restore(); // 将窗口恢复为之前的状态.
    } else {
      win.maximize();
    }
  });
  // 3. 窗口关闭
  ipcMain.on("window-close", function () {
    win.close();
  });

  // enable(mainWindow.webContents); // <-- 无边框窗口

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
