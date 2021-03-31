import { LangData } from "../lib/interface/LangDataInterface";
import { CLIOutputInterface } from "./CLIOutputInterface";
import { Parser } from "json2csv";
import { table } from "table";

/**
 * Class to handle the task of printing the output to the console
 */
export class CLIOutPutPrinter implements CLIOutputInterface {
  // eslint-disable-next-line no-console
  static printLanguage = console.log;

  /**
   * Displays the output in a comma separated format
   * @param data
   */
  csvOutput(data: LangData): void {
    const lang = {
      name: data.name,
      founder: data.founder?.join(";"),
      year: data.year?.join(";"),
      prismIndicator: data.prismIndicator,
      extensions: data.extensions?.join(";"),
    };

    const parser = new Parser();
    const output = parser.parse(lang);
    CLIOutPutPrinter.printLanguage(output);
  }

  /**
   * Displays the output in JSON format
   * @param data
   */
  jsonOutput(data: LangData): void {
    CLIOutPutPrinter.printLanguage(JSON.stringify(data, null, 4));
  }

  /**
   * Displays the output in a clean table format
   *
   * Default format if no option is provided by the user
   * @param data
   */
  tableOutput(data: LangData): void {
    const lang = {
      name: data.name,
      founder: data.founder?.join("\n"),
      year: data.year?.join("\n"),
      prismIndicator: data.prismIndicator,
      extensions: data.extensions?.join("\n"),
    };

    const tabularData = [
      ["Name", "Founder", "Year", "Prism Indicator", "Extensions"],
      [
        lang.name,
        lang.founder,
        lang.year,
        lang.prismIndicator,
        lang.extensions,
      ],
    ];

    const tabularOutput = table(tabularData);
    CLIOutPutPrinter.printLanguage(tabularOutput);
  }
}
