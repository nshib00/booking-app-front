// src/theme.ts
import { createTheme } from '@mui/material/styles';
import "@fontsource/inter";

export const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    primary: {
      main: '#28d19e',   // Бирюзово-зелёный
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFB74D',   // Персиковый
      contrastText: '#ffffff',
    },
    background: {
      default: '#F9FAFB',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
