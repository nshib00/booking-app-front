import React, { useState } from 'react';
import { Container } from '@mui/material';
import LoginForm from '../../components/auth/LoginForm';
import { authApiService } from '../../api/authApiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { token, userRole } = await authApiService.login({ email, password });
      login(token, userRole);
      navigate('/');
      console.error(error);
    } catch {
      setError('Неверный email или пароль.');
    }
  };

  return (
    <Container maxWidth="sm">
      <LoginForm onSubmit={handleLogin} error={error} />
    </Container>
  );
};

export default LoginPage;
