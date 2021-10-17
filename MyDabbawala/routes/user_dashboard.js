const express = require('express');
const router = express.Router();

// Module imports
const protect = require('../middleware/protect');

// For Database
const Service = require("../models/service");
const Register = require("../models/register");

router.get('/', protect(), (req, res) => {
    console.log(req.user);
    console.log(req.isAuthenticated());

    Register.findOne({ _id: req.user }, (err, logged_user) => {
        if (err) {
            return console.log(err);
        }

        Service.find({}, (err, Services) => {
            if (err) {
                return console.log(err);
            }

            res.render('user_dashboard', { allOrders: Services, user: logged_user, req: req });

        });

    });
});

module.exports = router;