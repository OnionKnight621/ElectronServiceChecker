import puppeteer from "puppeteer-core";

import { browserOptions } from "../config";

async function startBrowserCore(browserExecutablepath: string) {
  let browser;
  try {
    console.info("[BROWSER] Opening the browser...");
    browser = await puppeteer.launch({
      ...browserOptions,
      executablePath: browserExecutablepath,
    });
  } catch (ex) {
    console.error(`[BROWSER] error`, { ex });
    throw ex;
  }
  return browser;
}

export default startBrowserCore;
