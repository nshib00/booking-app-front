import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { HotelFormValues } from '../../../entities/hotel';

interface HotelFormProps {
  initialValues: HotelFormValues;
  onSubmit: (values: HotelFormValues) => void;
}

const HotelForm = ({ initialValues, onSubmit }: HotelFormProps) => {
  const [form, setForm] = useState<HotelFormValues>(initialValues);

  const handleChange = (field: keyof HotelFormValues, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
      <TextField
        label="Название"
        value={form.name}
        onChange={(e) => handleChange('name', e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Город"
        value={form.city}
        onChange={(e) => handleChange('city', e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Адрес"
        value={form.address}
        onChange={(e) => handleChange('address', e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Количество звёзд"
        type="number"
        value={form.starRating}
        onChange={(e) => handleChange('starRating', Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Сохранить
      </Button>
    </Box>
  );
};

export default HotelForm;
