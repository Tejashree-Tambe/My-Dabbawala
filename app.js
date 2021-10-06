var express = require('express');
var app = express();
var router= express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');
const nodemailer = require("nodemailer");

require('dotenv').config();
const bcrypt = require("bcryptjs")
require("./db/conn");
const Register = require("./models/register");
const register = Register.find({});
const Dabbawalaregister = require("./models/dabbawalaregister");
const Contactus = require('./models/contactus');
const Packages = require('./models/packages');
const Otd = require('./models/otd');
const { connection } = require('mongoose');
const { dirname } = require('path');
const { response } = require('express');
// For rendering css
app.set('view engine','ejs')
app.use(express.static('static'))
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))
app.use('/images', express.static(__dirname + 'static/images'))
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/login', function (req, res) {
  res.render('login')
    
})
app.get('/', function (req, res) {
  res.render('homepage')
})
app.get('/signup', function (req, res) {
 
    res.render('signup')
       
    
})
/*app.get('/user_dashboard',function(req,res){
    Register.find({},function(err ,docs){
        if(err) res.json(err);
        else res.render('user_dashboard',(username,docs));
    })
})*/
app.get('/order_details_user', function (req, res) {
  res.render('order_details_user')
})
app.get('/packages', function (req, res) {
    res.render('packages')
})
app.get('/dabbawalajoin', function (req, res) {
  res.render('dabbawalajoin')
})

    app.get('/otd', function (req, res) {
        res.render('otd')
    })


app.get('/contact', function (req, res) {
  res.render('homepage')
})
app.get('/user_dashboard', function(req,res){
    connection.query("SELECT * FROM REGISTER", function(err, rows, field){
        if(err) throw err
        res.render('user_dashboard', {items: rows})
    })
    connection.end();
})


app.post('/signup', async (req, res) => {
 try {
    console.log("post signup")
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
 
        const register = new Register({
            username: req.body.username,
            email: req.body.email,
            mobile: req.body.mobile,
            password: password,
            confirmpassword: cpassword
        })
            const registered = await register.save();
        console.log("user registered")
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
           
            // true for 465, false for other ports
            auth: {
                user: "tatuskarsaanika@gmail.com", // generated ethereal user
                pass: "Saanika@2603", 
              },
            });
            console.log("email started")
          const msg ={
      
              
                  from: 'tatuskarsaanika@gmail.com', // sender address
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
          
            console.log("email done")
      
        res.render('login')
    }
   
     catch (error) {
        res.status(400).send(error);
    }
})

  
   
           /* Register.signup(newUser, req.body.password, async function(err,user){
                if(err){
                    req.flash("error",err.message);
                    return res.redirect('/signup');
                }
                const msg={
                    from: 'noreply@gmail.com',
                    to: user,email,
                    subject: 'Verify your email',
                    text:
                    `Heloo thanks for registering on our site copy and paste the address below to verify your account https://${req.header.host}/verify-email?token=${user.emailToken}`,
                    html:`
                    <h1>Hello</h1>
                    <p>thanks for registering on our site</p>
                    <p>to verify your account</p>
                    <a  href=" https://${req.header.host}/verify-email?token=${user.emailToken}">
                    </a>
                    `
                }
                try{
                    await sgMail.send(msg);
                    req.flash("success");
                    res.redirect('/')
                }
                catch(error){

                console.log(error);
                req.flash("error",'something went wrong');
                res.redirect('/')
                }
            })*/
        

          


        
       
  
/*router.get('/verify-email',async(req,res,next)=>{
    try{
        const user = await Register.findOne({emailToken:req.query.token});
        if(!user){
            req.flash("error", 'Token is invalid');
            return res.redirect('/');

        }
        user.emailToken= null;
        user.isVerified=true;
        await user.save();
        await req.login(user,async(err) =>{
            if(err) return next(err);
            req.flash("sucess");
            const redirectUrl = req.session.redirectTo || '/';
            delete req.session.redirectTo;
            res.redirect(redirectUrl);
        });


    }*/
/*}
    catch(error){
        console.log(error);
        req.flash("something went wrong");
        res.redirect('/')
    }
})*/


app.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
     
        const usernamee = await Register.findOne({ username: username });
        const isMatch = bcrypt.compare(password, usernamee.password);

        if (usernamee.password ==password) {
            
            res.status(201).render('user_dashboard',{data:req.body});
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
            console.log("user registered");
            const {email} = req.body.email
 
    
     
res.render("login")


        
      
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

app.post('/packages', async (req, res) => {
    try {
        console.log("enter data")
         const packages = new Packages({
                name: req.body.name,
                phone: req.body.phone,
                pickup: req.body.pickup,
                dropoff:req.body.dropoff,
                duration:req.body.duration

                
            });
            console.log(req.body.duration)
            const package = await packages.save();
            console.log("user registered")
            res.status(201).sendFile(__dirname + '/views/user_dashboard.html');


        }
       
     catch (error) {
        res.status(400).send(error);
    }
})

app.post('/otd', async (req, res) => {
    try {
        console.log("enter data")
         const otd = new Otd({
                name: req.body.name,
                phone: req.body.phone,
                pickup: req.body.pickup,
                dropoff:req.body.dropoff,
              

                
            });
            console.log(req.body.duration)
            const otds = await otd.save();
            console.log("user registered")
            res.status(201).sendFile(__dirname + '/views/user_dashboard.html');


        }
       
     catch (error) {
        res.status(400).send(error);
    }
})
app.listen(8000, () => {
    console.log("server is working at http://localhost:8000/");
})