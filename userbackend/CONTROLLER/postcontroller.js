const mongoose = require("mongoose")
const asyncwrapper = require("../MIDDLEWARE/async")


const NewPost = require("../SCHEMA/postSchema")
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");



const s3 = new S3Client({
    credentials: {
        secretAccessKey: "I5ghrJWe0VwRP304kkat1NjIjzLAvJXA6hx01oP3",
    },
    region: "eu-north-1"
})



const createPost = asyncwrapper(async (req, res) => {
    console.log(req.file)
    console.log(req.body)


    let postimage = `${Date.now()}-${req.file.originalname}`
    let params = {
        Bucket: "owodemobucket",
        Key: postimage,
        Body: req.file.buffer,
        contentType: req.file.mimetype
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    const postuser = await NewPost.create({
        userid: req.body.userid,
        caption: req.body.caption,
        image: postimage
    })
    console.log("trying to catch my error", postuser)


    return res.status(200).json({ msg: "post successfuly uploaded", status: true, postuser })



})

const allPostUser = asyncwrapper(async (req, res) => {
    const { id: userID } = req.params
    console.log(userID)

    var userid = new mongoose.Types.ObjectId(userID);

    console.log(userid)

    const postsingleuser = await NewPost.find({}).lean()

    if (!postsingleuser) {
        res.status(404).json({ msg: `the user with this ID is not found ${userID}` })
    }

    // if you want to get all the post regardless of post then don't pass the userid
    // ifwise then you have to use userid key in the document of the post collection 
    //so inorder for t the userid during post creatation from thefrontend 
    console.log(postsingleuser)

    for (const singlePost of postsingleuser) {
        let getparams = {
            Bucket: "owodemobucket",
            Key: singlePost.image,

        }

        const command = new GetObjectCommand(getparams)
        const url = await getSignedUrl(s3, command)
        console.log("url", url)
        singlePost.url = url

    }

    return res.status(200).json({ msg: "singlepost successfull", postuser: postsingleuser })
})

const singlePost = asyncwrapper(async (req, res) => {
    const { id: userID } = req.params
    const getspecificUser = await NewPost.findOne({ id: new mongoose.Types.ObjectId(userID) }).lean()
    if (!getspecificUser) {
        res.status(404).json({ msg: `this user are id is not found ${userID}` })
    }
    res.status(200).json({ msg: "successfuly upload a specific user", data: getspecificUser })

})

const commentpost = asyncwrapper(async (req, res) => {
    const { id: userID } = req.params
    const { postID } = req.body
    console.log("req.body", req.body)
    const postcomm = await NewPost.findById({ _id: new mongoose.Types.ObjectId(postID) })

    if (postcomm === null) {
        return res.status(404).json({ message: "post not found", messageType: "not_found" })
    }

    postcomm.comment = [...postcomm.comment, { commentData: req.body.comment, userId: req.body.userID }]

    let updatedPost = await postcomm.save()

    res.status(200).json({ msg: "successfuly post", updatedPost })
})


const likecomment = (asyncwrapper(async (req, res) => {
    const { id = userID } = req.params
    const mylike = await newuser.findById({
        upvote: req.boby.upvote,
        userID: req.body._id

    })
    if (!mylike) {
        res.status(404).json({ msg: `this id does not match ${userID}` })
    }
    res.status(200).json({ msg: "like is successfully updated", likeInfo: mylike })
}))


module.exports = { createPost, allPostUser, singlePost, commentpost, likecomment }

