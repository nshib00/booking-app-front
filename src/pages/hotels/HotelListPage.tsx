import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Box, Paper, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid';
import HotelCard from '../../components/hotels/HotelCard';
import { Hotel } from '../../entities/hotel';
import { hotelApiService } from '../../api/hotelApiService';
import SearchBar from "../../components/common/SearchBar";
import { useAuth } from '../../shared/hooks/useAuth';


const PAGE_SIZE = 6;

const HotelListPage: React.FC = () => {
  const { role } = useAuth();
  
  const [hotels, setHotels] = useState<Hotel[]>([]);  // Инициализируем пустым массивом
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);  // Состояние текущей страницы
  const [totalPages, setTotalPages] = useState<number>(0);  // Общее количество страниц
  
  // Запрос данных отелей с пагинацией
  const fetchHotels = async (page: number, pageSize: number) => {
    try {
      const data = await hotelApiService.getHotels({ page, pageSize });  // Передаем параметры пагинации
      if (Array.isArray(data.items)) {
        setHotels(data.items);
        setTotalPages(Math.ceil(data.totalCount / pageSize));  // Вычисляем общее количество страниц
      } else {
        throw new Error('Неверный формат данных');
      }
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить список отелей.');
    } finally {
      setLoading(false);
    }
  };

  // Загружаем данные при изменении страницы или поискового запроса
  useEffect(() => {
    setLoading(true);  // Сбрасываем загрузку при смене страницы
    fetchHotels(page, PAGE_SIZE);  // Передаем текущую страницу и размер страницы
  }, [page]);

  // Фильтрация отелей по поисковому запросу
  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{borderRadius: 2, p: 5, mb: 8 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">Список отелей</Typography>
        </Box>

        <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Поиск по названию или городу"
        />
      </Paper>
      
      {/* Загрузка данных */}
      {loading && (
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <CircularProgress />
        </Grid>
      )}

      {/* Ошибка при загрузке */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Если данные загрузились и ничего не найдено */}
      {!loading && !error && !filteredHotels.length && (
        <Typography variant="body1">Отели не найдены.</Typography>
      )}

      {/* Отображение отелей */}
      <Grid container spacing={5}>
        {filteredHotels.map((hotel) => (
          <Grid key={hotel.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <HotelCard
              id={hotel.id}
              name={hotel.name}
              address={hotel.address}
              city={hotel.city}
              starRating={hotel.starRating}
              minRoomPrice={hotel.minRoomPrice}
              imageUrl={hotel.imageUrl}
            />
          </Grid>
        ))}
      </Grid>

      {/* Пагинация */}
      {!loading && totalPages > 1 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}  // Обработка смены страницы
          />
        </Box>
      )}
    </Container>
  );
};

export default HotelListPage;
