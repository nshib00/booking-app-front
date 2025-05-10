import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import HotelCard from '../../components/hotels/HotelCard';
import { Hotel } from '../../entities/hotel';
import { hotelApiService } from '../../api/hotelApiService';
import SearchBar from "../../components/common/SearchBar";
import { useAuth } from '../../shared/hooks/useAuth';

const BookingListPage: React.FC = () => {
  return (
    <Container sx={{ py: 4 }}>
    </Container>
  );
};

export default BookingListPage;