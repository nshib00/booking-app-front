import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import LeftPanel from '../../components/admin/LeftPanel';
import { userApiService } from '../../api/userApiService';
import { User } from '../../entities/user';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userApiService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить этого пользователя?');
    if (confirmed) {
      try {
        await userApiService.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 320 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'firstName', headerName: 'Имя', width: 200 },
    { field: 'lastName', headerName: 'Фамилия', width: 200 },
    { field: 'birthDate', headerName: 'Дата рождения', width: 170 },
    {
      field: 'actions',
      headerName: 'Действия',
      type: 'actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Редактировать"
          onClick={() => navigate(`/admin/users/${params.id}/edit`)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Удалить"
          onClick={() => handleDelete(params.id as string)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <LeftPanel />
      <Box sx={{ flexGrow: 1, pl: 8 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Управление пользователями</Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={users}
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

export default UsersPage;
