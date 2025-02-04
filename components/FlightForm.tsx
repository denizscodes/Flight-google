// components/FlightForm.tsx
import React from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

interface Airport {
  name: string;
  entityId: string;
}

interface FlightFormProps {
  airportSuggestions: Airport[];
  loadingAirports: boolean;
  origin: string;
  destination: string;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setOriginEntityId: (entityId: string) => void;
  setDestinationEntityId: (entityId: string) => void;
}

const FlightForm: React.FC<FlightFormProps> = ({
  airportSuggestions,
  loadingAirports,
  origin,
  destination,
  setOrigin,
  setDestination,
  setOriginEntityId,
  setDestinationEntityId,
}) => {
  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrigin(e.target.value);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Autocomplete
        freeSolo
        options={airportSuggestions.map((airport) => airport.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Origin Airport"
            variant="outlined"
            value={origin}
            onChange={handleOriginChange}
            onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
              const selectedAirport = airportSuggestions.find(
                (airport) => airport.name === e.target.value
              );
              setOriginEntityId(selectedAirport?.entityId || "");
            }}
          />
        )}
      />

      <Autocomplete
        freeSolo
        options={airportSuggestions.map((airport) => airport.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Destination Airport"
            variant="outlined"
            value={destination}
            onChange={handleDestinationChange}
            onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
              const selectedAirport = airportSuggestions.find(
                (airport) => airport.name === e.target.value
              );
              setDestinationEntityId(selectedAirport?.entityId || "");
            }}
          />
        )}
      />

      {loadingAirports && <CircularProgress />}
    </div>
  );
};

export default FlightForm;
