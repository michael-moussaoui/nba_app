const { app, BrowserWindow, ipcMain } = require("electron");

const electronReload = require("electron-reload");

const path = require("path");
const url = require("url");
if (require("electron-squirrel-startup")) return;
require("update-electron-app")();

electronReload(__dirname, {});

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "./preload.js"),
			nodeIntegration: true,
			contextIsolation: false,
			nodeIntegrationInWorker: true,
			enableRemoteModule: true,
		},
		icon: path.join(__dirname, "renderer/images/logo_nba.ico"),
	});

	win.loadFile(path.join(__dirname, "./index.html"));
};

// app.disableHardwareAcceleration();

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
