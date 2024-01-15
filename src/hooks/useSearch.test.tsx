import { describe, expect, test } from "vitest";

import { act, renderHook } from "@testing-library/react";
import React from "react";
import { MemoryRouter, useLocation } from "react-router-dom";

import { useSearch } from "./useSearch";

function createBrowserRouter(initialEntries: string[]) {
  return ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );
}

describe("useSearchQuery", () => {
  describe("when route does not contain a search query", () => {
    test("the search string is empty", () => {
      const { result } = renderHook(() => useSearch(), {
        wrapper: createBrowserRouter(["/"]),
      });

      expect(result.current.searchString).toBe("");
    });
  });

  describe("when the route contains a search query", () => {
    test("the search string is equal to the search query", () => {
      const { result } = renderHook(() => useSearch(), {
        wrapper: createBrowserRouter(["/shows?search=Snowfall"]),
      });

      expect(result.current.searchString).toBe("Snowfall");
    });
  });

  describe("when the route contains multiple search queries", () => {
    test("the search string is equal to the first query", () => {
      const { result } = renderHook(() => useSearch(), {
        wrapper: createBrowserRouter(["/shows?search=Snowfall&search=Devs"]),
      });

      expect(result.current.searchString).toBe("Snowfall");
    });
  });

  describe("when searching", () => {
    test("redirects to /shows with query", () => {
      const { result } = renderHook(
        () => ({
          search: useSearch(),
          location: useLocation(),
        }),
        {
          wrapper: createBrowserRouter(["/"]),
        }
      );

      act(() => {
        result.current.search.setSearchString("Snowfall");
      });

      expect(result.current.search.searchString).toBe("Snowfall");
      // Make sure that the location is updated
      expect(result.current.location.pathname).toBe("/shows");
      expect(result.current.location.search).toBe("?search=Snowfall");
    });
  });
});
