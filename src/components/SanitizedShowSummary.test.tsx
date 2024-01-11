import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { SanitizedShowSummary } from "./SanitizedShowSummary";

describe("SanitizedShowSummary", () => {
  describe("when provided allowed tags", () => {
    test("renders the summary", async () => {
      const { container } = render(
        <SanitizedShowSummary summary="<p>Summary <b>Testing</b></p>" />
      );
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<p>Summary <b>Testing</b></p>"`
      );
    });
  });

  describe("when no summary provided", () => {
    test("renders nothing", async () => {
      const { container } = render(<SanitizedShowSummary summary={null} />);
      expect(container.innerHTML).toMatchInlineSnapshot(`""`);
    });
  });

  describe("when provided disallowed tags", () => {
    test("sanitizes the summary", async () => {
      const { container } = render(
        <SanitizedShowSummary summary="<script>alert('xss')</script><p>Test</p>" />
      );
      expect(container.innerHTML).toMatchInlineSnapshot(`"<p>Test</p>"`);
    });
  });
});
