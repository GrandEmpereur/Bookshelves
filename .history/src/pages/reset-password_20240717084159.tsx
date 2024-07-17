"use client";

import React, { useState } from "react";
import { resetPassword, verifyResetToken } from "../services/authentication";
import { useRouter } from "next/router";

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
    padding: "20px",
    borderRadius: "16px",
    outline: "none",
    border: "none",
  },
};

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await verifyResetToken(token);
      router.push(`/reset-password?userId=${response.userId}`);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message: string } } }).response?.data
          ?.message || "Invalid or expired token";
      setError(errorMessage);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = router.query.userId as string;
    try {
      const response = await resetPassword(userId, newPassword);
      setMessage(response.message);
      setError("");
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message: string } } }).response?.data
          ?.message || "An error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div style={styles.container_form}>
      <h1 style={styles.title_form}>Reset Password</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!router.query.userId && (
        <form onSubmit={handleVerifyToken}>
          <input
            style={styles.input_field}
            type="text"
            placeholder="Reset Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
          <button style={styles.btn_valid} type="submit">
            Verify Token
          </button>
        </form>
      )}
      {router.query.userId && (
        <form onSubmit={handleResetPassword}>
          <input
            style={styles.input_field}
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button style={styles.btn_valid} type="submit">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
