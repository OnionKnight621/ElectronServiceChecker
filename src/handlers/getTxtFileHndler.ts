import { BrowserWindow, dialog } from "electron";
import * as fs from "fs";

import { API_GET_CHANNELS, EXTENSIONS } from "../constants";

function getTxtFileHandler(mainWindow: BrowserWindow) {
  console.log(`[HANDLER] Get txt file`);

  try {
    dialog
      .showOpenDialog(mainWindow, {
        properties: ["openFile"],
      })
      .then((result) => {
        if (result.filePaths === undefined) {
          console.log("No file selected");
          return;
        }
        const filePath = result.filePaths[0];
        const extension = filePath.split(".")[filePath.split(".").length - 1];

        if (extension !== EXTENSIONS.TXT) {
          console.error("Choose an txt file");
          return;
        }

        fs.readFile(filePath, "utf-8", (err, data) => {
          if (err) {
            console.error("An error ocurred reading the file :" + err.message);
            return;
          }

          mainWindow.webContents.send(API_GET_CHANNELS.GET_TXT_FILE, data);
        });
      })
      .catch((err) => {
        console.error("[Read TXT] Err", err);
      });
  } catch (ex) {
    console.error("[Read TXT] Err", ex);

    throw ex;
  }
}

export default getTxtFileHandler;
