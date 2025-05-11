import { Hotel } from "./hotel";

export interface RoomBase {
    hotelId: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
}
  
  export interface NewRoom extends RoomBase {}
  
  export interface Room extends RoomBase {
    id: number;
    imageFile?: File;
    hotel?: Hotel;
}
  
  export type RoomFormValues = RoomBase & { imageFile?: File };
  
  export interface RoomService {
    id: number;
    roomId: number;
    name: string;
    price: number;
}
  