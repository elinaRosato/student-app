'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    termsAccepted: false,
  });

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp); // Toggle between login and signup form
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-semibold mb-6">{isSignUp ? 'Sign Up' : 'Login'}</h1>

      {/* Form */}
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {isSignUp && (
          <>
            {/* First Name and Last Name */}
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </>
        )}

        {/* Email */}
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
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
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
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {isSignUp && (
          <>
            {/* Terms of Use */}
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                className="mr-2"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              <label htmlFor="termsAccepted" className="text-sm text-gray-700">
                I accept the{' '}
                <a href="/terms" className="text-blue-500 hover:text-blue-700">
                  Terms of Use
                </a>
              </label>
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="flex justify-between items-center mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
          <button
            type="button"
            onClick={handleToggleForm}
            className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
}
