const assert = require('assert');
const { By } = require('selenium-webdriver');
const { Builder } = require('selenium-webdriver'); // import thu vien
const until = require('selenium-webdriver/lib/until')

const  sleep = (ms) => new Promise(r  => setTimeout(r, ms))
describe('Login testcase', function() {
    let driver;
    const URL = 'https://constructtwin-stg:uQVkRXUhs9YP5aFS@dev.constructtwin.com/en';

    // truoc khi testcase khoi chay
    before(async() => {
      // khoi tao driver
      driver = await new Builder().forBrowser('chrome').build();
      driver.manage().window().maximize();
    });
    // sau moi testcase khoi chay
    after(async() => {
      await driver.quit();// tat chuong trinh
    });

    it('Login failed with company error', async function() {
      await driver.get(URL);
      const loginBtn = driver.wait(until.elementLocated(By.css('.login-pc>div>button.login-btn')), 10000);
      loginBtn.click();
      await sleep(1000);
      const title = await driver.getTitle();
      assert.equal('Login', title);
    });
})