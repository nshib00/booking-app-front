import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { roomApiService } from '../../api/roomApiService';
import { bookingApiService } from '../../api/bookingApiService';
import { Room } from '../../entities/room';
import { BookingBase } from '../../entities/booking';
import { Box, Typography, Button, Divider, Snackbar, Alert } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import BackButton from '../../components/common/BackButton';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomIdParam = searchParams.get('roomId');

  const roomId = parseInt(roomIdParam || '', 10);
  const [room, setRoom] = useState<Room | null>(null);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await roomApiService.getRoomById(roomId);
        setRoom(data);
      } catch (err) {
        setError('Не удалось загрузить номер.');
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(roomId)) {
      fetchRoom();
    } else {
      setError('Некорректный ID номера.');
      setLoading(false);
    }
  }, [roomId]);

  const handleDateFromChange = (newValue: Dayjs | null) => setDateFrom(newValue);
  const handleDateToChange = (newValue: Dayjs | null) => setDateTo(newValue);

  const handleSubmit = async () => {
    if (!dateFrom || !dateTo || !room) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const newBooking: BookingBase = {
        roomId: room.id,
        dateFrom: dateFrom.format('YYYY-MM-DD'),
        dateTo: dateTo.format('YYYY-MM-DD'),
      };
      await bookingApiService.createBooking(newBooking);

      setSnackbarMessage('Бронирование успешно! Сейчас откроется меню бронирований.');
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate('/my-bookings');
      }, 3000);

    } catch (err) {
      setError('Не удалось забронировать номер.');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>Бронирование номера</Typography>

      <Typography variant="h6" gutterBottom>{room?.name}</Typography>
      <Typography variant="body1" gutterBottom>{room?.description}</Typography>
      <Typography variant="body1" gutterBottom>Цена: {room?.price} ₽/ночь</Typography>

      <Divider sx={{ my: 3 }} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ mb: 2 }}>
          <DesktopDatePicker
            label="Дата заезда"
            format="DD/MM/YYYY"
            value={dateFrom}
            onChange={handleDateFromChange}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <DesktopDatePicker
            label="Дата выезда"
            format="DD/MM/YYYY"
            value={dateTo}
            onChange={handleDateToChange}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Box>
      </LocalizationProvider>

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Подтвердить бронирование
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />
      <BackButton />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingPage;
