const { By, Builder } = require("selenium-webdriver");
const assert = require('assert');
const { describe, it, after } = require('mocha');

require("chromedriver");

// npm run test

describe('Calculator testing', async function () {
    let driver;
    this.timeout(10000);
    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://raymondng117.github.io/freeCodeCamp_calculator/");
    });

    describe('checkChainedCal', function () {
        it('5 - 3 + -5 = -3', async function () {
            const addButton = await driver.findElement(By.id("add"));
            const subtractButton = await driver.findElement(By.id("subtract"));
            const threeButton = await driver.findElement(By.id("three"));
            const fiveButton = await driver.findElement(By.id("five"));
            const equalsButton = await driver.findElement(By.id("equals"));

            await fiveButton.click();
            await subtractButton.click();
            await threeButton.click();
            await addButton.click();
            await subtractButton.click();
            await fiveButton.click();
            await equalsButton.click();

            const display = await driver.findElement(By.id("display"));
            const displayText = await display.getText();
            assert.equal(parseFloat(displayText), -3);
        });
    });

    describe('checkClear', function () {
        it('clear', async function () {
            const addButton = await driver.findElement(By.id("add"));
            const subtractButton = await driver.findElement(By.id("subtract"));
            const threeButton = await driver.findElement(By.id("three"));
            const fiveButton = await driver.findElement(By.id("five"));
            const equalsButton = await driver.findElement(By.id("equals"));
            const clearButton = await driver.findElement(By.id('clear'));

            await fiveButton.click();
            await subtractButton.click();
            await threeButton.click();
            await addButton.click();
            await subtractButton.click();
            await fiveButton.click();
            await equalsButton.click();
            await clearButton.click();

            const display = await driver.findElement(By.id("display"));
            const displayText = await display.getText();
            assert.equal(parseFloat(displayText), 0);
        });
    });

    after(async function () {
        await driver.quit();
    });
});
