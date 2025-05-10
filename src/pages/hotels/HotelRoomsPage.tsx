import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { roomApiService } from '../../api/roomApiService';
import { Room } from '../../entities/room';
import { Box, Typography, Card, CardMedia, CardContent, Button, Chip, Divider } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import PeopleIcon from '@mui/icons-material/People';
import BedIcon from '@mui/icons-material/Bed';
import BackButton from '../../components/common/BackButton';

const HotelRoomsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const hotelId = parseInt(id || '', 10);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await roomApiService.getRoomsByHotel(hotelId);
        setRooms(data);
      } catch (err) {
        setError('Не удалось загрузить список номеров.');
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(hotelId)) {
      fetchRooms();
    } else {
      setError('Некорректный ID отеля.');
      setLoading(false);
    }
  }, [hotelId]);

  const placeholderUrl = 'https://placehold.co/400x200?text=Нет+изображения';

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Доступные номера</Typography>

      {rooms.length === 0 ? (
        <Typography>Нет доступных номеров.</Typography>
      ) : (
        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 2 }}>
          {rooms.map(room => (
            <Card
              key={room.id}
              sx={{ width: 300, height: 450, flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="img"
                height="180"
                image={room.imageUrl && room.imageUrl.trim() !== '' ? room.imageUrl : placeholderUrl}
                alt={room.name}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{room.name}</Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  <Chip icon={<BedIcon />} label={`${room.price} ₽/ночь`} size="small" />
                  <Chip icon={<HotelIcon />} label={`Номеров осталось: ${room.quantity}`} size="small" />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {room.description}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ textTransform: 'none', mt: 1 }}
                    component={Link}
                    to={`/booking?roomId=${room.id}`}
                  >
                    Забронировать
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      <Divider sx={{ my: 3 }} />
      <BackButton label="Назад к отелю" url={`/hotels/${hotelId}`}/>
    </Box>
  );
};

export default HotelRoomsPage;
