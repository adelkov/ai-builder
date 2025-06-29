import { z } from "zod";

export const movieSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type Movie = z.infer<typeof movieSchema>; 