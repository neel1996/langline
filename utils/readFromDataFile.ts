import { LangData } from "../lib/interface/LangDataInterface";
import {languageDataSet} from "../data/linguistDataSet";

export class DataFileReader {
  constructor() {}
  public readFromFile(): LangData[] {
    return languageDataSet;
  }
}
