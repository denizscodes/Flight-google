import { Typography, Container } from "@mui/material";

export const FlightSearchHeader = () => (
  <Container>
    <img
      src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
      alt="Flights header"
    />
    <Typography
      variant="h2"
      sx={{ fontWeight: "medium" }}
      align="center"
      gutterBottom
    >
      Flights
    </Typography>
  </Container>
);
