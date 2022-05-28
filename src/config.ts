export const browserOptions = {
  headless: false,
  devtools: false,
  ignoreHTTPSErrors: true,
  defaultViewport: {
    width: 1024,
    height: 1024,
  },
};

export const defaulthChromePass = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

export const primaryMailClient = {
  uri: "https://account.proton.me/login",
  mailSelector: "#username",
  passwordSelector: "#password",
  confirmSelector: ""
};
