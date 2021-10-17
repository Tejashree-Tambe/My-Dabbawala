const express = require('express');
const router = express.Router();

// Module imports
const protect = require('../middleware/protect');

// // For Database
// const Otd = require("../models/otd");

router.get('/', protect(), function (req, res) {
    res.render('order_details_user', { req: req });
})

module.exports = router;