import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import bookingServices from './bookingServices'


const initialState = {
    bookings: [],
    booking: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

// getting all bookings details
export const getAllBookings = createAsyncThunk(
    'bookings/getAll',
    async (_,thunkAPI) => {
        try {
            return await bookingServices.getAllBookings()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//getting bookings by userId
export const getBookingsByUserId = createAsyncThunk(
    'bookings/getById',
    async (id, thunkAPI) => {
        try {
            return await bookingServices.getBookingsByUserId(id)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//create new bookings 
export const createBooking = createAsyncThunk(
    'bookings/create',
    async (data, thunkAPI) => {
        try {
            return await bookingServices.createBooking(data)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//updating  booking status 
export const updateBookingStatus = createAsyncThunk(
    'bookings/updateBookStatus',
    async (data, thunkAPI) => {
        try {
            return await bookingServices.updateBookingStatus(data)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// ----------------------------- BOOKING SLICE ---------------------
export const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllBookings.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllBookings.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.bookings = action.payload
        })
        .addCase(getAllBookings.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getBookingsByUserId.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getBookingsByUserId.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.bookings = action.payload
        })
        .addCase(getBookingsByUserId.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(createBooking.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createBooking.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.booking = action.payload
        })
        .addCase(createBooking.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateBookingStatus.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateBookingStatus.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.booking = action.payload
        })
        .addCase(updateBookingStatus.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = bookingSlice.actions
export default bookingSlice.reducer