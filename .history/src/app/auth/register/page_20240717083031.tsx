"use client";

import { useState } from "react";
import { register, verifyEmail } from "../../../services/authentication";
import { useRouter } from "next/navigation";

const styles = {
  container_register: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    width: "70%",
  },
  container_form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
    flexDirection: "column",
  },
  title_form: {
    fontSize: "36px",
    fontWeight: "600",
  },
  sub_title: {
    marginTop: "10px",
    marginBottom: "50px",
    color: "#7D848D",
  },
  input_field: {
    backgroundColor: "#F7F7F9",
    border: "1px solid #F7F7F9",
    padding: "20px",
    margin: "15px 0px",
    borderRadius: "20px",
  },
  btn_valid: {
    backgroundColor: "#0D6EFD",
    color: "white",
    width: "20%",
    padding: "10px",
    borderRadius: "16px",
    jus
  },
  messageSuccess: {
    color: "green",
  },
  messageError: {
    color: "red",
  },
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [verificationCode, setVerificationCode] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(username, email, password, role);
      setMessage(response.message);
      setIsRegistered(true);
      setError("");
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message: string } } }).response?.data
          ?.message || "An error occurred";
      setError(errorMessage);
      setMessage("");
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await verifyEmail(email, verificationCode);
      setMessage(response.message);
      setError("");
      // Optionally redirect to login or inform the user of successful verification
      router.push("/auth/login");
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message: string } } }).response?.data
          ?.message || "An error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div style={styles.container_form}>
      <h1 style={styles.title_form}>Sign up now</h1>
      <p style={styles.sub_title}>Please fill the details and create account</p>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isRegistered ? (
        <form onSubmit={handleRegister} style={styles.container_register}>
          <input
            style={styles.input_field}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            style={styles.input_field}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input_field}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p style={styles.sub_title}>Password must be 8 character</p>

          <button style={styles.btn_valid} type="submit">
            Sign Up
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyEmail}>
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit">Verify Email</button>
        </form>
      )}
    </div>
  );
};

export default Register;
