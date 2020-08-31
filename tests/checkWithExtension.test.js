const { LangLine } = require("../dist/index");

describe("tests language check based on extension", () => {
  test("positive test case : checkWithExtension", () => {
    expect(new LangLine().withExtension("js").name).toBeTruthy();
    expect(new LangLine().withExtension("js").name).toBe("JavaScript");
  });

  test("negative test case : checkWithExtension", () => {
    expect(new LangLine().withExtension("NULL").status).toBeTruthy();
  });
});
