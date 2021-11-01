import { configureStore } from '@reduxjs/toolkit';

import { authTokenSlice } from './slices/authToken';
import { autoCompleteSlice } from './slices/autoComplete';

declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface DefaultRootState extends RootState {}
}

export const store = configureStore({
  reducer: {
    authToken: authTokenSlice.reducer,
    autoComplete: autoCompleteSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
