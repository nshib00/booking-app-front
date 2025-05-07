import { User } from './user';
import { Room } from './room';

interface BookingBase {
  roomId: number;
  userId: string;
  dateFrom: string;
  dateTo: string;
  room?: Room;
  user?: User;
}

export interface Booking extends BookingBase {
    id: number;
}

