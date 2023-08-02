import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import hotelReducer from '../features/hotels/hotelSlice'
import bookingReducer from '../features/bookings/bookingSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelReducer,
    bookings: bookingReducer,
  },
})
