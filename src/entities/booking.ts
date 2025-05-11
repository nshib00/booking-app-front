import { Hotel } from './hotel';
import { Room } from './room';

export interface BookingBase {
  roomId: number;
  dateFrom: string;
  dateTo: string;
  room?: Room;
  hotel?: Hotel;
}

export interface Booking extends BookingBase {
    id: number;
    totalDays: number;
    totalCost: number;
}

