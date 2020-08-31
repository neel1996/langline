import { ExtensionValidator } from "./ExtensionValidator";
import { ErrorObject } from "./interface/ErrorInterface";
import { LangData } from "./interface/LangDataInterface";
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
      let filteredLanguage: LangData[] = this.dataFileContent.filter(
        (langData: any, index) => {
          const extensions: string[] = langData.extensions;

          if (extensions && extensions.includes("." + this.extension)) {
            return true;
          } else {
            return false;
          }
        }
      );

      const matchingLanguage: LangData | undefined =
        filteredLanguage.length > 0 ? filteredLanguage[0] : undefined;

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
