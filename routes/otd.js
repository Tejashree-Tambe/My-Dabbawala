const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('otd');
});
router.post('/', async (req, res) => {
    try {
        console.log("enter data")
         const otd = new Otd({
                name: req.body.name,
                phone: req.body.phone,
                pickup: req.body.pickup,
                dropoff:req.body.dropoff,
              

                
            });
            console.log(req.body.duration)
            const otds = await otd.save();
            console.log("user registered")
            res.status(201).sendFile(__dirname + '/views/user_dashboard.html');


        }
       
     catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;