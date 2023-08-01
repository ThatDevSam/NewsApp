import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './newsSlice'
import { apiSlice } from './apiSlice'

export default configureStore({
  reducer: {
    news: newsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})