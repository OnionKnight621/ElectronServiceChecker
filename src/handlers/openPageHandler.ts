import { v4 as uuidv4 } from "uuid";

import openPage from "../services/openPage";

async function openPageHandler(
  browserInstance: any,
  url: string,
  instancesArr: string[]
) {
  async function removeInstance() {
    instancesArr.splice(instancesArr.indexOf(id), 1);

    console.log('[OPEN PAGE HANDLER] Closing page');
  }

  const id = uuidv4();
  let page: any;

  instancesArr.push(id);

  try {
    page = await openPage(browserInstance, url);

    page.on("close", removeInstance);
  } catch (ex) {
    console.error(`[OPEN PAGE HANDLER] Error`, ex);
    
    removeInstance();

    page.close()

    throw ex;
  }
}

export default openPageHandler;
