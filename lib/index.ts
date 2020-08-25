import { ErrorObject } from "./interface/ErrorInterface";
import { CheckWithFileName } from "./CheckWithFileName";
import { CheckWithExtension } from "./CheckWithExtension";
import path from "path";
import { ExtensionValidator } from "./ExtensionValidator";
import { FileValidator } from "./FileValidator";
import { LangData } from "./interface/LangDataInterface";
import { DataFileReader } from "../utils/readFromDataFile";

export class LangLine {
  private dataFilePath: string = path.join(
    __dirname,
    "..",
    "data/dataFile.json"
  );
  private dataFileContent: LangData[] = [];

  constructor() {
    this.dataFileContent = new DataFileReader(this.dataFilePath).readFromFile();
  }

  public withExtension(extension: string): LangData | ErrorObject {
    const isTextExtension: boolean = new ExtensionValidator(
      extension
    ).isTextExtension();

    if (isTextExtension && this.dataFileContent) {
      return new CheckWithExtension(
        extension,
        this.dataFileContent
      ).checkWithExtensionHandler();
    } else {
      return {
        status: "No matching language found.",
      };
    }
  }

  public withFileName(fileName: string): LangData | ErrorObject {
    return new CheckWithFileName(
      fileName,
      this.dataFileContent
    ).checkWithFileNameHandler();
  }

  public withLanguageName(languageName: string) {}
}
