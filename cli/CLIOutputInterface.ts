import { LangData } from "./../lib/interface/LangDataInterface";

export interface CLIOutputInterface {
  csvOutput(data: LangData): void;
  jsonOutput(data: LangData): void;
  tableOutput(data: LangData): void;
}
