const express = require("express")
const cors = require("cors")
// const user = require("./ROUTES/rouye")
// const login = require("./ROUTES/LoginAuthen")
const erorhandler = require("./MIDDLEWARE/erorhandler")
const notfound = require("./MIDDLEWARE/notfound")
require("dotenv").config()
const ConnectDB = require("./CONNECT/connect")
const photo = require("./ROUTES/routeIMG")
const post = require("./ROUTES/postRoute")



const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use("/hello", (req,res)=>{
    res.send("MY PRESENT APP") 
})

// app.use("/api/v2/",user)
// app.use("/api/v2/",login)
app.use("/api/v2/",photo)
app.use("/api/v2/",post)

app.use(erorhandler)
app.use(notfound)


const PORT = process.env.PORT || 7003

const start =async () =>{
    try {
        await ConnectDB(process.env.MONGO_URL)
        console.log("server has successfuly connect to database")
        app.listen(PORT, ()=>{
            console.log(`sever is listening to port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
        
    }

}


start()


