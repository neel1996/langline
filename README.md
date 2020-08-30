# langline

<p align="center">
    <p align="center">
        <img width="240" alt="icon" src="https://user-images.githubusercontent.com/47709856/91642490-5eab0580-ea49-11ea-97ec-3bc64cc4a9a5.png">
    </p>
    <p align="center">
        <img src="https://github.com/neel1996/langline/workflows/langline%20primray%20pipeline/badge.svg" />
    </p>
</p>

Node library for getting information about programming languages by supplying the following options,

- Name of the language
- File extension of the language (E.g: js, py)
- Fully qualified file name with the extension
- The actual file which holds the code

The programming language dataset is adapted from github linguist language list

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

| name | prismIndicator | extensions |
| :-: | :-: | :-: |
| NAME OF THE LANGUAGE | IF THE LANGUAGE IS SUPPORTED BY PRISM THEN THE PRISMJS COMPONENT NAME | LANGUAGE FILE EXTENSIONS. SPLIT MULTIPLE EXTENSIONS WITH PIPE | 

**Note:** Project is still under development and contributions will be accepeted once project is stable for use
