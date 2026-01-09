const BasePage = require('./BasePage');
const locators = require('./locators/ContactUS.locators');

class ContactUSPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.loc = locators;
    this.contactUStab = page.locator(this.loc.contactUStab);
    this.drpdwnContactUS = page.locator(this.loc.drpdwnContactUS);
    this.drpdwnSelectProduct = page.locator(this.loc.drpdwnSelectProduct);
    this.emailField = page.locator(this.loc.emailField);
    this.subjectField = page.locator(this.loc.subjectField);
    this.sendBtn = page.locator(this.loc.sendBtn);
    this.successMessage = page.locator(this.loc.successMessage);
  }

  async openContactUs() {
    // there are two elements matched; choose the second one as in the original test
    await this.contactUStab.nth(1).click();
    await this.waitForNetworkIdle();
  }

  async selectCategory(category) {
    await this.drpdwnContactUS.selectOption({ label: category });
  }

  async selectProduct(productLabel) {
    await this.drpdwnSelectProduct.selectOption({ label: productLabel });
  }

  async fillEmail(email) {
    await this.emailField.fill(email);
  }

  async fillSubject(text) {
    await this.subjectField.fill(text);
  }

  async clickSend() {
    await this.sendBtn.click();
  }

  async waitForSuccess() {
    await this.successMessage.waitFor({ state: 'visible' });
  }
}

module.exports = ContactUSPage;
