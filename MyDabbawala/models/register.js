// Creating a schema for signup(equivalent to making a table) with collection (table) name as register
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true

    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    mobile: {
        type: Number,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    confirmpassword: {
        type: String,
        required: true
    },

    user_location: {

        type: [Number]
        // formattedAddress: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Register = new mongoose.model("Register", userSchema);
module.exports = Register;