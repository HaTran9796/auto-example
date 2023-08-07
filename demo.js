const {By, Builder, Browser} = require('selenium-webdriver');
(async() => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
    let title = await driver.getTitle();
    await driver.manage().setTimeouts({implicit: 5000});
    let textBox = await driver.findElement(By.id('my-text-id'));
    let submitButton = await driver.findElement(By.css('button'));
    await textBox.sendKeys('Selenium-Ha');
    await submitButton.click();
    let message = await driver.findElement(By.id('message'));
    let value = await message.getText();
    console.log(value)
    // after(async () => await driver.quit());
})()