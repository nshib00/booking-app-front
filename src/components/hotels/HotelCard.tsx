import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

interface HotelCardProps {
  id: number;
  name: string;
  city: string;
  address: string;
  starRating: number;
  minRoomPrice?: number;
  imageUrl?: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ id, name, address, city, starRating, minRoomPrice, imageUrl }) => {
  const renderStars = (rating: number) => (
    <Box sx={{ display: 'flex', gap: 0.3 }}>
      {Array.from({ length: rating }).map((_, index) => (
        <StarIcon key={index} sx={{ color: '#fbc02d', fontSize: 18 }} />
      ))}
    </Box>
  );

  const placeholderUrl = 'https://placehold.co/350x180?text=Нет+изображения';

  return (
    <Card sx={{
      width: 350,
      height: 420,
      m: 1,
      borderRadius: 3,
      boxShadow: 2,
      transition: '0.3s',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': { boxShadow: 6 }
    }}>
      <CardMedia
        component="img"
        height="180"
        image={imageUrl && imageUrl.trim() !== '' ? imageUrl : placeholderUrl}
        alt={name}
        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      />
      <CardContent sx={{
        flexGrow: 1,   // ← контент растягивается по оставшемуся месту
        display: 'flex',
        flexDirection: 'column',
        p: 2
      }}>
        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
          {name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          {renderStars(starRating)}
          {minRoomPrice && (
            <Typography variant="body2" sx={{ fontWeight: 400 }}>
              от {minRoomPrice} ₽/ночь
            </Typography>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {city}<br />{address}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Button
            component={Link}
            to={`/hotels/${id}`}
            variant="contained"
            fullWidth
            size="small"
            sx={{ textTransform: 'none' }}
          >
            Подробнее
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
