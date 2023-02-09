const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("darkMode", {
// 	toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
// 	system: () => ipcRenderer.invoke("dark-mode:system"),
// });//

// contextBridge.exposeInMainWorld("electronAPI", {
// 	setTitle: (title) => ipcRenderer.send("set-title", title),
// });
// contextBridge.exposeInMainWorld("versions", {
// 	node: () => process.versions.node,
// 	chrome: () => process.versions.chrome,
// 	electron: () => process.versions.electron,
// });

// contextBridge.exposeInMainWorld("ofd", {
// 	openfiledialog: () => ipcRenderer.invoke("open_file_dialog"),
// });

// window.addEventListener("DOMContentLoaded", () => {
// 	const replaceText = (selector, text) => {
// 		const element = document.getElementById(selector);
// 		if (element) element.innerText = text;
// 	};

// 	for (const dependency of ["chrome", "node", "electron"]) {
// 		replaceText(
// 			`${dependency}-version`,
// 			process.versions[dependency]
// 		);
// 	}
// });
