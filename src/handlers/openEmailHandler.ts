import { BrowserWindow } from "electron";

async function openEmailhandler(
  mainWindow: BrowserWindow,
  { email, password }: any
) {
  console.log(email, password);
}

export default openEmailhandler;
