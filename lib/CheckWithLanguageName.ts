import { ErrorObject } from "./interface/ErrorInterface";
import { LangData } from "./interface/LangDataInterface";

export class CheckWithLanguageName {
  constructor(
    private languageName: string,
    private dataFileContent: LangData[]
  ) {}

  public checkWithLanguageNameHandler() {
    const errorMessage: ErrorObject = {
      status: "No matching language found.",
    };

    const matchingLanguage: LangData | undefined = this.dataFileContent.find(
      (lang) => {
        if (
          lang.name.trim().toLowerCase() ===
          this.languageName.trim().toLowerCase()
        ) {
          return lang;
        }
      }
    );

    if (matchingLanguage) {
      return matchingLanguage;
    } else {
      return errorMessage;
    }
  }
}
