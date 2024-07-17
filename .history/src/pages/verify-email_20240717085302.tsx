"use client";

import { useState } from "react";
import { verifyEmail } from "../services/authentication";

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
    height: "100vh",
    flexDirection: "column",
  },
  title_form: {
    fontSize: "36px",
    fontWeight: "600",
    fontFamily
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
    padding: "10px",
    borderRadius: "16px",
    border: "none",
    marginTop: "20px",
  },
};

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await verifyEmail(email, code);
      setMessage(response.message);
      setError("");
    } catch (error: any) {
      setError(error.message || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div style={styles.container_form}>
      <h1 style={styles.title_form}>Verify Email</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form style={styles.container_register} onSubmit={handleSubmit}>
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
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button style={styles.btn_valid} type="submit">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
