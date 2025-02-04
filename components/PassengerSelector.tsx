import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface PassengerSelectorProps {
  adults: number;
  children: number;
  infants: number;
  cabinClass: string;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
  setInfants: (value: number) => void;
  setCabinClass: (value: string) => void;
}

export const PassengerSelector = ({
  adults,
  children,
  infants,
  cabinClass,
  setAdults,
  setChildren,
  setInfants,
  setCabinClass,
}: PassengerSelectorProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
        onClick={() => setOpenModal(true)}
      >
        <PersonIcon />
        <Typography variant="h6">{adults + children + infants}</Typography>
        <KeyboardArrowDownIcon />
      </Box>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="passenger-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Select Passengers and Cabin Class
          </Typography>

          <TextField
            fullWidth
            label="Adults"
            type="number"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            InputProps={{ inputProps: { min: 1 } }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Children"
            type="number"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Infants"
            type="number"
            value={infants}
            onChange={(e) => setInfants(Number(e.target.value))}
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            onClick={() => setOpenModal(false)}
            fullWidth
          >
            Save and Close
          </Button>
        </Box>
      </Modal>
      <Select
        value={cabinClass}
        onChange={(e) => setCabinClass(e.target.value)}
        label="Cabin Class"
      >
        <MenuItem value="economy">Economy</MenuItem>
        <MenuItem value="premium_economy">Premium Economy</MenuItem>
        <MenuItem value="business">Business</MenuItem>
        <MenuItem value="first">First</MenuItem>
      </Select>
    </Box>
  );
};
