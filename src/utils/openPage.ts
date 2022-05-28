import { v4 as uuidv4 } from "uuid";

async function openPage(
  browserInstance: any,
  url: string,
  instancesArr: string[]
) {
  const id = uuidv4();
  let browser;
  let page: any;

  async function removeInstance() {
    instancesArr.splice(instancesArr.indexOf(id), 1);
    return await page.close();
  }

  try {
    instancesArr.push(id);
    browser = await browserInstance;
    page = await browser.newPage();
    console.info(`[PAGE CONTROLLER] Going to ${url}`);

    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    page.on("close", removeInstance);
  } catch (ex) {
    console.error(`[PAGE CONTROLLER] error`, { ex });
    removeInstance();
    return await page.close();
  }
}

export default openPage;
