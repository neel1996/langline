import { LangData } from "./interface/LangDataInterface";
import { ExtensionValidator } from "./ExtensionValidator";
import { ErrorObject } from "./interface/ErrorInterface";

export class CheckWithExtension {
  constructor(private extension: string, private dataFileContent: LangData[]) {}

  public checkWithExtensionHandler(): LangData | ErrorObject {
    const isTextExtension: boolean = new ExtensionValidator(
      this.extension
    ).isTextExtension();

    const errorMessage: ErrorObject = {
      status: "No matching language found.",
    };

    if (isTextExtension && this.dataFileContent) {
      const matchingLanguage: LangData | undefined = this.dataFileContent.find(
        (langData: any, index) => {
          const extensions: string[] = langData.extensions;
          if (extensions.includes(this.extension)) {
            return langData;
          } else {
            return null;
          }
        }
      );

      if (matchingLanguage) {
        return matchingLanguage;
      } else {
        return errorMessage;
      }
    } else {
      return errorMessage;
    }
  }
}
