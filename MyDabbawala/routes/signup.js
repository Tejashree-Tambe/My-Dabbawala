const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
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
            console.log("User registered");

            res.status(201).render('login', { req: req });

            // To send mail
            const transporter = nodemailer.createTransport({
                // Setting Host
                host: "smtp.gmail.com",
                port: 587,
                secure: false,

                // Giving Credentials for from email
                auth: {
                    user: "clinicareweb27@gmail.com",
                    pass: "CliniCare27",
                },
            });

            console.log("Email will be sent shortly")
            const msg = {
                from: 'clinicareweb27@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "You have Registered on My Dabbawala", // Subject line
                text: "Hello Customer, \nThank You for registering on My Dabbawala. \nThis is an automated email\n\nRegards, \nMy Dabbawala Team", // plain text body
            }

            transporter.sendMail(msg, (err, info) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Email sent", info.response)
                }
            })
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