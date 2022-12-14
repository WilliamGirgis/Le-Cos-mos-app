const express = require("express");
const router = express.Router();
const multer = require("multer");
const folder = "src/assets/images/uploaded";
const jwt = require('jsonwebtoken');
module.exports = router;
const fs = require("fs");
const User = require("./user.model");
//const readJsonFile = require("jsonfile");
let authenticate = (req,res,next) => {
  let token = req.header('x-access-token')


  jwt.verify(token,User.getJWTSecret(),(err,decoded)=>{

   if(err) {
     // Do not Authenticate
     res.status(401).send(err)
   } else {
     req.user_id = decoded._id

     next()
   }
  })
}

const getImages = router.get("/images",authenticate, function (req, res, next) {
    // API used in adminview.component.ts
    const filename = req.query.imageName;
    console.log(filename)
    return res.sendFile("src/assets/images/uploaded/" + filename,
    { root: "C:/Users/William/Desktop/Le Cosm'os app/Le-Cos-mos-app/Le-Cos-mos-app/le-cos-mos-app" },
    function (err) {
      if (err) {
        console.log(err)
        next(err);
      }
    }
  )
    });

    //Storing on disk realted API - MiddleWare
    var store = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, folder);
        },
        filename: function (req, file, cb) {
          cb(
            null,
              file.originalname
          );
        },
      });


      var upload = multer({ storage: store }).single("file");
      router.post("/upload", function (req, res, next) { // include "authenticate" middleware, but jwt provided
        upload(req, res, function (err) {
          if (err) {

            return res.status(501).json({ error: err });
          }
          return res.json({
            originalname: req.file.originalname,
            upload: req.file.filename,
          });
        });
      });


      const delImage = router.post("/images/del",authenticate, function (req, res) {
        let filename = req.body.imageName;

        console.log(filename)
       /* if (filename.indexOf(" ") === 0) {
          // In case a file name has a space at the begginin

          filename = filename.replace(/ /, "");
        }*/

        fs.unlink(folder + '/' + filename, (err) => {
          if (err) {
            console.log(err);
            return res.send(err);
          }
          return res.send().status(200);
        });
      });

      /*const downFile = router.get(
        "/download/:folderID/:file",authenticate,
        function (req, res, next) {
          let folderID = req.params.folderID;
          let file = req.params.file;
          filepath = path.join(folder, folderID, file);
          return res.sendFile(
            filepath,
            { root: "C:/Users/Samwil/Desktop/Stage_Train/pre-stage" },
            function (err) {
              if (err) {
                next(err);
              } else {
                console.log("Sent:", filepath);
              }
            }
          );
        }
      );*/
