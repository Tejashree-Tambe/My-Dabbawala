const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    
    username:{
        type:String,
        unique:true,
        
       
    },
    email:{
        type:String,
        unique:true,
        
       
 
    },
    mobile:{
        type:Number,
        unique:true,
        
     
    },
    password:{
        type:String,
       
        
    },
    confirmpassword:{
        type:String,
       
       
    }


})

const Register = new mongoose.model("Register",userSchema);
module.exports= Register;