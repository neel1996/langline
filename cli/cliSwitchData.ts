type optionsDataType = {
  option: string;
  alias: string;
  description: string;
};

export class CliSwitchData {
  constructor() {}

  public static switchOptions: optionsDataType[] = [
    {
      option: "--with-extension",
      alias: "-we",
      description: "Lookup for a language data with file extension",
    },
    {
      option: "--with-file-name",
      alias: "-wfn",
      description: "Lookup for a language data with file name",
    },
    {
      option: "--with-file",
      alias: "-wf",
      description: "Lookup for a language data with actual file",
    },
    {
      option: "--with-language",
      alias: "-wl",
      description: "Lookup for a language data with actual language name",
    },
  ];

  public static getSwitchOptions(): optionsDataType[] {
    return CliSwitchData.switchOptions;
  }
}
