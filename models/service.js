const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: true,
    },

    pickup: {
        type: String,
        required: true,
    },

    dropoff: {
        type: String,
        required: true,
    },

    placedOn: {
        type: Date,
        default: Date.now
    },

    expiresOn: {
        type: Date,
        default: Date.now
    },

    serviceType: {
        type: String,
        required: true
    },

    // pickupTime: {
    //     type: String,
    // },

    // dropoffTime: {
    //     type: String,
    // },

    duration: {
        type: String,
    },

    user_id: {
        type: String,
        required: true
    }

})

const Service = new mongoose.model("Service", deliverySchema);
module.exports = Service;