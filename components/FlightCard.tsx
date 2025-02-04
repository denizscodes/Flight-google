import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import moment from "moment";

interface Flight {
  airline: string;
  price: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  duration: string;
  stopover?: string;
  aircraft: string;
  seatPitch: string;
  emission: string;
  logo: string;
}

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight, isReturn: boolean) => void;
  isReturn?: boolean;
}

export const FlightCard = ({ flight, onSelect, isReturn }: FlightCardProps) => {
  const [selectedReturn, setSelectedReturn] = useState<boolean>(false);
  const [showReturn, setShowReturn] = useState<boolean>(false); // Controls showing return flight
  const formattedDepartureTime = moment(flight.departureTime).format("HH:mm");
  const formattedArrivalTime = moment(flight.arrivalTime).format("HH:mm");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSelect = (flight: Flight) => {
    // If gidiş uçuşu seçildiyse dönüş uçuşunu göster
    if (!showReturn) {
      setShowReturn(true); // Show return flight after selecting the first one
    }

    // Select the gidiş or return flight
    setSelectedReturn(!selectedReturn); // Toggle return status
    onSelect(flight, selectedReturn); // Pass return status to parent
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          padding: "16px",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2}>
            <img
              src={flight.logo}
              alt={flight.airline}
              style={{
                maxWidth: "60px",
                maxHeight: "60px",
                borderRadius: "8px",
              }}
            />
            <Typography variant="h6" color="gray" sx={{ fontSize: "12px" }}>
              {flight.airline}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon sx={{ marginRight: "8px" }} />
              <Typography variant="body1" style={{ display: "flex" }}>
                {formattedDepartureTime}
                <svg
                  width="64"
                  height="6"
                  viewBox="0 0 64 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ paddingTop: "7px" }}
                >
                  <path
                    d="M64 3.00001L59 0.113255L59 5.88676L64 3.00001ZM-3.51825e-08 3.5L32 3.5L32 2.5L3.51825e-08 2.5L-3.51825e-08 3.5ZM32 3.5L59.5 3.50001L59.5 2.50001L32 2.5L32 3.5Z"
                    fill="currentColor"
                  ></path>
                  <circle cx="29" cy="3" r="3" fill="currentColor"></circle>
                </svg>{" "}
                {formattedArrivalTime}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {flight.origin} - {flight.destination}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AirplanemodeActiveIcon sx={{ marginRight: "8px" }} />
              <Typography variant="body1">{flight.duration}</Typography>
            </Box>
            {flight.stopover && (
              <Typography variant="body2" color="text.secondary">
                {flight.stopover}
              </Typography>
            )}
          </Grid>
          <Box>
            <Typography fontWeight="bold" fontSize="18px" color="secondary">
              {flight.price}
            </Typography>
            <div style={{ marginTop: "8px" }}>
              <span
                color="primary"
                onClick={() => handleSelect(flight)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  textTransform: "none",
                  zIndex: "20",
                }}
              >
                {isReturn ? "Select Return Flight" : "Select Flight"}
              </span>
            </div>
          </Box>
        </Grid>
      </AccordionSummary>
      {showReturn && (
        <AccordionDetails>
          <Card variant="outlined" sx={{ p: 2 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography>
                    <FlightTakeoffIcon sx={{ verticalAlign: "middle" }} />{" "}
                    {isReturn ? flight.destination : flight.origin}
                    <svg
                      width="64"
                      height="6"
                      viewBox="0 0 64 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M64 3.00001L59 0.113255L59 5.88676L64 3.00001ZM-3.51825e-08 3.5L32 3.5L32 2.5L3.51825e-08 2.5L-3.51825e-08 3.5ZM32 3.5L59.5 3.50001L59.5 2.50001L32 2.5L32 3.5Z"
                        fill="currentColor"
                      ></path>
                      <circle cx="29" cy="3" r="3" fill="currentColor"></circle>
                    </svg>{" "}
                    {isReturn ? flight.origin : flight.destination}
                  </Typography>
                </Grid>
                {flight.stopover && (
                  <Grid item xs={12} md={6}>
                    <Typography>⏳ Stopover: {flight.stopover}</Typography>
                  </Grid>
                )}
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography> Aircraft: {flight.aircraft}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography> Seat Pitch: {flight.seatPitch}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography> CO₂ Emissions: {flight.emission}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </AccordionDetails>
      )}
    </Accordion>
  );
};
