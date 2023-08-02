const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    userId: {
        type: String
    },
    hotelId: {
        type: String
    },
    peopleCount: {
        type: Number
    },
    roomCount: {
        type: Number
    },
    checkInDate: {
        type: Date
    },
    checkOutDate: {
        type: Date
    },
    nightCount: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
    city: {
        type: String
    },
    paid: {
        type: Boolean
    },
    booked: {
        type: Boolean
    },
    cancelled: {
        type: Boolean
    },
    paymentMethod: {
        type: String
    }
}, {timestamps:true})

module.exports = mongoose.model('Order', OrderSchema)