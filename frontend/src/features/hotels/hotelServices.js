import axios from "axios";
const API_URL = "http://localhost:3001/api/hotels"

// Getting all the hotels
const getAllHotels = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// Getting hotel by ID
const getHotelById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
}

const hotelServices = {
    getAllHotels,
    getHotelById,
}

export default hotelServices