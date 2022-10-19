const mongoose = require("mongoose")
const Schema = mongoose.Schema

const hotelSchema = new Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: [true, "Please add a user"],
    //     ref: 'User'
    // },
    title:{
        type: String
    },
    subtitle: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    description: {
        type: String
    },
    totalRooms: {
        type: Number
    },
    avalableRooms: {
        type: Number
    },
    photos: {
        type: [String]
    },
    price: {
        type: Number
    },
    distance: {
        type: String
    },
    contact: {
        type: Number
    },
    ratings: {
        type: Number
    },
    features: {
        type: String
    }
}, {timestamps:true})

module.exports = mongoose.model("Hotel", hotelSchema)