const express = require('express');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
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