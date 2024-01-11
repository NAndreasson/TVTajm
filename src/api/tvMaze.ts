import { z } from "zod";

export class FetchError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = "FetchError";
    this.statusCode = statusCode;
  }
}

function fetchFromTVMaze(path: string) {
  return fetch(`https://api.tvmaze.com/${path}`)
    .then((res) => {
      if (!res.ok) {
        throw new FetchError("Failed to fetch", res.status);
      }
      return res;
    })
    .then((res) => res.json());
}

export const tvMazeShowSchema = z.object({
  id: z.number(),
  name: z.string(),
  genres: z.array(z.string()),
  premiered: z.string().nullable(),
  ended: z.string().nullable(),
  summary: z.string().nullable(),
  image: z
    .object({
      medium: z.string(),
      original: z.string(),
    })
    .nullable(),
});

export type TvMazeShow = z.infer<typeof tvMazeShowSchema>;

const showSearchResponse = z.array(
  z.object({
    show: tvMazeShowSchema,
  })
);

export type ShowSearchResponseList = z.infer<typeof showSearchResponse>;

export function searchShows(query: string): Promise<ShowSearchResponseList> {
  // TODO: experiment with whether this is actually necessary
  const escapedQuery = encodeURIComponent(query);
  return fetchFromTVMaze(`search/shows?q=${escapedQuery}`).then((res) =>
    // TODO: Filter and log shows that don't conform to our expected schema.
    // The current behavior is to throw an error if any show doesn't conform, seems overly aggressive.

    // Also, consider throwing a custom error. The current approach, where we throw a ZodError, feels like a leaky abstraction.
    showSearchResponse.parse(res)
  );
}

export function getShow(id: number | string) {
  return fetchFromTVMaze(`shows/${id}`).then((res) =>
    tvMazeShowSchema.parse(res)
  );
}
