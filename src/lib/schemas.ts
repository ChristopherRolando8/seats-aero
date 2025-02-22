import { z } from "zod";

export const FlightSearchSchema = z.object({
  origin: z.string().length(3, "Origin must be a 3-letter IATA code"),
  destination: z.string().length(3, "Destination must be a 3-letter IATA code"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

export type FlightSearchParams = z.infer<typeof FlightSearchSchema>;