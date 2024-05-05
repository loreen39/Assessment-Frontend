import { createSlice } from '@reduxjs/toolkit';

export const dataFetchedSlice = createSlice({
  name: 'dataFetched',
  initialState: {
    fetched: false,
  },
  reducers: {
    setDataFetched: (state, action) => {
      state.fetched = action.payload;
    },
  },
});

export const { setDataFetched } = dataFetchedSlice.actions;

export default dataFetchedSlice.reducer;
