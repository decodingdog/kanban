import { capitalize } from "~/utils/string";

describe("Common Utils", () => {
  test("change first char", () => {
    expect(capitalize("hi name")).toBe("Hi name");
  });
});
