import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import HotelCard from '../../components/hotels/HotelCard';
import { Hotel } from '../../entities/hotel';
import { hotelApiService } from '../../api/hotelApiService';
import SearchBar from "../../components/common/SearchBar";
import CustomButton from '../../components/common/CustomButton';
import { Link } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';

const HotelListPage: React.FC = () => {
  const { role } = useAuth();
  
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await hotelApiService.getHotels();
        setHotels(data);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить список отелей.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{borderRadius: 2, p: 5, mb: 8 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">Список отелей</Typography>

            {role === 'admin' && (
            <CustomButton component={Link} href="/admin/hotels" variant="contained" color="primary">
                Добавить отель
            </CustomButton>
            )}
        </Box>

        <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Поиск по названию или городу"
            />
      </Paper>
      

      {loading && (
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <CircularProgress />
        </Grid>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && !filteredHotels.length && (
        <Typography variant="body1">Отели не найдены.</Typography>
      )}

      <Grid container spacing={2}>
        {filteredHotels.map((hotel) => (
          <Grid key={hotel.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <HotelCard
              id={hotel.id}
              name={hotel.name}
              city={hotel.city}
              starRating={hotel.starRating}
              imageUrl={hotel.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HotelListPage;