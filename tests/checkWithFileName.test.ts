import { LangLine } from "../lib/index";

const fileName: string = process.argv[2];
console.log(new LangLine().withFileName(fileName));
