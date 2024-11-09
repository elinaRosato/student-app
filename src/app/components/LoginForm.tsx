'use client';

import { FormEvent, useState } from 'react';
import { login } from '../login/actions';

export default function LoginForm({ onSwitch, onRecover }: { onSwitch: () => void; onRecover: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(new FormData(e.target as HTMLFormElement));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-4xl font-semibold mb-6">Login</h1>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Login</button>
        <button type="button" onClick={onRecover} className="text-blue-500">Forgot Password?</button>
      </div>
      <button type="button" onClick={onSwitch} className="text-blue-500">Don’t have an account? Sign Up</button>
    </form>
  );
}
