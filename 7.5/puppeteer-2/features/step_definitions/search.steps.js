const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

// Даем 60 секунд на выполнение шагов, чтобы интернет успел загрузить сайт
setDefaultTimeout(60000);

let browser, page;

Before(async function () {
  browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  page = await browser.newPage();
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});

Given("user is on cinema page", async function () {
  await page.goto("http://qamid.tmweb.ru/client/index.php", { timeout: 60000 });
});

When("user chooses tomorrow and movie time", async function () {
  await clickElement(page, "nav.page-nav > a:nth-child(2)");
  await clickElement(page, ".movie-seances__time");
  await page.waitForSelector(".buying-scheme");
});

When("user chooses a free seat", async function () {
  // Даем креслам 1 секунду на появление
  await new Promise(resolve => setTimeout(resolve, 1000));
  await clickElement(page, ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)");
});

When("user clicks Book button", async function () {
  await clickElement(page, ".acceptin-button");
});

Then("user sees the booking confirmation", async function () {
  const actual = await getText(page, ".ticket__check-title");
  expect(actual).to.contain("Вы выбрали билеты:");
});

Then("Book button is disabled", async function () {
  const isDisabled = await page.$eval('.acceptin-button', button => button.hasAttribute('disabled'));
  expect(isDisabled).to.be.true;
});