import path from "path";
import { DataFileReader } from "../utils/readFromDataFile";
import { CheckWithExtension } from "./CheckWithExtension";
import { CheckWithFileName } from "./CheckWithFileName";
import { CheckWithLanguageName } from "./CheckWithLanguageName";
import { ExtensionValidator } from "./ExtensionValidator";
import { ErrorObject } from "./interface/ErrorInterface";
import { LangData } from "./interface/LangDataInterface";

export class LangLine {
  private dataFilePath: string = path.join(
    __dirname,
    "..",
    "data/linguistDataSet.json"
  );
  private dataFileContent: LangData[] = [];

  constructor() {
    this.dataFileContent = new DataFileReader(this.dataFilePath).readFromFile();
  }

  public withExtension(extension: string): LangData | ErrorObject {
    return new CheckWithExtension(
      extension,
      this.dataFileContent
    ).checkWithExtensionHandler();
  }

  public withFileName(fileName: string): LangData | ErrorObject {
    return new CheckWithFileName(
      fileName,
      this.dataFileContent
    ).checkWithFileNameHandler();
  }

  public withLanguageName(languageName: string): LangData | ErrorObject {
    return new CheckWithLanguageName(
      languageName,
      this.dataFileContent
    ).checkWithLanguageNameHandler();
  }
}
