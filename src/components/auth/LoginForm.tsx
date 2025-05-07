import React, { useState } from 'react';
import { TextField } from '@mui/material';
import BaseAuthForm from './BaseAuthForm';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <BaseAuthForm
      title="Вход"
      error={error}
      onSubmit={handleSubmit}
      submitButtonText="Войти"
      bottomText="Еще нет аккаунта?"
      bottomLinkText="Зарегистрироваться"
      bottomLinkTo="/register"
    >
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Пароль"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </BaseAuthForm>
  );
};

export default LoginForm;
