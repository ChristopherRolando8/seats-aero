import React, { useState, useRef } from "react";
import { FlightSearchParams, FlightSearchSchema } from "../lib/schemas";
import { searchFlights } from "../lib/api";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SearchForm = ({ onSearch }: { onSearch: (results: any) => void }) => {
  const [formData, setFormData] = useState<FlightSearchParams>({
    origin: "",
    destination: "",
    date: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const isSubmitting = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || isSubmitting.current) return;
  
    try {
      isSubmitting.current = true;
      setLoading(true);
  
      const validatedData = FlightSearchSchema.parse(formData);
      setErrors({});
  
      const apiParams = {
        origin_airport: validatedData.origin.toUpperCase(),
        destination_airport: validatedData.destination.toUpperCase(),
        take: 10,
      };
  
      const results = await searchFlights(apiParams);
      onSearch(results);
    } catch (error) {
      console.error("Error during search:", error);
      if (error instanceof z.ZodError) {
        setErrors(error.formErrors.fieldErrors);
      } else {
        setErrors({ general: "An error occurred while searching for flights." });
      }
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Search Award Flights</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Origin Airport</label>
        <input
          type="text"
          value={formData.origin}
          onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="Enter origin (e.g., JFK)"
        />
        {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Destination Airport</label>
        <input
          type="text"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="Enter destination (e.g., LAX)"
        />
        {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:bg-blue-300 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Searching...
          </div>
        ) : (
          "Search Flights"
        )}
      </button>

      {errors.general && (
        <p className="text-red-500 text-sm text-center mt-2">{errors.general}</p>
      )}
    </form>
  );
};

export default React.memo(SearchForm);