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
  isReturn?: boolean;
  // Add a flag to indicate if it's a return flight
}
interface FlightResultsProps {
  departureFlights: Flight[];
  returnFlights: Flight[];
  flights?: Flight[];
  loading: boolean;
  error: string | null;
  showDeparture: boolean;
  returnDate: Date | null;
  onSelectDeparture: (flight: Flight) => void;
  onSelectReturn: (flight: Flight) => void;
}

export const FlightResults = ({
  departureFlights,
  returnFlights,
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
          {departureFlights.map((flight, index) => (
            <FlightCard
              key={index}
              flight={flight}
              onSelect={onSelectDeparture}
            />
          ))}
        </Box>
      )}

      {!showDeparture && returnDate && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Return Flights
          </Typography>
          {returnFlights.map((flight, index) => (
            <FlightCard
              key={index}
              flight={flight}
              onSelect={onSelectReturn}
              isReturn
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
