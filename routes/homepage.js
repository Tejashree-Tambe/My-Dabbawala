const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.user)
    console.log(req.isAuthenticated)

    res.render('homepage');
});

router.get('/', (req, res) => {
    res.render('homepage');
});

module.exports = router;