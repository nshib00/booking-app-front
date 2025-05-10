import { Box, Button, TextField, Input, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useState } from 'react';

interface RoomFormProps {
  initialValues: {
    hotelId: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };
  onSubmit: (values: {
    hotelId: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }) => void;
}

const RoomForm = ({ initialValues, onSubmit }: RoomFormProps) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valuesToSubmit = {
      ...formValues,
      imageFile: imageFile
    };
    onSubmit(valuesToSubmit);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <TextField
        label="Название"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        required
      />

      <TextField
        label="Описание"
        name="description"
        value={formValues.description}
        onChange={handleChange}
        required
        multiline
        rows={4}
      />

      <TextField
        label="Цена"
        name="price"
        type="number"
        value={formValues.price}
        onChange={handleChange}
        required
      />

      <FormControl>
        <InputLabel htmlFor="image-file">Изображение</InputLabel>
        <Input
          id="image-file"
          type="file"
          name="imageFile"
          onChange={handleFileChange}
        />
        {imageFile && <FormHelperText>Выбран файл: {imageFile.name}</FormHelperText>}
      </FormControl>

      <Button type="submit" variant="contained">
        Сохранить
      </Button>
    </Box>
  );
};

export default RoomForm;
