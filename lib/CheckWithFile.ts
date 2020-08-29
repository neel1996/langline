import fs from "fs";
import { isText } from "istextorbinary";
import { CheckWithExtension } from "./CheckWithExtension";
import { ErrorObject } from "./interface/ErrorInterface";
import { LangData } from "./interface/LangDataInterface";
export class CheckWithFile {
  private langError: ErrorObject;
  private fileError: ErrorObject;

  constructor(private fileName: string, private dataFileContent: LangData[]) {
    this.langError = {
      status: "No matching language found.",
    };

    this.fileError = {
      status: "The selected file is not a valid text file",
    };
  }

  public async chechWithFileHandler(): Promise<LangData | ErrorObject> {
    const fileNameSplit = this.fileName.split(".");
    const fileExtension = fileNameSplit[fileNameSplit.length - 1];
    return await fs.promises
      .stat(this.fileName)
      .then((res) => {
        if (res.isFile() && isText(this.fileName)) {
          return new CheckWithExtension(
            fileExtension,
            this.dataFileContent
          ).checkWithExtensionHandler();
        } else {
          return this.fileError;
        }
      })
      .catch((err) => {
        console.log(err);
        return this.langError;
      });
  }
}
