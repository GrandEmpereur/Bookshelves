"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";

function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://bookish.empereur.me/api/user/profile")
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Erreur de chargement du profil: {error.message}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={profile.avatar}
              alt={profile.name}
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <Typography variant="h5">{profile.name}</Typography>
            <Typography variant="body1">{profile.email}</Typography>
            <Typography variant="body1">{profile.bio}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
