/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.css";

import { defaulthChromePass } from "./config";
import { API_CHANNELS } from "./constants";
import { Browser } from "puppeteer-core";

declare const api: {
  send: Function;
  receive: Function;
};

const loadBtn = document.getElementById("loadBtn") as HTMLButtonElement;
const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const setChromePathBtn = document.getElementById(
  "setChromePassBtn"
) as HTMLButtonElement;
const servicesLog = document.getElementById("servicesLog");
const windowsNum = document.getElementById("windowsNum") as HTMLInputElement;
const loadedSpan = document.getElementById("loadedSpan") as HTMLSpanElement;
const chromePathEl = document.getElementById("chromePass") as HTMLSpanElement;

let chromePath: string = defaulthChromePass;
let file: string;

chromePathEl.innerHTML = chromePath;

setChromePathBtn.addEventListener("click", async function () {
  api.send(API_CHANNELS.TRIGGER_GET_CHROME_PATH);

  api.receive(API_CHANNELS.GET_CHROME_PATH, (data: string) => {
    chromePath = data;
    chromePathEl.innerHTML = data;
  });
});

loadBtn.addEventListener("click", async function () {
  api.send(API_CHANNELS.TRIGGER_GET_TXT_FILE);

  api.receive(API_CHANNELS.GET_TXT_FILE, (data: string) => {
    file = data;
    loadedSpan.innerHTML = "loaded";
    startBtn.disabled = false;
  });
});

export interface Account {
  email: string;
  login: string;
  uri: string;
  pass: string;
}

let mainIntervalID: NodeJS.Timeout;

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;

  let lines: string[];
  let accounts: Account[] = [];

  try {
    lines = file.toString().split("\n");
    accounts = lines.map((line) => {
      const components: string[] = line.split(/[@:]/);
      const account: Account = {
        email: `${components[0]}@${components[1]}`,
        login: components[0],
        uri: components[1],
        pass: components[2].substring(0, components[2].length - 2),
      };
      return account;
    });
  } catch (ex) {
    console.error("Failed to parse Text file", ex);
    startBtn.disabled = false;
    alert(`Failed to parse txt file ${JSON.stringify(ex)}`);
  }

  const instances: string[] = [];
  const maxInstances: number = Math.abs(Number(windowsNum.value)) || 5;

  api.send(API_CHANNELS.TRIGGER_START_BROWSER, {
    chromePath,
    instances,
    maxInstances,
    mainIntervalID,
    accounts,
  });

  api.receive(API_CHANNELS.GET_URI_STATUS, (data: any) => {
    servicesLog.innerHTML += `
      <li> ${data.uri} - <span style="color: ${
      data.status ? "green" : "red"
    }">${data.status}</span></li>
    `;
  });
});
