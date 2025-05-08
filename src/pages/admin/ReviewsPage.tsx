import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import LeftPanel from '../../components/admin/LeftPanel';
import { reviewApiService } from '../../api/reviewApiService';
import { Review } from '../../entities/review';


const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewApiService.getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userEmail', headerName: 'Пользователь', width: 200 },
    { field: 'hotelName', headerName: 'Отель', width: 200 },
    { field: 'rating', headerName: 'Оценка', width: 100, type: 'number' },
    { field: 'comment', headerName: 'Комментарий', width: 400 },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <LeftPanel />
      <Box sx={{ flexGrow: 1, pl: 8 }}>
        <Typography sx={{ mb: 3 }} variant="h4" gutterBottom>Управление отзывами</Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={reviews}
            columns={columns}
            paginationModel={{ pageSize: 10, page: 0 }}
            pageSizeOptions={[10, 25, 50]}
          />
        )}
      </Box>
    </Box>
  );
};

export default ReviewsPage;
