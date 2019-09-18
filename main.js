const Puppeteer = require('./app/puppeteer/Puppeteer');
const addContext = require('mochawesome/addContext');
const {expect} = require('chai');
const {describe, it, before, after} = require('mocha');
const MAX_WAIT_TIME = 20000 // 20 seconds

describe('Basic puppeteer tests', () => {
    let builder = null,
        browser = null,
        page = null;

    before(async () => {
        // this.timeout(10000);
        builder = new Puppeteer();
        await builder.build(false);
        browser = builder.instance;
        page = await browser.newPage();
    });

    after(async () => {
        await browser.close();
    });

    it('should search and find Puppeteer', async () => {
        // Arrange
        await page.goto('https://www.npmjs.com', {
            waitUntil: 'networkidle0'
        });
        // Act
        await page.type('[type="search"]', 'puppeteer');
        await page.click('[type=submit]');
        await page.waitForSelector('[href="/package/puppeteer"]');
        await page.click('[href="/package/puppeteer"]');
        await page.waitForSelector('.package-name-redundant');
        // Assert
        const package = await page.$('.package-name-redundant');
        const text = await page.evaluate(package => package.textContent, package);
        addContext(this, `Package name: ${text}`);
        expect(text).to.equal('Puppeteer');
    }).timeout(MAX_WAIT_TIME);
});