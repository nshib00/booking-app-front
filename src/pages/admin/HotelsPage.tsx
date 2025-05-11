import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import LeftPanel from '../../components/admin/LeftPanel';
import { hotelApiService } from '../../api/hotelApiService';
import { Hotel } from '../../entities/hotel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useNavigate } from 'react-router-dom';

const HotelsPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await hotelApiService.getHotels();
        setHotels(data);
      } catch (error) {
        console.error('Ошибка при загрузке отелей:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить этот отель?');
    if (confirmed) {
      try {
        await hotelApiService.deleteHotel(id);
        setHotels(hotels.filter(hotel => hotel.id !== id));
      } catch (error) {
        console.error('Ошибка при удалении отеля:', error);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 50, flex: 0.2 },
    { field: 'name', headerName: 'Название', minWidth: 250, flex: 1.5 },
    { field: 'city', headerName: 'Город', minWidth: 200, flex: 1.2 },
    { field: 'address', headerName: 'Адрес', minWidth: 300, flex: 2 },
    { field: 'starRating', headerName: 'Звезды', type: 'number', minWidth: 150, flex: 0.7 },
    {
      field: 'rooms',
      headerName: 'Номера',
      type: 'actions',
      minWidth: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<MeetingRoomIcon />}
          label="Управление номерами"
          onClick={() => navigate(`/admin/hotels/rooms/${params.id}`)}
          showInMenu={false}
        />,
      ],
    },
    {
      field: 'actions',
      headerName: 'Действия',
      type: 'actions',
      minWidth: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Редактировать"
          onClick={() => navigate(`/admin/hotels/${params.id}/edit`)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Удалить"
          onClick={() => handleDelete(Number(params.id))}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <LeftPanel />
      <Box sx={{ flexGrow: 1, pl: 8 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Управление отелями</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/hotels/create')}
          >
            Добавить отель
          </Button>
        </Stack>

        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={hotels}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            pageSizeOptions={[10, 25, 50]}
          />
        )}
      </Box>
    </Box>
  );
};

export default HotelsPage;
