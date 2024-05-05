import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
