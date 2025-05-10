import { api } from './api';
import { Room, RoomFormValues } from '../entities/room';

const roomsUrl = '/rooms';

class RoomApiService {
  async getRoomsByHotel(hotelId: number): Promise<Room[]> {
    const response = await api.get<Room[]>(`hotels/${hotelId}/rooms`);
    return response.data;
  }

  async getRoomById(id: number): Promise<Room> {
    const response = await api.get<Room>(`${roomsUrl}/${id}`);
    return response.data;
  }

  async createRoom(room: RoomFormValues): Promise<Room> {
    const formData = new FormData();
    formData.append('hotelId', room.hotelId.toString());
    formData.append('name', room.name);
    formData.append('description', room.description);
    formData.append('price', room.price.toString());
    formData.append('quantity', room.quantity.toString());
    formData.append('imageUrl', room.imageUrl);

    if (room.imageFile) {
      formData.append('imageFile', room.imageFile);
    }

    const response = await api.post<Room>(roomsUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateRoom(id: number, room: RoomFormValues): Promise<Room> {
    const formData = new FormData();
    formData.append('hotelId', room.hotelId.toString());
    formData.append('name', room.name);
    formData.append('description', room.description);
    formData.append('price', room.price.toString());
    formData.append('quantity', room.quantity.toString());
    formData.append('imageUrl', room.imageUrl);

    if (room.imageFile) {
      formData.append('imageFile', room.imageFile);
    }

    const response = await api.put<Room>(`${roomsUrl}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async deleteRoom(id: number): Promise<void> {
    await api.delete(`${roomsUrl}/${id}`);
  }
}

export const roomApiService = new RoomApiService();
