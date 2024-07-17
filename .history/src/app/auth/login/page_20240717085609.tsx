"use client";

import React, { useState } from "react";
import { login } from "../../../services/authentication";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    fontFamily: "sans-serif",
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
    fontSize: "18px",
    cursor: "pointer",
  },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.token);
      router.push("/feed");
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message: string } } }).response?.data
          ?.message || "An error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div style={styles.container_form}>
      <h1 style={styles.title_form}>Sign in </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign in</button>
      </form>
      <Link href="/forgot-password">Forgot Password?</Link>
    </div>
  );
};

export default Login;
