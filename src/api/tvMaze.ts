import { z } from "zod";
import { FetchError } from "./FetchError";
import { tvMazeShowSchema } from "./tvMazeSchemas";

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

const showSearchResponse = z.array(
  z.object({
    show: tvMazeShowSchema,
  })
);

export type ShowSearchResponseList = z.infer<typeof showSearchResponse>;

export function searchShows(query: string): Promise<ShowSearchResponseList> {
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
