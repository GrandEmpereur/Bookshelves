"use client";
import { useState } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // const email = event.target.elements.email.value;
    // const password = event.target.elements.password.value;

    const form = event.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;


    try {
      const response = await axios.post(
        "https://bookish.empereur.me/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login réussi !", response.data);
      setLoading(false);
      // Redirection vers une page sécurisée après login
      router.push("/"); // Exemple de redirection vers une page dashboard
    } catch (error) {
      console.error("Échec de la connexion :", error);
      setLoading(false);
      setError("Adresse email ou mot de passe incorrect.");
    }
  };

  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Connexion
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          label="Mot de passe"
          name="password"
          type="password"
          variant="outlined"
          required
          fullWidth
        />
        {error && <Typography color="error">{error}</Typography>}
        {loading ? (
          <CircularProgress />
        ) : (
          <Button type="submit" variant="contained" color="primary">
            Se connecter
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Login;
