import { isText } from "istextorbinary";

export class FileValidator {
  constructor(private targetFile: string) {
    this.targetFile = targetFile;
  }

  private fileTypeValidator(): boolean {
    if (this.targetFile) {
      if (isText(this.targetFile)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
