import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

interface RegisterFormProps {
  onSubmit: (formData: any) => void;
  error?: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, error }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    password: '',
    confirmPassword: ''
  });

  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Пароли не совпадают.');
      return;
    }

    setLocalError(null);
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
      {(error || localError) && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error || localError}
        </Typography>
      )}
      <TextField
        label="Имя пользователя"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Имя"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Фамилия"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Дата рождения"
        name="birthDate"
        type="date"
        value={formData.birthDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Пароль"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Повторите пароль"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Зарегистрироваться
      </Button>
    </Box>
  );
};

export default RegisterForm;
