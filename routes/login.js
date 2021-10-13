const express = require('express');
const router = express.Router();
const location = require('./api_location')

// For Database
const Register = require("../models/register");
const bcrypt = require("bcryptjs");

router.get('/', (req, res) => {
    res.render('login');
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

            console.log(user.password);
            console.log('Retrived from database');

            const isMatch = bcrypt.compare(password, user.password)
            if (isMatch) {
                req.session.user = user;
          
                console.log(req.session.user);
                res.redirect('/user_dashboard');
            }

            else {
                res.send('<h1>Wrong Password</h1>');
            }
        });
    }
    //     const isMatch = bcrypt.compare(password, useremail.password);

    //     // If correct
    //     if (isMatch) {
    //         const user =  Register.findOne({ email: email, password: password });
    //         req.session.user = user;
    //         console.log(req.session.user);
    //         res.redirect('user_dashboard', { "user": req.session.user });
    //     }

    //     // If incorrect
    //     else {
    //         res.send("Invalid details")
    //     }
    // }

    catch (error) {
        res.status(400).send(error);

    }
})

module.exports = router;