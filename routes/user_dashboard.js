const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {
    if (!req.session.user) {
        res.status(401).send();
    }

    res.render('user_dashboard', { "user": req.session.user });
})


module.exports = router;