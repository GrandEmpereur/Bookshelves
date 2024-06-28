
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
        console.log(response.data); // Log the data to the console
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the profile data:", error);
        setError(error);
        setLoading(false);
      });
  }, [token]);

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
