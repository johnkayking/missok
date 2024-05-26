
const express = require("express")

const {
     createPost,
     singlePost,
     allPostUser,
     commentpost,
     likecomment
    } 
    = require("../CONTROLLER/postcontroller")
const multer = require("multer")

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({storage:storage})


router.post("/create-post", upload.single("image"), createPost)
router.get("/single-post/:id", singlePost)
router.get("/all-post-user/:id", allPostUser)
router.put("/comment-user/:id", commentpost)
router.put("/like-comment/:id", likecomment)


module.exports = router