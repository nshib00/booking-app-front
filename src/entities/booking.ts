import { Room } from './room';

export interface BookingBase {
  roomId: number;
  dateFrom: string;
  dateTo: string;
  room?: Room;
}

export interface Booking extends BookingBase {
    id: number;
    totalDays: number;
    totalCost: number;
}

