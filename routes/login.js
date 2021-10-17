const express = require('express');
const router = express.Router();
var passport = require('passport')
const location = require('./api_location')

// For Database
const Register = require("../models/register");
const bcrypt = require("bcryptjs");

var user_id;

router.get('/', (req, res) => {
    res.render('login', { req: req });
});

router.post('/', (req, res) => {
    try {
        // Getting input fields
        const email = req.body.email;
        const password = req.body.password;

        // Checking if credentials are correct
        Register.findOne({ email: email }, (err, user) => {
            if (err) {
                return console.log(err);
            }

            console.log('Retrived from database');

            const isMatch = bcrypt.compare(password, user.password)
            if (isMatch) {
                user_id = user._id;

                req.login(user_id, function (err) {
                    res.status(301).redirect('user_dashboard')
                })

                // res.redirect('/user_dashboard');
            }

            else {
                res.send('<h1>Wrong Password</h1>');
            }
        });
    }

    catch (error) {
        res.status(400).send(error);

    }
});

passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});

module.exports = router;