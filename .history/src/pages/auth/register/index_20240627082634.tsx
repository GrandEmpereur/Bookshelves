import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Input } from "@nextui-org/input";

function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const response = await axios.post(
        "https://bookish.empereur.me/auth/register",
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
    <main style={{ textAlign: "center" }}>
      <h2>Sign up now</h2>
      <p>Please fill the details and create account</p>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input type="email" label="Email" />
        <Input type="email" label="Email" placeholder="Enter your email" />
      </div>
      <form onSubmit={onSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <label>Nom d'utilisateur:</label>
            <input type="text" name="username" />
          </div>

          <div>
            <label>Email:</label>
            <input type="text" name="email" />
          </div>

          <div>
            <label>Mot de passe:</label>
            <input type="password" name="password" />
          </div>

          {loading ? (
            <div>Chargement en cours...</div>
          ) : (
            <button type="submit">S'inscrire</button>
          )}
        </div>
      </form>
    </main>
  );
}

export default Register;
