import csvtojson from "csvtojson";
import fs from "fs";
import path from "path";
export class WriteToJSONDataFile {
  constructor(private csvFileName?: string, private targetFileName?: string) {}

  public convertToJson() {
    csvtojson()
      .fromFile(
        this.csvFileName
          ? this.csvFileName
          : path.join(__dirname, "..", "data/lang-data.csv")
      )
      .then((jsonObject: any[]) => {
        if (jsonObject && this.csvFileName && this.targetFileName) {
          let fileData: string[] = [];
          jsonObject.forEach((langData) => {
            langData.extensions = langData.extensions.split("|");
            fileData.push(JSON.stringify(langData));
          });
          fs.writeFileSync(this.targetFileName, "[" + fileData.join() + "]");
        }
      });
  }
}
