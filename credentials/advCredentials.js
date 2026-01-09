// ADV credentials helper: centralizes credential access so they're not embedded in fixtures
// Loads from environment; keep sensitive values in .env (DO NOT COMMIT)
require('dotenv').config();

module.exports = {
  username: process.env.ADV_USERNAME || null,
  password: process.env.ADV_PASSWORD || null,
  baseUrl: process.env.ADV_BASE_URL || 'https://advantageonlineshopping.com',
};
