const prism = require('../prism.js');
var langData = require('../data_set/linguistData');
const fs = require('fs');

let prismArr = [];
let jsonData = [];
let tempArr = [];
let parseData = [];

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
                prismArr.push(langData[i]);
            }
        } else {
            prismArr.push(langData[i]);
        }
    }
    fileSystem(prismArr);
}

function fileSystem(users) {

    jsonData = fs.readFileSync("../data_set/prismIndicator.json");

    if (jsonData.buffer.byteLength === 0) {
        tempArr.push(users);
        fs.writeFileSync("../data_set/prismIndicator.json", JSON.stringify(tempArr));
        console.log("Buffer!");
    } else {
        parseData = JSON.parse(jsonData);
        tempArr.push(parseData);
        tempArr.push(users);
        fs.writeFileSync("../data_set/prismIndicator.json", JSON.stringify(tempArr));
        console.log("Completed!");
    }
}