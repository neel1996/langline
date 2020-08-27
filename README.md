# langline
Node library for getting information about a programming languages

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

Update the CSV file `langData.csv` with the following entries

| name | prismIndicator | extensions |
| :-: | :-: | :-: |
| NAME OF THE LANGUAGE | IF THE LANGUAGE IS SUPPORTED BY PRISM THEN THE PRISMJS COMPONENT NAME | LANGUAGE FILE EXTENSIONS | 

**Note:** Project is still under development and contributions will be accepeted once project is stable for use
