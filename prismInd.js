const prism = require('../prism.js');
var langData = require('../data_set/linguistData');
const fs = require('fs');

let prismArr = [];
let jsonData = [];
let tempArr = [];
let parseData = []

let count = 0;

prismHandler();

function prismHandler() {
    for (let i = 0; i < langData.length; i++) {

        if (langData[i].hasOwnProperty('prismIndicator')) {
            let flag = 'true';
            for (let j = 0; j < prism.module.length; j++) {
                if (langData[i].prismIndicator === prism.module[j]) {
                    flag = 'false';
                    prismArr.push(langData[i]);
                    break;
                }
            }

            if (flag === 'true') {
                delete langData[i].prismIndicator;
                console.log(langData[i].name);
                count++;
                prismArr.push(langData[i]);
            }
        } else {
            console.log(langData[i].name);
            count++;
            prismArr.push(langData[i]);
        }
    }
    console.log(count);
    PrismFileSystem(prismArr);
}

function PrismFileSystem(arr) {

    jsonData = fs.readFileSync("../data_set/prismIndicator.json");

    if (jsonData.buffer.byteLength === 0) {
        tempArr.push(arr);
        fs.writeFileSync("../data_set/prismIndicator.json", JSON.stringify(tempArr));
        console.log("Buffer!");
    } else {
        parseData = JSON.parse(jsonData);
        tempArr.push(parseData);
        tempArr.push(arr);
        fs.writeFileSync("../data_set/prismIndicator.json", JSON.stringify(tempArr));
        console.log("Completed!");
    }
}