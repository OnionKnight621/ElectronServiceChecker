import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  send: (channel: string, data: any) => {
    console.log(`[API] Send ${channel}`);
    ipcRenderer.send(channel, data);
  },
  receive: (channel: string, func: any) => {
    console.log(`[API] Receive ${channel}`);
    ipcRenderer.on(channel, (e, ...args) => func(...args));
  },
});

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
