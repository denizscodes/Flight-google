import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  SvgIcon,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";

const travelPlanningToolsData = [
  {
    icon: <CalendarTodayIcon />,
    title: "Find the days with the cheapest flight prices",
    description:
      "The calendar and price chart make it easier for you to find the best flight deals.",
  },
  {
    icon: <TrendingUpIcon />,
    title: "Keep track thanks to price information",
    description:
      "Price history and trend data show when you should book to get the best price for your flight.",
  },
  {
    icon: <NotificationsIcon />,
    title: "Watch prices for a trip",
    description:
      "Not ready to book yet? You can monitor price changes for a route or flight and get notified when prices drop.",
  },
];

const TravelPlanningTools: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Useful tools for finding the best deals
          </Typography>
          {travelPlanningToolsData.map((tool) => (
            <Card
              key={tool.title}
              sx={{ marginBottom: 2, background: "#f3f7ff", color: "black" }}
            >
              <CardHeader
                avatar={
                  <SvgIcon
                    color="action"
                    sx={{ fontSize: 30, color: "#1b73e8" }}
                  >
                    {tool.icon}
                  </SvgIcon>
                }
                title={tool.title}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {tool.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Meaningful tools to facilitate travel planning
          </Typography>
          <Typography variant="body1" paragraph>
            If your travel plans are flexible, use the form above to search for
            a specific trip. You can then use the calendar and price graph
            options on the search page to find the cheapest days to fly to your
            destination - or both.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img src="/calendar.png" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TravelPlanningTools;
