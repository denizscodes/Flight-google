import * as React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Chip,
} from "@mui/material";
// Google Maps React için gerekli kütüphane
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const destinations = [
  {
    name: "Lisbon",
    image: "./lisbon.png", // Görsel dosya adını buraya ekleyin
    price: "$ 549",
    dates: "Jun 12 - Jun 19",
    stops: "Nonstop · 5 hr 25 min",
  },
  {
    name: "Los Angeles",
    image: "./la.png", // Görsel dosya adını buraya ekleyin
    price: "$ 327",
    dates: "Mar 24 - Mar 30",
    stops: "2 stops · 17 hr 5 min",
  },
  {
    name: "İstanbul",
    image: "./is.png", // Görsel dosya adını buraya ekleyin
    price: "$ 496",
    dates: "Mar 1 - Mar 7",
    stops: "Nonstop · 1 hr 10 min",
  },
  {
    name: "Singapore",
    image: "./singapore.png", // Görsel dosya adını buraya ekleyin
    price: "$ 640", // Fiyatı buraya ekleyin
    dates: "Feb 27 - Mar 6",
    stops: "4 stops · 17 hr 5 min", // Uçuş süresini buraya ekleyin
  },
];

const FlightFinder: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCHDi8ImHv1t9D69rX4rAn9sIy4VdEwK3Y", // Google Maps API anahtarınızı buraya ekleyin
    libraries: ["places"], // Yerler kütüphanesi gerekiyorsa
  });

  const center = { lat: 39, lng: 35 }; // Harita için Ankara'nın koordinatları

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Find cheap flights from Ankara to anywhere
      </Typography>
      <Box sx={{ display: "flex", gap: 2, margin: "10px" }}>
        <Chip label="Tokyo" color="primary" />
        <Chip label="Paris" />
        <Chip label="Los Angeles" />
        <Chip label="Ankara" />
      </Box>

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "400px",
            borderRadius: "10px",
          }}
          center={center}
          zoom={3} // Uygun yakınlaştırma düzeyini ayarlayın
        >
          {/* Marker ekleyin, örneğin */}
          <MarkerF position={center} />
        </GoogleMap>
      ) : (
        <p>Yükleniyor...</p>
      )}

      <ImageList sx={{ marginTop: 2 }} cols={4} gap={8}>
        {destinations.map((destination) => (
          <ImageListItem key={destination.name}>
            <img
              src={destination.image}
              alt={destination.name}
              loading="lazy"
              style={{ borderRadius: "10px", maxHeight: "200px" }}
            />
            <ImageListItemBar
              title={destination.name}
              style={{ borderRadius: "10px" }}
              subtitle={
                <span>
                  {destination.price}
                  <br />
                  {destination.dates}
                  <br />
                  {destination.stops}
                </span>
              }
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default FlightFinder;
