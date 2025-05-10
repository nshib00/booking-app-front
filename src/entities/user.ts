import { Booking } from "./booking";

export interface UserBase {
    userName?: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
}


export interface User extends UserBase {
    id: string;
}


export interface UserWithBookings extends User {
    bookings: Booking[];
}