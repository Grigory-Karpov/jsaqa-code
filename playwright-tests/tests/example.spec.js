const { test, expect } = require('@playwright/test');
const user = require('../user.js'); 

test('Успешная авторизация', async ({ page }) => {
  // 1. Открываем страницу
  await page.goto('https://netology.ru/?modal=sign_in');
  
  // 2. Вводим логин и пароль
  await page.getByPlaceholder('Email').fill(user.email);
  await page.getByPlaceholder('Пароль').fill(user.password);
  
  // 3. Жмем кнопку
  await page.getByTestId('login-submit-btn').click();
  
  // 4. Проверяем URL и заголовок
  await expect(page).toHaveURL('https://netology.ru/profile');
  await expect(page.locator('h2').first()).toHaveText('Моё обучение');
});