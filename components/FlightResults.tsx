import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { FlightCard } from "./FlightCard";

interface Flight {
  airline: string;
  price: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  logo: string;
  duration: string; // Add missing properties
  stopover?: string;
  aircraft: string;
  seatPitch: string;
  emission: string;
}

interface FlightResultsProps {
  flights: Flight[];
  loading: boolean;
  error: string | null;
  showDeparture: boolean;
  returnDate: Date | null;
  onSelectDeparture: (flight: Flight) => void;
  onSelectReturn: (flight: Flight) => void;
}

export const FlightResults = ({
  flights,
  loading,
  error,
  showDeparture,
  returnDate,
  onSelectDeparture,
  onSelectReturn,
}: FlightResultsProps) => {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      {showDeparture && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Departure Flights
          </Typography>
          {flights.map((flight, index) => (
            <FlightCard
              key={index}
              flight={flight}
              onSelect={onSelectDeparture}
              isReturn={false} // Ensure it's marked as a departure flight
            />
          ))}
        </Box>
      )}

      {!showDeparture && returnDate && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Return Flights
          </Typography>
          {flights.map((flight, index) => (
            <FlightCard
              key={index}
              flight={flight}
              onSelect={onSelectReturn}
              isReturn={true} // Mark as a return flight
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
