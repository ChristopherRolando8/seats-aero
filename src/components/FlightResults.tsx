
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FlightResults = ({ results }: { results: any[] }) => {
  
    return (
      <div className="m-4">
        {results.length === 0 ? (
          <p>No flights found</p>
        ) : (
          <ul className="space-y-2">
            {results.map((flight, index) => (
              <li key={index} className="p-4 border rounded-lg shadow">
                <strong>{flight.Route.OriginAirport} → {flight.Route.DestinationAirport}</strong> <br />
                <span>Economy: {flight.YAvailable ? `${flight.YMileageCost} miles` : "N/A"}</span> | 
                <span> Business: {flight.JAvailable ? `${flight.JMileageCost} miles` : "N/A"}</span> | 
                <span> First: {flight.FAvailable ? `${flight.FMileageCost} miles` : "N/A"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  