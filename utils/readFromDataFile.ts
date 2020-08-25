import { LangData } from "../lib/interface/LangDataInterface";
import fs from "fs";
export class DataFileReader {
  constructor(private dataFile: string) {}

  public readFromFile(): LangData[] {
    const fileData = fs.readFileSync(this.dataFile);
    const langData = <LangData[]> JSON.parse(fileData.toString());
    return langData;
  }
}
