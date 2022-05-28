import { BrowserWindow } from "electron";

import { API_CHANNELS } from "../constants";
import checkURI from "../utils/checkUri";

async function checkUri(mainWindow: BrowserWindow, uri: string) {
  const status = await checkURI(uri);

  mainWindow.webContents.send(API_CHANNELS.GET_URI_STATUS, { status, uri });

  return status;
}

export default checkUri;
