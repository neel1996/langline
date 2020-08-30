import { ErrorObject } from "./interface/ErrorInterface";
import { LangData } from "./interface/LangDataInterface";
import { LanguageType } from "./types/LanguageType";

export class CheckWithLanguageName {
  constructor(
    private languageName: LanguageType,
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
          this.languageName.toString().trim().toLowerCase()
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
