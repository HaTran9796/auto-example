const { By } = require('selenium-webdriver');

const LoginPage = {
  company: By.name('company'),
  email: By.name('email'),
  password: By.name('password'),
  loginBtn: By.css('div.login-submit'),
  companyError: By.id('company-error'),
  emailError: By.id('email-error'),
  passwordError: By.id('password-error'),
  loginError: By.id('credential-error'),
};

module.exports = LoginPage;