const express = require("express");
const {
  getUser,
  getsingleUser,
  deleteUser,
  updateUser,
  createRegister,
  loginAuthentication
} = require("../CONTROLLER/controllerIMG");


// const {S3Client} = require('@aws-sdk/client-s3');
const multer = require('multer');
// const multerS3 = require('multer-s3');
// const path = require("path");
// const AWS = require('aws-sdk');

const route = express.Router();

// console.log(process.env.S3_ACCESS_KEY)
// console.log( process.env.S3_SECRETE_key)
// console.log(process.env.S3_ACCESS_KEY)



const storage = multer.memoryStorage()
const Upload =multer({storage:storage})

// const currentLocation = path.dirname(__dirname);
// const assetLocation = path.join(currentLocation, "asset");



// Multer S3 configuration

  
route.get("/get-user", getUser);
route.get("/get-single-user/:id", getsingleUser);
route.delete("/detete-user/:id", deleteUser);
route.patch("/update/:id/",Upload.single("photo"), updateUser);
route.route("/register").post(createRegister);
route.route("/login").post(loginAuthentication);

module.exports = route;
















// const express = require("express")

// const {
//         // createUser,
//         getUser,
//         getsingleUser,
//         deleteUser,
//         updateUser,
//         createRegister,
//         loginAuthentication
//       } 
//       = require("../CONTROLLER/controllerIMG")
//       const AWS = require('aws-sdk');
//       const multer = require('multer');
//       const multerS3 = require('multer-s3');
//       const path = require("path")


// const route = express.Router()

// const s3 = new AWS.S3({
//   accessKeyId: process.env.S3_ACCESS_KEY ,
//   secretAccessKey: process.env.S3_SECRETE_key,
//   region: process.env.S3_REGION
// });

// const currentLocation = path.dirname(__dirname)


// const assetLocation = path.join(currentLocation,"asset")

// // const upload = ()=>
// //   multer({
// //     storage:multerS3({
// //       S3 :S3,
// //       bucket:"my-owo-application",
// //       metadata:function (req, file, cb) {
// //         cb(null, assetLocation)
// //       },
// //       key:function (req, file, cb) {
// //         const uniqueSuffix = Date.now() ;
// //         cb(null, uniqueSuffix + (file.fieldname)+path.extname(file.originalname))
// //       },
// //     })
// //   })

//   // Multer S3 configuration
// const upload =(bucketName)=> multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: bucketName,
//     acl: 'public-read', // or any other ACL options you require
//     key: function (req, file, cb) {
//       cb(null,assetLocation, Date.now().toString() + '-' + file.originalname);
//     }
//   })
// });
  



// // const storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //       cb(null, assetLocation)
// //     },
// //     filename: function (req, file, cb) {
// //       const uniqueSuffix = Date.now() ;
// //       cb(null, uniqueSuffix + (file.fieldname)+path.extname(file.originalname))
// //     }
// //   })


  
// //   const upload = multer({ storage: storage })






// route.get("/get-user",getUser)
// route.get("/get-single-user/:id",getsingleUser)
// route.delete("/detete-user/:id",deleteUser)
// route.patch("/update/:id/" ,upload("my-owo-application").single("photo") ,updateUser)
// // route.patch("/update-user/:id",updateUser)

// route.route("/register").post(createRegister)
// route.route("/login").post(loginAuthentication)



// module.exports = route