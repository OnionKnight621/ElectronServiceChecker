import sleep from "../services/residentSleeper";
import { primaryMailClient } from "../config";
import openPage from "../services/openPage";
import { IpcMainHandler } from "../index";

interface OpenEmailhandler extends IpcMainHandler {
  email: string;
  password: string;
}

async function openEmailhandler({
  browserInstance,
  email,
  password,
}: OpenEmailhandler) {
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
