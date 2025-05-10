import { api } from './api';
import { Booking, BookingBase } from '../entities/booking';

const bookingsUrl = '/bookings';

class BookingApiService {
  async getBookings(): Promise<Booking[]> {
    const response = await api.get<Booking[]>(bookingsUrl);
    return response.data;
  }

  async getBookingById(id: number): Promise<Booking> {
    const response = await api.get<Booking>(`${bookingsUrl}/${id}`);
    return response.data;
  }

  async createBooking(booking: BookingBase): Promise<Booking> {
    const response = await api.post<Booking>(bookingsUrl, booking);
    return response.data;
  }

  async updateBooking(id: number, booking: Partial<Booking>): Promise<Booking> {
    const response = await api.put<Booking>(`${bookingsUrl}/${id}`, booking);
    return response.data;
  }

  async deleteBooking(id: number): Promise<void> {
    await api.delete(`${bookingsUrl}/${id}`);
  }
}

export const bookingApiService = new BookingApiService();
