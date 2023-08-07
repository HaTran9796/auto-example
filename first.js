const { By, Builder, Browser } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome')
const assert = require("chai").assert;
require('dotenv').config()
const until = require('selenium-webdriver/lib/until')
const LoginPage = require('./elements/login');
const HomePage = require('./elements/home');
const {
  passedUser,
  failedUser,
  passwordInvalid,
  inactiveCompany,
  inactiveUser,
  emailInvalid,
} = require('./data/login');
const { errorMessages, normalMessages } = require('./messages/login');
const fs = require('fs');
const addContext = require('mochawesome/addContext');

const sleep = ms => new Promise(r => setTimeout(r, ms));
describe("Login page", function () {
  let driver;
  const envArgv = process.argv[4];
  const env = envArgv.replace('--env=', '');
  const url = process.env.WEB_URL.replace('{env}', env);
  before(async function() {
    const options = new Options()
    options.addArguments('--ignore-certificate-errors')
    options.addArguments('--disable-popup-blocking')
    driver = await new Builder()
      .setChromeOptions(options)
      .forBrowser(Browser.CHROME)
      .build();
    driver.manage().window().maximize();
  })
  after(async function() {
    await driver.quit()
  })

  afterEach(async function () {
    if (this.currentTest.state === 'failed') {
      const imageName = this.currentTest.uuid + '_' + this.currentTest.uuid + '.jpg';
      const image = await driver.takeScreenshot();
      await fs.writeFileSync('./screenshots/' + imageName, image, 'base64');
      addContext(this, 'Screenshot testcase');
      addContext(this, `/screenshots/${imageName}`);
    }
  });
  it("Login with faild user / password with email invalid", async function () {
    await testcaseLogin(
      driver,
      url,
      emailInvalid
    );
    const message = await checkErrorMessage(driver, LoginPage.emailError);
    assert.equal(errorMessages[env].emailInvalid, message);
  })

  it("Login with faild user / password with company inactive", async function () {
    await testcaseLogin(driver, url, inactiveCompany);
    const message = await checkErrorMessage(driver, LoginPage.loginError);
    assert.equal(errorMessages[env].accountInactive, message);
  })

  it("Login with faild user / password with user inactive", async function () {
    await testcaseLogin(driver, url, inactiveUser);
    const message = await checkErrorMessage(driver, LoginPage.loginError);
    assert.equal(errorMessages[env].accountInactive, message);
  })

  it("Login with faild user / password with company required", async function () {
    await testcaseLogin(driver, url, failedUser);
    const message = await checkErrorMessage(driver, LoginPage.companyError);
    assert.equal(errorMessages[env].organizationRequired, message);
  })

  it("Login with faild user / password with email required", async function () {
    await testcaseLogin(driver, url, failedUser);
    const message = await checkErrorMessage(driver, LoginPage.emailError);
    assert.equal(errorMessages[env].emailRequired, message);
  })

  it("Login with faild user / password with pasword required", async function () {
    await testcaseLogin(driver, url, failedUser);
    const message = await checkErrorMessage(driver, LoginPage.passwordError);
    assert.equal(errorMessages[env].passwordRequired, message);
  })

  it("Login with faild user / password with pasword invalid", async function () {
    await testcaseLogin(driver, url, passwordInvalid);
    const message = await checkErrorMessage(driver, LoginPage.passwordError);
    assert.equal(errorMessages[env].passwordInvalid, message);
  })

  // it("Login with faild user / password with 3 field required", async function () {
  //   await testcaseLogin(
  //     driver,
  //     url,
  //     failedUser,
  //     {
  //       type: 'error',
  //       selector: [LoginPage.companyError, LoginPage.emailError, LoginPage.passwordError],
  //       message: [errorMessages[env].organizationRequired, errorMessages[env].emailRequired, errorMessages[env].passwordRequired]
  //     }
  //   )
  // })

  // it("Login with pass user / password", async function () {
  //   await testcaseLogin(driver, url, passedUser, { type: 'title', message: normalMessages[env].organizationList })
  // })
})

const checkTitle = async(driver, appTitle) => {
  const title = await driver.getTitle();
  assert.equal(appTitle, title);
}

const checkErrorMessage = async(driver, selector) => {
  let message = await driver.wait(until.elementLocated(selector), 10000);
  const messTxt = await message.getText()
  return messTxt;
}

async function login(driver, user) {
  await sleep(1000)
  let company = await driver.wait(until.elementLocated(LoginPage.company), 10000);
  company.sendKeys(user.company);
  let username = await driver.wait(until.elementLocated(LoginPage.email), 10000);
  username.sendKeys(user.username);
  let password = await driver.wait(until.elementLocated(LoginPage.password), 10000);
  password.sendKeys(user.password);
  let loginBtn = await driver.wait(until.elementLocated(LoginPage.loginBtn), 10000);
  loginBtn.click();
}

const testcaseLogin = async(
  driver,
  url,
  user
) => {
  await driver.get(url);
  let button = await driver.wait(until.elementLocated(HomePage.pcLoginBtn), 10000);
  button.click()
  await login(driver, user);
  await sleep(2000)
  // if (check.type === 'title') {
  //   const { message } = check;
  //   await checkTitle(driver, message);
  // } else {
  //   const { selector, message } = check;
  //   selector.forEach(async(s, index) => {
  //     await checkErrorMessage(driver, s, message[index]);
  //   })
  //   await sleep(1000)
  // }
}