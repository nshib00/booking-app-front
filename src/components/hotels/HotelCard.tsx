import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

interface HotelCardProps {
  id: number;
  name: string;
  city: string;
  starRating: number;
  imageUrl: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ id, name, city, starRating, imageUrl }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const isAuthenticated = !!token;

    const renderStars = (rating: number) => {
      return (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {Array.from({ length: rating }).map((_, index) => (
            <StarIcon key={index} sx={{ color: '#fbc02d' }} />
          ))}
        </Box>
      );
    };
  
    return (
      <Card sx={{ maxWidth: 345, m: 1 }}>
        <CardMedia
          component="img"
          height="180"
          image={imageUrl}
          alt={name}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          {renderStars(starRating)}
          <Typography variant="body2" color="text.secondary">
            Город: {city}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button component={Link} to={`/hotels/${id}`} variant="contained" size="small">
              Подробнее
            </Button>
            {isAuthenticated && role === 'admin' && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button color="secondary" variant="outlined" component={Link} to={`/hotels/${id}/update`}>
                  Редактировать
                </Button>
                <Button component={Link} to={`/hotels/${id}/delete`} variant="outlined" color="error" size="small">
                  Удалить
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };
  
  export default HotelCard;