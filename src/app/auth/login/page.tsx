"use client";

import React, { useState } from "react";
import { login } from "../../../services/authentication";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from 'zod';
import { loginSchema } from '@/services/validationSchema';

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
      loginSchema.parse({ email, password });

      const response = await login(email, password);
      router.push('/feed');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError(error.message || 'An error occurred');
      }
    }
  };

  return (
    <div style={{ ...styles.container_form, flexDirection: "column" as React.CSSProperties['flexDirection'] }}>
      <h1 style={styles.title_form}>Sign in </h1>
      <p style={styles.sub_title}>Please sign in to continue our app</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form style={{...styles.container_register,  flexDirection: "column" as React.CSSProperties['flexDirection']}} onSubmit={handleSubmit}>
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
        <button style={styles.btn_valid} type="submit">
          Sign in
        </button>
      </form>
      <Link href="/forgot-password">Forgot Password?</Link>
    </div>
  );
};

export default Login;
