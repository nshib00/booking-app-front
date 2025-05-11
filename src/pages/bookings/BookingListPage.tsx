import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Paper, Divider, Box, CardMedia } from '@mui/material';
import { bookingApiService } from '../../api/bookingApiService';
import { Booking } from '../../entities/booking';

const BookingListPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = await bookingApiService.getBookings();
        setBookings(allBookings);
      } catch (err) {
        setError('Не удалось загрузить список бронирований. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Мои бронирования
      </Typography>
      {!bookings.length ? (
        <Typography>У вас пока нет оформленных бронирований.</Typography>
      ) : (
        bookings.map((booking) => (
          <Paper key={booking.id} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Бронирование #{booking.id}
            </Typography>

            {booking.room ? (
              <>
                {booking.room.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={booking.room.imageUrl}
                    alt={`Изображение комнаты ${booking.room.name}`}
                    sx={{ borderRadius: 1, mb: 2 }}
                  />
                )}

                <Typography variant="subtitle1"><strong>Тип номера:</strong> {booking.room.name}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>{booking.room.description}</Typography>

                {booking.room.hotel && (
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle2"><strong>Отель:</strong> {booking.room.hotel.name}</Typography>
                    <Typography variant="body2">{booking.room.hotel.city}, {booking.room.hotel.address}</Typography>
                  </Box>
                )}

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography><strong>Цена за ночь:</strong> {booking.room.price}₽</Typography>
                  <Typography><strong>Даты проживания:</strong> с {new Date(booking.dateFrom).toLocaleDateString()} по {new Date(booking.dateTo).toLocaleDateString()} (всего дней: {booking.totalDays})</Typography>
                  <Typography><strong>Итоговая стоимость:</strong> {booking.totalCost}₽</Typography>
                </Box>
              </>
            ) : (
              <Typography color="error">Информация о комнате недоступна.</Typography>
            )}

          </Paper>
        ))
      )}
    </Container>
  );
};

export default BookingListPage;
