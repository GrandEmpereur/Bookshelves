"use client";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const response = await axios.post(
        "https://bookish.empereur.me/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      console.log("Inscription réussie !", response.data);
      setLoading(false);
      // Optionnel : Rediriger vers une page de confirmation ou de connexion
      // router.push("/confirmation");
      // router.push("/login");
    } catch (error) {
      console.error("Échec de l'inscription :", error);
      setLoading(false);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sign up now
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please fill the details and create account
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          label="Nom d'utilisateur"
          name="username"
          variant="filled"
          required
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="filled"
          required
          fullWidth
        />
        <TextField
          label="Mot de passe"
          name="password"
          type="password"
          variant="filled"
          required
          fullWidth
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Register;
