import { Box, Autocomplete, TextField, CircularProgress } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

interface Airport {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
  };
}
interface FlightSearchFormProps {
  origin: Airport | null;
  destination: Airport | null;
  departureDate: Date | null;
  returnDate: Date | null;
  isOneWay: boolean;
  airportSuggestions: Airport[];
  loadingAirports: boolean;
  setOrigin: (airport: Airport | null) => void;
  setDestination: (airport: Airport | null) => void;
  setDepartureDate: (date: Date | null) => void;
  setReturnDate: (date: Date | null) => void;
  fetchAirportSuggestions: (query: string) => void;
}

export const FlightSearchForm = ({
  origin,
  destination,
  departureDate,
  returnDate,
  isOneWay,
  airportSuggestions,
  loadingAirports,
  setOrigin,
  setDestination,
  setDepartureDate,
  setReturnDate,
  fetchAirportSuggestions,
}: FlightSearchFormProps) => (
  <Box sx={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
    <Box sx={{ display: "flex", gap: 2, width: "60%", minWidth: "300px" }}>
      <Autocomplete
        fullWidth
        options={airportSuggestions}
        getOptionLabel={(option) => option.presentation.suggestionTitle || ""}
        loading={loadingAirports}
        value={origin}
        onChange={(_, newValue) => setOrigin(newValue)}
        onInputChange={(_, newValue) => fetchAirportSuggestions(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Where from"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingAirports && <CircularProgress size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          const temp = origin;
          setOrigin(destination);
          setDestination(temp);
        }}
      >
        <SwapHorizIcon />
      </Box>

      <Autocomplete
        fullWidth
        options={airportSuggestions}
        getOptionLabel={(option) => option.presentation.suggestionTitle || ""}
        loading={loadingAirports}
        value={destination}
        onChange={(_, newValue) => setDestination(newValue)}
        onInputChange={(_, newValue) => fetchAirportSuggestions(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Where to"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingAirports && <CircularProgress size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>

    <Box sx={{ display: "flex", gap: 2, width: "30%", minWidth: "300px" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Departure"
          value={departureDate}
          onChange={(newDate) => setDepartureDate(newDate)}
          slots={{
            textField: TextField,
          }}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />
        {!isOneWay && (
          <DatePicker
            label="Return"
            value={returnDate}
            onChange={(newDate) => setReturnDate(newDate)}
            slots={{
              textField: TextField,
            }}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        )}
      </LocalizationProvider>
    </Box>
  </Box>
);
