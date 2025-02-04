import { Typography, Box } from "@mui/material";
import { JSX } from "react";

interface Flight {
  airline: string;
  price: string;
  departureTime: string;
}

interface FlightListProps {
  flights: Flight[];
}

export default function FlightList({ flights }: FlightListProps): JSX.Element {
  return (
    <Box mt={4}>
      {flights.length > 0 ? (
        <ul>
          {flights.map((flight, index) => (
            <li key={index}>
              {flight.airline} - {flight.price} - {flight.departureTime}
            </li>
          ))}
        </ul>
      ) : (
        <Typography>No flights found.</Typography>
      )}
    </Box>
  );
}
