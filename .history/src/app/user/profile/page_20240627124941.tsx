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
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";

function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const token =
    "oat_MjE.WEI3dU9tTGJDZWJpbmxjamt4b1RmOUMzVDJLTW9acVRpT3hIVUZCeDI0NjgwODI1NDM";

  useEffect(() => {
    axios
      .get("https://bookish.empereur.me/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { name, email, bio } = response.data;
        setProfile(response.data);
        setName(name);
        setEmail(email);
        setBio(bio);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the profile data:", error);
        setError(error);
        setLoading(false);
      });
  }, [token]);

  const handleSubmit = () => {
    axios
      .put(
        "https://bookish.empereur.me/api/user/profile",
        {
          name,
          email,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setError(error);
      });
  };

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
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Mettre à jour le profil
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
