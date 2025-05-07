import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { authApiService } from '../../api/authApiService';

const adminMenuItems = [
  { text: 'Отели', path: '/admin/hotels' },
  { text: 'Пользователи', path: '/admin/users' },
  { text: 'Отзывы', path: '/admin/reviews' },
];

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');

  const isAuthenticated = token;
  const displayName = email;

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElAdmin, setAnchorElAdmin] = React.useState<null | HTMLElement>(null);

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAdminMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAdmin(event.currentTarget);
  };
  const handleCloseAdminMenu = () => {
    setAnchorElAdmin(null);
  };

  const handleLogout = () => {
    authApiService.logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ zIndex: 1000 }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontSize: '25px' }}
        >
          MyBooking
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Отели
          </Button>
        </Box>

        {role === 'user' && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/my-bookings">
              Мои бронирования
            </Button>
          </Box>
        )}

        {isAuthenticated && role === 'admin' && (
          <>
            <Button
              color="inherit"
              endIcon={<ArrowDropDownIcon />}
              onClick={handleAdminMenu}
            >
              Админ-панель
            </Button>
            <Menu
              anchorEl={anchorElAdmin}
              open={Boolean(anchorElAdmin)}
              onClose={handleCloseAdminMenu}
            >
              {adminMenuItems.map((item) => (
                <MenuItem
                  key={item.text}
                  component={Link}
                  to={item.path}
                  onClick={handleCloseAdminMenu}
                >
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}

        {!isAuthenticated && (
          <Box sx={{ ml: 2 }}>
            <Button color="inherit" component={Link} to="/login">
              Войти
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Регистрация
            </Button>
          </Box>
        )}

        {isAuthenticated && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton size="large" edge="end" color="inherit" onClick={handleUserMenu}>
              <AccountCircle />
            </IconButton>
            <Typography variant="body1" sx={{ mr: 1, ml: 1 }}>
              {displayName}
            </Typography>

            <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
              {role === 'user' && (
                <MenuItem component={Link} to="/profile" onClick={handleCloseUserMenu}>
                  Профиль
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
