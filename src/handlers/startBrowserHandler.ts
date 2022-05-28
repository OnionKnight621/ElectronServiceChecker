import { BrowserWindow } from "electron";
import { Browser } from "puppeteer-core";

import startBrowserCore from "../services/startBrowserCore";
import checkUriHandler from "./checkUriHandler";
import openPageHandler from "./openPageHandler";

export interface Account {
  email: string;
  login: string;
  uri: string;
  pass: string;
}

export interface IStartBrowserHandler {
  mainWindow?: BrowserWindow;
  chromePath: string;
  instances: string[];
  maxInstances: number;
  mainIntervalID: NodeJS.Timeout;
  accounts: Account[];
}

async function startBrowserHandler({
  mainWindow,
  chromePath,
  instances,
  maxInstances,
  mainIntervalID,
  accounts,
}: IStartBrowserHandler) {
  const browserInstance: Promise<Browser> = startBrowserCore(chromePath);

  let i: number = 0;

  mainIntervalID = setInterval(async () => {
    if (i < accounts.length && instances.length < maxInstances) {
      const status = await checkUriHandler(mainWindow, accounts[i]);

      if (status) {
        try {
          openPageHandler(
            browserInstance,
            `https://${accounts[i].uri}`,
            instances
          );
        } catch (ex) {
          console.error("Failed to load URI", ex);
          alert(`Failed to load URI`);

          throw ex;
        }
      }
      i++;
    }

    if (i > accounts.length) {
      clearInterval(mainIntervalID);
    }
  }, 500);
}

export default startBrowserHandler;
