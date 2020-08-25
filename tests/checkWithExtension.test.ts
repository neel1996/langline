import { LangLine } from "../lib/index";

const extension: string = process.argv[2];
console.log(new LangLine().withExtension(extension));
