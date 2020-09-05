const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const puppeteer = require("puppeteer");
const EventEmitter = require("events");
const emitter = new EventEmitter();

const langSet = require('../data/linguistDataSet');
const { connected } = require("process");

require("events").EventEmitter.defaultMaxListeners = Infinity;
var langObj = [{}];

for (let i = 0; i < 90; i++) {
    let data = langSet[i].name;
    // console.log(data);
    let url = encodeURI(`https://www.google.com/search?q=${data} programming language founder`);
    // console.log(url);
    async function asyncHandler() {
        const browser = await puppeteer.launch();
        let text;
        let k = 0;
        try {
            const page = await browser.newPage();
            await page.goto(url, {
                waitUntil: "load",
                timeout: 0,
            });
            try {
                await page.waitForSelector(".FLP8od").catch((err) => {
                    // console.log(`Error-${data} :` + err);
                });

                text = await page
                    .$eval(".FLP8od", (el) => {
                        return [el.innerHTML];
                    })
                    .then(async(result) => {
                        langObj[k].name = data;
                        langObj[k].founder = [result[0]];
                        console.log(langObj[k]);
                        k++;
                    })
                    .catch(async(err) => {
                        await page.waitForSelector(".Z0LcW").catch((err) => {
                            // console.log(`Error-${data} : ` + err);
                        });
                        text = await page
                            .$eval(".Z0LcW", (el) => {
                                return [el.innerHTML];
                            })
                            .then(async(res) => {
                                langObj[k].name = data;
                                langObj[k].founder = [res[0]];
                                console.log(langObj[k]);
                                k++;
                            })
                            .catch(async(err) => {
                                await page.evaluate(() => {
                                        return document.querySelector(".ztXv9").getElementsByTagName('th')[1].innerText;
                                    })
                                    .then(async(value) => {
                                        langObj[k].name = data;
                                        langObj[k].founder = [value];
                                        console.log(langObj[k]);
                                        k++;
                                    })
                                    .catch(async(err) => {
                                        const element = await page.$$eval('.title', anchors => {
                                            return anchors.map(anchor => anchor.textContent)
                                        })

                                        .then(async(src) => {
                                                langObj[k].name = data;
                                                langObj[k].founder = src;
                                                console.log(langObj[k]);
                                                k++;
                                            })
                                            .catch(async(err) => {
                                                langObj[k].name = data;
                                                langObj[k].founder = [];
                                                console.log(langObj[k]);
                                                k++;
                                            })
                                    })
                                    .catch(async(err) => {
                                        console.log("Error:::" + err);
                                    })

                            })
                            .catch(async(err) => {
                                console.log("Error::" + err);
                            })

                    });
            } catch (err) {
                console.log("Error5" + err);
            }
        } catch (err) {
            console.log("Error6" + err);
        } finally {
            await browser.close();
        }
    }

    asyncHandler();
}

app.listen(3000);