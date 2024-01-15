import { z } from "zod";

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
