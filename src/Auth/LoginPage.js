import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Define allowed credentials
  const allowedCredentials = [
    { email: "owais@gmail.com", password: "Awais1" },
    { email: "user@example.com", password: "user123" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the provided credentials are valid
    const isValid = allowedCredentials.some(
      (cred) => cred.email === email && cred.password === password
    );

    if (isValid) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/admin-panel"); // Navigate to Admin Panel after successful login
      } catch (err) {
        setError("Failed to login. Please try again.");
        console.error("Login error:", err);
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
