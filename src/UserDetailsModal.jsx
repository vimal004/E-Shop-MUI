import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedOut } from "./Redux/Slices/userSlice";

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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        User Details
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          <strong>Email:</strong> {user?.email}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogout} color="primary" variant="contained">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsModal;
