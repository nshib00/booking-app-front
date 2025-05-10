import { api } from './api';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

interface AuthResponse {
  token: string;
  userRole: string;
  userName: string;
  email: string;
}

class AuthApiService {
  private saveAuthData(token: string, userRole: string, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('email', email);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/account/login', data);
    const { token, email, userRole } = response.data;
    this.saveAuthData(token, userRole, email);
    return response.data;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/account/register', data);
    const { token, email, userRole } = response.data;
    this.saveAuthData(token, userRole, email);
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post('/account/logout');
    this.clearAuthData();
  }
}

export const authApiService = new AuthApiService();