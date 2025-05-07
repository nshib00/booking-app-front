import { api } from './api';
import { User, UserBase } from '../entities/user';

const usersUrl = '/users';

class UserApiService {
  async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>(usersUrl);
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await api.get<User>(`${usersUrl}/${id}`);
    return response.data;
  }

  async createUser(user: UserBase): Promise<User> {
    const response = await api.post<User>(usersUrl, user);
    return response.data;
  }

  async updateUser(id: string, user: Partial<UserBase>): Promise<User> {
    const response = await api.put<User>(`${usersUrl}/${id}`, user);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await api.delete(`${usersUrl}/${id}`);
  }
}

export const userApiService = new UserApiService();
