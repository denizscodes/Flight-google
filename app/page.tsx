"use client";
import { useState } from "react";
import { Container, Box, Button, Alert } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";

// Import custom components
import { FlightSearchHeader } from "@/components/FlightSearchHeader";
import { TripTypeSelector } from "@/components/TripTypeSelector";
import { PassengerSelector } from "@/components/PassengerSelector";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import { FlightResults } from "@/components/FlightResults";
import FlightFinder from "@/components/FlightFinder";
import TravelPlanningTools from "@/components/UsefulTools";
import TravelInfo from "@/components/TravelInfo";

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

export default function FlightSearch() {
  // State declarations
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [airportSuggestions, setAirportSuggestions] = useState<Airport[]>([]);
  const [loadingAirports, setLoadingAirports] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [origin, setOrigin] = useState<Airport | null>(null);
  const [destination, setDestination] = useState<Airport | null>(null);
  const [logo, setLogo] = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [isOneWay, setIsOneWay] = useState(false);
  const [cabinClass, setCabinClass] = useState("economy");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showDeparture, setShowDeparture] = useState(true);

  const fetchAirportSuggestions = async (query: string) => {
    if (query.length < 2) {
      setAirportSuggestions([]);
      return;
    }

    setLoadingAirports(true);
    setError(null);

    try {
      const response = await fetch(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            "X-RapidAPI-Key": `${process.env.RAPIDAPI_KEY}`,
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status && Array.isArray(result.data)) {
        setAirportSuggestions(result.data);
      }
    } catch (error) {
      setError("Failed to fetch airports. Please try again.");
      setAirportSuggestions([]);
    } finally {
      setLoadingAirports(false);
    }
  };

  const handleSearch = async () => {
    if (!origin?.skyId || !destination?.skyId || !departureDate) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formattedDepartureDate = format(departureDate, "yyyy-MM-dd");
      const formattedReturnDate = returnDate
        ? format(returnDate, "yyyy-MM-dd")
        : "";

      const response = await fetch(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?` +
          `originSkyId=${origin.skyId}&destinationSkyId=${destination.skyId}` +
          `&originEntityId=${origin.entityId}&destinationEntityId=${destination.entityId}` +
          `&date=${formattedDepartureDate}&returnDate=${formattedReturnDate}&` +
          `cabinClass=${cabinClass}&adults=${adults}&children=${children}&infants=${infants}&` +
          `sortBy=best&currency=USD&market=en-US&countryCode=US`,
        {
          headers: {
            "X-RapidAPI-Key": `${process.env.RAPIDAPI_KEY}`,
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status && result.data?.itineraries?.length > 0) {
        const formattedFlights = result.data.itineraries.map(
          (itinerary: any) => {
            const flightLeg = itinerary.legs[0];
            return {
              airline: flightLeg.segments[0].marketingCarrier.name,
              price: itinerary.price.formatted,
              departureTime: flightLeg.departure,
              arrivalTime: flightLeg.arrival,
              origin: flightLeg.origin.city,
              destination: flightLeg.destination.city,
              logo: flightLeg.carriers.marketing[0].logoUrl,
            };
          }
        );
        setFlights(formattedFlights);
      } else {
        setFlights([]);
        setError("No flights found for this route.");
      }
    } catch (error) {
      setError("Failed to search flights. Please try again.");
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDeparture = (flight: Flight) => {
    setShowDeparture(false);
  };

  const handleSelectReturn = (flight: Flight) => {
    // Handle return flight selection
    console.log("Return flight selected:", flight);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg">
        <FlightSearchHeader />
        <Box
          sx={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Gölge ekledik
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              mb: 3,
              boxShadow: "black",
            }}
          >
            <TripTypeSelector isOneWay={isOneWay} setIsOneWay={setIsOneWay} />
            <PassengerSelector
              adults={adults}
              children={children}
              infants={infants}
              cabinClass={cabinClass}
              setAdults={setAdults}
              setChildren={setChildren}
              setInfants={setInfants}
              setCabinClass={setCabinClass}
            />
          </Box>

          <FlightSearchForm
            origin={origin}
            destination={destination}
            departureDate={departureDate}
            returnDate={returnDate}
            isOneWay={isOneWay}
            airportSuggestions={airportSuggestions}
            loadingAirports={loadingAirports}
            setOrigin={setOrigin}
            setDestination={setDestination}
            setDepartureDate={setDepartureDate}
            setReturnDate={setReturnDate}
            fetchAirportSuggestions={fetchAirportSuggestions}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 4,
            marginTop: "-15px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
            sx={{ width: "200px", borderRadius: "15px" }}
          >
            Explore
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <FlightResults
          flights={flights}
          loading={loading}
          error={error}
          showDeparture={showDeparture}
          returnDate={returnDate}
          onSelectDeparture={handleSelectDeparture}
          onSelectReturn={handleSelectReturn}
        />

        <FlightFinder />
        <TravelPlanningTools />
        <TravelInfo />
      </Container>
    </LocalizationProvider>
  );
}
