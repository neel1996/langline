import { LangData } from "../lib/interface/LangDataInterface";
import { DataFileReader } from "./readFromDataFile";
import path from "path";
import fs from "fs";

class JSONtoCSVConvertor {
  private dataFileContent: LangData[];
  constructor() {
    this.dataFileContent = new DataFileReader(
      path.join(__dirname, "..", "data/linguistDataSet.json")
    ).readFromFile();
  }

  public convertToCSV() {
    let header: string = "name,extensions,prismIndicator,founder,year";
    let data = [];
    if (this.dataFileContent) {
      data = this.dataFileContent.map((item) => {
        let founders: string[] = [];
        if (item.extensions) {
          if (item.founder) {
            const founderString = item.founder.join(",");
            founders = [...founderString.split(",")];
          }

          item.prismIndicator = item.prismIndicator ? item.prismIndicator : "";

          return (
            item.name +
            "," +
            item.extensions.join("|") +
            "," +
            item.prismIndicator +
            "," +
            founders.join("|") +
            "," +
            item.year?.join("")
          );
        }
        return undefined;
      });

      data = data.filter((item) => item);

      let dataContent: string = header + "\n" + data.join("\n");

      fs.writeFile(
        path.join(__dirname, "..", "data/langData.csv"),
        dataContent,
        (err) => {
          console.log(err);
        }
      );
    }
  }
}

new JSONtoCSVConvertor().convertToCSV();
