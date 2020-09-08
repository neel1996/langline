const puppeteer = require("puppeteer");
const fs = require("fs");
const langSet = require("../data/linguistDataSet");
const { connected } = require("process");

require("events").EventEmitter.defaultMaxListeners = Infinity;
var langObj = [];
var localObj = {};
var jsonData;
const users = [];
let k = 0;

(async function puppetLoader() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (let i = 0; i < langSet.length; i++) {
        let data = langSet[i].name;
        let url = encodeURI(
            `https://www.google.com/search?q=${data} programming language founder`
        );
        let text;

        try {
            await page.goto(url, {
                waitUntil: "load",
                timeout: 0,
            });
            try {
                await page
                    .evaluate(() => {
                        return document.querySelector(".FLP8od").innerText;
                    })
                    .then(async(result) => {
                        printOutput([result], data);
                    })
                    .catch(async(err) => {
                        await page
                            .$eval(".Z0LcW", (el) => {
                                return el.innerText;
                            })
                            .then(async(result) => {
                                printOutput([result], data);
                            })
                            .catch(async(err) => {
                                await page
                                    .evaluate(() => {
                                        return document
                                            .querySelector(".ztXv9")
                                            .getElementsByTagName("th")[1].innerText;
                                    })
                                    .then(async(value) => {
                                        printOutput([value], data);
                                    })
                                    .catch(async(err) => {
                                        const element = await page
                                            .$$eval(".title", (anchors) => {
                                                return anchors.map((anchor) => anchor.textContent);
                                            })

                                        .then(async(src) => {
                                                printOutput(src, data);
                                            })
                                            .catch(async(err) => {
                                                await page
                                                    .evaluate(() => {
                                                        return document
                                                            .querySelector(".ztXv9")
                                                            .getElementsByTagName("td")[1].innerText;
                                                    })
                                                    .then(async(res) => {
                                                        printOutput([res], data);
                                                    })
                                                    .catch(async(err) => {
                                                        await page
                                                            .$eval(".LrzXr", (el) => {
                                                                return el.innerText;
                                                            })
                                                            .then(async(result) => {
                                                                printOutput([result], data);
                                                            })
                                                            .catch(async(err) => {
                                                                printOutput([], data);
                                                            });
                                                    });
                                            });
                                    })
                                    .catch(async(err) => {
                                        console.log("Error:::" + err);
                                    });
                            });
                    })
                    .catch(async(err) => {
                        console.log("Error::" + err);
                    });
            } catch (err) {
                console.log("Error5" + err);
            }
        } catch (err) {
            console.log("Error6" + err);
        }
    }
    fileSystem(users);
})();

function printOutput(value, data) {
    localObj = {
        name: data,
        founder: value,
    };
    users.push(localObj);
    // langObj.push(users);
    k++;
}

var parseData;

function fileSystem(users) {
    jsonData = fs.readFileSync("../data_set/founder.json");

    if (jsonData.buffer.byteLength === 0) {
        langObj.push(users);
        fs.writeFileSync("../data_set/founder.json", JSON.stringify(langObj));
        console.log("Buffer!");
    } else {
        parseData = JSON.parse(jsonData);
        langObj.push(parseData);
        langObj.push(users);
        console.log(langObj);
        fs.writeFileSync("../data_set/founder.json", JSON.stringify(langObj));
        console.log("Completed!");
    }
}