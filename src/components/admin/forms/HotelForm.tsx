import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { HotelFormValues, HotelService } from '../../../entities/hotel';

interface HotelFormProps {
  initialValues: HotelFormValues;
  onSubmit: (values: HotelFormValues) => void;
}

const HotelForm = ({ initialValues, onSubmit }: HotelFormProps) => {
  const [form, setForm] = useState<HotelFormValues>({ ...initialValues });
  const [newService, setNewService] = useState<{ name: string; price: number }>({ name: '', price: 0 });
  const [errors, setErrors] = useState<{ starRating?: string }>({});

  const handleChange = (field: keyof HotelFormValues, value: any) => {
    setForm({ ...form, [field]: value });

    if (field === 'starRating') {
      setErrors((prev) => ({ ...prev, starRating: undefined }));
    }
  };

  const addService = () => {
    if (!newService.name || newService.price <= 0) return;
    const newServ: HotelService = {
      id: Date.now(), // временный id на фронте
      hotelId: 0,
      name: newService.name,
      price: newService.price,
    };
    setForm({ ...form, services: [...form.services, newServ] });
    setNewService({ name: '', price: 0 });
  };

  const removeService = (id: number) => {
    setForm({ ...form, services: form.services.filter((s) => s.id !== id) });
  };

  const validate = () => {
    const newErrors: { starRating?: string } = {};
    if (form.starRating < 1 || form.starRating > 5) {
      newErrors.starRating = 'Количество звёзд должно быть от 1 до 5';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
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
        label="Описание"
        value={form.description}
        onChange={(e) => handleChange('description', e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={3}
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
        inputProps={{ min: 1, max: 5 }}
        error={!!errors.starRating}
        helperText={errors.starRating}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Ссылка на изображение (imageUrl)"
        value={form.imageUrl}
        onChange={(e) => handleChange('imageUrl', e.target.value)}
        fullWidth
        margin="normal"
      />

      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Услуги
      </Typography>
      {form.services.map((s) => (
        <Box key={s.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ flexGrow: 1 }}>
            {s.name} — {s.price} ₽
          </Typography>
          <Button size="small" color="error" onClick={() => removeService(s.id)}>
            Удалить
          </Button>
        </Box>
      ))}
      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <TextField
          label="Название услуги"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          size="small"
        />
        <TextField
          label="Цена"
          type="number"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
          size="small"
        />
        <Button onClick={addService} variant="contained">
          Добавить
        </Button>
      </Box>

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Сохранить
      </Button>
    </Box>
  );
};

export default HotelForm;
