import { IPaginationParams, IPaginationResponse } from '@eduzz/houston-hooks/usePromisePaginated';

import apiService from './api';

import IUser from '@/interfaces/models/user';

export class UserService {
  public list(params: IPaginationParams): Promise<IPaginationResponse<IUser>> {
    return apiService.get('/user', params);
  }

  public current(): Promise<IUser> {
    return apiService.get('/user/current');
  }

  public save(model: Partial<IUser>): Promise<IUser> {
    return apiService.post('/user', model);
  }

  public delete(id: number): Promise<void> {
    return apiService.delete(`/user/${id}`);
  }
}

const userService = new UserService();
export default userService;
