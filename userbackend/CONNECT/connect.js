const mongoose = require("mongoose")


const ConnectDB = async(URL)=>{

   await mongoose.connect(URL,{

   })
}


module.exports = ConnectDB