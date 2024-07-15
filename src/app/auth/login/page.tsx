"use client";

import React, { useState } from 'react';
import { login } from '../../../services/authentication';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      router.push('/feed');
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message: string } } }).response?.data?.message || 'An error occurred';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <Link href="/forgot-password">Forgot Password?</Link>
    </div>
  );
};

export default Login;
