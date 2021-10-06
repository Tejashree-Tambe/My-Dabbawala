const express = require('express');
const router = express.Router();
const location = require('./api_location')

// For Database
const Register = require("../models/register");

router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/', async (req, res) => {
    try {
        console.log("post signup")
        // Getting password fields input
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        // Checking if email entered is valid
        const emailToValidate = req.body.email;
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        const ifValidated = emailRegexp.test(emailToValidate);
        console.log("Recieved data");

        // If two passwords are correct and email is valid
        if (password === cpassword) {

            // Sending the data to Register model to save
            const registeruser = new Register({
                username: req.body.username,
                email: req.body.email,
                mobile: req.body.mobile,
                password: password,
                confirmpassword: cpassword,
                user_location: [lat, long]
            })

            // Saving user in db
            const registered = await registeruser.save();
            console.log("User registered")
            res.status(201).render('login');
        }

        else {
            res.send("Passwords don't match");
        }
    }

    catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;