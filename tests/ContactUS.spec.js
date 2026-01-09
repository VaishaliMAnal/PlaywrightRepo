const { test, expect } = require('../fixtures/fixtures');
const ContactUSPage = require('../pages/ContactUSPage');

// Uses contactData fixture for dynamic contact values
test('Contact Us form sends message', async ({ page, contactData }) => {
  const contact = new ContactUSPage(page);

  await page.goto('/#/login?returnUrl=%2F');
  await contact.openContactUs();

  await contact.selectCategory(contactData.category);
  await contact.selectProduct(contactData.product);
  await contact.fillEmail(contactData.email);
  await contact.fillSubject(contactData.subject);
  await contact.clickSend();

  await contact.waitForSuccess();
  await expect(contact.successMessage).toBeVisible();

  const text = await contact.successMessage.textContent();
  expect(text && text.trim().length).toBeGreaterThan(0);
});