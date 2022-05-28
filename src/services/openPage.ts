async function openPage(browserInstance: any, url: string) {
  try {
    const browser = await browserInstance;
    const page = await browser.newPage();

    console.info(`[PAGE CONTROLLER] Going to ${url}`);

    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    return await page;
  } catch (ex) {
    console.error(`[PAGE CONTROLLER] error`, { ex });

    throw ex;
  }
}

export default openPage;
