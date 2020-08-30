import path from "path";
import { CheckWithExtension } from "./lib/CheckWithExtension";
import { CheckWithFile } from "./lib/CheckWithFile";
import { CheckWithFileName } from "./lib/CheckWithFileName";
import { CheckWithLanguageName } from "./lib/CheckWithLanguageName";
import { ErrorObject } from "./lib/interface/ErrorInterface";
import { LangData } from "./lib/interface/LangDataInterface";
import { LanguageType } from "./lib/types/LanguageType";
import { DataFileReader } from "./utils/readFromDataFile";

var dataFilePath: string = path.join(
  __dirname,
  "..",
  "data/linguistDataSet.json"
);

var dataFileContent: LangData[] = [];

export class LangLine {
  constructor() {
    dataFileContent = new DataFileReader(dataFilePath).readFromFile();
  }

  public withExtension(extension: string): LangData | ErrorObject {
    return new CheckWithExtension(
      extension,
      dataFileContent
    ).checkWithExtensionHandler();
  }

  public withFileName(fileName: string): LangData | ErrorObject {
    return new CheckWithFileName(
      fileName,
      dataFileContent
    ).checkWithFileNameHandler();
  }

  public async withFile(fileName: string): Promise<LangData | ErrorObject> {
    return await new CheckWithFile(
      fileName,
      dataFileContent
    ).chechWithFileHandler();
  }

  public withLanguageName(languageName: LanguageType): LangData | ErrorObject {
    return new CheckWithLanguageName(
      languageName,
      dataFileContent
    ).checkWithLanguageNameHandler();
  }
}
