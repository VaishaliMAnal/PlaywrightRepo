const { url } = require('node:inspector');
const loc = require('./locators/AdvantageLogin.locators');

class AdvantageLoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.username = page.locator(loc.username);
    this.password = page.locator(loc.password);
    this.signInBtn = page.locator(loc.signInBtn);
    this.userMenu = page.locator(loc.userMenu);
  }

  async gotoLogin(url) {
    // Prefer the explicit login URL that usually exposes the login form
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');

    // Try short wait first in case the form is already present
    try {
      await this.username.waitFor({ state: 'visible', timeout: 2000 });
      return;
    } catch (e) {
      // otherwise click the user menu to open the login modal
      await this.userMenu.click();
      await this.username.waitFor({ state: 'visible', timeout: 10000 });
    }
  }

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);

    // Wait for sign-in button to become enabled (form validation may enable it)
    try {
      await this.signInBtn.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForFunction((selector) => {
        const el = document.querySelector(selector);
        return el && !el.disabled;
      }, this.signInBtn.selector, { timeout: 5000 });
    } catch (e) {
      // If it doesn't become enabled, proceed to click anyway; test will assert login state afterwards
    }

    await this.signInBtn.click();
  }
}

module.exports = AdvantageLoginPage;