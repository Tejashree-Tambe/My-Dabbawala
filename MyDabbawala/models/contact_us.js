const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    subject: {
        type: String,
    }
})

const Contactus = new mongoose.model("Contactus", contactSchema);
module.exports = Contactus;