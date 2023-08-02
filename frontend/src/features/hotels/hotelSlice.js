import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import hotelServices from './hotelServices'

const initialState = {
    hotels: [],
    hotel: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

//getting all hotels details
export const getAllHotels = createAsyncThunk(
    'hotels/getAll',
    async (_,thunkAPI) => {
        try {
            return await hotelServices.getAllHotels()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//getting hotel by id
export const getHotelById = createAsyncThunk(
    'hotels/getbyid',
    async (id, thunkAPI) => {
        try {
            return await hotelServices.getHotelById(id)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)



// ------------------------  HOTEL SLICE  ----------------------------------------------------------

export const hotelSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllHotels.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllHotels.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.hotels = action.payload
        })
        .addCase(getAllHotels.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getHotelById.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getHotelById.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.hotel = action.payload
        })
        .addCase(getHotelById.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = hotelSlice.actions
export default hotelSlice.reducer

