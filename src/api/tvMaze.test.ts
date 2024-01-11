import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { getShow, searchShows } from "./tvMaze";

describe("tvMaze", () => {
  const server = setupServer();

  beforeAll(() => {
    // Start the interception.
    server.listen();
  });

  afterEach(() => {
    // Remove any handlers you may have added
    // in individual tests (runtime handlers).
    server.resetHandlers();
  });

  afterAll(() => {
    // Disable request interception and clean up.
    server.close();
  });

  // TOOD: possibly create some kind of test factory for this
  const showNotConformingToSchema = {
    id: 1,
    genres: ["Drama"],
    premiered: "2017-07-05",
    ended: null,
    summary:
      "<p>A look at the early days of the crack cocaine epidemic in Los Angeles during the beginning of the 1980s.</p>",
  };

  const showConformingToSchema = {
    id: 1,
    name: "Snowfall",
    genres: ["Drama"],
    premiered: "2017-07-05",
    ended: null,
    summary:
      "<p>A look at the early days of the crack cocaine epidemic in Los Angeles during the beginning of the 1980s.</p>",
    image: {
      medium:
        "https://static.tvmaze.com/uploads/images/medium_portrait/67/168918.jpg",
      original:
        "https://static.tvmaze.com/uploads/images/original_untouched/67/168918.jpg",
    },
  };

  describe("searchShows", () => {
    describe("when API response status is not ok", () => {
      const handlers = [
        http.get("https://api.tvmaze.com/search/shows", async () => {
          return new HttpResponse(null, { status: 401 });
        }),
      ];

      test("should throw FetchError", async () => {
        server.use(...handlers);
        // TODO: also test error code, 401 in this case
        await expect(searchShows("Snowfall")).rejects.toThrow(
          "Failed to fetch"
        );
      });
    });

    describe("when API response does not conform to our schema", () => {
      test("it throws an Error", async () => {
        const handlers = [
          http.get("https://api.tvmaze.com/search/shows", async () => {
            return new HttpResponse(
              // Return a show that is missing a list of properties that we expect to exist
              JSON.stringify([
                {
                  show: showNotConformingToSchema,
                },
              ]),
              { status: 200 }
            );
          }),
        ];
        server.use(...handlers);

        await expect(searchShows("searchstring")).rejects.toThrow();
      });
    });

    describe("when API response conforms to our schema", () => {
      const handlers = [
        http.get("https://api.tvmaze.com/search/shows", async () => {
          return new HttpResponse(
            JSON.stringify([
              {
                show: showConformingToSchema,
              },
            ]),
            { status: 200 }
          );
        }),
      ];

      test("it returns list of shows", async () => {
        server.use(...handlers);

        await expect(searchShows("searchstring")).resolves.toEqual([
          {
            show: showConformingToSchema,
          },
        ]);
      });
    });
  });

  describe("getShow", () => {
    describe("when API response status is not ok", () => {
      const handlers = [
        http.get("https://api.tvmaze.com/shows/1", async () => {
          return new HttpResponse(null, { status: 404 });
        }),
      ];

      test("should throw FetchError", async () => {
        server.use(...handlers);

        await expect(getShow(1)).rejects.toThrow("Failed to fetch");
      });
    });

    describe("when API response does not conform to our schema", () => {
      const handlers = [
        http.get("https://api.tvmaze.com/shows/1", async () => {
          return new HttpResponse(
            // Error here is caused by missing name
            JSON.stringify(showNotConformingToSchema),
            { status: 200 }
          );
        }),
      ];

      test("it throws an Error", async () => {
        server.use(...handlers);

        await expect(getShow(1)).rejects.toThrow();
      });
    });

    describe("when API response conforms to our schema", () => {
      const handlers = [
        http.get("https://api.tvmaze.com/shows/1", async () => {
          return new HttpResponse(JSON.stringify(showConformingToSchema), {
            status: 200,
          });
        }),
      ];

      test("it returns the show", async () => {
        server.use(...handlers);

        await expect(getShow(1)).resolves.toEqual(showConformingToSchema);
      });
    });
  });
});
