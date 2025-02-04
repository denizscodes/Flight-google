import * as React from "react";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const destinations = [
  {
    name: "İstanbul",
    image: "is.png", // Görsel dosya adını buraya ekleyin
  },
  {
    name: "Antalya",
    image: "./antalya.png", // Görsel dosya adını buraya ekleyin
  },
  {
    name: "İzmir",
    image: "./izmir.png", // Görsel dosya adını buraya ekleyin
  },
  {
    name: "London",
    image: "./london.png", // Görsel dosya adını buraya ekleyin
  },
  {
    name: "Los Angeles",
    image: "la.png", // Görsel dosya adını buraya ekleyin
  },

  // Diğer hedefleri buraya ekleyin
];

const faqs = [
  {
    question: "How do I find last-minute flight deals?",
    answer:
      " Finding last minute flights with Google Flights is easy. Just select your departure and destination cities in the form at the top of the page . Then use the calendar to select your travel dates and find the cheapest prices for each. You can even search for flights starting today. To find the cheapest prices, it's a good idea to book domestic flights a few weeks in advance and international flights a few months in advance.",
  },
  {
    question: "How do I find cheap flights for a weekend trip?",
    answer:
      "Google Flights makes it easy to find deals on weekend getaways and even week-long trips. Just enter your departure and destination cities at the top of the page . Then open the date picker and select a travel duration to see how the round-trip price changes on different days. You can also adjust the type of trip to see one-way prices only. The cheapest available flights are highlighted and easy to find. Once you've decided on specific travel dates, select Search to see flight options and book the deal. You can also turn on price tracking to get alerts when the price of a route or flight changes", // Cevabı buraya ekleyin
  },
  {
    question: "How do I find flight deals if my travel plans are flexible?",
    answer:
      "It's easy to search for flights, even if you don't have any specific plans yet. 1. Tap Explore at the top of the page . 2. Then tap the calendar icon. 3. Turn on Flexible travel dates and select a date range or length of trip. 4. Tap Done. The cheapest available flights will be highlighted on the map. Tap the destination to see the available flight options, then select and book accordingly. Price information and other useful tools will help you find more options that fit your schedule and budget.", // Cevabı buraya ekleyin
  },
  {
    question: "How do I find cheap flights to any destination?",
    answer:
      "Google Flights helps you find cheap flights to destinations all over the world. Just enter your departure city, select Anywhere as your destination, then select Explore . You can select specific dates, or leave the return dates blank if you're flexible. You'll see the cheapest prices for popular destinations.You can filter the results to only show nonstop flights or flights up to a certain price to make it easier to plan your perfect budget trip.If you've already got a destination in mind, you can turn on price tracking to get alerts when the price of a route or flight changes.",
  },
  {
    question: "How can I receive flight notifications for my trip?",
    answer:
      "You can monitor flight prices for specific dates or, if you're flexible with your planning, for any period of time. If you want to receive notifications about flights for a specific round trip, select the dates and flights and then click Search . You can then activate price tracking.", // Cevabı buraya ekleyin
  },
];

const popularRoutes = [
  "New York to London",
  "New York to Paris",
  "London to Paris",
  "New York to Rome",
  "Montreal to Paris",
  "London to Milan",
  "Toronto to London",
  "New York to Milan",
  "London to Dubai",
  "London to Tokyo",
  "Madrid to Rome",
  "London to Delhi",
  "New York to Los Angeles",
  "Paris to Marrakech",
  "Sao Paulo to London",
];

const TravelInfo: React.FC = () => {
  return (
    <Box sx={{ margin: "0 auto", padding: 3 }}>
      {" "}
      {/* Merkezleme için maxWidth ve margin ekleyin */}
      <Typography variant="h5" gutterBottom>
        Popular destinations from Ankara
      </Typography>
      <ImageList cols={5} gap={8} sx={{ overflowX: "visible" }}>
        {" "}
        {/* Kaydırılabilir hale getirmek için overflowX ekleyin */}
        {destinations.map((destination) => (
          <ImageListItem key={destination.name}>
            <img
              src={destination.image}
              alt={destination.name}
              loading="lazy"
              style={{ borderRadius: "10px" }}
            />
            <ImageListItemBar
              title={destination.name}
              position="below"
              style={{
                color: "white",
                fontWeight: "bold",
                padding: "0px 0px 10px 10px",
                marginTop: "-30px",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq) => (
        <Accordion key={faq.question}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Find cheap flights on popular routes
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {popularRoutes.map((route) => (
          <Link
            href="#"
            underline="hover"
            key={route}
            sx={{ marginRight: 2, marginBottom: 1 }}
          >
            Flights from {route}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default TravelInfo;
