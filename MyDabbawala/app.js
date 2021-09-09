var express = require('express');
var app = express();

// For rendering css
app.use(express.static('static'))
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))
app.use('/images', express.static(__dirname + 'static/images'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/login.html');
})

app.get('/signup', function (req, res) {
    res.sendFile(__dirname + '/views/signup.html');
})

app.listen(3001, () => {
    console.log("server is working at http://localhost:3001/");
})