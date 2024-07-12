import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "./Redux/Slices/userSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Slide,
  IconButton,
  Snackbar,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogin = () => {
    // Simulate login logic (replace with actual authentication)
    if (username === "user" && password === "password") {
      dispatch(setLoggedIn()); // Dispatch action to set logged in state
      onClose(); // Close modal
      setSnackbarOpen(true); // Open snackbar
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleToggleMode = () => {
    setIsRegister(!isRegister);
    setError("");
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: {
            borderRadius: 15,
            padding: "10px 20px",
          },
        }}
      >
        <DialogTitle>
          {isRegister ? "Register" : "Login"}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isRegister
              ? "Please enter your details to register."
              : "Please enter your username and password."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error !== ""}
            helperText={error}
            sx={{ marginBottom: 2 }}
          />
          {isRegister && (
            <TextField
              margin="dense"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggleMode} sx={{ borderRadius: 50 }}>
            {isRegister
              ? "Already have an account? Sign In"
              : "Don't have an account? Register"}
          </Button>
          <Button onClick={onClose} sx={{ borderRadius: 50 }}>
            Cancel
          </Button>
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 50, boxShadow: 3 }}
          >
            {isRegister ? "Register" : "Login"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {isRegister ? "Registration Successful!" : "Login Successful!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginModal;
