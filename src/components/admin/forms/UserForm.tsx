import { Box, Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { UserBase } from '../../../entities/user';

interface UserFormProps {
  initialValues: UserBase & { role?: string };
  onSubmit: (values: UserBase & { role: string }) => void;
}

const UserForm = ({ initialValues, onSubmit }: UserFormProps) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    birthDate: '',
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {
      userName: form.userName ? '' : 'Имя пользователя обязательно',
      email: emailRegex.test(form.email) ? '' : 'Некорректный email',
      firstName: form.firstName ? '' : 'Имя обязательно',
      lastName: form.lastName ? '' : 'Фамилия обязательна',
      birthDate: form.birthDate ? '' : 'Дата рождения обязательна',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === '');
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form as UserBase & { role: string });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
      <TextField
        label="Имя пользователя"
        value={form.userName}
        onChange={(e) => handleChange('userName', e.target.value)}
        error={!!errors.userName}
        helperText={errors.userName}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={form.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Имя"
        value={form.firstName}
        onChange={(e) => handleChange('firstName', e.target.value)}
        error={!!errors.firstName}
        helperText={errors.firstName}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Фамилия"
        value={form.lastName}
        onChange={(e) => handleChange('lastName', e.target.value)}
        error={!!errors.lastName}
        helperText={errors.lastName}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Дата рождения"
        type="date"
        value={form.birthDate}
        onChange={(e) => handleChange('birthDate', e.target.value)}
        error={!!errors.birthDate}
        helperText={errors.birthDate}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Роль"
        select
        value={form.role || 'user'}
        onChange={(e) => handleChange('role', e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="user">Пользователь</MenuItem>
        <MenuItem value="admin">Администратор</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Сохранить
      </Button>
    </Box>
  );
};

export default UserForm;
