import fs from "fs";
import path from "path";
import { LinguistData } from "../data/linguist";

class LinguistExtractor {
  constructor() {}

  public linguistExtractHandler() {
    let lingData = new LinguistData().getLingData();
    const languages = Object.keys(lingData);

    let langDataSet = languages.map((lang: string) => {
      let langObject = {};

      //@ts-expect-error
      const innerData = lingData[lang];

      if (innerData.entensions) {
        return undefined;
      }

      //@ts-expect-error
      langObject.name = lang;
      //@ts-expect-error
      langObject.extensions = innerData.extensions;

      if (lang.match(/[^a-zA-Z0-9]/gi)) {
        if (innerData.aliases) {
          //@ts-expect-error
          langObject.prismIndicator = innerData.aliases[0];
        }
      } else {
        //@ts-expect-error
        langObject.prismIndicator = lang.trim().toLowerCase();
      }

      if (innerData.type === "programming") {
        return langObject;
      } else if (innerData.type === "markup") {
        //@ts-expect-error
        langObject.prismIndicator = "markup";
        return langObject;
      } else if (innerData.type === "data" && innerData.extensions) {
        if (!lang.match(/[^a-zA-Z0-9]/gi)) {
          //@ts-expect-error
          langObject.prismIndicator = lang.trim().toLowerCase();
          return langObject;
        }
      }
      return undefined;
    });

    langDataSet = langDataSet.filter((item) => item);

    fs.writeFile(
      path.join(__dirname, "..", "/data/linguistDataSet.json"),
      JSON.stringify(langDataSet),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
}

new LinguistExtractor().linguistExtractHandler();
