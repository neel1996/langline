import Extensions from "textextensions";
export class ExtensionValidator {
  constructor(private extension: string) {}

  public isTextExtension(): boolean {
    if (Extensions.includes(this.extension)) {
      return true;
    } else {
      return false;
    }
  }
}
