import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Button } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import LeftPanel from '../../components/admin/LeftPanel';
import { roomApiService } from '../../api/roomApiService';
import { Room } from '../../entities/room';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';


const RoomsPage = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await roomApiService.getRoomsByHotel(Number(hotelId));
        setRooms(data);
      } catch (error) {
        console.error('Ошибка при загрузке номеров:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [hotelId]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить этот номер?');
    if (confirmed) {
      try {
        await roomApiService.deleteRoom(id);
        setRooms(rooms.filter(room => room.id !== id));
      } catch (error) {
        console.error('Ошибка при удалении номера:', error);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'roomNumber', headerName: 'Номер комнаты', width: 150 },
    { field: 'type', headerName: 'Тип', width: 150 },
    { field: 'price', headerName: 'Цена (₽)', width: 150, type: 'number' },
    { field: 'capacity', headerName: 'Вместимость', width: 150, type: 'number' },
    {
      field: 'actions',
      headerName: 'Действия',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Редактировать"
          onClick={() => navigate(`/admin/hotels/rooms/edit/${params.id}`)}
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
        <Typography variant="h4" gutterBottom>Управление номерами</Typography>
        <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate(`/admin/hotels/${hotelId}rooms/create`)}
          >
            Добавить номер отеля
          </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={rooms}
            columns={columns}
            paginationModel={{ pageSize: 10, page: 0 }}
            pageSizeOptions={[10, 25, 50]}
          />
        )}
      </Box>
    </Box>
  );
};

export default RoomsPage;
