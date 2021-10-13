const express = require('express');
const router = express.Router();
const Packages = require('../models/packages')

router.get('/', function (req, res) {
    res.render('packages');
})

router.post('/', async(req,res) =>{
   
        try {
            console.log("enter data")
             const packages = new Packages({
                    name: req.body.name,
                    phone: req.body.phone,
                    pickup: req.body.pickup,
                    dropoff:req.body.dropoff,
                    duration:req.body.duration
    
                    
                });
                console.log(req.body.duration)
                const package = await packages.save();
                console.log("user registered")
                res.render('user_dashboard');
    
    
            }
           
         catch (error) {
            res.status(400).send(error);
        }
    })
module.exports = router;