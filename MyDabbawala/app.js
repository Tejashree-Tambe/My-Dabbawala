var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs")
require("./db/conn");
const Register = require("./models/register");
// For rendering css
app.use(express.static('static'))
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))
app.use('/images', express.static(__dirname + 'static/images'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/login.html');
})
app.get('/homepage', function (req, res) {
    res.sendFile(__dirname + '/views/homepage.html');
})
app.get('/signup', function (req, res) {
    res.sendFile(__dirname + '/views/signup.html');
})
app.post('/signup', async (req, res) => {
    try {
        console.log("post signup")
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        const emailToValidate = req.body.email;
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        console.log(emailRegexp.test(emailToValidate));
        console.log("got data")
        if (password === cpassword) {
            console.log("password same")
            const registeruser = new Register({
                username: req.body.username,
                email: req.body.email,
                mobile: req.body.mobile,
                password: password,
                confirmpassword: cpassword
            })

            const registered = await registeruser.save();
            console.log("user registered")
            res.status(201).sendFile(__dirname + '/views/login.html');


        }
        else {
            console.log("password")
            res.send("password doesnt matches");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})


app.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({ email: email });
        const isMatch = bcrypt.compare(password, useremail.password);

        if (isMatch) {
            res.status(201).sendFile(__dirname + '/views/homepage.html');

        } else {
            res.send("invalid details")
        }
    } 
    catch (error) {
        res.status(400).send(error);

    }
})
app.listen(3000, () => {
    console.log("server is working at http://localhost:3000/");
})