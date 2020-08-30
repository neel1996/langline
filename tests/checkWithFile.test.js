const { LangLine } = require("../dist/index");
const path = require("path");

describe("tests language check based on file", () => {
  test("positve test case for file based check", async () => {
    const result = await new LangLine().withFile(
      path.join(__dirname, ".", "checkWithFile.test.js")
    );
    expect(result.name).toBeTruthy();
  });

  test("negative test case for file based check - Non existant file", async () => {
    const result = await new LangLine().withFile("test.js");
    expect(result.status).toBeTruthy();
  });

  test("negative test case for file based check - Non-text file", async () => {
    const result = await new LangLine().withFile(
      path.join(__dirname, "..", "icon.png")
    );
    expect(result.status).toBeTruthy();
  });
});
