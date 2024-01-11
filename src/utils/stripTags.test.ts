import { describe, expect, test } from "vitest";
import { stripTags } from "./stripTags";

describe("stripTags", () => {
  describe("when given a string with no HTML tags", () => {
    test("should return the string", () => {
      expect(stripTags("Test")).toEqual("Test");
    });
  });

  describe("when given a string with HTML tags", () => {
    test("should strip HTML tags", () => {
      expect(stripTags("<h1>Test</h1>")).toEqual("Test");
    });
  });

  // Document <>Test</> as a test case, return <>Test
});
