import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Hotel } from '../../entities/hotel';
import { hotelApiService } from '../../api/hotelApiService';
import { Box, Typography, Card, CardMedia, CardContent, Button, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

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

  return (
    <Card sx={{ maxWidth: 800, margin: '0 auto', mt: 4, p: 2 }}>
      <CardMedia
        component="img"
        height="300"
        image={hotel.imageUrl}
        alt={hotel.name}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {hotel.name}
        </Typography>
        {renderStars(hotel.starRating)}
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {hotel.city}, {hotel.address}
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          {hotel.description}
        </Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Услуги отеля:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {hotel.services.length > 0 ? (
            hotel.services.map(service => (
              <Chip key={service.id} label={`${service.name} (${!service.price ? 'включено' : service.price + '₽'})`} />
            ))
          ) : (
            <Typography variant="body2">Нет информации об услугах.</Typography>
          )}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" component={Link} to="/booking">
            Забронировать
          </Button>
          <Button variant="outlined" component={Link} to="/" sx={{ ml: 2 }}>
            Назад к списку
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HotelDetailPage;
