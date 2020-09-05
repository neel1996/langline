const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const puppeteer = require('puppeteer');
const EventEmitter = require('events');
const emitter = new EventEmitter();

const langSet = require('../data/linguistDataSet');
const { connected } = require('process');

require('events').EventEmitter.defaultMaxListeners = Infinity;
var langObj = [{}];

// async function handler() {

// }

(async function puppetLoader() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let k = 0;

    langSet.forEach(async(element, index) => {
        let data = element.name;
        // console.log(data);
        let url = encodeURI(
            `https://www.google.com/search?q=${data} programming language founder`
        );
        // console.log(url);
        let text;

        try {
            await page.goto(url, {
                waitUntil: 'load',
                timeout: 0,
            });
            try {
                await page.waitForSelector('.FLP8od').catch((err) => {
                    // console.log(`Error-${data} :` + err);
                });

                text = await page
                    .$eval('.FLP8od', (el) => {
                        return [el.innerHTML];
                    })
                    .then(async(result) => {
                        const localObj = {
                            name: data,
                            founder: [...result],
                        };
                        langObj.push(localObj);
                        console.log(langObj[k]);
                        k++;
                    })
                    .catch(async(err) => {
                        await page.waitForSelector('.Z0LcW').catch((err) => {
                            // console.log(`Error-${data} : ` + err);
                        });
                        text = await page
                            .$eval('.Z0LcW', (el) => {
                                return [el.innerHTML];
                            })
                            .then(async(res) => {
                                const localObj = {
                                    name: data,
                                    founder: [...res],
                                };
                                langObj.push(localObj);
                                console.log(langObj[k]);
                                k++;
                            })
                            .catch(async(err) => {
                                await page
                                    .evaluate(() => {
                                        return document
                                            .querySelector('.ztXv9')
                                            .getElementsByTagName('th')[1]
                                            .innerText;
                                    })
                                    .then(async(value) => {
                                        const localObj = {
                                            name: data,
                                            founder: [...value],
                                        };
                                        langObj.push(localObj);
                                        console.log(langObj[k]);
                                        k++;
                                    })
                                    .catch(async(err) => {
                                        const element = await page
                                            .$$eval('.title', (anchors) => {
                                                return anchors.map(
                                                    (anchor) =>
                                                    anchor.textContent
                                                );
                                            })

                                        .then(async(src) => {
                                                const localObj = {
                                                    name: data,
                                                    founder: [...src],
                                                };
                                                langObj.push(localObj);
                                                console.log(langObj[k]);
                                                k++;
                                            })
                                            .catch(async(err) => {
                                                const localObj = {
                                                    name: data,
                                                    founder: [],
                                                };
                                                langObj.push(localObj);
                                                console.log(langObj[k]);
                                                k++;
                                            });
                                    })
                                    .catch(async(err) => {
                                        console.log('Error:::' + err);
                                    });
                            })
                            .catch(async(err) => {
                                console.log('Error::' + err);
                            });
                    });
            } catch (err) {
                console.log('Error5' + err);
            }
        } catch (err) {
            console.log('Error6' + err);
        }
    });
    // await page.close();
    // await browser.close();
})();