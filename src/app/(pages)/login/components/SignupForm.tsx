'use client';

import { FormEvent, useState } from 'react';
import { signup } from '../actions';

export default function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signup(new FormData(e.target as HTMLFormElement));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-4xl font-semibold mb-6">Sign Up</h1>
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
      <div className="mb-6 flex items-center">
        <input
        type="checkbox"
        id="termsAccepted"
        name="termsAccepted"
        className="mr-2"
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
        required
        />
        <label htmlFor="termsAccepted" className="text-sm text-gray-700">
        I accept the{' '}
        <a href="/terms" className="text-blue-500 hover:text-blue-700">
            Terms of Use
        </a>
        </label>
    </div>
      <div className="flex justify-between items-center mb-4">
        <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Sign Up</button>
      </div>
      <button type="button" onClick={onSwitch} className="text-blue-500">Already have an account? Login</button>
    </form>
  );
}
