import { WriteToJSONDataFile } from "./writeToJSONDataFile";
import path from "path";
export class RunCSVToJSONConvertor {
  constructor() {
    const csvFile: string = path.join(__dirname, "..", "data/langData.csv");
    const targetFile: string = path.join(
      __dirname,
      "..",
      "data/linguistDataSet.json"
    );
    console.log("Starting csv to json convertor for", csvFile);
    new WriteToJSONDataFile(csvFile, targetFile).convertToJson();
  }
}

new RunCSVToJSONConvertor();
