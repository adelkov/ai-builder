import { z } from "zod";

export const movieSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type Movie = z.infer<typeof movieSchema>;

export const travelItineraryRequestSchema = z.object({
  days: z.number(),
  budget: z.string(),
  origin: z.string(),
  details: z.string(),
  preferences: z.string(),
});


export const travelItineraryResponseSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  program: z.array(
    z.object({
      day: z.number(),
      activities: z.array(z.object({
        name: z.string(),
        description: z.string(),
        time: z.string(),
        location: z.string(),
        costInUSD: z.number(),
      })),
    }),
  ),
  budget: z.string(),
  details: z.string(),
});

export type TravelItineraryRequest = z.infer<typeof travelItineraryRequestSchema>; 
export type TravelItineraryResponse = z.infer<typeof travelItineraryResponseSchema>; 