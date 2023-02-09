const {
	app,
	BrowserWindow,
	ipcMain,
	dialog,
	nativeTheme,
} = require("electron");
const electronReload = require("electron-reload");

const path = require("path");
const url = require("url");
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
	});

	win.loadFile(path.join(__dirname, "./index.html"));
};

app.disableHardwareAcceleration();

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

// const { app, BrowserWindow, Menu } = require("electron");
// const axios = require("axios");

// // Create the window for the application
// let win;

// function createWindow() {
// 	win = new BrowserWindow({
// 		width: 800,
// 		height: 600,
// 		webPreferences: {
// 			nodeIntegration: true,
// 		},
// 	});

// 	// Load the HTML file that contains the form for searching a player
// 	win.loadFile("search-form.html");

// 	// Build the menu for the application
// 	const menu = Menu.buildFromTemplate([
// 		{
// 			label: "File",
// 			submenu: [{ label: "Quit", role: "quit" }],
// 		},
// 	]);
// 	Menu.setApplicationMenu(menu);

// 	win.on("closed", () => {
// 		win = null;
// 	});
// }

// app.on("ready", createWindow);

// app.on("window-all-closed", () => {
// 	if (process.platform !== "darwin") {
// 		app.quit();
// 	}
// });

// app.on("activate", () => {
// 	if (win === null) {
// 		createWindow();
// 	}
// });

// // Function to handle the form submit event and make a request to the API
// async function searchPlayer(event) {
// 	event.preventDefault();

// 	const playerName = event.target.elements.playerName.value;

// 	try {
// 		const response = await axios.get(
// 			`https://www.balldontlie.io/api/v1/players?search=${playerName}`
// 		);
// 		console.log(response.data);
// 	} catch (error) {
// 		console.error(error);
// 	}
// }
