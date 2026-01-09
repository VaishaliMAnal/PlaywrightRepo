const { test, expect } = require('../fixtures/fixtures');
const RegistrationPage = require('../pages/RegistrationPage');

test('Register new user', async ({ page, user }) => {
  const reg = new RegistrationPage(page);

  await page.goto('https://advantageonlineshopping.com/#/register');

  // Ensure the username textbox is visible before interacting
  await page.locator(reg.loc.USER_NAME_TEXTBOX).waitFor({ state: 'visible' });

  // Use the page object to perform registration using the `user` fixture
  await reg.register(user);

  // Basic post-submit checks: ensure register button exists and no mandatory field errors
  await expect(reg.registerBtn).toBeVisible();
  await expect(page.locator(reg.loc.MANDATORY_FIELD_ERROR_MESSAGE)).toHaveCount(0);
});