import { BrowserWindow } from "electron";
import { Browser } from "puppeteer-core";

import { Account } from "../renderer";

import { API_CHANNELS } from "../constants";
import checkURI from "../utils/checkUri";
import openPage from "../utils/openPage";
import startBrowserCore from "../utils/startBrowserCore";
import checkUri from "./checkUri";

async function startBrowser(
  mainWindow: BrowserWindow,
  chromePath: string,
  instances: string[],
  maxInstances: number,
  mainIntervalID: NodeJS.Timeout,
  accounts: Account[]
) {
  const browserInstance: Promise<Browser> = startBrowserCore(chromePath);

  let i: number = 0;

  mainIntervalID = setInterval(async () => {
    if (i < accounts.length && instances.length < maxInstances) {
      const status = await checkUri(mainWindow, accounts[i].uri);

      if (status) {
        try {
          openPage(browserInstance, `https://${accounts[i].uri}`, instances);
        } catch (ex) {
          console.error("Failed to load URI", ex);
          alert(`Failed to load URI`);
        }
      }
      i++;
    }
    if (i > accounts.length) {
      clearInterval(mainIntervalID);
    }
  }, 500);
}

export default startBrowser;
