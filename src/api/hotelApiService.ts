import { api } from './api';
import { Hotel, NewHotel } from '../entities/hotel';
import { Room } from '../entities/room';


const hotelsUrl = '/hotels';


class HotelApiService {
  async getHotels(params?: { location?: string; checkIn?: string; checkOut?: string }): Promise<Hotel[]> {
    const response = await api.get<Hotel[]>(hotelsUrl, { params });
    return response.data;
  }

  async getHotelById(id: number): Promise<Hotel> {
    const response = await api.get<Hotel>(`${hotelsUrl}/${id}`);
    return response.data;
  }

  async createHotel(hotel: NewHotel): Promise<Hotel> {
    const hotelPayload = {
      ...hotel,
      rooms: hotel.rooms ?? [],
      services: hotel.services ?? [],
    };

    const response = await api.post<Hotel>(hotelsUrl, hotelPayload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  }

  async updateHotel(id: number, hotel: Partial<NewHotel>): Promise<Hotel> {
    const hotelWithId = { ...hotel, id };
    const response = await api.put<Hotel>(`${hotelsUrl}/${id}`, hotelWithId, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  }

  async deleteHotel(id: number): Promise<void> {
    await api.delete(`/${hotelsUrl}/${id}`);
  }

  async getHotelRooms(id: number): Promise<Room[]> {
    const response = await api.get(`${hotelsUrl}/${id}/rooms`);
    return response.data;
  }
}

export const hotelApiService = new HotelApiService();