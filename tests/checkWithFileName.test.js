const { LangLine } = require("../dist/lib/index");

describe("tests language check based on file name", () => {
  test("positve test case for file name based check", () => {
    const result = new LangLine().withFileName("test.js");
    expect(result.name).toBeTruthy();
  });

  test("negative test case for file name based check", () => {
    const result = new LangLine().withFileName("pizza.pizza");
    expect(result.status).toBeTruthy();
  });
});
