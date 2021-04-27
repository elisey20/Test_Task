const puppeteer = require("puppeteer");
const { expect } = require('chai');

describe('Тесты на Еде', () => {
    it('Тестовое задание', async () => {
        const browser = await puppeteer.launch({
            timeout: 10000,
            headless: false,
            defaultViewport: {
                width: 1200,
                height: 1000
            }
        });
        const page = await browser.newPage();

        await page.goto('https://www.vl.ru/eda/', {waitUntil: 'load'});
        await page.type('.search-line input', 'Миринэ', {delay: 100});
        await page.keyboard.press('Enter');
        await page.waitFor(2000);
        expect((await page.$$('div.result')).length, "Неверно").to.be.eq(1);
        await page.waitForSelector('.result__company.company .company__title');
        await page.click('.result__company.company .company__title');
        await page.waitForSelector('div.wrapper');
        expect(page.url()).to.be.eq('https://www.vl.ru/eda/place/mirine-korejskaya-kuhnya');
    });
});
