import {
  Box,
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const PassengerModal = ({
  open,
  onClose,
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  cabinClass,
  setCabinClass,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          width: 400,
          padding: 3,
          margin: "auto",
          bgcolor: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" id="modal-title">
          Select Passengers and Cabin Class
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Cabin Class</InputLabel>
          <Select
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
          >
            <MenuItem value="economy">Economy</MenuItem>
            <MenuItem value="premium_economy">Premium Economy</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="first">First</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Adults"
          type="number"
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          InputProps={{ inputProps: { min: 1 } }}
        />
        <TextField
          fullWidth
          label="Children"
          type="number"
          value={children}
          onChange={(e) => setChildren(Number(e.target.value))}
          InputProps={{ inputProps: { min: 0 } }}
        />
        <TextField
          fullWidth
          label="Infants"
          type="number"
          value={infants}
          onChange={(e) => setInfants(Number(e.target.value))}
          InputProps={{ inputProps: { min: 0 } }}
        />
        <Button variant="contained" onClick={onClose} fullWidth>
          Save and Close
        </Button>
      </Box>
    </Modal>
  );
};

export default PassengerModal;
