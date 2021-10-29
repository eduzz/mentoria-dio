import { configureStore } from '@reduxjs/toolkit';

import { authTokenSlice } from './slices/authToken';

declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface DefaultRootState extends RootState {}
}

export const store = configureStore({
  reducer: {
    authToken: authTokenSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
