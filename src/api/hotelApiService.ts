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
    const formData = new FormData();
    formData.append('name', hotel.name);
    formData.append('description', hotel.description);
    formData.append('city', hotel.city);
    formData.append('address', hotel.address);
    formData.append('starRating', hotel.starRating.toString());
    formData.append('imageUrl', hotel.imageUrl);
    
    if (hotel.imageFile) {
      formData.append('imageFile', hotel.imageFile);
    }

    // Можно сериализовать rooms и services как JSON строки
    formData.append('rooms', JSON.stringify(hotel.rooms));
    formData.append('services', JSON.stringify(hotel.services));

    const response = await api.post<Hotel>(hotelsUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateHotel(id: number, hotel: Partial<NewHotel>): Promise<Hotel> {
    const response = await api.put<Hotel>(`/${hotelsUrl}/${id}`, hotel);
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