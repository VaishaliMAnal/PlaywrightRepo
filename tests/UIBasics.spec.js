const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');


test('First playwright test - login (refactored)', async ({ page }) => {
  const login = new LoginPage(page);

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await login.login('rahulshettyacademy', 'learning');

  // wait for navigation/panels to appear
  await page.locator('.card-title a').first().waitFor();
  const titles = await page.locator('.card-title a').allTextContents();
  console.log(titles);
  expect(titles.length).toBeGreaterThan(0);
});



test('UI controls test (refactored)', async ({ page }) => {
  const login = new LoginPage(page);

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await login.userName.fill('rahulshettyacademy');
  await login.password.fill('learning');
  await login.signIn.click();

  const dropDown = page.locator('select.form-control');
  await dropDown.selectOption('consult');

  const radio = page.locator('.radiotextsty').last();
  await radio.waitFor({ state: 'visible', timeout: 5000 });
  await radio.click();

  // If the confirmation modal appears, try to click OK (best-effort)
  const okBtn = page.locator('#okayBtn');
  try {
    await okBtn.waitFor({ state: 'visible', timeout: 2000 });
    await okBtn.click();
  } catch (e) {
    // ignore if the modal does not appear
  }

  await expect(radio).toBeChecked();

  const terms = page.locator('#terms');
  await terms.check();
  await expect(terms).toBeChecked();
  await terms.uncheck();
  expect(await terms.isChecked()).toBeFalsy();

});
test.only('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 });
 
