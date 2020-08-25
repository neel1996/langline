import { LangData } from "./interface/LangDataInterface";
import { ExtensionValidator } from "./ExtensionValidator";

export class CheckWithExtension {
  constructor(private extension: string, private dataFileContent: LangData[]) {}

  public checkWithExtensionHandler() {
    const isTextExtension: boolean = new ExtensionValidator(
      this.extension
    ).isTextExtension();

    if (isTextExtension && this.dataFileContent) {
      const matchingLanguage = this.dataFileContent.find(
        (langData: any, index) => {
          const extensions: string[] = langData.extensions;
          if (extensions.includes(this.extension)) {
            return langData;
          } else {
            return null;
          }
        }
      );
      return matchingLanguage;
    } else {
      return {
        status: "No matching language found.",
      };
    }
  }
}
