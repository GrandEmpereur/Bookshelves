"use client";

import React, { useState } from 'react';
import { forgotPassword, verifyResetToken, resetPassword } from '../services/authentication';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email);
      setMessage(response.message);
      setError('');
      setStep(2);
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message: string } } }).response?.data?.message || 'An error occurred';
      setError(errorMessage);
      setMessage('');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await verifyResetToken(code);
      setUserId(response.userId);
      setMessage(response.message);
      setError('');
      setStep(3);
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message: string } } }).response?.data?.message || 'An error occurred';
      setError(errorMessage);
      setMessage('');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await resetPassword(userId, newPassword);
      setMessage(response.message);
      setError('');
      router.push('/login');
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message: string } } }).response?.data?.message || 'An error occurred';
      setError(errorMessage);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {step === 1 && (
        <form onSubmit={handleForgotPassword}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Send Reset Code</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVerifyCode}>
          <input type="text" placeholder="Verification Code" value={code} onChange={(e) => setCode(e.target.value)} required />
          <button type="submit">Verify Code</button>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
