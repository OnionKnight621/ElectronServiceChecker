import { BrowserWindow } from "electron";

import { API_GET_CHANNELS } from "../constants";
import checkURI from "../services/checkUri";
import { Account } from "./startBrowserHandler";

async function checkUriHandler(
  mainWindow: BrowserWindow,
  account: Account
): Promise<boolean> {
  try {
    const status = await checkURI(account.uri);

    mainWindow.webContents.send(API_GET_CHANNELS.GET_URI_STATUS, {
      ...account,
      status,
    });

    return status;
  } catch (ex) {
    console.error("[CHECK URI HANDLER] Error", ex);

    throw ex;
  }
}

export default checkUriHandler;
