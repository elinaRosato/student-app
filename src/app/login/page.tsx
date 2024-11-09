'use client';

import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';
import RecoverPasswordForm from '../components/RecoverPasswordForm';

export default function LoginPage() {
  const [currentForm, setCurrentForm] = useState('login'); // 'login' | 'signup' | 'recover'
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      {currentForm === 'login' && (
        <LoginForm onSwitch={() => setCurrentForm('signup')} onRecover={() => setCurrentForm('recover')} />
      )}
      {currentForm === 'signup' && (
        <SignUpForm onSwitch={() => setCurrentForm('login')} />
      )}
      {currentForm === 'recover' && (
        <RecoverPasswordForm onSwitch={() => setCurrentForm('login')} />
      )}
    </div>
  );
}
