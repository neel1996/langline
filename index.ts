import { CheckWithExtension } from "./lib/CheckWithExtension";
import { CheckWithFile } from "./lib/CheckWithFile";
import { CheckWithFileName } from "./lib/CheckWithFileName";
import { CheckWithLanguageName } from "./lib/CheckWithLanguageName";
import { ErrorObject } from "./lib/interface/ErrorInterface";
import { LangData } from "./lib/interface/LangDataInterface";
import { LanguageType } from "./lib/types/LanguageType";
import { DataFileReader } from "./utils/readFromDataFile";

var dataFileContent: LangData[] = [];
export class LangLine {
  constructor() {
    dataFileContent = new DataFileReader().readFromFile();
  }

  /**
   * Method to lookup a language using extension. Pass a valid file extension to get the respective programming language
   * @param  {string} extension
   * @returns LangData - Language object with name, extensions and prismjs component name if exists
   * @example
   * ```
   * const extension = "js";
   * const language = new LangLine().withExtension(extension);
   * ```
   */
  public withExtension(extension: string): LangData | ErrorObject {
    return new CheckWithExtension(
      extension,
      dataFileContent
    ).checkWithExtensionHandler();
  }

  /**
   * Method to get the programming language based on a supplied file name
   * @param  {string} fileName
   * @returns LangData - Language object with name, extensions and prismjs component name if exists
   * @example
   * ```
   * const fileName = "addRepoApi.js"; //file name with extension
   * const language = new LangLine().withFileName(fileName);
   * ```
   */
  public withFileName(fileName: string): LangData | ErrorObject {
    return new CheckWithFileName(
      fileName,
      dataFileContent
    ).checkWithFileNameHandler();
  }

  /**
   * Method to get the programming language by passing on an actual file
   * This function is not supported from front-end as it requires the `fs` module
   * @param  {string} fileName - Actual file
   * @returns Promise - resolves a promise with the language data
   */
  public async withFile(fileName: string): Promise<LangData | ErrorObject> {
    return await new CheckWithFile(
      fileName,
      dataFileContent
    ).checkWithFileHandler();
  }

  /**
   * Method which accepts a language name from a set of allowed values and returns the respective language data
   * @param  {LanguageType} languageName
   * @returns LangData
   * @example
   * const language = new LangLine().withLanguageName("javascript");
   */
  public withLanguageName(
    languageName: LanguageType | string
  ): LangData | ErrorObject {
    return new CheckWithLanguageName(
      languageName,
      dataFileContent
    ).checkWithLanguageNameHandler();
  }
}
