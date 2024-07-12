import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedOut } from "../Redux/Slices/userSlice";
import CloseIcon from "@mui/icons-material/Close";

// Styling for the closeButton IconButton
const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));

const UserDetailsModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user[0]);

  const handleLogout = () => {
    dispatch(setLoggedOut());
    onClose(); // Close the modal after logging out
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        style: {
          borderRadius: 12, // Rounded corners
          padding: "16px", // Padding inside the card
          position: "absolute",
          top: 56, // Adjust top position as needed
          right: 20, // Adjust right position as needed
          width: "240px", // Fixed width to maintain square appearance
          height: "240px", // Fixed height to maintain square appearance
        },
      }}
    >
      <DialogContent dividers>
        <Typography gutterBottom>
          <strong>Email:</strong> {user?.email}
          <br></br>
          <strong>Delivery Address:</strong>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogout} color="primary" variant="contained">
          Logout
        </Button>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsModal;
