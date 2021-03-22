import { program } from "commander";
import { LangLine } from "../index";
import { version } from "../package.json";
import { CliSwitchData } from "./cliSwitchData";

program
  .version(version)
  .description("Langline CLI - Use any of the options from below");

const switchOptions = CliSwitchData.getSwitchOptions();
switchOptions.forEach((switchItem) => {
  const { alias, description, option } = switchItem;
  const switchString = `${alias}, ${option} <type>`;
  program.option(switchString, description);
});
program.parse();

const opts: {
  withExtension?: string;
  withFileName?: string;
  withFile?: string;
  withLanguage?: string;
} = program.opts();

if (opts.withExtension) {
  console.log(new LangLine().withExtension(opts.withExtension));
} else if (opts.withFileName) {
  console.log(new LangLine().withFileName(opts.withFileName));
} else if (opts.withFile) {
  console.log(new LangLine().withFile(opts.withFile));
} else if (opts.withLanguage) {
  console.log(new LangLine().withLanguageName(opts.withLanguage));
} else {
  console.log("Invalid input argument\nRefer `langline --help` for more info");
}

program.parse(process.argv);
