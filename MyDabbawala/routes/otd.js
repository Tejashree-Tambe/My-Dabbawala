const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();

// Module imports
const protect = require('../middleware/protect');

// For Database
const Service = require("../models/service");
const Register = require("../models/register");

router.get('/', protect(), function (req, res) {
    Register.find({ userType: "Dabbawala" }, (err, allDabbawalas) => {
        if (err) {
            return console.log(err);
        }

        res.render('otd', { req: req, dabbawalas: allDabbawalas });
    });

    // res.render('otd', { req: req });
});

router.post('/', async (req, res) => {
    console.log("OTD Service Requested");

    try {
        Register.findOne({ _id: req.user }, (err, logged_user) => {
            if (err) {
                return console.log(err);
            }

            dabbawala = req.body.dabbawala_name;

            console.log(logged_user.email);

            const serviceType = "One-Time Delivery"
            const otd = new Service({
                name: req.body.name,
                phone: req.body.phone,
                pickup: req.body.pickup,
                dropoff: req.body.dropoff,
                serviceType: serviceType,
                user_id: req.user,
                payment_status: "done",
                dabbawala_name: req.body.dabbawala_name
            });

            const otds = otd.save();
            console.log("OTD Service Granted");

            Service.find({ user_id: req.user }, (err, Services) => {
                if (err) {
                    return console.log(err);
                }

                res.render('user_dashboard', { allOrders: Services, user: logged_user, req: req });

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
                    to: logged_user.email, // list of receivers
                    subject: "Your Dabba will arrive shortly", // Subject line
                    text: "Dear Customer, \nThank You for using My Dabbawala. \nYou have choosen " + serviceType + " with " + dabbawala + " as your Dabbawala, \nYour delivery will arrive shortly" + "\n This is an automated email.\n\nRegards, \nMy Dabbawala Team", // plain text body
                }

                transporter.sendMail(msg, (err, info) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Email sent", info.response)
                    }
                })
            });
        });
    }

    catch (error) {
        console.log(error);
    }
});

module.exports = router;