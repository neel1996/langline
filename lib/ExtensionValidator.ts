import Extensions from "textextensions";
export class ExtensionValidator {
  constructor(private entension: string) {}

  public isTextExtension(): boolean {
    if (Extensions.includes(this.entension)) {
      return true;
    } else {
      return false;
    }
  }
}
