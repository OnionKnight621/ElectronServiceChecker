import puppeteer, { Browser } from "puppeteer-core";

import { browserOptions } from "../config";

async function startBrowserCore(
  browserExecutablepath: string
): Promise<Browser> {
  try {
    console.info("[BROWSER] Opening the browser...");

    const browser: Browser = await puppeteer.launch({
      ...browserOptions,
      executablePath: browserExecutablepath,
    });

    return browser;
  } catch (ex) {
    console.error(`[BROWSER] error`, { ex });

    throw ex;
  }
}

export default startBrowserCore;
