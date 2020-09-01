import { LangData } from "../lib/interface/LangDataInterface";
import {languageData} from "../data/linguistDataSet";
export class DataFileReader {
  constructor(private dataFile: string) {}
  public readFromFile(): LangData[] {
    return languageData;
  }
}
