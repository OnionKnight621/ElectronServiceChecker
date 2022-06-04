import { IpcMainHandler } from "../index";
import startBrowserCore from "../services/startBrowserCore";
import checkUriHandler from "./checkUriHandler";
import openPageHandler from "./openPageHandler";

export interface Account {
  email: string;
  login: string;
  uri: string;
  pass: string;
}

export interface StartBrowserProps {
  chromePath: string;
  instances: string[];
  maxInstances: number;
  accounts: Account[];
  mainInterval?: {
    id: NodeJS.Timer | null;
  };
}

export interface StartBrowserHandler extends IpcMainHandler {
  startBrowserProps: StartBrowserProps;
}

async function startBrowserHandler({
  mainWindow,
  browserInstance,
  startBrowserProps,
}: StartBrowserHandler) {
  const { chromePath, instances, maxInstances, mainInterval, accounts } =
    startBrowserProps;

  let browser = browserInstance;
  let i: number = 0;
  if (!browser) {
    browser = await startBrowserCore(chromePath);
  }

  browser.on("disconnected", () => {
    clearInterval(mainInterval.id);
  });

  mainInterval.id = setInterval(async () => {
    if (i < accounts.length && instances.length < maxInstances) {
      const status = await checkUriHandler(mainWindow, accounts[i]);

      if (status) {
        try {
          openPageHandler({
            browserInstance: browser,
            url: `https://${accounts[i].uri}`,
            instancesArr: instances,
          });
        } catch (ex) {
          console.error("[START BROWSER HANDLER] Failed to load URI", ex);
          alert(`[START BROWSER HANDLER] Failed to load URI`);

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
