import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import storageService from '@/services/storage';

export const authTokenSlice = createSlice({
  name: 'authToken',
  initialState: { value: storageService.get<string>('auth-token') },
  reducers: {
    set: (state, { payload: newToken }: PayloadAction<string>) => {
      storageService.set('auth-token', newToken);
      state.value = newToken;
    },
    clear: state => {
      storageService.remove('auth-token');
      state.value = null;
    }
  }
});
