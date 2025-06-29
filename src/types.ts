import { z } from "zod";

export const movieSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type Movie = z.infer<typeof movieSchema>;

export const travelItinerarySchema = z.object({
  destination: z.string(),
  days: z.number(),
  budget: z.string(),
  origin: z.string(),
  details: z.string(),
});

export type TravelItinerary = z.infer<typeof travelItinerarySchema>; 