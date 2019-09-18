const puppeteer = require('puppeteer');

module.exports = class Puppeteer {
    constructor() {
        this._instance = null;
    }

    async build(headless) {
        this._instance = await puppeteer.launch({
            headless: headless
        });
    }

    get instance() {
        return this._instance;
    }
}