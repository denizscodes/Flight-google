import { Card, CardContent, Typography, Button } from "@mui/material";

interface Flight {
  airline: string;
  price: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  logo: string;
  duration: string;
  stopover?: string;
  aircraft: string;
  seatPitch: string;
  emission: string;
}

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
  isReturn?: boolean;
}

export const FlightCard = ({ flight, onSelect }: FlightCardProps) => {
  const isReturn =
    new Date(flight.departureTime) > new Date(flight.arrivalTime);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{flight.airline}</Typography>
        <img src={flight.logo}></img>
        <Typography>
          {isReturn ? flight.destination : flight.origin} to{" "}
          {isReturn ? flight.origin : flight.destination}
        </Typography>
        <Typography>
          {isReturn ? "Return Flight" : "Departure Flight"} - Departure:{" "}
          {flight.departureTime} | Arrival: {flight.arrivalTime}
        </Typography>
        <Typography>Price: {flight.price}</Typography>
        <Button onClick={() => onSelect(flight)}>Select</Button>
      </CardContent>
    </Card>
  );
};
