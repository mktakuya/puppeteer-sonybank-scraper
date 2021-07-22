const puppeteer = require("puppeteer");

const loginUrl = "https://o2o.moneykit.net/";
const branchNumber = process.env.BANK_BRANCH_NUMBER;
const accountNumber = process.env.BANK_ACCOUNT_NUMBER;
const password = process.env.BANK_PASSWORD;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(loginUrl);

  await page.type('input[name="TenNo"]', branchNumber);
  await page.type('input[name="KozaNo"]', accountNumber);
  await page.type('input[name="Password"]', password);

  await Promise.all([
    page.click("a.btn.btn-yellow.btn-min140"),
    page.waitForNavigation(),
  ]);

  await page.waitForNavigation({ waitUntil: "networkidle0" });

  const amountElement = await page.$("#setEnYkinZandaka");
  const amountText = await (
    await amountElement.getProperty("textContent")
  ).jsonValue();
  const amountValue = parseInt(amountText.replace(/,/g, ""));
  console.log(amountValue);

  await browser.close();
})();
