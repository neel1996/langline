const linguist = require('../data/linguistDataSet');
const founder = require('../data_set/founder');
const year = require('../data_set/year');

const fs = require("fs");

let langObj = {};
let langArr = [];
let tempArr = [];

printResult();

function printResult() {
    for (let i = 0; i < linguist.length; i++) {
        if (linguist[i].name === founder[i].name && linguist[i].name === year[i].name) {
            langObj = {...linguist[i], founder: founder[i].founder, year: year[i].year }
            langArr.push(langObj);
        } else {
            console.log(linguist[i].name);
        }
    }
    console.log("Completed!");
    fileSystem(langArr);
}


function fileSystem(users) {

    jsonData = fs.readFileSync("../data_set/linguistData.json");

    if (jsonData.buffer.byteLength === 0) {
        tempArr.push(users);
        fs.writeFileSync("../data_set/linguistData.json", JSON.stringify(tempArr));
        console.log("Buffer!");
    } else {
        parseData = JSON.parse(jsonData);
        tempArr.push(parseData);
        tempArr.push(users);
        // console.log(langObj);
        fs.writeFileSync("../data_set/linguistData.json", JSON.stringify(tempArr));
        console.log("Completed!");
    }
}