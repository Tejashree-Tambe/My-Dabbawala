const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('homepage', { req: req });
});

router.get('/', (req, res) => {
    res.render('homepage', { req: req });
});

module.exports = router;