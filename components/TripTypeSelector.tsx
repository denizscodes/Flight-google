import { Button } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface TripTypeSelectorProps {
  isOneWay: boolean;
  setIsOneWay: (value: boolean) => void;
}

export const TripTypeSelector = ({
  isOneWay,
  setIsOneWay,
}: TripTypeSelectorProps) => (
  <Button
    variant="outlined"
    sx={{ color: "black", border: "none" }}
    onClick={() => setIsOneWay(!isOneWay)}
  >
    {isOneWay ? (
      <>
        Round Trip <SyncAltIcon />
      </>
    ) : (
      <>
        One Way <ArrowForwardIcon />
      </>
    )}
  </Button>
);
