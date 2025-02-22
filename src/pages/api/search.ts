import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const API_KEY = "pro_2jfHDqr43XXLfj7Kv2RbwwJ1TWp";
const BASE_URL = "https://seats.aero/partnerapi";

const SearchParamsSchema = z.object({
  origin_airport: z.string().min(1, "Origin airport is required"),
  destination_airport: z.string().min(1, "Destination airport is required"),
  take: z.preprocess((val) => (val ? Number(val) : undefined), z.number().optional()),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const validatedParams = SearchParamsSchema.parse(req.query);
    const response = await axios.get(`${BASE_URL}/search`, {
      headers: {
        "Partner-Authorization": API_KEY,
        accept: "application/json",
      },
      params: validatedParams,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in API route:", error);

    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid request parameters", details: error.errors });
    } else if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({
        error: "Error fetching data from Seats.aero API",
        details: error.response?.data || error.message,
      });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

