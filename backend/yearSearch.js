const puppeteer = require("puppeteer");
const fs = require("fs");
const langSet = require("../data/linguistDataSet");
const { connected } = require("process");

require("events").EventEmitter.defaultMaxListeners = Infinity;
var yearArr = [];
var localObj = {};
var jsonData, parseData;
const tempYearArr = [];
let k = 0;

(async function puppetLoader() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (let i = 100; i < 200; i++) {
        let langName = langSet[i].name;
        let url = encodeURI(
            `https://www.google.com/search?q=${langName} programming language founded year`
        );
        try {
            await page.goto(url, {
                waitUntil: "load",
                timeout: 0,
            });
            try {
                await page.waitForSelector(".Z0LcW").catch(async(err) => {
                    console.log("err " + err);
                })
                await page
                    .evaluate(() => {
                        return document.querySelector(".Z0LcW").innerHTML;
                    })
                    .then(async(result) => {
                        printOutput([result], langName);
                    })
                    .catch(async(err) => {
                        await page
                            .$eval(".ztXv9", (el) => {
                                return el.nextSibling.getElementsByTagName("td")[1].textContent;
                            })
                            .then(async(res) => {
                                printOutput([res], langName);
                            })
                            .catch(async(err) => {
                                await page
                                    .$eval(".ztXv9", (el) => {
                                        HwtpBd
                                        return el
                                            .nextSibling
                                            .nextSibling
                                            .nextSibling
                                            .getElementsByTagName("td")[1].textContent;
                                    })
                                    .then(async(src) => {
                                        printOutput([src], langName);
                                    })
                                    .catch(async(err) => {
                                        await page
                                            .$eval(".HwtpBd", (el) => {
                                                return el.textContent;
                                            })
                                            .then(async(output) => {
                                                printOutput([output], langName);
                                            })
                                            .catch(async(err) => {
                                                printOutput([], langName);
                                            })
                                    });
                            });
                    });
            } catch (err) {
                printOutput([], langName);
                // console.log("Error5" + err);
            }
        } catch (err) {
            console.log("Error6" + err);
        }
    }
    fileSystem(tempYearArr);
})();

function printOutput(value, data) {
    localObj = {
        name: data,
        year: value,
    };
    tempYearArr.push(localObj);
    console.log(tempYearArr[k]);
    k++;
}

function fileSystem(users) {
    jsonData = fs.readFileSync("../data_set/year.json");

    if (jsonData.buffer.byteLength === 0) {
        yearArr.push(tempYearArr);
        fs.writeFileSync("../data_set/year.json", JSON.stringify(yearArr));
        console.log("Buffer!");
    } else {
        parseData = JSON.parse(jsonData);
        yearArr.push(parseData);
        yearArr.push(users);
        // console.log(yearArr);
        fs.writeFileSync("../data_set/year.json", JSON.stringify(yearArr));
        // fs.writeFileSync("../data_set/year.json", JSON.stringify(users));
        console.log("Completed!");
    }
}