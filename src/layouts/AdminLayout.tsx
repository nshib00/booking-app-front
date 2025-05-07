import { Outlet, Link, useLocation } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, CssBaseline } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Navbar from '../components/common/Navbar';

const drawerWidth = 240;

const menuItems = [
  { text: 'Отели', icon: <HotelIcon />, path: '/admin/hotels' },
  { text: 'Пользователи', icon: <PeopleIcon />, path: '/admin/users' },
  { text: 'Отзывы', icon: <RateReviewIcon />, path: '/admin/reviews' },
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        sx={{
          width: drawerWidth,
          borderRight: '1px solid #ddd',
          backgroundColor: '#f9f9f9',
          height: '100vh',
          position: 'fixed',
          top: '64px',  // Сдвиг на высоту верхней панели
          left: 0,
          zIndex: (theme) => theme.zIndex.appBar - 1,
        }}
      >
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                selected={isActive}
                sx={{
                  ...(isActive && {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }),
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: isActive ? 'bold' : 'normal' }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* Основной контент */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,  // Отступ слева для контента, чтобы он не перекрывался боковой панелью
          pl: 2,
          mt: 8, // Отступ сверху, чтобы не перекрывалось под верхней панелью
        }}
      >
        <Outlet />
      </Box>
    </Box>
      </main>
    </>
  );
};

export default AdminLayout;
