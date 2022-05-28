import { BrowserWindow, dialog } from "electron";

import { API_GET_CHANNELS, EXTENSIONS } from "../constants";

function getChromePathHandler(mainWindow: BrowserWindow) {
  console.log(`[HANDLER] Get chrome path`);

  try {
    dialog
      .showOpenDialog(mainWindow, {
        properties: ["openFile"],
      })
      .then((result) => {
        console.log(result, "res");
        if (result.filePaths === undefined) {
          console.log("No file selected");
          return;
        }
        const filePath = result.filePaths[0];
        const extension = filePath.split(".")[filePath.split(".").length - 1];

        if (extension !== EXTENSIONS.EXE) {
          console.error("Choose an exe file");
          return;
        }

        mainWindow.webContents.send(API_GET_CHANNELS.GET_CHROME_PATH, filePath);
      })
      .catch((err) => {
        console.error(err, "err");
      });
  } catch (ex) {
    console.error("Smth went wrong", ex);
  }
}

export default getChromePathHandler;
