const express = require('express');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const nodemailer = require("nodemailer");
const location = require('./api_location');
const router = express.Router();

// For Database
const Register = require("../models/register");

router.get('/', (req, res) => {
    res.render('dabbawalajoin', { req: req });
});

router.post('/', upload.single('idCard'), async (req, res) => {
    try {
        // Getting password fields input
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        const usertype = 'Dabbawala';

        const result = await cloudinary.uploader.upload(req.file.path);
        console.log("Uploaded media on cloudinary");

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
                user_location: [location.lat, location.long],
                idCard: result.secure_url,
                cloudinaryId: result.public_id
            })

            // Saving user in db
            const registered = await registeruser.save();
            console.log("User registered")
            res.render('login', { req: req });

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
                text: "Hello Customer, \nThank You for registering as Dabbawala on My Dabbawala. \nThis is an automated email\n\nRegards, \nMy Dabbawala Team", // plain text body
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
        console.log(error);
        res.status(400).send(error);
    }
});

module.exports = router;