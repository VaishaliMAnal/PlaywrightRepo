const locators = require('./locators/Registration.locators');

class RegistrationPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.loc = locators;
    this.userName = page.locator(this.loc.USER_NAME_TEXTBOX);
    this.password = page.locator(this.loc.PASSWORD_TEXTBOX);
    this.email = page.locator(this.loc.EMAIL_TEXTBOX);
    this.passwordConfirm = page.locator(this.loc.PASSWORD_CONFIRM_TEXTBOX);
    this.firstName = page.locator(this.loc.FIRST_NAME_TEXTBOX);
    this.lastName = page.locator(this.loc.LAST_NAME_TEXTBOX);
    this.phone = page.locator(this.loc.PHONE_NUMBER_TEXTBOX);
    this.country = page.locator(this.loc.COUNTRY_DROPDOWN);
    this.city = page.locator(this.loc.CITY_TEXTBOX);
    this.address = page.locator(this.loc.ADDRESS_TEXTBOX);
    this.state = page.locator(this.loc.STATE_TEXTBOX);
    this.postalCode = page.locator(this.loc.POSTAL_CODE_TEXTBOX);
    this.promotion = page.locator(this.loc.PROMOTION_CHECKBOX);
    this.privacy = page.locator(this.loc.PRIVACY_POLICY_CHECKBOX);
    this.registerBtn = page.locator(this.loc.REGISTER_BUTTON);
  }

  async register(user) {
    await this.userName.fill(user.username);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.passwordConfirm.fill(user.password);
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.phone.fill(user.phone);
    await this.country.selectOption({ label: user.country });
    await this.city.fill(user.city);
    await this.address.fill(user.address);
    await this.state.fill(user.state);
    await this.postalCode.fill(user.postalCode);
    if (user.promotion) await this.promotion.check();
    await this.privacy.check();

    // Wait for register button to be visible and enabled before clicking
    await this.registerBtn.waitFor({ state: 'visible', timeout: 10000 });

    const enabled = await this.page.waitForFunction(
      (selector) => {
        const el = document.querySelector(selector);
        return !!el && !el.disabled;
      },
      this.loc.REGISTER_BUTTON,
      { timeout: 10000 }
    ).catch(() => null);

    if (!enabled) {
      const errors = await this.page.locator(this.loc.MANDATORY_FIELD_ERROR_MESSAGE).allTextContents();
      throw new Error('Register button did not become enabled. Validation errors: ' + JSON.stringify(errors));
    }

    await this.registerBtn.click();
  }
}

module.exports = RegistrationPage;
