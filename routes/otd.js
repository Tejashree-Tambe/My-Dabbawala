const express = require('express');
const router = express.Router();

// For Database
const Service = require("../models/service");

router.get('/', function (req, res) {
    console.log(req.user);
    console.log(req.isAuthenticated());

    res.render('otd', { req: req });
});

router.post('/', async (req, res) => {
    console.log("OTD Service Requested")
    try {
        const serviceType = "One-Time Delivery"
        const otd = new Service({
            name: req.body.name,
            phone: req.body.phone,
            pickup: req.body.pickup,
            dropoff: req.body.dropoff,
            serviceType: serviceType
        });

        const otds = await otd.save();
        console.log("OTD Service Granted")
        res.render('user_dashboard', { req: req });
    }

    catch (error) {
        console.log(error);
    }
});

module.exports = router;