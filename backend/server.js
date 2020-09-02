const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const puppeteer = require("puppeteer");
const EventEmitter = require('events');
const emitter = new EventEmitter();

const lang = require("../data/linguistDataSet");

// async function sleep(t) {
//     return Promise.resolve(setTimeout(() => null, t));
// }

require('events').EventEmitter.defaultMaxListeners = Infinity;

for (let i = 0; i < 5; i++) {
    let data = lang[i].name;
    // console.log(data);
    let url = encodeURI(`https://www.google.com/search?q=${data} founder`);
    console.log(url);

    async function asyncHandler() {
        const browser = await puppeteer.launch();

        try {

            // await page.waitForSelector(".FLP8od");
            // await page.waitForSelector(".Z0LcW XcVN5d AZCkJd");
            const page = await browser.newPage();
            await page.goto(url, {
                waitUntil: 'load',
                timeout: 0
            });

            const text = await page.$eval(".FLP8od", (el) => el.innerHTML)
            console.log(text, data);
            // await sleep(2500);
        } catch (err) {
            // text = await page.$eval(".Z0LcW XcVN5d AZCkJd", (el) => el.innerHTML)
            console.log("Error" + err);
        } finally {
            await browser.close();
        }
    }

    asyncHandler();
}

app.listen(3000);