let page;

describe("Github team page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team", { timeout: 60000 });
  });

  afterEach(() => {
    page.close();
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1', { timeout: 60000 });
    const title2 = await page.title();
    expect(title2).toContain("GitHub");
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
      timeout: 60000
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 60000);
});

describe("Github other pages tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(() => {
    page.close();
  });

  test("Check GitHub Enterprise page title", async () => {
    await page.goto("https://github.com/enterprise", { timeout: 60000 });
    const title = await page.title();
    expect(title).toContain("Enterprise");
  }, 60000);

  test("Check GitHub Features page title", async () => {
    await page.goto("https://github.com/features", { timeout: 60000 });
    const title = await page.title();
    expect(title).toContain("Features");
  }, 60000);

  test("Check GitHub Pricing page title", async () => {
    await page.goto("https://github.com/pricing", { timeout: 60000 });
    const title = await page.title();
    expect(title).toContain("Pricing");
  }, 60000);
});