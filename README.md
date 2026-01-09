# Playwright Automation

Quick start:

- Install dependencies: `npm install`
- Prepare Playwright browsers: `npm run prepare`
- Run tests: `npm test` (runs `npx playwright test`)
- View report: `npm run report` (runs `npx playwright show-report`)

Project structure:

- `pages/` - page objects and locators
- `tests/` - Playwright test files and fixtures

Notes:
- `playwright.config.js` sets `baseURL`, so tests can use `page.goto('/path')`.
- Fixtures are provided in `tests/fixtures.js` and include `user` (for dynamic registration), `contactData` (for Contact Us tests), and `advCredentials` (reads `ADV_USERNAME` and `ADV_PASSWORD` from env). Import fixtures in tests with:

  const { test, expect } = require('./fixtures');

  and then consume the fixture in the test signature, e.g. `async ({ page, user })` or `async ({ page, contactData })`.

- To run the Advantage login test that uses real credentials, set environment variables (Windows PowerShell example):

  $env:ADV_USERNAME = "yourUsername"; $env:ADV_PASSWORD = "yourPassword"; npm test -- -g "ADV credentials"

  Or copy `.env.example` to `.env` and update values locally (this repo loads `.env` automatically in test fixtures). Example:

  Copy `.env.example` to `.env` and edit the values:

    ADV_BASE_URL=https://advantageonlineshopping.com
    ADV_USERNAME=yourUsername
    ADV_PASSWORD=yourPassword

  The test will use `ADV_BASE_URL` if present and will be skipped if credentials are not provided.
