import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

interface ReviewFormProps {
  initialValues: {
    hotelId: number;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
  };
  onSubmit: (values: {
    hotelId: number;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
  }) => void;
}

const ReviewForm = ({ initialValues, onSubmit }: ReviewFormProps) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === 'rating' || name === 'hotelId' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}
    >
      <TextField
        label="Оценка (1–5)"
        name="rating"
        type="number"
        inputProps={{ min: 1, max: 5 }}
        value={formValues.rating}
        onChange={handleChange}
        required
      />

      <TextField
        label="Комментарий"
        name="comment"
        multiline
        rows={4}
        value={formValues.comment}
        onChange={handleChange}
        required
      />

      <TextField
        label="ID Пользователя"
        name="userId"
        value={formValues.userId}
        onChange={handleChange}
        required
      />

      <TextField
        label="ID Отеля"
        name="hotelId"
        type="number"
        value={formValues.hotelId}
        onChange={handleChange}
        required
      />

      <TextField
        label="Дата создания"
        name="createdAt"
        value={formValues.createdAt}
        onChange={handleChange}
        type="datetime-local"
        disabled
      />

      <Button type="submit" variant="contained">
        Сохранить
      </Button>
    </Box>
  );
};

export default ReviewForm;
