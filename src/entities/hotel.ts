import { RoomService } from "./room";

interface HotelBase {
    name: string;
    description: string;
    city: string;
    address: string;
    starRating: number;
    imageUrl: string;
    services: HotelService[];
}


export interface Hotel extends HotelBase {
    id: number;
}

export interface Room {
    type: string;
    price: number;
    services: RoomService[];
}

export interface Service {
    name: string;
    description: string;
}


export interface NewHotel extends HotelBase {
    imageFile: File | null;
    imagePreview: string;
    rooms: Room[];
}


export interface HotelService {
    id: number;
    hotelId: number;
    name: string;
    price: number;
}