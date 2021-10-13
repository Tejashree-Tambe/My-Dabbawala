const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('order_details_user');
})

module.exports = router;