"use client";

import React, { useState } from 'react';
import { resetPassword, verifyResetToken } from '../services/authentication';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await verifyResetToken(token);
      router.push(`/reset-password?userId=${response.userId}`);
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message: string } } }).response?.data?.message || 'Invalid or expired token';
      setError(errorMessage);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = router.query.userId as string;
    try {
      const response = await resetPassword(userId, newPassword);
      setMessage(response.message);
      setError('');
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message: string } } }).response?.data?.message || 'An error occurred';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!router.query.userId && (
        <form onSubmit={handleVerifyToken}>
          <input type="text" placeholder="Reset Token" value={token} onChange={(e) => setToken(e.target.value)} required />
          <button type="submit">Verify Token</button>
        </form>
      )}
      {router.query.userId && (
        <form onSubmit={handleResetPassword}>
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
