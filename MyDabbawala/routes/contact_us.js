const express = require('express');
const router = express.Router();

// For Database
const Otd = require("../models/contact_us");

router.post('/', async (req, res) => {
    try {
        console.log("enter data")
        const contactus = new Contactus({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            subject: req.body.subject
        });

        console.log("data saved")
        const contact = await contactus.save();
        console.log("user registered")
        res.render('homepage', { req: req });
    }

    catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;