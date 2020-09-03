const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const puppeteer = require("puppeteer");
const EventEmitter = require("events");
const emitter = new EventEmitter();

const lang = require("../data/linguistDataSet");
const { connected } = require("process");

// async function sleep(t) {
//     return Promise.resolve(setTimeout(() => null, t));
// }

require("events").EventEmitter.defaultMaxListeners = Infinity;
var langObj = [{}];
// let flag = "false";

for (let i = 0; i < 50; i++) {
    let data = lang[i].name;
    // console.log(data);
    let url = encodeURI(`https://www.google.com/search?q=${data} programming language founder`);
    console.log(url);

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
                        langObj[k].founder = result[0];
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
                                langObj[k].founder = res[0];
                                console.log(langObj[k]);
                                k++;
                            })
                            .catch(async(err) => {
                                // const getThemAll = await page.$$('.junCMe')
                                // getThemAll.forEach(async link => {
                                //         await page.eval(() => link.textContent).catch(err => console.log("err " + err))
                                //     })
                                // text = await page.$$eval('.junCMe', elHandles => elHandles.forEach(el =>
                                //         el.textContent
                                //         // return elHandles;
                                //     ))
                                let ele = [];
                                await page.$$(".junCMe").catch((err) => {
                                    console.log(`Error-${data} : ` + err);
                                })
                                text = await page
                                    .$$eval(".junCMe", (el) => {
                                        el.forEach((element, index) => { ele[index] = element.textContent })
                                    })
                                    .then((res) => { console.log(res) })
                                    .catch(async(err) => {
                                        console.log("Error4" + err);
                                    })
                                    // ztXv9
                                    // await page.waitForSelector(".ztXv9").catch((err) => {
                                    //     console.log(`Error-${data} : ` + err);
                                    // });
                                    //     text = await page
                                    // .$eval(".ztXv9", (el) => {
                                    //     return [el.innerHTML];
                                    // })
                                    // .then(async(results) => {
                                    //     langObj[k].name = data;
                                    //     langObj[k].founder = results[0];
                                    //     console.log(langObj[k]);
                                    //     k++;
                                    // console.log(res[0], data, res[1]);
                            })
                            .catch(async(err) => {
                                langObj[k].name = data;
                                langObj[k].founder = " ";
                                console.log(langObj[k]);
                                k++;
                            });

                    });
            } catch (err) {
                console.log("Error5" + err);
            }
            // await sleep(2500);
        } catch (err) {
            console.log("Error6" + err);
        } finally {
            await browser.close();
        }
    }

    asyncHandler();
}

app.listen(3000);