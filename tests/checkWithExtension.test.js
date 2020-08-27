const { LangLine } = require("../dist/lib/index");

describe("tests language check based on extension", () => {
  test("positive test case : checkWithExtension", () => {
    expect(new LangLine().withExtension("js").name).toBeTruthy();
  });

  test("negative test case : checkWithExtension", () => {
    expect(new LangLine().withExtension("NULL").status).toBeTruthy();
  });
});
