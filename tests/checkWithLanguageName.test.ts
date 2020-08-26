import { LangLine } from "../lib/index";

const languageName: string = process.argv[2];
console.log(new LangLine().withLanguageName(languageName));
