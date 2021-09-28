const mongoose = require("mongoose");
const dabbawalaSchema = new mongoose.Schema({
    
    username:{
        type:String,
        required: true,
        unique:true,
       
    },
    email:{
        type:String,
        required: true,
        unique: true,
       
 
    },
    mobile:{
        type:Number,
    
        unique: true,

    },
    password:{
        type:String,
        required: true,
        
    },
    confirmpassword:{
        type:String,
        required: true
       
    },
    img:
    {
        data: Buffer,
        contentType: String
    }


})

const Dabbawalaregister = new mongoose.model("Dabbawalaregister", dabbawalaSchema);
module.exports= Dabbawalaregister;