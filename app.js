var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
 const multer= require('multer');
 
var fs = require('fs');
// Step 5 - set up multer for storing uploaded files



var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var upload = multer({ storage: storage });



const bcrypt = require("bcryptjs")
require("./db/conn");
const Register = require("./models/register");
const Dabbawalaregister = require("./models/dabbawalaregister");
const Contactus = require('./models/contactus');
// For rendering css
app.use(express.static('static'))
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))
app.use('/images', express.static(__dirname + 'static/images'))
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/views/login.html');
})
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/homepage.html');
})
app.get('/signup', function (req, res) {
    res.sendFile(__dirname + '/views/signup.html');
})
app.get('/dabbawalajoin', function (req, res) {
    res.sendFile(__dirname + '/views/dabbawalajoin.html');
   
    })


app.get('/contact', function (req, res) {
    res.sendFile(__dirname + '/views/homepage.html');
})

app.post('/signup', async (req, res) => {
    try {
      
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
       

           
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


        
       
    } catch (error) {
        res.status(400).send(error);
    }
})



app.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const usernamee = await Register.findOne({ username: username });
        const isMatch = bcrypt.compare(password, usernamee.password);

        if (usernamee.password ==password) {
            res.status(201).sendFile(__dirname + '/views/homepage.html');

        } else {
            res.send("invalid details")
        }
    } 
    catch (error) {
        res.status(400).send(error);

    }
})

app.post('/dabbawalajoin', async (req, res) => {
    try {
        console.log("post signup")
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
     
            const registeruser = new Dabbawalaregister({
                username: req.body.username,
                email: req.body.email,
                mobile: req.body.mobile,
                password: password,
                confirmpassword: cpassword
            })
                const registered = await registeruser.save();
            console.log("user registered")
            res.status(201).sendFile(__dirname + '/views/login.html');


        
      
    } catch (error) {
        res.status(400).send(error);
    }
})


app.post('/login', async (req, res) => {
    try {
        
        const email= req.body.email;
        const password = req.body.password;
        const demail =await Dabbawalaregister.findOne({ email:email });
        const isMatch = bcrypt.compare(password, demail.password);

        if (demail.password ==password) {
            res.status(201).sendFile(__dirname + '/views/homepage.html');

        } 
        
        else {
            res.send("invalid details")
        }
    } 
    catch (error) {
        res.status(400).send(error);

    }
})
app.post('/contact', async (req, res) => {
    try {
        console.log("enter data")
         const contactus = new Contactus({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                subject:req.body.subject
                
            });
            console.log("data saved")
            const contact = await contactus.save();
            console.log("user registered")
            res.status(201).sendFile(__dirname + '/views/homepage.html');


        }
       
     catch (error) {
        res.status(400).send(error);
    }
})
app.listen(86, () => {
    console.log("server is working at http://localhost:86/");
})