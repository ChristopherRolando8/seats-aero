import { useState, useEffect } from "react";
import { SearchForm } from "../components/SearchForm";
import { FlightResults } from "../components/FlightResults";
import { searchFlights } from "@/lib/api";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchParams: { origin: string; destination: string; date: string }) => {
    setResults(searchParams.data)
    if (!searchParams.origin || !searchParams.destination) {
      console.warn("Skipping API call due to missing parameters");
      return;
    }

    setLoading(true);
    try {
      const data = await searchFlights(searchParams);
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Award Flight Search</h1>
      <SearchForm onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : <FlightResults results={results} />}
    </div>
  );
}
