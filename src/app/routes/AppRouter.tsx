import { Route } from 'react-router-dom';
import LoginPage from '../../pages/auth/LoginPage';
import RegisterPage from '../../pages/auth/RegisterPage';
import HotelListPage from '../../pages/hotels/HotelListPage';
import HotelDetailPage from '../../pages/hotels/HotelDetailsPage';
import BookingListPage from '../../pages/bookings/BookingListPage';
import HotelRoomsPage from '../../pages/hotels/HotelRoomsPage';

import HotelsPage from '../../pages/admin/HotelsPage';
import RoomsPage from '../../pages/admin/RoomsPage';
import UsersPage from '../../pages/admin/UsersPage';
import ReviewsPage from '../../pages/admin/ReviewsPage';
import CreateHotelPage from '../../pages/admin/hotels/CreateHotelPage';
import EditHotelPage from '../../pages/admin/hotels/EditHotelPage';
import CreateRoomPage from '../../pages/admin/rooms/CreateRoomPage';
import EditRoomPage from '../../pages/admin/rooms/EditRoomPage';
import CreateUserPage from '../../pages/admin/users/CreateUserPage';
import EditUserPage from '../../pages/admin/users/EditUserPage';
import EditReviewPage from '../../pages/admin/reviews/EditReviewPage';

import ProtectedRoute from '../../components/common/ProtectedRoute';
import AdminLayout from '../../layouts/AdminLayout';
import BookingPage from '../../pages/bookings/BookingPage';

const AppRouter = (
  <>
    <Route path="/" element={<HotelListPage />} />
    <Route path="/hotels/:id" element={<HotelDetailPage />} />
    <Route path="/hotels/:id/rooms" element={<HotelRoomsPage />} />

    <Route path="/my-bookings" element={<BookingListPage />} />
    <Route path="/booking" element={<BookingPage />} />

    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route
      path="/admin"
      element={
        <ProtectedRoute requiredRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="hotels" element={<HotelsPage />} />
      <Route path="hotels/create" element={<CreateHotelPage />} />
      <Route path="hotels/:id/edit" element={<EditHotelPage />} />

      <Route path="hotels/:hotelId/rooms" element={<RoomsPage />} />
      <Route path="hotels/:hotelId/rooms/create" element={<CreateRoomPage />} />
      <Route path="rooms/:id/edit" element={<EditRoomPage />} />

      <Route path="users" element={<UsersPage />} />
      <Route path="users/create" element={<CreateUserPage />} />
      <Route path="users/:id/edit" element={<EditUserPage />} />

      <Route path="reviews" element={<ReviewsPage />} />
      <Route path="reviews/:id/edit" element={<EditReviewPage />} />
    </Route>
  </>
);

export default AppRouter;