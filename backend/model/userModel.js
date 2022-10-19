const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a Name"]
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true
    },
    mobile: {
        type: String,
        required: [true, "Please add a mobile number"]
    },
    address: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
    orders: {
        type: [String]
    }
}, {timestamps:true})

module.exports = mongoose.model("User", userSchema)