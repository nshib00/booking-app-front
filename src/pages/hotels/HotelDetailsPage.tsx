import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Hotel } from '../../entities/hotel';
import { hotelApiService } from '../../api/hotelApiService';
import { Box, Typography, Card, CardMedia, CardContent, Button, Chip, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import BackButton from '../../components/common/BackButton';

const HotelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        if (id) {
          const data = await hotelApiService.getHotelById(parseInt(id));
          setHotel(data);
        }
      } catch (err) {
        setError('Не удалось загрузить данные отеля.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const renderStars = (rating: number) => (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {Array.from({ length: rating }).map((_, index) => (
        <StarIcon key={index} sx={{ color: '#fbc02d' }} />
      ))}
    </Box>
  );

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!hotel) return <Typography>Отель не найден.</Typography>;

  const placeholderUrl = 'https://placehold.co/800x300?text=Нет+изображения';

  return (
    <Card sx={{ maxWidth: 800, margin: '0 auto', mt: 4, p: 2 }}>
      <CardMedia
        component="img"
        height="300"
        image={hotel.imageUrl && hotel.imageUrl.trim() !== '' ? hotel.imageUrl : placeholderUrl}
        alt={hotel.name}
        sx={{ borderRadius: 2 }}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {hotel.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          {renderStars(hotel.starRating)}
          {hotel.minRoomPrice !== undefined && (
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              от {hotel.minRoomPrice} ₽/ночь
            </Typography>
          )}
        </Box>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {hotel.city}, {hotel.address}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ mb: 2 }}>
          {hotel.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mb: 1 }}>
          Услуги отеля:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {hotel.services.length > 0 ? (
            hotel.services.map(service => (
              <Chip
                key={service.id}
                label={`${service.name} (${service.price === 0 ? 'включено' : service.price + '₽'})`}
                color="primary"
                variant="outlined"
              />
            ))
          ) : (
            <Typography variant="body2">Нет информации об услугах.</Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" component={Link} to={`/hotels/${hotel.id}/rooms`}>
            Показать номера
          </Button>
          <BackButton label="Назад к списку" url="/"/>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HotelDetailPage;
