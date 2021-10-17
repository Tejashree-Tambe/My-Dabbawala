const express = require('express');
const router = express.Router();
const location = require('./api_location')

// For Database
const Register = require("../models/register");

router.get('/', (req, res) => {
    res.render('signup', { req: req });
});

router.post('/', async (req, res) => {
    try {
        console.log("post signup")
        // Getting password fields input
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        const usertype = 'Customer';

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
                userType: usertype,
                user_location: [location.lat, location.long]
            })

            // Saving user in db
            const registered = await registeruser.save();
            console.log("User registered")
            res.status(201).render('login', { req: req });
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