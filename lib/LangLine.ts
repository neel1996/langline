import { ExtensionValidator } from "./ExtensionValidator";
import { FileValidator } from "./FileValidator";

export class LangLine {
  constructor() {}

  public withExtension(extension: string) {
    const isTextExtension = new ExtensionValidator(extension).isTextExtension();
  }

  public withFileName(fileName: string) {}
}
