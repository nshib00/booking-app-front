import { Route } from 'react-router-dom';
import LoginPage from '../../pages/auth/LoginPage';
import RegisterPage from '../../pages/auth/RegisterPage';
import HotelListPage from '../../pages/hotels/HotelListPage';
import HotelDetailPage from '../../pages/hotels/HotelDetailsPage';
// import BookingPage from '../pages/bookings/BookingPage';
import AdminLayout from '../../layouts/AdminLayout';
import HotelsPage from '../../pages/admin/HotelsPage';
import RoomsPage from '../../pages/admin/RoomsPage';
import UsersPage from '../../pages/admin/UsersPage';
import ReviewsPage from '../../pages/admin/ReviewsPage';
import ProtectedRoute from '../../components/common/ProtectedRoute';

const AppRouter = (
  <>
    <Route path="/" element={<HotelListPage />} />
    <Route path="/hotels/:id" element={<HotelDetailPage />} />
    {/* <Route path="/my-bookings" element={<BookingPage />} /> */}

    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route
      path="/admin/hotels"
      element={
        <ProtectedRoute requiredRole="admin">
          <HotelsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute requiredRole="admin">
          <UsersPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/reviews"
      element={
        <ProtectedRoute requiredRole="admin">
          <ReviewsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="hotels/rooms/:hotelId"
      element={
        <ProtectedRoute requiredRole="admin">
          <RoomsPage />
        </ProtectedRoute>
      }
    />
  </>
);

export default AppRouter;