import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const autoCompleteSlice = createSlice({
  name: 'autoComplete',
  initialState: { search: '', counter: 0 },
  reducers: {
    set: (state, { payload: search }: PayloadAction<string>) => {
      state.search = search;
    },
    addCounter: state => {
      state.counter++;
    }
  }
});
