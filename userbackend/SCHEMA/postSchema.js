const mongoose = require("mongoose")


const newPost = new mongoose.Schema({
    userid: {
        type: mongoose.Types.ObjectId
    },
    image:{
        type:String
    },
    caption:{
        type:String
    },  
    comment:{
        type:Array,
        default:[],
        create:{type:Date, default:Date.now()}
    },
    like:{

        type:Array,
        default:[]

    },
   
    createArt:{
        type :Date, 
        default:Date.now()
    }

    
    


})

const newModel = mongoose.model("post", newPost)



module.exports = newModel