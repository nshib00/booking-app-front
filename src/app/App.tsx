import '../assets/styles/App.css'
import { Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '../components/common/Navbar'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          {AppRouter}
        </Routes>
      </Container>
    </>
  );
}

export default App;
