// pages/login.js

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

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
      router.push("/dashboard"); // Exemple de redirection vers une page dashboard
    } catch (error) {
      console.error("Échec de la connexion :", error);
      setLoading(false);
      setError("Adresse email ou mot de passe incorrect.");
    }
  };

  return (
    <main style={{ textAlign: "center" }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <label>Email :</label>
            <input type="text" name="email" />
          </div>
          <div>
            <label>Mot de passe :</label>
            <input type="password" name="password" />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading ? (
            <div>Chargement en cours...</div>
          ) : (
            <button type="submit">Se connecter</button>
          )}
        </div>
      </form>
    </main>
  );
}

export default Login;
