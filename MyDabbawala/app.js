// Importing Modules
const path = require('path');
var express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var MongoDBStore = require('connect-mongodb-session')(session);

// global vars
var lat;
var long;

// load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Creating app to access express framework
const app = express();

// API For maps
app.use(express.json({ limit: '1mb' }));

// For bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

// For rendering static files like css, images and javascript
app.use(express.static('static'))
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))
app.use('/images', express.static(__dirname + 'static/images'))
app.use('/idCards', express.static(__dirname + 'static/idCards'))

// For session
var store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
});

app.use(session({
    secret: "ahusngefynuwtieuyewnf",
    resave: false,
    store: store,
    saveUninitialized: false,
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Getting all page routes
var homepage = require('./routes/homepage')
var dabbawalajoin = require('./routes/dabbawalajoin')
var index = require('./routes/index')
var login = require('./routes/login')
var order_details_user = require('./routes/order_details_user')
var otd = require('./routes/otd')
var packages = require('./routes/packages')
var user_dashboard = require('./routes/user_dashboard')
var signup = require('./routes/signup')
var api_location = require('./routes/api_location')
var contact_us = require('./routes/contact_us')
var logout = require('./routes/logout')
var searchbar = require('./routes/search')

//index.js
app.use('/index', index);

app.get('/test1', (req, res) => {
    res.render('test')
});

app.use('/api/location', api_location);

// Rendering webpages
// homepage page
app.use('/', homepage);
app.use('/homepage', homepage);

// login page
app.use('/login', login);

// signup page
app.use('/signup', signup);

// joindabbawala page
app.use('/dabbawalajoin', dabbawalajoin);

// userdashboard page
app.use('/user_dashboard', user_dashboard);

// packages page
app.use('/packages', packages);

// otd page
app.use('/otd', otd);

// userdashboard page
app.use('/order_details_user', order_details_user);

// logout page
app.use('/logout', logout);

// Contact Us
app.use('/contact_us', contact_us);

//search
app.use('/search', searchbar);

app.use(function (req, res, next) {
    res.locals.isAuthenticated = req.
        isAuthenticated();

    // if (req.isAuthenticated()){
    //     req.isLoggedIn = true;
    // }
    next();
});


// letting app know to listen to port number 3000
app.listen(3000, () => {
    console.log("server is working at http://localhost:3000/");
})

// module.exports = [lat, long]