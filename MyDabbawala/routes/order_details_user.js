const express = require('express');
const router = express.Router();

var order_id;

// Module imports
const protect = require('../middleware/protect');

// // For Database
const Service = require("../models/service");

router.post('/', protect(), function (req, res) {

    order_id = req.body.order;
    console.log('Id is: ' + req.body.order);

    Service.findOne({ _id: order_id }, (err, Order) => {
        if (err) {
            return console.log(err);
        }

        res.render('order_details_user', { order: Order, req: req });

    });
});

router.get('/', protect(), function (req, res) {
    console.log(order_id);

    Service.findOne({ _id: order_id }, (err, Order) => {
        if (err) {
            return console.log(err);
        }

        res.render('order_details_user', { order: Order, req: req });

    });

});

module.exports = router;