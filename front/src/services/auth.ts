import apiService from './api';
import cacheService from './cache';

import IUser from '@/interfaces/models/user';
import { store } from '@/store';
import { authTokenSlice } from '@/store/slices/authToken';

export class AuthService {
  public async create(user: IUser): Promise<void> {
    await apiService.post('/auth/create', user);
    return this.login(user.email, user.password);
  }

  public async login(email: string, password: string): Promise<void> {
    const { token } = await apiService.post('/auth/login', { email, password });
    store.dispatch(authTokenSlice.actions.set(token));
  }

  public async logout(): Promise<void> {
    store.dispatch(authTokenSlice.actions.clear());
    await cacheService.clear();
  }

  public async sendResetPassword(email: string): Promise<void> {
    return apiService.post('/auth/send-reset', { email });
  }

  public async resetPassword(token: string, password: string): Promise<void> {
    return apiService.post('/auth/reset-password', { token, password });
  }

  public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiService.post('/auth/change-password', { currentPassword, newPassword });
  }
}

const authService = new AuthService();
export default authService;
