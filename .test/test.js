const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function openChromeTest() {
    try {
        let options = new chrome.Options();
        let driver = await new Builder()
            .setChromeOptions(options)
            .forBrowser('chrome')
            .build();
        await driver.get('https://aheil.de')

        var assert = require('assert');
        assert(await driver.getTitle() == 'aheil.de')

        await driver.quit();
    } catch (error) {
        console.log(error);
    }
})();