import React, { useState } from 'react';
import { Container } from '@mui/material';
import RegisterForm from '../../components/auth/RegisterForm';
import { authApiService } from '../../api/authApiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';

const RegisterPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (formData: any) => {
    try {
      const { token, userRole } = await authApiService.register(formData);
      login(token, userRole);
      navigate('/');
    } catch {
      setError('Ошибка при регистрации. Попробуйте снова.');
    }
  };

  return (
    <Container maxWidth="sm">
      <RegisterForm onSubmit={handleRegister} error={error} />
    </Container>
  );
};

export default RegisterPage;
