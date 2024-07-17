"use client";

import { useState } from "react";
import { register, verifyEmail } from "../../../services/authentication";
import { useRouter } from "next/navigation";

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
    <div>
      <h1>Register</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isRegistered ? (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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

          <button type="submit"></button>
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
