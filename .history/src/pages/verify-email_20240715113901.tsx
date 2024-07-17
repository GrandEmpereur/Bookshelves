"use client";

import { useState } from 'react';
import { verifyEmail } from '../services/authentication';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await verifyEmail(email, code);
      setMessage(response.message);
      setError('');
    } catch (error: any) {
      setError(error.message || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Verify Email</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Verification Code" value={code} onChange={(e) => setCode(e.target.value)} required />
        <button type="submit">Verify Email</button>
      </form>
    </div>
  );
};

export default VerifyEmail;
