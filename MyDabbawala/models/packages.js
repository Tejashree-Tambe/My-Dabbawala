const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        unique: true,
    },

    pickup: {
        type: String,
        required: true,
    },

    dropoff: {
        type: String,
        required: true,
    },

    duration: {
        type: String,
        required: true
    }
})

const Packages = new mongoose.model("Packages", packageSchema);
module.exports = Packages;