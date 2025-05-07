import React, { useState } from 'react';
import { TextField } from '@mui/material';
import BaseAuthForm from './BaseAuthForm';

interface RegisterFormProps {
  onSubmit: (formData: {
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
  }) => void;
  error?: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, error }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <BaseAuthForm
      title="Регистрация"
      error={error}
      onSubmit={handleSubmit}
      submitButtonText="Зарегистрироваться"
      bottomText="Уже есть аккаунт?"
      bottomLinkText="Войти"
      bottomLinkTo="/login"
    >
      <TextField label="Имя пользователя" name="userName" value={formData.userName} onChange={handleChange} required />
      <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      <TextField label="Пароль" name="password" type="password" value={formData.password} onChange={handleChange} required />
      <TextField label="Имя" name="firstName" value={formData.firstName} onChange={handleChange} required />
      <TextField label="Фамилия" name="lastName" value={formData.lastName} onChange={handleChange} required />
      <TextField
        label="Дата рождения"
        name="birthDate"
        type="date"
        value={formData.birthDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
    </BaseAuthForm>
  );
};

export default RegisterForm;
