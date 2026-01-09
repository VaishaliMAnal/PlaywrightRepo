// @ts-check
// Load .env so playwright config can read env overrides
require('dotenv').config();
const { devices, chromium }=require ('@playwright/test');
const { trace } = require('node:console');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir:'./tests',
  timeout:40*1000,//applicable to entire project
                  //default timeout settings:30
  expect:{    
  timeout:5000, // is for all assertion to override default timeout
         },
         reporter:'html',
  use:{
    baseURL: process.env.ADV_BASE_URL || 'https://advantageonlineshopping.com',
    browserName:'chromium',
    headless:false,
    trace:'retain-on-failure',
    screenshot:'only-on-failure',
    video:'on',
    launchOptions:{
      slowMo:1000
    }
  },

 
});
module.exports=config

