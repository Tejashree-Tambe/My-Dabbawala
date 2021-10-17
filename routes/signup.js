const express = require('express');
const router = express.Router();
const location = require('./api_location')
const nodemailer = require("nodemailer");
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
// For Database
const Register = require("../models/register");

router.get('/', (req, res) => {
    console.log(req.user)
    console.log(req.isAuthenticated())
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
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
               
                // true for 465, false for other ports
                auth: {
                    user: "clinicareweb27@gmail.com", // generated ethereal user
                    pass: "CliniCare27", 
                  },
                });
                console.log("email started")
              const msg ={
          
                  
                      from: 'clinicareweb27@gmail.com', // sender address
                      to: req.body.email, // list of receivers
                      subject: "Hello ✔", // Subject line
                      text: "Hello world?", // plain text body
                      html: "<b>Hello world?</b>", // html body
                    
              }
              console.log("email mid")
                transporter.sendMail(msg,(err,info)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("email send",info.response)
                    }
                })
                const user_id = results[0];
                console.log(results[0])
                req.login(user_id,function(err){
                    res.render('/')
                })
           /* const accountSid = 'AC3e2cec801ba3e61e59b3b8263d357964';
            const authToken = '5f6d0177583b7660b1460f328095b7b9';
            var client = require('twilio')(accountSid,authToken);
            client.messages.create({
            from: '+12678488767',
            to: '+91' + req.body.mobile,
            body:"you have registered to our application My Dabbawala"
    
            }).then((message) => console.log(message.sid))
            .catch((err) => console.log(err))*/
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

passport.serializeUser(function(user_id,done){
    done(null,user_id)
})
passport.deserializeUser(function(user_id,done){
    done(null,user)
})

module.exports = router;