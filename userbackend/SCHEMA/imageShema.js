const mongoose = require("mongoose")



const uploadingShema = new mongoose.Schema({
    photo:{
        type: String
       
    }, 
    password:{
        type:String
    },

   
    fname:{
        type:String
    } ,

    lname:{
        type:String
    },

    email:{
        type:String,
        unique :true
    },

    age:{
        type:Number
    },
    dob:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    },

    createArt:{
        type : Date,
        default : Date.now()
    }






})


const uploadModel = mongoose.model("userfields", uploadingShema)



module.exports = uploadModel