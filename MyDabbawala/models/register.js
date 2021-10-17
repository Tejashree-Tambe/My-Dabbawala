// Creating a schema for signup(equivalent to making a table) with collection (table) name as register
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    userType: {
        type: String,
        required: true
    },

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
    },

    idCard: {
        type: String
    },

    cloudinaryId: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Register = new mongoose.model("Register", userSchema);
module.exports = Register;