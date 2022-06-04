import { BrowserWindow, dialog } from "electron";

import { API_GET_CHANNELS, EXTENSIONS } from "../constants";

function getChromePathHandler(mainWindow: BrowserWindow): void {
  console.log(`[GET CHROME PATH HANDLER] Get chrome path`);

  dialog
    .showOpenDialog(mainWindow, {
      properties: ["openFile"],
    })
    .then((result) => {
      if (result.filePaths === undefined) {
        console.log("[GET CHROME PATH HANDLER] No file selected");
        return;
      }

      const filePath = result.filePaths[0];
      const extension = filePath.split(".")[filePath.split(".").length - 1];

      if (extension !== EXTENSIONS.EXE) {
        console.error("[GET CHROME PATH HANDLER] Choose an exe file");
        return;
      }

      mainWindow.webContents.send(API_GET_CHANNELS.GET_CHROME_PATH, filePath);
    })
    .catch((err) => {
      console.error("[GET CHROME PATH HANDLER] Smth went wrong", err);
    });
}

export default getChromePathHandler;
