const express = require('express');
const router = express.Router();

// For Database
const Service = require("../models/service");
const Register = require("../models/register");

router.get('/', function (req, res) {
    res.render('packages', { req: req });
});

router.post('/', async (req, res) => {
    try {
        Register.findOne({ _id: req.user }, (err, logged_user) => {
            if (err) {
                return console.log(err);
            }

            const serviceType = "Delivery Package";
            console.log(logged_user._id)

            const packages = new Service({
                name: req.body.name,
                phone: req.body.phone,
                pickup: req.body.pickup,
                dropoff: req.body.dropoff,
                duration: req.body.duration,
                serviceType: serviceType,
                user_id: logged_user._id
            });

            const package = packages.save();
            console.log("Registered for Package")
            res.render('user_dashboard', { req: req });
        });
    }

    catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;