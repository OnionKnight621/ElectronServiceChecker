import { BrowserWindow } from "electron";

import sleep from "../services/residentSleeper";
import { primaryMailClient } from "../config";

import openPage from "../services/openPage";

async function openEmailhandler(
  mainWindow: BrowserWindow,
  { email, password, browserInstance }: any
) {
  try {
    const { confirmSelector, mailSelector, passwordSelector, uri } =
      primaryMailClient;
    const page = await openPage(browserInstance, uri);

    console.log(email, password);

    sleep(1500); // for proton for some reason selector appears earlier than element can be used
    await page.waitForSelector(mailSelector);
    await page.type(mailSelector, email, {
      delay: 5,
    });
    await page.type(passwordSelector, password, {
      delay: 5,
    });
  } catch (ex) {
    throw ex;
  }
}

export default openEmailhandler;
