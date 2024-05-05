import { configureStore } from '@reduxjs/toolkit';
import dataFetchedReducer from './dataFetchedSlice';
import productsReducer from './productSlice'; 

export default configureStore({
  reducer: {
    dataFetched: dataFetchedReducer,
    products: productsReducer, // Add the productsSlice reducer
  },
});
