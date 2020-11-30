# langline

<p align="center">
    <p align="center">
        <img width="240" alt="icon" src="https://user-images.githubusercontent.com/47709856/91642490-5eab0580-ea49-11ea-97ec-3bc64cc4a9a5.png">
    </p>
    <p align="center">
        <img src="https://github.com/neel1996/langline/workflows/langline%20primray%20pipeline/badge.svg" />
        <img src="https://api.codacy.com/project/badge/Grade/851b4c5df5ac4ca89564dd773e57f589" />
        <a href="https://www.npmjs.com/package/@itassistors/langline" target="_blank">
          <img src="https://img.shields.io/static/v1?label=langline&message=v1.0.1&color=brightgreen&logo=npm" />
        </a>
    </p>
</p>

Node library for getting information about programming languages by supplying the following options,

- Name of the language
- File extension of the language (E.g: js, py)
- Fully qualified file name with the extension
- The actual file which holds the code

## Importing LangLine to a project

```
// ES5 require
const { LangLine } = require("@itassistors/langline");

// ES6 import
import { LangLine } from "@itassistors/langline";
```

- **Fetching language with Extension**

```
const { LangLine } = require("@itassistors/langline");

const extension = "js"; //file extension
const language = new LangLine().withExtension(extension);

console.log(language);
```

- **Fetching language with File Name**

```
const { LangLine } = require("@itassistors/langline");

const fileName = "addRepoApi.js"; //file name with extension
const language = new LangLine().withFileName(fileName);

console.log(language);
```

- **Fetching language by supplying an actual file**

>Note: In this case, the supplied file will be validated to check its existance and confirm its type. If the validation fails, then the language will not be returned. This is supported only when referred in the backend module and it is not supported when used in the client side (E.g: React)

```
const { LangLine } = require("@itassistors/langline");
const path = require("path");

async function langline() {
  const fileName = path.join(__dirname, "..", "server.js"); //file name with extension
  const language = await new LangLine()
    .withFile(fileName)
    .then((lang) => {
      return lang;
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });

  console.log(language);
}

langline();
```

## Output

```
{
  name: 'JavaScript',
  extensions: [
    '.js',   '._js',   '.bones',
    '.cjs',  '.es',    '.es6',
    '.frag', '.gs',    '.jake',
    '.jsb',  '.jscad', '.jsfl',
    '.jsm',  '.jss',   '.mjs',
    '.njs',  '.pac',   '.sjs',
    '.ssjs', '.xsjs',  '.xsjslib'
  ],
  prismIndicator: 'javascript',
  founder: ["Brendan Eich"],
  year: ["1995"]
}
```

The programming language dataset is adapted from github linguist language list. The founder and year data were collected using a google search web scrapping module which is available in the [addons](addons) directory

## Prism Indicator Field

This field is for `prismjs` users who relies on the framework for syntax highlighting. This field will come in handy for dynamic syntax highlighting when using prism with react or other frontend development frameworks

## Add a new Language

The languages are maintained in a JSON file which will be used by the library internally. If you wish to add a new language, fork the repo and submit a PR by updating either the JSON data file or the CSV data file

**JSON File**

Update the JSON file `./data/linguistDataSet.json` with the language specific entries 

```
{
    name: "NAME OF THE LANGUAGE",
    prismIndicator: "LANGUAGE COMPONENT NAME AS SUCH IN PRISMJS LIBRARY",
    extensions: [".extension"...]
}
```

**CSV File**

Update the CSV file `./data/langData.csv` with the following entries

| name | extensions | prismIndicator | founder | year |
| :-: | :-: | :-: | :-: | :-: |
| NAME OF THE LANGUAGE | LANGUAGE FILE EXTENSIONS. SEPARATE MULTIPLE ENTRIES WITH PIPE | IF THE LANGUAGE IS SUPPORTED BY PRISM THEN THE PRISMJS COMPONENT NAME | FOUNDER NAME. SEPARATE MULTIPLE ENTRIES WITH PIPE | INITIAL RELEASE YEAR IN YYYY FORMAT |

