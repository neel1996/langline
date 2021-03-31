export const CLIHelpData = {
  description: "Langline CLI - Use any of the options from below",
  usage: `\n\n
  langline [option] [argument]
  langline [option] [argument] --format=[argument]
`,
  helpText: `\n\nE.g: 

  # Without explicit formatting (defaults to table output)
  $ langline --with-extension c

  Output  :

  ╔══════╤════════════════╤═══════════════╤═════════════════╤════════════╗
  ║ Name │ Founder        │ Year          │ Prism Indicator │ Extensions ║
  ╟──────┼────────────────┼───────────────┼─────────────────┼────────────╢
  ║ C    │ Dennis Ritchie │ 1972 and 1973 │ c               │ .c         ║
  ║      │                │               │                 │ .cats      ║
  ║      │                │               │                 │ .h         ║
  ║      │                │               │                 │ .idc       ║
  ╚══════╧════════════════╧═══════════════╧═════════════════╧════════════╝

  # Specified formatting
  $ langline --with-file main.c --format=csv

  Output : 

  "name","founder","year","prismIndicator","extensions"
  "C","Dennis Ritchie","1972 and 1973","c",".c;.cats;.h;.idc"
`,
};
