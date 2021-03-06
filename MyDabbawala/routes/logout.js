const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    req.logout();
    req.session.destroy();
    res.render('homepage', { req: req });
});

module.exports = router;