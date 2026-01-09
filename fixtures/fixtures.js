// Load .env for local development (do not commit .env)
require('dotenv').config();

const base = require('@playwright/test');
const { test: baseTest, expect } = base;

const test = baseTest.extend({
  // dynamically generated user object for registration
  user: async ({}, use) => {
    const id = Date.now().toString().slice(-4); // keep id short to meet field length limits
    const user = {
      username: `user${id}`,
      email: `user${id}@example.com`,
      password: `Pass${id}`,
      firstName: 'Test',
      lastName: 'User',
      phone: '5551234567',
      country: 'United States',
      city: 'TestCity',
      address: '123 Test St',
      state: 'TestState',
      postalCode: '12345',
      promotion: false,
    };
    await use(user);
  },


  // contact form data for the Contact Us test
  contactData: async ({}, use) => {
    const id = Date.now();
    const data = {
      email: `contact${id}@test.com`,
      subject: `Automated subject ${id}`,
      category: 'Headphones',
      product: 'Beats Studio 2 Over-Ear Matte Black Headphones',
    };
    await use(data);
  },

  // Advantage site credentials (loaded from credentials/advCredentials.js). If not set, tests will skip.
  advCredentials: async ({}, use) => {
    const advCreds = require('../credentials/advCredentials');
    const username = advCreds.username;
    const password = advCreds.password;
    if (!username || !password) {
      await use(null);
      return;
    }
    await use({ username, password });
  },
});

module.exports = { test, expect };
