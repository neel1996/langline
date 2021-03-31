import { LangData } from "../lib/interface/LangDataInterface";
import { CLIOutputInterface } from "./CLIOutputInterface";
import { Parser } from "json2csv";
import { table } from "table";

export class CLIOutPutPrinter implements CLIOutputInterface {
  static printLanguage = console.log;
  fields = ["Name", "Founder", "Year", "Prism Indicator", "Extensions"];

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

  jsonOutput(data: LangData): void {
    CLIOutPutPrinter.printLanguage(JSON.stringify(data, null, 4));
  }

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
