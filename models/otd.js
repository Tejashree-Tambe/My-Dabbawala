const mongoose = require("mongoose");
const otdSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required: true,
    
       
    },
   
    phone:{
        type:Number,
    
        unique: true,

    },
    pickup:{
        type:String,
        required: true,
        
    },
    dropoff:{
        type:String,
        required: true,
      
       
 
    }
   
})
    const Otd = new mongoose.model("Otd", otdSchema);
module.exports= Otd