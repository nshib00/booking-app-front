interface ReviewBase {
    hotelId: number;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface Review extends ReviewBase {
    id: number;
}