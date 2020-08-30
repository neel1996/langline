const { LangLine } = require("../dist/index");

describe("tests language check with language name", () => {
  test("positive test case for language name based check", () => {
    const result = new LangLine().withLanguageName("javascript");
    expect(result.name).toBeTruthy();
  });

  test("negative test case for language name based check", () => {
    const result = new LangLine().withLanguageName("pizza");
    expect(result.status).toBeTruthy();
  });
});
