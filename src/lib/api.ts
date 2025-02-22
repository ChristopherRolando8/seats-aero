import axios from "axios";

export const searchFlights = async (params: {
  origin_airport: string;
  destination_airport: string;
  take?: number;
}) => {
  try {
    const response = await axios.get("/api/search", {
      params: {
        origin_airport: params.origin_airport,
        destination_airport: params.destination_airport,
        take: params.take ?? 10,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

