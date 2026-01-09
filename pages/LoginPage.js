const locators = require('./locators/Login.locators');

class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.loc = locators;
    this.loginLink = page.locator(this.loc.LOGIN_LINK);
    this.userName = page.locator(this.loc.USERNAME_TEXTBOX);
    this.password = page.locator(this.loc.PASSWORD_TEXTBOX);
    this.signIn = page.locator(this.loc.LOGIN_BUTTON);
    this.rememberMe = page.locator(this.loc.REMEMBER_ME_CHECKBOX);
    this.createAccount = page.locator(this.loc.CREATE_NEW_ACCOUNT_LINK);
  }

  async goto() {
    await this.page.goto('/#/login');
  }

  async login(username, pwd) {
    await this.userName.fill(username);
    await this.password.fill(pwd);
    await this.signIn.click();
  }
}

module.exports = LoginPage;