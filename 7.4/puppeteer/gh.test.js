let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github team page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team", { timeout: 100000 });
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await new Promise(resolve => setTimeout(resolve, 3000));
    const title2 = await page.title();
    expect(title2).toContain("GitHub");
  }, 100000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 100000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { visible: true, timeout: 100000 });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 100000);
});

describe("Github other pages tests", () => {
  test("Check GitHub Enterprise page title", async () => {
    await page.goto("https://github.com/enterprise", { timeout: 100000 });
    const title = await page.title();
    expect(title).toContain("Enterprise");
  }, 100000);

  test("Check GitHub Features page title", async () => {
    await page.goto("https://github.com/features", { timeout: 100000 });
    const title = await page.title();
    expect(title).toContain("Features");
  }, 100000);

  test("Check GitHub Pricing page title", async () => {
    await page.goto("https://github.com/pricing", { timeout: 100000 });
    const title = await page.title();
    expect(title).toContain("Pricing");
  }, 100000);
});
