// Using express framework
var express = require('express');
var app = express();

// For database
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs")
require("./db/conn");
const Register = require("./models/register");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// For rendering static files like css, images and javascript
app.use(express.static('static'))
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))
app.use('/images', express.static(__dirname + 'static/images'))

// Get webpages
// homepage page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/homepage.html');
})

app.get('/homepage', function (req, res) {
    res.sendFile(__dirname + '/views/homepage.html');
})

// login page
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/views/login.html');
})

// signup page
app.get('/signup', function (req, res) {
    res.sendFile(__dirname + '/views/signup.html');
})

// joindabbawala page
app.get('/dabbawalajoin', function (req, res) {
    res.sendFile(__dirname + '/views/dabbawalajoin.html');
})

// For sending data from webpages

// signup page
app.post('/signup', async (req, res) => {
    try {
        console.log("post signup")
        // Getting password fields input
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        // Checking if email entered is valid
        const emailToValidate = req.body.email;
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        const ifValidated = emailRegexp.test(emailToValidate);
        console.log("Recieved data")

        // If two passwords are correct and email is valid
        if (password === cpassword) {
            const registeruser = new Register({
                username: req.body.username,
                email: req.body.email,
                mobile: req.body.mobile,
                password: password,
                confirmpassword: cpassword
            })

            // Saving user in db
            const registered = await registeruser.save();
            console.log("User registered")
            res.status(201).sendFile(__dirname + '/views/login.html');

        }

        else {
            res.send("Passwords don't match");
        }
    }

    catch (error) {
        res.status(400).send(error);
    }
})

// login page
app.post('/login', async (req, res) => {
    try {
        // Getting input fields
        const email = req.body.email;
        const password = req.body.password;

        // Checking if credentials are correct
        const useremail = await Register.findOne({ email: email });
        const isMatch = bcrypt.compare(password, useremail.password);

        // If correct
        if (isMatch) {
            res.status(201).sendFile(__dirname + '/views/homepage.html');
        }

        // If incorrect
        else {
            res.send("Invalid details")
        }
    }

    catch (error) {
        res.status(400).send(error);

    }
})

// letting app know to listen to port number 3000
app.listen(3000, () => {
    console.log("server is working at http://localhost:3000/");
})