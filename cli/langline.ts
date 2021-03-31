#!/usr/bin/env node

import commander, { program, Option, Command } from "commander";
import { LangLine } from "../index";
import { version } from "../package.json";
import { ErrorObject } from "./../lib/interface/ErrorInterface";
import { LangData } from "./../lib/interface/LangDataInterface";
import { CLIOutPutPrinter } from "./CLIOutputPrinter";
import { CliSwitchData } from "./cliSwitchData";
import { CLIHelpData } from "./cliHelpData";

export class LangLineCLI {
  formatHandler(
    dataToFormat: LangData | ErrorObject,
    opts: commander.OptionValues
  ) {
    const cliOutputPrinter = new CLIOutPutPrinter();

    if (dataToFormat && (dataToFormat as ErrorObject).status) {
      console.log(dataToFormat);
      return;
    }

    if (dataToFormat && (dataToFormat as LangData).name) {
      if ((opts.format && opts.format === "table") || !opts.format) {
        cliOutputPrinter.tableOutput(dataToFormat as LangData);
      } else if (opts.format && opts.format === "csv") {
        cliOutputPrinter.csvOutput(dataToFormat as LangData);
      } else if (opts.format && opts.format === "json") {
        cliOutputPrinter.jsonOutput(dataToFormat as LangData);
      }
    }
  }

  async langLineCLIInitiator() {
    program
      .version(version)
      .description(CLIHelpData.description)
      .usage(CLIHelpData.usage)
      .addHelpText("afterAll", CLIHelpData.helpText);

    const switchOptions = CliSwitchData.getSwitchOptions();
    switchOptions.forEach((switchItem) => {
      const { alias, description, option } = switchItem;
      const switchString = `${alias}, ${option} <type>`;
      program.option(switchString, description);
    });
    program.addOption(
      new Option("--format <value>", "To format the output based").choices([
        "json",
        "csv",
        "table",
      ])
    );
    program.combineFlagAndOptionalValue(true);
    program.parse();

    const opts: {
      withExtension?: string;
      withFileName?: string;
      withFile?: string;
      withLanguage?: string;
      format?: string;
    } = program.opts();

    let dataToFormat: LangData | ErrorObject | void;

    if (opts.withExtension) {
      dataToFormat = new LangLine().withExtension(opts.withExtension);
    } else if (opts.withFileName) {
      dataToFormat = new LangLine().withFileName(opts.withFileName);
    } else if (opts.withFile) {
      dataToFormat = await new LangLine().withFile(opts.withFile);
    } else {
      console.log(
        "Invalid input argument\nRefer `langline --help` for more info"
      );
    }

    this.formatHandler(dataToFormat as LangData | ErrorObject, opts);
    program.parse(process.argv);
  }
}

// Invoking a class to print results in the console
new LangLineCLI().langLineCLIInitiator();
