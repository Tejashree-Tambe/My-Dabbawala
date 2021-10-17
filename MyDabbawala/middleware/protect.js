var passport = require('passport');
const express = require('express');

function protect() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${req.session.passport}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }
}

module.exports = protect;