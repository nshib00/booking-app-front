import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import LeftPanel from '../../components/admin/LeftPanel';
import { userApiService } from '../../api/userApiService';
import { User } from '../../entities/user';

const drawerWidth = 240;

const UsersPage = () => {
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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Роль', width: 150 },
    { field: 'createdAt', headerName: 'Дата регистрации', width: 200 },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <LeftPanel />
      <Box sx={{ flexGrow: 1, pl: 8, m: 1 }}>
        <Typography sx={{ mb: 3 }} variant="h4" gutterBottom>Управление пользователями</Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={users}
            columns={columns}
          />
        )}
      </Box>
    </Box>
  );
};

export default UsersPage;
