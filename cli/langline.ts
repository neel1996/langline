#!/usr/bin/env node

import commander, { program, Option, Command, OptionValues } from "commander";
import { LangLine } from "../index";
import { version } from "../package.json";
import { ErrorObject } from "./../lib/interface/ErrorInterface";
import { LangData } from "./../lib/interface/LangDataInterface";
import { CLIOutPutPrinter } from "./CLIOutputPrinter";
import { CliSwitchData } from "./cliSwitchData";
import { CLIHelpData } from "./cliHelpData";

/**
 * Entry class for enabling CLI functionality to langline
 * Change - v1.1.0
 */
export class LangLineCLI {
  /**
   * Formats the CLI output based on the user provided argument
   *
   * If no format argument is received, then `table` format will be opted by default
   * @param dataToFormat
   * @param opts
   * @returns void
   */
  formatHandler(
    dataToFormat: LangData | ErrorObject,
    opts: commander.OptionValues
  ): void {
    const cliOutputPrinter = new CLIOutPutPrinter();

    if (
      !dataToFormat ||
      (dataToFormat &&
        ((dataToFormat as ErrorObject).status ||
          !(dataToFormat as LangData).name))
    ) {
      return;
    }

    if ((opts.format && opts.format === "table") || !opts.format) {
      cliOutputPrinter.tableOutput(dataToFormat as LangData);
    } else if (opts.format && opts.format === "csv") {
      cliOutputPrinter.csvOutput(dataToFormat as LangData);
    } else if (opts.format && opts.format === "json") {
      cliOutputPrinter.jsonOutput(dataToFormat as LangData);
    } else {
      // eslint-disable-next-line no-console
      console.log("ERROR : Invalid format argument");
      return;
    }
  }

  /**
   * Checks the option received from the user and routes the input to the relevant module
   * @param opts : commander:OptionValues
   */
  async cliOptionHandler(opts: OptionValues) {
    let dataToFormat: LangData | ErrorObject | void;

    if (opts.withExtension) {
      dataToFormat = new LangLine().withExtension(opts.withExtension);
    } else if (opts.withFileName) {
      dataToFormat = new LangLine().withFileName(opts.withFileName);
    } else if (opts.withFile) {
      dataToFormat = await new LangLine().withFile(opts.withFile);
    } else {
      // eslint-disable-next-line no-console
      console.log(
        "Invalid input argument\nRefer `langline --help` for more info"
      );
    }

    this.formatHandler(dataToFormat as LangData | ErrorObject, opts);
  }

  /**
   * Initiates the CLI module for langline
   */
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
      format?: string;
    } = program.opts();

    this.cliOptionHandler(opts);
    program.parse(process.argv);
  }
}

// Invoking a class to print results in the console
new LangLineCLI().langLineCLIInitiator();
