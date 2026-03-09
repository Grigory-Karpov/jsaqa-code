const { clickElement, getText } = require("./lib/commands.js");
const puppeteer = require("puppeteer");

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });
  page = await browser.newPage();
  // Даем 100 секунд на загрузку сайта кинотеатра
  await page.goto("http://qamid.tmweb.ru/client/index.php", { timeout: 100000 });
});

afterEach(async () => {
  await browser.close();
});

describe("Ticket booking tests", () => {
  
  test("Happy path 1: Успешное бронирование 1 билета", async () => {
    // Выбираем второй день
    await clickElement(page, "a.page-nav__day:nth-of-type(2)");
    // Выбираем первый сеанс
    await clickElement(page, "a.movie-seances__time");
    // Ждем схему зала (даем ей 100 секунд на появление)
    await page.waitForSelector(".buying-scheme", { timeout: 100000 });
    
    // Даем странице 1 секунду на отрисовку кресел, чтобы робот не промазал
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Кликаем на свободное кресло
    await clickElement(page, ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)");
    // Нажимаем Забронировать
    await clickElement(page, ".acceptin-button");
    
    // Проверяем результат
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
  }, 100000); // <-- Индивидуальный таймаут 100 секунд

  test("Happy path 2: Успешное бронирование 2 билетов", async () => {
    await clickElement(page, "a.page-nav__day:nth-of-type(2)");
    await clickElement(page, "a.movie-seances__time");
    await page.waitForSelector(".buying-scheme", { timeout: 100000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Выбираем 2 свободных места
    const freeSeats = await page.$$(".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)");
    await freeSeats[0].click();
    await freeSeats[1].click();
    
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
  }, 100000);

  test("Sad path: Попытка забронировать без выбора места (кнопка заблокирована)", async () => {
    await clickElement(page, "a.page-nav__day:nth-of-type(2)");
    await clickElement(page, "a.movie-seances__time");
    await page.waitForSelector(".buying-scheme", { timeout: 100000 });
    
    // Проверяем, что кнопка неактивна
    const isDisabled = await page.$eval('.acceptin-button', button => button.hasAttribute('disabled'));
    expect(isDisabled).toBe(true);
  }, 100000);

});