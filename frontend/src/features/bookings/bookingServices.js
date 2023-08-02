import axios from "axios";
const API_URL = "http://localhost:3001/api/orders"


const getAllBookings = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

const getBookingsByUserId = async (userId) => {
    const response = await axios.get(`http://localhost:3001/api/orders/${userId}`)
    return response.data
}

const createBooking = async (data) => {
    const response = await axios.post(API_URL, data)
    return response.data
}

const updateBookingStatus = async (data) => {
    const response = await axios.put(`${API_URL}/${data.id}`, data)
    return response.data

}

const bookingServices = {
    getAllBookings,
    getBookingsByUserId,
    createBooking,
    updateBookingStatus,
}

export default bookingServices