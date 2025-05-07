interface RoomBase {
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

export interface Room extends RoomBase {
    id: number;
}

export interface NewRoom extends RoomBase {
    imageFile: File | null;
}

export interface RoomService {
    id: number;
    roomId: number;
    name: string;
    price: number; // 0 → включено в стоимость
}