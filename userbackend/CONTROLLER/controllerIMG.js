const asyncwrapper = require("../MIDDLEWARE/async")
const user = require("../SCHEMA/imageShema")
const {S3Client, PutObjectCommand, DeleteObjectCommand,GetObjectCommand} = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {sharp} = require("sharp")
// const crypto = require("crpto")



// crypto give us unique number for image in order for the image in the S3 bucket not overide by another image in the s3 bucket 
// const ramdomimagename =(bytes = 20)=>crypto.randomBytes(bytes).toString("hex")
    



const s3 = new S3Client({
    credentials :{
        
        secretAccessKey : "I5ghrJWe0VwRP304kkat1NjIjzLAvJXA6hx01oP3",
    },

    region :"eu-north-1"
})





const updateUser = asyncwrapper(async (req, res) => {
    const { id: userID } = req.params
    console.log(userID)
    console.log("updateuser", req.body)
    console.log(req.file)


    // const updatefield = {

    //     fname: req.body.fname,
    //     lname: req.body.lname,
    //     email: req.body.email,
    //     dob: req.body.dob,
    //     age: req.body.age,
    //     state: req.body.state,
    //     country: req.body.country


    // }


    // if (req.file) {
    //     updatefield.photo = req.file.path
    // }
    // const imageBuffer = await sharp(req.file.buffer).resize({height :1920,width:1080,fit : "content"}).tobuffer() 

    const userS3image = `${Date.now()}-${req.file.originalname}`
  console.log(userS3image)
    let params = {
        Bucket : "owodemobucket",
        Key :userS3image ,
        body : req.file.buffer,
     
        contentType : req.file.mimetype

    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    const updateUserInfo = await user.findByIdAndUpdate({ _id: userID }, 

        { 
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            dob:req.body.dob,
            age:req.body.age,
            state : req.body.state,
            country : req.body.country,
            photo :userS3image
        }


        , { new: true, runvalidation: true })

    console.log(updateUserInfo)
    if (!updateUserInfo) {
        res.status(500).json({ msg: `this id doest not exist,${userID}` })
    }
    res.status(200).json({ msg: "successfully updated", updateUserInfo })
})


const getUser = asyncwrapper(async (req, res) => {
    const getAlluser = await user.find({}).lean()

   
    for(const Alluser of getAlluser){
        if(Alluser.photo){
            console.log("all my photo", Alluser)
            let getObjectParams ={
                Bucket : "owodemobucket",
                Key : Alluser.photo
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        console.log("ur",url)
        Alluser.url = url
        
        }
    
     

    }
   
    // console.log(getAlluser)

    res.status(200).json({ msg: "successfully get user", getAlluser })
})



const getsingleUser = asyncwrapper(async (req, res) => {
    const { id: userID } = req.params
    const getSpecificUser = await user.findOne({ _id: userID })
    console.log("single suser")
    if (!getSpecificUser) {
        res.status(500).json({ msg: `this id doest not exist,${userID}` })
    }
    res.status(200).json({ msg: "successfully get specific user", data: { getSpecificUser, nbHits: getSpecificUser.length } })
})

const deleteUser = asyncwrapper(async (req, res) => {
    const { id: userID } = req.params

     
    const deleteuserInfo = await user.findByIdAndDelete({ _id: userID })
    if (!deleteuserInfo) {
        res.status(500).json({ msg: `this id doest not exist,${userID}` })
    }
    
    const params = {
        Bucket :  "owodemobucket",
        Key : userS3image,
    }

    const command = new DeleteObjectCommand(params)
    await s3.send(command)

    res.status(200).json({ msg: "sucessfully deleted", deleteuserInfo })
})




const createRegister = asyncwrapper(async (req, res) => {
    console.log(req.body.email)
    const userEmail = await user.find({ email: req.body.email })
    console.log(userEmail)
    if (userEmail != 0) {
        return res.status(403).json({ msg: "elmail already exist", status: true })
    }
    const register = await user.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob
    })
    console.log("register me", register)
    res.status(200).json({ msg: "Succefully register", status: true, register })
})



const loginAuthentication = asyncwrapper(async (req, res) => {
    const userLogin = await user.find({ email: req.body.email })
    console.log(userLogin)
    console.log(req.body.email)
    console.log(req.body)
    console.log(req.body.password)

    console.log(userLogin.length)
    if (userLogin.length == 0) {
        return res.status(404).json({ msg: "email does not exist", status: false })

    }
    const userData = {
        _id: userLogin[0]._id,
        fname: userLogin[0].fname,
        lname: userLogin[0].lname,
        email: userLogin[0].email
    }
    console.log(userData)

    if (userLogin[0].password == req.body.password) {

        return res.status(200).json({ msg: "Succefully Login", status: true, user: userData })
    }

    return res.status(200).json({ msg: "invalid_password", status: false })



})


module.exports =
{
    // createUser,
    getUser,
    getsingleUser,
    deleteUser,
    updateUser,
    createRegister,
    loginAuthentication

}


