import { api } from './api';
import { Review } from '../entities/review';

const reviewsUrl = '/reviews';

class ReviewApiService {
  async getReviews(): Promise<Review[]> {
    const response = await api.get<Review[]>(reviewsUrl);
    return response.data;
  }

  async getReviewById(id: number): Promise<Review> {
    const response = await api.get<Review>(`${reviewsUrl}/${id}`);
    return response.data;
  }

  async createReview(review: Review): Promise<Review> {
    const response = await api.post<Review>(reviewsUrl, review);
    return response.data;
  }

  async updateReview(id: number, review: Partial<Review>): Promise<Review> {
    const response = await api.put<Review>(`${reviewsUrl}/${id}`, review);
    return response.data;
  }

  async deleteReview(id: number): Promise<void> {
    await api.delete(`${reviewsUrl}/${id}`);
  }
}

export const reviewApiService = new ReviewApiService();