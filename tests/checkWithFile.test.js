const { LangLine } = require("../dist/lib/index");
const path = require("path");

describe("tests language check based on file", () => {
  test("positve test case for file based check", async () => {
    const result = await new LangLine().withFile(
      path.join(__dirname, ".", "checkWithFile.test.js")
    );
    expect(result.name).toBeTruthy();
  });

  test("negative test case for file based check", async () => {
    const result = await new LangLine().withFile("./checkWithExtension.js");
    expect(result.status).toBeTruthy();
  });
});
