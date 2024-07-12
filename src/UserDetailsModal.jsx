import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UserDetailsModal = ({ open, onClose, user }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: 15,
          padding: "10px 20px",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : "white",
          color: theme.palette.mode === "dark" ? "white" : "black",
        },
      }}
    >
      <DialogTitle>
        User Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Email:</strong> {user.email}
        </DialogContentText>
        <DialogContentText>
          <strong>Password:</strong> {user.password}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ borderRadius: 50 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsModal;
