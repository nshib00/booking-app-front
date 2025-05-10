import { RoomService } from "./room";


export interface HotelBase {
  name: string;
  description: string;
  city: string;
  address: string;
  starRating: number;
  imageUrl: string;
  services: HotelService[];
  rooms: Room[];
  imageFile?: File;
}

export interface Hotel extends HotelBase {
  id: number;
  minRoomPrice?: number;
}

export type NewHotel = HotelBase;

export type HotelFormValues = HotelBase;

export interface Room {
    type: string;
    price: number;
    services: RoomService[];
}

export interface Service {
    name: string;
    description: string;
}


export interface HotelService {
    id: number;
    hotelId: number;
    name: string;
    price: number;
}