import { ExtensionValidator } from "./ExtensionValidator";
import { CheckWithExtension } from "./CheckWithExtension";
import { LangData } from "./interface/LangDataInterface";
import { ErrorObject } from "./interface/ErrorInterface";

export class CheckWithFileName {
  constructor(private fileName: string, private dataFileContent: LangData[]) {}

  public checkWithFileNameHandler(): LangData | ErrorObject {
    const fileNameSplit = this.fileName.split(".");
    const fileExtension = fileNameSplit[fileNameSplit.length - 1];

    const errorMessage: ErrorObject = {
      status: "No matching language found.",
    };

    const isExtensionValid = new ExtensionValidator(
      fileExtension
    ).isTextExtension();

    if (isExtensionValid) {
      return new CheckWithExtension(
        fileExtension,
        this.dataFileContent
      ).checkWithExtensionHandler();
    } else {
      return errorMessage;
    }
  }
}
