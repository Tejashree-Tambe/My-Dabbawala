const express = require('express')
const router = express.Router();
const Packages = require("../models/packages");

router.get('/', (req, res) => {
    res.render('user_dashboard');
});

router.post('/'), function(req,res){
    var searchdate = req.body.search
   
    Packages.findOne({ date:searchdate }, (err, response) => {
        if (err) {
            return console.log(err);
        }
        //console.log(response)
        const allDate = response;
        res.render('user_dashboard', {'allDate': allDate});
})
}
module.exports=router;