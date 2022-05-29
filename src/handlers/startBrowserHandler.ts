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
  browserInstance?: Promise<Browser> | null;
  chromePath: string;
  instances: string[];
  maxInstances: number;
  mainInterval?: any;
  accounts: Account[];
}

async function startBrowserHandler({
  mainWindow,
  browserInstance = null,
  chromePath,
  instances,
  maxInstances,
  mainInterval,
  accounts,
}: IStartBrowserHandler) {
  let browser = browserInstance;

  if (!browser) {
    browser = startBrowserCore(chromePath);
  }

  let i: number = 0;

  (await browser).on("disconnected", () => {
    clearInterval(mainInterval.id);
  });

  mainInterval.id = setInterval(async () => {
    if (i < accounts.length && instances.length < maxInstances) {
      const status = await checkUriHandler(mainWindow, accounts[i]);

      if (status) {
        try {
          openPageHandler(browser, `https://${accounts[i].uri}`, instances);
        } catch (ex) {
          console.error("Failed to load URI", ex);
          alert(`Failed to load URI`);

          throw ex;
        }
      }
      i++;
    }

    if (i > accounts.length) {
      clearInterval(mainInterval.id);
    }
  }, 500);
}

export default startBrowserHandler;
