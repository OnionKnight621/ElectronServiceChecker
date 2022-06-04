import { v4 as uuidv4 } from "uuid";
import { Page } from "puppeteer-core";

import { IpcMainHandler } from "../index";
import openPage from "../services/openPage";

export interface OpenPageHandler extends IpcMainHandler {
  url: string;
  instancesArr: string[];
}

async function openPageHandler({
  browserInstance,
  url,
  instancesArr,
}: OpenPageHandler) {
  async function removeInstance() {
    instancesArr.splice(instancesArr.indexOf(id), 1);

    console.log("[OPEN PAGE HANDLER] Closing page");
  }

  const id = uuidv4();
  let page: Page;

  instancesArr.push(id);

  try {
    page = await openPage(browserInstance, url);

    page.on("close", removeInstance);
  } catch (ex) {
    console.error(`[OPEN PAGE HANDLER] Error`, ex);

    removeInstance();

    page.close();

    throw ex;
  }
}

export default openPageHandler;
