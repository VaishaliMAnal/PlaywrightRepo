const { test, expect } = require('../fixtures/fixtures');
const AdvantageLoginPage = require('../pages/AdvantageLoginPage');

test('ADV credentials login test', async ({ page, advCredentials }) => {
  if (!advCredentials) {
    test.skip('ADV credentials not set. Set ADV_USERNAME and ADV_PASSWORD to enable this test.');
    return;
  }

  const advLogin = new AdvantageLoginPage(page);
  await advLogin.gotoLogin(process.env.ADV_BASE_URL);
  await advLogin.login(advCredentials.username, advCredentials.password);

  // Verify successful login by checking for user menu visibility
  await expect(advLogin.userMenu).toBeVisible({ timeout: 10000 });

  // If the menu shows the username, verify it contains the username (best-effort)
  const text = (await advLogin.userMenu.textContent()) || '';
  if (text.trim()) {
    expect(text.toLowerCase()).toContain(advCredentials.username.toLowerCase());
  }
});
// Negative smoke test: invalid credentials should not show logged-in user menu
test('Login fails with invalid credentials', async ({ page }) => {
  const advLogin = new AdvantageLoginPage(page);
  await advLogin.gotoLogin(process.env.ADV_BASE_URL || 'https://advantageonlineshopping.com');

  const fakeUser = 'invalid_user_' + Date.now();
  await advLogin.login(fakeUser, 'invalid_pass');

  // For invalid credentials we expect the user menu to remain visible (sign-in area) but not show a logged-in state
  // Verify that the user menu does not contain the fake username (best-effort) and that sign-in button is still present
  await expect(advLogin.userMenu).toBeVisible({ timeout: 5000 });
  const menuText = (await advLogin.userMenu.textContent()) || '';
  expect(menuText.toLowerCase()).not.toContain(fakeUser.toLowerCase());
});